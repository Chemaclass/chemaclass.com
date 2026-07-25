# Publishing and scheduling posts

How a post goes from a local file to the live site, and what to do when you want
it to go out on a specific day.

## Where posts live

```
content/blog/YYYY-MM-DD-slug.md      English
content/blog/YYYY-MM-DD-slug.es.md   Spanish, colocated
```

Readings (`content/readings/`) follow the same pattern.

The date prefix is not decoration. Zola reads it as the page date and strips it
from the URL, so `2026-07-25-my-post.md` is published as `/blog/my-post/` and
dated 25 July 2026. No post in this repo sets `date` in its front matter, and
none needs to: renaming the file is how you move a publication date.

```toml
+++
title = "The post title"
description = "One or two sentences for search results and social cards."
draft = true
[taxonomies]
tags = [ "testing", "tdd" ]
[extra]
subtitle = "The subtitle"
static_thumbnail = "/images/blog/YYYY-MM-DD/cover.webp"
+++
```

The full front matter template, with the optional series and related-content
fields, lives in `.claude/templates/blog-post.md`.

Anything else you drop in `content/` becomes a page too. A `content/README.md`
does not stay behind the scenes: it builds as `/readme/` and lands in the sitemap
and the search index. Notes for contributors belong in `docs/`, which Zola never
reads.

## Drafts

```toml
draft = true
```

Zola skips a draft entirely: no page, no sitemap entry, no search index entry,
no feed item. Nothing about it reaches the deployed site.

To see drafts locally, opt in explicitly:

```bash
zola serve --drafts    # dev server
zola build --drafts    # one-off build
```

Every post starts as a draft. Flipping `draft = false` is the act of publishing.

## Scheduling

Zola has no scheduler, and neither does the deploy pipeline. Two things follow
from that:

1. A future date does not hold a post back. Once `draft = false`, the next
   deploy publishes it, and it sorts to the top of the list carrying a date that
   has not happened yet. Renaming a file to a future date changes the label, not
   the visibility.
2. Nothing publishes itself. `.github/workflows/deploy.yml` runs on push to
   `main` and on manual dispatch, so a build only happens when someone triggers
   one.

### Recommended: draft until release day

Name the file with the intended release date and keep `draft = true`. On release
day, flip `draft = false` and push. The deploy takes about a minute, and the post
goes out with the date you planned.

This is one commit on the day, and it keeps a single source of truth: if the
post is not a draft, it is live.

### If you want real date-based publishing

It is possible, but it is more than a front matter flag:

- Add a `schedule:` trigger to `.github/workflows/deploy.yml`, otherwise no
  build ever runs on the release date.
- Filter future-dated posts out of the listings in `templates/`, and out of
  `scripts/enrich-search-index.py`, `scripts/enrich-sitemap.py`,
  `scripts/generate-feed-json.py` and `scripts/generate-llms-txt.py`.

Skipping the second half is the trap: the post disappears from the blog index
but keeps its URL, its sitemap entry and its search hit, so it is published in
every way that matters except being visible.

## Before pushing

```bash
zola build     # or ./build.sh for the full production pipeline
zola check     # verifies internal links
```
