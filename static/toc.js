// Table of Contents (TOC) Generator and Manager
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    contentSelector: '.blog-post__content, .book-chapter__content, .post-title ~ div, .reading-post .post-title ~ div', // Main content area (blog posts, book chapters, and readings)
    tocContainer: '#toc-container',
    headingSelectors: 'h2, h3, h4', // Which headings to include
    minHeadings: 2, // Minimum headings required to show TOC
    activeClass: 'active',
    offset: 100 // Offset for scroll detection
  };

  // Generate TOC from page headings
  function generateTOC() {
    const content = document.querySelector(CONFIG.contentSelector);
    if (!content) return null;

    const headings = content.querySelectorAll(CONFIG.headingSelectors);
    if (headings.length < CONFIG.minHeadings) return null;

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach((heading, index) => {
      // Add ID to heading if it doesn't have one
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      // Store original text before adding anchor
      const headingText = heading.textContent;

      // Add anchor link to heading for copy functionality
      const anchor = document.createElement('a');
      anchor.href = `#${heading.id}`;
      anchor.className = 'heading-anchor';
      anchor.innerHTML = '#';
      anchor.title = 'Copy link';
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href.split('#')[0] + `#${heading.id}`;
        navigator.clipboard.writeText(url);
        // Visual feedback
        anchor.innerHTML = '✓';
        setTimeout(() => { anchor.innerHTML = '#'; }, 1000);
      });
      heading.appendChild(anchor);

      const listItem = document.createElement('li');
      listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = headingText;
      link.className = 'toc-link';

      // Smooth scroll on click with offset
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPosition = heading.offsetTop - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        // Update URL without jumping
        history.pushState(null, null, `#${heading.id}`);
      });

      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    return tocList;
  }

  // Highlight active section based on scroll position
  function updateActiveSection() {
    const headings = document.querySelectorAll(CONFIG.headingSelectors);
    const tocLinks = document.querySelectorAll('.toc-link');

    if (!headings.length || !tocLinks.length) return;

    const scrollPosition = window.scrollY + CONFIG.offset;

    // Find the current heading
    let currentHeading = null;
    headings.forEach((heading) => {
      if (heading.offsetTop <= scrollPosition) {
        currentHeading = heading;
      }
    });

    // Remove all active classes from TOC links and headings
    tocLinks.forEach(link => link.classList.remove(CONFIG.activeClass));
    headings.forEach(h => h.classList.remove(CONFIG.activeClass));

    // Add active class to current heading and TOC link
    if (currentHeading) {
      currentHeading.classList.add(CONFIG.activeClass);
      const activeLink = document.querySelector(`.toc-link[href="#${currentHeading.id}"]`);
      if (activeLink) {
        activeLink.classList.add(CONFIG.activeClass);

        const tocContainer = document.querySelector(CONFIG.tocContainer);
        if (tocContainer) {
          const linkRect = activeLink.getBoundingClientRect();
          const containerRect = tocContainer.getBoundingClientRect();

          if (linkRect.top < containerRect.top || linkRect.bottom > containerRect.bottom) {
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }
  }

  // Reset TOC scroll position when at page top
  function updateTOCPosition() {
    const tocContainer = document.querySelector(CONFIG.tocContainer);
    if (!tocContainer) return;

    if (window.scrollY === 0) {
      tocContainer.scrollTop = 0;
    }
  }

  // Initialize TOC
  function initTOC() {
    const tocContainer = document.querySelector(CONFIG.tocContainer);
    if (!tocContainer) return;

    const tocList = generateTOC();
    if (!tocList) {
      // Hide TOC if not enough headings
      tocContainer.style.display = 'none';
      return;
    }

    // Add TOC title (clickable to scroll to top)
    const tocTitle = document.createElement('a');
    tocTitle.className = 'toc-title';
    tocTitle.textContent = 'On this page';
    tocTitle.href = '#';
    tocTitle.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Clear and populate TOC container
    tocContainer.innerHTML = '';
    tocContainer.appendChild(tocTitle);
    tocContainer.appendChild(tocList);

    // Update active section and TOC position on scroll
    window.addEventListener('scroll', () => {
      updateActiveSection();
      updateTOCPosition();
    }, { passive: true });

    // Initial updates
    updateActiveSection();
    updateTOCPosition();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTOC);
  } else {
    initTOC();
  }
})();
