---
name: writing-style
description: Voice and style guide for chemaclass.com. Use when writing, editing, or reviewing any site content, including blog posts, readings, talks, slide decks, and translations.
---

# Writing Style (chemaclass.com)

The voice for all site content. It comes from the posts already published on the site. When in doubt, read three recent posts and match them. This guide is a shortcut. It does not replace your own ear.

## Load by task

Read only the reference that matches the task:

- Blog post structure, front matter, pre-publish checklist: `references/blog-posts.md`
- Reading notes (book summaries): `references/readings.md`
- Talk pages and talks index: `references/talks.md`
- Spanish translations (`.es.md`): `references/spanish.md`

## Voice in one line

Plain, direct, based on real experience. Short sentences, with some short fragments on purpose for impact. It teaches the reader directly, makes the tool easy to understand, and ends on a strong final line.

## Write for everyone (plain language first)

This is the rule above all others. The reader skims on a phone, between meetings, often in their second language. Write so they never have to reread a sentence.

- **One idea per sentence.** If a sentence needs a second read, split it.
- **Pick the plain word over the fancy one:** "use" not "utilize", "help" not "facilitate", "about" not "regarding", "enough" not "sufficient", "start" not "commence", "show" not "demonstrate".
- **No niche or "MBA" English.** The author is a Spanish native. The reader often is too. Avoid business metaphors a non-native would not recognize: "moat", "table stakes", "north star", "boil the ocean", "fungible", "ergonomic" (as metaphor), "load-bearing" (as metaphor), "compound" (verb, when "add up" works). When in doubt, pick the shorter Anglo word over the Latin one. Test: would a Spanish-speaking developer with B2 English understand it on first read?
- **Concrete over abstract.** A real example beats a definition. Show the thing, do not theorize about it.
- **Explain every term the moment you use it.** Assume a sharp reader who is new to this topic, not an expert.
- **Short paragraphs, plenty of white space.** Walls of text lose people.
- **Clarity beats sounding clever.** When the choice is impressive or clear, choose clear every time.

Plain does not mean shallow. The ideas can run deep. The sentences carrying them stay simple. A reader should get the meaning on the first pass and feel smarter, never lost.

## Who the author is

- Writes from years of real practice, not theory. Backs claims with real projects (`phel-lang`, his own `.claude/` folder, his agent Sauron). The tone is "I learned this the hard way".
- Treats AI as a teammate to direct, never as magic. Names tools precisely (Claude Code, Opus, Codex, Cursor).
- Holds strong opinions and states them as fact: "No real team works that way." "Rules are not suggestions."
- Believes human judgment is the part nothing can replace. Recurring themes: you own the output, quality over speed, process over goal, grow from real problems instead of upfront design, craftsmanship (Clean Code, Clean Architecture, XP, TDD).

## Sentence and paragraph rhythm

- **Short by default.** A normal sentence is 6 to 15 words. Almost never over 35. Write a long thought as short independent clauses joined by commas. Never build one long sentence full of sub-clauses.
- **Fragments for impact.** About 1 in 4 or 5 sentences is a fragment or a sentence under 5 words. Never more than 2 or 3 in a row. Then a longer sentence resets the rhythm.
  - Examples to copy: "Wrong question." / "Fast." / "Push back." / "Not as philosophy. As pattern." / "The limitation isn't intelligence. It's reach."
- **Lists as sentences** (items joined by commas, no "and"): "The rendering, the physics, the audio, the mobile input."
- **Repeat the same sentence start** for rhythm: "The first time, you are too inside it to see. The second time, you start to notice. The third time, you can name it."
- **Single-line paragraphs matter.** Use a one-sentence paragraph to change direction or to state the main idea: "But speed isn't quality." / "It's us." / "That's where MCP comes in."
- **Expand, then contract.** A paragraph explains. Then a fragment carries the point. The short fragment is where the meaning lands.
- **Vary the rhythm across sections.** Do not use every device in every section. A post that uses every trick everywhere reads machine-made. Let some sections run plain so the punchy ones land.

## Openings (before `<!-- more -->`)

1 to 4 short paragraphs, then the cut. The one-line turn or main idea goes either at the end of the hook or as the first line right after `<!-- more -->`. Two modes:

