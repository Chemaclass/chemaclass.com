---
name: optimize-images
description: "Convert images to small webp files for the web (resize down and compress) and report sizes before and after. Use whenever an image is added to the site or a raw photo, PNG or JPG shows up. Never publish an unoptimized image."
x-claude:
  allowed-tools: Read, Glob, Bash(bash scripts/optimize-image.sh:*), Bash(scripts/optimize-image.sh:*), Bash(wc:*), Bash(webpinfo:*)
argument-hint: "<image-path...> [--slot cover|middle|footer] [--width N] [--quality Q]"
---

# Optimize Images

Convert large source images (phone JPGs, PNGs) into `.webp` files ready for the web: reduce them to a reasonable width and compress them.

## Rules

- Optimize with `scripts/optimize-image.sh` (one call per file). It only makes images smaller, never larger.
- Defaults: width `1600`, quality `80`.
- Blog image widths per slot (site rule): `cover` = `1600`, `middle`/`footer` = `1200`, quality `85`.
  - **Cover must be ≥1600px wide and ≥820px tall.** The post template (`templates/blog/post.html`) makes a 1440px-wide copy of the top image (hero) for high-density (retina) screens with `resize_image` (16:9 `op="fill"`). If the original is smaller, it gets enlarged and looks blurry on 2x screens. A very wide source can end up under 820px tall at width 1600. In that case, raise the width until the height is ≥820 (e.g. 1800).
  - `middle`/`footer` are images inside the post body, used as they are. At 1200px they stay sharp on 2x screens in the ~700px-wide text column.
- A file that is already `.webp`, within the target width, and under 300 KB is skipped (the script says so). Pass `--force` to convert it again anyway.
- **Always report a before/after table** after optimizing: file/slot, before KB, after KB, % saved, plus a TOTAL row. Never skip this, even for a single file.

## Steps

1. Read the inputs from the skill arguments (paths, optional `--slot`, `--width`, `--quality`). For a directory, list its files with Glob.
2. Pick width and quality per file: `--width`/`--quality` if given, else the slot values (blog slots use quality `85`), else the defaults (width `1600`, quality `80`).
3. Run `bash scripts/optimize-image.sh <src> [dest] --width N --quality Q` for each file.
4. Print the before/after table (values come from the script's output lines).

## Notes

- Requires `cwebp`/`webpinfo` (`brew install webp`).
- Blog images live at `static/images/blog/YYYY-MM-DD/{cover,middle,footer}.webp`. Keep source originals out of the repo (e.g. under gitignored `local/imgs/`).
