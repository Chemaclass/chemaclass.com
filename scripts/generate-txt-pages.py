#!/usr/bin/env python3
"""
Generate plain text versions of all pages for curl-friendly access.
Creates .txt files alongside HTML for terminal users.
"""

import os
import re
import textwrap
from pathlib import Path


def extract_frontmatter(content):
    """Extract TOML frontmatter from markdown content."""
    frontmatter = {}

    # Match TOML frontmatter (between +++ markers)
    toml_match = re.search(r'^\+\+\+\s*\n(.*?)\n\+\+\+', content, re.DOTALL)
    if toml_match:
        fm_text = toml_match.group(1)

        # Extract title
        title_match = re.search(r'^title\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if title_match:
            frontmatter['title'] = title_match.group(1)

        # Extract description
        desc_match = re.search(r'^description\s*=\s*"([^"]*)"', fm_text, re.MULTILINE)
        if desc_match:
            frontmatter['description'] = desc_match.group(1)

        # Extract date from frontmatter
        date_match = re.search(r'^date\s*=\s*["\']?(\d{4}-\d{2}-\d{2})', fm_text, re.MULTILINE)
        if date_match:
            frontmatter['date'] = date_match.group(1)

        # Extract tags
        tags_match = re.search(r'tags\s*=\s*\[(.*?)\]', fm_text, re.DOTALL)
        if tags_match:
            tags_str = tags_match.group(1)
            tags = re.findall(r'"([^"]*)"', tags_str)
            frontmatter['tags'] = tags

    return frontmatter


def extract_date_from_filename(filename):
    """Extract date from filename like 2024-01-15-slug.md"""
    match = re.match(r'^(\d{4}-\d{2}-\d{2})-', filename)
    if match:
        return match.group(1)
    return None


def get_content_body(content):
    """Extract markdown body (after frontmatter)."""
    body = re.sub(r'^\+\+\+\s*\n.*?\n\+\+\+\s*\n?', '', content, flags=re.DOTALL)
    body = re.sub(r'^---\s*\n.*?\n---\s*\n?', '', body, flags=re.DOTALL)
    return body.strip()


def get_slug_from_filename(filename):
    """Extract slug from filename, removing date prefix."""
    name = filename.replace('.md', '')
    name = re.sub(r'\.(es|en)$', '', name)
    name = re.sub(r'^\d{4}-\d{2}-\d{2}-', '', name)
    return name


def markdown_to_plaintext(content, width=80):
    """Convert markdown to readable plain text."""
    # Remove images
    content = re.sub(r'!\[.*?\]\(.*?\)', '[image]', content)

    # Convert links to readable format
    content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'\1 (\2)', content)

    # Convert headers to uppercase with underlines
    def header_replace(match):
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
    wrapped_lines = []
    current_paragraph = []

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


def format_txt_page(frontmatter, content, url, width=80):
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


def generate_index_txt(section, files, base_url, width=80):
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
    sorted_files = sorted(files, key=lambda x: x.get('date', ''), reverse=True)

    for f in sorted_files:
        date = f.get('date', '')
        slug = f.get('slug', '')
        file_title = f.get('title', slug)
        desc = f.get('description', '')

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


def process_markdown_file(filepath, section, base_url):
    """Process a single markdown file and generate .txt version."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter = extract_frontmatter(content)
        body = get_content_body(content)

        # Get date from filename if not in frontmatter
        if 'date' not in frontmatter:
            date = extract_date_from_filename(filepath.name)
            if date:
                frontmatter['date'] = date

        slug = get_slug_from_filename(filepath.name)
        url = f'{base_url}/{section}/{slug}/'

        txt_content = format_txt_page(frontmatter, body, url)

        return {
            'slug': slug,
            'title': frontmatter.get('title', slug),
            'date': frontmatter.get('date', ''),
            'description': frontmatter.get('description', ''),
            'txt_content': txt_content
        }
    except Exception as e:
        print(f'Error processing {filepath}: {e}')
        return None


def main():
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    content_dir = project_root / 'content'
    public_dir = project_root / 'public'

    base_url = 'https://chemaclass.com'
    sections = ['blog', 'readings', 'talks']

    total_files = 0

    for section in sections:
        section_path = content_dir / section
        if not section_path.exists():
            continue

        section_files = []

        for filepath in sorted(section_path.glob('*.md')):
            # Skip index files and non-English versions
            if filepath.name == '_index.md':
                continue
            if '.es.md' in filepath.name:
                continue

            result = process_markdown_file(filepath, section, base_url)
            if result:
                section_files.append(result)

                # Create output directory
                output_dir = public_dir / section / result['slug']
                output_dir.mkdir(parents=True, exist_ok=True)

                # Write .txt file
                txt_path = output_dir / 'index.txt'
                with open(txt_path, 'w', encoding='utf-8') as f:
                    f.write(result['txt_content'])

                total_files += 1

        # Generate section index.txt
        if section_files:
            index_content = generate_index_txt(section, section_files, base_url)
            index_dir = public_dir / section
            index_dir.mkdir(parents=True, exist_ok=True)

            index_path = index_dir / 'index.txt'
            with open(index_path, 'w', encoding='utf-8') as f:
                f.write(index_content)

            print(f'  {section}/: {len(section_files)} files + index.txt')

    print(f'Generated {total_files} .txt files')


if __name__ == '__main__':
    main()
