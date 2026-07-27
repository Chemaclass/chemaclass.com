#!/usr/bin/env python3
"""Write the last commit date of every content file, for the templates to read.

The Article schema published dateModified as the publication date whenever a
post had no explicit `updated` field, which is every post: an article edited
five times still claimed it had not changed since the day it went out. The
sitemap already tells the truth here, from git, and this puts the same dates
where Zola can reach them.

Runs before `zola build`, because the templates read the file it writes with
load_data(). The output is a build artifact, not source, and is gitignored.
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path
from typing import Dict

from _common import CONTENT_DIR, PROJECT_ROOT

OUTPUT = PROJECT_ROOT / 'data' / 'last-modified.json'


def last_modified_dates() -> Dict[str, str]:
    """Map each content file to the ISO date of the commit that last touched it.

    One `git log` walk over the whole history rather than a call per file: at
    ~350 content files the per-file version took long enough to notice on every
    build. Log order is newest first, so the first time a path appears is its
    last change.
    """
    result = subprocess.run(
        ['git', 'log', '--format=%aI', '--name-only', '--', 'content/'],
        capture_output=True, text=True, cwd=PROJECT_ROOT,
    )
    if result.returncode != 0:
        sys.exit(f'git log failed (exit {result.returncode}): {result.stderr.strip()}')

    dates: Dict[str, str] = {}
    current = ''
    for line in result.stdout.splitlines():
        if not line.strip():
            continue
        if line[0].isdigit() and 'T' in line:
            current = line.strip()
            continue
        if line.startswith('content/') and line.endswith('.md'):
            # Keyed the way page.relative_path spells it: section-relative, with
            # no content/ prefix.
            relative = line[len('content/'):]
            # Deleted and renamed files are still in the log; only pages that
            # exist can be rendered, and keeping the rest just grows the file.
            if (CONTENT_DIR / relative).is_file():
                dates.setdefault(relative, current)
    return dates


def main() -> None:
    if not CONTENT_DIR.is_dir():
        sys.exit(f'{CONTENT_DIR}/ is missing: run this from the repo root')

    dates = last_modified_dates()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(dates, indent=0, sort_keys=True), encoding='utf-8')
    print(f'  Recorded last-modified dates for {len(dates)} content files')


if __name__ == '__main__':
    main()
