# Project Instructions for chemaclass.com

## Overview

This is a personal website built with [Zola](https://www.getzola.org/), a static site generator written in Rust.

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

## Languages (i18n)

The site is in English (default) and Spanish:
- English: `content/page.md` or `content/page/index.md`
- Spanish: `content/page.es.md` (in the same folder as the English file)

When you change any text, change EN and ES in the same edit and the same commit.

Text inside templates lives in one of three places, chosen by size:

- Short UI strings, and pages with only a few strings: `trans(key=..., lang=lang)`.
  The keys live in `[translations]` and `[languages.es.translations]` in `config.toml`.
  Each key starts with the page name (`home_*`, `profile_*`, `tag_*`). A missing key
  fails the build.
- Long page text: `data/i18n/<page>.toml`. Each key has `.en` and `.es` next to each other.
  Load the file once per block with `{%- set t = load_data(path="data/i18n/<page>.toml") -%}`.
  Print a value with `{{ t.section.key[lang] | safe }}` (values are raw HTML). Inside JSON-LD or
  JS, use `| json_encode | safe` with no quotes around it. Fill placeholders like `{n}`
  with `| replace(from="{n}", to=value ~ "")`. Pages that use this today: `cv`,
  `consulting`, `team-workshops`, `web-development` (with its thanks page), `books`.
- Switches that change structure (an `/es` URL prefix, a `.es.webp` suffix) stay in the
  template as `{% if lang == 'es' %}`.

Tera prints a missing key as an empty string and does not fail. So
`scripts/check-i18n.py` does the checking. It requires every key in every language and
the same placeholders in both. It rejects dashes. It rejects a key that a template reads
but the file does not have, and a key that no template reads.

## Common Commands

- `zola build` - Build the static site to `public/`
- `zola serve` - Start dev server at http://127.0.0.1:1111
- `zola check` - Verify internal links
- `./build.sh` - Production build script
- `python3 scripts/validate-prod.py [--full]` - Check the live site (also `/validate-prod`)

## Build Steps

`./build.sh` runs `zola build` plus a chain of Python steps, in order. The steps use only
the Python standard library. Any code that reads or writes build output goes here, not in
a template.

Before the build:

- `check-i18n.py` - checks that every `data/i18n/*.toml` key has EN and ES, and that the
  keys match what the templates read. Fails the build. It reads only a small, strict part
  of TOML, because Python 3.9 has no `tomllib`.
- `generate-last-modified.py` - writes the date of the last *real* edit of each content
  file, taken from git, into `data/last-modified.json` (ignored by git). A real edit
  changes at least 25 words below the front matter. Punctuation fixes, accent fixes and
  moved paragraphs do not count. The date is used for `dateModified` and the visible
  "Updated" label.

After the build, each step reads `public/` or `content/`:

- `check-icons.py`, `check-topics.py` - the Font Awesome subset (the small set of icons we
  ship) has every icon the site uses, and `/topics/` lists every tag.
- `enrich-search-index.py` - adds dates to the elasticlunr search index.
- `generate-heading-index.py` - writes `heading_index.<lang>.json`: every content heading
  with its anchor, so a search result can link straight to a section. A heading counts as
  content when it has a `heading-anchor` link. There is no list of CSS selectors.
- `generate-terminal-fs.py` - builds the file tree behind `/terminal/`.
- `generate-txt-pages.py`, `generate-md-pages.py` - write a `.txt` copy (EN only) and a
  `.md` copy next to every blog, readings and talks entry. Drafts are skipped.
- `generate-llms-txt.py` - writes `llms-full.txt`, and the list of entries below the
  `## Content index` marker in both `llms.txt` files.
- `generate-feed-json.py` - writes the JSON Feed.
- `optimize-content-images.py` - sets `loading`, `decoding`, `width` and `height` on
  images inside articles. Do not bring back a JavaScript version that sets them in the
  browser. By the time the page has loaded, the browser has already started downloading
  every image, so it is too late.
- `generate-index-json.py` - writes `/index.json`: every entry, with the URL of each format.
- `enrich-sitemap.py` - adds the git `<lastmod>` date, hreflang pairs (links between the EN
  and ES version of a page) and page images.
- `check-assets.py` - checks that every referenced file exists. Fails the build.
- `check-image-budget.py` - checks that images inside articles are not wider or heavier
  than the layout needs (1200px, 300KB; covers up to 2000px). Fails the build. Exceptions
  live in `scripts/image-budget-baseline.txt`, each with a reason.

CI also runs `check-js-runtime.py`. It opens pages in headless Chrome (Chrome with no
window) and fails on uncaught JS errors. After deploying, CI runs `indexnow.py` for the
URLs that the push changed.

## Config Settings

`config.toml` holds more than Zola's own settings:

- `[extra.content_license]` - the licence named in the schema, the head link, the
  footer, `ai.txt` and the markdown copies. Poetry does not use it; see `books/post.html`.
- `[[extra.tag_descriptions]]` - `name`, `desc`, `desc_es`, and `entity` (the URL that
  explains what the tag means). Tag pages use it (`DefinedTerm`), and so do posts (`about`).
- `[extra.series.<key>]`, `[[extra.topics]]`, `start_here_posts`, `nav`.

Optional `[extra]` fields on content: `tldr` (summary box and schema `abstract`),
`faq` (a `<details>` list on the page and `FAQPage`), `videos` and `slides` on talks
(`VideoObject`, `PresentationDigitalDocument`).

## Blog Writing

Tone and style: use the `writing-style` skill (`.agnostic-ai/skills/writing-style/`) for all posts, readings, talks, translations, and edits. The core voice is in `SKILL.md`. Load only the matching file in `references/`: `blog-posts.md`, `readings.md`, `talks.md`, or `spanish.md`.

### Blog post structure

Files: `content/blog/YYYY-MM-DD-slug.md`. Front matter template: `.agnostic-ai/templates/blog-post.md`. Full structure rules, front matter fields, and the checklist before publishing: `.agnostic-ai/skills/writing-style/references/blog-posts.md`.

### Series

A series groups related posts. A post shows its series name and a link to the series page. The series page lists the posts in `series_order` as a suggested reading order. The order is only a suggestion. No post may expect the reader to have read another one. When you create a new post, check if it fits an existing series. If it does, add `series` + `series_order` to `[extra]` in both the EN and ES files.

Series are defined in `config.toml` under `[extra.series.<key>]`. That file holds the current, correct list. Existing keys: `bitcoin`, `ai`, `craftsmanship`, `leadership`, `agile`.

To add a new series: add `[extra.series.<key>]` with `title` and `title_es` in `config.toml`.

## Talks and Slides

- Talk pages: `content/talks/<slug>.md` + `<slug>.es.md` in the same folder. The talk index is `content/talks/_index.md` (+ `.es.md`).
- Slide decks are Marp markdown. Each deck sits in `static/slides/<slug>/`, next to its build output:
  - `deck.md` - source (speaker notes in HTML comments)
  - `assets/` - media used by the deck
  - `index.html` - generated in the same folder and committed (CI only runs Zola, there is no Marp at deploy time)
- Build decks with `scripts/build-slides.sh` (`--all`, `<slug>`, or `<external-folder> <slug>` to import; `--pdf` also makes a PDF, which git ignores).
- After you edit a `deck.md`, rebuild that slug and commit both the source and the generated output.

## Agent Config

Agent rules, skills, agents, hooks, settings (permissions, protected `public/`), Codex review rules, and templates live in `.agnostic-ai/`. Edit them there, then run `agnostic-ai sync`. It generates `CLAUDE.md`, `AGENTS.md`, `.claude/`, `.codex/`, and `.agents/skills/`, all ignored by git. Paths in these files start from the repository root.

## Skills Available

Project skills live in `.agnostic-ai/skills/`, one folder per skill. Call a skill with `/<name>`. Each skill's description says how to use it. Always optimize images with `/optimize-images` or `/add-image` before you add them to the site. Run `/validate-posts` before you mark a post as ready.

## Code Style

- Templates use Tera syntax
- Styles use SCSS in `sass/` directory
- Config uses TOML format
