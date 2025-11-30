#!/usr/bin/env python3
"""
Post-build script to add publication dates to the search index.
Run after `zola build` to enrich search_index.en.json with dates.
"""

import json
import os
import re
from pathlib import Path

def extract_date_from_frontmatter(filepath):
    """Extract date from markdown frontmatter."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Match TOML frontmatter (between +++ markers)
        toml_match = re.search(r'^\+\+\+\s*\n(.*?)\n\+\+\+', content, re.DOTALL)
        if toml_match:
            frontmatter = toml_match.group(1)
            date_match = re.search(r'^date\s*=\s*["\']?(\d{4}-\d{2}-\d{2})', frontmatter, re.MULTILINE)
            if date_match:
                return date_match.group(1)

        # Match YAML frontmatter (between --- markers)
        yaml_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
        if yaml_match:
            frontmatter = yaml_match.group(1)
            date_match = re.search(r'^date:\s*["\']?(\d{4}-\d{2}-\d{2})', frontmatter, re.MULTILINE)
            if date_match:
                return date_match.group(1)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

    return None

def extract_date_from_filename(filename):
    """Extract date from filename like 2024-01-15-slug.md"""
    match = re.match(r'^(\d{4}-\d{2}-\d{2})-', filename)
    if match:
        return match.group(1)
    return None

def build_url_to_date_map(content_dir):
    """Build a mapping from URL paths to dates."""
    url_to_date = {}
    base_url = "https://chemaclass.com"

    sections = ['blog', 'readings', 'talks']

    for section in sections:
        section_path = content_dir / section
        if not section_path.exists():
            continue

        for filepath in section_path.glob('*.md'):
            if filepath.name == '_index.md':
                continue

            # Try frontmatter first, then filename
            date = extract_date_from_frontmatter(filepath)
            if not date:
                date = extract_date_from_filename(filepath.name)

            if date:
                # Generate the URL slug (remove date prefix and .md extension)
                slug = filepath.stem
                slug = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', slug)

                url = f"{base_url}/{section}/{slug}/"
                url_to_date[url] = date

    return url_to_date

def enrich_search_index(public_dir, url_to_date):
    """Add dates to the search index."""
    index_path = public_dir / 'search_index.en.json'

    if not index_path.exists():
        print(f"Search index not found at {index_path}")
        return False

    with open(index_path, 'r', encoding='utf-8') as f:
        search_index = json.load(f)

    docs = search_index.get('documentStore', {}).get('docs', {})

    enriched_count = 0
    for url, doc in docs.items():
        if url in url_to_date:
            doc['date'] = url_to_date[url]
            enriched_count += 1

    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump(search_index, f, ensure_ascii=False)

    print(f"Enriched {enriched_count} documents with dates")
    return True

def main():
    # Determine paths relative to script location
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    content_dir = project_root / 'content'
    public_dir = project_root / 'public'

    print("Building URL to date mapping...")
    url_to_date = build_url_to_date_map(content_dir)
    print(f"Found {len(url_to_date)} dated documents")

    print("Enriching search index...")
    enrich_search_index(public_dir, url_to_date)
    print("Done!")

if __name__ == '__main__':
    main()
