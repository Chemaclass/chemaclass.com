#!/usr/bin/env bash
set -euo pipefail

ZOLA_VERSION=${ZOLA_VERSION:-0.21.0}

# Download zola if not installed
if ! command -v zola &> /dev/null; then
  GH_URL="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-aarch64-unknown-linux-gnu.tar.gz"
  echo "Downloading zola from $GH_URL"
  curl -sSL -o zola.tar.gz "$GH_URL"
  tar -xzf zola.tar.gz
  chmod +x zola
  export PATH="$PWD:$PATH"
fi

echo "Building site..."
zola build "$@"

echo "Enriching search index with dates..."
python3 scripts/enrich-search-index.py

echo "Build complete!"
