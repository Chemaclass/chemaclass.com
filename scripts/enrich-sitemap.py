#!/usr/bin/env python3
"""Enrich sitemap.xml with <lastmod> dates, hreflang links and page images.

Zola writes a flat list of every URL in both languages with nothing tying the
English and Spanish versions of a page together, and no mention of the cover
image a post carries. The HTML head has the hreflang pairs and the og:image,
but the sitemap is the form Google prefers for both, so they are written here
from the same front matter the rest of the build reads.
"""
from __future__ import annotations

import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

from _common import (
    BASE_URL,
    CONTENT_DIR,
    PUBLIC_DIR,
    SECTIONS,
    STATIC_DIR,
    extract_frontmatter,
    get_slug_from_filename,
    is_draft,
    is_excluded,
    iter_section_files,
    read_last_modified,
)

# One `git log` per file, not per lookup: the listing dates below ask for the same
# entry once as its own URL and again for every tag page and index that lists it.
_GIT_DATES: dict = {}

# The same body-edit dates the page schema publishes as dateModified, so the
# sitemap and the page never disagree about when an entry last changed.
_LAST_MODIFIED = read_last_modified()


def newest(dates: List[str]) -> Optional[str]:
    """The latest of a list of ISO 8601 dates, compared as instants.

    Sorting them as plain strings is almost right and wrong twice a year: a commit
    at 23:30+01:00 sorts above one at 00:15+02:00 that landed later in real time.
    """
    if not dates:
        return None
    return max(dates, key=_instant)


def _instant(date: str) -> datetime:
    """Parse an ISO 8601 date as an aware datetime. Python 3.9 rejects a trailing
    Z, and a naive value cannot be compared with git's offset dates at all."""
    parsed = datetime.fromisoformat(date.replace("Z", "+00:00"))
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)


def as_instant(date: str) -> str:
    """A Zola lastmod as a full ISO 8601 instant with an offset, as the sitemap
    format wants whenever a time is given."""
    if len(date) == 10:
        return f"{date}T00:00:00+00:00"
    return _instant(date).isoformat()


def modified_date(filepath: Path) -> Optional[str]:
    """When a content file last changed in substance, or its last commit as a fallback.

    A raw commit date counts front-matter sweeps and punctuation fixes as updates,
    which is the noise generate-last-modified.py exists to filter out.
    """
    try:
        key = str(filepath.relative_to(CONTENT_DIR))
    except ValueError:
        key = ""
    return _LAST_MODIFIED.get(key) or get_git_date(filepath)


def lang_of(filepath: Path) -> str:
    """'es' for a colocated `*.es.md` translation, 'en' for the original."""
    return "es" if filepath.name.endswith(".es.md") else "en"


def get_git_date(filepath: Path) -> Optional[str]:
    """Last commit date (ISO 8601) for a file, or None when it has no commit yet.

    Empty output with a clean exit is the one expected miss: a page that exists in
    the working tree and has never been committed, which has no last-modified date
    to publish. git itself failing is a different thing, and folding it into the
    same None hid "not a git repository" and "git is not installed" behind a
    sitemap that quietly shipped without a single <lastmod>.
    """
    if filepath in _GIT_DATES:
        return _GIT_DATES[filepath]
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
    _GIT_DATES[filepath] = result.stdout.strip() or None
    return _GIT_DATES[filepath]


def is_es_path(path: str) -> bool:
    """Whether a sitemap path is the Spanish side of the site, its root included.

    The Spanish home page is the one path that carries the prefix and nothing
    after it, so it strips to a bare "es" that no startswith("es/") test calls
    Spanish. It resolved to content/es_index.md, matched nothing, and shipped
    without a <lastmod>.
    """
    return path == "es" or path.startswith("es/")


def url_to_content_paths(url: str) -> List[Path]:
    """Map a sitemap URL to candidate content file paths."""
    path = url.replace(BASE_URL, "").strip("/")

    is_es = is_es_path(path)
    clean = path[3:] if is_es else path
    suffix = ".es.md" if is_es else ".md"

    if not clean:
        return [CONTENT_DIR / f"_index{suffix}"]

    return [
        # The separator is not optional: written as f"{clean}_index" this looked for
        # content/blog_index.md, so every section index on the site went out with no
        # <lastmod> while the candidate list looked like it covered them.
        CONTENT_DIR / f"{clean}/_index{suffix}",
        CONTENT_DIR / f"{clean}/index{suffix}",
        CONTENT_DIR / f"{clean}{suffix}",
    ]


