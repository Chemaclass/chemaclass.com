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

BASE_URL = 'https://chemaclass.com'
AUTHOR_NAME = 'Jose Maria Valera Reales'
AUTHOR_URL = BASE_URL
MAX_ITEMS = 30


def extract_frontmatter(content):
    """Extract TOML frontmatter."""
    fm = {}
    m = re.search(r'^\+\+\+\s*\n(.*?)\n\+\+\+', content, re.DOTALL)
    if not m:
        return fm

    fm_text = m.group(1)
    for key in ('title', 'description'):
        km = re.search(rf'^{key}\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if km:
            fm[key] = km.group(1)

    dm = re.search(r'^date\s*=\s*["\']?(\d{4}-\d{2}-\d{2})', fm_text, re.MULTILINE)
    if dm:
        fm['date'] = dm.group(1)

    tm = re.search(r'tags\s*=\s*\[(.*?)\]', fm_text, re.DOTALL)
    if tm:
        fm['tags'] = re.findall(r'"([^"]*)"', tm.group(1))

    thumb = re.search(r'static_thumbnail\s*=\s*"([^"]*)"', fm_text)
    if thumb:
        fm['thumbnail'] = thumb.group(1)

    return fm


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


def slug_from_filename(filename):
    name = filename.replace('.md', '')
    name = re.sub(r'\.(es|en)$', '', name)
    name = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', name)
    return name


def collect_entries(content_dir, sections):
    entries = []
    for section in sections:
        section_path = content_dir / section
        if not section_path.exists():
            continue

        for fp in sorted(section_path.glob('*.md')):
            if fp.name == '_index.md' or '.es.md' in fp.name:
                continue

            try:
                with open(fp, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception:
                continue

            fm = extract_frontmatter(content)
            if not fm.get('title') or not fm.get('date'):
                m = re.match(r'^(\d{4}-\d{2}-\d{2})-', fp.name)
                if m:
                    fm['date'] = m.group(1)
                else:
                    continue

            slug = slug_from_filename(fp.name)
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


def main():
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
