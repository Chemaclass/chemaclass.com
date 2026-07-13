---
name: serve
description: "Start the Zola dev server for local preview"
allowed-tools: Bash(zola *)
---

# Serve Zola Site Locally

Start the Zola development server from the project root, in the background, so the user can preview the site at http://127.0.0.1:1111

```bash
zola serve
```

If port 1111 is already in use, a server is likely running; tell the user instead of starting another.
