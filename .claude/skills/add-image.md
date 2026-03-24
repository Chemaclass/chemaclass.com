# Add Image to Blog Post

Move an image to the correct location and insert it into a blog post.

## Instructions

1. Parse the arguments: `<image-path> [post-slug-or-date] [placement]`
   - `image-path` (required): path to the source image file (absolute or relative to project root)
   - `post-slug-or-date` (optional): date prefix like `2026-02-07` or full slug. If omitted, use the most recent blog post by date.
   - `placement` (optional): `cover`, `middle`, or `footer`. If omitted, ask the user.

2. Resolve the target blog post:
   - Find the matching file in `content/blog/` by date prefix or slug
   - Extract the date (YYYY-MM-DD) from the filename

3. Move the image:
   - Create `static/images/blog/YYYY-MM-DD/` if it doesn't exist
   - Copy the source image to `static/images/blog/YYYY-MM-DD/{placement}.jpg`
     - If the source isn't `.jpg`, keep the original extension
   - Remove the source file after successful copy

4. Update the blog post based on placement:
   - **cover**: Set `static_thumbnail = "/images/blog/YYYY-MM-DD/cover.{ext}"` in front matter `[extra]`
   - **middle**: Insert `![blog-middle](/images/blog/YYYY-MM-DD/middle.{ext})` after the `<!-- more -->` marker (or ask user where to place it)
   - **footer**: Insert `![blog-footer](/images/blog/YYYY-MM-DD/footer.{ext})` just before the `## Related` section

5. Verify the image path resolves correctly with `zola build`

## Image naming convention

- `cover.jpg` — hero/thumbnail at the top (referenced in front matter)
- `middle.jpg` — inline image within the content body
- `footer.jpg` — image before the Related section at the end

## Arguments
$ARGUMENTS
