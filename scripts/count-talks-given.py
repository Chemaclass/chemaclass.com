#!/usr/bin/env python3
"""Count how many times a talk has actually been given, before the build starts.

The sponsor page shows articles and book notes straight from their sections, so
those numbers cannot go stale. Talks are different: there are seven talk pages,
but each one lists every event it was given at, and those events live as
markdown bullets in the body. Zola can read the pages, not the bullets, so the
number used to be typed into config.toml and drifted every time Chema spoke.

A delivery is a top-level bullet that opens with its date:

    - 2023-10-24/26 | International PHP Conference [**Munich, Germany**] (EN)
      - [Building modular applications in PHP with Gacela](https://...)

The nested bullet is the title, not a second delivery, so only column-zero
bullets count. English pages only: `.es.md` is the same list translated.

Dates in the future are upcoming, not given, so they are counted separately.
A talk announced for next month should not inflate a number that says "given".

Writes data/talks-given.json, a build artifact, gitignored. The template keeps
its own fallback, so a missing file shows the last committed number rather than
nothing.
"""
from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path
from typing import Tuple

from _common import CONTENT_DIR, PROJECT_ROOT

OUTPUT = PROJECT_ROOT / 'data' / 'talks-given.json'

# `- 2023-10-24 | ...` and `- 2023-10-24/26 | ...`, at column zero only.
DELIVERY = re.compile(r'^- (\d{4})-(\d{2})-(\d{2})(?:/\d{2})? \|', re.MULTILINE)


def count(path: Path, today: date) -> Tuple[int, int]:
    """Return (given, upcoming) for one talk page."""
    given = upcoming = 0
    for year, month, day in DELIVERY.findall(path.read_text(encoding='utf-8')):
        when = date(int(year), int(month), int(day))
        if when <= today:
            given += 1
        else:
            upcoming += 1
    return given, upcoming


def main() -> None:
    today = date.today()
    pages = sorted(
        p for p in (CONTENT_DIR / 'talks').glob('*.md')
        if not p.name.endswith('.es.md') and p.stem != '_index'
    )

    given = upcoming = 0
    for page in pages:
        page_given, page_upcoming = count(page, today)
        given += page_given
        upcoming += page_upcoming

    if not given:
        print('  no dated deliveries found, the sponsor page will show its fallback')
        return

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps({'given': given, 'upcoming': upcoming, 'pages': len(pages)}, indent=1),
        encoding='utf-8',
    )
    print(f'  Talks: {given} given, {upcoming} upcoming, across {len(pages)} pages')


if __name__ == '__main__':
    main()
