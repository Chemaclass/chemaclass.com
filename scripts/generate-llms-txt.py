#!/usr/bin/env python3
"""
Generate llms-full.txt with full content of all site articles.
Follows the emerging llms-full.txt convention so AI agents can ingest
the site as a single text file instead of crawling page-by-page.
"""

from __future__ import annotations

import re
from typing import List, TypedDict

from _common import (
    PUBLIC_DIR,
    SECTIONS,
    TSection,
    entry_url,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
    require_title,
)


class TEntry(TypedDict):
    """One article in the corpus. Total, unlike the front matter it comes from:
    the collector below fills every optional field with '' or [] before
    appending, which is what lets the builders index straight into the record."""
    title: str
    date: str
    description: str
    tags: List[str]
    url: str
    body: str


def clean_body(body: str) -> str:
    """Strip noise from a markdown body but keep the prose intact."""
    body = re.sub(r'!\[.*?\]\(.*?\)', '', body)
    body = re.sub(r'<[^>]+>', '', body)
    body = re.sub(r'<!--\s*more\s*-->', '', body)
    body = re.sub(r'```[\s\S]*?```', '', body)
    body = re.sub(r'\n{3,}', '\n\n', body)
    return body.strip()


def build_listing(entries: List[TEntry], section: TSection) -> List[str]:
    """Compact index for the section (titles + URLs)."""
    lines = [f'\n## {section.title()} index ({len(entries)} entries)\n']
    for e in entries:
        date_str = f' ({e["date"]})' if e['date'] else ''
        lines.append(f'- [{e["title"]}]({e["url"]}){date_str}')
        if e['description']:
            lines.append(f'  {e["description"]}')
        if e['tags']:
            lines.append(f'  Tags: {", ".join(e["tags"])}')
    return lines


def build_full_section(entries: List[TEntry], section: TSection) -> List[str]:
    """Full body dump for the section."""
    lines = [f'\n\n# {section.title()} - Full Articles\n']
    for e in entries:
        lines.append('\n---\n')
        lines.append(f'## {e["title"]}\n')
        if e['date']:
            lines.append(f'Date: {e["date"]}')
        lines.append(f'URL: {e["url"]}')
        if e['tags']:
            lines.append(f'Tags: {", ".join(e["tags"])}')
        if e['description']:
            lines.append(f'\n> {e["description"]}\n')
        lines.append('')
        lines.append(e['body'])
    return lines


def main() -> None:
    header = [
        '# Chemaclass - Full Content (llms-full.txt)\n',
        '> Complete corpus of articles, reading notes, and talks on chemaclass.com',
        '> Summary index: https://chemaclass.com/llms.txt',
        '> Site map:      https://chemaclass.com/sitemap.xml',
        '> Author:        Jose Maria Valera Reales (Chemaclass)',
        '> License:       Content for AI retrieval, citation, and training is permitted.',
    ]

    listing_lines: List[str] = []
    full_lines: List[str] = []
    total = 0

    for section in SECTIONS:
        entries: List[TEntry] = []
        for filepath in iter_section_files(section):
            fm, body = read_entry(filepath)

            entries.append({
                'title': require_title(fm, filepath),
                'date': fm.get('date', ''),
                'description': fm.get('description', ''),
                'tags': fm.get('tags', []),
                'url': entry_url(section, get_slug_from_filename(filepath.name)),
                'body': clean_body(body),
            })

        if not entries:
            continue

        entries.sort(key=lambda x: x['date'], reverse=True)
        listing_lines.extend(build_listing(entries, section))
        full_lines.extend(build_full_section(entries, section))
        total += len(entries)

    output = header + listing_lines + full_lines
    output.append(f'\n---\nTotal: {total} entries')
    output.append('Last generated from source at build time.')

    llms_full_path = PUBLIC_DIR / 'llms-full.txt'
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    with open(llms_full_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output) + '\n')

    print(f'  Generated llms-full.txt with {total} entries (full bodies)')


if __name__ == '__main__':
    main()
