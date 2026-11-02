---
name: build
description: "Use to build the Zola site and report errors."
x-claude:
  allowed-tools: Bash(zola *)
---

# Build Zola Site

```bash
zola build
```

If there are errors, analyze them and suggest fixes.

This is the quick check. `./build.sh` also runs the Python steps and minification, which a passing `zola build` does not test.
