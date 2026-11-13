# chemaclass.com

Personal website built with [Zola](https://www.getzola.org/), a static site generator written in Rust.

I write about tech, habits, and team behaviors at my [blog](https://chemaclass.com/blog/). You can also find my [book reading notes](https://chemaclass.com/readings/) and [talks](https://chemaclass.com/talks/).

🔗 https://chemaclass.com/

## Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/) 0.23.6 or newer
- Python 3 (standard library only, for the build scripts)
- [minify](https://github.com/tdewolff/minify) (production builds only)

### Zola version

The templates use Tera 2 components, including implicit params (`@lang`).
These came in Zola 0.23.6, so any older version fails the build. `build.sh`
(`ZOLA_VERSION`) and the deploy workflow both fix the version at 0.23.6.
`build.sh` stops if your local Zola is older.

If Homebrew still has an older release, install the binary by hand:

```bash
curl -sSL https://github.com/getzola/zola/releases/download/v0.23.6/zola-v0.23.6-aarch64-apple-darwin.tar.gz | tar -xz
mv zola ~/.local/bin/zola   # any directory on your PATH
zola --version              # zola 0.23.6
```

Use `x86_64-apple-darwin` on Intel, `x86_64-unknown-linux-gnu` on Linux.

## Development

```bash
git clone https://github.com/Chemaclass/chemaclass.com.git
cd chemaclass.com
zola serve
```

Open [http://localhost:1111](http://localhost:1111) in your browser.

### Sponsor payment methods

Enable or disable the existing methods in `config.toml`, then rebuild and deploy:

```toml
[extra.sponsor]
paypal_enabled = true
lightning_enabled = false
```

These switches apply to the sponsor page in both languages and to its donation metadata.
If both methods are on, they show side by side (one above the other on mobile).
If only one is on, it is centered.
If both are off, the page asks readers to share articles or help with projects instead.

## Production build

```bash
./build.sh
```

This runs `zola build` with the Python scripts in `scripts/` around it. Two run before the build: they check the i18n files and work out when each page was last edited. The rest run after it. They check icons, tags, assets, and image sizes. They add dates to the search index and the sitemap. They generate the terminal page files, plain-text and Markdown copies of each page, `llms.txt`, the JSON feed, and `/index.json`. Last, they minify (shrink) the HTML, CSS, and JS. The full list, in order, is under "Build Steps" in `.agnostic-ai/AGNOSTIC_AI.md`.

## Smoke test

`zola build` never runs the site's JavaScript. So a script can have valid syntax, crash on its first line, and the build still passes. That is how a broken `profile.js` reached production. Every visitor saw only the loading placeholder.

```bash
./build.sh
python3 scripts/check-js-runtime.py
```

It serves `public/` on your machine. It loads 18 pages, which together cover every script on the site, in headless Chrome (Chrome with no window). It fails on any uncaught error. It needs Chrome, so it runs as its own CI step and not inside `build.sh`. `build.sh` must work on any machine with Zola, Python and minify. The check takes about 45 seconds.

Every run starts with a page that throws an error on purpose, and the check must catch it. A checker like this can pass everything without telling you, in several ways: Chrome does not start, the log format changes, or a regex matches nothing. Each of these looks the same as a site with no errors. So a pass only means something after the checker has shown that it can fail.

Read the comment at the top of the script before you trust a passing run. The check cannot see a plain `console.error`, a 404 on a file the page loads (an image, a script, a style), or anything that only happens after a click.

## Icons

The site ships a Font Awesome subset: only the ~100 icons it uses. The script cuts them from the untouched original release in `tools/fontawesome/` and writes them to `static/`. The full set is 397 KB, the subset is 39 KB.

After adding or removing an `fa-*` class, regenerate it and commit the result:

```bash
pip install fonttools brotli
python3 scripts/subset-fontawesome.py
```

If you forget, nothing breaks in production. `./build.sh` runs `scripts/check-icons.py`, which fails the build when a page uses an icon class that the subset does not have.

## Project structure

```
content/     Blog posts, readings, talks (Markdown, EN + colocated .es)
templates/   Tera templates
sass/        SCSS, compiled by Zola
static/      Images, JS, fonts, and served metadata (llms.txt, robots.txt, ...)
scripts/     Python build scripts run by build.sh (shared helpers in _common.py)
docs/        Notes on how the site is written and released
tools/       Untouched vendor sources the build cuts down (Font Awesome)
config.toml  Zola config, i18n strings, and site data
```

## Writing

File layout, drafts, and how to publish a post on a chosen day:
[docs/publishing.md](docs/publishing.md).

## Contributing

Issues and PRs that fix a typo or a bug are welcome. Changes to the content of blog posts, readings, or talks will most likely not be merged.

## License

Two licenses:

- **Code** (templates, stylesheets, scripts, configuration): [MIT](LICENSE)
- **Content** (`content/**`: blog posts, readings, talks, CV): [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

See [LICENSE](LICENSE) for full terms.
