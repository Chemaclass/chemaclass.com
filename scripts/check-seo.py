#!/usr/bin/env python3
"""Fail the build on the SEO defects that are invisible until a crawler finds them.

Every rule here is one that had already gone wrong across the archive, silently,
for as long as the content had existed. None of them break a build, throw a
JavaScript error, or 404, so nothing else in the chain notices:

- 211 pages carried a meta description over 160 characters, the longest at 647,
  so the snippet in the result ended mid-word. Some had none at all and fell
  back to a dump of their own body text.
- 46 images said alt="blog-cover", which tells a screen reader nothing and gives
  image search nothing to index.
- 123 of 166 entries had no in-body internal link, so the archive ran as a set
  of islands and the template's related-posts block was the only path between
  them.
- The same picture rendered three times on one page, hero included.

The em dash rule is the house style in .claude/rules/no-em-dash.md, checked here
because a style rule nothing enforces is a style rule that drifts.

Reads both the built HTML, where the description and the headings actually land,
and the content source, where alt text and links are authored. Stdlib only, like
the rest of the chain.
"""
from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path
from typing import List

from _common import CONTENT_DIR, PUBLIC_DIR

# Google shows about 155 characters on desktop. 160 is the round number the
# industry quotes and the one this site was rewritten against.
MAX_DESCRIPTION = 160

# Alt text that describes the slot the image sits in rather than the image.
PLACEHOLDER_ALT = {'blog-cover', 'cover', 'footer', 'image', 'img', 'photo',
                   'screenshot', 'picture', 'banner', 'logo', 'book-chapter'}

# Entries are expected to link to the rest of the site from inside their prose.
# Sections of standalone pages are not: /cv/, /legal/ and the poetry chapters
# have nothing to say about another post.
LINKED_SECTIONS = ('blog', 'readings')

DESCRIPTION_META = re.compile(
    r'<meta[^>]+name=["\']?description["\']?[^>]*content=["\']([^"\']*)', re.I)
ROBOTS_META = re.compile(r'<meta[^>]+name=["\']?robots["\']?[^>]*>', re.I)
REFRESH_META = re.compile(r'<meta[^>]+http-equiv=["\']?refresh', re.I)
CANONICAL = re.compile(
    r'<link[^>]+rel=["\']?canonical["\']?[^>]*href=["\']([^"\']+)', re.I)
REFRESH_CONTENT = re.compile(
    r'<meta\b[^>]*http-equiv=["\']?refresh["\']?[^>]*content=["\']([^"\']*)', re.I)
JSON_LD = re.compile(
    r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.I | re.S)
H1 = re.compile(r'<h1[\s>]', re.I)
MD_IMAGE = re.compile(r'!\[([^\]]*)\]\(([^)]+)\)')
INTERNAL_LINK = re.compile(r'\]\((/(?:es/)?(?:blog|readings|talks|series)/[^)]*)\)')
FRONT_MATTER = re.compile(r'\+\+\+\n(.*?)\n\+\+\+', re.S)
# A fenced block holds code, and a '#' or a dash in code is not prose.
FENCE = re.compile(r'```.*?```|~~~.*?~~~', re.S)

SOCIAL_META = {
    'og:type': re.compile(r'<meta[^>]+property=["\']og:type["\']', re.I),
    'og:title': re.compile(r'<meta[^>]+property=["\']og:title["\']', re.I),
    'og:description': re.compile(r'<meta[^>]+property=["\']og:description["\']', re.I),
    'og:url': re.compile(r'<meta[^>]+property=["\']og:url["\']', re.I),
    'og:image': re.compile(r'<meta[^>]+property=["\']og:image["\']', re.I),
    'twitter:card': re.compile(r'<meta[^>]+name=["\']twitter:card["\']', re.I),
    'twitter:title': re.compile(r'<meta[^>]+name=["\']twitter:title["\']', re.I),
    'twitter:description': re.compile(r'<meta[^>]+name=["\']twitter:description["\']', re.I),
    'twitter:image': re.compile(r'<meta[^>]+name=["\']twitter:image["\']', re.I),
}


def built_pages() -> List[Path]:
    """Every page a reader or crawler can land on, excluding Marp decks."""
    pages = []
    for page in sorted(PUBLIC_DIR.rglob('index.html')):
        if 'slides' in page.parts:
            continue
        pages.append(page)
    return pages


