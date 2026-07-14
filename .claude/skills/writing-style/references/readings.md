# Readings (a different shape)

A reading is a book-anchored takeaway note, not an argument. Shorter, more list-driven, points outward to the book. Template: `.claude/templates/reading.md`. The filename date is when the book was finished.

- Front matter: `title`, `description`, `[taxonomies] tags`, `authors = [ ... ]`, `[extra] author`, `[extra] pages` (string), `[extra] subtitle` (the book's real subtitle or a short tagline; often left empty `""` when neither fits), `static_thumbnail` (external cover URL, Goodreads/Amazon), `expand_preview = true` (the default, used by nearly every reading), `related_readings`, optional `related_posts`.
- **No `rating`, `verdict`, `score`, or buy-link fields exist. Do not invent them.**
- No inline `![cover]` line in the body; the cover comes from `static_thumbnail`.
- Length: ~400 to 800 words.
- Structure (two accepted shapes): a narrative-essay arc (intro, `<!-- more -->`, 4 to 6 themed H2s, then `## Key Takeaways` or `## Final Thoughts`, closing reflection), or a list/outline (H3 sections of bold-led bullets). Use one, not both levels.
- Book quotes are inline `>` blockquotes within the relevant section, unattributed (the whole note is about that author), in the book's language (re-quoted in Spanish for ES).
- A video summary is optional. When present it sits at the end, either after a `---` as a bare `{{ youtube(id="...") }}` or under its own H2 (e.g. `## Video Summary`). Many readings have none.
- Voice: book-summary register. Nonfiction notes (economics, money, productivity) run neutral and expository, closer to an encyclopedic summary. Philosophy and fiction notes get more personal and punchy. Match the book, do not force punch onto a technical summary. Close with a one-line "so what", never a labeled rating.
- Cadences available when the register invites them: the "Less like X. More like Y." antithesis ("Less like a philosophy book. More like a notebook.") and setup-question fragments ("His advice?", "The key insight?", "Sounds obvious, right?"). Use sparingly; most readings use only the setup-question.
