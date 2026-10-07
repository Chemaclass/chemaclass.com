---
name: optimize-ui
description: "Review and improve visual design with the site's design system: SCSS tokens (named values), shadows and easing (animation curves). Use for any UI, styling, or design work on templates or sass files."
x-claude:
  allowed-tools: Read, Edit, Write, Glob, Grep, Bash(zola build)
argument-hint: "[component or page]"
---

# Optimize UI

Review and improve the visual design of chemaclass.com components, pages, or the overall design system.

## Arguments

The user provides a target: a specific component, page, or area to optimize (e.g., "blog cards", "homepage hero", "dark mode", "mobile nav"). If no target is given, review the whole site.

## Design Direction

**Style:** A clean editorial look: professional, deliberate, with quiet polish. It should feel like a well-made journal, not a flashy agency site.

**Principles:**
- Small effects over big ones (on hover, cards move up 2-3px, not 6px)
- Show depth (elevation) with the shadow tokens, not one-off values
- Spring-like easing (`--ease-out-expo`) for elements users click or hover
- A frosted-glass effect (glass-morphism) on fixed or sticky elements (the header)
- Tight letter-spacing on headings, large line-height on body text
- Accessibility: respect `prefers-reduced-motion`, keep enough color contrast

## Design System Reference

See [reference.md](reference.md) for the full design system (tokens, breakpoints, patterns).

## Workflow

1. **Read** the target SCSS file(s) and related template(s)
2. **Read** [reference.md](reference.md) for design tokens
3. **Find** issues: tokens used inconsistently, hardcoded values, missing hover states, accessibility problems, unbalanced layout
4. **Apply** fixes using the design system tokens - never add new hardcoded colors or shadows
5. **Verify** with `zola build` - it must build without errors

## Rules

- Always use CSS custom properties from `_variables.scss` - never hardcode colors
- Always use `--shadow-sm/md/lg` - never write one-off `box-shadow` values
- Always use `--ease-out-expo` for card/lift transitions
- Always use `var(--preview-divider-color)` for borders, never hardcoded grays
- Keep light and dark mode working - test changes in both
- Respect `prefers-reduced-motion` (already set globally)
- Keep changes small and focused - don't rewrite code that works
