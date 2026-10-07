# Talks (a different tone)

A talk page is conference material: a short summary of the talk (the abstract) plus a list of where it was given. It is not an essay. The blog rhythm rules do not apply here. Abstracts are prose in complete sentences: no fragments, no pull-quotes, and no strong final one-liner. These rules from the core voice still apply: plain words, no hype, no hedging, no dashes, precise tool names.

- Person: `we`/`you`. Never write about yourself in the third person ("Chemaclass wants to...").
- Plain ASCII apostrophes and quotes, no curly quotes.

## Talk page (`content/talks/<slug>.md` + colocated `.es.md`)

- Front matter: `title`, `weight`, `[taxonomies] tags`, optional `aliases`, `[extra]` with `subtitle` and optional `project_url`.
- One intro paragraph (the abstract), `<!-- more -->`, then `---`.
- Event list, most recent first, one bullet each time the talk was given:
  `- YYYY-MM-DD | Event Name [**City, Country**] (EN|ES)`
  - A sub-bullet links to the event page. Optional extras, in this order: `[[slides](...)]`, `([Video](...))`, `([imgs](...))`.
- Events over several days use a slash range, never an en dash: `2023-10-24/26`.
- Optional content after the event list: cover images, `{{ <youtube id="..." /> }}`, `## Related posts`.

## Talks index (`content/talks/_index.md` + `.es.md`)

A full list kept by hand, newest first, grouped by `## YYYY` then `### Month`. Every entry has:

- The event bullet (same format as talk pages) with its link sub-bullet.
- A one-line _italic description_ of what the talk covered. Required for every entry.
- Cover images for each year and `---` separators between years.

When you add a new time the talk was given, update both the talk page and the index (EN and ES).
