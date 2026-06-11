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
- `title`: non-empty
- `description`: non-empty
- `[taxonomies]` with `tags`: at least one tag
- `[extra]` with `subtitle`: non-empty

### Structure checks
- `<!-- more -->` marker must exist after the introduction
- Must have either `related_posts` in front matter or a `## Related` section (`related_posts` preferred)
- No skipped heading levels (e.g. h2 to h4 without h3)
- No more than 7 `## ` (h2) headings
- No em dash (`—`, U+2014) anywhere; no en dash (`–`, U+2013) in prose

### Asset checks
- If `static_thumbnail` is a local path, verify the file exists in `static/`
- If `related_posts` entries exist, verify each target file exists in `content/`
- If `related_readings` entries exist, verify each target file exists in `content/`

### Filename check
- Must match pattern `YYYY-MM-DD-slug.md` (or `YYYY-MM-DD-slug.es.md`)
- Date must be valid

## Output format

Group issues by file. End with a summary: total files checked, files with issues, total issues.

## Target
$ARGUMENTS
