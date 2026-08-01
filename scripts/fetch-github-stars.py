#!/usr/bin/env python3
"""Fetch the star counts the homepage shows, before the build starts.

The homepage used to call the GitHub API from the template, with
load_data(url=...). That works, and on a laptop it costs nothing. On a CI runner
it is two unauthenticated requests from a shared address to an API that
rate-limits shared addresses, in the middle of rendering, with no way to pass a
token and no timeout worth the name.

Doing it here instead means the request carries GITHUB_TOKEN when there is one,
failure is a warning rather than a stall, and the template reads a local file.

Writes data/github-stars.json, a build artifact, gitignored. The template keeps
its own fallback numbers, so a missing or stale file shows the last known counts
rather than nothing.
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from typing import Dict

from _common import PROJECT_ROOT

OUTPUT = PROJECT_ROOT / 'data' / 'github-stars.json'
REPOS = {
    'phel': 'phel-lang/phel-lang',
    'bashunit': 'TypedDevs/bashunit',
}


def stars(repo: str) -> int | None:
    request = urllib.request.Request(
        f'https://api.github.com/repos/{repo}',
        headers={'User-Agent': 'chemaclass.com build', 'Accept': 'application/vnd.github+json'},
    )
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        request.add_header('Authorization', f'Bearer {token}')

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return int(json.load(response)['stargazers_count'])
    except (urllib.error.URLError, KeyError, ValueError, TimeoutError) as e:
        print(f'  could not read stars for {repo}: {e}', file=sys.stderr)
        return None


def main() -> None:
    # Keep whatever was fetched last time for any repo that fails now: a
    # rate-limited build should not roll the numbers back to the template
    # fallbacks.
    counts: Dict[str, int] = {}
    if OUTPUT.is_file():
        try:
            counts = json.loads(OUTPUT.read_text(encoding='utf-8'))
        except json.JSONDecodeError:
            counts = {}

    for name, repo in REPOS.items():
        count = stars(repo)
        if count is not None:
            counts[name] = count

    if not counts:
        print('  no star counts available, the homepage will show its fallbacks')
        return

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(counts, indent=1, sort_keys=True), encoding='utf-8')
    print('  Stars: ' + ', '.join(f'{name} {value}' for name, value in sorted(counts.items())))


if __name__ == '__main__':
    main()
