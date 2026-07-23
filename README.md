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

Runs `zola build`, then the `scripts/` post-processors: enrich the search index and sitemap with dates, generate the terminal filesystem, the plain-text and Markdown page mirrors, `llms-full.txt`, and the JSON feed, then minify HTML, CSS, and JS.

## Project structure

```
content/     Blog posts, readings, talks (Markdown, EN + colocated .es)
templates/   Tera templates
sass/        SCSS, compiled by Zola
static/      Images, JS, fonts, and served metadata (llms.txt, robots.txt, ...)
scripts/     Python post-build processors (shared helpers in _common.py)
config.toml  Zola config, i18n strings, and site data
```

## Contributing

Issues and typo/bug-fix PRs are welcome. Content contributions to blog posts, readings, or talks are unlikely to be merged.

## License

Dual-licensed:

- **Code** (templates, stylesheets, scripts, configuration): [MIT](LICENSE)
- **Content** (`content/**`: blog posts, readings, talks, CV): [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

See [LICENSE](LICENSE) for full terms.
