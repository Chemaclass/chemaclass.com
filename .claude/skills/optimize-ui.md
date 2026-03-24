---
description: "Analyze and improve visual design using the site's design system"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash(zola build)
argument-hint: "[component or page]"
---

# Optimize UI

Analyze and improve the visual design of chemaclass.com components, pages, or the overall design system. This skill knows the site's SCSS architecture, design tokens, and aesthetic direction.

## Arguments

The user provides a target: a specific component, page, or area to optimize (e.g., "blog cards", "homepage hero", "dark mode", "mobile nav"). If no target is given, perform a general audit.

## Design Direction

**Aesthetic:** Refined editorial - professional, intentional, understated polish. Think well-crafted journal, not flashy agency site.

**Principles:**
- Subtle over dramatic (hover lifts of 2-3px, not 6px)
- Consistent elevation through shadow tokens, not ad-hoc values
- Spring-like easing (`--ease-out-expo`) for interactive elements
- Glass-morphism on fixed/sticky elements (header)
- Tight letter-spacing on headings, generous line-height on body
- Accessibility: respect `prefers-reduced-motion`, maintain contrast ratios

## Design System Reference

See [reference.md](optimize-ui/reference.md) for the full design system (tokens, breakpoints, patterns).

## Workflow

1. **Read** the target SCSS file(s) and related template(s)
2. **Read** [reference.md](optimize-ui/reference.md) for design tokens
3. **Identify** issues: inconsistent tokens, hardcoded values, missing hover states, accessibility gaps, visual imbalance
4. **Apply** fixes using the design system tokens - never introduce new hardcoded colors/shadows
5. **Verify** with `zola build` - must compile without errors
6. **Summarize** changes concisely

## Rules

- Always use CSS custom properties from `_variables.scss` - never hardcode colors
- Always use `--shadow-sm/md/lg` - never write ad-hoc `box-shadow` values
- Always use `--ease-out-expo` for card/lift transitions
- Always use `var(--preview-divider-color)` for borders, never hardcoded grays
- Maintain both light and dark mode - test changes mentally against both
- Respect `prefers-reduced-motion` (already set globally)
- Keep changes minimal and targeted - don't refactor what isn't broken
- Run `zola build` after changes to verify compilation
