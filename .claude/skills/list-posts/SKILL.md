---
name: list-posts
description: "List blog posts with title, date, tags, and draft status. Optional argument: [tag or year] to filter"
allowed-tools: Glob, Read, Grep
model: haiku
---

# List Blog Posts

List all blog posts in `content/blog/` (excluding `.es.md` files), most recent first, as a table with:

- Title
- Date
- Tags
- Draft status

## Filter (optional: tag or year)
If a tag or year is provided with this skill call, filter the list by it.
