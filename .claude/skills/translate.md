---
description: "Translate content between English and Spanish"
allowed-tools: Read, Write, Glob
argument-hint: "<file-path>"
---

# Translate Content

Translate the specified content file to Spanish (or from Spanish to English).

## Instructions

1. Read the source file
2. If `.claude/blog-writing-style.md` exists, read it and apply its tone/style rules (especially the Spanish translation section). If it does not exist, skip this step.
3. Create a colocated `.es.md` file (or `.md` if translating from Spanish)
4. Translate all content including:
   - Front matter (title, description, subtitle)
   - Body content
   - Keep the same structure and formatting
5. Preserve all links, images, and code blocks

## File to translate
$ARGUMENTS
