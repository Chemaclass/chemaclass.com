#!/usr/bin/env python3
"""
Generate llms-full.txt with full content of all site articles, and append the
content index to llms.txt.

llms-full.txt follows the emerging convention so AI agents can ingest the site
as a single text file instead of crawling page-by-page. llms.txt is the summary
index next to it: the prose half is hand-written in static/llms.txt (and
static/es/llms.txt), and the per-entry link list below the marker is written
here, because a hand-maintained one goes stale the moment a post is published.
"""

from __future__ import annotations

import re
import sys
from typing import List, Tuple, TypedDict

from _common import (
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

# Everything from this heading down is regenerated on every build. The prose
# above it stays hand-written, so the marker has to be present in the source
# file: silently appending instead would double the index on the next run.
INDEX_MARKER = '## Content index'


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


def build_content_index(lang: TLang) -> Tuple[List[str], int]:
    """The per-entry link list for llms.txt, newest first within each section.

    Links point at the .md mirror rather than the HTML page: an agent reading
    llms.txt wants the source, and the mirrors are already published next to
    every entry.
    """
    lines: List[str] = [INDEX_MARKER, '']
    total = 0

    for section in SECTIONS:
        entries: List[Tuple[str, str, str, str]] = []
        for filepath in iter_section_files(section, translations=(lang == 'es')):
            is_es = '.es.md' in filepath.name
            if is_es != (lang == 'es'):
                continue
            fm, _ = read_entry(filepath)
            url = entry_url(section, get_slug_from_filename(filepath.name), es=is_es)
            entries.append((
                fm.get('date', ''),
                require_title(fm, filepath),
                f'{url}index.md',
                fm.get('description', ''),
            ))

        if not entries:
            continue

        entries.sort(key=lambda e: e[0], reverse=True)
        lines.append(f'### {section.title()} ({len(entries)})')
        lines.append('')
        for date, title, url, description in entries:
            date_str = f'`{date}` ' if date else ''
            lines.append(f'- {date_str}[{title}]({url})')
            if description:
                lines.append(f'  {description}')
        lines.append('')
        total += len(entries)

    return lines, total


def write_content_index(lang: TLang) -> int:
    """Replace the marked index section of the built llms.txt for one language.

    Reads the file Zola already copied from static/, so the hand-written prose
    is the source of truth for everything above the marker.
    """
    path = PUBLIC_DIR / 'llms.txt' if lang == 'en' else PUBLIC_DIR / 'es' / 'llms.txt'
    if not path.is_file():
        sys.exit(f'{path}: expected Zola to have copied it from static/ before this runs')

    text = path.read_text(encoding='utf-8')
    if INDEX_MARKER not in text:
        sys.exit(
            f'{path.name}: no "{INDEX_MARKER}" heading to write the entry list under. '
            'Add it to the source file in static/, at the point the generated index belongs.'
        )

    prose = text.split(INDEX_MARKER)[0].rstrip()
    index_lines, total = build_content_index(lang)
    path.write_text(prose + '\n\n' + '\n'.join(index_lines).rstrip() + '\n', encoding='utf-8')
    return total


def main() -> None:
    header = [
        '# Chemaclass - Full Content (llms-full.txt)\n',
        '> Complete corpus of articles, reading notes, and talks on chemaclass.com',
        '> Summary index: https://chemaclass.com/llms.txt',
        '> Site map:      https://chemaclass.com/sitemap.xml',
        '> Author:        Jose Maria Valera Reales (Chemaclass)',
        '> License:       CC BY 4.0. Retrieval, citation and training are permitted; name the source.',
        '>                 https://creativecommons.org/licenses/by/4.0/',
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

    for lang in ('en', 'es'):
        indexed = write_content_index(lang)
        print(f'  Wrote the llms.txt content index ({lang}): {indexed} entries')


if __name__ == '__main__':
    main()
