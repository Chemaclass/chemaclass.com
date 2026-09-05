#!/usr/bin/env python3
"""Prove the published site is healthy: features, URLs, and page weight.

The build checks verify what goes out. This checks what is actually being
served, which is where the interesting failures have been: a shallow clone in CI
published today's date as every post's last modification, and nothing in the
build could have noticed, because the build was right.

    python3 scripts/validate-prod.py            # features + weight, ~1 min
    python3 scripts/validate-prod.py --full     # also sweeps every URL, ~5 min
    python3 scripts/validate-prod.py --base http://127.0.0.1:1111   # zola serve

Three passes:

- features: the structured data, machine formats, licence and freshness signals
  the site claims to publish, checked on the pages that carry them.
- sweep (--full): every URL the site points at, from the sitemap, index.json,
  llms.txt and the tag feeds. Anything that is not 200 is a promise the site
  is not keeping.
- weight: what a browser downloads before it can paint each page type. Lazy
  images are excluded, since they are the point of being lazy.

Stdlib only, like the rest of the build. Exits non-zero on any failure.
"""
from __future__ import annotations

import argparse
import concurrent.futures as cf
import gzip
import json
import re
import sys
import time
import urllib.error
import urllib.request
from typing import Dict, List, Optional, Tuple

DEFAULT_BASE = 'https://chemaclass.com'
UA = {'User-Agent': 'chemaclass-validate/1.0', 'Accept-Encoding': 'gzip'}
LD = re.compile(r'<script type=["\']?application/ld\+json["\']?>(.*?)</script>', re.S)
PICTURE = re.compile(r'<picture\b.*?</picture>', re.S)

failures: List[str] = []


def report(name: str, passed: bool, detail: str = '') -> bool:
    if not passed:
        failures.append(name)
    print(f'{"PASS" if passed else "FAIL"}  {name}' + (f'  |  {detail}' if detail else ''))
    return passed


def get(url: str, attempts: int = 3) -> Tuple[int, str]:
    """Fetch a page, retrying what looks like throttling rather than a fault.

    The host answers a burst of parallel requests with a 503, and the weight pass
    makes exactly that kind of burst. Reporting the next page as unreachable
    because of it teaches everyone to ignore this script.
    """
    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                raw = r.read()
                body = gzip.decompress(raw) if r.headers.get('Content-Encoding') == 'gzip' else raw
                return r.status, body.decode('utf-8', 'replace')
        except urllib.error.HTTPError as e:
            if e.code < 500 or attempt == attempts - 1:
                return e.code, ''
        except Exception:
            if attempt == attempts - 1:
                return 0, ''
        time.sleep(1 + attempt)
    return 0, ''


def weigh(url: str) -> Tuple[int, float]:
    """Transfer size and elapsed time, as the network sees them."""
    started = time.time()
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
            return len(r.read()), (time.time() - started) * 1000
    except Exception:
        return 0, 0.0


def status(url: str) -> Tuple[str, int]:
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA, method='HEAD'), timeout=40) as r:
            return url, r.status
    except urllib.error.HTTPError as e:
        return url, e.code
    except Exception:
        return url, 0


def nodes(html: str) -> List[dict]:
    out = []
    for block in LD.findall(html):
        try:
            out.append(json.loads(block))
        except json.JSONDecodeError:
            out.append({'@type': 'INVALID'})
    return out


def node(html: str, kind: str) -> Optional[dict]:
    return next((n for n in nodes(html) if n.get('@type') == kind), None)


