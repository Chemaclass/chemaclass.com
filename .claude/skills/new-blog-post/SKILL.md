---
name: new-blog-post
description: "Create a new blog post from the project template. Argument: <topic>"
allowed-tools: Read, Write, Glob, Grep
argument-hint: "<topic>"
---

# Create New Blog Post

## Instructions

1. Read the template at `.claude/templates/blog-post.md`
2. Read `.claude/skills/writing-style/SKILL.md` and `.claude/skills/writing-style/references/blog-posts.md` (if present) and apply them as the tone and style guide
3. Create the file at `content/blog/YYYY-MM-DD-slug.md` using today's date
4. Replace template placeholders with actual content based on the topic
5. Fill the front matter: title, description, tags (reuse existing tags), subtitle
6. Set `static_thumbnail` to the shared placeholder `/images/blog/placeholder.webp` (a committed TODO image) so the draft compiles without real assets. Use the same path for any `![blog-footer](...)`/`![blog-middle](...)` slots you add. Swap these to `/images/blog/YYYY-MM-DD/<slot>.webp` when real images land via `/add-image`.
7. Check if the topic fits an existing series (see `[extra.series]` in `config.toml`); if so, add `series` and `series_order` to `[extra]`
8. Add `<!-- more -->` marker after the introduction
9. Limit h2 headings to 5-7, never skip heading levels
10. Prefer `related_posts` front matter over a `## Related` section
11. Set `draft = true`

## Topic/Title
The topic/title is provided with this skill call.
