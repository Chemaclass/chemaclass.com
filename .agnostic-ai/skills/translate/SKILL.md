---
name: translate
description: "Translate content between English and Spanish. Argument: <file-path>"
x-claude:
  allowed-tools: Read, Write, Glob
argument-hint: "<file-path>"
---

# Translate Content

English is the main version. The `.es.md` file is always derived from the EN file, never the other way around. When the two differ, the EN file is the correct one: update the ES file to match it.

## Instructions

1. Read the source file
2. Read `.agnostic-ai/skills/writing-style/SKILL.md` and `.agnostic-ai/skills/writing-style/references/spanish.md` and apply their rules
3. Create an `.es.md` file in the same folder
4. Translate all content:
   - Front matter (title, description, subtitle)
   - Body content
5. Keep the same structure: paragraph count, headings, pull-quotes (highlighted quotes), rhythm of short fragments
6. Keep images and code blocks unchanged. Links follow the rules in `spanish.md`: translate the link text, prefix root-relative `/blog/...` links with `/es/`, keep slugs and `#` anchors that point to other posts in English
7. Keep assets and metadata identical to EN: `static_thumbnail`, `related_posts`, `related_readings`, `tags`, `series`, `series_order`, `reading_time`

## File to translate
The file path to translate is provided with this skill call.
