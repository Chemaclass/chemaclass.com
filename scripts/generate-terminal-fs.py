#!/usr/bin/env python3
"""
Generate a virtual filesystem JSON for the terminal interface.
Parses all markdown content and creates a navigable structure.
"""

import json
from pathlib import Path

from _common import (
    CONTENT_DIR,
    PUBLIC_DIR,
    SECTIONS,
    STATIC_DIR,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
    require_title,
)


def process_markdown_file(filepath: Path) -> dict:
    """Process a single markdown file and return its metadata."""
    frontmatter, body = read_entry(filepath, strip_yaml=True)

    return {
        'type': 'file',
        'title': require_title(frontmatter, filepath),
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

    # services joins the usual sections here: the terminal browses it like the rest.
    for section in SECTIONS + ['services']:
        children = {
            get_slug_from_filename(filepath.name): process_markdown_file(filepath)
            for filepath in iter_section_files(section, content_dir)
        }
        if not children and not (content_dir / section).is_dir():
            continue
        fs[section] = {
            'type': 'dir',
            'children': children
        }

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
    print("Building terminal filesystem...")
    fs = build_filesystem(CONTENT_DIR)

    # Count entries
    total_files = 0
    for key, value in fs.items():
        if value.get('type') == 'dir':
            total_files += len(value.get('children', {}))
        else:
            total_files += 1

    print(f"Found {total_files} files across {len([k for k, v in fs.items() if v.get('type') == 'dir'])} directories")

    # Write JSON file to static/ (for zola serve) and public/ (for builds)
    for output_dir in [STATIC_DIR, PUBLIC_DIR]:
        output_dir.mkdir(exist_ok=True)
        output_path = output_dir / 'terminal-fs.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(fs, f, ensure_ascii=False, indent=2)
        print(f"Written to {output_path}")


if __name__ == '__main__':
    main()
