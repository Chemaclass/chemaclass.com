#!/usr/bin/env python3
"""Enrich sitemap.xml with <lastmod> dates from git history and hreflang links.

Zola writes a flat list of every URL in both languages with nothing tying the
English and Spanish versions of a page together. The HTML head carries the
hreflang pairs, but the sitemap is the form Google prefers for them, so the
same pairing is written here from the URLs the sitemap already lists.
"""
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


XHTML_NS = "http://www.w3.org/1999/xhtml"


def counterpart(url: str) -> Optional[str]:
    """The same page in the other language, by URL shape: /x/ <-> /es/x/.

    Returns None for a URL that is not on this origin, which is the one case
    where the shape rule says nothing.
    """
    if not url.startswith(BASE_URL):
        return None
    path = url[len(BASE_URL):]
    if path.startswith("/es/") or path == "/es":
        return BASE_URL + (path[3:] or "/")
    return f"{BASE_URL}/es{path}"


def hreflang_links(url: str, known: set) -> str:
    """The <xhtml:link> block pairing a URL with its translation.

    Empty when the page exists in one language only: an alternate pointing at a
    URL that is not in the sitemap is an alternate pointing at a 404. Google
    wants every version of a page listed on every version, itself included, so
    both links are emitted on both sides.
    """
    other = counterpart(url)
    if other is None or other not in known:
        return ""

    is_es = url.startswith(f"{BASE_URL}/es/") or url == f"{BASE_URL}/es"
    en_url, es_url = (other, url) if is_es else (url, other)

    return (
        f'\n    <xhtml:link rel="alternate" hreflang="en" href="{en_url}"/>'
        f'\n    <xhtml:link rel="alternate" hreflang="es" href="{es_url}"/>'
        f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="{en_url}"/>'
    )


def enrich_sitemap(sitemap_path: str) -> int:
    """Add <lastmod> and hreflang alternates to sitemap entries missing them."""
    with open(sitemap_path) as f:
        content = f.read()

    if "<sitemapindex" in content:
        return 0

    count = 0
    known_urls = set(re.findall(r"<loc>(.*?)</loc>", content))

    def enrich_url(match: "re.Match[str]") -> str:
        nonlocal count
        block = match.group(0)

        loc = re.search(r"<loc>(.*?)</loc>", block)
        if not loc:
            return block

        addition = ""
        if "<lastmod>" not in block:
            content_file = find_content_file(loc.group(1))
            git_date = get_git_date(content_file) if content_file else None
            if git_date:
                addition += f"\n    <lastmod>{git_date}</lastmod>"
                count += 1

        if "xhtml:link" not in block:
            addition += hreflang_links(loc.group(1), known_urls)

        if not addition:
            return block

        return block.replace("</loc>", f"</loc>{addition}")

    enriched = re.sub(r"<url>.*?</url>", enrich_url, content, flags=re.DOTALL)

    # The alternates use the xhtml prefix, which has to be declared on the root
    # element or the file is not well-formed XML and Search Console rejects it
    # whole, not just the entries carrying the links.
    if "xhtml:link" in enriched and 'xmlns:xhtml' not in enriched:
        enriched = enriched.replace("<urlset ", f'<urlset xmlns:xhtml="{XHTML_NS}" ', 1)

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
