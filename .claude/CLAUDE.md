# Project Instructions for chemaclass.com

## Rules

@.claude/rules/no-em-dash.md

## Overview

This is a personal website built with [Zola](https://www.getzola.org/) (Rust-based static site generator).

## Project Structure

```
content/
├── blog/           # Blog posts (YYYY-MM-DD-slug.md)
├── readings/       # Book summaries and reading notes
├── talks/          # Conference talks and presentations
├── services/       # Professional services pages
├── books/          # Book-related content
├── music/          # Music-related content
├── _index.md       # Homepage (EN)
├── _index.es.md    # Homepage (ES)
templates/          # Tera templates
sass/               # SCSS stylesheets
static/             # Static assets (images, files)
config.toml         # Zola configuration
```

## Internationalization (i18n)

The site supports English (default) and Spanish:
- English: `content/page.md` or `content/page/index.md`
- Spanish: `content/page.es.md` (colocated)

## Common Commands

- `zola build` - Build the static site to `public/`
- `zola serve` - Start dev server at http://127.0.0.1:1111
- `zola check` - Verify internal links
- `./build.sh` - Production build script

## Blog Writing

Tone and style: use the `writing-style` skill (`.claude/skills/writing-style/`) for all posts, readings, talks, translations, and edits. Core voice is in `SKILL.md`; load only the matching reference: `references/blog-posts.md`, `references/readings.md`, or `references/spanish.md`.

### Blog post structure

Files: `content/blog/YYYY-MM-DD-slug.md`. Front matter template: `.claude/templates/blog-post.md`. Full structure rules, front matter fields, and pre-publish checklist: `.claude/skills/writing-style/references/blog-posts.md`.

### Series

Series group related posts with navigation (title, "Part X of Y", prev/next links). When creating a new post, check if it fits an existing series and add `series` + `series_order` to `[extra]` in both EN and ES files.

Defined in `config.toml` under `[extra.series.<key>]` (the authoritative, current list lives there). Existing keys: `bitcoin`, `ai`, `craftsmanship`, `leadership`, `agile`.

To add a new series: add `[extra.series.<key>]` with `title` and `title_es` in `config.toml`.

## Talks and Slides

- Talk pages: `content/talks/<slug>.md` + colocated `<slug>.es.md`. The talk index is `content/talks/_index.md` (+ `.es.md`).
- Slide decks are Marp markdown, colocated with their build output under `static/slides/<slug>/`:
  - `deck.md` - source (speaker notes in HTML comments)
  - `assets/` - media referenced by the deck
  - `index.html` - generated in place, committed (CI is Zola-only, no Marp at deploy time)
- Build decks with `scripts/build-slides.sh` (`--all`, `<slug>`, or `<external-folder> <slug>` to import; `--pdf` also renders a PDF, which is gitignored).
- After editing a `deck.md`, rebuild that slug and commit both source and generated output.

## Skills Available

Project skills live in `.claude/skills/` (one file or dir per skill, invoked as `/<name>`); see each skill's description for usage. Always optimize images via `/optimize-images` or `/add-image` before adding them to the site, and run `/validate-posts` before marking a post ready.

## Code Style

- Templates use Tera syntax
- Styles use SCSS in `sass/` directory
- Config uses TOML format
