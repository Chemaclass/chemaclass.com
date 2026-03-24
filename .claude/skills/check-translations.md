---
description: "Find content files missing their Spanish translation"
allowed-tools: Glob, Read, Grep
argument-hint: "[blog|readings|talks]"
---

# Check Translations

Find content files that are missing their Spanish (`.es.md`) counterpart.

## Instructions

1. Scan the target directories for `.md` files (excluding `_index.md` and `.es.md` files)
2. For each English file, check if a colocated `.es.md` version exists
3. Report results grouped by directory with counts

## Directories to check

- `content/blog/` — blog posts
- `content/readings/` — reading notes
- `content/talks/` — talks

If `$ARGUMENTS` specifies a directory (e.g., "blog"), only check that one.

## Output format

Show:
- Total files vs translated count per directory
- List of files missing translations (most recent first)
- Overall translation coverage percentage

$ARGUMENTS
