#!/usr/bin/env python3
"""
Generate a virtual filesystem JSON for the terminal interface.
Parses all markdown content and creates a navigable structure.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List, TypedDict, Union, cast

from _common import (
    CONTENT_DIR,
    PUBLIC_DIR,
    SECTIONS,
    STATIC_DIR,
    TSection,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
    require_title,
)

# The terminal browses services like a content section, so it walks one more
# directory than the generators that publish feeds.
TERMINAL_SECTIONS: List[TSection] = SECTIONS + ['services']


class TFileNode(TypedDict, total=False):
    """A file leaf in the virtual filesystem terminal.js walks.

    `type` is the discriminator terminal.js switches on. about.txt carries only
    a title and content, which is why the metadata keys are optional."""
    type: str
    title: str
    date: str
    description: str
    tags: List[str]
    subtitle: str
    related_posts: List[str]
    related_readings: List[str]
    content: str


class TDirNode(TypedDict):
    """A directory in the virtual filesystem: file nodes keyed by slug."""
    type: str
    children: Dict[str, TFileNode]


TNode = Union[TFileNode, TDirNode]


def dir_nodes(fs: Dict[str, TNode]) -> List[TDirNode]:
    """The dir nodes of the filesystem, discriminated on the same `type` field
    terminal.js switches on. This is the one place the union is narrowed, so the
    cast sits next to the check that justifies it."""
    return [cast(TDirNode, node) for node in fs.values() if node.get('type') == 'dir']


def process_markdown_file(filepath: Path) -> TFileNode:
    """Process a single markdown file and return its metadata."""
    frontmatter, body = read_entry(filepath, strip_yaml=True)

    return {
        'type': 'file',
        'title': require_title(frontmatter, filepath),
        'date': frontmatter.get('date', ''),
        'description': frontmatter.get('description', ''),
        'tags': frontmatter.get('tags', []),
        'subtitle': frontmatter.get('subtitle', ''),
        'related_posts': frontmatter.get('related_posts', []),
        'related_readings': frontmatter.get('related_readings', []),
        'content': body
    }


def build_filesystem(content_dir: Path) -> Dict[str, TNode]:
    """Build the virtual filesystem structure."""
    fs: Dict[str, TNode] = {}

    for section in TERMINAL_SECTIONS:
        children = {
            get_slug_from_filename(filepath.name): process_markdown_file(filepath)
            for filepath in iter_section_files(section, content_dir)
        }
        if not children and not (content_dir / section).is_dir():
            continue
        fs[section] = {
            'type': 'dir',
            'children': children
        }

    # Add about info
    fs['about.txt'] = {
        'type': 'file',
        'title': 'About',
        'content': '''Jose Maria Valera Reales (Chemaclass)

Software Developer | Tech Lead | Speaker

Location: Berlin, Germany
Website: https://chemaclass.com
GitHub: https://github.com/Chemaclass
Twitter: @Chemaclass

I write about software development, leadership, and team dynamics.
I believe in continuous improvement and sharing knowledge.

Type 'ls' to see available sections, or 'help' for all commands.'''
    }

    return fs


def main() -> None:
    print("Building terminal filesystem...")
    fs = build_filesystem(CONTENT_DIR)

    # Count entries. Narrow on the `type` discriminator rather than probing for a
    # `children` key that only dir nodes carry.
    dirs = dir_nodes(fs)
    total_files = sum(len(node['children']) for node in dirs) + (len(fs) - len(dirs))

    print(f"Found {total_files} files across {len(dirs)} directories")

    # Write JSON file to static/ (for zola serve) and public/ (for builds)
    for output_dir in [STATIC_DIR, PUBLIC_DIR]:
        output_dir.mkdir(exist_ok=True)
        output_path = output_dir / 'terminal-fs.json'
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(fs, f, ensure_ascii=False, indent=2)
        print(f"Written to {output_path}")


if __name__ == '__main__':
    main()
