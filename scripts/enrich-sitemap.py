#!/usr/bin/env python3
"""Enrich sitemap.xml with <lastmod> dates from git history."""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path
from typing import List, Optional

from _common import BASE_URL, CONTENT_DIR, PUBLIC_DIR


def get_git_date(filepath: Path) -> Optional[str]:
    """Last commit date (ISO 8601) for a file, or None when it has no commit yet.

    Empty output with a clean exit is the one expected miss: a page that exists in
    the working tree and has never been committed, which has no last-modified date
    to publish. git itself failing is a different thing, and folding it into the
    same None hid "not a git repository" and "git is not installed" behind a
    sitemap that quietly shipped without a single <lastmod>.
    """
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%aI", "--", str(filepath)],
            capture_output=True, text=True, timeout=5,
        )
    except FileNotFoundError:
        sys.exit("git is not on PATH, so no <lastmod> date can be read")
    except subprocess.TimeoutExpired:
        print(f"  git log timed out for {filepath}, no <lastmod>", file=sys.stderr)
        return None
    if result.returncode != 0:
        sys.exit(
            f"git log failed for {filepath} (exit {result.returncode}): "
            f"{result.stderr.strip() or 'no error output'}"
        )
    return result.stdout.strip() or None


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
    # PUBLIC_DIR and CONTENT_DIR are relative and get_git_date shells out to git
    # with a relative path, so this has to run from the repo root. Without the
    # guard the rglob below finds nothing and the script reports "0 entries
    # enriched" and exits 0.
    if not Path(PUBLIC_DIR).is_dir() or not Path(CONTENT_DIR).is_dir():
        raise SystemExit(
            f"{PUBLIC_DIR}/ and {CONTENT_DIR}/ must both exist. "
            "Run `zola build` first, from the repo root."
        )

    sitemaps = sorted(PUBLIC_DIR.rglob("sitemap.xml"))
    if not sitemaps:
        sys.exit(f"no sitemap.xml under {PUBLIC_DIR}: run `zola build` first")

    total = 0
    for sitemap in sitemaps:
        added = enrich_sitemap(str(sitemap))
        total += added
        print(f"  {sitemap}: added {added} <lastmod> entries")
    print(f"  Total: {total} entries enriched")

    # No canary on a zero total here, deliberately. This script is idempotent: it
    # only touches <url> blocks that have no <lastmod> yet, so a second run over an
    # already-enriched sitemap correctly adds nothing. That is indistinguishable
    # from url_to_content_paths breaking, and failing on it would break the build
    # for anyone who ran the script twice. The systematic failures are caught in
    # get_git_date instead, where they can be named precisely.
