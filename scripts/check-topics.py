#!/usr/bin/env python3
"""Fail the build when /topics/ does not cover every tag, or names one that is dead.

templates/topics.html groups tags into the clusters listed under
`[[extra.topics]]` in config.toml. That list is hand-maintained and the template
fails soft in both directions:

- A tag no topic mentions is dropped from the page. Nothing breaks, the tag page
  still exists, but it is unreachable from /topics/. `ai` sat there with 22 posts,
  the largest tag on the site, invisible.
- A topic naming a tag no post carries renders nothing for it, so the config keeps
  a name that means nothing. Six of those had accumulated.

Both are silent, which is why they lasted. This reads config.toml and the content
front matter directly, so it needs no build output and runs stdlib-only like the
other checks.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from typing import Dict, Set

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / 'config.toml'

# The sections whose pages carry taxonomy tags. `services` and `music` set a
# `tags` key too, but under [extra] on project cards, not as a taxonomy: counting
# those invents tags that have no tag page.
TAXONOMY_SECTIONS = ('blog', 'readings', 'talks', 'books')

TOPIC_BLOCK = re.compile(r'\[\[extra\.topics\]\](.*?)(?=\n\[|\Z)', re.S)
TAGS_LINE = re.compile(r'^tags\s*=\s*\[(.*?)\]', re.S | re.M)
# Only the [taxonomies] table, not an [extra] tags key further down the file.
TAXONOMIES_TABLE = re.compile(r'^\[taxonomies\]\s*\n(.*?)(?=^\[|\Z)', re.S | re.M)
QUOTED = re.compile(r'"([^"]*)"')


def topic_tags() -> Set[str]:
    """Every tag named by a [[extra.topics]] cluster."""
    config = CONFIG.read_text(encoding='utf-8')
    tags: Set[str] = set()
    for block in TOPIC_BLOCK.findall(config):
        match = TAGS_LINE.search(block)
        if match:
            tags.update(QUOTED.findall(match.group(1)))
    if not tags:
        sys.exit(f'{CONFIG}: no [[extra.topics]] tags found, so /topics/ is empty')
    return tags


def content_tags() -> Dict[str, int]:
    """Tag -> how many content files carry it."""
    counts: Dict[str, int] = {}
    for section in TAXONOMY_SECTIONS:
        for path in (ROOT / 'content' / section).rglob('*.md'):
            table = TAXONOMIES_TABLE.search(path.read_text(encoding='utf-8'))
            if not table:
                continue
            line = TAGS_LINE.search(table.group(1))
            if not line:
                continue
            for tag in QUOTED.findall(line.group(1)):
                counts[tag] = counts.get(tag, 0) + 1
    return counts


def main() -> int:
    listed = topic_tags()
    used = content_tags()

    uncovered = sorted(
        ((count, tag) for tag, count in used.items() if tag not in listed),
        reverse=True,
    )
    dead = sorted(listed - set(used))

    if uncovered:
        print('Tags no topic covers, so /topics/ never shows them:')
        for count, tag in uncovered:
            print(f'  {tag:24} {count} pages')
        print('Add each to a [[extra.topics]] cluster in config.toml.\n')

    if dead:
        print('Topic tags no page carries, so they render as nothing:')
        for tag in dead:
            print(f'  {tag}')
        print('Drop them from config.toml, or tag a page with them.\n')

    if uncovered or dead:
        return 1

    print(f'  /topics/ covers all {len(used)} tags')
    return 0


if __name__ == '__main__':
    sys.exit(main())
