#!/usr/bin/env python3
"""Add canonical targets to Zola's generated redirect pages.

Zola aliases already use an instant meta refresh and JavaScript redirect. The
canonical link reinforces the same destination for crawlers and keeps every
redirect signal aligned.
"""
from __future__ import annotations

import html
import re
from typing import Optional

from _common import PUBLIC_DIR


REFRESH = re.compile(
    r'<meta\b[^>]*http-equiv=["\']?refresh["\']?[^>]*>', re.IGNORECASE)
CONTENT = re.compile(r'\bcontent=["\']([^"\']*)["\']', re.IGNORECASE)
CANONICAL = re.compile(
    r'<link\b[^>]*rel=["\']?canonical["\']?[^>]*>', re.IGNORECASE)
TARGET = re.compile(r'(?:^|;)\s*url\s*=\s*(.+?)\s*$', re.IGNORECASE)


def redirect_target(text: str) -> Optional[str]:
    refresh = REFRESH.search(text)
    if not refresh:
        return None
    content = CONTENT.search(refresh.group(0))
    if not content:
        return None
    target = TARGET.search(html.unescape(content.group(1)))
    return target.group(1).strip(' "\'') if target else None


def main() -> None:
    redirects = 0
    enriched = 0

    for page in sorted(PUBLIC_DIR.rglob('*.html')):
        text = page.read_text(encoding='utf-8', errors='replace')
        target = redirect_target(text)
        if not target:
            continue
        redirects += 1
        if CANONICAL.search(text):
            continue

        canonical = f'<link rel="canonical" href="{html.escape(target, quote=True)}">'
        updated, count = re.subn(
            r'(</title>)', rf'\1\n{canonical}', text, count=1, flags=re.IGNORECASE)
        if count != 1:
            raise SystemExit(f'{page}: redirect page has no closing title tag')
        page.write_text(updated, encoding='utf-8')
        enriched += 1

    print(f'  {redirects} redirect pages checked, {enriched} canonical links added')


if __name__ == '__main__':
    main()
