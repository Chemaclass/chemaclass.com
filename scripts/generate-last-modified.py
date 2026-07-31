#!/usr/bin/env python3
"""Write the date each content file was last *edited*, for the templates to read.

The Article schema published dateModified as the publication date whenever a post
had no explicit `updated` field, which is every post: an article edited five times
still claimed it had not changed since the day it went out.

Taking the last commit that touched the file went too far the other way. Adding a
`series` key to eighty posts, or fixing a description, is a commit against every
one of those files, and dateModified then announced eighty freshly updated posts
on a day when not one sentence of prose changed. Google asks that the modified
date reflect a real change and match what the page shows, so two kinds of commit
are walked past here:

- front-matter-only commits, which never touch a word of the article;
- edits below the substance threshold. The em-dash sweep rewrote punctuation in
  160 files in one commit, and another normalized Spanish accents across every ES
  post. Both are changes to the body, and publishing either as "updated" would
  have stamped a fresh date on almost the whole site for a change no reader would
  notice.

Runs before `zola build`, because the templates read the file it writes with
load_data(). The output is a build artifact, not source, and is gitignored.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import unicodedata
from collections import Counter
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from _common import CONTENT_DIR, PROJECT_ROOT, get_content_body

OUTPUT = PROJECT_ROOT / 'data' / 'last-modified.json'

# How many words have to come or go before an edit counts as an update. About a
# long paragraph: below it sit typo fixes, alt-text improvements and punctuation
# sweeps, above it sit rewritten sections and paragraphs added or dropped.
SUBSTANCE_THRESHOLD = 25

WORD = re.compile(r'\w+', re.UNICODE)


class BlobReader:
    """Reads file contents at arbitrary commits through one `git cat-file --batch`.

    Comparing bodies means reading the same file at two commits, for as many
    commits as it takes to find a real edit. As separate `git show` calls that is
    thousands of processes on a history this size; one batch process answers all
    of them over a pipe.
    """

    def __init__(self, cwd: Path) -> None:
        self.proc = subprocess.Popen(
            ['git', 'cat-file', '--batch'],
            stdin=subprocess.PIPE, stdout=subprocess.PIPE, cwd=cwd,
        )

    def read(self, commit: str, path: str) -> Optional[str]:
        """The file's contents at that commit, or None when it did not exist yet."""
        assert self.proc.stdin and self.proc.stdout
        self.proc.stdin.write(f'{commit}:{path}\n'.encode())
        self.proc.stdin.flush()

        header = self.proc.stdout.readline().decode('utf-8', 'replace').strip()
        if header.endswith(('missing', 'ambiguous')):
            return None

        size = int(header.rsplit(' ', 1)[1])
        blob = self.proc.stdout.read(size)
        self.proc.stdout.read(1)  # the trailing newline git writes after the blob
        return blob.decode('utf-8', 'replace')

    def close(self) -> None:
        assert self.proc.stdin
        self.proc.stdin.close()
        self.proc.wait(timeout=10)


def commits_by_file() -> Dict[str, List[Tuple[str, str]]]:
    """Every content file mapped to the commits touching it, newest first."""
    result = subprocess.run(
        ['git', 'log', '--format=C|%H|%aI', '--name-only', '--', 'content/'],
        capture_output=True, text=True, cwd=PROJECT_ROOT,
    )
    if result.returncode != 0:
        sys.exit(f'git log failed (exit {result.returncode}): {result.stderr.strip()}')

    history: Dict[str, List[Tuple[str, str]]] = {}
    sha = date = ''
    for line in result.stdout.splitlines():
        if line.startswith('C|'):
            _, sha, date = line.split('|', 2)
            continue
        if line.startswith('content/') and line.endswith('.md'):
            # Deleted and renamed paths are still in the log; only files that
            # exist can be rendered.
            relative = line[len('content/'):]
            if (CONTENT_DIR / relative).is_file():
                history.setdefault(relative, []).append((sha, date))
    return history


def words(text: str) -> Counter:
    """The body as a bag of comparable words.

    Accents and case are folded away, so "Tambien" and "También" are the same
    word. The commit that normalized Spanish accents across every ES post
    changed spelling, not content, and a metric that counted it would have
    stamped "updated" on the whole Spanish site in one day.
    """
    normalized = unicodedata.normalize('NFKD', text.casefold())
    return Counter(WORD.findall(normalized.encode('ascii', 'ignore').decode()))


def changed_words(older: str, newer: str) -> int:
    """How many words came or went between two versions of a body.

    A bag-of-words comparison rather than a diff, which is what makes the number
    mean what it should: moving a paragraph, or re-splitting one around
    `<!-- more -->`, scores zero because the same words are still there, while a
    rewritten section scores every word that changed. Punctuation is not a word,
    so the em-dash sweep scores zero too.

    It is also linear. The exact character-level difflib version of this took
    seven minutes over this history, and a line-level one scored a moved
    paragraph as a full rewrite.
    """
    delta = words(older)
    delta.subtract(words(newer))
    return sum(abs(count) for count in delta.values())


def last_body_edit(reader: BlobReader, path: str, commits: List[Tuple[str, str]]) -> str:
    """The date of the newest commit that substantially changed this file's body.

    Walks back until two consecutive versions differ below the front matter by
    at least SUBSTANCE_THRESHOLD words. A file whose every commit only
    moved front matter around, or only nudged punctuation, falls through to the
    commit that created it, which is the last point its body demonstrably changed.
    """
    full_path = f'content/{path}'
    newer = get_content_body(reader.read(commits[0][0], full_path) or '')

    for index, (sha, date) in enumerate(commits):
        older_sha = commits[index + 1][0] if index + 1 < len(commits) else f'{sha}^'
        older_raw = reader.read(older_sha, full_path)
        older = get_content_body(older_raw) if older_raw is not None else None

        if older is None or changed_words(older, newer) >= SUBSTANCE_THRESHOLD:
            return date
        newer = older

    return commits[-1][1]


def last_modified_dates() -> Dict[str, str]:
    history = commits_by_file()
    reader = BlobReader(PROJECT_ROOT)
    try:
        return {path: last_body_edit(reader, path, commits)
                for path, commits in sorted(history.items())}
    finally:
        reader.close()


def main() -> None:
    if not CONTENT_DIR.is_dir():
        sys.exit(f'{CONTENT_DIR}/ is missing: run this from the repo root')

    dates = last_modified_dates()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(dates, indent=0, sort_keys=True), encoding='utf-8')
    print(f'  Recorded last body-edit dates for {len(dates)} content files')


if __name__ == '__main__':
    main()
