---
description: "Create a new talk page (EN + ES) and optionally scaffold a Marp slide deck"
allowed-tools: Read, Write, Glob, Grep, Bash(scripts/build-slides.sh *), Bash(mkdir *)
argument-hint: "<talk-title> [--deck]"
---

# Create New Talk

Create a talk page in `content/talks/` with its Spanish counterpart, and optionally a Marp deck under `static/slides/`.

## Instructions

1. Read an existing talk (e.g. `content/talks/bashunit.md`) as the structural reference
2. Read `.claude/blog-writing-style.md` (if present) for tone
3. Create `content/talks/<slug>.md`:
   - Front matter: `title`, `weight` (check existing talks; lower = listed first), `tags`, `[extra]` with `subtitle` and optional `project_url`
   - One intro paragraph describing the talk
   - `<!-- more -->` marker, then `---`
   - Event list, most recent first, one bullet per delivery:
     `- YYYY-MM-DD | Event Name [**City, Country**] (EN|ES)` with a sub-bullet linking to the event page (and video/photos if available)
4. Create the colocated `content/talks/<slug>.es.md` translation (same structure, see the style guide's Spanish section)
5. If `--deck` is passed, scaffold the deck:
   - Create `static/slides/<slug>/deck.md` (Marp markdown, speaker notes in HTML comments) and `static/slides/<slug>/assets/`
   - Build it with `scripts/build-slides.sh <slug>` and commit the generated `index.html` alongside the source
6. Update the talks index `content/talks/_index.md` (+ `.es.md`) if it lists talks or events manually

## Talk
$ARGUMENTS
