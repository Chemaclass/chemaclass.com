#!/usr/bin/env python3
"""Fail the build when a page throws a JavaScript error in a real browser.

Nothing else catches this. `zola build` never runs the site's JS, and the
post-build checks read the output as text. A script that parses fine and dies on
the first line still ships a green build. That is exactly what happened to
static/profile.js: a `parsed` / `payload` mix-up made every visitor to /profile/
stare at the loading skeleton forever, and the only thing that noticed was a
human looking at the page in production.

This serves public/ over localhost, drives headless Chrome across the pages that
carry each of the site's scripts, and fails on any uncaught exception.

    python3 scripts/check-js-runtime.py            # after a build
    python3 scripts/check-js-runtime.py --verbose  # also print clean console output

Stdlib only, like the other checks. Chrome is the single external requirement,
and it is preinstalled on GitHub's ubuntu runners.

WHAT THIS DOES NOT CATCH, so nobody reads a green run as more than it is:

- `console.error(...)` on its own. Chrome's stderr logs every console message at
  INFO regardless of the JS severity, so a deliberate error is indistinguishable
  from a `console.log`. Only *uncaught* exceptions are detectable here.
- A 404 on a script or stylesheet. Chrome reports failed subresources to
  devtools, not to stderr. scripts/check-assets.py covers that instead.
- Anything behind an interaction. search.js loads when the reader opens search,
  space-invaders.js behind a key sequence. They are covered at load-and-parse
  level by the harness page below, not as running features.
"""
from __future__ import annotations

import argparse
import http.server
import os
import re
import shutil
import socketserver
import subprocess
import sys
import tempfile
import threading
from pathlib import Path
from typing import List, Optional, Tuple

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _common import BASE_URL  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / 'public'
PORT = 8731
ORIGIN = f'http://127.0.0.1:{PORT}'

# Files whose text can name the origin. Everything else is hardlinked as-is.
TEXT_SUFFIXES = {'.html', '.js', '.css', '.json', '.xml', '.txt', '.md', '.svg'}

# Where Chrome lives, in the order worth trying. The GitHub ubuntu runners ship
# `google-chrome`; macOS keeps it inside the app bundle.
CHROME_CANDIDATES = (
    'google-chrome',
    'google-chrome-stable',
    'chromium',
    'chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
)

# One page per distinct script, plus the two that broke before. Not every page:
# 579 of them load the same four files, and a sample that covers each code path
# once is what makes this cheap enough to run on every build.
PAGES = (
    ('/', 'homepage: favorites, navigation, reading-streak, scroll'),
    ('/es/', 'homepage in Spanish'),
    ('/profile/', 'profile.js, which shipped broken'),
    ('/es/profile/', 'profile.js in Spanish'),
    ('/terminal/', 'terminal.js and the jquery.terminal vendor bundle'),
    ('/blog/', 'blog index'),
    ('/blog/people-skills/', 'post: toc, highlights, interactive-list'),
    ('/es/blog/people-skills/', 'post in Spanish'),
    ('/blog/test-driven-development/', 'widgets.js'),
    ('/readings/', 'readings index and its tag cloud'),
    ('/readings/broken-money/', 'reading post'),
    ('/topics/', 'topics grouping script'),
    ('/tags/', 'tag listing'),
    ('/series/', 'series index'),
    ('/cv/', 'cv page'),
    ('/services/consulting/', 'services carousel'),
    ('/music/', 'music index and its lazy youtube embeds'),
    ('/talks/', 'talks index'),
)

