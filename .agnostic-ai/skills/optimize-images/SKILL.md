---
name: optimize-images
description: "Use whenever an image is added or a raw photo, PNG or JPG appears, to convert it to small webp and report sizes. Never publish an unoptimized image."
x-claude:
  allowed-tools: Read, Glob, Bash(bash scripts/optimize-image.sh:*), Bash(scripts/optimize-image.sh:*), Bash(wc:*), Bash(webpinfo:*)
argument-hint: "<image-path...> [--slot cover|middle|footer] [--width N] [--quality Q]"
---

Convert source images (phone JPGs, PNGs) into small `.webp` files with `scripts/optimize-image.sh`, one call per file. The script never makes an image larger.

Defaults: width 1600, quality 80. Blog slots: `cover` 1600, `middle` and `footer` 1200, quality 85.

- The cover must be at least 1600px wide and 820px tall. The post template (`templates/blog/post.html`) makes a 1440px 16:9 hero (`resize_image`, `op="fill"`) for retina screens; a smaller source looks blurry. If a very wide source ends under 820px tall, raise the width until the height reaches 820 (for example 1800).
- `middle` and `footer` are used as they are. At 1200px they stay sharp in the ~700px text column.
- A `.webp` already within the target width and under 300 KB is skipped. `--force` converts it anyway.

Steps:

1. Read paths and optional `--slot`, `--width`, `--quality` from the arguments. List a directory with Glob.
2. Per file pick width and quality: explicit flags, else slot values, else defaults.
3. Run `bash scripts/optimize-image.sh <src> [dest] --width N --quality Q`.
4. Always print a before and after table (file or slot, before KB, after KB, % saved, plus a TOTAL row), even for one file.

Needs `cwebp` and `webpinfo` (`brew install webp`). Blog images live at `static/images/blog/YYYY-MM-DD/{cover,middle,footer}.webp`. Keep source originals out of the repo (for example in git-ignored `local/imgs/`).
