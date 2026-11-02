---
name: optimize-ui
description: "Use for any UI, styling or design work on templates or sass files, against the site's tokens, shadows and easing."
x-claude:
  allowed-tools: Read, Edit, Write, Glob, Grep, Bash(zola build)
argument-hint: "[component or page]"
---

Target: the component, page or area in the arguments (for example "blog cards", "homepage hero", "dark mode", "mobile nav"). With none, review the whole site. Tokens, breakpoints and patterns: [reference.md](reference.md).

Direction: clean editorial, like a well-made journal, not a flashy agency site.

- Small effects: cards lift 2-3px on hover, not 6px.
- Depth through the shadow tokens, never one-off values.
- `--ease-out-expo` for elements users click or hover.
- Frosted glass on fixed or sticky elements (the header).
- Tight letter-spacing on headings, generous line-height on body text.
- Respect `prefers-reduced-motion` (set globally) and keep enough color contrast.

Workflow:

1. Read the target SCSS and templates, and `reference.md`.
2. Find inconsistent token use, hardcoded values, missing hover states, accessibility problems, unbalanced layout.
3. Fix with design-system tokens; keep changes small and leave working code alone.
4. Run `zola build`; it must pass.

Rules:

- Use CSS custom properties from `_variables.scss`; never hardcode colors.
- Use `--shadow-sm/md/lg`; never write a one-off `box-shadow`.
- Use `var(--preview-divider-color)` for borders, never hardcoded grays.
- Keep light and dark mode working; check both.
