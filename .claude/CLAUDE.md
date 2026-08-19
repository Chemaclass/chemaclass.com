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
- `python3 scripts/validate-prod.py [--full]` - Check the live site (also `/validate-prod`)

## Build Pipeline

`./build.sh` is `zola build` plus a chain of stdlib-only Python steps, in order.
Anything that reads or writes build output belongs here, not in a template.

Before the build:

- `generate-last-modified.py` - the date each content file was last *substantially*
  edited, from git, into `data/last-modified.json` (gitignored). At least 25 changed
  words below the front matter counts; punctuation sweeps, accent fixes and moved
  paragraphs do not. Feeds `dateModified` and the visible "Updated" stamp.

After it, each reading `public/` or `content/`:

- `check-icons.py`, `check-topics.py` - the Font Awesome subset covers every icon,
  `/topics/` covers every tag.
- `enrich-search-index.py` - dates into the elasticlunr index.
- `generate-heading-index.py` - `heading_index.<lang>.json`, every content heading
  with its anchor, so search results can deep-link to a section. The signal for a
  content heading is the `heading-anchor` link, not a selector list.
- `generate-terminal-fs.py` - the filesystem behind `/terminal/`.
- `generate-txt-pages.py`, `generate-md-pages.py` - the `.txt` (EN only) and `.md`
  mirrors next to every blog, readings and talks entry. Drafts are skipped.
- `generate-llms-txt.py` - `llms-full.txt`, and the entry list below the
  `## Content index` marker in both `llms.txt` files.
- `generate-feed-json.py` - JSON Feed.
- `optimize-content-images.py` - `loading`, `decoding`, `width` and `height` on
  in-article images. Do not reintroduce a runtime version: setting these after load
  is too late, the preload scanner has already started every request.
- `generate-index-json.py` - `/index.json`, every entry with each format's URL.
- `enrich-sitemap.py` - git `<lastmod>`, hreflang pairs, page images.
- `check-assets.py` - every referenced file exists. Fails the build.
- `check-image-budget.py` - in-article images stay within the width and weight the
  layout needs (1200px, 300KB; covers up to 2000px). Fails the build. Exceptions
  live in `scripts/image-budget-baseline.txt` with a reason.

CI additionally runs `check-js-runtime.py` (headless Chrome, uncaught JS errors)
and, after deploying, `indexnow.py` for the URLs the push changed.

## Config Knobs

`config.toml` carries more than Zola's own settings:

- `[extra.content_license]` - the licence quoted by the schema, the head link, the
  footer, `ai.txt` and the markdown mirrors. Poetry opts out in `books/post.html`.
- `[[extra.tag_descriptions]]` - `name`, `desc`, `desc_es`, and `entity`, the URL a
  tag resolves to. Used by tag pages (`DefinedTerm`) and by posts (`about`).
- `[extra.series.<key>]`, `[[extra.topics]]`, `start_here_posts`, `nav`.

Optional `[extra]` fields on content: `tldr` (summary box and schema `abstract`),
`faq` (rendered `<details>` list and `FAQPage`), `videos` and `slides` on talks
(`VideoObject`, `PresentationDigitalDocument`).

## Blog Writing

Tone and style: use the `writing-style` skill (`.claude/skills/writing-style/`) for all posts, readings, talks, translations, and edits. Core voice is in `SKILL.md`; load only the matching reference in `references/`: `blog-posts.md`, `readings.md`, `talks.md`, or `spanish.md`.

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
