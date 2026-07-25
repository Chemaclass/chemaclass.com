#!/usr/bin/env bash
# Optimize one image to web-ready webp: downscale (never upscale) + compress.
# Prints a before/after size line. Skips already-optimized files unless --force.
#
# Usage: optimize-image.sh <src> [dest.webp] [--width N] [--quality Q] [--force]
#   default width 1600, quality 80. If dest omitted, writes <src-without-ext>.webp
set -euo pipefail

WIDTH=1600
QUALITY=80
FORCE=0
MAX_BYTES=307200   # 300 KB: an in-place webp under this and within width is "already optimized"
SRC=""
DEST=""

while [ $# -gt 0 ]; do
  case "$1" in
    --width)   WIDTH="$2";   shift 2;;
    --quality) QUALITY="$2"; shift 2;;
    --force)   FORCE=1;      shift;;
    *) if [ -z "$SRC" ]; then SRC="$1"; elif [ -z "$DEST" ]; then DEST="$1"; fi; shift;;
  esac
done

[ -n "$SRC" ]  || { echo "usage: optimize-image.sh <src> [dest.webp] [--width N] [--quality Q] [--force]" >&2; exit 1; }
[ -f "$SRC" ]  || { echo "not found: $SRC" >&2; exit 1; }
command -v cwebp >/dev/null || { echo "cwebp not installed (brew install webp)" >&2; exit 1; }

[ -n "$DEST" ] || DEST="${SRC%.*}.webp"

ext="$(printf '%s' "${SRC##*.}" | tr '[:upper:]' '[:lower:]')"

src_width() {
  if [ "$ext" = "webp" ]; then
    webpinfo "$1" 2>/dev/null | awk '/Width/{print $2; exit}'
  else
    sips -g pixelWidth "$1" 2>/dev/null | awk '/pixelWidth/{print $2}'
  fi
}

sw="$(src_width "$SRC")"; sw="${sw:-0}"
before=$(wc -c < "$SRC")

# Already optimized: in-place webp, within target width, under size cap.
if [ "$FORCE" -eq 0 ] && [ "$ext" = "webp" ] && [ "$SRC" = "$DEST" ] \
   && [ "$sw" -le "$WIDTH" ] && [ "$before" -le "$MAX_BYTES" ]; then
  printf 'skip (already optimized): %s  %d KB  %dpx\n' "$SRC" "$((before/1024))" "$sw"
  exit 0
fi

# Only downscale. rw=0 tells cwebp to keep the source width.
rw=0
[ "$sw" -gt "$WIDTH" ] && rw="$WIDTH"

mkdir -p "$(dirname "$DEST")"
tmp="${DEST}.tmp.$$"
cwebp -quiet -q "$QUALITY" -resize "$rw" 0 "$SRC" -o "$tmp"
mv "$tmp" "$DEST"

after=$(wc -c < "$DEST")
awk -v b="$before" -v a="$after" -v s="$SRC" -v d="$DEST" 'BEGIN{
  printf "%s -> %s\n  %.1f KB -> %.1f KB  (%.1f%% smaller)\n", s, d, b/1024, a/1024, (1-a/b)*100
}'
