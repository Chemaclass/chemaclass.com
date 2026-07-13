---
name: new-reading
description: "Create a new reading note from the project template. Argument: <book-title> by <author>"
allowed-tools: Read, Write, Glob
---

# Create New Reading

## Instructions

1. Read the template at `.claude/templates/reading.md`
2. Read `.claude/skills/writing-style/SKILL.md` and `.claude/skills/writing-style/references/readings.md` (if present) and apply them as the tone and style guide
3. Create the file at `content/readings/YYYY-MM-DD-slug.md` using today's date
4. Replace template placeholders with actual content based on the book
5. Fill the front matter: title, description, authors, tags, subtitle, pages, and author
6. Set `static_thumbnail` to the book's cover image URL (from Goodreads/Amazon if known)
7. Add `<!-- more -->` marker after the introduction
8. Fill `related_readings` in front matter with thematically similar readings (verify each target file exists)
9. Set `draft = true`

## Book
The book title and author are provided with this skill call.
