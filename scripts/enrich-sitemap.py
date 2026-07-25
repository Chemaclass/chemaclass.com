#!/usr/bin/env python3
"""Enrich sitemap.xml with <lastmod> dates from git history."""
from __future__ import annotations

import re
import subprocess
from pathlib import Path
from typing import List, Optional

from _common import BASE_URL, CONTENT_DIR, PUBLIC_DIR


def get_git_date(filepath: Path) -> Optional[str]:
    """Get the last commit date (ISO 8601) for a file."""
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%aI", "--", str(filepath)],
            capture_output=True, text=True, timeout=5,
        )
    except subprocess.TimeoutExpired:
        return None
    if result.returncode == 0 and result.stdout.strip():
        return result.stdout.strip()
    return None


def url_to_content_paths(url: str) -> List[Path]:
    """Map a sitemap URL to candidate content file paths."""
    path = url.replace(BASE_URL, "").strip("/")

    is_es = path.startswith("es/")
    clean = path[3:] if is_es else path
    suffix = ".es.md" if is_es else ".md"

    if not clean:
        return [CONTENT_DIR / f"_index{suffix}"]

    return [
        CONTENT_DIR / f"{clean}_index{suffix}",
        CONTENT_DIR / f"{clean}/index{suffix}",
        CONTENT_DIR / f"{clean}{suffix}",
    ]


def find_content_file(url: str) -> Optional[Path]:
    """Find the content file for a URL."""
    for candidate in url_to_content_paths(url):
        if candidate.exists():
            return candidate
    return None


def enrich_sitemap(sitemap_path: str) -> int:
    """Add <lastmod> to sitemap entries missing it."""
    with open(sitemap_path) as f:
        content = f.read()

    if "<sitemapindex" in content:
        return 0

    count = 0

    def add_lastmod(match: "re.Match[str]") -> str:
        nonlocal count
        block = match.group(0)

        if "<lastmod>" in block:
            return block

        loc = re.search(r"<loc>(.*?)</loc>", block)
        if not loc:
            return block

        content_file = find_content_file(loc.group(1))
        if not content_file:
            return block

        git_date = get_git_date(content_file)
        if not git_date:
            return block

        count += 1
        return block.replace(
            "</loc>",
            f"</loc>\n    <lastmod>{git_date}</lastmod>",
        )

    enriched = re.sub(r"<url>.*?</url>", add_lastmod, content, flags=re.DOTALL)

    with open(sitemap_path, "w") as f:
        f.write(enriched)

    return count


if __name__ == "__main__":
    total = 0
    for sitemap in PUBLIC_DIR.rglob("sitemap.xml"):
        added = enrich_sitemap(str(sitemap))
        total += added
        print(f"  {sitemap}: added {added} <lastmod> entries")
    print(f"  Total: {total} entries enriched")
