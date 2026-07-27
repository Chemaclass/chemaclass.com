#!/usr/bin/env python3
"""Tell IndexNow which URLs changed in this push.

Search engines find a static site by crawling it on their own schedule, which
for a site this size means a new post can sit unindexed for days. IndexNow is a
push: one HTTP call names the URLs that changed and Bing, Yandex, Seznam and
Naver fetch them. Google ignores the protocol, so this is not a replacement for
the sitemap, it is the fast path for everyone else.

Usage:
    python3 scripts/indexnow.py <git-range>     # e.g. abc123..def456
    python3 scripts/indexnow.py --dry-run <git-range>

The key file has to stay reachable at the URL in KEY_LOCATION: IndexNow fetches
it to prove whoever submitted the URLs controls the host, and a submission with
an unreachable key is rejected whole.
"""
from __future__ import annotations

import json
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import List, Set

from _common import BASE_URL, SECTIONS, get_slug_from_filename, is_draft

ENDPOINT = "https://api.indexnow.org/indexnow"
KEY_FILE = Path(__file__).resolve().parent.parent / "static" / "indexnow-key.txt"
KEY_LOCATION = f"{BASE_URL}/indexnow-key.txt"


def changed_content_files(git_range: str) -> List[Path]:
    """The content files touched in a git range, ignoring deletions."""
    result = subprocess.run(
        ["git", "diff", "--name-only", "--diff-filter=d", git_range, "--", "content/"],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        sys.exit(f"git diff failed for {git_range}: {result.stderr.strip()}")
    return [Path(line) for line in result.stdout.splitlines() if line.endswith(".md")]


def content_path_to_url(path: Path) -> str:
    """The published URL of a content file.

    Mirrors Zola's routing: a Spanish file is colocated as *.es.md and serves
    under /es/, section entries drop their YYYY-MM-DD- filename prefix, and an
    _index file is the section itself.
    """
    parts = list(path.parts[1:])  # drop the leading content/
    name = parts[-1]
    is_es = name.endswith(".es.md")

    if name.startswith("_index"):
        parts = parts[:-1]
    else:
        parts[-1] = get_slug_from_filename(name)

    prefix = f"{BASE_URL}/es" if is_es else BASE_URL
    if not parts:
        return f"{prefix}/"
    return f"{prefix}/{'/'.join(parts)}/"


def urls_for(files: List[Path]) -> List[str]:
    """Changed URLs, plus the section index of each changed entry.

    A new post changes two pages, not one: its own URL and the listing it
    appears on. Submitting only the post leaves the listing stale in the index
    for as long as the crawler takes to come back on its own.
    """
    urls: Set[str] = set()
    for path in files:
        if not path.is_file() or is_draft(path):
            continue
        urls.add(content_path_to_url(path))

        section = path.parts[1] if len(path.parts) > 1 else ""
        if section in SECTIONS and not path.name.startswith("_index"):
            prefix = f"{BASE_URL}/es" if path.name.endswith(".es.md") else BASE_URL
            urls.add(f"{prefix}/{section}/")
    return sorted(urls)


def submit(urls: List[str], key: str) -> None:
    payload = json.dumps({
        "host": BASE_URL.split("//", 1)[1],
        "key": key,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }).encode()

    request = urllib.request.Request(
        ENDPOINT,
        data=payload,
        headers={"Content-Type": "application/json; charset=utf-8"},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            print(f"  IndexNow accepted {len(urls)} URLs (HTTP {response.status})")
    except urllib.error.HTTPError as e:
        # A rejected submission is worth reporting but is not worth failing a
        # deploy that already went out: the sitemap still covers these pages.
        print(f"  IndexNow refused the submission (HTTP {e.code}): {e.read()[:200]!r}",
              file=sys.stderr)
    except urllib.error.URLError as e:
        print(f"  IndexNow unreachable: {e.reason}", file=sys.stderr)


def main() -> None:
    args = [a for a in sys.argv[1:] if a != "--dry-run"]
    dry_run = "--dry-run" in sys.argv
    if len(args) != 1:
        sys.exit("usage: indexnow.py [--dry-run] <git-range>")

    if not KEY_FILE.is_file():
        sys.exit(f"{KEY_FILE} is missing: IndexNow verifies ownership by fetching it")
    key = KEY_FILE.read_text(encoding="utf-8").strip()

    urls = urls_for(changed_content_files(args[0]))
    if not urls:
        print("  No content changed in this push, nothing to submit")
        return

    for url in urls:
        print(f"  {url}")
    if dry_run:
        print(f"  Dry run: {len(urls)} URLs not submitted")
        return
    submit(urls, key)


if __name__ == "__main__":
    main()
