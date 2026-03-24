---
description: "Lint blog posts for missing front matter, broken links, and structure issues"
allowed-tools: Glob, Read, Grep
argument-hint: "[file-path or date]"
---

# Validate Posts

Lint blog posts (and optionally readings) for common issues.

## Instructions

1. If `$ARGUMENTS` is provided, validate only that file. Otherwise validate all posts in `content/blog/`.
2. For each post, check:

### Required front matter fields
- `title` — must be non-empty
- `description` — must be non-empty
- `[taxonomies]` with `tags` — must have at least one tag
- `[extra]` with `subtitle` — must be non-empty

### Structure checks
- `<!-- more -->` marker must exist after the introduction
- Must end with a `## Related` section
- No skipped heading levels (e.g., h2 → h4 without h3)
- No more than 7 `## ` (h2) headings

### Asset checks
- If `static_thumbnail` is set, verify the file exists in `static/`
- If `related_posts` entries exist, verify each target file exists in `content/`
- If `related_readings` entries exist, verify each target file exists in `content/`

### Filename check
- Must match pattern `YYYY-MM-DD-slug.md`
- Date must be valid

## Output format

Group issues by file. Show a summary at the end with total files checked and issues found.

$ARGUMENTS
