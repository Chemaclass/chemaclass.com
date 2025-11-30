#!/bin/bash
# Build script that compiles the site and enriches the search index with dates

set -e

echo "Building site..."
zola build "$@"

echo "Enriching search index with dates..."
python3 scripts/enrich-search-index.py

echo "Build complete!"
