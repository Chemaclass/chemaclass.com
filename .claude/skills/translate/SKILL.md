---
name: translate
description: "Translate content between English and Spanish. Argument: <file-path>"
allowed-tools: Read, Write, Glob
argument-hint: "<file-path>"
---

# Translate Content

English is the main version. The `.es.md` file is always derived from the EN file, never the other way around. When the two drift, the EN file is the source of truth: update the ES file to match it.

## Instructions

1. Read the source file
2. Read `.claude/skills/writing-style/SKILL.md` and `.claude/skills/writing-style/references/spanish.md` and apply their rules
3. Create a colocated `.es.md` file
4. Translate all content:
   - Front matter (title, description, subtitle)
   - Body content
5. Keep the same structure: paragraph count, headings, pull-quotes, fragment rhythm
6. Preserve images and code blocks unchanged. Links follow the rules in `spanish.md`: translate the link text, prefix root-relative `/blog/...` links with `/es/`, keep slugs and cross-post anchors in English
7. Keep assets and metadata identical to EN: `static_thumbnail`, `related_posts`, `related_readings`, `tags`, `series`, `series_order`, `reading_time`

## File to translate
The file path to translate is provided with this skill call.
