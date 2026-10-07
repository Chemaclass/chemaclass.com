---
name: new-blog-post
description: "Create a new blog post from the project template. Argument: <topic>"
x-claude:
  allowed-tools: Read, Write, Glob, Grep
argument-hint: "<topic>"
---

# Create New Blog Post

## Instructions

1. Read the template at `.agnostic-ai/templates/blog-post.md`
2. Read `.agnostic-ai/skills/writing-style/SKILL.md` and `.agnostic-ai/skills/writing-style/references/blog-posts.md` (if present) and follow them for tone and style
3. Create the file at `content/blog/YYYY-MM-DD-slug.md` using today's date
4. Replace template placeholders with actual content based on the topic
5. Fill the front matter: title, description, tags (reuse existing tags), subtitle
6. Set `static_thumbnail` to the shared placeholder `/images/blog/placeholder.webp`. It is a TODO image stored in the repo, so the draft builds without real images. Use the same path for any `![blog-footer](...)` or `![blog-middle](...)` images you add. When `/add-image` adds the real images, change these paths to `/images/blog/YYYY-MM-DD/<slot>.webp`.
7. Check if the topic fits an existing series (see `[extra.series]` in `config.toml`); if so, add `series` and `series_order` to `[extra]`
8. Add `<!-- more -->` marker after the introduction
9. Use 4 to 7 h2 headings. Never skip a heading level
10. List related posts in the `related_posts` front matter field, not in a `## Related` section
11. Set `draft = true`

## Topic/Title
The topic/title is provided with this skill call.
