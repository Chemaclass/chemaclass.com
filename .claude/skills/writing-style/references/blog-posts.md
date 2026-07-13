# Blog post structure and front matter

Field shapes live in the template: `.claude/templates/blog-post.md`. This file covers the choices the template cannot show.

## Front matter (TOML, `+++ ... +++`)

- `title`: **Title Case** (minor words like of/the/vs lowercased; keep code identifiers like `.claude` literal). Translated for ES, Title Case kept.
- `description`: 1 to 3 tight sentences, declarative, states thesis and payoff.
- `draft`: `true` until ready.
- `[taxonomies] tags`: 3 to 6, lowercase, hyphenated. Reuse existing tags.
- `[extra] subtitle`: a punchy aphoristic tagline, no period, sentence-case first word ("Two leaks, two patches").
- `[extra] static_thumbnail`: the cover, `/images/blog/YYYY-MM-DD/cover.webp` (webp preferred).
- `[extra] series` + `series_order`: optional, when the post belongs to a series (keys in `config.toml` under `[extra.series]`). The AI posts form one running numbered series (`series = "ai"`).
- `updated`: optional, set when substantially revising a published post.
- `related_posts` (usually 3) and `related_readings` (0-3): repo-relative paths. Preferred over a trailing `## Related` section.

## Body

- Short intro hook, then `<!-- more -->` before the first `##`.
- **Body length ~800-1000 words** (corpus norm ~900). Longer only when `deep_dive` blocks park the overflow.
- **4 to 7 H2 sections.** Never skip levels. H3 only to enumerate named sub-parts under one H2 (e.g. "### Level 0", "### Level 1").
- Cover comes from `static_thumbnail` (the template renders it as the hero). Do not repeat a body `![cover]` line in newer posts.
- In-body images by slot: `![blog-middle](...)` near the middle, `![blog-footer](...)` as the last content line. Descriptive alt text is better than the slot name.
- `{% deep_dive(title="...") %}...{% end %}` to park optional detail (code samples, extended examples) out of the main flow. Title is a short noun phrase. If used, set `[extra] reading_time` (minutes) counting only words outside the blocks.
- Optional trailing `---` then `{{ youtube(id="...") }}`, after the footer image.
- Many H2 sections close on a `>` punchline; do not force one on every section.

## Pre-publish checklist

1. Read it out loud. Could a non-expert follow it on the first pass? Any sentence over 35 words, any fancy word where a plain one fits, anything you had to reread? Split it, simplify it, cut it.
2. Opening: hook in 2-4 short paragraphs, one-line pivot, then `<!-- more -->`.
3. Ending: stamped (aphorism, imperative cluster, or hard one-liner). Not a recap.
4. Pull-quotes: about one per H2 in a didactic post, each a self-contained aphorism.
5. 4 to 7 H2s, no skipped levels, every section earns its place. Body ~800-1000 words.
6. Nothing from the "Never do" list in `SKILL.md` (em dashes, hedging, exclamations, emoji, AI hype).
7. Backticks on every file/command/flag. Bold for punchlines and list labels.
8. At least one inline link to a related prior post. External links for every stat.
9. Front matter complete: Title Case title, tight description, punchy subtitle, tags, cover, series, related_posts/readings.
10. ES mirror done per `references/spanish.md`: `tú`, kept-English terms correct, `/es/` link rule applied, metadata identical.
