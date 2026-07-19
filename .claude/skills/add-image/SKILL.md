---
name: add-image
description: "Add an image to a blog post (cover, middle, or footer). Arguments: <image-path> [post-date] [cover|middle|footer]"
allowed-tools: Read, Write, Edit, Glob, Bash(bash scripts/optimize-image.sh:*), Bash(scripts/optimize-image.sh:*), Bash(rm *), Bash(mkdir *), Bash(zola build)
argument-hint: "<image-path> [post-date] [cover|middle|footer]"
---

# Add Image to Blog Post

## Instructions

1. Parse the arguments: `<image-path> [post-slug-or-date] [placement]`
   - `image-path` (required): path to the source image file (absolute or relative to project root)
   - `post-slug-or-date` (optional): date prefix like `2026-02-07` or full slug. If omitted, use the most recent blog post by date.
   - `placement` (optional): `cover`, `middle`, or `footer`. If omitted, ask the user.

2. Resolve the target blog post:
   - Find the matching file in `content/blog/` by date prefix or slug
   - Extract the date (YYYY-MM-DD) from the filename

3. Optimize and place the image (always optimize by default, never copy a raw phone photo in):
   - Create `static/images/blog/YYYY-MM-DD/` if it doesn't exist
   - Run `bash scripts/optimize-image.sh <source> static/images/blog/YYYY-MM-DD/{placement}.webp --width <W> --quality 85`
     - Width by slot: `cover` = `1600` (min, ≥820px tall: the template builds a 1440w retina hero from it; bump width for ultra-wide sources), `middle`/`footer` = `1200`
   - **Report the before/after size** the script prints (before KB, after KB, % saved)
   - Remove the source file after a successful optimize

4. Update the blog post based on placement (all images are `.webp`). If the slot currently points at the shared placeholder `/images/blog/placeholder.webp`, replace that reference with the real per-date path:
   - **cover**: set `static_thumbnail = "/images/blog/YYYY-MM-DD/cover.webp"` in front matter `[extra]` (newer posts do not add a body `![cover]` line; the template renders the hero from `static_thumbnail`)
   - **middle**: insert `![descriptive alt](/images/blog/YYYY-MM-DD/middle.webp)` near the middle of the body (or ask user where to place it)
   - **footer**: insert `![descriptive alt](/images/blog/YYYY-MM-DD/footer.webp)` as the last content line

5. Verify the image path resolves correctly with `zola build`

## Arguments
The invocation arguments (`<image-path> [post-date] [cover|middle|footer]`) are provided with this skill call.
