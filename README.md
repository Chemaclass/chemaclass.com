# chemaclass.com

Personal website built with [Zola](https://www.getzola.org/) — a Rust-based static site generator.

I write about tech, habits, and team behaviors at my [blog](https://chemaclass.com/blog/). You can also find my [book reading notes](https://chemaclass.com/readings/) and [talks](https://chemaclass.com/talks/).

🔗 https://chemaclass.com/

## Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/) 0.22.1+
- Python 3 (for post-build scripts)
- [minify](https://github.com/tdewolff/minify) (for production builds)

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

Runs `zola build` followed by post-build scripts that enrich the search index, generate plain-text and markdown pages, build `llms.txt`, and minify assets.

## Contributing

Pull requests are welcome. Fork the repo and submit your changes.
