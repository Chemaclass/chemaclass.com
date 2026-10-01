#!/usr/bin/env python3
"""Stamp the date of the newest content edit into the built humans.txt and ai.txt.

Both carried a hand-written date that nobody bumped: ai.txt changed twice after
its `Updated:` line, and humans.txt claimed a July update in October. The date
written here is the newest body-edit date in data/last-modified.json, the same
one the pages publish as dateModified.
"""
from __future__ import annotations

import re
import sys
from datetime import datetime

from _common import CONTENT_DIR, PUBLIC_DIR, is_draft, read_last_modified

STAMPS = (
    ('humans.txt', re.compile(r'^(\s*Last update:\s*).*$', re.M)),
    ('ai.txt', re.compile(r'^(Updated:\s*).*$', re.M)),
)


def main() -> None:
    # Drafts are in the file too, and editing one is not an update to the site.
    dates = [date for path, date in read_last_modified().items()
             if not ((CONTENT_DIR / path).is_file() and is_draft(CONTENT_DIR / path))]
    if not dates:
        sys.exit('data/last-modified.json is missing or empty: run generate-last-modified.py first')
    newest = max(dates, key=datetime.fromisoformat)[:10]

    for name, pattern in STAMPS:
        path = PUBLIC_DIR / name
        text = path.read_text(encoding='utf-8')
        stamped, count = pattern.subn(lambda m: m.group(1) + newest, text)
        if count != 1:
            sys.exit(f'{path}: expected one date line to stamp, found {count}')
        path.write_text(stamped, encoding='utf-8')
    print(f'  Stamped {newest} into humans.txt and ai.txt')


if __name__ == '__main__':
    main()
