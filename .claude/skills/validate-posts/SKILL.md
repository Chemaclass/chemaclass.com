---
name: validate-posts
description: "Lint blog posts for missing front matter, broken asset references, structure issues, and forbidden dashes. Use before publishing a post, before flipping draft to false, or after substantial edits to existing content."
allowed-tools: Glob, Read, Grep
argument-hint: "[file-path or date]"
---

# Validate Posts

Lint blog posts (and optionally readings) for common issues.

## Instructions

1. If a file path or date is provided with the skill call, validate only that file. Otherwise validate all posts in `content/blog/`, including `.es.md` translations but skipping the `_index.md` section files.
2. For each post, check:

### Required front matter fields
- `title`: non-empty
- `description`: non-empty
- `[taxonomies]` with `tags`: at least one tag
- `[extra]` with `subtitle`: non-empty

### Structure checks
- `<!-- more -->` marker must exist after the introduction
- Must have `related_posts` in front matter
- No skipped heading levels (e.g. h2 to h4 without h3)
- Advisory (report as a note, not a failure): the norm is 4 to 7 `## ` (h2) headings; deep_dive-heavy explainers and short reflective essays legitimately fall outside it
- No em dash (`—`, U+2014) anywhere; no en dash (`–`, U+2013) in prose

### Series checks
- If `series` is set, `series_order` must be set too (and vice versa)
- The `series` value must exist as a `[extra.series.<key>]` entry in `config.toml`
- `series` and `series_order` must be identical in the EN file and its `.es.md` mirror

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
The file path or date to validate (if any) is provided with this skill call.
