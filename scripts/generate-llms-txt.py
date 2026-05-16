#!/usr/bin/env python3
"""
Generate llms-full.txt with full content of all site articles.
Follows the emerging llms-full.txt convention so AI agents can ingest
the site as a single text file instead of crawling page-by-page.
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


def clean_body(content):
    """Extract markdown body (after frontmatter), strip noise but keep prose intact."""
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    body = re.sub(r'!\[.*?\]\(.*?\)', '', body)
    body = re.sub(r'<[^>]+>', '', body)
    body = re.sub(r'<!--\s*more\s*-->', '', body)
    body = re.sub(r'```[\s\S]*?```', '', body)
    body = re.sub(r'\n{3,}', '\n\n', body)
    return body.strip()


def build_listing(entries, section):
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


def build_full_section(entries, section):
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


def main():
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    content_dir = project_root / 'content'
    public_dir = project_root / 'public'

    base_url = 'https://chemaclass.com'
    sections = ['blog', 'readings', 'talks']

    header = [
        '# Chemaclass - Full Content (llms-full.txt)\n',
        '> Complete corpus of articles, reading notes, and talks on chemaclass.com',
        '> Summary index: https://chemaclass.com/llms.txt',
        '> Site map:      https://chemaclass.com/sitemap.xml',
        '> Author:        Jose Maria Valera Reales (Chemaclass)',
        '> License:       Content for AI retrieval, citation, and training is permitted.',
    ]

    listing_lines = []
    full_lines = []
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
            body = clean_body(content)

            entries.append({
                'title': fm['title'],
                'date': fm.get('date', ''),
                'description': fm.get('description', ''),
                'tags': fm.get('tags', []),
                'url': url,
                'body': body,
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

    llms_full_path = public_dir / 'llms-full.txt'
    public_dir.mkdir(parents=True, exist_ok=True)
    with open(llms_full_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output) + '\n')

    print(f'  Generated llms-full.txt with {total} entries (full bodies)')


if __name__ == '__main__':
    main()
