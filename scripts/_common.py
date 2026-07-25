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
from typing import Iterator, List, Optional, TypedDict

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = PROJECT_ROOT / 'content'
PUBLIC_DIR = PROJECT_ROOT / 'public'
STATIC_DIR = PROJECT_ROOT / 'static'

BASE_URL = 'https://chemaclass.com'

# The sections every generator walks. Ordered, because it decides the order
# entries appear in llms-full.txt and the terminal filesystem.
SECTIONS = ['blog', 'readings', 'talks']


class TFrontMatter(TypedDict, total=False):
    title: str
    description: str
    date: str
    tags: List[str]
    subtitle: str
    thumbnail: str
    related_posts: List[str]
    related_readings: List[str]


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
    section: str,
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


def read_entry(filepath: Path, strip_yaml: bool = False) -> tuple:
    """Read one content file and return (frontmatter, body). The date falls back
    to the filename prefix, which is where most posts carry it."""
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


def entry_url(section: str, slug: str, base_url: str = BASE_URL, es: bool = False) -> str:
    """Canonical URL of a section entry. Spanish entries are served under /es/."""
    prefix = f'{base_url}/es' if es else base_url
    return f'{prefix}/{section}/{slug}/'


def get_content_body(content: str, strip_yaml: bool = False) -> str:
    """Return the body after the TOML front matter. strip_yaml also removes a
    leading YAML (---) block that some source bodies carry."""
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    if strip_yaml:
        body = re.sub(r'^---\s*\n.*?\n---\s*\n?', '', body, flags=re.DOTALL)
    return body.strip()
