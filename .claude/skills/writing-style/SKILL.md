---
name: writing-style
description: Voice and style guide for chemaclass.com. Use when writing, editing, or reviewing any site content, including blog posts, readings, talks, slide decks, and translations.
---

# Writing Style (chemaclass.com)

The voice for all site content. Derived from the published corpus. When in doubt, read three recent posts and match them. This guide is the shortcut, not a replacement for the ear.

## Load by task

Read only the reference that matches the task:

- Blog post structure, front matter, pre-publish checklist: `references/blog-posts.md`
- Reading notes (book summaries): `references/readings.md`
- Talk pages and talks index: `references/talks.md`
- Spanish translations (`.es.md`): `references/spanish.md`

## Voice in one line

Plain, blunt, earned. Short sentences with deliberate fragments for punch. Teaches the reader directly, demystifies the tool, and stamps the ending.

## Write for everyone (plain language first)

This is the rule above all others. The reader skims on a phone, between meetings, often in their second language. Write so they never have to reread a sentence.

- **One idea per sentence.** If a sentence needs a second read, split it.
- **Pick the plain word over the fancy one:** "use" not "utilize", "help" not "facilitate", "about" not "regarding", "enough" not "sufficient", "start" not "commence", "show" not "demonstrate".
- **No niche or "MBA" English.** The author is a Spanish native; the reader often is too. Avoid metaphor-jargon a non-native would not recognize: "moat", "table stakes", "north star", "boil the ocean", "fungible", "ergonomic" (as metaphor), "load-bearing" (as metaphor), "compound" (verb, when "add up" works). When in doubt, pick the shorter Anglo word over the Latin one. Test: would a Spanish-speaking developer with B2 English understand it on first read?
- **Concrete over abstract.** A real example beats a definition. Show the thing, do not theorize about it.
- **Explain every term the moment you use it.** Assume a sharp reader who is new to this topic, not an expert.
- **Short paragraphs, plenty of white space.** Walls of text lose people.
- **Clarity beats sounding clever.** When the choice is impressive or clear, choose clear every time.

Plain does not mean shallow. The ideas can run deep. The sentences carrying them stay simple. A reader should grasp the meaning on the first pass and feel smarter, never lost.

## The persona

- Writes from years of real practice, not theory. Grounds claims in real projects (`phel-lang`, his own `.claude/` folder, his agent Sauron). "I learned this the hard way" energy.
- Treats AI as a teammate to direct, never as magic. Names tools precisely (Claude Code, Opus, Codex, Cursor).
- Holds strong opinions and states them as fact: "No real team works that way." "Rules are not suggestions."
- Believes human judgment is the irreplaceable layer. Recurring themes: you own the output, quality over speed, process over goal, grow from real friction not upfront design, craftsmanship (Clean Code, Clean Architecture, XP, TDD).

## Sentence and paragraph rhythm

- **Short by default.** Baseline sentence is 6 to 15 words. Almost never over 35. Long thoughts are chained as short independent clauses with commas, never built as one subordinate-clause sprawl.
- **Fragments for punch.** Roughly 1 in 4-5 sentences is a fragment or sub-5-word sentence. Never more than 2-3 in a row before a longer sentence resets the rhythm.
  - Examples to emulate: "Wrong question." / "Fast." / "Push back." / "Not as philosophy. As pattern." / "The limitation isn't intelligence. It's reach."
- **Lists as sentences** (comma-chained, no "and"): "The rendering, the physics, the audio, the mobile input."
- **Parallelism / anaphora** for rhythm: "The first time, you are too inside it to see. The second time, you start to notice. The third time, you can name it."
- **Single-line paragraphs are load-bearing.** Use a one-sentence paragraph to pivot or land the thesis: "But speed isn't quality." / "It's us." / "That's where MCP comes in."
- **Expand, then contract.** A paragraph explains, then a fragment carries the point. The contraction is where the meaning lands.
- **Vary the rhythm across sections.** Do not deploy every device in every section. A post that uses every trick everywhere reads machine-made. Let some sections run plain so the punchy ones land.

## Openings (before `<!-- more -->`)

1 to 4 short paragraphs, then the cut. The one-line pivot or thesis lands either at the end of the hook or as the first line right after `<!-- more -->`. Two modes:

