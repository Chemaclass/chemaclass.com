---
description: "Create a new blog post from the project template"
allowed-tools: Read, Write, Glob
argument-hint: "<topic>"
---

# Create New Blog Post

Create a new blog post using the project template.

## Instructions

1. Read the template at `.claude/templates/blog-post.md`
2. If `.claude/blog-writing-style.md` exists, read it and apply it as the tone and style guide. If it does not exist, skip this step.
3. Create the file at `content/blog/YYYY-MM-DD-slug.md` using today's date
4. Replace template placeholders with actual content based on the topic
5. Include proper front matter with title, description, tags, and subtitle
6. Update `static_thumbnail` path to use the correct date
7. Add `<!-- more -->` marker after the introduction
8. Follow the heading structure (limit h2 to 5-7, never skip levels)
9. End with a `## Related` section
10. Set `draft = true` by default

## Topic/Title
$ARGUMENTS
