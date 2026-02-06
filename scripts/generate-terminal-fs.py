#!/usr/bin/env python3
"""
Generate a virtual filesystem JSON for the terminal interface.
Parses all markdown content and creates a navigable structure.
"""

import json
import os
import re
from pathlib import Path


def extract_frontmatter(content):
    """Extract TOML frontmatter from markdown content."""
    frontmatter = {}

    # Match TOML frontmatter (between +++ markers)
    toml_match = re.search(r'^\+\+\+\s*\n(.*?)\n\+\+\+', content, re.DOTALL)
    if toml_match:
        fm_text = toml_match.group(1)

        # Extract title
        title_match = re.search(r'^title\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if title_match:
            frontmatter['title'] = title_match.group(1)

        # Extract description
        desc_match = re.search(r'^description\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if desc_match:
            frontmatter['description'] = desc_match.group(1)

        # Extract date from frontmatter or filename will be used
        date_match = re.search(r'^date\s*=\s*["\']?(\d{4}-\d{2}-\d{2})', fm_text, re.MULTILINE)
        if date_match:
            frontmatter['date'] = date_match.group(1)

        # Extract tags
        tags_match = re.search(r'tags\s*=\s*\[(.*?)\]', fm_text, re.DOTALL)
        if tags_match:
            tags_str = tags_match.group(1)
            tags = re.findall(r'"([^"]*)"', tags_str)
            frontmatter['tags'] = tags

        # Extract subtitle from extra section
        subtitle_match = re.search(r'subtitle\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if subtitle_match:
            frontmatter['subtitle'] = subtitle_match.group(1)

        # Extract related_posts
        related_posts_match = re.search(r'related_posts\s*=\s*\[(.*?)\]', fm_text, re.DOTALL)
        if related_posts_match:
            related_posts_str = related_posts_match.group(1)
            related_posts = re.findall(r'"([^"]*)"', related_posts_str)
            frontmatter['related_posts'] = related_posts

        # Extract related_readings
        related_readings_match = re.search(r'related_readings\s*=\s*\[(.*?)\]', fm_text, re.DOTALL)
        if related_readings_match:
            related_readings_str = related_readings_match.group(1)
            related_readings = re.findall(r'"([^"]*)"', related_readings_str)
            frontmatter['related_readings'] = related_readings

    return frontmatter


def extract_date_from_filename(filename):
    """Extract date from filename like 2024-01-15-slug.md"""
    match = re.match(r'^(\d{4}-\d{2}-\d{2})-', filename)
    if match:
        return match.group(1)
    return None


def get_content_body(content):
    """Extract markdown body (after frontmatter)."""
    # Remove TOML frontmatter
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    # Remove YAML frontmatter
    body = re.sub(r'^---\s*\n.*?\n---\s*\n?', '', body, flags=re.DOTALL)
    return body.strip()


def process_markdown_file(filepath):
    """Process a single markdown file and return its metadata."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter = extract_frontmatter(content)
        body = get_content_body(content)

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
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None


def get_slug_from_filename(filename):
    """Extract slug from filename, removing date prefix."""
    # Remove .md extension
    name = filename.replace('.md', '')
    # Remove language suffix like .es
    name = re.sub(r'\.(es|en)$', '', name)
    # Remove date prefix
    name = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', name)
    return name


def build_filesystem(content_dir):
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


def main():
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
