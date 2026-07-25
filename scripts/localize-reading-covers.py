#!/usr/bin/env python3
"""Download the remote book covers in content/readings/ and serve them locally.

178 readings pointed `static_thumbnail` at an Amazon image host. That put a
third-party request on every reading page, leaked the reader's visit to Amazon,
delayed the load event behind someone else's CDN, and left the cover one dead URL
away from vanishing. Zola cannot resize a remote image either, so those pages
shipped whatever bytes the host felt like sending.

This fetches each cover once, converts it to webp at the size the template renders
(280x420, `object-fit: contain`), writes it to static/images/readings/, and rewrites
the front matter of both language files to the local path.

Run it when a reading is added with a remote cover:

    python3 scripts/localize-reading-covers.py            # convert what is remote
    python3 scripts/localize-reading-covers.py --dry-run   # list without touching

Needs cwebp (brew install webp) and network access. Idempotent: a reading whose
cover is already local is skipped.
"""
from __future__ import annotations

import re
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Dict, List, Optional, Tuple

ROOT = Path(__file__).resolve().parent.parent
READINGS = ROOT / 'content' / 'readings'
COVERS = ROOT / 'static' / 'images' / 'readings'
WIDTH, HEIGHT, QUALITY = 280, 420, 82

THUMBNAIL = re.compile(r'^static_thumbnail\s*=\s*"([^"]+)"', re.MULTILINE)
# A browser user agent: some image hosts answer urllib with 403.
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'


def slug_of(path: Path) -> str:
    """Reading slug, shared by a post and its .es sibling."""
    stem = path.name.removesuffix('.es.md').removesuffix('.md')
    return re.sub(r'^\d{4}-\d{2}-\d{2}-', '', stem)


def remote_covers() -> Dict[str, List[Path]]:
    """Slug -> files whose cover is still a remote URL, grouped so both languages
    are rewritten together."""
    found: Dict[str, List[Path]] = {}
    for path in sorted(READINGS.glob('*.md')):
        match = THUMBNAIL.search(path.read_text(encoding='utf-8'))
        if match and match.group(1).startswith(('http://', 'https://')):
            found.setdefault(slug_of(path), []).append(path)
    return found


def url_for(files: List[Path]) -> str:
    match = THUMBNAIL.search(files[0].read_text(encoding='utf-8'))
    assert match is not None
    return match.group(1)


def fetch(url: str) -> Optional[bytes]:
    request = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.read()
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as e:
        print(f'    fetch failed: {e}')
        return None


def to_webp(raw: bytes, dest: Path) -> Tuple[int, int]:
    """Write raw image bytes as a webp no larger than WIDTHxHEIGHT. Returns the
    byte size before and after."""
    tmp = dest.with_suffix('.orig')
    tmp.write_bytes(raw)
    try:
        subprocess.run(
            ['cwebp', '-quiet', '-q', str(QUALITY), '-resize', str(WIDTH), '0',
             str(tmp), '-o', str(dest)],
            check=True, capture_output=True,
        )
    finally:
        tmp.unlink(missing_ok=True)
    return len(raw), dest.stat().st_size


def rewrite(files: List[Path], local: str) -> None:
    for path in files:
        text = path.read_text(encoding='utf-8')
        path.write_text(
            THUMBNAIL.sub(f'static_thumbnail = "{local}"', text, count=1),
            encoding='utf-8',
        )


def main() -> int:
    dry_run = '--dry-run' in sys.argv
    if not dry_run and not subprocess.run(['which', 'cwebp'], capture_output=True).stdout:
        sys.exit('cwebp is missing. Install it with: brew install webp')

    covers = remote_covers()
    if not covers:
        print('Every reading cover is already local.')
        return 0

    print(f'{len(covers)} readings with a remote cover\n')
    COVERS.mkdir(parents=True, exist_ok=True)
    before = after = 0
    failed: List[str] = []

    for slug, files in covers.items():
        url = url_for(files)
        if dry_run:
            print(f'  {slug}: {url}')
            continue

        dest = COVERS / f'{slug}.webp'
        raw = fetch(url)
        if raw is None:
            failed.append(slug)
            continue
        try:
            src_size, out_size = to_webp(raw, dest)
        except subprocess.CalledProcessError as e:
            print(f'  {slug}: cwebp failed: {e.stderr.decode()[:120]}')
            failed.append(slug)
            continue

        before += src_size
        after += out_size
        rewrite(files, f'/images/readings/{slug}.webp')
        print(f'  {slug:44} {src_size / 1024:7.1f} KB -> {out_size / 1024:5.1f} KB')

    if dry_run:
        return 0

    print(f'\n{len(covers) - len(failed)} localized: '
          f'{before / 1024:.0f} KB fetched -> {after / 1024:.0f} KB stored')
    if failed:
        # Left pointing at the remote URL on purpose: a broken cover is easier to
        # notice than a missing file, and rerunning picks it up.
        print(f'{len(failed)} still remote: {", ".join(failed)}')
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
