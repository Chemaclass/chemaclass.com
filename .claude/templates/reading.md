+++
title = "The Title"
description = "The Description..."
authors = [ "Author Name" ]
draft = true
[taxonomies]
tags = [ "tag1", "tag2" ]
[extra]
subtitle = "The Subtitle"
pages = "0"
author = "Author Name"
static_thumbnail = "https://m.media-amazon.com/images/..."
expand_preview = true
# pin = true           # optional; floats the reading to the top of /readings/.
#                      # Only `true` does anything.
related_readings = [
  "readings/YYYY-MM-DD-slug.md",
]
# related_posts = [    # optional; used by roughly a quarter of the readings
#   "blog/YYYY-MM-DD-slug.md",
# ]
+++

<!--
Field notes (see also .claude/skills/writing-style/references/readings.md):

- `title`, `description` and `authors` are top-level; everything else above
  belongs under `[extra]`. Keeping `subtitle` or `description` on the wrong side
  of the `[extra]` line makes it invisible: the templates only read
  `extra.subtitle`, and the meta description only reads top-level `description`.
- `pages` is a STRING ("240"), not a number, even though readings/post.html
  interpolates it into schema.org `numberOfPages`.
- `author` (singular, under `[extra]`) is what every template renders. The
  top-level `authors` array is the Zola-native field and is not rendered.
- `expand_preview` is currently INERT: no template, script, or JS reads it.
  It is kept for consistency with the ~120 existing readings that set it.
  Either wire it up or drop it from all of them, but do not assume it works.
- `related_*` paths are relative to `content/`, keep the `.md` extension, and
  point at the ENGLISH file even inside a `.es.md` reading.
-->

Intro

<!-- more -->

## Header

Content