def _entry_index() -> dict:
    """Map (section, slug, is_es) to the content file, once per run.

    The path-shaped candidates above cannot find a post: blog and readings files
    carry a YYYY-MM-DD- prefix that the URL does not, so /blog/some-post/ never
    matched content/blog/2024-03-28-some-post.md. Everything those entries were
    meant to get, the git <lastmod> included, was silently skipped for them.
    """
    global _ENTRY_INDEX
    if _ENTRY_INDEX is None:
        _ENTRY_INDEX = {}
        for section in SECTIONS:
            for path in iter_section_files(section, translations=True):
                is_es = ".es.md" in path.name
                _ENTRY_INDEX[(section, get_slug_from_filename(path.name), is_es)] = path
    return _ENTRY_INDEX


_ENTRY_INDEX: Optional[dict] = None


def find_content_file(url: str) -> Optional[Path]:
    """Find the content file for a URL."""
    for candidate in url_to_content_paths(url):
        if candidate.exists():
            return candidate

    path = url.replace(BASE_URL, "").strip("/")
    is_es = path.startswith("es/")
    parts = (path[3:] if is_es else path).split("/")
    if len(parts) == 2:
        return _entry_index().get((parts[0], parts[1], is_es))
    return None


def newest_entry_date(index_file: Path) -> Optional[str]:
    """The newest git date among the entries a section index lists.

    An index file barely changes: content/blog/_index.md holds a title and an
    intro, so its own git date says the intro was reworded, not that the page now
    shows a new post. <lastmod> is read to decide when to come back, so for a
    listing the honest answer is the newest thing on the list.

    Only direct children, matching the index's own language. content/books/ has
    the OEUR chapters a directory below and they belong to /books/oeur/, which
    reaches them through its own _index file.
    """
    lang = lang_of(index_file)
    dates = []
    for path in index_file.parent.glob("*.md"):
        if path.name.startswith("_index") or lang_of(path) != lang or is_draft(path):
            continue
        date = modified_date(path)
        if date:
            dates.append(date)
    return newest(dates)


def _tag_dates() -> dict:
    """Newest git date per (tag, language), plus ("", language) across all tags.

    Tag pages are the one listing with no file behind them: Zola builds them from
    the taxonomy, so find_content_file has nothing to return and 77 of them went
    out with no date at all. What the page shows is its entries, so that is where
    its date comes from.

    Keyed on the tag exactly as authored. Zola slugifies tag names for the URL,
    and every tag on this site is already lowercase and hyphenated so the two
    agree; one that needed slugifying would miss its page, which the count of
    dateless URLs at the end of enrich_sitemap reports.

    Walks all of content/ rather than SECTIONS, because tags are also carried by
    the music entries and the books, which SECTIONS does not include.
    """
    global _TAG_DATES
    if _TAG_DATES is not None:
        return _TAG_DATES

    _TAG_DATES = {}
    for path in sorted(CONTENT_DIR.rglob("*.md")):
        if path.name.startswith("_index") or is_draft(path):
            continue
        tags = extract_frontmatter(path.read_text(encoding="utf-8")).get("tags", [])
        if not tags:
            continue
        date = modified_date(path)
        if not date:
            continue
        lang = lang_of(path)
        for key in [(tag, lang) for tag in tags] + [("", lang)]:
            known = _TAG_DATES.get(key)
            _TAG_DATES[key] = date if known is None else newest([known, date])
    return _TAG_DATES


_TAG_DATES: Optional[dict] = None


