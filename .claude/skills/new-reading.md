---
description: "Create a new reading note from the project template"
allowed-tools: Read, Write, Glob
argument-hint: "<book-title> by <author>"
---

# Create New Reading

Create a new reading note using the project template.

## Instructions

1. Read the template at `.claude/templates/reading.md`
2. Create the file at `content/readings/YYYY-MM-DD-slug.md` using today's date
3. Replace template placeholders with actual content based on the book
4. Include proper front matter with title, description, authors, tags, subtitle, pages, and author
5. Set `static_thumbnail` to the book's cover image URL (from Goodreads/Amazon if known)
6. Add `<!-- more -->` marker after the introduction
7. End with a `## Related` section linking to thematically similar readings
8. Set `draft = true` by default

## Book
$ARGUMENTS
