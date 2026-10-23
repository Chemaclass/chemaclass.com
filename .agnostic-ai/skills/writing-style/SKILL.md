---
name: writing-style
description: Voice and style guide for chemaclass.com, with the anti-slop rules that keep prose from sounding machine-made. Use when writing, editing, or reviewing any site content (blog posts, readings, talks, slide decks, translations), or when asked for less slop, to clean up this text, or because a draft sounds like AI.
---

# Writing Style (chemaclass.com)

The voice for all site content. When this guide and the posts already published disagree, this guide wins: older posts lean on fragments, contrasts and pull-quotes that now count as slop.

## Load by task

Read only the reference that matches the task:

- Before delivering any prose: `references/slop.md` (phrases to cut, structures to break, quick checks)
- Blog post structure, front matter, pre-publish checklist: `references/blog-posts.md`
- Reading notes (book summaries): `references/readings.md`
- Talk pages and talks index: `references/talks.md`
- Spanish translations (`.es.md`): `references/spanish.md`

## Voice in one line

Plain, direct, specific. Complete sentences from someone who did the work, written to the reader as `you`.

## Write for everyone (plain language first)

This rule comes first. The reader skims on a phone, between meetings, often in their second language. Write so they never reread a sentence.

- **One idea per sentence.** If a sentence needs a second read, split it.
- **Pick the plain word:** "use" not "utilize", "help" not "facilitate", "about" not "regarding", "enough" not "sufficient", "start" not "commence", "show" not "demonstrate".
- **No niche or "MBA" English.** The author is a Spanish native; the reader often is too. Avoid metaphor jargon a non-native would not recognize: "moat", "table stakes", "north star", "boil the ocean", "fungible", "ergonomic" or "load-bearing" as metaphor, "compound" when "add up" works. Prefer the short Anglo word over the Latin one. Test: would a Spanish-speaking developer with B2 English understand it on first read?
- **Concrete over abstract.** Show the real example, the file, the number, the person.
- **Explain every term the moment you use it.** Assume a sharp reader who is new to the topic.
- **Short paragraphs, plenty of white space.**
- **Clear beats clever.**

Plain does not mean shallow. The ideas can run deep while the sentences carrying them stay simple.

## Who the author is

- Writes from years of practice. Grounds claims in his own projects (`phel-lang`, his `.claude/` folder, his agent Sauron) and says what went wrong.
- Treats AI as a teammate to direct. Names tools precisely (Claude Code, Opus, Codex, Cursor).
- States opinions directly, tied to a case: "In my last three teams, nobody read the ADRs." Not a sweeping verdict on everyone.
- Recurring themes: you own the output, quality over speed, grow from real friction, craftsmanship (Clean Code, Clean Architecture, XP, TDD).

## Sentence and paragraph rhythm

- **Short, complete sentences.** Baseline 6 to 15 words, almost never over 35. Chain a long thought as short independent clauses, not one long sentence full of sub-clauses.
- **Vary the length.** Three sentences in a row of the same length read mechanical; break one.
- **Fragments are rare.** Use one only when a full sentence would sound stiff. Never stack two.
- **Two items beat three.** Name the one or two things that matter. A list of three needs all three to be real and different.
- **Vary paragraph endings.** Most paragraphs end on their last fact or step, not on a punchline. A one-line paragraph is allowed when it carries new information, not a restatement.
- **Active voice with a human subject.** Name who did it: "I deleted the cache", not "the cache was deleted" or "the fix emerged".

## Openings (before `<!-- more -->`)

1 to 4 short paragraphs, then the cut. Open on a concrete scene or fact: who did what, when, with what result ("Thorsten Ball shared a Slack message about ownership."). State the thesis plainly in the last line of the hook.

Never open with empty warm-up lines ("In today's fast-paced world", "Have you ever wondered", "Here's the thing"), a rhetorical question, or a claim set up to be knocked down.

## Closings

End on something the reader can do or check: the next step, the concrete test, the last fact of the story. No recap, no "time will tell", no short saying built to be quoted.

## Blockquotes (`>`)

Use `>` to quote a real source: a book, a person, a message, a prompt. Do not write your own pull-quotes. If a line of yours sounds like a pull-quote, rewrite it as a plain sentence in the paragraph.

## Rhetorical devices

- **State the point directly.** No "not X, it's Y", "X isn't the problem, Y is", or "the easy conclusion is X; that conclusion is wrong". Say Y.
- **Questions only when the reader would ask them** and the answer needs a paragraph. No question answered in the next fragment ("Why? Because...").
- **One concrete analogy at most per section,** reused rather than stacked. No pop-culture references that age fast.
- **Name the actor.** Things do not "emerge", "shift" or "become": a person does something.

## Word choice and formatting

- **Person:** `you` while teaching, `I` when narrating, `we` for a team you were in. Never "people tend to" or "nobody designed this": put the reader in the scene.
- **Contractions:** use them freely (isn't, don't, you'll). Drop them only in a rare reflective essay.
- **Technical terms** are named precisely and explained in plain English in the same sentence.
- **Backticks** for every file, command, flag, and key: `.claude/`, `git status`, `Shift+Tab`.
- **Code snippets** are real and runnable. No `foo`/`bar` unless illustrating syntax. Comment only the non-obvious line. One strong example beats three weak ones.
- **Bold** for inline list labels ("**Security code.** Login flows..."). Not for slogans.
- **Italics** for quoted prompts (_"fix issue #42"_) and coined terms on first use (_vibe-coding_).
- **Link to your own prior posts inline** with root-relative `/blog/slug/` or absolute `https://chemaclass.com/blog/slug/`, with `#anchor` when useful. Link a source for every stat or claim.

## Never do

- No em dashes or en dashes (`.agnostic-ai/rules/no-em-dash.md`). Use a period, comma, colon, or parentheses.
- No adverbs that only add emphasis or softness ("just", "really", "basically", "actually", "simply", "truly", "deeply"). Keep an adverb only when removing it changes the fact ("later", "once", "twice").
- No hedging ("I think", "perhaps", "it seems", "arguably") and no lazy extremes ("always", "never", "everyone") standing in for a specific case.
- No exclamation marks in your own prose, no emoji, no profanity.
- No corporate or AI hype ("revolutionary", "game-changing", "unlock the power of").
- No unexplained jargon.
- Everything in `references/slop.md`.
