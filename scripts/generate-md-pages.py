#!/usr/bin/env python3
"""
Generate markdown versions of all pages for raw markdown access.
Creates index.md files alongside HTML for markdown-friendly viewing.
Inspired by Claude Code docs serving raw .md files.
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Dict, List, TypedDict

from _common import (
    BASE_URL,
    PUBLIC_DIR,
    SECTIONS,
    TFrontMatter,
    TLang,
    TSection,
    entry_url,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
    require_title,
)


class TMdPage(TypedDict):
    """One rendered page, plus the metadata the section index needs. Total: the
    processor fills every field, so generate_index_md reads them directly."""
    slug: str
    title: str
    date: str
    description: str
    md_content: str


def format_md_page(frontmatter: TFrontMatter, body: str, url: str, title: str) -> str:
    """Format a markdown page with a clean header and original content."""
    subtitle = frontmatter.get('subtitle', '')
    date = frontmatter.get('date', '')
    tags = frontmatter.get('tags', [])
    description = frontmatter.get('description', '')

    output = f'# {title}\n\n'

    if subtitle:
        output += f'*{subtitle}*\n\n'

    # The canonical URL of the page this mirrors. These files exist to be read
    # away from the site, by an agent or a plain curl, so the one thing they must
    # carry is where they came from. It is also what keeps `url` honest: while
    # nothing printed it, the caller could pass the English URL for a Spanish
    # page and no output ever disagreed.
    output += f'{url}\n\n'

    # The mirrors are read away from the site, by an agent or a plain curl, so
    # the licence travels with them rather than living only in the page footer.
    output += 'License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)\n\n'

    meta_parts = []
    if date:
        meta_parts.append(date)
    if tags:
        meta_parts.append(' '.join(f'`{t}`' for t in tags))

    if meta_parts:
        output += ' | '.join(meta_parts) + '\n\n'

    if description:
        output += f'> {description}\n\n'

    output += '---\n\n'
    output += body + '\n'

    return output


def generate_index_md(section: TSection, files: List[TMdPage], base_url: str) -> str:
    """Generate an index.md for a section listing all files."""
    title = section.capitalize()
    # Path prefix ('' or '/es'), peeled off the origin rather than off a literal
    # 'https://chemaclass.com': a second copy of the origin here silently stops
    # matching the moment base_url in config.toml changes.
    path_prefix = base_url[len(BASE_URL):]

    output = f'# {title}\n\n'
    output += f'[{base_url}/{section}/]({base_url}/{section}/)\n\n'
    output += '---\n\n'

    sorted_files = sorted(files, key=lambda x: x['date'], reverse=True)

    # process_markdown_file below sets every key, so index instead of defaulting:
    # a missing one is a bug here, not a page that genuinely has no slug.
    for f in sorted_files:
        date = f['date']
        slug = f['slug']
        file_title = f['title']
        desc = f['description']

        date_prefix = f'`{date}` ' if date else ''
        output += f'- {date_prefix}[{file_title}]({path_prefix}/{section}/{slug}/index.md)\n'
        if desc:
            output += f'  {desc}\n'

    output += '\n'
    return output


def process_markdown_file(filepath: Path, section: TSection, lang: TLang) -> TMdPage:
    """Process a single markdown file and generate .md version."""
    frontmatter, body = read_entry(filepath)
    title = require_title(frontmatter, filepath)
    slug = get_slug_from_filename(filepath.name)
    # entry_url takes the language explicitly: a Spanish page lives under /es/,
    # and passing the origin alone gave all 175 of them the English URL.
    url = entry_url(section, slug, es=(lang == 'es'))

    # Remove <!-- more --> markers
    body = re.sub(r'<!--\s*more\s*-->', '', body)

    md_content = format_md_page(frontmatter, body, url, title)

    return {
        'slug': slug,
        'title': title,
        'date': frontmatter.get('date', ''),
        'description': frontmatter.get('description', ''),
        'md_content': md_content
    }


def write(path: Path, text: str) -> None:
    """Write text, creating the parent directory."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')


def main() -> None:
    total_files = 0

    for section in SECTIONS:
        # Spanish entries are colocated with their English original and land under
        # /es/, so this generator wants both and sorts them apart by filename.
        per_lang: Dict[TLang, List[TMdPage]] = {'en': [], 'es': []}

        for filepath in iter_section_files(section, translations=True):
            lang: TLang = 'es' if '.es.md' in filepath.name else 'en'
            result = process_markdown_file(filepath, section, lang)
            per_lang[lang].append(result)

            prefix = PUBLIC_DIR / 'es' if lang == 'es' else PUBLIC_DIR
            write(prefix / section / result['slug'] / 'index.md', result['md_content'])
            total_files += 1

        for lang, files in per_lang.items():
            if not files:
                continue
            base = BASE_URL if lang == 'en' else f'{BASE_URL}/es'
            prefix = PUBLIC_DIR if lang == 'en' else PUBLIC_DIR / 'es'
            write(prefix / section / 'index.md', generate_index_md(section, files, base))

        if per_lang['en'] or per_lang['es']:
            print(f'  {section}/: {len(per_lang["en"])} EN + {len(per_lang["es"])} ES files')

    print(f'Generated {total_files} .md files')


if __name__ == '__main__':
    main()
