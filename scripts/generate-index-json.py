#!/usr/bin/env python3
"""Generate /index.json: every entry on the site, in one machine-readable file.

An agent that wants to know what is here had two options, and both are the wrong
shape for the question. llms.txt is markdown, so it has to be parsed as prose.
The search index is elasticlunr's internal format and 2.6MB, which is a lot to
download to answer "what has this site published about testing".

This is the third option: one fetch, one JSON document, every blog post, reading
note and talk in both languages, with the metadata a caller needs to decide what
to read next and the URL of every format that entry is published in.

Runs after `zola build` and after the .md and .txt mirrors exist, since it points
at them.
"""
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from typing import Dict, List, TypedDict

from _common import (
    BASE_URL,
    PROJECT_ROOT,
    PUBLIC_DIR,
    SECTIONS,
    TLang,
    TSection,
    entry_url,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
    require_title,
)

LAST_MODIFIED = PROJECT_ROOT / 'data' / 'last-modified.json'
WORD = re.compile(r'\w+', re.UNICODE)


class TIndexEntry(TypedDict, total=False):
    url: str
    markdown: str
    text: str
    section: TSection
    slug: str
    lang: TLang
    title: str
    description: str
    date: str
    modified: str
    tags: List[str]
    series: str
    series_order: int
    word_count: int


def read_modified() -> Dict[str, str]:
    """The body-edit dates written by generate-last-modified.py, if they are there.

    Optional rather than required: this file is a build artifact, and a caller
    running the generators by hand in a different order should still get an index,
    just without the modified dates.
    """
    if not LAST_MODIFIED.is_file():
        return {}
    return json.loads(LAST_MODIFIED.read_text(encoding='utf-8'))


def extra_field(source: str, key: str) -> str:
    """Read a scalar `key = "value"` out of raw front matter."""
    match = re.search(rf'^{key}\s*=\s*"?([^"\n]+)"?', source, re.MULTILINE)
    return match.group(1).strip() if match else ''


def build_entries(modified: Dict[str, str]) -> List[TIndexEntry]:
    entries: List[TIndexEntry] = []

    for section in SECTIONS:
        for filepath in iter_section_files(section, translations=True):
            is_es = '.es.md' in filepath.name
            lang: TLang = 'es' if is_es else 'en'
            frontmatter, body = read_entry(filepath)
            slug = get_slug_from_filename(filepath.name)
            url = entry_url(section, slug, es=is_es)
            relative = str(filepath.relative_to(PROJECT_ROOT / 'content'))
            raw = filepath.read_text(encoding='utf-8')

            entry: TIndexEntry = {
                'url': url,
                'markdown': f'{url}index.md',
                'section': section,
                'slug': slug,
                'lang': lang,
                'title': require_title(frontmatter, filepath),
                'description': frontmatter.get('description', ''),
                'date': frontmatter.get('date', ''),
                'tags': frontmatter.get('tags', []),
                'word_count': len(WORD.findall(body)),
            }
            # The .txt mirrors are English-only, so only English entries can
            # advertise one. A URL here that 404s is worse than a missing key.
            if lang == 'en':
                entry['text'] = f'{url}index.txt'
            if relative in modified:
                entry['modified'] = modified[relative]

            series = extra_field(raw, 'series')
            if series:
                entry['series'] = series
                order = extra_field(raw, 'series_order')
                if order.isdigit():
                    entry['series_order'] = int(order)

            entries.append(entry)

    entries.sort(key=lambda e: (e.get('date', ''), e['slug']), reverse=True)
    return entries


def main() -> None:
    entries = build_entries(read_modified())
    counts: Dict[str, int] = {}
    for entry in entries:
        counts[entry['section']] = counts.get(entry['section'], 0) + 1

    document = {
        'site': {
            'title': 'Chemaclass',
            'url': BASE_URL,
            'author': 'Jose Maria Valera Reales',
            'languages': ['en', 'es'],
            'license': 'https://creativecommons.org/licenses/by/4.0/',
            'usage_policy': f'{BASE_URL}/.well-known/ai.txt',
        },
        'formats': {
            'summary_index': f'{BASE_URL}/llms.txt',
            'full_text': f'{BASE_URL}/llms-full.txt',
            'sitemap': f'{BASE_URL}/sitemap.xml',
            'json_feed': f'{BASE_URL}/feed.json',
            'atom': f'{BASE_URL}/atom.xml',
        },
        'generated': datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        'counts': {'total': len(entries), **counts},
        'entries': entries,
    }

    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    (PUBLIC_DIR / 'index.json').write_text(
        json.dumps(document, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'  Generated index.json with {len(entries)} entries')


if __name__ == '__main__':
    main()
