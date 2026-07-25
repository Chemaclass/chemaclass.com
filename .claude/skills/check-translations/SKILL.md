---
name: check-translations
description: "Find content files missing their Spanish (.es.md) translation. Use when asked about translation coverage or after adding new English content."
allowed-tools: Glob, Read, Grep
model: haiku
argument-hint: "[blog|readings|talks]"
---

# Check Translations

Find content files that are missing their Spanish (`.es.md`) counterpart.

## Instructions

1. Scan the target directories for `.md` files (excluding `_index.md` and `.es.md` files):
   - `content/blog/`
   - `content/readings/`
   - `content/talks/`
2. If `$ARGUMENTS` names a directory (e.g. "blog"), only check that one.
3. For each English file, check if a colocated `.es.md` version exists.

## Output format

- Total files vs translated count per directory
- List of files missing translations (most recent first)
- Overall translation coverage percentage

## Target
$ARGUMENTS
