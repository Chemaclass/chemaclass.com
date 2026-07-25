#!/usr/bin/env python3
"""
Generate a virtual filesystem JSON for the terminal interface.
Parses all markdown content and creates a navigable structure.
"""

import json
from pathlib import Path

from _common import (
    extract_date_from_filename,
    extract_frontmatter,
    get_content_body,
    get_slug_from_filename,
)


def process_markdown_file(filepath: Path) -> dict:
    """Process a single markdown file and return its metadata."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter = extract_frontmatter(content)
    body = get_content_body(content, strip_yaml=True)

    # Get date from filename if not in frontmatter
    if 'date' not in frontmatter:
        date = extract_date_from_filename(filepath.name)
        if date:
            frontmatter['date'] = date

    return {
        'type': 'file',
        'title': frontmatter.get('title', filepath.stem),
        'date': frontmatter.get('date', ''),
        'description': frontmatter.get('description', ''),
        'tags': frontmatter.get('tags', []),
        'subtitle': frontmatter.get('subtitle', ''),
        'related_posts': frontmatter.get('related_posts', []),
        'related_readings': frontmatter.get('related_readings', []),
        'content': body
    }


def build_filesystem(content_dir: Path) -> dict:
    """Build the virtual filesystem structure."""
    fs = {}

    sections = ['blog', 'readings', 'talks']

    for section in sections:
        section_path = content_dir / section
        if not section_path.exists():
            continue

        fs[section] = {
            'type': 'dir',
            'children': {}
        }

        for filepath in sorted(section_path.glob('*.md')):
            # Skip index files and non-English versions
            if filepath.name == '_index.md':
                continue
            if '.es.md' in filepath.name:
                continue

            slug = get_slug_from_filename(filepath.name)
            file_data = process_markdown_file(filepath)

            if file_data:
                fs[section]['children'][slug] = file_data

    # Add services as a directory
    services_path = content_dir / 'services'
    if services_path.exists():
        fs['services'] = {
            'type': 'dir',
            'children': {}
        }
        for filepath in sorted(services_path.glob('*.md')):
            if filepath.name == '_index.md':
                continue
            if '.es.md' in filepath.name:
                continue

            slug = get_slug_from_filename(filepath.name)
            file_data = process_markdown_file(filepath)

            if file_data:
                fs['services']['children'][slug] = file_data

    # Add about info
    fs['about.txt'] = {
        'type': 'file',
        'title': 'About',
        'content': '''Jose Maria Valera Reales (Chemaclass)

Software Developer | Tech Lead | Speaker

Location: Berlin, Germany
Website: https://chemaclass.com
GitHub: https://github.com/Chemaclass
Twitter: @Chemaclass

I write about software development, leadership, and team dynamics.
I believe in continuous improvement and sharing knowledge.

Type 'ls' to see available sections, or 'help' for all commands.'''
    }

    return fs


def main() -> None:
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    content_dir = project_root / 'content'
    public_dir = project_root / 'public'

    # Ensure public directory exists
    public_dir.mkdir(exist_ok=True)

    print("Building terminal filesystem...")
    fs = build_filesystem(content_dir)

    # Count entries
    total_files = 0
    for key, value in fs.items():
        if value.get('type') == 'dir':
            total_files += len(value.get('children', {}))
        else:
            total_files += 1

    print(f"Found {total_files} files across {len([k for k, v in fs.items() if v.get('type') == 'dir'])} directories")

    # Write JSON file to static/ (for zola serve) and public/ (for builds)
    static_dir = project_root / 'static'

    for output_dir in [static_dir, public_dir]:
        output_dir.mkdir(exist_ok=True)
        output_path = output_dir / 'terminal-fs.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(fs, f, ensure_ascii=False, indent=2)
        print(f"Written to {output_path}")


if __name__ == '__main__':
    main()
