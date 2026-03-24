# Project Instructions for chemaclass.com

## Overview

This is a personal website built with [Zola](https://www.getzola.org/) (Rust-based static site generator).

## Project Structure

```
content/
├── blog/           # Blog posts (YYYY-MM-DD-slug.md)
├── readings/       # Book summaries and reading notes
├── talks/          # Conference talks and presentations
├── services/       # Professional services pages
├── books/          # Book-related content
├── music/          # Music-related content
├── _index.md       # Homepage (EN)
├── _index.es.md    # Homepage (ES)
templates/          # Tera templates
sass/               # SCSS stylesheets
static/             # Static assets (images, files)
config.toml         # Zola configuration
```

## Internationalization (i18n)

The site supports English (default) and Spanish:
- English: `content/page.md` or `content/page/index.md`
- Spanish: `content/page.es.md` (colocated)

## Common Commands

- `zola build` - Build the static site to `public/`
- `zola serve` - Start dev server at http://127.0.0.1:1111
- `zola check` - Verify internal links
- `./build.sh` - Production build script

## Blog Writing

### Blog Post Structure

Files: `/content/blog/YYYY-MM-DD-slug.md`

Required elements:
- Front matter with title, description, tags, subtitle
- `<!-- more -->` marker after introduction (for excerpt)
- Clear section headers (limit h2 to 5-7 per document)
- `## Related` section at the end

### Front Matter Template

```toml
+++
title = "The Title"
description = "Clear, compelling description"
draft = false
[taxonomies]
tags = [ "tag1", "tag2" ]
[extra]
subtitle = "A complementary subtitle"
static_thumbnail = "/images/blog/YYYY-MM-DD/cover.jpg"
series = "series-key"       # optional, see Series section below
series_order = 1            # optional, position within the series
+++
```

### Series

Series group related posts with navigation (title, "Part X of Y", prev/next links). When creating a new post, check if it fits an existing series and add `series` + `series_order` to `[extra]` in both EN and ES files.

Defined in `config.toml` under `[extra.series.<key>]`:

| Key | Title | Posts |
|-----|-------|-------|
| `bitcoin` | Bitcoin Series | PGP, Cypherpunks, Programmable Money, Taxes, Fundamentals, How It Works |
| `ai` | AI Series | Speed Not Quality, MCP Context, Team of Agents, Idealism vs Pragmatism |
| `craftsmanship` | Software Craftsmanship Series | Art of Testing, Mock or Not, TDD, TDD vs BDD, London vs Chicago, Test Private Methods |
| `leadership` | Leadership & Teams Series | Tech Lead, Red vs Blue Work, Beauty of Leadership, Great Leadership, Everyone on Board, FSNP |
| `agile` | Agile & XP Series | Extreme Teams, Agile with Non-Agile, Ignoring Scrum, Friday Deploys, What Kills Agility, Ship Show Ask |

To add a new series: add `[extra.series.<key>]` with `title` and `title_es` in `config.toml`.

## Skills Available

- `/new-blog-post <topic>` - Create a new blog post (uses `.claude/templates/blog-post.md`)
- `/build` - Build the site
- `/serve` - Start dev server
- `/check-links` - Verify internal links
- `/list-posts` - List blog posts with metadata
- `/translate <file>` - Translate content EN↔ES
- `/add-image <path> [post-date] [cover|middle|footer]` - Add image to blog post
- `/optimize-ui [target]` - Analyze and improve visual design

## Code Style

- Templates use Tera syntax
- Styles use SCSS in `sass/` directory
- Config uses TOML format