# Chrome writes console messages to stderr as:
#   [pid:tid:MMDD/HHMMSS.uuuuuu:INFO:CONSOLE:12] "text", source: URL (12)
# The message capture is non-greedy on purpose. Greedy with re.DOTALL, it ran
# from the first message to the last `", source:` in the whole stderr and handed
# back one blob, so the anchored FATAL pattern below matched nothing and every
# page passed. DOTALL stays, because a stack trace spans lines.
CONSOLE = re.compile(r':INFO:CONSOLE:\d+\]\s+"(.*?)", source: (\S+)', re.S)
# Every uncaught throw reaches the console with this prefix, whatever its type:
# ReferenceError, TypeError, SyntaxError, or an unhandled promise rejection.
FATAL = re.compile(r'^(?:Uncaught|Unhandled)\b')


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler that does not narrate every request."""

    def log_message(self, *args: object) -> None:
        pass


def find_chrome() -> str:
    for candidate in CHROME_CANDIDATES:
        found = shutil.which(candidate) or (candidate if Path(candidate).exists() else None)
        if found:
            return found
    sys.exit(
        'no Chrome or Chromium found. Install one, or set it on PATH as '
        '`google-chrome`. Tried: ' + ', '.join(CHROME_CANDIDATES)
    )


def mirror(source: Path, dest: Path) -> int:
    """Copy `source` to `dest` with the site origin repointed at the local server.

    Zola writes absolute URLs built from `base_url`, so every script tag in
    public/ reads `https://chemaclass.com/foo.js`. Serving that directory
    unchanged makes the browser load the site's assets FROM PRODUCTION: the local
    HTML shell renders, the live JS runs, and a broken local script is never
    fetched at all. The first version of this check did exactly that and passed
    19 of 19 pages with a known crash compiled into public/profile.js.

    Text files are rewritten. Everything else (images, fonts, pdfs, the slide
    decks) is hardlinked, so mirroring 131 MB costs no real copying.
    """
    count = 0
    for path in source.rglob('*'):
        target = dest / path.relative_to(source)
        if path.is_dir():
            target.mkdir(parents=True, exist_ok=True)
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        if path.suffix.lower() in TEXT_SUFFIXES:
            text = path.read_text(encoding='utf-8', errors='surrogateescape')
            if BASE_URL in text:
                count += 1
                text = text.replace(BASE_URL, ORIGIN)
            target.write_text(text, encoding='utf-8', errors='surrogateescape')
        else:
            # os.link, not Path.hardlink_to: that method landed in 3.10 and the
            # macOS system Python this repo is developed against is 3.9.
            try:
                os.link(path, target)
            except OSError:
                shutil.copy2(path, target)
    return count


def serve(directory: Path) -> socketserver.TCPServer:
    """Serve `directory` on PORT in a background thread.

    Over http rather than file://, because the pages fetch JSON (the search
    index, terminal-fs.json) and file:// makes every one of those a CORS failure
    that has nothing to do with the code under test.
    """
    handler = lambda *a, **kw: QuietHandler(*a, directory=str(directory), **kw)  # noqa: E731
    socketserver.TCPServer.allow_reuse_address = True
    server = socketserver.TCPServer(('127.0.0.1', PORT), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def visit(chrome: str, url: str) -> Tuple[List[str], List[str]]:
    """Load one URL and return (fatal messages, all console messages)."""
    result = subprocess.run(
        [
            chrome,
            '--headless',
            '--disable-gpu',
            '--no-sandbox',
            '--enable-logging=stderr',
            # Let deferred scripts, timers and fetches finish. Virtual time runs
            # as fast as the work allows, so this is a budget and not a sleep.
            '--virtual-time-budget=8000',
            '--dump-dom',
            url,
        ],
        capture_output=True,
        text=True,
        timeout=90,
    )
    messages = [text.strip() for text, _source in CONSOLE.findall(result.stderr)]
    return [m for m in messages if FATAL.search(m)], messages


def build_harness(directory: Path) -> Optional[Path]:
    """Write a page that loads every script no PAGES entry reaches.

    search.js and space-invaders.js only load once a reader opens search or types
    the key sequence, so nothing above executes them. Loading them here proves
    they parse and survive evaluation, which is weaker than exercising the
    feature and still enough to catch a syntax error or a top-level throw.
    """
    covered = {'favorites.js', 'navigation.js', 'reading-streak.js', 'scroll.js',
               'toc.js', 'highlights.js', 'interactive-list.js', 'profile.js',
               'terminal.js', 'widgets.js', 'easter-67.js'}
    rest = sorted(p.name for p in directory.glob('*.js') if p.name not in covered)
    if not rest:
        return None
    tags = '\n'.join(f'<script src="/{name}"></script>' for name in rest)
    harness = directory / '_js-harness.html'
    harness.write_text(
        f'<!doctype html><meta charset="utf-8"><title>js harness</title>\n{tags}\n',
        encoding='utf-8',
    )
    return harness


def self_test(chrome: str, directory: Path) -> None:
    """Prove the detector works here, before trusting it about the site.

    A check that cannot fail is worse than no check, and this one has three ways
    to silently pass everything: Chrome not launching on the runner, a console
    log format that changed under it, or a regex of mine that matches nothing.
    All three look exactly like a clean site. Two of them actually happened while
    this file was being written, and one of those survived a full green run of 19
    pages with a known crash compiled into the bundle.

    So: serve a page that throws on purpose, and require that it is caught. If it
    is not, the report that follows means nothing, so say that and stop rather
    than printing a screen of reassuring ok lines.
    """
    page = directory / '_js-selftest.html'
    page.write_text(
        '<!doctype html><meta charset="utf-8"><title>self test</title>\n'
        '<script>deliberatelyUndefinedFunction();</script>\n',
        encoding='utf-8',
    )
    try:
        fatal, every = visit(chrome, f'{ORIGIN}/_js-selftest.html')
    finally:
        page.unlink(missing_ok=True)

    if not fatal:
        sys.exit(
            'SELF TEST FAILED: a page that throws on purpose was reported clean, '
            'so this check cannot detect anything and a pass here proves nothing '
            'about the site.\n'
            f'  Chrome: {chrome}\n'
            f'  console messages seen: {every or "none at all, so Chrome likely never ran the page"}'
        )
    print(f'  self test: detected "{fatal[0]}"')


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--verbose', action='store_true',
                        help='print every console message, not just the failures')
    args = parser.parse_args()

    if not PUBLIC.is_dir():
        sys.exit(f'{PUBLIC} is missing. Run ./build.sh first.')

    chrome = find_chrome()
    tmp = Path(tempfile.mkdtemp(prefix='js-runtime-'))
    root = tmp / 'site'
    root.mkdir()
    rewritten = mirror(PUBLIC, root)
    print(f'Mirrored public/ with {BASE_URL} -> {ORIGIN} in {rewritten} files\n')

    harness = build_harness(root)
    server = serve(root)

    checks = list(PAGES)
    if harness:
        checks.append(('/_js-harness.html', 'scripts no page above loads'))

    failures: List[Tuple[str, List[str]]] = []
    try:
        self_test(chrome, root)
        for path, what in checks:
            url = f'http://127.0.0.1:{PORT}{path}'
            try:
                fatal, every = visit(chrome, url)
            except subprocess.TimeoutExpired:
                failures.append((path, ['Chrome did not finish loading the page in 90s']))
                print(f'  TIMEOUT  {path}')
                continue
            if fatal:
                failures.append((path, fatal))
                print(f'  FAIL     {path}  ({what})')
                for message in fatal:
                    print(f'             {message}')
            else:
                print(f'  ok       {path}')
            if args.verbose:
                for message in every:
                    print(f'             . {message}')
    finally:
        server.shutdown()
        shutil.rmtree(tmp, ignore_errors=True)

    if failures:
        print(f'\n{len(failures)} of {len(checks)} pages threw an uncaught error.')
        return 1

    print(f'\nNo uncaught errors across {len(checks)} pages.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
