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
- Tone: a book summary. Nonfiction notes (economics, money, productivity) stay neutral and explain, close to an encyclopedia summary. Philosophy and fiction notes are more personal and punchy. Match the book. Do not force punch onto a technical summary. Close with one line on why it matters, never a labeled rating.
- Two sentence patterns you can use when the tone allows: the "Less like X. More like Y." contrast ("Less like a philosophy book. More like a notebook.") and short questions that set up the next point ("His advice?", "The key insight?", "Sounds obvious, right?"). Use them rarely. Most readings use only the short setup question.
