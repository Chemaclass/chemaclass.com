---
name: translate
description: "Translate content between English and Spanish. Argument: <file-path>"
allowed-tools: Read, Write, Glob
---

# Translate Content

## Instructions

1. Read the source file
2. Read `.claude/skills/writing-style/SKILL.md` and `.claude/skills/writing-style/references/spanish.md` (if present) and apply their rules
3. Create a colocated `.es.md` file (or `.md` if translating from Spanish)
4. Translate all content:
   - Front matter (title, description, subtitle)
   - Body content
5. Keep the same structure: paragraph count, headings, pull-quotes, fragment rhythm
6. Preserve all links, images, and code blocks unchanged

## File to translate
The file path to translate is provided with this skill call.
