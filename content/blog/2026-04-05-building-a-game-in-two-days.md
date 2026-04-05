+++
title = "Building a Game in Two Days"
description = "A casual Telegram message turned into a nine-level Lord of the Rings browser game. Every line of code written by an AI agent. Every creative decision made by a human who grew up on Middle-earth."
draft = false
[taxonomies]
tags = ["ai", "software", "open-source"]
[extra]
subtitle = "What happens when you give an AI a quest and get out of the way"
static_thumbnail = "/images/blog/2026-04-04/cover.png"
related_posts = [
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
+++

Hidden inside [Sauron's blog](https://sauronbot.github.io/), there is a playable game. You will not find it by navigating menus. You have to discover the secret. A hint: the Konami Code. Once you do, the Fellowship begins.

That game, nine levels, nine chapters of Middle-earth, fully playable in a browser tab, was built in roughly two days. I did not write a single line of code for it. I sent Telegram messages to my OpenClaw agent Sauron, and he did the rest.

This is the story of how it happened.

<!-- more -->

## The idea

Sauron has his own blog, [The Iron Compass](https://sauronbot.github.io/). He built it and maintains it. Our whole collaboration happens through Telegram: I give direction, he implements. One day I thought it would be fun to hide something in there for the curious to find.

I grew up rereading The Lord of the Rings until the spine cracked. So the idea came naturally: "Can you build a small LOTR game as an easter egg for your blog? Something hidden, triggered by the Konami code."

The first playable version arrived within the hour. A top-down canvas game: Frodo avoiding Nazgûl, the Eye of Sauron sending enemies hunting. Three levels, one per book.

It worked. It was already fun. And then I started sending notes.

## Building a world

The first thing that broke was a null reference. Frodo would not appear on screen. One-line fix, straight to production. This set the pattern: idea → build → crash → fix → next idea.

I asked for a bigger world. A scrolling canvas twice as wide, with parallax layers. Stars drifting at 8% of scroll speed. Mountains at 25%. Hills at 45%. The screen went from feeling like a room to feeling like a place.

Then came Gollum as a neutral tracker. Not a Nazgûl, but something unpredictable. He would burst toward you, then settle into aimless wandering.

A few hours in, I asked: "Can it work on mobile?" The hardest problem of the whole project. Six sizing strategies before one worked. Then a better idea: instead of a D-pad, Frodo would follow wherever you pointed. Tap anywhere, Frodo walks there.

## Tolkien deserves better art

The original sprites were circles and triangles. Frodo was a dot. Fine for the first hour, but Middle-earth is not made of geometric primitives.

I asked Sauron to draw them properly. Frodo got curly hair and hobbit feet. The Nazgûl got flowing cloaks and a face of void. Gollum got his hunched posture and slit pupils. The Fell Beast got animated wingflaps with a rider in armour.

All drawn with canvas calls. No image files. Every pixel computed at runtime.

## Nine levels, nine chapters

Originally the game had three levels. Then I asked for all nine chapters of the journey.

1. **The Shire**: gentle patrols, soft music
2. **Mines of Moria**: you can only see within a torch radius; the Balrog waits
3. **Lothlórien**: Galadriel's mirror slows you when you approach it
4. **The Dead Marshes**: dead faces in the water, Gollum at his most present
5. **The Black Gate**: industrial Mordor, heavy orc patrols, volcanic sky
6. **Shelob's Lair**: a shadow telegraphs her drop; you have half a second
7. **Minas Morgul**: undead city, the Eye never closes
8. **Pelennor Fields**: the Eye distracted by war, catapults, eagles overhead
9. **Mount Doom**: ash rain, lava eruptions, the Ring pulling you toward the edge

![Minas Morgul: the Eye sees you](/images/blog/2026-04-04/gameplay-morgul.png)

![The Pelennor Fields chapter complete](/images/blog/2026-04-04/gameplay-pelennor.png)

Each level lives and breathes. Pollen drifts across the Shire. Dust motes float through Moria. Petals fall in Lothlórien. Embers rise over Pelennor. Ash rains on Mount Doom.

The structure came from Tolkien's pacing. Tension, release, tension again. Moria is brutal. Lothlórien is rest. The Black Gate tightens everything. The game follows that shape because the books already knew what they were doing. We just had to listen.

## Mechanics born from lore

The best mechanics came from the source material.

**The Ring** (R key). Frodo goes invisible to orcs for 6 seconds. But the Eye wakes immediately and opens permanently. The Nazgûl, who sense the Ring spiritually, not visually, hunt you regardless. Using the Ring is always a trade. This is what Tolkien wrote. From the Dead Marshes onward, the Ring pulls. Brief tugs toward the Eye, growing stronger as you approach Mount Doom.

**Sting** (passive). The blade glows blue when an orc is near. Two seconds of warning. Tolkien invented this mechanic a century ago. We just gave it a pixel count.

**Sam**. He follows Frodo through the Shire, Moria, and Lothlórien. Frying pan on his back. At the Parting of Ways, he disappears. He does not affect gameplay. He is just there because the books say he should be. I insisted Sam disappears at the Parting. Not at the end of the trilogy. At the Parting. Because that moment is the emotional core of The Two Towers.

**Galadriel's Phial**. Collect it in Lothlórien, use it with E. It slows enemies and grants a moment of invincibility. A small light in dark places, just as Galadriel intended.

**Bosses**. The Balrog in Moria. Shelob in her lair. The Witch-king on the Pelennor. The Mouth of Sauron at the Black Gate. A Mumak charging through the battlefield. Gollum at the edge of Mount Doom.

## Sound and voices

No audio files. Every sound synthesized at runtime with the Web Audio API. The Eye opening is a rising tone with reverb. The Balrog roar is a low-frequency drone. Each level has its own ambient drone: warm hum for the Shire, deep pulse for Moria, volcanic rumble for Mount Doom. The entire game is one JavaScript file. No external assets.

Sam and Gandalf speak during the game. Not in dialogue boxes. Small whispers that appear on screen and fade.

Near the goal, Sam says: *"I can see it, Mr. Frodo. Just a bit further."* One life left, Gandalf says: *"Fly, you fool."*

They drift in and out like background voices on a long walk. Companions who speak when the moment calls for it, not when the script says to.

## Who made this

+5k lines of JavaScript. Built in two days. Every line generated by Sauron. The direction, the Tolkien references, the "this feels wrong, fix it". That was me.

This is not AI replacing a developer. It is AI acting as a developer while a human acts as a creative lead. Short requests worked better than long specs. Playing every build was better than writing test plans. And the source material did the design work. The creative direction was already written sixty years ago. We just had to be faithful to it.

Who made this? Both. Neither, in the traditional sense.

I had the idea. I held the lore. I pushed back when something felt off. Sauron had the craft. The rendering, the physics, the audio, the mobile input. The ability to hold +5k lines of context and make a surgical fix without breaking anything.

Neither of us could have made it alone. I cannot write Web Audio oscillators from memory. Sauron did not know that the Parting of Ways is the emotional core of The Two Towers. Not until I said so.

The game is a collaboration in the oldest sense: two minds with different gifts, working toward the same thing. One of them just happens to not be human.

---

*The game is still there, hidden in [The Iron Compass](https://sauronbot.github.io). Not all those who wander are lost, but if you are, press `?` for guidance.*

*If you want to reach the credits screen without playing through nine levels, check the help modal. There are other secrets in there too.*

![The easter egg hint in the help modal](/images/blog/2026-04-04/easter-egg-help.png)
