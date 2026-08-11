#!/usr/bin/env python3
"""Keep new blog posts and reading notes inside the site's content conventions.

The archive predates the current writing guides, so existing exceptions live in
an explicit baseline. The check fails when a new exception appears or when a
fixed exception remains in that baseline.

Run after an intentional cleanup:

    python3 scripts/check-content-shape.py --write-baseline
"""
from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from _common import CONTENT_DIR, PROJECT_ROOT

BASELINE_PATH = PROJECT_ROOT / 'scripts' / 'content-shape-baseline.txt'
FRONT_MATTER = re.compile(r'^\+\+\+\s*\n(.*?)\n\+\+\+', re.DOTALL)
FENCE = re.compile(r'```.*?```|~~~.*?~~~', re.DOTALL)
HEADING = re.compile(r'^(#{2,3})\s+(.+?)\s*$', re.MULTILINE)
MARKDOWN_IMAGE = re.compile(r'!\[[^]]*\]\(([^)]+)\)')
WORD = re.compile(r"[^\W_]+(?:['’][^\W_]+)?", re.UNICODE)

REQUIRED = {
    'blog': (
        'title', 'description', 'tags', 'subtitle', 'static_thumbnail',
        'related_posts', 'related_readings',
    ),
    'readings': (
        'title', 'description', 'authors', 'tags', 'subtitle', 'pages',
        'author', 'static_thumbnail', 'related_readings',
    ),
}
GENERIC_HEADINGS = {
    'content', 'contents', 'book summary', 'main topics', 'summary', 'overview',
    'contenido', 'resumen del libro', 'temas principales', 'resumen',
}


@dataclass(frozen=True, order=True)
class Issue:
    rule: str
    path: str
    detail: str = ''
    message: str = ''

    @property
    def key(self) -> str:
        parts = (self.rule, self.path, self.detail)
        return '\t'.join(part for part in parts if part)


def entry_files() -> Iterable[tuple[str, Path]]:
    for section in REQUIRED:
        for path in sorted((CONTENT_DIR / section).glob('*.md')):
            if not path.name.startswith('_index'):
                yield section, path


def field_present(front_matter: str, field: str) -> bool:
    array = re.search(rf'^{re.escape(field)}\s*=\s*\[(.*?)\]', front_matter,
                      re.MULTILINE | re.DOTALL)
    if array:
        return bool(re.search(r'"[^"\n]+"', array.group(1)))
    scalar = re.search(rf'^{re.escape(field)}\s*=\s*"([^"\n]*)"',
                       front_matter, re.MULTILINE)
    return bool(scalar and scalar.group(1).strip())


def tag_count(front_matter: str) -> int | None:
    found = re.search(r'^tags\s*=\s*\[(.*?)\]', front_matter,
                      re.MULTILINE | re.DOTALL)
    return len(re.findall(r'"[^"\n]+"', found.group(1))) if found else None


def prose_word_count(body: str) -> int:
    prose = FENCE.sub('', body)
    prose = re.sub(r'\{\{.*?\}\}', '', prose, flags=re.DOTALL)
    prose = re.sub(r'<!--.*?-->', '', prose, flags=re.DOTALL)
    prose = re.sub(r'https?://\S+', '', prose)
    return len(WORD.findall(prose))


