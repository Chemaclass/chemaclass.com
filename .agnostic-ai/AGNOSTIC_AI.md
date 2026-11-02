# chemaclass.com

Personal website built with [Zola](https://www.getzola.org/). English is the default language; Spanish is `.es.md`.

## Layout

```
content/   blog/ readings/ talks/ services/ books/ music/, _index.md (EN), _index.es.md (ES)
templates/ Tera templates      sass/ SCSS      static/ assets      config.toml
data/i18n/ long page text      scripts/ build steps and checks
```

Blog files: `content/blog/YYYY-MM-DD-slug.md`. Front matter template: `.agnostic-ai/templates/blog-post.md`. Structure rules and the pre-publish checklist: `.agnostic-ai/skills/writing-style/references/blog-posts.md`.

## Commands

- `zola build`: build to `public/` (generated, never edit). `zola serve`: http://127.0.0.1:1111. `zola check`: internal links.
- `./build.sh`: production build (`zola build` plus the Python steps below).
- `python3 scripts/validate-prod.py [--full]`: check the live site (`/validate-prod`).
- `scripts/build-slides.sh`: build slide decks.

## Languages

- English: `content/page.md` or `content/page/index.md`. Spanish: `content/page.es.md` in the same folder.
- Change EN and ES text in the same edit and the same commit.
- Template text lives in one of three places:
  - Short UI strings and pages with few strings: `trans(key=..., lang=lang)`. Keys live in `[translations]` and `[languages.es.translations]` in `config.toml`, prefixed with the page name (`home_*`, `profile_*`, `tag_*`). A missing key fails the build.
  - Long page text: `data/i18n/<page>.toml`, each key with `.en` and `.es` side by side. Load once per block: `{%- set t = load_data(path="data/i18n/<page>.toml") -%}`. Print with `{{ t.section.key[lang] | safe }}` (values are raw HTML). In JSON-LD or JS use `| json_encode | safe` with no quotes around it. Fill placeholders such as `{n}` with `| replace(from="{n}", to=value ~ "")`. In use for `cv`, `consulting`, `team-workshops`, `web-development` (with its thanks page), `books`.
  - Structural switches (an `/es` URL prefix, a `.es.webp` suffix): `{% if lang == 'es' %}` in the template.
- Tera prints a missing key as an empty string, so `scripts/check-i18n.py` checks: every key in every language, same placeholders in both, no dashes, no key a template reads but the file lacks, no key no template reads.

## Build steps

`./build.sh` runs `zola build` and Python standard-library steps in this order. Code that reads or writes build output belongs in a step, not in a template.

Before the build:

- `check-i18n.py`: see Languages. Fails the build. Reads only a strict subset of TOML (Python 3.9 has no `tomllib`).
- `generate-last-modified.py`: writes the git date of each file's last real edit to `data/last-modified.json` (git-ignored). A real edit changes at least 25 words below the front matter; punctuation, accent fixes and moved paragraphs do not count. Feeds `dateModified` and the "Updated" label.

After the build (read `public/` or `content/`):

- `check-icons.py`, `check-topics.py`: the shipped Font Awesome subset has every icon the site uses; `/topics/` lists every tag.
- `enrich-search-index.py`: adds dates to the elasticlunr index.
- `generate-heading-index.py`: writes `heading_index.<lang>.json` (content headings with anchors). A heading counts when it has a `heading-anchor` link.
- `generate-terminal-fs.py`: file tree behind `/terminal/`.
- `generate-txt-pages.py`, `generate-md-pages.py`: a `.txt` copy (EN only) and a `.md` copy beside every blog, readings and talks entry. Drafts are skipped.
- `generate-llms-txt.py`: `llms-full.txt` and the entry list below `## Content index` in both `llms.txt` files.
- `generate-feed-json.py`: JSON Feed.
- `optimize-content-images.py`: sets `loading`, `decoding`, `width` and `height` on article images. Never set them from JavaScript: the browser has already started downloading by then.
- `generate-index-json.py`: `/index.json`, every entry with the URL of each format.
- `enrich-sitemap.py`: git `<lastmod>`, hreflang pairs, page images.
- `check-assets.py`: every referenced file exists. Fails the build.
- `check-image-budget.py`: article images at most 1200px wide and 300KB (covers up to 2000px). Fails the build. Exceptions go in `scripts/image-budget-baseline.txt`, each with a reason.

CI also runs `check-js-runtime.py` (headless Chrome, fails on uncaught JS errors) and, after a deploy, `indexnow.py` for the changed URLs.

## Config

`config.toml` holds more than Zola settings:

- `[extra.content_license]`: licence used by the schema, head link, footer, `ai.txt` and the markdown copies. Poetry does not use it (see `books/post.html`).
- `[[extra.tag_descriptions]]`: `name`, `desc`, `desc_es`, `entity` (URL explaining the tag). Used by tag pages (`DefinedTerm`) and posts (`about`).
- `[extra.series.<key>]`, `[[extra.topics]]`, `start_here_posts`, `nav`.

Optional `[extra]` fields on content: `tldr` (summary box and schema `abstract`), `faq` (`<details>` list and `FAQPage`), `videos` and `slides` on talks (`VideoObject`, `PresentationDigitalDocument`).

## Writing

Use the `writing-style` skill for every post, reading, talk, translation and edit; follow its instructions for loading `references/slop.md` and the content reference.

Series: a post shows its series name and links to the series page, which lists posts by `series_order` as a suggested order. No post may expect the reader to have read another. For a new post, check whether it fits an existing series; if so add `series` and `series_order` to `[extra]` in both EN and ES files. Keys are in `config.toml` under `[extra.series.<key>]` (currently `bitcoin`, `ai`, `craftsmanship`, `leadership`, `agile`). A new series needs `title` and `title_es` there.

## Talks and slides

- Talk pages: `content/talks/<slug>.md` and `<slug>.es.md`. Index: `content/talks/_index.md` (and `.es.md`).
- Slide decks are Marp markdown in `static/slides/<slug>/`: `deck.md` (source, speaker notes in HTML comments), `assets/`, and a generated `index.html` that is committed (CI has no Marp).
- Build with `scripts/build-slides.sh` (`--all`, `<slug>`, or `<external-folder> <slug>` to import; `--pdf` also writes a git-ignored PDF).
- After editing a `deck.md`, rebuild that slug and commit source and output together.

## Agent config

Rules, skills, agents, hooks, settings (permissions, protected `public/`), Codex review rules and templates live in `.agnostic-ai/`. Edit there, then run `agnostic-ai sync`; generated files are git-ignored, so sync after a fresh clone. Paths in these files start at the repository root.

Optimize every image with `/optimize-images` or `/add-image` before adding it. Run `/validate-posts` before marking a post ready.

## Code style

Tera templates, SCSS in `sass/`, TOML config.