def check_features(base: str) -> None:
    print('\n== features')
    _, post = get(f'{base}/blog/effective-pair-programming/')
    _, es_post = get(f'{base}/es/blog/effective-pair-programming/')
    _, home = get(f'{base}/')
    article = node(post, 'BlogPosting') or {}

    report('machine formats declared',
           all(x in post for x in ['text/markdown', 'index.txt', '/llms.txt', 'index.json', 'application/feed+json']))
    report('Spanish links .md and skips the English-only .txt',
           'index.md' in es_post and 'index.txt' not in es_post)
    report('no invalid JSON-LD on a post', 'INVALID' not in [n.get('@type') for n in nodes(post)])
    report('WebSite node carries an @id', (node(post, 'WebSite') or {}).get('@id') == f'{base}/#website')
    report('one Person node on the homepage',
           len([n for n in nodes(home) if n.get('@type') == 'Person']) == 1)
    report('article belongs to the site and its series',
           isinstance(article.get('isPartOf'), list) and any('#series' in p.get('@id', '') for p in article['isPartOf']))
    report('article names the entities it is about',
           isinstance(article.get('about'), list) and all(a.get('sameAs') for a in article['about']),
           f'{len(article.get("about", []))} entities')
    report('article carries the content licence', article.get('license', '').endswith('by/4.0/'))
    report('licence reaches the markdown mirror',
           'CC BY 4.0' in get(f'{base}/blog/effective-pair-programming/index.md')[1])
    report('dateModified is later than publication',
           article.get('dateModified', '')[:10] > article.get('datePublished', '')[:10],
           f'{article.get("datePublished", "")[:10]} -> {article.get("dateModified", "")[:10]}')
    report('the modified date is visible on the page too',
           'blog-post__updated' in post)
    report('section permalinks are in the HTML', post.count('heading-anchor') >= 4)
    report('summary published as an abstract',
           bool(article.get('abstract')) and article['abstract'][:40] in post)

    faq = node(post, 'FAQPage')
    report('FAQ rendered and marked up', bool(faq) and 'post-faq__question' in post)

    _, tag = get(f'{base}/tags/tdd/')
    collection = node(tag, 'CollectionPage') or {}
    report('tag page is a CollectionPage about a DefinedTerm',
           collection.get('about', {}).get('@type') == 'DefinedTerm' and collection['about'].get('sameAs'))

    _, talk = get(f'{base}/talks/phel/')
    report('talk publishes its recordings and deck',
           len([n for n in nodes(talk) if n.get('@type') == 'VideoObject']) == 2
           and node(talk, 'PresentationDigitalDocument') is not None)

    _, book = get(f'{base}/books/oeur/')
    book_node = node(book, 'Book') or {}
    report('book declares its chapters', book_node.get('numberOfPages', 0) > 30)
    report('poetry stays outside the site licence', 'license' not in book_node)

    code, index_raw = get(f'{base}/index.json')
    index = json.loads(index_raw) if code == 200 else {'entries': [], 'counts': {}}
    report('index.json is served and complete', code == 200 and index['counts'].get('total', 0) > 300,
           str(index.get('counts')))
    distinct = {e.get('modified', '')[:10] for e in index['entries']}
    report('index.json dates are real, not the deploy day', len(distinct) > 20, f'{len(distinct)} distinct dates')

    _, sitemap = get(f'{base}/sitemap.xml')
    report('sitemap pairs the languages', sitemap.count('xhtml:link') > 1000, f'{sitemap.count("xhtml:link")} links')
    report('sitemap lists page images', sitemap.count('<image:image>') > 100, f'{sitemap.count("<image:image>")}')
    report('llms.txt carries the generated index',
           len(re.findall(r'^- `\d{4}', get(f'{base}/llms.txt')[1], re.M)) > 150)
    report('IndexNow key is reachable',
           bool(re.fullmatch(r'[0-9a-f]{32}\s*', get(f'{base}/indexnow-key.txt')[1])))


def sweep(urls: List[str], label: str) -> None:
    with cf.ThreadPoolExecutor(8) as pool:
        results = list(pool.map(status, urls))
    bad = [(u, c) for u, c in results if c != 200]
    if bad:
        # A 503 here is the host throttling a fast sweep, not a broken page.
        retried = []
        for url, _ in bad:
            time.sleep(0.4)
            retried.append(status(url))
        bad = [(u, c) for u, c in retried if c != 200]
    report(f'{label} ({len(urls)} URLs)', not bad, f'{len(bad)} not 200 {bad[:3] if bad else ""}')


