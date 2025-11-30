// Table of Contents (TOC) Generator and Manager
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    contentSelector: '.blog-post__content, .post-title ~ div, .reading-post .post-title ~ div', // Main content area (blog posts and readings)
    tocContainer: '#toc-container',
    headingSelectors: 'h2, h3', // Which headings to include
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

      const listItem = document.createElement('li');
      listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = 'toc-link';

      // Smooth scroll on click
      link.addEventListener('click', (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    // Remove all active classes
    tocLinks.forEach(link => link.classList.remove(CONFIG.activeClass));

    // Add active class to current link and scroll it into view
    if (currentHeading) {
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

  // Update TOC position based on scroll position
  function updateTOCPosition() {
    const tocContainer = document.querySelector(CONFIG.tocContainer);

    if (!tocContainer) return;

    if (window.scrollY === 0) {
      tocContainer.classList.remove('toc-top');
      tocContainer.scrollTop = 0;
    } else {
      tocContainer.classList.add('toc-top');
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
