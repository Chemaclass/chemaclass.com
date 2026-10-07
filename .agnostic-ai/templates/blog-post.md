+++
title = "The Title"
description = "The Description..."
draft = true
# updated = 2026-06-02   # optional Zola field, sets og:article:modified_time,
#                        # atom <updated> and schema.org dateModified.
#                        # Spelled exactly `updated`; `updated_at` is ignored with no warning.
# aliases = ["/old-path/"]  # optional, for renamed posts
[taxonomies]
tags = [ "tag1", "tag2" ]
[extra]
subtitle = "The Subtitle"
static_thumbnail = "/images/blog/YYYY-MM-DD/cover.webp"
# series = "ai"        # optional; key must exist in config.toml [extra.series]
# series_order = 1
# reading_time = 5     # only when deep_dive blocks hide extra content
# pin = true           # optional; moves the post to the top of /blog/.
#                      # Only `true` does anything: `pin = false` is the same as omitting it.
related_posts = [
  "blog/YYYY-MM-DD-slug.md",
]
related_readings = [
  "readings/YYYY-MM-DD-slug.md",
]
+++

<!--
Field notes (see also .agnostic-ai/skills/writing-style/references/blog-posts.md):

- There is no `date` field. Zola takes the date from the `YYYY-MM-DD-` filename
  prefix, and every script in scripts/ that needs a date uses that prefix when it finds no other date.
- `related_posts` / `related_readings` paths are relative to `content/`, include
  the `.md` extension, and always point at the ENGLISH file, in both the EN and
  the ES version of a post. Same convention as `start_here_posts` in config.toml.
- `static_thumbnail` is either an absolute site path ("/images/...") or a full
  external URL; templates check `^http[s]?://` to tell them apart. Templates
  also read a separate `extra.thumbnail` (a path relative to the page, for files
  in the same folder), but no content file uses it.
-->

Intro

<!-- more -->

## Header

Content
