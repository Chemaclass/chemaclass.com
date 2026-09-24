#!/usr/bin/env python3
"""Fail the build when page copy in data/i18n/ is missing a language or a key.

Long page copy lives in data/i18n/<page>.toml with English and Spanish side by
side, and a template prints it with `{{ t.section.key[lang] | safe }}` after
`{% set t = load_data(path="data/i18n/<page>.toml") %}`. Tera fails soft there:
a missing key or a missing `es` value renders as an empty string and the build
still passes. The Spanish page would ship with a hole in it.

So this checks, for every data/i18n/*.toml:

- Every key has every language, none of them empty.
- Each language uses the same {placeholders}, so the template fills them all.
- No em or en dash (.claude/rules/no-em-dash.md).
- Every key a template reads exists, and every key exists because a template
  reads it. A key nothing reads is copy someone will edit for nothing.

Python 3.9 has no tomllib, so the files are parsed here, and only a strict
subset of TOML is allowed: comments, `[section]` headers and
`key.<lang> = "basic string"` lines. Anything else fails with its line number.
Zola parses the same file as real TOML, so the subset is a style rule too.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / 'data' / 'i18n'
TEMPLATES = ROOT / 'templates'
LANGS = ('en', 'es')

SECTION = re.compile(r'^\[([a-z0-9_]+)\]$')
ENTRY = re.compile(r'^([a-z0-9_]+)\.([a-z]+) = ("(?:[^"\\]|\\.)*")$')
PLACEHOLDER = re.compile(r'\{[a-z_]+\}')
DASHES = ('\u2014', '\u2013')

# `{% set t = load_data(path="data/i18n/web-development.toml") %}`, any trim.
LOADER = re.compile(
    r'\{%-?\s*set\s+(\w+)\s*=\s*load_data\(\s*path\s*=\s*"data/i18n/([\w-]+\.toml)"\s*\)\s*-?%\}')

Copy = Dict[str, Dict[str, str]]  # 'hero.lead' -> {'en': ..., 'es': ...}


def parse(path: Path, errors: List[str]) -> Copy:
    copy: Copy = {}
    section = None
    for number, raw in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
        line = raw.strip()
        where = f'{path.relative_to(ROOT)}:{number}'
        if not line or line.startswith('#'):
            continue
        header = SECTION.match(line)
        if header:
            section = header.group(1)
            continue
        entry = ENTRY.match(line)
        if not entry or section is None:
            errors.append(f'{where}: expected [section] or key.<lang> = "text", got: {line}')
            continue
        name, lang, literal = entry.groups()
        try:
            value = json.loads(literal)
        except ValueError:
            errors.append(f'{where}: not a plain double-quoted string: {literal}')
            continue
        if lang not in LANGS:
            errors.append(f'{where}: unknown language "{lang}", expected one of {", ".join(LANGS)}')
            continue
        key = f'{section}.{name}'
        if lang in copy.setdefault(key, {}):
            errors.append(f'{where}: {key}.{lang} is defined twice')
        copy[key][lang] = value
    return copy


def check_values(path: Path, copy: Copy, errors: List[str]) -> None:
    name = path.relative_to(ROOT)
    for key, values in copy.items():
        for lang in LANGS:
            if not values.get(lang, '').strip():
                errors.append(f'{name}: {key} has no {lang} text')
        found = {lang: sorted(PLACEHOLDER.findall(text)) for lang, text in values.items()}
        if len({tuple(v) for v in found.values()}) > 1:
            errors.append(f'{name}: {key} placeholders differ between languages: {found}')
        for lang, text in values.items():
            if any(dash in text for dash in DASHES):
                errors.append(f'{name}: {key}.{lang} contains an em or en dash')


def template_reads() -> Dict[str, Set[Tuple[str, str]]]:
    """Data file name -> {(template, key)} for every key a template reads."""
    reads: Dict[str, Set[Tuple[str, str]]] = {}
    for template in sorted(TEMPLATES.rglob('*.html')):
        source = template.read_text(encoding='utf-8')
        for var, data_file in set(LOADER.findall(source)):
            used = re.findall(rf'\b{re.escape(var)}\.([a-z0-9_]+\.[a-z0-9_]+)\[lang\]', source)
            name = str(template.relative_to(ROOT))
            reads.setdefault(data_file, set()).update((name, key) for key in used)
    return reads


def main() -> int:
    errors: List[str] = []
    reads = template_reads()
    files = sorted(DATA_DIR.glob('*.toml'))

    for data_file in sorted(set(reads) - {f.name for f in files}):
        errors.append(f'templates load data/i18n/{data_file}, which does not exist')

    keys = 0
    for path in files:
        copy = parse(path, errors)
        check_values(path, copy, errors)
        keys += len(copy)
        used = reads.get(path.name, set())
        if not used:
            errors.append(f'{path.relative_to(ROOT)}: no template loads it')
            continue
        for template, key in sorted(used):
            if key not in copy:
                errors.append(f'{template}: reads {key}, missing from {path.relative_to(ROOT)}')
        for key in sorted(set(copy) - {key for _, key in used}):
            errors.append(f'{path.relative_to(ROOT)}: {key} is not read by any template')

    if errors:
        print('Page copy in data/i18n/ is out of sync:')
        for error in errors:
            print(f'  {error}')
        return 1

    print(f'  {keys} keys in {len(files)} data/i18n files, all in {" and ".join(LANGS)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
