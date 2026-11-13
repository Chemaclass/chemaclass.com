#!/usr/bin/env python3
"""Check shared UI rendering in Chrome and save footer screenshots for review.

Run after ./build.sh. These checks cover layout and glyphs, not pixel equality.
"""
from __future__ import annotations

import argparse
import html
import importlib.util
import json
import re
import subprocess
import tempfile
from pathlib import Path


RUNTIME_PATH = Path(__file__).with_name('check-js-runtime.py')
SPEC = importlib.util.spec_from_file_location('js_runtime', RUNTIME_PATH)
runtime = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(runtime)

PAGES = ('/', '/blog/', '/blog/people-skills/', '/cv/')
# Headless Chrome on macOS enforces a 500px minimum window width.
WIDTHS = (500, 1280)
PROBE = r"""
<script>
window.addEventListener('load', () => {
  document.documentElement.classList.toggle('theme-dark', __DARK__);
  document.documentElement.setAttribute('color-theme', __DARK__ ? 'dark' : 'light');
  const style = document.createElement('style');
  style.textContent = '* { animation: none !important; transition: none !important; scroll-behavior: auto !important; }';
  document.head.append(style);
  setTimeout(async () => {
    document.querySelectorAll('.page-footer__social-link i').forEach(icon => icon.getBoundingClientRect());
    await document.fonts.ready;
    const errors = [];
    const visible = el => el && el.checkVisibility({checkOpacity: true, checkVisibilityCSS: true}) && el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0;
    const inside = el => {
      const rect = el.getBoundingClientRect();
      return rect.left >= -1 && rect.right <= innerWidth + 1;
    };
    if (__BROKEN__ === 'fonts') {
      [...document.styleSheets].filter(sheet => sheet.href && sheet.href.includes('fontawesome')).forEach(sheet => {
        for (let index = sheet.cssRules.length - 1; index >= 0; index--) {
          if (sheet.cssRules[index].type === CSSRule.FONT_FACE_RULE) sheet.deleteRule(index);
        }
      });
    }
    if (__BROKEN__ === true) {
      document.querySelectorAll('link[href*="fontawesome"]').forEach(el => el.remove());
      document.querySelector('.site-header').style.display = 'none';
      const wide = document.createElement('div');
      wide.style.cssText = 'width:3000px;min-width:3000px;height:1px;position:absolute;left:0';
      document.body.append(wide);
      document.documentElement.style.overflowX = 'visible';
      document.body.style.overflowX = 'visible';
    }
    if (!visible(document.querySelector('.site-header')) || !visible(document.querySelector('.header-left'))) errors.push('header is hidden');
    const search = document.querySelector('.search-trigger');
    if (!visible(search) || !inside(search)) errors.push('search control is hidden or clipped');
    const menu = document.querySelector('.hamburger');
    const mobile = matchMedia('(max-width: 600px)').matches;
    if (mobile) {
      if (!visible(menu) || !inside(menu)) errors.push('mobile menu control is hidden or clipped');
      menu.click();
      if (menu.getAttribute('aria-expanded') !== 'true') errors.push('mobile menu did not open: aria-expanded=' + menu.getAttribute('aria-expanded'));
    }
    setTimeout(async () => {
      const links = [...document.querySelectorAll('.nav-links > a')];
      if (links.length < 3 || links.some(el => !visible(el) || !inside(el))) errors.push('navigation links are hidden or clipped');
      if (mobile) {
        menu.click();
        if (menu.getAttribute('aria-expanded') !== 'false' || links.some(visible)) errors.push('mobile menu did not close');
      }
      if (Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth + 1) errors.push('page overflows horizontally');
      const footer = document.querySelector('.page-footer');
      if (!visible(footer)) errors.push('footer is hidden');
      const icons = [...document.querySelectorAll('.page-footer__social-link i')];
      icons.forEach(icon => icon.getBoundingClientRect());
      await document.fonts.ready;
      if (icons.length !== 4) errors.push('expected four footer icons');
      icons.forEach(icon => {
        const css = getComputedStyle(icon, '::before');
        const glyph = css.content;
        const family = css.fontFamily.replace(/["']/g, '').toLowerCase();
        const loadedFace = [...document.fonts].some(face => face.family.replace(/["']/g, '').toLowerCase() === family && face.status === 'loaded' && face.weight === css.fontWeight);
        if (!visible(icon) || !inside(icon) || !glyph || ['none', 'normal', '""'].includes(glyph) || !family.includes('font awesome') || !loadedFace || !document.fonts.check(css.fontWeight + ' ' + css.fontSize + ' ' + css.fontFamily, glyph.slice(1, -1))) errors.push('footer icon is missing: ' + icon.className);
      });
      const footerLinks = [...document.querySelectorAll('.page-footer__list a')];
      if (!footerLinks.length || footerLinks.some(el => !visible(el) || !inside(el))) errors.push('footer links are hidden or clipped');
      const result = document.createElement('script');
      result.id = 'visual-results';
      result.type = 'application/json';
      result.textContent = JSON.stringify({errors, width: innerWidth, dark: document.documentElement.classList.contains('theme-dark')});
      document.body.append(result);
      style.textContent += 'body > :not(.page-footer) { display: none !important; } .page-footer { margin-top: 0 !important; }';
    }, 100);
  }, 1500);
});
</script>
"""


