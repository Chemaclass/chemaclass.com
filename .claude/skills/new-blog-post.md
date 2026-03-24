---
description: "Create a new blog post from the project template"
allowed-tools: Read, Write, Glob
argument-hint: "<topic>"
---

# Create New Blog Post

Create a new blog post using the project template.

## Instructions

1. Read the template at `.claude/templates/blog-post.md`
2. Create the file at `content/blog/YYYY-MM-DD-slug.md` using today's date
3. Replace template placeholders with actual content based on the topic
4. Include proper front matter with title, description, tags, and subtitle
5. Update `static_thumbnail` path to use the correct date
6. Add `<!-- more -->` marker after the introduction
7. Follow the heading structure (limit h2 to 5-7, never skip levels)
8. End with a `## Related` section
9. Set `draft = true` by default

## Topic/Title
$ARGUMENTS