def check_built(problems: List[str]) -> int:
    pages = built_pages()
    for page in pages:
        url = '/' + str(page.parent.relative_to(PUBLIC_DIR)).replace('index.html', '')
        url = '/' if url == '/.' else url.rstrip('/') + '/'
        text = page.read_text(encoding='utf-8', errors='replace')
        head = text[:12000]

        if REFRESH_META.search(head):
            canonical = CANONICAL.search(head)
            refresh = REFRESH_CONTENT.search(head)
            target = None
            if refresh:
                match = re.search(r'(?:^|;)\s*url\s*=\s*(.+?)\s*$',
                                  html.unescape(refresh.group(1)), re.I)
                target = match.group(1).strip(' "\'') if match else None
            if not canonical:
                problems.append(f'{url} redirect has no canonical target')
            elif not target:
                problems.append(f'{url} redirect has no readable target')
            elif html.unescape(canonical.group(1)) != target:
                problems.append(
                    f'{url} redirects to {target} but canonical points to '
                    f'{html.unescape(canonical.group(1))}')
            continue

        headings = len(H1.findall(text))
        if headings != 1:
            problems.append(f'{url} has {headings} <h1>, expected exactly 1')

        robots_tags = ROBOTS_META.findall(head)
        if len(robots_tags) != 1:
            problems.append(f'{url} has {len(robots_tags)} robots tags, expected exactly 1')
        if not CANONICAL.search(head):
            problems.append(f'{url} has no canonical URL')

        for block in JSON_LD.findall(text):
            try:
                json.loads(block)
            except json.JSONDecodeError as error:
                problems.append(f'{url} has invalid JSON-LD: {error.msg}')

        # A noindexed page is not in the index, so its snippet and share card
        # cannot appear in search results.
        robots = ROBOTS_META.search(head)
        if robots and 'noindex' in robots.group(0).lower():
            continue

        for name, pattern in SOCIAL_META.items():
            if not pattern.search(head):
                problems.append(f'{url} has no {name} metadata')

        found = DESCRIPTION_META.search(head)
        if not found:
            problems.append(f'{url} has no meta description')
            continue
        description = html.unescape(found.group(1))
        if len(description) > MAX_DESCRIPTION:
            problems.append(
                f'{url} meta description is {len(description)} chars, over {MAX_DESCRIPTION}')
    return len(pages)


def check_source(problems: List[str]) -> int:
    files = sorted(CONTENT_DIR.rglob('*.md'))
    for path in files:
        rel = path.relative_to(CONTENT_DIR.parent)
        raw = path.read_text(encoding='utf-8')
        matter = FRONT_MATTER.match(raw)
        body = raw[matter.end():] if matter else raw
        prose = FENCE.sub('', body)

        for dash, name in (('—', 'em dash'), ('–', 'en dash')):
            if dash in prose:
                problems.append(f'{rel} contains an {name}, see .claude/rules/no-em-dash.md')

        seen = {}
        for alt, url in MD_IMAGE.findall(prose):
            if alt.strip().lower() in PLACEHOLDER_ALT:
                problems.append(f'{rel} image alt is a placeholder: ![{alt}]')
            seen[url] = seen.get(url, 0) + 1
        for url, count in seen.items():
            if count > 1:
                problems.append(f'{rel} renders {url} {count} times on one page')

        section = path.relative_to(CONTENT_DIR).parts[0]
        if section in LINKED_SECTIONS and not path.name.startswith('_index'):
            if not INTERNAL_LINK.search(prose):
                problems.append(f'{rel} has no in-body link to another page on this site')
    return len(files)


def main() -> None:
    if not PUBLIC_DIR.is_dir():
        sys.exit(f'{PUBLIC_DIR}/ is missing: run `zola build` first')

    problems: List[str] = []
    pages = check_built(problems)
    files = check_source(problems)

    if problems:
        print(f'{len(problems)} SEO problem(s):', file=sys.stderr)
        for problem in problems:
            print(f'  {problem}', file=sys.stderr)
        sys.exit(1)

    print(f'  {pages} pages and {files} content files pass the SEO rules')


if __name__ == '__main__':
    main()
