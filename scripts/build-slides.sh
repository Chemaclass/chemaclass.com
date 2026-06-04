#!/usr/bin/env bash
#
# build-slides.sh — render Marp talk decks in place.
#
# Single-dir layout: a deck and its build output live in ONE folder under
# static/slides/<slug>/ , which Zola serves verbatim at /slides/<slug>/ :
#
#   static/slides/<slug>/
#   ├── deck.md      # source (Marp markdown + speaker notes in HTML comments)
#   ├── assets/      # media referenced by the deck
#   └── index.html   # GENERATED in place — the rendered deck
#
# No source/output duplication: assets are stored once. Commit the whole folder.
# CI stays Zola-only — no Marp/node at deploy time.
#
# Usage:
#   scripts/build-slides.sh                       # rebuild ALL decks under static/slides/*
#   scripts/build-slides.sh --all                 # same, explicit
#   scripts/build-slides.sh <slug>                # rebuild one existing deck
#   scripts/build-slides.sh <external-folder> <slug>   # import a deck from another repo
#
# Each build auto-optimizes assets (minify SVG, pngquant PNG once) and regenerates
# static/slides/index.html — a themed landing listing all decks. Zero maintenance.
#
# Add a new talk (copy an existing deck — it carries the theme):
#   1. cp -r static/slides/ai-copilot static/slides/<slug>
#   2. replace static/slides/<slug>/deck.md content + swap assets/ media
#   3. scripts/build-slides.sh <slug>
#   4. link from a talk page:  [[slides](/slides/<slug>/)]
#
# Preview while editing:
#   cd static/slides/<slug> && npx -y @marp-team/marp-cli -s . --html --allow-local-files
#   # or, through the site:   zola serve  ->  http://127.0.0.1:1111/slides/<slug>/
#
# Notes: theme mirrors chemaclass.com (Rubik, palette). Speaker notes live in <!-- ... -->.
# Slug = folder name = public URL segment; keep it kebab-case and stable.
#
set -euo pipefail

die() { echo "error: $*" >&2; exit 1; }

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE="$REPO/static/slides"

# optimize media in a deck folder. Best-effort + idempotent:
#  - SVG: minify (re-minifying an already-minified file is a no-op).
#  - PNG: pngquant ONCE — skipped if already a palette ("colormap") image, so rebuilds
#    never re-quantize and erode quality. Skips silently if a tool is absent.
optimize_assets() {  # $1=dir
  local d="$1" f
  if command -v minify >/dev/null 2>&1; then
    while IFS= read -r f; do
      minify --type=svg "$f" > "$f.tmp" 2>/dev/null && mv "$f.tmp" "$f" || rm -f "$f.tmp"
    done < <(find "$d" -type f -iname '*.svg')
  fi
  if command -v pngquant >/dev/null 2>&1; then
    while IFS= read -r f; do
      file "$f" | grep -qi 'colormap' && continue   # already optimized → leave it
      pngquant --quality=65-90 --strip --force --skip-if-larger --output "$f" "$f" 2>/dev/null || true
    done < <(find "$d" -type f -iname '*.png')
  fi
}

# render static/slides/<slug>/deck.md -> static/slides/<slug>/index.html (in place)
render_one() {  # $1=slug
  local slug="$1" dir="$BASE/$1"
  [ -f "$dir/deck.md" ] || die "no deck.md in static/slides/$slug/"
  [ -d "$dir/assets" ] && optimize_assets "$dir/assets"
  echo "• [$slug] rendering -> static/slides/$slug/index.html"
  npx -y @marp-team/marp-cli "$dir/deck.md" \
    --html --allow-local-files \
    -o "$dir/index.html"
  echo "  ✓ /slides/$slug/"
}

