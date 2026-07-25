// Table of Contents behaviour.
//
// The list itself is rendered at build time by templates/partials/toc.html, so it
// is on screen with the first paint. This file only adds what needs a browser:
// scroll spy, the show/hide toggle and its preference, keyboard navigation, and
// the copy-link anchors on the headings.
(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    contentSelector: '.blog-post__content, .book-chapter__content, .post-title ~ div, .reading-post .post-title ~ div',
    tocContainer: '#toc-container',
    headingSelectors: 'h2, h3, h4',
    activeClass: 'active',
    offset: 200
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

  function hideToggle() {
    if (tocToggle) {
      tocToggle.classList.add('toc-toggle--hidden');
    }
  }

  function scrollToId(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - CONFIG.offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    history.pushState(null, null, `#${id}`);
  }

  // One listener on the list instead of one per link: the markup arrives from the
  // server, so there is nothing to bind at creation time.
  function bindTOCLinks() {
    const list = tocContainerRef.querySelector('.toc-list');
    if (!list) return;

    list.addEventListener('click', (e) => {
      const link = e.target.closest('.toc-link');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id);
    });
  }

  // "#" affordance that copies a link straight to a section. Zola gives every
  // content heading an id, so these just hang off what is already there.
  function addHeadingAnchors() {
    const content = document.querySelector(CONFIG.contentSelector);
    if (!content) return;

    content.querySelectorAll(CONFIG.headingSelectors).forEach((heading) => {
      if (!heading.id || heading.closest('.related-content')) return;
      if (heading.querySelector('.heading-anchor')) return;

      const anchor = document.createElement('a');
      anchor.href = `#${heading.id}`;
      anchor.className = 'heading-anchor';
      anchor.textContent = '#';
      anchor.title = 'Copy link';
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href.split('#')[0] + `#${heading.id}`;
        navigator.clipboard.writeText(url);
        anchor.textContent = '✓';
        setTimeout(() => { anchor.textContent = '#'; }, 1000);
      });
      heading.appendChild(anchor);
    });
  }

  // Highlight active section based on scroll position
  function updateActiveSection() {
    const content = document.querySelector(CONFIG.contentSelector);
    if (!content) return;

    const headings = content.querySelectorAll(CONFIG.headingSelectors);
    const tocLinks = document.querySelectorAll('.toc-link');

    if (!headings.length || !tocLinks.length) return;

    let currentHeading = null;
    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top <= CONFIG.offset) {
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

  function initTOC() {
    // The heading anchors are worth having even on a page with no TOC panel.
    addHeadingAnchors();

    tocContainerRef = document.querySelector(CONFIG.tocContainer);

    // Too few headings to be worth a panel: the template rendered none.
    if (!tocContainerRef) {
      hideToggle();
      return;
    }

    if (compactMediaQuery.matches) {
      setTOCState(true, false);
      hideToggle();
      return;
    }

    bindTOCLinks();

    const tocTitle = tocContainerRef.querySelector('.toc-title');
    if (tocTitle) {
      tocTitle.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, null, window.location.pathname);
      });
    }

    const tocCloseButton = tocContainerRef.querySelector('.toc-close');
    if (tocCloseButton) {
      tocCloseButton.addEventListener('click', () => setTOCState(true));
    }

    // Restore saved preference
    setTOCState(getSavedPreference(), false);

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
