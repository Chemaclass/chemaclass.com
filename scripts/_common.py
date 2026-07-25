"""Shared parsers for the post-build content generators (scripts/*.py).

build.sh runs each generator as `python3 scripts/X.py` from the repo root, so
scripts/ is on sys.path[0] and `from _common import ...` resolves. Each generator
turns content/**/*.md front matter into a different output format (md, txt,
terminal-fs, llms, feed); the front-matter, filename, slug, and body parsing is
shared here so there is one source of truth.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Iterator, Literal, Optional, Tuple, TypedDict

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = PROJECT_ROOT / 'content'
PUBLIC_DIR = PROJECT_ROOT / 'public'
STATIC_DIR = PROJECT_ROOT / 'static'

def _read_base_url() -> str:
    """Read `base_url` from config.toml, the one place that defines the origin.

    Zola builds every permalink from this value, and the generators have to
    agree with it: `enrich-search-index.py` matches its keys against the
    permalinks Zola wrote, and `enrich-sitemap.py` strips it back off to find
    the source file. A second copy here is a copy that can fall behind, and a
    URL shape that no longer matches the site is exactly how the Spanish search
    index went 221 documents with no date.
    """
    config = PROJECT_ROOT / 'config.toml'
    m = re.search(
        r'^base_url\s*=\s*"([^"]+)"',
        config.read_text(encoding='utf-8'),
        re.MULTILINE,
    )
    if not m:
        sys.exit(f'{config}: no `base_url = "..."` to build URLs from')
    return m.group(1).rstrip('/')


# Site origin, no trailing slash. Sourced from config.toml, never hardcoded.
BASE_URL = _read_base_url()

# The content directories the generators walk. Spelled as a closed set because
# iter_section_files() below yields nothing for a directory that is not there:
# a mistyped section produces an empty output file rather than an error, which is
# the kind of miss nobody notices. As a Literal, the typo is a type error.
# 'services' is only walked by the terminal generator, not by SECTIONS.
TSection = Literal['blog', 'readings', 'talks', 'services']

# The sections every generator walks. Ordered, because it decides the order
# entries appear in llms-full.txt and the terminal filesystem.
SECTIONS: list[TSection] = ['blog', 'readings', 'talks']

# The two languages content is authored in. Spanish entries are colocated with
# their English original as `*.es.md` and publish under /es/.
TLang = Literal['en', 'es']


class TFrontMatter(TypedDict, total=False):
    """The front-matter subset the generators read, flattened.

    total=False because a key is set only when its pattern matched, so a post
    missing `title =` simply has no 'title'. Read with .get(), or prove the key is
    present first: indexing straight in turns a titleless post into a bare KeyError
    that fails the whole build.

    Two differences from the source file, both of which have bitten already:

    - `subtitle`, `thumbnail`, `related_posts` and `related_readings` live under
      `[extra]` in the TOML but sit at the top level here. Only `title`,
      `description`, `date` and `tags` are genuinely top-level in the source, so a
      key written on the wrong side of the `[extra]` line parses fine and is then
      read by nobody.
    - `thumbnail` holds `[extra] static_thumbnail`. The templates ALSO read a
      separate `extra.thumbnail`, a page-relative path for colocated assets that no
      content file currently sets. The two are not the same field.
    """
    title: str
    description: str
    date: str
    tags: list[str]
    subtitle: str
    thumbnail: str
    related_posts: list[str]
    related_readings: list[str]


def extract_frontmatter(content: str) -> TFrontMatter:
    """Parse TOML front matter (between +++ fences). Every field is optional:
    a key is set only when its pattern matches, so callers read with .get().
    Returns {} when there is no front matter block."""
    fm: TFrontMatter = {}
    m = re.search(r'^\+\+\+\s*\n(.*?)\n\+\+\+', content, re.DOTALL)
    if not m:
        return fm
    t = m.group(1)

    title = re.search(r'^title\s*=\s*"([^"]*)"', t, re.MULTILINE)
    if title:
        fm['title'] = title.group(1)

    description = re.search(r'^description\s*=\s*"([^"]*)"', t, re.MULTILINE)
    if description:
        fm['description'] = description.group(1)

    date = re.search(r'^date\s*=\s*["\']?(\d{4}-\d{2}-\d{2})', t, re.MULTILINE)
    if date:
        fm['date'] = date.group(1)

    tags = re.search(r'tags\s*=\s*\[(.*?)\]', t, re.DOTALL)
    if tags:
        fm['tags'] = re.findall(r'"([^"]*)"', tags.group(1))

    subtitle = re.search(r'^subtitle\s*=\s*"([^"]*)"', t, re.MULTILINE)
    if subtitle:
        fm['subtitle'] = subtitle.group(1)

    thumbnail = re.search(r'static_thumbnail\s*=\s*"([^"]*)"', t)
    if thumbnail:
        fm['thumbnail'] = thumbnail.group(1)

    related_posts = re.search(r'related_posts\s*=\s*\[(.*?)\]', t, re.DOTALL)
    if related_posts:
        fm['related_posts'] = re.findall(r'"([^"]*)"', related_posts.group(1))

    related_readings = re.search(r'related_readings\s*=\s*\[(.*?)\]', t, re.DOTALL)
    if related_readings:
        fm['related_readings'] = re.findall(r'"([^"]*)"', related_readings.group(1))

    return fm


def require_title(fm: TFrontMatter, filepath: Path) -> str:
    """Return the front matter title, or exit non-zero naming the offending file.

    Every content page on the site carries `title = "..."`. When the parser could
    not read one, the generators used to paper over it in four different ways: the
    txt and md mirrors published a page headed "Untitled", the terminal filesystem
    fell back to the filename, and llms-full.txt and feed.json dropped the entry
    without a word. The build stayed green through all of it. The usual cause is a
    title extract_frontmatter cannot read (single quotes, an escaped quote, a
    multi-line string), which is a content bug to fix at the source, so name the
    file and stop the way scripts/check-icons.py does.
    """
    title = fm.get('title')
    if not title:
        sys.exit(f'{filepath}: front matter has no readable `title = "..."`')
    return title


def extract_date_from_filename(filename: str) -> Optional[str]:
    """Return the YYYY-MM-DD date prefix of a filename, or None."""
    m = re.match(r'^(\d{4}-\d{2}-\d{2})-', filename)
    return m.group(1) if m else None


def get_slug_from_filename(filename: str) -> str:
    """Filename to slug: drop .md, any .es/.en suffix, then the date prefix."""
    name = filename.replace('.md', '')
    name = re.sub(r'\.(es|en)$', '', name)
    name = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', name)
    return name


def iter_section_files(
    section: TSection,
    content_dir: Optional[Path] = None,
    translations: bool = False,
) -> Iterator[Path]:
    """Yield a section's entry files in filename order, skipping the section
    index. Translations (`*.es.md`) are skipped unless asked for. Yields nothing
    when the section directory is absent."""
    root = (content_dir or CONTENT_DIR) / section
    if not root.is_dir():
        return
    for path in sorted(root.glob('*.md')):
        if path.name.startswith('_index'):
            continue
        if not translations and '.es.md' in path.name:
            continue
        yield path


def read_entry(filepath: Path, strip_yaml: bool = False) -> Tuple[TFrontMatter, str]:
    """Read one content file and return (frontmatter, body). The date falls back
    to the filename prefix, which is where most posts carry it.

    The pair is spelled out rather than left as a bare `tuple`: every generator
    unpacks this, and a bare tuple made both halves Any, so unpacking in the wrong
    order or calling .get() on the body type-checked fine and failed at build time."""
    try:
        content = filepath.read_text(encoding='utf-8')
    except (OSError, UnicodeDecodeError) as e:
        # Every caller reached this path through a glob, so the file was there a
        # moment ago: a broken symlink, a permission problem, or content that is
        # not UTF-8. Name it, instead of leaving a traceback that says only which
        # generator happened to trip over it first.
        sys.exit(f'cannot read {filepath}: {e}')
    fm = extract_frontmatter(content)
    if 'date' not in fm:
        date = extract_date_from_filename(filepath.name)
        if date:
            fm['date'] = date
    return fm, get_content_body(content, strip_yaml=strip_yaml)


def entry_url(section: TSection, slug: str, base_url: str = BASE_URL, es: bool = False) -> str:
    """Canonical URL of a section entry. Spanish entries are served under /es/.

    Language is an explicit argument on purpose. While it was an implicit filename
    convention, the Spanish search index carried dates on 0 of 221 documents
    because the keys it built matched no permalink."""
    prefix = f'{base_url}/es' if es else base_url
    return f'{prefix}/{section}/{slug}/'


def get_content_body(content: str, strip_yaml: bool = False) -> str:
    """Return the body after the TOML front matter. strip_yaml also removes a
    leading YAML (---) block that some source bodies carry."""
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    if strip_yaml:
        body = re.sub(r'^---\s*\n.*?\n---\s*\n?', '', body, flags=re.DOTALL)
    return body.strip()
