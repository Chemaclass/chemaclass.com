---
name: new-talk
description: "Create a new talk page (EN + ES) and optionally a starter Marp slide deck. Argument: <talk-title> [--deck]"
x-claude:
  allowed-tools: Read, Write, Glob, Grep, Bash(scripts/build-slides.sh *), Bash(mkdir *)
argument-hint: "<talk-title> [--deck]"
---

# Create New Talk

## Instructions

1. Read an existing talk (e.g. `content/talks/bashunit.md`) to copy its structure
2. Read `.agnostic-ai/skills/writing-style/SKILL.md` and `.agnostic-ai/skills/writing-style/references/talks.md` (if present) for tone and the rules for talk pages
3. Create `content/talks/<slug>.md`:
   - Front matter: `title`, `weight` (check existing talks; lower = listed first), `[taxonomies]` with `tags`, optional `aliases`, `[extra]` with `subtitle` and optional `project_url`
   - One intro paragraph describing the talk
   - `<!-- more -->` marker, then `---`
   - Event list, most recent first, one bullet for each time the talk was given:
     `- YYYY-MM-DD | Event Name [**City, Country**] (EN|ES)` with a sub-bullet linking to the event page (and video/photos if available)
4. Create the `content/talks/<slug>.es.md` translation in the same folder (same structure, see `.agnostic-ai/skills/writing-style/references/spanish.md`)
5. If `--deck` is passed, create the slide deck:
   - Copy an existing deck so the new one gets the site theme built into it (`cp -r static/slides/ai-copilot static/slides/<deck-slug>`). Then replace the `deck.md` content and the files in `assets/`. Do not write `deck.md` from an empty file: the theme lives in its `style:` block
   - The deck slug may differ from the talk slug (e.g. talk `phel` uses deck `phel-doom`)
   - Build it with `scripts/build-slides.sh <deck-slug>` and commit the generated `index.html` together with the source
6. Update the talks index `content/talks/_index.md` (+ `.es.md`). It is a list edited by hand, grouped by `## YYYY` and then `### Month`, newest first. Every entry needs the event bullet, its link sub-bullet, and a one-line italic description (see `references/talks.md`)

## Talk
The talk title (and optional `--deck` flag) is provided with this skill call.
