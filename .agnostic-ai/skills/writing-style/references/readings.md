# Readings (a different shape)

A reading is a note on what you took from one book, not an argument. It is shorter, uses more lists, and points the reader to the book. Template: `.agnostic-ai/templates/reading.md`. The filename date is when the book was finished.

- Front matter: `title`, `description`, `[taxonomies] tags`, `authors = [ ... ]`, `[extra] author`, `[extra] pages` (string), `[extra] subtitle` (the book's real subtitle or a short tagline; often left empty `""` when neither fits), `static_thumbnail` (a local webp under `/images/readings/`; start from a Goodreads/Amazon URL and run `scripts/localize-reading-covers.py`), `related_readings`, optional `related_posts`.
- **No `rating`, `verdict`, `score`, or buy-link fields exist. Do not invent them.**
- No inline `![cover]` line in the body. The cover comes from `static_thumbnail`.
- Length: ~400 to 800 words.
- Structure (two accepted shapes): an essay that tells a story (intro, `<!-- more -->`, 4 to 6 H2s by theme, then `## Key Takeaways` or `## Final Thoughts`, then a closing thought), or a list/outline (H3 sections of bullets that start in bold). Use one, not both levels.
- H2 headings use Title Case (unlike blog posts). `## Key Takeaways` is 3 to 5 bullets, each starting in bold, then one closing line.
- Book quotes are inline `>` blockquotes inside the relevant section. Do not name the author on each quote (the whole note is about that author). Keep them in the book's language (quote the Spanish edition for ES).
- A video summary is optional. When present it sits at the end, either after a `---` as a bare `{{ <youtube id="..." /> }}` or under its own H2 (e.g. `## Video Summary`). Many readings have none.
- Tone: a book summary. Nonfiction notes (economics, money, productivity) stay neutral and explain, close to an encyclopedia summary. Philosophy and fiction notes are more personal. Close with one plain sentence on what you changed or will try after reading it, never a labeled rating.
- No "Less like X. More like Y." contrasts and no short setup questions ("His advice?", "The key insight?"). State the advice. See `references/slop.md`.
