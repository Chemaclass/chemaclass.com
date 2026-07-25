# Talks (a different register)

A talk page is conference material: an abstract plus a delivery log, not an essay. The blog rhythm rules do not apply here. Abstracts are complete-sentence prose with no fragments, no pull-quotes, and no stamped close. What still applies from the core voice: plain words, no hype, no hedging, no dashes, precise tool names.

- Person: `we`/`you`. Never third person about yourself ("Chemaclass wants to...").
- Plain ASCII apostrophes and quotes, no curly typography.

## Talk page (`content/talks/<slug>.md` + colocated `.es.md`)

- Front matter: `title`, `weight`, `[taxonomies] tags`, optional `aliases`, `[extra]` with `subtitle` and optional `project_url`.
- One intro paragraph (the abstract), `<!-- more -->`, then `---`.
- Event list, most recent first, one bullet per delivery:
  `- YYYY-MM-DD | Event Name [**City, Country**] (EN|ES)`
  - Sub-bullet linking the event page; optional annotations in this order: `[[slides](...)]`, `([Video](...))`, `([imgs](...))`.
- Multi-day events use a slash range, never an en dash: `2023-10-24/26`.
- Optional trailing content after the event list: cover images, `{{ youtube(id="...") }}`, `## Related posts`.

## Talks index (`content/talks/_index.md` + `.es.md`)

A manual master log, newest first, grouped `## YYYY` then `### Month`. Every entry has:

- The event bullet (same format as talk pages) with its link sub-bullet.
- A one-line _italic description_ of what was delivered. Mandatory, every entry.
- Per-year cover images and `---` separators between years.

When adding a delivery, update both the talk page and the index (EN and ES).