def inspect_entry(section: str, path: Path) -> list[Issue]:
    rel = str(path.relative_to(PROJECT_ROOT))
    raw = path.read_text(encoding='utf-8')
    found = FRONT_MATTER.match(raw)
    if not found:
        return [Issue('front-matter', rel, message='has no TOML front matter')]

    front_matter = found.group(1)
    body = raw[found.end():]
    issues: list[Issue] = []

    for field in REQUIRED[section]:
        if not field_present(front_matter, field):
            issues.append(Issue(
                f'missing-{field}', rel,
                message=f'has no non-empty `{field}` field',
            ))

    count = tag_count(front_matter)
    if count is not None and not 3 <= count <= 6:
        issues.append(Issue(
            'tag-count', rel,
            message=f'has {count} tags, expected 3 to 6',
        ))

    if '<!-- more -->' not in body:
        issues.append(Issue('missing-more', rel, message='has no `<!-- more -->` break'))

    headings = [(marks, title.strip()) for marks, title in HEADING.findall(body)]
    h2 = [title for marks, title in headings if marks == '##']
    h3 = [title for marks, title in headings if marks == '###']

    if section == 'blog':
        if not 4 <= len(h2) <= 7:
            issues.append(Issue(
                'blog-h2-count', rel,
                message=f'has {len(h2)} H2 headings, expected 4 to 7',
            ))
        for title in h2:
            if title.startswith('¿') or title.endswith(('?', '？')):
                issues.append(Issue(
                    'question-h2', rel, title,
                    message=f'uses a question as an H2: {title}',
                ))
    else:
        if not headings:
            issues.append(Issue('reading-no-headings', rel, message='has no H2 or H3 headings'))
        if h2 and h3:
            issues.append(Issue(
                'reading-mixed-headings', rel,
                message='mixes H2 and H3 structures',
            ))
        for _, title in headings:
            normalized = re.sub(r'^[\d.\s]+', '', title).strip().lower()
            if normalized in GENERIC_HEADINGS:
                issues.append(Issue(
                    'generic-heading', rel, normalized,
                    message=f'uses a generic heading: {title}',
                ))

        words = prose_word_count(body)
        if words < 400:
            issues.append(Issue(
                'reading-too-short', rel,
                message=f'has {words} words, expected at least 400',
            ))
        elif words > 800:
            issues.append(Issue(
                'reading-too-long', rel,
                message=f'has {words} words, expected no more than 800',
            ))

        for url in MARKDOWN_IMAGE.findall(body):
            filename = url.split('?', 1)[0].rsplit('/', 1)[-1].lower()
            if re.search(r'(?:cover|book)', filename):
                issues.append(Issue(
                    'inline-reading-cover', rel, url,
                    message=f'repeats a book or cover image in the body: {url}',
                ))

    return issues


def mirror_issues() -> list[Issue]:
    issues: list[Issue] = []
    for section, path in entry_files():
        if path.name.endswith('.es.md'):
            counterpart = path.with_name(path.name.removesuffix('.es.md') + '.md')
        else:
            counterpart = path.with_name(path.stem + '.es.md')
        if not counterpart.is_file():
            rel = str(path.relative_to(PROJECT_ROOT))
            expected = str(counterpart.relative_to(PROJECT_ROOT))
            issues.append(Issue(
                'missing-language-mirror', rel, expected,
                message=f'has no language mirror at {expected}',
            ))
    return issues


def collect_issues() -> list[Issue]:
    issues = mirror_issues()
    for section, path in entry_files():
        issues.extend(inspect_entry(section, path))
    return sorted(set(issues))


def read_baseline() -> set[str]:
    if not BASELINE_PATH.is_file():
        sys.exit(
            f'{BASELINE_PATH} is missing: run '
            '`python3 scripts/check-content-shape.py --write-baseline`'
        )
    return {
        line for raw in BASELINE_PATH.read_text(encoding='utf-8').splitlines()
        if (line := raw.strip()) and not line.startswith('#')
    }


def write_baseline(issues: list[Issue]) -> None:
    header = (
        '# Existing content-shape exceptions. One tab-separated issue per line.\n'
        '# Regenerate only after reviewing and fixing stale entries.\n'
    )
    body = ''.join(f'{issue.key}\n' for issue in issues)
    BASELINE_PATH.write_text(header + body, encoding='utf-8')
    print(f'  wrote {len(issues)} exceptions to {BASELINE_PATH.relative_to(PROJECT_ROOT)}')


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write-baseline', action='store_true')
    args = parser.parse_args()

    issues = collect_issues()
    if args.write_baseline:
        write_baseline(issues)
        return

    baseline = read_baseline()
    current = {issue.key: issue for issue in issues}
    added = sorted(set(current) - baseline)
    resolved = sorted(baseline - set(current))

    if added:
        print(f'{len(added)} new content-shape problem(s):', file=sys.stderr)
        for key in added:
            issue = current[key]
            print(f'  {issue.path}: {issue.message}', file=sys.stderr)
    if resolved:
        print(f'{len(resolved)} stale baseline exception(s):', file=sys.stderr)
        for key in resolved:
            print(f'  {key}', file=sys.stderr)
        print('  review the fixes, then regenerate the baseline', file=sys.stderr)
    if added or resolved:
        sys.exit(1)

    entries = sum(1 for _ in entry_files())
    print(f'  {entries} entries checked, {len(baseline)} known exceptions')


if __name__ == '__main__':
    main()
