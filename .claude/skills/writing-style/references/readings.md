# Readings (a different shape)

A reading is a book-anchored takeaway note, not an argument. Shorter, more list-driven, points outward to the book. Template: `.claude/templates/reading.md`. The filename date is when the book was finished.

- Front matter adds: `authors = [ ... ]`, `[extra] author`, `[extra] pages` (string), `[extra] subtitle` (the book's real subtitle), `static_thumbnail` (external cover URL, Goodreads/Amazon), `related_readings`, optional `related_posts`, optional `expand_preview`.
- **No `rating`, `verdict`, `score`, or buy-link fields exist. Do not invent them.**
- Length: ~400 to 800 words.
- Structure (two accepted shapes): a narrative-essay arc (intro, `<!-- more -->`, 4 to 6 themed H2s, then `## Key Takeaways` or `## Final Thoughts`, closing reflection), or a list/outline (H3 sections of bold-led bullets). Use one, not both levels.
- Book quotes are inline `>` blockquotes within the relevant section, unattributed (the whole note is about that author), in the book's language (re-quoted in Spanish for ES).
- Usually ends with a `---` and a `{{ youtube(id="...") }}` summary.
- Voice: more personal and punchy than a post. Open by selling why the book is worth the time; close with a one-line "so what", never a labeled rating.