def listed_date(url: str, content_file: Optional[Path]) -> Optional[str]:
    """The newest date among the entries this URL lists, or None if it lists none."""
    path = url[len(BASE_URL):].strip("/") if url.startswith(BASE_URL) else ""
    is_es = is_es_path(path)
    lang = "es" if is_es else "en"
    clean = path[3:] if is_es else path

    if not clean:
        # The home page shows the newest posts, not the loose pages beside its
        # _index file (cv, legal, pgp), and its own file has no body to date.
        suffix = ".es.md" if is_es else ".md"
        return newest_entry_date(CONTENT_DIR / "blog" / f"_index{suffix}")

    if clean == "tags":
        return _tag_dates().get(("", lang))
    if clean.startswith("tags/"):
        return _tag_dates().get((clean[len("tags/"):], lang))
    if content_file is not None and content_file.name.startswith("_index"):
        return newest_entry_date(content_file)
    return None


def lastmod_for(url: str, content_file: Optional[Path]) -> Optional[str]:
    """The date to publish for a URL: its own, the newest it lists, whichever is later.

    A section index takes the later of the two rather than only the newest entry,
    so rewriting the intro on a section whose last post is old still shows up.
    """
    dates = []
    own = modified_date(content_file) if content_file else None
    if own:
        dates.append(own)
    listed = listed_date(url, content_file)
    if listed:
        dates.append(listed)
    return newest(dates)


XHTML_NS = "http://www.w3.org/1999/xhtml"
IMAGE_NS = "http://www.google.com/schemas/sitemap-image/1.1"


def page_image(content_file: Path) -> Optional[str]:
    """The cover image of a page, as an absolute URL, or None.

    Only images this site hosts are listed. Some reading notes point their
    cover at a remote bookseller, and a sitemap that claims an image on
    another origin is one Search Console rejects for that entry.
    """
    fm = extract_frontmatter(content_file.read_text(encoding="utf-8"))
    thumbnail = fm.get("thumbnail")
    if not thumbnail or thumbnail.startswith("http"):
        return None
    if not (STATIC_DIR / thumbnail.lstrip("/")).is_file():
        return None
    return f"{BASE_URL}{thumbnail}"


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


def unsubmittable(url: str) -> Optional[str]:
    """Why this URL does not belong in the sitemap, or None when it does.

    A sitemap is a list of pages asked to be indexed as themselves, so three
    kinds of page do not belong on it, and Search Console reports each as an
    error against a URL nobody wanted indexed to begin with:

    - noindex, which the paginated listings and the reading profile carry
    - a redirect, which is what Zola writes for /<section>/page/1/ and what
      templates/redirect.html writes for the short aliases
    - a canonical naming a different URL, which says "index that one instead"

    All three are read from the built HTML rather than from a list of paths kept
    here, because each decision lives in the template that owns the page. A
    second copy of it in this script is one that goes stale the next time a
    template changes its mind.
    """
    path = url[len(BASE_URL):].strip("/") if url.startswith(BASE_URL) else ""
    page = PUBLIC_DIR / path / "index.html" if path else PUBLIC_DIR / "index.html"
    if not page.is_file():
        return None
    # Every one of these markers sits in the head, and these files run up to 400KB.
    text = page.read_text(encoding="utf-8", errors="ignore")
    end = text.find("</head>")
    head = text[:end] if end != -1 else text

    robots = re.search(r'<meta[^>]+name=["\']?robots["\']?[^>]*>', head, re.I)
    if robots and "noindex" in robots.group(0).lower():
        return "noindex"

    if re.search(r'<meta[^>]+http-equiv=["\']?refresh', head, re.I):
        return "redirect"

    canonical = re.search(
        r'<link[^>]+rel=["\']?canonical["\']?[^>]*href=["\']?([^"\'\s>]+)', head, re.I)
    if canonical and canonical.group(1).rstrip("/") != url.rstrip("/"):
        return "canonical elsewhere"

    return None


