---
description: "Create a new talk page (EN + ES) and optionally scaffold a Marp slide deck"
allowed-tools: Read, Write, Glob, Grep, Bash(scripts/build-slides.sh *), Bash(mkdir *)
argument-hint: "<talk-title> [--deck]"
---

# Create New Talk

Create a talk page in `content/talks/` with its Spanish counterpart, and optionally a Marp deck under `static/slides/`.

## Instructions

1. Read an existing talk (e.g. `content/talks/bashunit.md`) as the structural reference
2. Read `.claude/skills/writing-style/SKILL.md` and `.claude/skills/writing-style/references/talks.md` (if present) for tone and talk-page conventions
3. Create `content/talks/<slug>.md`:
   - Front matter: `title`, `weight` (check existing talks; lower = listed first), `[taxonomies]` with `tags`, optional `aliases`, `[extra]` with `subtitle` and optional `project_url`
   - One intro paragraph describing the talk
   - `<!-- more -->` marker, then `---`
   - Event list, most recent first, one bullet per delivery:
     `- YYYY-MM-DD | Event Name [**City, Country**] (EN|ES)` with a sub-bullet linking to the event page (and video/photos if available)
4. Create the colocated `content/talks/<slug>.es.md` translation (same structure, see `.claude/skills/writing-style/references/spanish.md`)
5. If `--deck` is passed, scaffold the deck:
   - Create `static/slides/<slug>/deck.md` (Marp markdown, speaker notes in HTML comments) and `static/slides/<slug>/assets/`
   - Build it with `scripts/build-slides.sh <slug>` and commit the generated `index.html` alongside the source
6. Update the talks index `content/talks/_index.md` (+ `.es.md`): it is a manual log grouped `## YYYY` then `### Month`, newest first; every entry needs the event bullet, its link sub-bullet, and a one-line italic description (see `references/talks.md`)

## Talk
$ARGUMENTS
