# Table of Contents (TOC) Implementation

## Overview

A floating table of contents sidebar has been added to blog posts, readings, and talks. It appears on the left side of the page when there's enough screen space (viewport width ≥ 1200px).

## Files Created/Modified

### New Files

1. **`static/toc.js`**
   - Automatically generates TOC from h2 and h3 headings in blog posts
   - Highlights the current section as you scroll
   - Smooth scrolling when clicking TOC links
   - Only shows TOC if there are at least 2 headings

2. **`sass/toc.scss`**
   - Styles for the floating TOC sidebar
   - Responsive behavior (hidden on screens < 1200px)
   - Active state highlighting
   - Smooth transitions and hover effects

### Modified Files

3. **`templates/blog/blog-post.html`**
   - Added `<nav id="toc-container"></nav>` for TOC
   - Added JavaScript block to load `toc.js`

4. **`templates/readings/readings-post.html`**
   - Added `<nav id="toc-container"></nav>` for TOC
   - Added JavaScript block to load `toc.js`

5. **`templates/talks/single.html`**
   - Added `<nav id="toc-container"></nav>` for TOC
   - Added JavaScript block to load `toc.js`

6. **`sass/main.scss`**
   - Added `@import "./toc.scss";` to include TOC styles

## How It Works

### Layout
- **Main content**: Stays centered at 700px width (unchanged)
- **TOC sidebar**: Fixed position on the left side
- **Position calculation**: `left: calc((100vw - 700px) / 2 - 240px - 30px)`
  - Takes viewport width, subtracts content width, divides by 2 to find left margin
  - Moves left by TOC width (240px) + offset (30px)

### Responsive Behavior
- **≥ 1200px**: TOC visible on left side
- **< 1200px**: TOC hidden (maintains mobile-friendly single-column layout)

### Features
1. **Auto-generation**: TOC is built from h2 and h3 headings in the blog post
2. **Smart display**: Only shows if there are 2+ headings
3. **Active tracking**: Highlights current section based on scroll position
4. **Smooth scrolling**: Clicking a TOC link smoothly scrolls to that section
5. **Accessibility**: Semantic HTML (`<nav>` element) and proper link structure

## Visual Design

The TOC matches your existing design aesthetic:
- Uses CSS variables for theming (light/dark mode compatible)
- Minimal, clean typography
- Subtle hover states
- Active section highlighted with accent color
- Indentation for h3 subsections

## Testing

To test the TOC:

1. Run the site: `npm start` or `zola serve`
2. Open a blog post, reading, or talk with multiple h2/h3 headings
3. Resize browser to > 1200px width to see TOC
4. Scroll through the page - active section should highlight
5. Click TOC links - should smooth scroll to sections

The TOC now works on:
- Blog posts (`/blog/*`)
- Reading posts (`/readings/*`)
- Talk pages (`/talks/*`)

## Configuration

You can adjust these settings in `static/toc.js`:

```javascript
const CONFIG = {
  contentSelector: '.post-title ~ div, .reading-post .post-title ~ div',
  tocContainer: '#toc-container',
  headingSelectors: 'h2, h3',
  minHeadings: 2,
  activeClass: 'active',
  offset: 100
};
```

And styles in `sass/toc.scss`:

```scss
$max-content-width: 700px;
$toc-width: 240px;
$toc-offset: 30px;
$breakpoint-toc: 1200px;
```

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses Intersection Observer for scroll detection
- Graceful degradation on older browsers (TOC won't show but content remains accessible)
