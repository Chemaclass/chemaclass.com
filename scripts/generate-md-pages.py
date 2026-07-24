#!/usr/bin/env python3
"""
Generate markdown versions of all pages for raw markdown access.
Creates index.md files alongside HTML for markdown-friendly viewing.
Inspired by Claude Code docs serving raw .md files.
"""

import re
from pathlib import Path

from _common import (
    extract_date_from_filename,
    extract_frontmatter,
    get_content_body,
    get_slug_from_filename,
)


def format_md_page(frontmatter, body, url):
    """Format a markdown page with a clean header and original content."""
    title = frontmatter.get('title', 'Untitled')
    subtitle = frontmatter.get('subtitle', '')
    date = frontmatter.get('date', '')
    tags = frontmatter.get('tags', [])
    description = frontmatter.get('description', '')

    output = f'# {title}\n\n'

    if subtitle:
        output += f'*{subtitle}*\n\n'

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


def generate_index_md(section, files, base_url):
    """Generate an index.md for a section listing all files."""
    title = section.capitalize()
    # Derive path prefix from base_url (e.g. '' or '/es')
    path_prefix = base_url.replace('https://chemaclass.com', '')

    output = f'# {title}\n\n'
    output += f'[{base_url}/{section}/]({base_url}/{section}/)\n\n'
    output += '---\n\n'

    sorted_files = sorted(files, key=lambda x: x.get('date', ''), reverse=True)

    for f in sorted_files:
        date = f.get('date', '')
        slug = f.get('slug', '')
        file_title = f.get('title', slug)
        desc = f.get('description', '')

        date_prefix = f'`{date}` ' if date else ''
        output += f'- {date_prefix}[{file_title}]({path_prefix}/{section}/{slug}/index.md)\n'
        if desc:
            output += f'  {desc}\n'

    output += '\n'
    return output


def process_markdown_file(filepath: Path, section: str, base_url: str) -> dict:
    """Process a single markdown file and generate .md version."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter = extract_frontmatter(content)
    body = get_content_body(content)

    if 'date' not in frontmatter:
        date = extract_date_from_filename(filepath.name)
        if date:
            frontmatter['date'] = date

    slug = get_slug_from_filename(filepath.name)
    url = f'{base_url}/{section}/{slug}/'

    # Remove <!-- more --> markers
    body = re.sub(r'<!--\s*more\s*-->', '', body)

    md_content = format_md_page(frontmatter, body, url)

    return {
        'slug': slug,
        'title': frontmatter.get('title', slug),
        'date': frontmatter.get('date', ''),
        'description': frontmatter.get('description', ''),
        'md_content': md_content
    }


def main() -> None:
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    content_dir = project_root / 'content'
    public_dir = project_root / 'public'

    base_url = 'https://chemaclass.com'
    sections = ['blog', 'readings', 'talks']

    total_files = 0

    for section in sections:
        section_path = content_dir / section
        if not section_path.exists():
            continue

        section_files = []
        es_section_files = []

        for filepath in sorted(section_path.glob('*.md')):
            if filepath.name.startswith('_index'):
                continue

            is_spanish = '.es.md' in filepath.name

            result = process_markdown_file(filepath, section, base_url)
            if result:
                if is_spanish:
                    es_section_files.append(result)
                    output_dir = public_dir / 'es' / section / result['slug']
                else:
                    section_files.append(result)
                    output_dir = public_dir / section / result['slug']

                output_dir.mkdir(parents=True, exist_ok=True)

                md_path = output_dir / 'index.md'
                with open(md_path, 'w', encoding='utf-8') as f:
                    f.write(result['md_content'])

                total_files += 1

        # Generate section index.md (EN)
        if section_files:
            index_content = generate_index_md(section, section_files, base_url)
            index_dir = public_dir / section
            index_dir.mkdir(parents=True, exist_ok=True)

            index_path = index_dir / 'index.md'
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(index_content)

        # Generate section index.md (ES)
        if es_section_files:
            index_content = generate_index_md(section, es_section_files, f'{base_url}/es')
            index_dir = public_dir / 'es' / section
            index_dir.mkdir(parents=True, exist_ok=True)

            index_path = index_dir / 'index.md'
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(index_content)

        if section_files or es_section_files:
            print(f'  {section}/: {len(section_files)} EN + {len(es_section_files)} ES files')

    print(f'Generated {total_files} .md files')


if __name__ == '__main__':
    main()
