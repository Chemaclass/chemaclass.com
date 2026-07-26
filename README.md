# chemaclass.com

Personal website built with [Zola](https://www.getzola.org/), a Rust-based static site generator.

I write about tech, habits, and team behaviors at my [blog](https://chemaclass.com/blog/). You can also find my [book reading notes](https://chemaclass.com/readings/) and [talks](https://chemaclass.com/talks/).

🔗 https://chemaclass.com/

## Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/) 0.22.1+
- Python 3 (standard library only, for the post-build scripts)
- [minify](https://github.com/tdewolff/minify) (production builds only)

## Development

```bash
git clone https://github.com/Chemaclass/chemaclass.com.git
cd chemaclass.com
zola serve
```

Open [http://localhost:1111](http://localhost:1111) in your browser.

## Production build

```bash
./build.sh
```

Runs `zola build`, then the `scripts/` post-processors: check the icon subset and the topic tag coverage, enrich the search index and sitemap with dates, generate the terminal filesystem, the plain-text and Markdown page mirrors, `llms-full.txt`, and the JSON feed, then minify HTML, CSS, and JS.

## Smoke test

`zola build` never runs the site's JavaScript, so a script that parses fine and dies on its first line still produces a green build. That is how a broken `profile.js` reached production and left every visitor looking at a loading skeleton.

```bash
./build.sh
python3 scripts/check-js-runtime.py
```

It serves `public/` locally, loads 18 pages covering each of the site's scripts in headless Chrome, and fails on any uncaught exception. Needs Chrome, which is why it runs as its own CI step rather than inside `build.sh`: that script has to work anywhere with Zola, Python and minify. Takes about 45 seconds.

Every run starts by loading a page that throws on purpose and requiring that it be caught. A checker like this has several ways to silently pass everything (Chrome not launching, a changed log format, a regex that matches nothing), and all of them look identical to a clean site, so a pass is only worth reading after the detector has proved it can fail.

Read the module docstring before trusting a green run. It cannot see a bare `console.error`, a 404 on a subresource, or anything behind a click.

## Icons

The site ships a Font Awesome subset: only the ~100 icons actually used, cut from the pristine release in `tools/fontawesome/` into `static/`. Full set is 397 KB, the subset is 39 KB.

After adding or removing an `fa-*` class, regenerate it and commit the result:

```bash
pip install fonttools brotli
python3 scripts/subset-fontawesome.py
```

Forgetting is safe: `./build.sh` runs `scripts/check-icons.py`, which fails the build on an icon class the subset does not carry.

## Project structure

```
content/     Blog posts, readings, talks (Markdown, EN + colocated .es)
templates/   Tera templates
sass/        SCSS, compiled by Zola
static/      Images, JS, fonts, and served metadata (llms.txt, robots.txt, ...)
scripts/     Python post-build processors (shared helpers in _common.py)
docs/        Notes on how the site is written and released
tools/       Pristine vendor sources the build cuts down (Font Awesome)
config.toml  Zola config, i18n strings, and site data
```

## Writing

File layout, drafts, and how to land a post on a chosen day:
[docs/publishing.md](docs/publishing.md).

## Contributing

Issues and typo/bug-fix PRs are welcome. Content contributions to blog posts, readings, or talks are unlikely to be merged.

## License

Dual-licensed:

- **Code** (templates, stylesheets, scripts, configuration): [MIT](LICENSE)
- **Content** (`content/**`: blog posts, readings, talks, CV): [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

See [LICENSE](LICENSE) for full terms.
