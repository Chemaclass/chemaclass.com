#!/usr/bin/env python3
"""
Generate plain text versions of all pages for curl-friendly access.
Creates .txt files alongside HTML for terminal users.
"""

from __future__ import annotations

import re
import textwrap
from pathlib import Path
from typing import List, TypedDict

from _common import (
    BASE_URL,
    PUBLIC_DIR,
    SECTIONS,
    TFrontMatter,
    TSection,
    entry_url,
    get_slug_from_filename,
    iter_section_files,
    read_entry,
)


class TTxtPage(TypedDict):
    """One rendered page, plus the metadata the section index needs. Total: the
    processor fills every field, so generate_index_txt reads them directly."""
    slug: str
    title: str
    date: str
    description: str
    txt_content: str


def markdown_to_plaintext(content: str, width: int = 80) -> str:
    """Convert markdown to readable plain text."""
    # Remove images
    content = re.sub(r'!\[.*?\]\(.*?\)', '[image]', content)

    # Convert links to readable format
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1 (\2)', content)

    # Convert headers to uppercase with underlines
    def header_replace(match: "re.Match[str]") -> str:
        level = len(match.group(1))
        text = match.group(2).strip()
        if level == 1:
            return '\n' + '=' * len(text) + '\n' + text.upper() + '\n' + '=' * len(text) + '\n'
        elif level == 2:
            return '\n' + text.upper() + '\n' + '-' * len(text) + '\n'
        else:
            return '\n' + text + '\n'

    content = re.sub(r'^(#{1,6})\s+(.+)$', header_replace, content, flags=re.MULTILINE)

    # Remove bold/italic markers
    content = re.sub(r'\*\*([^*]+)\*\*', r'\1', content)
    content = re.sub(r'\*([^*]+)\*', r'\1', content)
    content = re.sub(r'__([^_]+)__', r'\1', content)
    content = re.sub(r'_([^_]+)_', r'\1', content)

    # Convert blockquotes
    content = re.sub(r'^>\s*(.+)$', r'  | \1', content, flags=re.MULTILINE)

    # Remove code block markers but keep content
    content = re.sub(r'```\w*\n', '\n    ', content)
    content = re.sub(r'\n```', '\n', content)

    # Remove inline code markers
    content = re.sub(r'`([^`]+)`', r'\1', content)

    # Remove <!-- more --> markers
    content = re.sub(r'<!--\s*more\s*-->', '', content)

    # Clean up horizontal rules
    content = re.sub(r'^---+$', '-' * width, content, flags=re.MULTILINE)

    # Wrap paragraphs
    lines = content.split('\n')
    wrapped_lines: List[str] = []
    current_paragraph: List[str] = []

    for line in lines:
        stripped = line.strip()

        # Check if this is a special line (header underline, blockquote, etc.)
        if (line.startswith('  |') or
            line.startswith('    ') or
            re.match(r'^[=-]+$', stripped) or
            not stripped):

            # Flush current paragraph
            if current_paragraph:
                paragraph = ' '.join(current_paragraph)
                wrapped = textwrap.fill(paragraph, width=width)
                wrapped_lines.append(wrapped)
                current_paragraph = []

            wrapped_lines.append(line.rstrip())
        else:
            current_paragraph.append(stripped)

    # Flush final paragraph
    if current_paragraph:
        paragraph = ' '.join(current_paragraph)
        wrapped = textwrap.fill(paragraph, width=width)
        wrapped_lines.append(wrapped)

    # Clean up extra blank lines
    result = '\n'.join(wrapped_lines)
    result = re.sub(r'\n{3,}', '\n\n', result)

    return result.strip()


def format_txt_page(
    frontmatter: TFrontMatter, content: str, url: str, width: int = 80
) -> str:
    """Format a full plain text page."""
    separator = '=' * width
    thin_sep = '-' * width

    title = frontmatter.get('title', 'Untitled').upper()
    date = frontmatter.get('date', '')
    tags = frontmatter.get('tags', [])
    description = frontmatter.get('description', '')

    output = separator + '\n'
    output += title + '\n'
    output += separator + '\n'

    if date:
        output += f'Date: {date}\n'
    if tags:
        output += f'Tags: {", ".join(tags)}\n'
    if url:
        output += f'URL: {url}\n'

    output += thin_sep + '\n\n'

    if description:
        wrapped_desc = textwrap.fill(description, width=width)
        output += wrapped_desc + '\n\n'

    output += markdown_to_plaintext(content, width) + '\n\n'
    output += separator + '\n'

    return output


def generate_index_txt(
    section: TSection, files: List[TTxtPage], base_url: str, width: int = 80
) -> str:
    """Generate an index.txt for a section listing all files."""
    separator = '=' * width
    thin_sep = '-' * width

    title = section.upper()

    output = separator + '\n'
    output += title + '\n'
    output += separator + '\n'
    output += f'URL: {base_url}/{section}/\n'
    output += thin_sep + '\n\n'

    # Sort by date, newest first
    sorted_files = sorted(files, key=lambda x: x['date'], reverse=True)

    for f in sorted_files:
        date = f['date']
        slug = f['slug']
        file_title = f['title']
        desc = f['description']

        if date:
            output += f'[{date}] '
        output += f'{file_title}\n'
        output += f'  /{section}/{slug}/\n'
        if desc:
            truncated = desc[:70] + '...' if len(desc) > 70 else desc
            output += f'  {truncated}\n'
        output += '\n'

    output += separator + '\n'
    return output


def process_markdown_file(filepath: Path, section: TSection, base_url: str) -> TTxtPage:
    """Process a single markdown file and generate .txt version."""
    frontmatter, body = read_entry(filepath, strip_yaml=True)
    slug = get_slug_from_filename(filepath.name)
    url = entry_url(section, slug, base_url)

    txt_content = format_txt_page(frontmatter, body, url)

    return {
        'slug': slug,
        'title': frontmatter.get('title', slug),
        'date': frontmatter.get('date', ''),
        'description': frontmatter.get('description', ''),
        'txt_content': txt_content
    }


def write(path: Path, text: str) -> None:
    """Write text, creating the parent directory."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')


def main() -> None:
    total_files = 0

    for section in SECTIONS:
        section_files: List[TTxtPage] = []

        for filepath in iter_section_files(section):
            result = process_markdown_file(filepath, section, BASE_URL)
            section_files.append(result)
            write(PUBLIC_DIR / section / result['slug'] / 'index.txt',
                  result['txt_content'])
            total_files += 1

        if section_files:
            write(PUBLIC_DIR / section / 'index.txt',
                  generate_index_txt(section, section_files, BASE_URL))
            print(f'  {section}/: {len(section_files)} files + index.txt')

    print(f'Generated {total_files} .txt files')


if __name__ == '__main__':
    main()
