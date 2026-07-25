#!/usr/bin/env python3
"""
Post-build script to add publication dates to the search index.
Run after `zola build` to enrich search_index.en.json with dates.
"""

from __future__ import annotations

import json
import sys
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
    """Build a mapping from entry URL to publication date, both languages.

    A `.es.md` shares its slug with the English original but is published under
    /es/, so the language has to reach the URL. Walking English only, or building
    the URL off the filename stem, produces keys no Spanish permalink can match,
    which is how search_index.es.json ended up with a date on none of its 221
    documents while the English index had 164."""
    url_to_date = {}

    for section in SECTIONS:
        for filepath in iter_section_files(section, content_dir, translations=True):
            fm, _ = read_entry(filepath)
            date = fm.get('date')
            if date:
                url = entry_url(
                    section,
                    get_slug_from_filename(filepath.name),
                    es='.es.md' in filepath.name,
                )
                url_to_date[url] = date

    return url_to_date

def enrich_search_index(public_dir: Path, url_to_date: Dict[str, str]) -> None:
    """Add dates to search indices for all languages.

    An index that comes out with no dates at all means the URLs built from the
    filenames no longer match the permalinks Zola wrote, so every result in that
    language loses its date. Printing the count and returning a bool nobody read
    is what let exactly that ship for the Spanish index, so fail the build here.
    """
    index_files = sorted(public_dir.glob('search_index.*.json'))
    if not index_files:
        sys.exit(
            f"no search_index.*.json in {public_dir}: run `zola build` first, or "
            "build_search_index has been turned off in config.toml"
        )

    for index_file in index_files:
        with open(index_file, 'r', encoding='utf-8') as f:
            search_index = json.load(f)

        docs = search_index['documentStore']['docs']

        enriched_count = 0
        for url, doc in docs.items():
            if url in url_to_date:
                doc['date'] = url_to_date[url]
                enriched_count += 1

        if not enriched_count:
            sys.exit(
                f"{index_file.name}: none of its {len(docs)} documents matched a "
                "dated content file, so no result would show a date. The URLs built "
                "from content/ no longer line up with the permalinks in the index."
            )

        with open(index_file, 'w', encoding='utf-8') as f:
            json.dump(search_index, f, ensure_ascii=False, separators=(',', ':'))

        print(f"  {index_file.name}: {enriched_count} documents")

def main() -> None:
    print("Building URL to date mapping...")
    url_to_date = build_url_to_date_map(CONTENT_DIR)
    print(f"Found {len(url_to_date)} dated documents")

    print("Enriching search indices...")
    enrich_search_index(PUBLIC_DIR, url_to_date)

if __name__ == '__main__':
    main()
