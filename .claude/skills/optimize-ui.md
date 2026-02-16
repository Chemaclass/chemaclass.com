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

### SCSS Architecture (SMACSS-inspired)

```
sass/
  abstracts/_variables.scss    # CSS custom properties, breakpoints, layout vars
  abstracts/_mixins.scss       # Card color mixins, animations
  base/_global.scss            # Box model, images, smooth scroll
  base/_typography.scss        # Font stack, headings, links, blockquotes, code
  base/_reset.scss             # Normalize overrides
  layouts/_header.scss         # Sticky header with glass-morphism
  layouts/_footer.scss         # Site footer, page footer
  layouts/_post.scss           # Blog post layout, reading progress, navigation
  layouts/_taxonomy.scss       # Tag/category pages
  components/                  # Reusable UI modules (buttons, tables, dialog, etc.)
  pages/                       # Page-specific styles (homepage, blog, readings, etc.)
  themes/_light.scss           # Light theme overrides
  themes/_dark.scss            # Dark theme overrides
  utils/_responsive.scss       # Responsive utilities
```

### Color Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--accent-color` | `#2d5a8e` | `#5da8e5` | Primary accent, links, buttons |
| `--accent-color-light` | `#3574b8` | `#e8edf2` | Hover states, borders |
| `--accent-overlay-color` | `#3574b8` | `#6cb4ee` | Link hover color |
| `--body-bg` | `#f7f8fa` | `#1a1d21` | Page background |
| `--body-color` | `#2a2d32` | `#e4e6ea` | Body text |
| `--heading-color` | `#14171a` | `#f0f1f3` | Headings |
| `--color-subtitle` | `#5a6370` | `#9ba3ae` | Secondary text |
| `--preview-divider-color` | `#e2e5ea` | `#2e3238` | Borders, dividers |
| `--search-input-bg` | `#fff` | `#22262b` | Card/input backgrounds |
| `--search-bg-selected-item` | `#f5f6f8` | `#282d33` | Hover backgrounds |

### Shadow Tokens

```scss
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.03);
--shadow-md: 0 2px 8px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
--shadow-lg: 0 4px 12px rgba(0,0,0,0.08), 0 8px 28px rgba(0,0,0,0.06);
```

Dark mode shadows use higher opacity (0.2-0.3 range).

### Easing

```scss
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);  // Spring-like for card hovers, lifts
```

### Typography

- **Font:** Rubik (400, 500) with system-ui fallback
- **Body:** 18px / 1.7 line-height
- **Headings:** weight 500, `letter-spacing: -0.01em`
- **Font smoothing:** antialiased on both webkit and moz
- **Inline code:** 0.88em, 4px border-radius, subtle bg
- **Pre blocks:** 10px border-radius, `--shadow-sm`

### Breakpoints

```scss
$breakpoint-small-phone: 465px;
$breakpoint-phone: 600px;        // Hamburger menu, fixed header
$breakpoint-tablet: 880px;       // TOC hidden
$breakpoint-toc: 1200px;         // TOC sidebar
$breakpoint-desktop: 1280px;     // Max navbar width
```

### Layout Widths

```scss
$max-width-navbar: 1280px;
$max-width: 1012px;              // Main content
$toc-width: 240px;
$toc-content-width: 700px;       // Content with TOC sidebar
```

### Card Pattern

All interactive cards follow this pattern:
```scss
background: var(--search-input-bg);
border: 1px solid var(--preview-divider-color);
border-radius: 12px;
box-shadow: var(--shadow-sm);
transition: transform 0.3s var(--ease-out-expo),
            box-shadow 0.3s var(--ease-out-expo),
            border-color 0.2s ease;

&:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-color);
}
```

### Header Glass Effect

```scss
background: rgba(var(--body-bg-rgb), 0.85);
backdrop-filter: blur(12px) saturate(1.5);
-webkit-backdrop-filter: blur(12px) saturate(1.5);
```

## Workflow

1. **Read** the target SCSS file(s) and related template(s)
2. **Identify** issues: inconsistent tokens, hardcoded values, missing hover states, accessibility gaps, visual imbalance
3. **Apply** fixes using the design system tokens above - never introduce new hardcoded colors/shadows
4. **Verify** with `zola build` - must compile without errors
5. **Summarize** changes concisely

## Rules

- Always use CSS custom properties from `_variables.scss` - never hardcode colors
- Always use `--shadow-sm/md/lg` - never write ad-hoc `box-shadow` values
- Always use `--ease-out-expo` for card/lift transitions
- Always use `var(--preview-divider-color)` for borders, never hardcoded grays
- Maintain both light and dark mode - test changes mentally against both
- Respect `prefers-reduced-motion` (already set globally)
- Keep changes minimal and targeted - don't refactor what isn't broken
- Run `zola build` after changes to verify compilation
