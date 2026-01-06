// ==========================================================================
// Navigation: Search overlay, mobile menu, keyboard shortcuts
// ==========================================================================

// Search overlay toggle
window.toggleSearch = function() {
  if (typeof loadSearch === 'function') loadSearch();
  const overlay = document.getElementById('search-overlay');
  const isActive = overlay.classList.toggle('active');
  if (isActive) {
    setTimeout(() => document.getElementById('site-search').focus(), 50);
  }
};

window.closeSearch = function() {
  const overlay = document.getElementById('search-overlay');
  overlay.classList.remove('active');
  document.getElementById('site-search').value = '';
  const results = document.querySelector('.search-results');
  if (results) results.style.display = 'none';
};

// Mobile menu toggle
window.toggleMobileMenu = function(e) {
  e.stopPropagation();
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('open');
  hamburger.classList.toggle('open');
};

// Keyboard shortcuts: Escape closes, "/" opens search, L toggles language, J/K navigates posts
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSearch();

  // Skip shortcuts when typing in inputs
  const isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable;
  if (isTyping) return;

  // Skip if modifier keys are pressed
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  // "/" or "S" - Toggle search
  if (e.key === '/' || e.key === 's' || e.key === 'S') {
    e.preventDefault();
    toggleSearch();
  }

  // "L" - Toggle language (EN <-> ES)
  if (e.key === 'l' || e.key === 'L') {
    e.preventDefault();
    const currentPath = window.location.pathname;
    const isSpanish = currentPath.startsWith('/es/');
    if (isSpanish) {
      window.location.href = currentPath.replace(/^\/es\//, '/');
    } else {
      window.location.href = '/es' + currentPath;
    }
  }

  // "J" - Previous/older post (left on keyboard = left on screen)
  if (e.key === 'j' || e.key === 'J') {
    const prevLink = document.querySelector('.blog-post__nav-link--prev');
    if (prevLink) {
      e.preventDefault();
      window.location.href = prevLink.href;
    }
  }

  // "K" - Next/newer post (right on keyboard = right on screen)
  if (e.key === 'k' || e.key === 'K') {
    const nextLink = document.querySelector('.blog-post__nav-link--next');
    if (nextLink) {
      e.preventDefault();
      window.location.href = nextLink.href;
    }
  }
});

// Close search when clicking outside
document.addEventListener('click', function(e) {
  const overlay = document.getElementById('search-overlay');
  const toggle = document.getElementById('search-toggle');
  if (!overlay?.classList.contains('active')) return;
  if (!overlay.contains(e.target) && !toggle.contains(e.target)) {
    closeSearch();
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(el => {
  el.addEventListener('click', () => {
    document.querySelector('.navbar').classList.remove('open');
    document.querySelector('.hamburger').classList.remove('open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  if (!navbar?.classList.contains('open')) return;
  if (!hamburger.contains(e.target)) {
    navbar.classList.remove('open');
    hamburger.classList.remove('open');
  }
});
