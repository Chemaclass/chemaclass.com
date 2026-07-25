#!/usr/bin/env python3
"""Subset Font Awesome down to the icons this site actually uses.

The upstream release ships every icon: 100 KB of CSS and 297 KB of woff2 to draw
the handful of glyphs in the templates. This reads the pristine files in
tools/fontawesome/, finds every `fa-*` class used across the site, and writes a
subset back into static/, keeping the served paths and class names identical.

The generated files are committed, so the deploy stays dependency free. Run this
after adding or removing an icon:

    pip install fonttools brotli
    python3 scripts/subset-fontawesome.py

It fails loudly on an `fa-` class that no longer exists upstream, which is
usually a typo in a template.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Iterable

try:
    from fontTools import subset
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit("fonttools is missing. Install it with: pip install fonttools brotli")

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "tools" / "fontawesome"
CSS_OUT = ROOT / "static" / "css" / "fontawesome.min.css"
FONT_OUT = ROOT / "static" / "fonts" / "fontawesome"
# What ended up in the subset, so scripts/check-icons.py can verify the built site
# against the glyphs that are really there, without needing fonttools in CI.
MANIFEST = SOURCE / "subset-manifest.json"

# Files that can reference an icon class.
SCAN_GLOBS = ("templates/**/*.html", "content/**/*.md", "static/**/*.js", "config.toml")

# `.fa-house:before{content:"\f015"}`, sometimes with several aliases sharing one
# glyph: `.fa-js-square:before,.fa-square-js:before{content:"\f3b9"}`.
ICON_RULE = re.compile(r'((?:\.fa-[a-z0-9-]+:before,?)+)\{content:"([^"]+)"\}')
ICON_NAME = re.compile(r"\.fa-([a-z0-9-]+):before")
USED_CLASS = re.compile(r"fa-([a-z0-9-]+)")

# Upstream lists a .ttf after each .woff2 in `src:`. We only ever subset the
# woff2 files, so the .ttf URLs point at files that are not in static/fonts/.
# Every browser that reaches this CSS supports woff2, so the entry was never a
# working fallback, just a 404 waiting to be requested.
TTF_FALLBACK = re.compile(r",url\([^)]+\.ttf\) format\(\"truetype\"\)")


def parse_icons(css: str) -> dict[str, int]:
    """Map every icon name upstream knows to its codepoint."""
    icons: dict[str, int] = {}
    for selector, content in ICON_RULE.findall(css):
        # Ligatures like "\f0d0\f0d1" are not icons we can subset by codepoint.
        codepoints = [int(cp, 16) for cp in content.split("\\") if cp]
        if len(codepoints) != 1:
            continue
        for name in ICON_NAME.findall(selector):
            icons[name] = codepoints[0]
    return icons


def scan_used(icons: dict[str, int]) -> tuple[set[str], set[str]]:
    """Icon names referenced anywhere in the site, plus anything unrecognised."""
    used: set[str] = set()
    unknown: set[str] = set()
    for pattern in SCAN_GLOBS:
        for path in ROOT.glob(pattern):
            text = path.read_text(encoding="utf-8", errors="ignore")
            for name in USED_CLASS.findall(text):
                if name in icons:
                    used.add(name)
                elif f"fa-{name}:before" in text:
                    unknown.add(name)
    return used, unknown


def subset_font(src: Path, dest: Path, codepoints: Iterable[int]) -> None:
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = []  # icon fonts need no shaping
    options.notdef_outline = False
    options.drop_tables += ["GSUB", "GPOS"]
    font = subset.load_font(str(src), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)
    subset.save_font(font, str(dest), options)
    font.close()


def shrink_css(css: str, keep: set[str]) -> str:
    """Drop the content rule of every icon nobody uses, keep the rest verbatim."""

    def replace(match: "re.Match[str]") -> str:
        names = set(ICON_NAME.findall(match.group(1)))
        return match.group(0) if names & keep else ""

    return TTF_FALLBACK.sub("", ICON_RULE.sub(replace, css))


def kb(n: float) -> str:
    return f"{n / 1024:.1f} KB"


def main() -> None:
    source_css = SOURCE / "fontawesome.min.css"
    if not source_css.is_file():
        sys.exit(f"missing pristine source: {source_css}")

    css = source_css.read_text(encoding="utf-8")
    icons = parse_icons(css)
    used, unknown = scan_used(icons)

    if unknown:
        sys.exit(
            "unknown icon classes (typo, or dropped upstream): "
            + ", ".join(sorted(unknown))
        )
    if not used:
        sys.exit("found no icon classes at all, refusing to write an empty subset")

    codepoints = {icons[name] for name in used}
    FONT_OUT.mkdir(parents=True, exist_ok=True)
    CSS_OUT.parent.mkdir(parents=True, exist_ok=True)

    print(f"{len(used)} icons used out of {len(icons)} available\n")
    total_before = total_after = 0
    shipped: set[int] = set()

    for src in sorted(SOURCE.glob("*.woff2")):
        dest = FONT_OUT / src.name
        with TTFont(str(src)) as font:
            available = set(font.getBestCmap())
        wanted = codepoints & available
        subset_font(src, dest, wanted)
        # Read the glyphs back out of what was written, not out of what was asked
        # for, so the manifest describes the file the site actually serves.
        with TTFont(str(dest)) as font:
            shipped |= set(font.getBestCmap())
        before, after = src.stat().st_size, dest.stat().st_size
        total_before += before
        total_after += after
        print(f"  {src.name:28} {len(wanted):>3} glyphs  {kb(before):>9} -> {kb(after):>8}")

    unshipped = sorted(name for name in used if icons[name] not in shipped)
    if unshipped:
        sys.exit(
            "these icons are used but no subset font carries their glyph: "
            + ", ".join(unshipped)
        )

    MANIFEST.write_text(
        json.dumps({name: f"{icons[name]:x}" for name in sorted(used)}, indent=2) + "\n",
        encoding="utf-8",
    )

    CSS_OUT.write_text(shrink_css(css, used), encoding="utf-8")
    before, after = source_css.stat().st_size, CSS_OUT.stat().st_size
    total_before += before
    total_after += after
    print(f"  {'fontawesome.min.css':28} {'':>10}  {kb(before):>9} -> {kb(after):>8}")
    print(f"\n  total {kb(total_before)} -> {kb(total_after)} ({kb(total_before - total_after)} saved)")


if __name__ == "__main__":
    main()