def visit(chrome, root, page, width, dark, screenshots, broken=False):
    source = root / page.lstrip('/') / 'index.html'
    name = (page.strip('/').replace('/', '-') or 'home') + f'-{width}-' + ('dark' if dark else 'light')
    probe = PROBE.replace('__DARK__', json.dumps(dark)).replace('__BROKEN__', json.dumps(broken))
    target = root / '_visual-probe.html'
    target.write_text(source.read_text(encoding='utf-8') + probe, encoding='utf-8')
    command = [chrome, '--headless', '--disable-gpu', '--no-sandbox',
               '--run-all-compositor-stages-before-draw', '--disable-threaded-scrolling',
               '--hide-scrollbars', f'--window-size={width},1000',
               '--virtual-time-budget=8000', '--dump-dom']
    if screenshots and not broken:
        command.append(f'--screenshot={screenshots / (name + ".png")}')
    with tempfile.TemporaryDirectory(prefix='visual-chrome-') as profile:
        result = subprocess.run(command + [f'--user-data-dir={profile}', runtime.ORIGIN + '/_visual-probe.html'],
                                capture_output=True, text=True, timeout=45)
    found = re.search(r'<script id="visual-results" type="application/json">(.*?)</script>', result.stdout)
    if result.returncode or not found:
        raise RuntimeError(f'Chrome did not return rendering results for {page}: {result.stderr[-500:]}')
    report = json.loads(html.unescape(found.group(1)))
    if report['width'] != width or report['dark'] != dark:
        raise RuntimeError(f'Chrome used the wrong viewport or theme: {report}')
    return report['errors']


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--screenshots', type=Path, help='save one footer screenshot per page, theme and viewport')
    args = parser.parse_args()
    if not runtime.PUBLIC.is_dir():
        parser.error('public/ is missing. Run ./build.sh first.')
    screenshots = args.screenshots.resolve() if args.screenshots else None
    if screenshots:
        screenshots.mkdir(parents=True, exist_ok=True)
    chrome = runtime.find_chrome()
    failures = 0
    with tempfile.TemporaryDirectory(prefix='visual-regressions-') as tmp:
        root = Path(tmp)
        runtime.mirror(runtime.PUBLIC, root)
        server = runtime.serve(root)
        try:
            broken = visit(chrome, root, '/cv/', 1280, False, None, broken=True)
            for expected in ('header is hidden', 'footer icon is missing', 'page overflows horizontally'):
                if not any(expected in error for error in broken):
                    raise RuntimeError(f'Self test did not detect {expected}: {broken}')
            missing_faces = visit(chrome, root, '/cv/', 1280, False, None, broken='fonts')
            if sum('footer icon is missing' in error for error in missing_faces) != 4:
                raise RuntimeError(f'Self test did not detect missing font faces: {missing_faces}')
            print('Self test detected missing icons, hidden navigation and overflow.', flush=True)
            for prefix in ('', '/es'):
                for path in PAGES:
                    page = prefix + path
                    for width in WIDTHS:
                        for dark in (False, True):
                            errors = visit(chrome, root, page, width, dark, screenshots)
                            label = f'{page} {width}px {"dark" if dark else "light"}'
                            if errors:
                                failures += 1
                                print(f'FAIL {label}: {"; ".join(errors)}', flush=True)
                            else:
                                print(f'ok   {label}', flush=True)
        finally:
            server.shutdown()
            server.server_close()
    print(f'{failures} rendering failures across 32 page, theme and viewport combinations.')
    return int(failures > 0)


if __name__ == '__main__':
    raise SystemExit(main())
