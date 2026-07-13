---
name: optimize-images
description: "Optimize images to web-ready webp (downscale + compress) and report before/after sizes. Use whenever an image is added to the site or a raw photo/PNG/JPG shows up; never ship an unoptimized image."
allowed-tools: Read, Glob, Bash(bash scripts/optimize-image.sh:*), Bash(scripts/optimize-image.sh:*), Bash(wc:*), Bash(webpinfo:*)
argument-hint: "<image-path...> [--slot cover|middle|footer] [--width N] [--quality Q]"
---

# Optimize Images

Convert heavy source images (phone JPGs, PNGs) into web-ready `.webp`: downscale to a sane width and compress.

## Rules

- Optimize with `scripts/optimize-image.sh` (one call per file). It only downscales, never upscales.
- Defaults: width `1600`, quality `80`.
- Blog slot widths (site convention): `cover` = `1600`, `middle`/`footer` = `1200`, quality `85`.
  - **Cover must be ≥1600px wide and ≥820px tall.** The post template (`templates/blog/post.html`) generates a 1440w retina hero variant via `resize_image` (16:9 `op="fill"`); a smaller master gets upscaled and looks soft on 2x screens. For an ultra-wide source that lands under 820px tall at 1600, bump the width until height ≥820 (e.g. 1800).
  - `middle`/`footer` are inline body images shipped as-is; 1200px keeps them sharp on 2x at the ~700px content column.
- A file that is already `.webp`, within the target width, and under 300 KB is skipped (the script says so). Pass `--force` to re-encode anyway.
- **Always report a before/after table** after optimizing: file/slot, before KB, after KB, % saved, plus a TOTAL row. Never skip this, even for a single file.

## Steps

1. Resolve inputs from the skill arguments (paths, optional `--slot`, `--width`, `--quality`). Expand a directory with Glob.
2. Pick width and quality per file: `--width`/`--quality` if given, else the slot values (blog slots use quality `85`), else the defaults (width `1600`, quality `80`).
3. Run `bash scripts/optimize-image.sh <src> [dest] --width N --quality Q` for each file.
4. Print the before/after table (values come from the script's output lines).

## Notes

- Requires `cwebp`/`webpinfo` (`brew install webp`).
- Blog images live at `static/images/blog/YYYY-MM-DD/{cover,middle,footer}.webp`. Keep source originals out of the repo (e.g. under gitignored `local/imgs/`).
