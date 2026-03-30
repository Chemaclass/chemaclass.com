#!/usr/bin/env python3
"""
Generate markdown versions of all pages for raw markdown access.
Creates index.md files alongside HTML for markdown-friendly viewing.
Inspired by Claude Code docs serving raw .md files.
"""

import os
import re
from pathlib import Path


def extract_frontmatter(content):
    """Extract TOML frontmatter from markdown content."""
    frontmatter = {}

    toml_match = re.search(r'^\+\+\+\s*\n(.*?)\n\+\+\+', content, re.DOTALL)
    if toml_match:
        fm_text = toml_match.group(1)

        title_match = re.search(r'^title\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if title_match:
            frontmatter['title'] = title_match.group(1)

        desc_match = re.search(r'^description\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if desc_match:
            frontmatter['description'] = desc_match.group(1)

        date_match = re.search(r'^date\s*=\s*["\']?(\d{4}-\d{2}-\d{2})', fm_text, re.MULTILINE)
        if date_match:
            frontmatter['date'] = date_match.group(1)

        tags_match = re.search(r'tags\s*=\s*\[(.*?)\]', fm_text, re.DOTALL)
        if tags_match:
            tags_str = tags_match.group(1)
            tags = re.findall(r'"([^"]*)"', tags_str)
            frontmatter['tags'] = tags

        subtitle_match = re.search(r'^subtitle\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if subtitle_match:
            frontmatter['subtitle'] = subtitle_match.group(1)

    return frontmatter


def extract_date_from_filename(filename):
    """Extract date from filename like 2024-01-15-slug.md"""
    match = re.match(r'^(\d{4}-\d{2}-\d{2})-', filename)
    if match:
        return match.group(1)
    return None


def get_content_body(content):
    """Extract markdown body (after frontmatter)."""
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    return body.strip()


def get_slug_from_filename(filename):
    """Extract slug from filename, removing date prefix."""
    name = filename.replace('.md', '')
    name = re.sub(r'\.(es|en)$', '', name)
    name = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', name)
    return name


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
        output += f'- {date_prefix}[{file_title}](/{section}/{slug}/index.md)\n'
        if desc:
            output += f'  {desc}\n'

    output += '\n'
    return output


def process_markdown_file(filepath, section, base_url):
    """Process a single markdown file and generate .md version."""
    try:
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
    except Exception as e:
        print(f'Error processing {filepath}: {e}')
        return None


def main():
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

        for filepath in sorted(section_path.glob('*.md')):
            # Skip index files and non-English versions
            if filepath.name == '_index.md':
                continue
            if '.es.md' in filepath.name:
                continue

            result = process_markdown_file(filepath, section, base_url)
            if result:
                section_files.append(result)

                output_dir = public_dir / section / result['slug']
                output_dir.mkdir(parents=True, exist_ok=True)

                md_path = output_dir / 'index.md'
                with open(md_path, 'w', encoding='utf-8') as f:
                    f.write(result['md_content'])

                total_files += 1

        # Generate section index.md
        if section_files:
            index_content = generate_index_md(section, section_files, base_url)
            index_dir = public_dir / section
            index_dir.mkdir(parents=True, exist_ok=True)

            index_path = index_dir / 'index.md'
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(index_content)

            print(f'  {section}/: {len(section_files)} files + index.md')

    print(f'Generated {total_files} .md files')


if __name__ == '__main__':
    main()
