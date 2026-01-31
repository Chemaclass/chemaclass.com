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

When creating or editing blog posts, **always follow the writing style guide** at `.claude/blog-writing-style.md`.

### Key Points
- Direct, authentic tone (not performatively casual)
- Use block quotes for emphasis on key insights
- Reference related posts naturally within content
- Check the style guide for specific do's and don'ts

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
+++
```

## Custom Commands Available

- `/new-blog-post <topic>` - Create a new blog post
- `/build` - Build the site
- `/serve` - Start dev server
- `/check-links` - Verify internal links
- `/list-posts` - List blog posts with metadata
- `/translate <file>` - Translate content EN↔ES

## Before Writing Content

Review these reference files:
1. `.claude/blog-writing-style.md` - Writing style guidelines
2. Example posts in `/content/blog/` for tone reference

## Code Style

- Templates use Tera syntax
- Styles use SCSS in `sass/` directory
- Config uses TOML format