# regenerate the /slides/ landing page listing every deck (zero maintenance)
generate_index() {
  local out="$BASE/index.html" cards="" slug title sub
  shopt -s nullglob
  for deck in "$BASE"/*/deck.md; do
    slug="$(basename "$(dirname "$deck")")"
    title="$(grep -m1 '^# '   "$deck" | sed 's/^# //;   s/<br>/ /g; s/  */ /g')"
    sub="$(  grep -m1 '^### ' "$deck" | sed 's/^### //')"
    [ -n "$title" ] || title="$slug"
    cards+="      <a class=\"deck\" href=\"/slides/$slug/\">
        <h2>$title</h2>
        <p>$sub</p>
        <span class=\"go\">Open deck →</span>
      </a>
"
  done
  cat > "$out" <<HTML
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Slides · Chemaclass</title>
<meta name="description" content="Talk decks by Chema (José M. Valera Reales).">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{--accent:#2d5a8e;--bg:#f7f8fa;--fg:#2a2d32;--heading:#14171a;--muted:#5a6370;--panel:#fff;--border:#e2e5ea;--shadow:0 2px 8px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04)}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--fg);font-family:"Rubik",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.55;-webkit-font-smoothing:antialiased}
  .wrap{max-width:760px;margin:0 auto;padding:72px 24px 96px}
  header{margin-bottom:40px}
  h1{color:var(--heading);font-weight:500;font-size:44px;letter-spacing:-.02em;margin:0 0 .25em}
  .lead{color:var(--muted);font-size:18px;margin:0}
  .grid{display:grid;gap:16px}
  a.deck{display:block;text-decoration:none;color:inherit;background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:24px 28px;box-shadow:var(--shadow);transition:transform .12s ease,box-shadow .12s ease}
  a.deck:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08),0 12px 32px rgba(0,0,0,.06)}
  a.deck h2{color:var(--heading);font-weight:500;font-size:24px;letter-spacing:-.01em;margin:0 0 .25em}
  a.deck p{color:var(--muted);margin:0 0 .8em}
  .go{color:var(--accent);font-weight:500;font-size:15px}
  footer{margin-top:48px;color:var(--muted);font-size:14px}
  footer a{color:var(--accent);text-decoration:none}
</style>
</head>
<body>
  <main class="wrap">
    <header>
      <h1>Slides</h1>
      <p class="lead">Talk decks — open in the browser, present from anywhere.</p>
    </header>
    <div class="grid">
$cards    </div>
    <footer><a href="/talks/">← All talks</a> · <a href="https://chemaclass.com">chemaclass.com</a></footer>
  </main>
</body>
</html>
HTML
  echo "• landing -> static/slides/index.html"
}

# ---- parse args -----------------------------------------------------------
ALL=0
ARGS=()
for a in "$@"; do
  case "$a" in
    --all) ALL=1 ;;
    *)     ARGS+=("$a") ;;
  esac
done

# ---- ALL mode: rebuild every deck under static/slides/* -------------------
if [ "${#ARGS[@]}" -eq 0 ] || [ "$ALL" = "1" ]; then
  [ -d "$BASE" ] || die "no static/slides/ folder"
  shopt -s nullglob
  found=0
  for deck in "$BASE"/*/deck.md; do
    found=1
    render_one "$(basename "$(dirname "$deck")")"
  done
  [ "$found" = "1" ] || die "no static/slides/*/deck.md found"
  generate_index
  echo "✓ all decks rebuilt"
  exit 0
fi

ARG0="${ARGS[0]}"

# ---- ONE existing deck: scripts/build-slides.sh <slug> --------------------
if [ ! -d "$ARG0" ] && [ -d "$BASE/$ARG0" ]; then
  render_one "$ARG0"
  generate_index
  exit 0
fi

# ---- IMPORT external deck: scripts/build-slides.sh <folder> <slug> --------
[ -d "$ARG0" ] || die "not a folder or known slug: $ARG0"
SRC="$(cd "$ARG0" && pwd)"
[ -f "$SRC/deck.md" ] || die "no deck.md in $SRC"
SLUG="${ARGS[1]:-}"
[ -n "$SLUG" ] || die "importing an external deck needs an explicit slug: build-slides.sh <folder> <slug>"
case "$SLUG" in
  talk|slides|local|deck|src) die "refusing generic slug '$SLUG'" ;;
esac

DEST="$BASE/$SLUG"
if [ -d "$DEST" ]; then
  printf "static/slides/%s/ exists. Overwrite from %s ? [y/N] " "$SLUG" "$SRC"
  read -r ans
  case "$ans" in y|Y|yes) ;; *) die "aborted" ;; esac
fi
echo "• importing $SRC -> static/slides/$SLUG/"
mkdir -p "$DEST"
cp -f "$SRC/deck.md" "$DEST/deck.md"
# media only — drop internal docs (MANIFEST etc.) from the public folder
if [ -d "$SRC/assets" ]; then
  rsync -a --delete --delete-excluded --exclude '*.md' "$SRC/assets/" "$DEST/assets/"
fi
# top-level media the deck may reference relatively (e.g. ladder.svg)
find "$SRC" -maxdepth 1 -type f \
  \( -iname '*.svg' -o -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.gif' -o -iname '*.webp' \) \
  -exec cp -f {} "$DEST/" \;
render_one "$SLUG"
generate_index
echo "✓ imported + rendered"
echo "  folder: static/slides/$SLUG/"
echo "  link from a talk page:  [[slides](/slides/$SLUG/)]"
