#!/usr/bin/env python3
"""
Generate llms-full.txt with a complete listing of all site content.
This file helps AI crawlers understand the full scope of the site.
"""

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

    return frontmatter


def extract_date_from_filename(filename):
    """Extract date from filename like 2024-01-15-slug.md"""
    match = re.match(r'^(\d{4}-\d{2}-\d{2})-', filename)
    if match:
        return match.group(1)
    return None


def get_slug_from_filename(filename):
    """Extract slug from filename, removing date prefix and language suffix."""
    name = filename.replace('.md', '')
    name = re.sub(r'\.(es|en)$', '', name)
    name = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', name)
    return name


def get_content_body(content):
    """Extract markdown body (after frontmatter), stripped of HTML and formatting."""
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    # Remove images
    body = re.sub(r'!\[.*?\]\(.*?\)', '', body)
    # Remove HTML tags
    body = re.sub(r'<[^>]+>', '', body)
    # Remove markdown formatting
    body = re.sub(r'\*\*([^*]+)\*\*', r'\1', body)
    body = re.sub(r'\*([^*]+)\*', r'\1', body)
    body = re.sub(r'`([^`]+)`', r'\1', body)
    body = re.sub(r'```[\s\S]*?```', '', body)
    # Remove <!-- more --> markers
    body = re.sub(r'<!--\s*more\s*-->', '', body)
    # Collapse whitespace
    body = re.sub(r'\n{3,}', '\n\n', body)
    return body.strip()


def main():
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    content_dir = project_root / 'content'
    public_dir = project_root / 'public'

    base_url = 'https://chemaclass.com'
    sections = ['blog', 'readings', 'talks']

    output_lines = []
    output_lines.append('# Chemaclass - Full Content Listing\n')
    output_lines.append('> Complete index of all articles, readings, and talks on chemaclass.com')
    output_lines.append('> For a summary, see: https://chemaclass.com/llms.txt\n')

    total = 0

    for section in sections:
        section_path = content_dir / section
        if not section_path.exists():
            continue

        entries = []

        for filepath in sorted(section_path.glob('*.md')):
            if filepath.name == '_index.md':
                continue
            if '.es.md' in filepath.name:
                continue

            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception:
                continue

            fm = extract_frontmatter(content)
            if not fm.get('title'):
                continue

            if 'date' not in fm:
                date = extract_date_from_filename(filepath.name)
                if date:
                    fm['date'] = date

            slug = get_slug_from_filename(filepath.name)
            url = f'{base_url}/{section}/{slug}/'

            entries.append({
                'title': fm['title'],
                'date': fm.get('date', ''),
                'description': fm.get('description', ''),
                'tags': fm.get('tags', []),
                'url': url,
            })

        if not entries:
            continue

        # Sort by date descending
        entries.sort(key=lambda x: x['date'], reverse=True)

        output_lines.append(f'\n## {section.title()} ({len(entries)} entries)\n')

        for entry in entries:
            date_str = f' ({entry["date"]})' if entry['date'] else ''
            output_lines.append(f'- [{entry["title"]}]({entry["url"]}){date_str}')
            if entry['description']:
                output_lines.append(f'  {entry["description"]}')
            if entry['tags']:
                output_lines.append(f'  Tags: {", ".join(entry["tags"])}')

        total += len(entries)

    output_lines.append(f'\n---\nTotal: {total} entries')
    output_lines.append(f'Last generated from source at build time.')

    llms_full_path = public_dir / 'llms-full.txt'
    public_dir.mkdir(parents=True, exist_ok=True)

    with open(llms_full_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines) + '\n')

    print(f'  Generated llms-full.txt with {total} entries')


if __name__ == '__main__':
    main()
