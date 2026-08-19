#!/usr/bin/env python3
"""Build the heading-level search index the search dialog fetches on first use.

Zola's elasticlunr index stops at the page: a search for "golden master" points
at a 3000-word post and leaves the reader to find the paragraph. This walks the
built HTML instead and records every content heading with its anchor, so a hit
can open the section itself.

The signal for "content heading" is the `heading-anchor` link that
templates/anchor-link.html renders. Chrome headings (related posts, series nav,
footer) do not carry one, which is what keeps this out of the index without a
list of selectors to maintain.

Runs after `zola build` and before minify, reading public/ and writing
public/heading_index.<lang>.json. Stdlib only, like the other generators.

    python3 scripts/generate-heading-index.py
"""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, TypedDict

from _common import PUBLIC_DIR, SECTIONS

# Anything longer is a paragraph the reader can open the page for. Kept short
# because this file is fetched over the wire on the first keystroke: every entry
# pays for itself in bytes, and the heading is what the query matched.
MAX_TEXT_CHARS = 180

# A heading with no words under it (two headings in a row) still earns its place:
# the anchor is the point. This only guards against indexing a nav label.
MIN_TITLE_CHARS = 2

SECTION_LABELS: Dict[str, Dict[str, str]] = {
    'en': {'blog': 'Blog', 'readings': 'Readings', 'talks': 'Talks'},
    'es': {'blog': 'Blog', 'readings': 'Lecturas', 'talks': 'Charlas'},
}

HEADING_RE = re.compile(
    r'<h(?P<level>[23])[^>]*\sid="(?P<id>[^"]+)"[^>]*>(?P<inner>.*?)</h(?P=level)>',
    re.S,
)
H1_RE = re.compile(r'<h1[^>]*>(.*?)</h1>', re.S)
TAG_RE = re.compile(r'<[^>]+>')
WS_RE = re.compile(r'\s+')


class THeadingEntry(TypedDict):
    route: str
    crumb: str
    title: str
    text: str


def strip_tags(fragment: str) -> str:
    return WS_RE.sub(' ', html.unescape(TAG_RE.sub(' ', fragment))).strip()


def page_title(markup: str) -> str:
    match = H1_RE.search(markup)
    return strip_tags(match.group(1)) if match else ''


def text_after(markup: str, start: int) -> str:
    """The prose between one heading and whatever ends it.

    Cut at the next heading, and at the section that follows the article, so a
    last heading does not swallow the related-posts list and the footer.
    """
    tail = markup[start:]
    for boundary in (re.search(r'<h[23][\s>]', tail), re.search(r'</main>', tail)):
        if boundary:
            tail = tail[:boundary.start()]
    plain = strip_tags(tail)
    if len(plain) <= MAX_TEXT_CHARS:
        return plain
    cut = plain.rfind(' ', 0, MAX_TEXT_CHARS)
    return plain[:cut if cut > 0 else MAX_TEXT_CHARS].rstrip()


def article_body(markup: str) -> str:
    """Everything from the first h1 to the end of main, or the whole page.

    Narrowing to <main> is what keeps a heading inside the shortcuts dialog or
    the footer out, in the rare template that renders one with an anchor.
    """
    start = markup.find('<main')
    end = markup.find('</main>', start + 1) if start >= 0 else -1
    return markup[start:end] if start >= 0 and end > start else markup


def entries_for_page(path: Path, route: str, section: str, lang: str) -> List[THeadingEntry]:
    markup = path.read_text(encoding='utf-8')
    body = article_body(markup)
    title = page_title(body) or route
    label = SECTION_LABELS[lang].get(section, section)
    entries: List[THeadingEntry] = []

    for match in HEADING_RE.finditer(body):
        if 'heading-anchor' not in match.group('inner'):
            continue
        heading = strip_tags(re.sub(r'<a class="heading-anchor".*?</a>', '', match.group('inner'), flags=re.S))
        if len(heading) < MIN_TITLE_CHARS:
            continue
        entries.append({
            'route': f'{route}#{match.group("id")}',
            'crumb': f'{label} · {title}',
            'title': heading,
            'text': text_after(body, match.end()),
        })

    return entries


def collect(lang: str) -> List[THeadingEntry]:
    root = PUBLIC_DIR / 'es' if lang == 'es' else PUBLIC_DIR
    entries: List[THeadingEntry] = []

    for section in SECTIONS:
        section_dir = root / section
        if not section_dir.is_dir():
            continue
        for page in sorted(section_dir.glob('*/index.html')):
            prefix = '/es' if lang == 'es' else ''
            route = f'{prefix}/{section}/{page.parent.name}/'
            entries.extend(entries_for_page(page, route, section, lang))

    return entries


def main() -> int:
    if not PUBLIC_DIR.is_dir():
        print('public/ not found. Run `zola build` first.', file=sys.stderr)
        return 1

    total = 0
    for lang in ('en', 'es'):
        entries = collect(lang)
        target = PUBLIC_DIR / f'heading_index.{lang}.json'
        target.write_text(json.dumps(entries, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        size_kb = target.stat().st_size / 1024
        print(f'  {target.name}: {len(entries)} headings, {size_kb:.0f} KB')
        total += len(entries)

    if total == 0:
        print('No headings indexed. The anchor-link template or the sections moved.', file=sys.stderr)
        return 1

    return 0


if __name__ == '__main__':
    sys.exit(main())
