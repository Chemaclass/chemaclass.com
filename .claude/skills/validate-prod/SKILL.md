---
name: validate-prod
description: "Check the live site: structured data, machine formats, every URL it points at, and first-paint weight. Use after a deploy, or when asked whether production is healthy."
allowed-tools: Bash(python3 scripts/validate-prod.py:*)
---

# Validate production

```bash
python3 scripts/validate-prod.py           # features + page weight, about a minute
python3 scripts/validate-prod.py --full    # also sweeps every URL, about five minutes
```

Run the plain form after a deploy. Run `--full` when the change touched URLs,
mirrors, feeds or the sitemap, or when nobody has swept in a while.

Three passes, all against what is actually being served:

- **features**: the structured data, machine formats, licence and freshness
  signals the site claims to publish, checked on the pages that carry them.
- **sweep** (`--full`): every URL in the sitemap, `index.json`, both `llms.txt`
  files and the tag feeds. Anything not 200 is a promise the site is not keeping.
- **weight**: what a browser downloads before it can paint each page type, lazy
  images excluded. Fails over 300KB.

Exit code is non-zero when anything fails, and the failures are listed again at
the end.

`--base http://127.0.0.1:1111` points it at `zola serve` instead, though the
freshness and sitemap checks want a full `./build.sh` to have run.

## What it does not cover

Anything a browser has to execute: `scripts/check-js-runtime.py` covers that,
and it runs in CI. This checks the bytes, not the behaviour.

Report failures with the check name and the detail it printed. A single
throttled 503 during a sweep is retried once before being called a failure, so a
reported failure is real.
