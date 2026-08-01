#!/usr/bin/env python3
"""Delete processed images the built site no longer references.

Zola names each resized image after a hash of its source and the resize
arguments, and never removes the old one when either changes. Locally that means
last month's thumbnails sit in static/processed_images forever; in CI it matters
more, because that directory is restored from a cache and shipped as part of the
artifact, so an image nobody links to is downloaded, published and paid for on
every deploy.

Reads the built output for the names it actually uses and removes the rest, from
both the cache directory and public/. Runs after the build, before the artifact
is uploaded.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Set

from _common import PROJECT_ROOT, PUBLIC_DIR

CACHE_DIR = PROJECT_ROOT / 'static' / 'processed_images'
PUBLIC_IMAGES = PUBLIC_DIR / 'processed_images'
REFERENCE = re.compile(r'processed_images/([A-Za-z0-9._-]+)')
# Where a reference to an image can appear. The search index and the JSON feed
# carry them as well as the HTML, and a name only found there is still in use.
SEARCHED_SUFFIXES = ('.html', '.xml', '.json', '.txt', '.md', '.css', '.js')


def referenced_names() -> Set[str]:
    names: Set[str] = set()
    for path in PUBLIC_DIR.rglob('*'):
        if not path.is_file() or path.suffix.lower() not in SEARCHED_SUFFIXES:
            continue
        text = path.read_text(encoding='utf-8', errors='replace').replace('&#x2F;', '/')
        names.update(REFERENCE.findall(text))
    return names


def prune(directory: Path, keep: Set[str]) -> tuple[int, int]:
    if not directory.is_dir():
        return 0, 0
    removed = freed = 0
    for image in directory.iterdir():
        if image.is_file() and image.name not in keep:
            freed += image.stat().st_size
            image.unlink()
            removed += 1
    return removed, freed


def main() -> None:
    if not PUBLIC_DIR.is_dir():
        sys.exit(f'{PUBLIC_DIR}/ is missing: run `zola build` first')

    keep = referenced_names()
    if not keep:
        # Better to keep everything than to empty the cache because a change
        # upstream stopped the references from being found.
        sys.exit('no processed image references found in the build: refusing to prune')

    removed, freed = prune(CACHE_DIR, keep)
    prune(PUBLIC_IMAGES, keep)
    print(f'  {len(keep)} processed images in use, {removed} stale removed ({freed / 1024 / 1024:.1f} MB)')


if __name__ == '__main__':
    main()
