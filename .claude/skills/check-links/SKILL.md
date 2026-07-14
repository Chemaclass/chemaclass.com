---
name: check-links
description: "Verify all internal links with zola check"
allowed-tools: Bash(zola *)
---

# Check Internal Links

```bash
zola check --skip-external-links
```

External links are skipped by default: many old event pages (meetup.com) are dead and drown the report in noise. Run plain `zola check` only when explicitly asked to verify external URLs too.

Report any broken links found, with the file and link for each.
