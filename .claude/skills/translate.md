---
description: "Translate content between English and Spanish"
allowed-tools: Read, Write, Glob
argument-hint: "<file-path>"
---

# Translate Content

Translate the specified content file to Spanish (or from Spanish to English).

## Instructions

1. Read the source file
2. Read `.claude/blog-writing-style.md` (if present) and apply its rules, especially the "Spanish (ES) translations" section
3. Create a colocated `.es.md` file (or `.md` if translating from Spanish)
4. Translate all content:
   - Front matter (title, description, subtitle)
   - Body content
5. Keep the same structure: paragraph count, headings, pull-quotes, fragment rhythm
6. Preserve all links, images, and code blocks unchanged

## File to translate
$ARGUMENTS
