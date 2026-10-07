---
name: build
description: "Build the Zola static site and report errors"
x-claude:
  allowed-tools: Bash(zola *)
---

# Build Zola Site

```bash
zola build
```

If there are errors, analyze them and suggest fixes.

Note: this is the quick error check. The production script `./build.sh` also runs Python steps that process the output and minify it (make the files smaller). A passing `zola build` does not test those steps.
