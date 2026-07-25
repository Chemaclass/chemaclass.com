+++
title = "The Title"
description = "The Description..."
draft = true
# updated = 2026-06-02   # optional Zola field, feeds og:article:modified_time,
#                        # atom <updated> and schema.org dateModified.
#                        # Spelled exactly `updated`; `updated_at` is silently ignored.
# aliases = ["/old-path/"]  # optional, for renamed posts
[taxonomies]
tags = [ "tag1", "tag2" ]
[extra]
subtitle = "The Subtitle"
static_thumbnail = "/images/blog/YYYY-MM-DD/cover.webp"
# series = "ai"        # optional; key must exist in config.toml [extra.series]
# series_order = 1
# reading_time = 5     # only when deep_dive blocks park overflow content
# pin = true           # optional; floats the post to the top of /blog/.
#                      # Only `true` does anything: `pin = false` is the same as omitting it.
related_posts = [
  "blog/YYYY-MM-DD-slug.md",
]
related_readings = [
  "readings/YYYY-MM-DD-slug.md",
]
+++

<!--
Field notes (see also .claude/skills/writing-style/references/blog-posts.md):

- There is no `date` field. Zola takes the date from the `YYYY-MM-DD-` filename
  prefix, and every generator in scripts/ falls back to the same prefix.
- `related_posts` / `related_readings` paths are relative to `content/`, include
  the `.md` extension, and always point at the ENGLISH file, in both the EN and
  the ES version of a post. Same convention as `start_here_posts` in config.toml.
- `static_thumbnail` is either an absolute site path ("/images/...") or a full
  external URL; templates branch on `^http[s]?://`. Templates also read a
  separate `extra.thumbnail` (page-relative, for colocated assets), but no
  content file uses it.
-->

Intro

<!-- more -->

## Header

Content
