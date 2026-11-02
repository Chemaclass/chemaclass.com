---
name: validate-prod
description: "Use after a deploy, or when asked whether production is healthy, to check structured data, formats, every listed URL and page weight on the live site."
x-claude:
  allowed-tools: Bash(python3 scripts/validate-prod.py:*)
---

```bash
python3 scripts/validate-prod.py           # features and page weight, about a minute
python3 scripts/validate-prod.py --full    # also sweeps every URL, about five minutes
```

Run the plain form after a deploy. Run `--full` when the change touched URLs, mirrors (`.txt` and `.md` copies), feeds or the sitemap, or when no one has swept every URL lately.

Checks, all against what the live server returns:

- features: structured data, machine-readable formats, licence and last-updated dates, on the pages that should have them.
- sweep (`--full`): every URL in the sitemap, `index.json`, both `llms.txt` files and the tag feeds must return 200.
- weight: what a browser downloads before it can first show each page type, excluding lazy images. Fails over 300KB.

The exit code is non-zero on any failure, and failures are listed again at the end. `--base http://127.0.0.1:1111` targets the local `zola serve`; the last-updated and sitemap checks need a full `./build.sh` first.

It does not run JavaScript: `scripts/check-js-runtime.py` covers that in CI.

Report each failure with the check name and printed detail. A 503 may be retried; a reported failure still needs investigation.
