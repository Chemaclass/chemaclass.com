---
target: codex
---

- A copy change touches the English file and its Spanish `.es.md` file in the same commit.
- No em dash (U+2014) or en dash (U+2013) in content, templates, i18n data, or commit text.
- Code that reads or writes build output belongs in a `scripts/` step of `./build.sh`, not in a template.
- Text in templates lives in `config.toml` translations or `data/i18n/<page>.toml`, never hardcoded per language.
- In-article images stay within 1200px and 300KB unless `scripts/image-budget-baseline.txt` lists them with a reason.
- An edited `static/slides/<slug>/deck.md` ships with its rebuilt `index.html`.
