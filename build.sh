#!/usr/bin/env bash
set -euo pipefail

ZOLA_VERSION="${ZOLA_VERSION:-0.22.0}"

# Download zola if not installed
if ! command -v zola &> /dev/null; then
  # Detect architecture
  ARCH=$(uname -m)
  if [ "$ARCH" = "x86_64" ]; then
    ZOLA_ARCH="x86_64-unknown-linux-gnu"
  elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
    ZOLA_ARCH="aarch64-unknown-linux-gnu"
  else
    echo "Unsupported architecture: $ARCH"
    exit 1
  fi

  GH_URL="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-${ZOLA_ARCH}.tar.gz"
  echo "Downloading zola from $GH_URL"
  curl -sSL -o zola.tar.gz "$GH_URL"
  tar -xzf zola.tar.gz
  rm zola.tar.gz
  chmod +x zola
  export PATH="$PWD:$PATH"
fi

echo "Using Zola $(zola --version)"

echo "Building site..."
zola build "$@"

echo "Enriching search index with dates..."
python3 scripts/enrich-search-index.py

echo "Build complete!"