- **Mode A: scene or story first.** Open on a concrete fact or scenario, not on the main idea. "Nietzsche proposed a thought experiment..." / "Hidden inside Sauron's blog, there is a playable game."
- **Mode B: claim, reversal, turn.** A confident statement, then an immediate "But..." that reverses it, then a one-line change of direction. The typical turning point is a one-line paragraph: **"But X isn't Y."** ("But understanding isn't the same as access.")

A common variant: the first line right after `<!-- more -->` is a `>` blockquote that states the main idea as a short, memorable saying ("> Same model. Same prompts. Lighter bill."). Use it when the main idea fits in one short line people could share.

Never open with empty warm-up lines ("In today's fast-paced world", "Have you ever wondered"). Open with a fact, a scene, or a claim, then cut.

## Closings

Always end on a strong final line. Never let the post fade out. The last line is one of:

- A `>` short saying as the final word: "We get one life. Make it one you would relive."
- A group of 2 or 3 short commands: "Commit the folder. Share it." / "Version it. Review it."
- A single hard one-liner, often pointing back to the opening: "Agents didn't create this bottleneck. They made it impossible to ignore."

## Pull-quotes (`>` blockquotes)

- **Frequency:** one per 1 or 2 H2 sections in teaching or technical posts. Story posts vary. Some have zero (bold inline labels carry the emphasis instead), some have many. Match the tone of the post. Do not force a quote into every section.
- **Length:** one sentence, sometimes two. It must make sense alone and be short enough to share.
- **Three shapes, from most to least common:**
  1. Two opposite halves side by side: "Skills capture what to do. Rules capture what not to do." / "The agent is replaceable. Your skills are not."
  2. A definition or a new way to see the thing (often a metaphor): "AI is a mirror that reflects the context you give it."
  3. A command or a warning: "Don't be seduced by speed."

## Rhetorical devices

- **Questions to the reader** to open a section or set up a turn: "Who handles your taxes?"
- **Hard negation:** state the tempting belief, then reject it flatly. "The easy conclusion is X. That conclusion is wrong."
- **Two-way contrast** is the main tool (it drives most titles, subtitles, and pull-quotes): "Rules are guardrails. Skills are expertise."
- **One metaphor or comparison, kept going:** introduce one and reuse it (mirror, hands vs brain, engine vs map, pilot vs autopilot, hiring/onboarding, steering wheel). Always use a concrete everyday comparison for an abstract point. One comparison per section, never several at once. No pop-culture references that age fast.
- **Admit, then turn:** "It works. But..."

## Word choice and formatting

- **Person:** `you` while teaching, `we`/`our` for shared responsibility and the moral close, `I` when telling personal experience. Switch between them on purpose.
- **Contractions:** use them freely in technical and casual posts. This is the default for the AI series: isn't, don't, you'll, that's. Drop them only in a serious, philosophical tone (the rare reflective essay). When unsure, contract.
- **Technical terms** are named precisely and explained in plain English in the same sentence. "MCP is a protocol, not a product."
- **Backticks** for every file, command, flag, and key: `.claude/`, `git status`, `Shift+Tab`.
- **Code snippets** are real and runnable. No `foo`/`bar` unless you are showing syntax itself. Comment only the line that is not obvious. One strong example beats three weak ones.
- **Bold** for the main point of an argument and for inline list labels ("**Security code.** Login flows...").
- **Italics** for quoted prompts or phrases (_"fix issue #42"_), new terms on first use (_vibe-coding_), and a sign-off line that hints at something instead of saying it.
- **Link to your own earlier posts inline**, often. Connect the posts in a series. Use root-relative `/blog/slug/` or absolute `https://chemaclass.com/blog/slug/`, with `#anchor` to a specific section when useful. Link external sources for any number or claim.

## Never do (signs that break the voice)

- No em dashes or en dashes (`.agnostic-ai/rules/no-em-dash.md`). Use period, comma, colon, or parentheses.
- No hedging: "I think", "perhaps", "it seems", "arguably", "in my humble opinion".
- No filler adverbs: "just", "really", "basically", "actually", "simply".
- No exclamation marks in your own prose (fine inside quoted speech or example text), no emoji, no profanity. Fragments and bold carry the emphasis.
- No long sentences with many sub-clauses.
- No unexplained jargon and no jargon for its own sake.
- No corporate AI hype ("revolutionary", "game-changing", "unlock the power of").
- No weak endings that fade out ("time will tell", a flat recap).