def enrich_sitemap(sitemap_path: str) -> int:
    """Date every entry, and add hreflang alternates and page images where missing."""
    with open(sitemap_path) as f:
        content = f.read()

    if "<sitemapindex" in content:
        return 0

    # Zola lists every page it renders, and unsubmittable names the ones that do
    # not belong on a sitemap. Dropping them here, before known_urls is taken
    # below, also keeps the hreflang alternates from pointing at entries that are
    # no longer in the file.
    reasons: dict = {}

    def drop_unsubmittable(match: "re.Match[str]") -> str:
        loc = re.search(r"<loc>(.*?)</loc>", match.group(0))
        if loc and is_excluded(loc.group(1)):
            reasons["excluded by config"] = reasons.get("excluded by config", 0) + 1
            return ""
        reason = unsubmittable(loc.group(1)) if loc else None
        if reason:
            reasons[reason] = reasons.get(reason, 0) + 1
            return ""
        return match.group(0)

    content = re.sub(r"<url>.*?</url>\s*", drop_unsubmittable, content, flags=re.DOTALL)
    dropped = sum(reasons.values())

    count = 0
    known_urls = set(re.findall(r"<loc>(.*?)</loc>", content))

    def enrich_url(match: "re.Match[str]") -> str:
        nonlocal count
        block = match.group(0)

        loc = re.search(r"<loc>(.*?)</loc>", block)
        if not loc:
            return block

        content_file = find_content_file(loc.group(1))

        # Zola writes page.updated or page.date, which for an entry is its
        # publication day. The later of that and the body-edit date wins.
        dates = []
        zola = re.search(r"<lastmod>(.*?)</lastmod>", block)
        if zola:
            dates.append(as_instant(zola.group(1)))
            block = re.sub(r"\s*<lastmod>.*?</lastmod>", "", block)
        own = lastmod_for(loc.group(1), content_file)
        if own:
            dates.append(own)
        lastmod = newest(dates)
        if lastmod:
            block = block.replace("</loc>", f"</loc>\n    <lastmod>{lastmod}</lastmod>", 1)
            count += 1

        addition = ""

        if "xhtml:link" not in block:
            addition += hreflang_links(loc.group(1), known_urls)

        if content_file and "image:image" not in block:
            image = page_image(content_file)
            if image:
                addition += (
                    "\n    <image:image>"
                    f"\n      <image:loc>{image}</image:loc>"
                    "\n    </image:image>"
                )

        if not addition:
            return block

        # The sitemap schema orders loc, lastmod, then elements from other
        # namespaces, so the alternates and images go last.
        return block.replace("</url>", f"{addition}\n  </url>")

    enriched = re.sub(r"<url>.*?</url>", enrich_url, content, flags=re.DOTALL)

    # The alternates use the xhtml prefix, which has to be declared on the root
    # element or the file is not well-formed XML and Search Console rejects it
    # whole, not just the entries carrying the links.
    if "xhtml:link" in enriched and 'xmlns:xhtml' not in enriched:
        enriched = enriched.replace("<urlset ", f'<urlset xmlns:xhtml="{XHTML_NS}" ', 1)
    if "image:image" in enriched and 'xmlns:image' not in enriched:
        enriched = enriched.replace("<urlset ", f'<urlset xmlns:image="{IMAGE_NS}" ', 1)

    with open(sitemap_path, "w") as f:
        f.write(enriched)

    if dropped:
        detail = ", ".join(f"{n} {why}" for why, n in sorted(reasons.items()))
        print(f"  dropped {dropped} URL(s) that do not belong in a sitemap: {detail}")

    # Every URL here resolves to either a content file or a listing, so a dateless
    # one means a resolution rule stopped matching. Printed by name rather than
    # counted: the last time one broke it cost all 16 section indexes their date,
    # and a number alone would not have said which pages to go and look at.
    dateless = []
    for block in re.findall(r"<url>.*?</url>", enriched, flags=re.DOTALL):
        loc = re.search(r"<loc>(.*?)</loc>", block)
        if loc and "<lastmod>" not in block:
            dateless.append(loc.group(1))
    if dateless:
        print(f"  {len(dateless)} URL(s) with no <lastmod>:", file=sys.stderr)
        for url in dateless:
            print(f"    {url}", file=sys.stderr)

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
        dated = enrich_sitemap(str(sitemap))
        total += dated
        print(f"  {sitemap}: dated {dated} entries")
    print(f"  Total: {total} entries dated")

    # No canary on the total here. Every entry gets its <lastmod> rewritten on each
    # run, so a second run gives the same file; a resolution rule that stops
    # matching shows up as the named list of dateless URLs above, and git failing
    # stops in get_git_date, where the cause can be named precisely.
