---
name: validate-prod
description: "Check the live site: structured data, machine-readable formats, every URL it links to, and how much a page loads before it first shows. Use after a deploy, or when asked whether production is healthy."
x-claude:
  allowed-tools: Bash(python3 scripts/validate-prod.py:*)
---

# Validate production

```bash
python3 scripts/validate-prod.py           # features + page weight, about a minute
python3 scripts/validate-prod.py --full    # also sweeps every URL, about five minutes
```

Run the plain form after a deploy. Run `--full` when the change touched URLs,
mirrors (the `.txt` and `.md` copies of pages), feeds or the sitemap, or when
nobody has checked every URL for a while.

It runs three checks, all against what the live server returns:

- **features**: the structured data, machine-readable formats, licence and
  last-updated dates the site says it publishes. Each is checked on the pages
  that should have it.
- **sweep** (`--full`): every URL in the sitemap, `index.json`, both `llms.txt`
  files and the tag feeds. Any URL that does not return 200 is a failure: the
  site lists it, but it does not work.
- **weight**: how much a browser downloads before it can first show each type of
  page, not counting images that load later (lazy images). Fails over 300KB.

Exit code is non-zero when anything fails, and the failures are listed again at
the end.

`--base http://127.0.0.1:1111` runs it against the local `zola serve` instead.
The last-updated date and sitemap checks need a full `./build.sh` run first.

## What it does not cover

Anything a browser has to run, like JavaScript: `scripts/check-js-runtime.py`
checks that, and it runs in CI. This script checks the files the server sends,
not how the page behaves.

Report failures with the check name and the detail it printed. During a sweep,
a single 503 caused by rate limiting is retried once before it counts as a
failure. So a reported failure is real.
