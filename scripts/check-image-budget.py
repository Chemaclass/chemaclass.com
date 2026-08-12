#!/usr/bin/env python3
"""Fail the build when a shipped image is wider or heavier than the layout needs.

Nothing else catches this. `zola build` copies static/ verbatim, and the
templates resize covers but not the images embedded in markdown: those ship at
whatever width the author saved them. A phone then downloads a 2624px photo to
paint it into a 334px box, and the only signal is a slow page.

The widths come from the site's own convention, documented in
.claude/skills/optimize-images/SKILL.md:

- cover: at least 1600 wide, because templates/blog/post.html renders a 1440w
  retina hero. Capped here well above that, only to catch an untouched original.
- everything else: 1200, which is sharp at 2x on the ~700px content column.

Fix a failure by re-running the optimizer on the file it names:

    bash scripts/optimize-image.sh <path> --width 1200 --quality 85

Stdlib only, like the other checks. Reads static/ rather than public/, so the
sizes it reports are the ones committed to the repo.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import List, Optional, Tuple

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / 'content'
STATIC_DIR = ROOT / 'static'
BASELINE = Path(__file__).resolve().parent / 'image-budget-baseline.txt'

MAX_WIDTH_COVER = 2000
MAX_WIDTH_BODY = 1200
MAX_BYTES = 300 * 1024

# Book pages are photographed scans. Downscaling them costs the reader the text.
SKIP_PREFIXES = ('/images/books/',)

MARKDOWN_IMAGE = re.compile(r'!\[[^\]]*\]\((/images/[^)\s]+)\)')


def webp_width(head: bytes) -> Optional[int]:
    chunk = head[12:16]
    if chunk == b'VP8 ':
        return int.from_bytes(head[26:28], 'little') & 0x3FFF
    if chunk == b'VP8L':
        bits = int.from_bytes(head[21:25], 'little')
        return (bits & 0x3FFF) + 1
    if chunk == b'VP8X':
        return 1 + int.from_bytes(head[24:27], 'little')
    return None


def png_width(head: bytes) -> Optional[int]:
    return int.from_bytes(head[16:20], 'big') if head[:8] == b'\x89PNG\r\n\x1a\n' else None


def gif_width(head: bytes) -> Optional[int]:
    return int.from_bytes(head[6:8], 'little') if head[:3] == b'GIF' else None


def jpeg_width(path: Path) -> Optional[int]:
    """Walk the segment headers to the frame that carries the dimensions."""
    with path.open('rb') as handle:
        if handle.read(2) != b'\xff\xd8':
            return None
        while True:
            marker = handle.read(2)
            if len(marker) < 2 or marker[0] != 0xFF:
                return None
            length = int.from_bytes(handle.read(2), 'big')
            if 0xC0 <= marker[1] <= 0xCF and marker[1] not in (0xC4, 0xC8, 0xCC):
                return int.from_bytes(handle.read(5)[3:5], 'big')
            handle.seek(length - 2, 1)


def image_width(path: Path) -> Optional[int]:
    head = path.open('rb').read(40)
    if path.suffix.lower() in ('.jpg', '.jpeg'):
        return jpeg_width(path)
    return webp_width(head) or png_width(head) or gif_width(head)


def referenced_images() -> List[str]:
    found = set()
    for page in CONTENT_DIR.rglob('*.md'):
        body = page.read_text(encoding='utf-8').split('+++')[-1]
        found.update(MARKDOWN_IMAGE.findall(body))
    return sorted(found)


def baseline() -> set:
    if not BASELINE.is_file():
        return set()
    lines = BASELINE.read_text(encoding='utf-8').splitlines()
    return {line.split('\t')[0].strip() for line in lines if line.strip() and not line.startswith('#')}


def main() -> int:
    allowed = baseline()
    failures: List[Tuple[str, str]] = []
    checked = 0

    for ref in referenced_images():
        if ref.startswith(SKIP_PREFIXES) or ref in allowed:
            continue
        path = STATIC_DIR / ref.lstrip('/')
        if not path.is_file():
            continue  # check-assets.py owns missing files
        checked += 1
        limit = MAX_WIDTH_COVER if path.stem == 'cover' else MAX_WIDTH_BODY
        width = image_width(path)
        if width and width > limit:
            failures.append((ref, f'{width}px wide, limit {limit}px'))
        size = path.stat().st_size
        if size > MAX_BYTES:
            failures.append((ref, f'{size / 1024:.0f}KB, limit {MAX_BYTES // 1024}KB'))

    if failures:
        print(f'{len(failures)} image(s) over budget:', file=sys.stderr)
        for ref, why in failures:
            print(f'  {ref}\n      {why}', file=sys.stderr)
        print('\n  fix: bash scripts/optimize-image.sh static<path> --width 1200 --quality 85',
              file=sys.stderr)
        print(f'  or add the path to {BASELINE.relative_to(ROOT)} with a reason', file=sys.stderr)
        return 1

    print(f'  {checked} in-article images within the width and weight budget')
    return 0


if __name__ == '__main__':
    sys.exit(main())
