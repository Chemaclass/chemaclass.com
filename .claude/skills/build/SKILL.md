---
name: build
description: "Build the Zola static site and report errors"
allowed-tools: Bash(zola *)
---

# Build Zola Site

```bash
zola build
```

If there are errors, analyze them and suggest fixes.

Note: this is the fast error check. The production `./build.sh` also runs python post-processing and minify steps that a green `zola build` does not exercise.
