#!/usr/bin/env python3
"""Give every in-article image its loading hints and its real dimensions.

Zola's markdown emits a bare `<img src="...">`. The site tried to fix that in the
browser, with a script that set loading="lazy" on the body images after the page
had loaded, which is too late to matter: the preload scanner starts fetching
every image the moment it parses the tag, so a post with five images downloaded
all of them before the script ran. On the pair programming post that is 700KB
fetched to render a screen that shows one of them.

Attributes are written into the HTML instead, where the parser sees them:

- loading="lazy" and decoding="async" on images inside the article body. The
  hero sits outside it and stays eager, since it is the LCP element.
- width and height, read out of the file, so the browser reserves the space
  before the bytes arrive. Without them every image that loads shoves the text
  down, which is the layout shift half of Core Web Vitals.

Runs after `zola build` and before minify.
"""
from __future__ import annotations

import re
import struct
import sys
from pathlib import Path
from typing import Optional, Tuple

from _common import PUBLIC_DIR

# Where an article's own prose starts. Everything from here to the end of the
# document is content: the hero, the navigation and the card listings sit above
# it, and the templates already set their own loading hints.
CONTENT_MARKERS = ('class="blog-post__content"', 'class="book-chapter__content"')

IMG = re.compile(r'<img\b[^>]*>', re.I)
ATTR = re.compile(r'\b(\w[\w-]*)\s*=\s*"([^"]*)"')


def jpeg_size(data: bytes) -> Optional[Tuple[int, int]]:
    """Width and height from the first JPEG start-of-frame marker."""
    index = 2
    while index + 9 < len(data):
        if data[index] != 0xFF:
            index += 1
            continue
        marker = data[index + 1]
        length = struct.unpack('>H', data[index + 2:index + 4])[0]
        # Every SOFn carries the dimensions except the four that are not frames.
        if 0xC0 <= marker <= 0xCF and marker not in (0xC4, 0xC8, 0xCC):
            height, width = struct.unpack('>HH', data[index + 5:index + 9])
            return width, height
        index += 2 + length
    return None


def image_size(path: Path) -> Optional[Tuple[int, int]]:
    """Pixel dimensions of an image file, read from its header.

    Stdlib only, like the rest of the build: the CI runner has Python and
    nothing else, and every format the site publishes states its size in the
    first few dozen bytes.
    """
    try:
        data = path.read_bytes()[:65536]
    except OSError:
        return None

    if data[:2] == b'\xff\xd8':
        return jpeg_size(data)
    if data[:8] == b'\x89PNG\r\n\x1a\n' and data[12:16] == b'IHDR':
        return struct.unpack('>II', data[16:24])
    if data[:6] in (b'GIF87a', b'GIF89a'):
        return struct.unpack('<HH', data[6:10])
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        chunk = data[12:16]
        if chunk == b'VP8X':
            width = int.from_bytes(data[24:27], 'little') + 1
            height = int.from_bytes(data[27:30], 'little') + 1
            return width, height
        if chunk == b'VP8 ':
            return struct.unpack('<HH', data[26:30])[0] & 0x3FFF, struct.unpack('<HH', data[28:32])[0] & 0x3FFF
        if chunk == b'VP8L':
            bits = int.from_bytes(data[21:25], 'little')
            return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    return None


def local_file(src: str) -> Optional[Path]:
    """The built file a src points at, for images this site hosts."""
    if not src.startswith('/'):
        return None
    candidate = PUBLIC_DIR / src.lstrip('/').split('?')[0]
    return candidate if candidate.is_file() else None


def rewrite_tag(tag: str) -> Tuple[str, bool, bool]:
    """Add the loading hints and dimensions this img tag is missing."""
    attrs = dict(ATTR.findall(tag))
    additions = []
    lazied = sized = False

    if 'loading' not in attrs:
        additions.append('loading="lazy"')
        lazied = True
    if 'decoding' not in attrs:
        additions.append('decoding="async"')

    if 'width' not in attrs and 'height' not in attrs:
        path = local_file(attrs.get('src', ''))
        size = image_size(path) if path else None
        if size:
            additions.append(f'width="{size[0]}" height="{size[1]}"')
            sized = True

    if not additions:
        return tag, False, False
    # Drop the closing `>` and the slash of a self-closing `/>` before appending:
    # keeping the slash left it stranded between attributes, as `alt="x" / loading=…`.
    inner = tag[:-1].rstrip().rstrip('/').rstrip()
    return f'{inner} ' + ' '.join(additions) + '>', lazied, sized


def process(html: str) -> Tuple[str, int, int]:
    start = -1
    for marker in CONTENT_MARKERS:
        found = html.find(marker)
        if found != -1 and (start == -1 or found < start):
            start = found
    if start == -1:
        return html, 0, 0

    head, body = html[:start], html[start:]
    lazied = sized = 0

    def replace(match: 're.Match[str]') -> str:
        nonlocal lazied, sized
        tag, was_lazied, was_sized = rewrite_tag(match.group(0))
        lazied += was_lazied
        sized += was_sized
        return tag

    return head + IMG.sub(replace, body), lazied, sized


def main() -> None:
    if not PUBLIC_DIR.is_dir():
        sys.exit(f'{PUBLIC_DIR}/ is missing: run `zola build` first')

    pages = lazied = sized = 0
    for path in PUBLIC_DIR.rglob('*.html'):
        if 'slides' in path.parts:
            continue
        html = path.read_text(encoding='utf-8', errors='replace')
        updated, page_lazied, page_sized = process(html)
        if updated != html:
            path.write_text(updated, encoding='utf-8')
            pages += 1
            lazied += page_lazied
            sized += page_sized

    print(f'  Deferred {lazied} in-article images and sized {sized}, across {pages} pages')


if __name__ == '__main__':
    main()
