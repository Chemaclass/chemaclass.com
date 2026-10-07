---
name: add-image
description: "Add an image to a blog post (cover, middle, or footer). Arguments: <image-path> [post-date] [cover|middle|footer]"
x-claude:
  allowed-tools: Read, Write, Edit, Glob, Bash(bash scripts/optimize-image.sh:*), Bash(scripts/optimize-image.sh:*), Bash(rm *), Bash(mkdir *), Bash(zola build)
argument-hint: "<image-path> [post-date] [cover|middle|footer]"
---

# Add Image to Blog Post

## Instructions

1. Parse the arguments: `<image-path> [post-slug-or-date] [placement]`
   - `image-path` (required): path to the source image file (absolute or relative to project root)
   - `post-slug-or-date` (optional): date prefix like `2026-02-07` or full slug. If omitted, use the most recent blog post by date.
   - `placement` (optional): `cover`, `middle`, or `footer`. If omitted, ask the user.

2. Find the target blog post:
   - Find the matching file in `content/blog/` by date prefix or slug
   - Take the date (YYYY-MM-DD) from the filename

3. Optimize and place the image. Always optimize it. Never copy a raw phone photo into the site:
   - Create `static/images/blog/YYYY-MM-DD/` if it doesn't exist
   - Run `bash scripts/optimize-image.sh <source> static/images/blog/YYYY-MM-DD/{placement}.webp --width <W> --quality 85`
     - Width by slot: `cover` = `1600`, `middle`/`footer` = `1200`. The cover width is a minimum, and the cover must be at least 820px tall: the template makes a 1440px-wide top image (hero) for high-density (retina) screens from it. For a very wide source image, use a larger width.
   - **Report the before/after size** the script prints (before KB, after KB, % saved)
   - Delete the source file once the optimization succeeds

4. Update the blog post for the placement (all images are `.webp`). If the slot still points at the shared placeholder `/images/blog/placeholder.webp`, replace that path with the real path for the post's date:
   - **cover**: set `static_thumbnail = "/images/blog/YYYY-MM-DD/cover.webp"` in front matter `[extra]`. Newer posts do not add a `![cover]` line in the body: the template shows the top image from `static_thumbnail`.
   - **middle**: insert `![descriptive alt](/images/blog/YYYY-MM-DD/middle.webp)` near the middle of the body (or ask the user where to place it)
   - **footer**: insert `![descriptive alt](/images/blog/YYYY-MM-DD/footer.webp)` as the last content line

5. Run `zola build` to check that the image path works

## Arguments
The invocation arguments (`<image-path> [post-date] [cover|middle|footer]`) are provided with this skill call.