- **Mode A: scene/anecdote first.** Open on a concrete fact or scenario, not a thesis. "Nietzsche proposed a thought experiment..." / "Hidden inside Sauron's blog, there is a playable game."
- **Mode B: claim, undercut, pivot.** Confident statement, an immediate "But..." reversal, a one-line redirect. The signature hinge is a one-line paragraph: **"But X isn't Y."** ("But understanding isn't the same as access.")

A recurring variant: the first line right after `<!-- more -->` is a `>` blockquote stating the thesis as an aphorism ("> Same model. Same prompts. Lighter bill."). Use it when the thesis compresses to one tweetable line.

Never open with throat-clearing ("In today's fast-paced world", "Have you ever wondered"). Open with a fact, a scene, or a claim, then cut.

## Closings

Always stamped, never trailing off. The last beat is one of:

- A `>` aphorism as the mic-drop: "We get one life. Make it one you would relive."
- A 2-3 word imperative cluster: "Commit the folder. Share it." / "Version it. Review it."
- A single hard one-liner, often a call-back to the opening: "Agents didn't create this bottleneck. They made it impossible to ignore."

## Pull-quotes (`>` blockquotes)

- **Frequency:** one per 1-2 H2 sections in didactic/technical posts. Narrative posts vary from zero (bold inline labels carry the emphasis instead) to quote-heavy. Match the register, do not force a quote into every section.
- **Length:** one sentence, occasionally two. Self-contained, tweetable.
- **Three shapes, in order of frequency:**
  1. Two-way antithesis: "Skills capture what to do. Rules capture what not to do." / "The agent is replaceable. Your skills are not."
  2. Definition / reframe (often a metaphor): "AI is a mirror that reflects the context you give it."
  3. Imperative / warning: "Don't be seduced by speed."

## Rhetorical devices

- **Rhetorical questions** to open a section or set up a turn: "Who handles your taxes?"
- **Hard-cut negation:** state the tempting belief, then flatly kill it. "The easy conclusion is X. That conclusion is wrong."
- **Two-way contrast** is the core engine (it powers most titles, subtitles, and pull-quotes): "Rules are guardrails. Skills are expertise."
- **Sustained metaphor/analogy:** introduce one and reuse it (mirror, hands vs brain, engine vs map, pilot vs autopilot, hiring/onboarding, steering wheel). Always a concrete everyday analogy for an abstract point. One analogy per section, never stacked. No pop-culture references that age fast.
- **Concession then pivot:** "It works. But..."

## Diction and formatting

- **Person:** `you` while teaching, `we`/`our` for shared responsibility and the moral close, `I` when narrating personal experience. Swing between them on purpose.
- **Contractions:** use them freely in technical and casual posts (this is the default for the AI series: isn't, don't, you'll, that's). Drop them only for a genuinely philosophical/elevated register (the rare reflective essay). When unsure, contract.
- **Technical terms** are named precisely and glossed in plain English in the same breath. "MCP is a protocol, not a product."
- **Backticks** for every file, command, flag, and key: `.claude/`, `git status`, `Shift+Tab`.
- **Code snippets** are real and runnable. No `foo`/`bar` unless illustrating syntax itself. Comment only the non-obvious line. One strong example beats three weak ones.
- **Bold** for the punchline of an argument and for inline list labels ("**Security code.** Login flows...").
- **Italics** for quoted prompts/phrases (_"fix issue #42"_), coined terms on first use (_vibe-coding_), and an allusive signoff line.
- **Link to your own prior posts inline**, often. Thread the series. Root-relative `/blog/slug/` or absolute `https://chemaclass.com/blog/slug/`, with `#anchor` to a specific section when useful. Link external sources for any stat or claim.

## Never do (off-voice tells)

- No em dashes or en dashes (`.claude/rules/no-em-dash.md`). Use period, comma, colon, or parentheses.
- No hedging: "I think", "perhaps", "it seems", "arguably", "in my humble opinion".
- No filler adverbs: "just", "really", "basically", "actually", "simply".
- No exclamation marks in your own prose (fine inside quoted speech or example text), no emoji, no profanity. Fragments and bold carry the emphasis.
- No long multi-clause subordinate sentences.
- No unexplained jargon and no jargon for its own sake.
- No corporate AI hype ("revolutionary", "game-changing", "unlock the power of").
- No weak, trailing endings ("time will tell", a flat recap).