def check_sweep(base: str) -> None:
    print('\n== every URL the site points at')
    _, sitemap = get(f'{base}/sitemap.xml')
    sweep(re.findall(r'<loc>(.*?)</loc>', sitemap), 'sitemap pages')
    sweep(sorted(set(re.findall(r'<image:loc>(.*?)</image:loc>', sitemap))), 'sitemap images')

    index = json.loads(get(f'{base}/index.json')[1])
    sweep([e['url'] for e in index['entries']], 'index.json pages')
    sweep([e['markdown'] for e in index['entries']], 'markdown mirrors')
    sweep([e['text'] for e in index['entries'] if 'text' in e], 'text mirrors')

    tags = [u for u in re.findall(r'<loc>(.*?)</loc>', sitemap) if re.search(r'/tags/[^/]+/$', u)]
    sweep([u + 'atom.xml' for u in tags], 'tag feeds')

    # Every JSON-LD node, robots.txt, llms.txt and humans.txt point at these.
    # They 404'd in production for a month because GitHub Pages drops dot
    # directories without a .nojekyll, and nothing here was looking.
    sweep([f'{base}/.well-known/ai.txt', f'{base}/.well-known/security.txt'],
          'well-known files')

    for path in ('/llms.txt', '/es/llms.txt'):
        links = sorted(set(re.findall(r'\]\((https?://\S+?)\)', get(base + path)[1])))
        sweep(links, f'links in {path}')


def eager_assets(html: str, base: str) -> List[str]:
    """What the preload scanner starts before the reader scrolls anywhere."""
    def absolute(url: str) -> str:
        url = url.replace('&#x2F;', '/')
        return url if url.startswith('http') else base + url

    urls = set()
    for match in re.finditer(r'<(?:script|link)[^>]+(?:src|href)=["\']?([^"\'\s>]+)', html):
        if match.group(1).endswith(('.js', '.css', '.woff2')):
            urls.add(absolute(match.group(1)))

    rest = html
    for block in PICTURE.findall(html):
        rest = rest.replace(block, '')
        img = re.search(r'<img\b[^>]*>', block)
        if img and 'lazy' in img.group(0):
            continue  # the whole picture defers with its img
        source = re.search(r'(?:srcset|src)=["\']?([^"\'\s>]+)', block)
        if source:
            urls.add(absolute(source.group(1)))

    for tag in re.findall(r'<img\b[^>]*>', rest):
        if 'lazy' in tag:
            continue
        src = re.search(r'src=["\']?([^"\'\s>]+)', tag)
        if src and (src.group(1).startswith(('/', base)) or '&#x2F;' in src.group(1)):
            urls.add(absolute(src.group(1)))
    return sorted(urls)


# What a page type is allowed to weigh before first paint, in KB. Set a little
# above where they sit today, so this fails on a regression rather than on noise.
WEIGHT_BUDGET_KB = 300

PAGE_TYPES: Dict[str, str] = {
    'homepage': '/',
    'blog post': '/blog/effective-pair-programming/',
    'blog index': '/blog/',
    'reading': '/readings/meditations/',
    'tag page': '/tags/tdd/',
}


def check_weight(base: str) -> None:
    print('\n== first-paint weight')
    print(f'{"page":13} {"html":>7} {"first paint":>12} {"requests":>9} {"latency":>8}')
    for name, path in PAGE_TYPES.items():
        code, html = get(base + path)
        if code != 200:
            report(f'{name} reachable', False, f'HTTP {code}')
            continue
        html_bytes, elapsed = weigh(base + path)
        assets = eager_assets(html, base)
        with cf.ThreadPoolExecutor(8) as pool:
            asset_bytes = sum(size for size, _ in pool.map(weigh, assets))
        total_kb = (html_bytes + asset_bytes) / 1024
        print(f'{name:13} {html_bytes/1024:6.1f}K {total_kb:11.1f}K {len(assets)+1:9} {elapsed:7.0f}ms')
        report(f'{name} paints under {WEIGHT_BUDGET_KB}KB', total_kb < WEIGHT_BUDGET_KB, f'{total_kb:.0f}KB')


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument('--base', default=DEFAULT_BASE, help='origin to validate')
    parser.add_argument('--full', action='store_true', help='also sweep every URL the site points at')
    args = parser.parse_args()
    base = args.base.rstrip('/')

    print(f'Validating {base}')
    check_features(base)
    if args.full:
        check_sweep(base)
    check_weight(base)

    if failures:
        print(f'\n{len(failures)} check(s) failed:')
        for name in failures:
            print(f'  - {name}')
        return 1
    print('\nEverything checked is healthy')
    return 0


if __name__ == '__main__':
    sys.exit(main())
