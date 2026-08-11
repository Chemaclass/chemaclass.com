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

# Verify python3 is available (scripts use only stdlib: json, os, re, subprocess, pathlib)
if ! command -v python3 &> /dev/null; then
  echo "python3 not found. Install Python 3 to run post-build scripts."
  exit 1
fi

echo "Using Zola $(zola --version)"

echo "Checking content structure against the reviewed baseline..."
python3 scripts/check-content-shape.py

# Before the build, not after: the templates read these dates with load_data()
# to publish an honest dateModified.
echo "Fetching the GitHub star counts..."
python3 scripts/fetch-github-stars.py

echo "Recording last-modified dates from git..."
python3 scripts/generate-last-modified.py

echo "Building site..."
zola build "$@"

echo "Checking the Font Awesome subset covers every icon in use..."
python3 scripts/check-icons.py

echo "Checking /topics/ covers every tag..."
python3 scripts/check-topics.py

echo "Enriching search index with dates..."
python3 scripts/enrich-search-index.py

echo "Generating terminal filesystem..."
python3 scripts/generate-terminal-fs.py

echo "Generating plain text pages..."
python3 scripts/generate-txt-pages.py

echo "Generating markdown pages..."
python3 scripts/generate-md-pages.py

echo "Generating llms-full.txt..."
python3 scripts/generate-llms-txt.py

echo "Generating JSON Feed..."
python3 scripts/generate-feed-json.py

echo "Adding loading hints and dimensions to in-article images..."
python3 scripts/optimize-content-images.py

echo "Generating the machine-readable content index..."
python3 scripts/generate-index-json.py

echo "Enriching sitemap with last-modified dates..."
python3 scripts/enrich-sitemap.py

# Last check before minify: every stylesheet, script, font and image the pages
# reference has to exist. Zola verifies the links between pages; nothing verified
# the files they load.
# After the last generator, so the references are final: anything in
# static/processed_images the build no longer points at is dead weight in both
# the cache and the published artifact.
echo "Pruning processed images the build no longer uses..."
python3 scripts/prune-processed-images.py

echo "Checking every referenced file exists..."
python3 scripts/check-assets.py

# Runs before minify: the descriptions and headings it reads are easier to match
# in the unminified HTML, and a failure here should stop the build either way.
echo "Checking the SEO rules hold..."
python3 scripts/check-seo.py

echo "Minifying HTML, CSS, JS, SVG, and XML..."
minify -r -o public/ public/

# Marp slide decks must NOT be minified: minify mangles their inline data-style
# attributes (SVG/foreignObject) into visible text, dumping raw CSS onto the slides.
# The deck HTML is already optimized by build-slides.sh, so restore the pristine output.
echo "Restoring un-minified slide decks (Marp HTML must not be minified)..."
cp -R static/slides/. public/slides/

echo "Build complete!"
