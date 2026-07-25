#!/usr/bin/env python3
"""
Generate JSON Feed v1.1 (/feed.json) from blog content.
Spec: https://www.jsonfeed.org/version/1.1/

Easier to parse for modern feed readers and agent tooling
than Atom/RSS XML. Mirrors the Atom feed shape.
"""

import json
import re
from datetime import datetime, timezone
from pathlib import Path

from _common import (
    extract_date_from_filename,
    extract_frontmatter,
    get_slug_from_filename,
)

BASE_URL = 'https://chemaclass.com'
AUTHOR_NAME = 'Jose Maria Valera Reales'
AUTHOR_URL = BASE_URL
MAX_ITEMS = 30


def extract_excerpt(content):
    """First chunk before <!-- more --> or first ~500 chars of body."""
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    parts = re.split(r'<!--\s*more\s*-->', body, maxsplit=1)
    excerpt = parts[0]
    excerpt = re.sub(r'!\[.*?\]\(.*?\)', '', excerpt)
    excerpt = re.sub(r'<[^>]+>', '', excerpt)
    excerpt = re.sub(r'```[\s\S]*?```', '', excerpt)
    excerpt = re.sub(r'\s+', ' ', excerpt).strip()
    return excerpt[:500]


def collect_entries(content_dir: Path, sections: list) -> list:
    entries = []
    for section in sections:
        section_path = content_dir / section
        if not section_path.exists():
            continue

        for fp in sorted(section_path.glob('*.md')):
            if fp.name == '_index.md' or '.es.md' in fp.name:
                continue

            with open(fp, 'r', encoding='utf-8') as f:
                content = f.read()

            fm = extract_frontmatter(content)
            if not fm.get('title') or not fm.get('date'):
                date = extract_date_from_filename(fp.name)
                if date:
                    fm['date'] = date
                else:
                    continue

            slug = get_slug_from_filename(fp.name)
            url = f'{BASE_URL}/{section}/{slug}/'

            published = datetime.strptime(fm['date'], '%Y-%m-%d').replace(tzinfo=timezone.utc)

            item = {
                'id': url,
                'url': url,
                'title': fm['title'],
                'date_published': published.isoformat(),
                'summary': fm.get('description', ''),
                'content_text': extract_excerpt(content),
                'authors': [{'name': AUTHOR_NAME, 'url': AUTHOR_URL}],
            }

            if fm.get('tags'):
                item['tags'] = fm['tags']
            if fm.get('thumbnail'):
                item['image'] = f"{BASE_URL}{fm['thumbnail']}"

            entries.append(item)

    entries.sort(key=lambda x: x['date_published'], reverse=True)
    return entries[:MAX_ITEMS]


def main() -> None:
    project_root = Path(__file__).parent.parent
    content_dir = project_root / 'content'
    public_dir = project_root / 'public'
    public_dir.mkdir(parents=True, exist_ok=True)

    items = collect_entries(content_dir, ['blog', 'readings', 'talks'])

    feed = {
        'version': 'https://jsonfeed.org/version/1.1',
        'title': 'Chemaclass',
        'home_page_url': BASE_URL,
        'feed_url': f'{BASE_URL}/feed.json',
        'description': 'Tech Lead sharing practical insights on software craftsmanship, TDD, leadership, Bitcoin, and AI.',
        'language': 'en',
        'icon': f'{BASE_URL}/icon.jpg',
        'favicon': f'{BASE_URL}/icon.jpg',
        'authors': [{'name': AUTHOR_NAME, 'url': AUTHOR_URL}],
        'items': items,
    }

    out = public_dir / 'feed.json'
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(feed, f, ensure_ascii=False, indent=2)

    print(f'  Generated feed.json with {len(items)} items')


if __name__ == '__main__':
    main()
