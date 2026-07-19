---
name: new-talk
description: "Create a new talk page (EN + ES) and optionally scaffold a Marp slide deck. Argument: <talk-title> [--deck]"
allowed-tools: Read, Write, Glob, Grep, Bash(scripts/build-slides.sh *), Bash(mkdir *)
argument-hint: "<talk-title> [--deck]"
---

# Create New Talk

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
   - Copy an existing deck to inherit the embedded site theme (`cp -r static/slides/ai-copilot static/slides/<deck-slug>`), then replace the `deck.md` content and swap `assets/`. Do not create `deck.md` from scratch: the theme lives in its `style:` block
   - The deck slug may differ from the talk slug (e.g. talk `phel` uses deck `phel-doom`)
   - Build it with `scripts/build-slides.sh <deck-slug>` and commit the generated `index.html` alongside the source
6. Update the talks index `content/talks/_index.md` (+ `.es.md`): it is a manual log grouped `## YYYY` then `### Month`, newest first; every entry needs the event bullet, its link sub-bullet, and a one-line italic description (see `references/talks.md`)

## Talk
The talk title (and optional `--deck` flag) is provided with this skill call.
