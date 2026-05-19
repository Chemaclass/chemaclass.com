---
description: "Create a new reading note from the project template"
allowed-tools: Read, Write, Glob
argument-hint: "<book-title> by <author>"
---

# Create New Reading

Create a new reading note using the project template.

## Instructions

1. Read the template at `.claude/templates/reading.md`
2. If `.claude/blog-writing-style.md` exists, read it and apply it as the tone and style guide. If it does not exist, skip this step.
3. Create the file at `content/readings/YYYY-MM-DD-slug.md` using today's date
4. Replace template placeholders with actual content based on the book
5. Include proper front matter with title, description, authors, tags, subtitle, pages, and author
6. Set `static_thumbnail` to the book's cover image URL (from Goodreads/Amazon if known)
7. Add `<!-- more -->` marker after the introduction
8. End with a `## Related` section linking to thematically similar readings
9. Set `draft = true` by default

## Book
$ARGUMENTS
