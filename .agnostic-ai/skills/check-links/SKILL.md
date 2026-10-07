---
name: check-links
description: "Verify all internal links with zola check"
x-claude:
  allowed-tools: Bash(zola *)
---

# Check Internal Links

```bash
zola check --skip-external-links
```

External links are skipped by default. Many old event pages (meetup.com) no longer exist, and they fill the report with useless errors. Run plain `zola check` only when the user asks to check external URLs too.

Report any broken links found, with the file and link for each.
