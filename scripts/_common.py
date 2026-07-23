"""Shared parsers for the post-build content generators (scripts/*.py).

build.sh runs each generator as `python3 scripts/X.py` from the repo root, so
scripts/ is on sys.path[0] and `from _common import ...` resolves. Each generator
turns content/**/*.md front matter into a different output format (md, txt,
terminal-fs, llms, feed); the front-matter, filename, slug, and body parsing is
shared here so there is one source of truth.
"""
from __future__ import annotations

import re
from typing import List, Optional, TypedDict


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


def get_content_body(content: str, strip_yaml: bool = False) -> str:
    """Return the body after the TOML front matter. strip_yaml also removes a
    leading YAML (---) block that some source bodies carry."""
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    if strip_yaml:
        body = re.sub(r'^---\s*\n.*?\n---\s*\n?', '', body, flags=re.DOTALL)
    return body.strip()
