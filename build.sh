#!/usr/bin/env bash
set -euo pipefail

ZOLA_VERSION="${ZOLA_VERSION:-0.22.0}"
MINIFY_VERSION="${MINIFY_VERSION:-2.21.3}"

# Detect OS and architecture
OS=$(uname -s)
ARCH=$(uname -m)

# Download zola if not installed
if ! command -v zola &> /dev/null; then
  if [ "$OS" = "Darwin" ]; then
    echo "zola not found. Install it with: brew install zola"
    exit 1
  fi

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

# Download minify if not installed
if ! command -v minify &> /dev/null; then
  if [ "$OS" = "Darwin" ]; then
    echo "minify not found. Install it with: brew install tdewolff/tap/minify"
    exit 1
  fi

  if [ "$ARCH" = "x86_64" ]; then
    MINIFY_ARCH="amd64"
  elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
    MINIFY_ARCH="arm64"
  else
    echo "Unsupported architecture for minify: $ARCH"
    exit 1
  fi

  MINIFY_URL="https://github.com/tdewolff/minify/releases/download/v${MINIFY_VERSION}/minify_linux_${MINIFY_ARCH}.tar.gz"
  echo "Downloading minify from $MINIFY_URL"
  curl -sSL -o minify.tar.gz "$MINIFY_URL"
  tar -xzf minify.tar.gz minify
  rm minify.tar.gz
  chmod +x minify
  export PATH="$PWD:$PATH"
fi

echo "Using Zola $(zola --version)"

echo "Building site..."
zola build "$@"

echo "Enriching search index with dates..."
python3 scripts/enrich-search-index.py

echo "Generating terminal filesystem..."
python3 scripts/generate-terminal-fs.py

echo "Generating plain text pages..."
python3 scripts/generate-txt-pages.py

echo "Generating llms-full.txt..."
python3 scripts/generate-llms-txt.py

echo "Enriching sitemap with last-modified dates..."
python3 scripts/enrich-sitemap.py

echo "Minifying HTML, CSS, JS, SVG, and XML..."
minify -r -o public/ public/

echo "Build complete!"
