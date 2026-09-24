#!/usr/bin/env bash
set -euo pipefail

ZOLA_VERSION="${ZOLA_VERSION:-0.23.6}"
MINIFY_VERSION="${MINIFY_VERSION:-2.21.3}"

# Detect OS and architecture
OS=$(uname -s)
ARCH=$(uname -m)

# Every downloaded binary is checked against a digest pinned here before it is
# unpacked. The build runs with deploy credentials in CI, so a replaced release
# asset must fail the build, not run inside it. A different version needs its
# digest passed in explicitly (ZOLA_SHA256, MINIFY_SHA256).
pinned_sha256() {
  case "$1" in
    zola-v0.23.6-x86_64-unknown-linux-gnu.tar.gz)  echo 8f5132b3522412d04e395e0b25f6d68613ad272a873e54a2b3ebf664873024a4 ;;
    zola-v0.23.6-aarch64-unknown-linux-gnu.tar.gz) echo 266448fffbf7c7004ca399d0e76dd699541771096d8a42aede98cebe2a029d02 ;;
    minify-v2.21.3-minify_linux_amd64.tar.gz)      echo a5ee60de8d3e2b98d20c6fad047bb3e2c162e1d0b56a5f474f773a651a23494e ;;
    minify-v2.21.3-minify_linux_arm64.tar.gz)      echo 0efde9c41133430729d0ec6353045f2006ecb1185868249200b45b4f527c998d ;;
  esac
}

verify_sha256() {
  local file="$1" expected="$2" actual
  if [ -z "$expected" ]; then
    echo "No pinned SHA-256 for $file. Pass one in to download this version."
    exit 1
  fi
  if command -v sha256sum &> /dev/null; then
    actual=$(sha256sum "$file" | awk '{print $1}')
  else
    actual=$(shasum -a 256 "$file" | awk '{print $1}')
  fi
  if [ "$actual" != "$expected" ]; then
    echo "SHA-256 mismatch for $file: expected $expected, got $actual"
    rm -f "$file"
    exit 1
  fi
}

# Download zola if not installed
if ! command -v zola &> /dev/null; then
  if [ "$OS" = "Darwin" ]; then
    echo "zola not found. Install v${ZOLA_VERSION} or newer: see README, Prerequisites."
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

  ZOLA_ASSET="zola-v${ZOLA_VERSION}-${ZOLA_ARCH}.tar.gz"
  GH_URL="https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/${ZOLA_ASSET}"
  echo "Downloading zola from $GH_URL"
  curl -fsSL -o zola.tar.gz "$GH_URL"
  verify_sha256 zola.tar.gz "${ZOLA_SHA256:-$(pinned_sha256 "$ZOLA_ASSET")}"
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
  curl -fsSL -o minify.tar.gz "$MINIFY_URL"
  verify_sha256 minify.tar.gz "${MINIFY_SHA256:-$(pinned_sha256 "minify-v${MINIFY_VERSION}-minify_linux_${MINIFY_ARCH}.tar.gz")}"
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

# The templates need Tera 2 components with implicit params, which arrived in 0.23.6.
# Older binaries fail with template errors that do not point at the version.
ZOLA_FOUND=$(zola --version | awk '{print $2}')
if [ "$(printf '%s\n%s\n' "$ZOLA_VERSION" "$ZOLA_FOUND" | sort -V | head -1)" != "$ZOLA_VERSION" ]; then
  echo "Zola $ZOLA_FOUND is too old. Install v${ZOLA_VERSION} or newer: see README, Prerequisites."
  exit 1
fi
# Newer is allowed, but CI builds with exactly $ZOLA_VERSION: say so, because a
# newer Zola can render differently (0.23.6 alone changed every reading time).
if [ "$ZOLA_FOUND" != "$ZOLA_VERSION" ]; then
  echo "Warning: Zola $ZOLA_FOUND is newer than v${ZOLA_VERSION}, the version CI deploys with. Output may differ."
fi

echo "Checking content structure against the reviewed baseline..."
python3 scripts/check-content-shape.py

# Before the build, not after: the templates read these dates with load_data()
# to publish an honest dateModified.
echo "Fetching the GitHub star counts..."
python3 scripts/fetch-github-stars.py

echo "Recording last-modified dates from git..."
python3 scripts/generate-last-modified.py

echo "Counting talk deliveries..."
python3 scripts/count-talks-given.py

echo "Building site..."
zola build "$@"

echo "Adding canonical targets to redirect pages..."
python3 scripts/enrich-redirects.py

echo "Checking the Font Awesome subset covers every icon in use..."
python3 scripts/check-icons.py

echo "Checking /topics/ covers every tag..."
python3 scripts/check-topics.py

echo "Enriching search index with dates..."
python3 scripts/enrich-search-index.py

echo "Indexing headings for the search dialog..."
python3 scripts/generate-heading-index.py

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

echo "Checking in-article images stay within the width and weight budget..."
python3 scripts/check-image-budget.py

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
