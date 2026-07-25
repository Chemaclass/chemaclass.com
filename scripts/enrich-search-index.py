#!/usr/bin/env python3
"""
Post-build script to add publication dates to the search index.
Run after `zola build` to enrich search_index.en.json with dates.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Dict

from _common import (
    CONTENT_DIR,
    PUBLIC_DIR,
    SECTIONS,
    entry_url,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
)


def build_url_to_date_map(content_dir: Path) -> Dict[str, str]:
    """Build a mapping from entry URL to publication date.

    Only English entries are walked. Their `.es.md` siblings share the slug, so
    including them would rewrite the same key with whichever file the filesystem
    happened to yield last."""
    url_to_date = {}

    for section in SECTIONS:
        for filepath in iter_section_files(section, content_dir):
            fm, _ = read_entry(filepath)
            date = fm.get('date')
            if date:
                url = entry_url(section, get_slug_from_filename(filepath.name))
                url_to_date[url] = date

    return url_to_date

def enrich_search_index(public_dir: Path, url_to_date: Dict[str, str]) -> bool:
    """Add dates to search indices for all languages."""
    total_enriched = 0

    for index_file in public_dir.glob('search_index.*.json'):
        with open(index_file, 'r', encoding='utf-8') as f:
            search_index = json.load(f)

        docs = search_index['documentStore']['docs']

        enriched_count = 0
        for url, doc in docs.items():
            if url in url_to_date:
                doc['date'] = url_to_date[url]
                enriched_count += 1

        with open(index_file, 'w', encoding='utf-8') as f:
            json.dump(search_index, f, ensure_ascii=False, separators=(',', ':'))

        print(f"  {index_file.name}: {enriched_count} documents")
        total_enriched += enriched_count

    return total_enriched > 0

def main() -> None:
    print("Building URL to date mapping...")
    url_to_date = build_url_to_date_map(CONTENT_DIR)
    print(f"Found {len(url_to_date)} dated documents")

    print("Enriching search indices...")
    enrich_search_index(PUBLIC_DIR, url_to_date)

if __name__ == '__main__':
    main()
