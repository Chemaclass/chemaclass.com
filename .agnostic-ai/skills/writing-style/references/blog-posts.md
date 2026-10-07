# Blog post structure and front matter

Field shapes live in the template: `.agnostic-ai/templates/blog-post.md`. This file covers the choices the template cannot show.

## Front matter (TOML, `+++ ... +++`)

- `title`: **Title Case** (minor words like of/the/vs in lowercase; keep code identifiers like `.claude` as they are). Translated for ES, still in Title Case.
- `description`: 1 to 3 short sentences. Plain statements that give the main idea and what the reader gets from it.
- `draft`: `true` until ready.
- `[taxonomies] tags`: 3 to 6, lowercase, hyphenated. Reuse existing tags.
- `[extra] subtitle`: a short, punchy tagline, no period, first word capitalized like a sentence ("Two leaks, two patches").
- `[extra] static_thumbnail`: the cover, `/images/blog/YYYY-MM-DD/cover.webp` (webp preferred). Drafts without real images point at the committed placeholder `/images/blog/placeholder.webp` until `/add-image` swaps in the real cover.
- `[extra] series` + `series_order`: optional, when the post belongs to a series (keys in `config.toml` under `[extra.series]`). The AI posts form one ongoing numbered series (`series = "ai"`).
- `[extra] tldr`: optional. The summary box at the top of the post. It defaults to `description`. Set it when the post deserves an opening line written for a reader, not for a search result. It is also published as the schema `abstract`.
- `updated`: optional. Set it when you make a large revision to a published post. Otherwise the last-modified date comes from git, so use this only to mark a real revision.
- `related_posts` (usually 3) and `related_readings` (0-3): repo-relative paths. Use these instead of a `## Related` section at the end.

## Body

- Short intro hook, then `<!-- more -->` before the first `##`.
- **Body length ~800-1000 words** (the site average is ~900). Longer only when `deep_dive` blocks hold the extra text. Short reflective essays run ~550. That is fine when the post follows one clear idea from start to end.
- **4 to 7 H2 sections** is normal. Reference posts with many `deep_dive` blocks may have more (how-bitcoin-works has 9). Reflective essays may have fewer. Never skip levels. Use H3 only to list named sub-parts under one H2 (e.g. "### Level 0", "### Level 1").
- **In-body headings are sentence case** (Title Case is for the post title only). Headings are statements, not questions. Use verbs when possible ("Skills load context on demand", not "On-demand loading of skills").
- **Every heading states its own claim.** Search engines and AI answer engines match a question against the heading. Generic labels match nothing: no "Conclusion", "Summary", "Context", "Introduction", "Final thoughts", "The problem". Say what the section concludes: "London and Chicago work better together", "Why people conform to a group they disagree with". A closing section still closes. It carries its point in its title. When the reader would type the heading as a question, put it in `[extra] faq` instead (see below).
- `[extra] faq`: optional list of `{ q = "...", a = "..." }`. It renders a `<details>` list at the end of the post and publishes FAQPage markup. Questions written as questions belong here. Answers are plain text, one to three sentences, no markdown. Translate the pairs in the ES file.
- The cover comes from `static_thumbnail` (the template shows it as the large top image). Do not repeat a body `![cover]` line in newer posts.
- In-body images by position: `![blog-middle](...)` near the middle, `![blog-footer](...)` as the last content line. Descriptive alt text is better than the position name. In a draft, point these at `/images/blog/placeholder.webp` until the real image exists.
- Use `{% <deep_dive title="..."> %}...{% </deep_dive> %}` to move optional detail (code samples, longer examples) out of the main text. The title is a short noun phrase. If you use it, set `[extra] reading_time` (minutes), counting only words outside the blocks.
- Use `{% <kudos> %}Thanks to ...{% </kudos> %}` for the note that thanks whoever gave the idea or helped with the post. It goes after the strong final line, before the footer image. One or two sentences, markdown links allowed.
- Optional at the very end: `---` then `{{ <youtube id="..." /> }}`, after the footer image.
- The body is a Tera template, so these components are the only `{{`, `{%` or `{#` allowed in it. Wrap any literal one (a code sample, a template snippet) in `{% raw %}...{% endraw %}`. Otherwise Zola renders it as a template.
- Many H2 sections end on a `>` punchline. Do not force one on every section.

## Pre-publish checklist

1. Read it out loud. Could a non-expert follow it on the first pass? Look for any sentence over 35 words, any fancy word where a plain one fits, anything you had to reread. Split it, simplify it, cut it. Then cut 10% of the words. If the post did not get worse, the cut stays.
2. Opening: hook in 1-4 short paragraphs, a one-line turn, then `<!-- more -->`.
3. Ending: a strong final line (a short saying, a group of short commands, or a hard one-liner). Not a recap.
4. Pull-quotes: one per 1 or 2 H2 sections in a teaching post, each a short saying that makes sense alone.
5. H2 count fits the post type (normal is 4-7; more for explainers with many `deep_dive` blocks, fewer for short essays). No skipped levels. Every section is needed. Body ~800-1000 words (~550 for reflective essays). Read the headings in order: they alone should tell the story.
6. Nothing from the "Never do" list in `SKILL.md` (em dashes, hedging, exclamations, emoji, AI hype).
7. Backticks on every file/command/flag. Bold for punchlines and list labels.
8. At least one inline link to a related earlier post. External links for every number or statistic.
9. Front matter complete: Title Case title, short description, punchy subtitle, tags, cover, series, related_posts/readings.
10. ES file done as described in `references/spanish.md`: `tú`, correct English terms kept, `/es/` link rule applied, metadata identical.
