#!/usr/bin/env python3
"""
Post-build script to add publication dates to the search index.
Run after `zola build` to enrich search_index.en.json with dates.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict

from _common import (
    CONTENT_DIR,
    PUBLIC_DIR,
    SECTIONS,
    entry_url,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
)

# Maps a full published URL to a YYYY-MM-DD date. The key is the whole URL,
# language prefix included, because that is how the search index keys its docs.
TUrlToDate = Dict[str, str]


def build_en_url_to_date_map(content_dir: Path) -> TUrlToDate:
    """Build a mapping from English entry URL to publication date.

    English only, and the name says so. A `.es.md` sibling shares its slug with
    the English original, so passing translations=True here would collide on the
    same key rather than produce the /es/ one: entry_url() takes the language
    from base_url, which this caller never varies.

    KNOWN GAP, not fixed here because this pass is required to be byte-identical:
    because every key is an English URL, only search_index.en.json is ever
    enriched. The Spanish index keys its docs as https://chemaclass.com/es/blog/x/
    and gets 0 dates out of 221 docs, so Spanish search results have no date to
    sort or display. Fixing it means walking translations and building the key
    with base_url=f'{BASE_URL}/es' for those, then returning both URL spaces in
    one map. The `str` key type is what let this hide: a dict[str, str] cannot
    say which URL space it covers."""
    url_to_date: TUrlToDate = {}

    for section in SECTIONS:
        for filepath in iter_section_files(section, content_dir):
            fm, _ = read_entry(filepath)
            date = fm.get('date')
            if date:
                url = entry_url(section, get_slug_from_filename(filepath.name))
                url_to_date[url] = date

    return url_to_date


def docs_of(search_index: Any, index_file: Path) -> Dict[str, Dict[str, Any]]:
    """Narrow the elasticlunr index Zola wrote down to its docs map.

    json.load hands back Any, so every access under it is unchecked. Zola owns
    this file's shape, which means a release that moved `documentStore.docs`
    would surface here as a bare KeyError, or as .items() on a list. Check the
    shape once, then the caller knows what it has."""
    store = search_index.get('documentStore') if isinstance(search_index, dict) else None
    docs = store.get('docs') if isinstance(store, dict) else None
    if not isinstance(docs, dict):
        raise SystemExit(
            f"{index_file}: expected documentStore.docs to be an object, got "
            f"{type(docs).__name__}. Did the Zola search index format change?"
        )
    return docs


def enrich_search_index(public_dir: Path, url_to_date: TUrlToDate) -> int:
    """Add dates to search indices for all languages. Returns how many documents
    got one, which is 0 for any index whose URL space url_to_date does not cover."""
    total_enriched = 0

    for index_file in public_dir.glob('search_index.*.json'):
        with open(index_file, 'r', encoding='utf-8') as f:
            search_index = json.load(f)

        docs = docs_of(search_index, index_file)

        enriched_count = 0
        for url, doc in docs.items():
            if url in url_to_date:
                doc['date'] = url_to_date[url]
                enriched_count += 1

        with open(index_file, 'w', encoding='utf-8') as f:
            json.dump(search_index, f, ensure_ascii=False, separators=(',', ':'))

        print(f"  {index_file.name}: {enriched_count} documents")
        total_enriched += enriched_count

    return total_enriched

def main() -> None:
    print("Building URL to date mapping...")
    url_to_date = build_en_url_to_date_map(CONTENT_DIR)
    print(f"Found {len(url_to_date)} dated documents")

    print("Enriching search indices...")
    enrich_search_index(PUBLIC_DIR, url_to_date)

if __name__ == '__main__':
    main()
