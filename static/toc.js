// Table of Contents (TOC) Generator and Manager
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    contentSelector: '.blog-post__content, .book-chapter__content, .post-title ~ div, .reading-post .post-title ~ div',
    tocContainer: '#toc-container',
    headingSelectors: 'h2, h3, h4',
    minHeadings: 2,
    activeClass: 'active',
    offset: 100
  };

  const tocToggle = document.getElementById('toc-toggle');
  const tocLayout = document.querySelector('.blog-post-layout');
  const tocPrefKey = 'tocHiddenPreference';
  const compactMediaQuery = window.matchMedia('(max-width: 1024px)');
  let tocContainerRef = null;

  function getSavedPreference() {
    try {
      const saved = localStorage.getItem(tocPrefKey);
      // Default to showing TOC (full-width reading OFF) when no preference saved
      if (saved === null) return false;
      return saved === 'true';
    } catch (e) {
      return false;
    }
  }

  function setTOCState(hidden, persist = true) {
    if (!tocContainerRef) return;
    tocContainerRef.dataset.hideToc = hidden ? 'true' : 'false';
    if (tocLayout) {
      tocLayout.dataset.tocHidden = hidden ? 'true' : 'false';
    }
    if (tocToggle) {
      // Toggle switch: aria-checked="true" means TOC is visible
      tocToggle.setAttribute('aria-checked', hidden ? 'false' : 'true');
    }
    if (persist) {
      try {
        localStorage.setItem(tocPrefKey, hidden ? 'true' : 'false');
      } catch (e) {
        // ignore
      }
    }
  }

  // Generate TOC from page headings
  function generateTOC() {
    const content = document.querySelector(CONFIG.contentSelector);
    if (!content) return null;

    const headings = content.querySelectorAll(CONFIG.headingSelectors);
    if (headings.length < CONFIG.minHeadings) return null;

    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';
    tocList.setAttribute('role', 'list');

    let relatedAdded = false;

    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      const headingText = heading.textContent;
      const insideRelated = heading.closest('.related-content');

      // Skip any heading inside the related-content section entirely
      if (insideRelated) {
        if (!relatedAdded) {
          relatedAdded = true;
          // Add a single flat "Related" TOC entry pointing to the first related heading
          const listItem = document.createElement('li');
          listItem.className = 'toc-item toc-h2';

          const link = document.createElement('a');
          link.href = `#${heading.id}`;
          link.textContent = 'Related';
          link.className = 'toc-link';

          link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPosition = heading.getBoundingClientRect().top + window.scrollY - CONFIG.offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            history.pushState(null, null, `#${heading.id}`);
          });

          listItem.appendChild(link);
          tocList.appendChild(listItem);
        }
        return;
      }

      // Add anchor link to heading
      const anchor = document.createElement('a');
      anchor.href = `#${heading.id}`;
      anchor.className = 'heading-anchor';
      anchor.innerHTML = '#';
      anchor.title = 'Copy link';
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href.split('#')[0] + `#${heading.id}`;
        navigator.clipboard.writeText(url);
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

      // Smooth scroll on click
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPosition = heading.getBoundingClientRect().top + window.scrollY - CONFIG.offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        history.pushState(null, null, `#${heading.id}`);
      });

      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    return tocList;
  }

  // Highlight active section based on scroll position
  function updateActiveSection() {
    const content = document.querySelector(CONFIG.contentSelector);
    if (!content) return;

    const headings = content.querySelectorAll(CONFIG.headingSelectors);
    const tocLinks = document.querySelectorAll('.toc-link');

    if (!headings.length || !tocLinks.length) return;

    const scrollPosition = window.scrollY + CONFIG.offset;

    let currentHeading = null;
    headings.forEach((heading) => {
      if (heading.offsetTop <= scrollPosition) {
        currentHeading = heading;
      }
    });

    // Remove active states and aria-current
    tocLinks.forEach(link => {
      link.classList.remove(CONFIG.activeClass);
      link.removeAttribute('aria-current');
    });
    headings.forEach(h => h.classList.remove(CONFIG.activeClass));

    // Add active state to current
    let activeLink = null;
    if (currentHeading) {
      currentHeading.classList.add(CONFIG.activeClass);
      activeLink = document.querySelector(`.toc-link[href="#${currentHeading.id}"]`);
      if (activeLink) {
        activeLink.classList.add(CONFIG.activeClass);
        activeLink.setAttribute('aria-current', 'location');

        // Auto-scroll TOC if active item is out of view (instant, no smooth to avoid scroll conflicts)
        const tocContainer = tocContainerRef;
        if (tocContainer) {
          const linkRect = activeLink.getBoundingClientRect();
          const containerRect = tocContainer.getBoundingClientRect();

          if (linkRect.top < containerRect.top || linkRect.bottom > containerRect.bottom) {
            const scrollOffset = activeLink.offsetTop - tocContainer.offsetTop - (containerRect.height / 2) + (linkRect.height / 2);
            tocContainer.scrollTop = scrollOffset;
          }
        }
      }
    }
  }

  // Reset TOC scroll position when at page top
  function updateTOCPosition() {
    if (!tocContainerRef) return;
    if (window.scrollY === 0) {
      tocContainerRef.scrollTop = 0;
    }
  }

  // Keyboard navigation for TOC
  function handleKeydown(e) {
    const tocLinks = Array.from(document.querySelectorAll('.toc-link'));
    const currentIndex = tocLinks.indexOf(document.activeElement);

    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = Math.min(currentIndex + 1, tocLinks.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = tocLinks.length - 1;
        break;
      default:
        return;
    }

    tocLinks[nextIndex].focus();
  }

  // Initialize TOC
  function initTOC() {
    tocContainerRef = document.querySelector(CONFIG.tocContainer);
    if (!tocContainerRef) return;

    if (compactMediaQuery.matches) {
      tocContainerRef.style.display = 'none';
      setTOCState(true, false);
      if (tocToggle) {
        tocToggle.classList.add('toc-toggle--hidden');
      }
      return;
    }

    const tocList = generateTOC();
    if (!tocList) {
      tocContainerRef.style.display = 'none';
      setTOCState(true, false);
      if (tocToggle) {
        tocToggle.classList.add('toc-toggle--hidden');
      }
      return;
    }

    // Build TOC header
    const tocTitleText = tocContainerRef.dataset.title || 'On this page';
    const tocCloseLabel = tocContainerRef.dataset.closeLabel || 'Hide table of contents';

    const tocHeader = document.createElement('div');
    tocHeader.className = 'toc-header';

    const tocTitle = document.createElement('a');
    tocTitle.className = 'toc-title';
    tocTitle.href = '#';
    tocTitle.textContent = tocTitleText;
    tocTitle.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, null, window.location.pathname);
    });

    const tocCloseButton = document.createElement('button');
    tocCloseButton.type = 'button';
    tocCloseButton.className = 'toc-close';
    tocCloseButton.setAttribute('aria-label', tocCloseLabel);
    tocCloseButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M4 4l8 8m0-8L4 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    `;
    tocCloseButton.addEventListener('click', () => setTOCState(true));

    tocHeader.appendChild(tocTitle);
    tocHeader.appendChild(tocCloseButton);

    // Set up container with ARIA
    tocContainerRef.innerHTML = '';
    tocContainerRef.setAttribute('aria-label', 'Table of contents');
    tocContainerRef.appendChild(tocHeader);

    tocContainerRef.appendChild(tocList);

    // Restore saved preference
    const savedPref = getSavedPreference();
    setTOCState(savedPref, false);

    // Toggle button
    if (tocToggle) {
      tocToggle.classList.remove('toc-toggle--hidden');
      tocToggle.addEventListener('click', () => {
        const currentlyHidden = tocContainerRef.dataset.hideToc === 'true';
        setTOCState(!currentlyHidden);
      });
    }

    // Add keyboard navigation
    tocContainerRef.addEventListener('keydown', handleKeydown);

    // Show scrollbar when scrolling TOC
    let scrollTimeout;
    tocContainerRef.addEventListener('scroll', () => {
      tocContainerRef.classList.add('scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        tocContainerRef.classList.remove('scrolling');
      }, 1000);
    }, { passive: true });

    // Scroll handler with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          updateTOCPosition();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Keyboard shortcut: 'T' to toggle TOC
    document.addEventListener('keydown', (e) => {
      // Ignore if typing in input/textarea or using modifier keys
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        const currentlyHidden = tocContainerRef.dataset.hideToc === 'true';
        setTOCState(!currentlyHidden);
      }
    });

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
