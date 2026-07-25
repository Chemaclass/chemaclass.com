# Styles

Zola compiles every `.scss` file here that does not start with an underscore into
a `.css` file of the same name. Those are the entry points; everything else is a
partial pulled in by one.

## Entry points

| File | Serves |
| --- | --- |
| `index.scss` | homepage |
| `listing.scss` | blog and readings indexes, tag pages |
| `page.scss` | standalone pages (services, books, talks, 404) |
| `post.scss` | blog posts, readings, book chapters |
| `profile.scss` | profile page |
| `search.scss` | search dialog, loaded async on every page |
| `sponsor.scss` | sponsor page and its widgets |

Each entry point imports in a fixed order, and the numbered comments in the file
mark it: abstracts, vendors, base, layouts, components, pages, utilities.
Keep that order. Later groups are allowed to lean on earlier ones, not the reverse.

## Where a new rule goes

| Folder | Holds | Examples |
| --- | --- | --- |
| `abstracts/` | variables and tokens, no output of its own | `_variables.scss` |
| `vendors/` | third-party CSS and font declarations | `_normalize.scss`, `_fonts.scss` |
| `base/` | element-level defaults | `_reset.scss`, `_typography.scss` |
| `layouts/` | page furniture and structure | `_header.scss`, `_footer.scss` |
| `components/` | one reusable thing, named after it | `_pagination.scss`, `_toc.scss` |
| `pages/` | rules only one page or section needs | `_blog.scss`, `_book-chapter.scss` |
| `utils/` | helpers that must win last | `_responsive.scss` |

Two rules of thumb:

- If a selector shows up on more than one page type, it is a component, not a page.
- Name the file after the thing it styles, not after where it happens to be used.
  `_toc.scss` styles the table of contents; it does not matter that only posts
  render one.

## Colours and spacing

Use the CSS custom properties from `abstracts/_variables.scss` rather than literal
colours, so light and dark themes both stay correct. `--accent-color`,
`--body-color`, `--heading-color`, `--color-subtitle`, `--preview-divider-color`,
`--search-input-bg`, the `--shadow-*` elevations, and `--ease-out-expo`.

Breakpoints are Sass variables, so they work inside `@media`: `$breakpoint-phone`
(600px), `$breakpoint-tablet` (880px), `$breakpoint-desktop` (1280px),
`$breakpoint-small-phone` (465px).

## Hover borders

The global `a:hover` in `base/_typography.scss` adds the prose underline through a
`:where()` denylist, which pins it at plain `a:hover` specificity. Any component's
own `:hover` therefore wins without `!important`, so do not reach for one.
