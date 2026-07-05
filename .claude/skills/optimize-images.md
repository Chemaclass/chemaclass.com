---
description: "Optimize images to web-ready webp (downscale + compress) and report before/after"
allowed-tools: Read, Glob, Bash(bash scripts/optimize-image.sh:*), Bash(scripts/optimize-image.sh:*), Bash(wc:*), Bash(webpinfo:*)
argument-hint: "<image-path...> [--slot cover|middle|footer] [--width N] [--quality Q]"
---

# Optimize Images

Convert heavy source images (phone JPGs, PNGs) into web-ready `.webp`: downscale to a sane width and compress. This runs by default whenever images are added to the site, so nothing heavy ever ships.

## Rules

- Optimize with `scripts/optimize-image.sh` (one call per file). It only downscales, never upscales.
- Defaults: width `1600`, quality `80`.
- Blog slot widths (site convention): `cover` and `footer` = `1200`, `middle` = `800`, quality `80`.
- A file that is already `.webp`, within the target width, and under 300 KB is skipped (the script says so). Pass `--force` to re-encode anyway.
- **Always report a before/after table** after optimizing: file/slot, before KB, after KB, % saved, plus a TOTAL row. Never skip this, even for a single file.

## Steps

1. Resolve inputs from `$ARGUMENTS` (paths, optional `--slot`, `--width`, `--quality`). Expand a directory with Glob.
2. Pick the width per file: `--width` if given, else the slot width, else `1600`.
3. Run `bash scripts/optimize-image.sh <src> [dest] --width N --quality 80` for each file.
4. Print the before/after table (values come from the script's output lines).

## Notes

- Requires `cwebp`/`webpinfo` (`brew install webp`).
- Blog images live at `static/images/blog/YYYY-MM-DD/{cover,middle,footer}.webp`. Keep source originals out of the repo (e.g. under gitignored `local/imgs/`).

$ARGUMENTS
