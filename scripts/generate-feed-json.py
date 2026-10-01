#!/usr/bin/env python3
"""
Generate JSON Feed v1.1 (/feed.json and /es/feed.json) from blog content.
Spec: https://www.jsonfeed.org/version/1.1/

Easier to parse for modern feed readers and agent tooling
than Atom/RSS XML. Mirrors the Atom feed shape.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from typing import List, Sequence, TypedDict

from _common import (
    BASE_URL,
    CONTENT_DIR,
    PUBLIC_DIR,
    SECTIONS,
    TLang,
    TSection,
    entry_url,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
    read_last_modified,
    require_title,
)

AUTHOR_NAME = 'Jose Maria Valera Reales'
AUTHOR_URL = BASE_URL
MAX_ITEMS = 30


class TAuthor(TypedDict):
    name: str
    url: str


class TFeedItem(TypedDict, total=False):
    """One JSON Feed v1.1 item. total=False because `tags` and `image` are only
    written when the post has them; everything else is always set."""
    id: str
    url: str
    title: str
    date_published: str
    date_modified: str
    summary: str
    content_text: str
    authors: List[TAuthor]
    tags: List[str]
    image: str


def extract_excerpt(body: str) -> str:
    """First chunk before <!-- more --> or first ~500 chars of the body."""
    parts = re.split(r'<!--\s*more\s*-->', body, maxsplit=1)
    excerpt = parts[0]
    excerpt = re.sub(r'!\[.*?\]\(.*?\)', '', excerpt)
    excerpt = re.sub(r'<[^>]+>', '', excerpt)
    excerpt = re.sub(r'```[\s\S]*?```', '', excerpt)
    # content_text is plain text in JSON Feed 1.1, so markdown syntax goes too.
    excerpt = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', excerpt)
    excerpt = re.sub(r'^#{1,6}\s+', '', excerpt, flags=re.M)
    excerpt = re.sub(r'(\*\*|__|\*|`)', '', excerpt)
    excerpt = re.sub(r'\s+', ' ', excerpt).strip()
    return excerpt[:500]


def collect_entries(sections: Sequence[TSection], lang: TLang) -> List[TFeedItem]:
    entries: List[TFeedItem] = []
    modified = read_last_modified()
    for section in sections:
        for fp in iter_section_files(section, translations=(lang == 'es')):
            if ('.es.md' in fp.name) != (lang == 'es'):
                continue
            fm, body = read_entry(fp)
            # A JSON Feed item must carry date_published, and read_entry has
            # already tried the filename, so a page with no date anywhere (talks,
            # services) is simply not feed material. A missing title is a
            # different story: require_title stops rather than drop the entry.
            date = fm.get('date')
            if not date:
                continue

            url = entry_url(section, get_slug_from_filename(fp.name), es=(lang == 'es'))
            published = datetime.strptime(date, '%Y-%m-%d').replace(tzinfo=timezone.utc)

            item: TFeedItem = {
                'id': url,
                'url': url,
                'title': require_title(fm, fp),
                'date_published': published.isoformat(),
                'date_modified': modified.get(str(fp.relative_to(CONTENT_DIR)), published.isoformat()),
                'summary': fm.get('description', ''),
                'content_text': extract_excerpt(body),
                'authors': [{'name': AUTHOR_NAME, 'url': AUTHOR_URL}],
            }

            if fm.get('tags'):
                item['tags'] = fm['tags']
            thumbnail = fm.get('thumbnail')
            if thumbnail:
                item['image'] = thumbnail if thumbnail.startswith('http') else f'{BASE_URL}{thumbnail}'

            entries.append(item)

    entries.sort(key=lambda x: x['date_published'], reverse=True)
    return entries[:MAX_ITEMS]


DESCRIPTIONS = {
    'en': 'Software engineer sharing practical insights on software craftsmanship, TDD, leadership, Bitcoin, and AI.',
    'es': 'Ingeniero de software que comparte ideas prácticas sobre artesanía del software, TDD, liderazgo, Bitcoin e IA.',
}


def main() -> None:
    for lang in ('en', 'es'):
        prefix = '/es' if lang == 'es' else ''
        items = collect_entries(SECTIONS, lang)
        feed = {
            'version': 'https://jsonfeed.org/version/1.1',
            'title': 'Chemaclass',
            'home_page_url': f'{BASE_URL}{prefix}/',
            'feed_url': f'{BASE_URL}{prefix}/feed.json',
            'description': DESCRIPTIONS[lang],
            'language': lang,
            'icon': f'{BASE_URL}/icons/icon-512.png',
            'favicon': f'{BASE_URL}/icons/icon-64.png',
            'authors': [{'name': AUTHOR_NAME, 'url': AUTHOR_URL}],
            'items': items,
        }

        out = PUBLIC_DIR / prefix.lstrip('/') / 'feed.json'
        out.parent.mkdir(parents=True, exist_ok=True)
        with open(out, 'w', encoding='utf-8') as f:
            json.dump(feed, f, ensure_ascii=False, indent=2)

        print(f'  Generated {prefix}/feed.json with {len(items)} items')


if __name__ == '__main__':
    main()
