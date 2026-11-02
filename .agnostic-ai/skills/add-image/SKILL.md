---
name: add-image
description: "Use to add a cover, middle or footer image to a blog post. Arguments: <image-path> [post-date] [cover|middle|footer]"
x-claude:
  allowed-tools: Read, Write, Edit, Glob, Bash(bash scripts/optimize-image.sh:*), Bash(scripts/optimize-image.sh:*), Bash(rm *), Bash(mkdir *), Bash(zola build)
argument-hint: "<image-path> [post-date] [cover|middle|footer]"
---

1. Parse `<image-path> [post-slug-or-date] [placement]`. `image-path` is required (absolute or repo-relative). Without a post, use the newest blog post. Without a placement (`cover`, `middle`, `footer`), ask.
2. Find the post in `content/blog/` by date prefix or slug. Take `YYYY-MM-DD` from the filename.
3. Always optimize; never copy a raw photo into the site:
   - `mkdir -p static/images/blog/YYYY-MM-DD/`
   - `bash scripts/optimize-image.sh <source> static/images/blog/YYYY-MM-DD/{placement}.webp --width <W> --quality 85`
   - Width: `cover` 1600, `middle` and `footer` 1200. The cover width is a minimum, and the cover must be at least 820px tall (the template derives a 1440px hero for retina screens). Use a larger width for a very wide source.
   - Report the before and after sizes the script prints. Keep the source file.
4. Update the EN and ES posts (all images `.webp`; translate alt text per language). Replace the shared placeholder path `/images/blog/placeholder.webp` with the real path for the slot:
   - `cover`: set `static_thumbnail = "/images/blog/YYYY-MM-DD/cover.webp"` in `[extra]`. Do not add a `![cover]` line; the template shows it.
   - `middle`: insert `![alt](/images/blog/YYYY-MM-DD/middle.webp)` near the middle of the body, or ask where.
   - `footer`: insert `![alt](/images/blog/YYYY-MM-DD/footer.webp)` as the last content line.
5. Run `zola build` to check the path.
