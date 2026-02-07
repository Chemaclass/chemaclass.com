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

// Keyboard shortcuts: Escape closes, "/" opens search, L toggles language, j/k scroll, J/K navigates posts
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeSearch();
    closeShortcutsModal();
  }

  // Skip shortcuts when typing in inputs
  const isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable;
  if (isTyping) return;

  // Skip if modifier keys are pressed
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  // Skip if global shortcuts are disabled (e.g., 404 page)
  if (window.disableGlobalShortcuts) return;

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

  // "j" (no shift) - Scroll down (vim-style)
  if (e.key === 'j') {
    e.preventDefault();
    window.scrollBy({ top: 150, behavior: 'smooth' });
  }

  // "k" (no shift) - Scroll up (vim-style)
  if (e.key === 'k') {
    e.preventDefault();
    window.scrollBy({ top: -150, behavior: 'smooth' });
  }

  // "J" (shift) - Next/newer post
  if (e.key === 'J') {
    const nextLink = document.querySelector('.blog-post__nav-link--next');
    if (nextLink) {
      e.preventDefault();
      window.location.href = nextLink.href;
    }
  }

  // "K" (shift) - Previous/older post
  if (e.key === 'K') {
    const prevLink = document.querySelector('.blog-post__nav-link--prev');
    if (prevLink) {
      e.preventDefault();
      window.location.href = prevLink.href;
    }
  }

  // Get language prefix for navigation
  const langPrefix = document.documentElement.lang === 'es' ? '/es' : '';

  // "H" - Go home
  if (e.key === 'h' || e.key === 'H') {
    e.preventDefault();
    window.location.href = langPrefix + '/';
  }

  // "B" - Go to blog
  if (e.key === 'b' || e.key === 'B') {
    e.preventDefault();
    window.location.href = langPrefix + '/blog/';
  }

  // "R" - Go to readings
  if (e.key === 'r' || e.key === 'R') {
    e.preventDefault();
    window.location.href = langPrefix + '/readings/';
  }

  // "P" - Go to topics
  if (e.key === 'p' || e.key === 'P') {
    e.preventDefault();
    window.location.href = langPrefix + '/topics/';
  }

  // "E" - Go to services
  if (e.key === 'e' || e.key === 'E') {
    e.preventDefault();
    window.location.href = langPrefix + '/services/';
  }

  // "A" - Go to talks
  if (e.key === 'a' || e.key === 'A') {
    e.preventDefault();
    window.location.href = langPrefix + '/talks/';
  }

  // "C" - Copy URL to clipboard
  if (e.key === 'c' || e.key === 'C') {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('URL copied!');
    });
  }

  // "?" - Show keyboard shortcuts help
  if (e.key === '?') {
    e.preventDefault();
    toggleShortcutsModal();
  }
});

// Toast notification
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Shortcuts dialog (native HTML dialog element)
function openShortcutsModal() {
  const dialog = document.getElementById('shortcuts-dialog');
  if (dialog && !dialog.open) {
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
}

function closeShortcutsModal() {
  const dialog = document.getElementById('shortcuts-dialog');
  if (dialog) {
    dialog.close();
    document.body.classList.remove('modal-open');
  }
}

function toggleShortcutsModal() {
  const dialog = document.getElementById('shortcuts-dialog');
  if (dialog && dialog.open) {
    closeShortcutsModal();
  } else {
    openShortcutsModal();
  }
}

// Setup dialog event listeners
document.addEventListener('DOMContentLoaded', function() {
  const dialog = document.getElementById('shortcuts-dialog');
  if (!dialog) return;

  // Close on backdrop click
  dialog.addEventListener('click', function(e) {
    if (e.target === dialog) {
      closeShortcutsModal();
    }
  });

  // Cleanup when dialog closes (handles Escape key too)
  dialog.addEventListener('close', function() {
    document.body.classList.remove('modal-open');
  });
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

// ==========================================================================
// Shortcut Hints Overlay: Hold Shift for 2s to show badges on UI elements
// ==========================================================================
(function() {
  if (window.matchMedia('(max-width: 600px)').matches) return;

  const HOLD_DELAY = 1000;
  const SHORTCUT_MAP = [
    { key: 'H',  selector: '.header-left' },
    { key: 'B',  selector: '.nav-links a[href$="/blog/"]' },
    { key: 'R',  selector: '.nav-links a[href$="/readings/"]' },
    { key: 'P',  selector: '.nav-links a[href$="/topics/"]' },
    { key: 'E',  selector: '.nav-links a[href$="/services/"]' },
    { key: 'A',  selector: '.nav-links a[href$="/talks/"]' },
    { key: 'S',  selector: '#search-toggle' },
    { key: 'D',  selector: '#light-mode, #dark-mode' },
    { key: 'L',  selector: '.lang-switch' },
    { key: 'T',  selector: '#toc-toggle' },
    { key: 'gg', selector: '#scroll-to-top' },
    { key: 'J',  selector: '.blog-post__nav-link--next' },
    { key: 'K',  selector: '.blog-post__nav-link--prev' },
  ];

  let timer = null;
  let badges = [];
  let isShowing = false;

  function isVisible(el) {
    if (!el) return false;
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function showBadges() {
    isShowing = true;
    SHORTCUT_MAP.forEach(function(item) {
      const els = document.querySelectorAll(item.selector);
      let target = null;
      els.forEach(function(el) { if (isVisible(el)) target = el; });
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const badge = document.createElement('kbd');
      badge.className = 'shortcut-hint';
      badge.textContent = item.key;
      badge.style.position = 'fixed';
      badge.style.top = (rect.top + rect.height / 2) + 'px';
      badge.style.left = (rect.left + rect.width / 2) + 'px';
      document.body.appendChild(badge);
      badges.push(badge);

      // Trigger fade-in on next frame
      requestAnimationFrame(function() {
        badge.classList.add('visible');
      });
    });
  }

  function removeBadges() {
    isShowing = false;
    badges.forEach(function(badge) {
      badge.classList.remove('visible');
      badge.addEventListener('transitionend', function() {
        badge.remove();
      });
      // Fallback removal
      setTimeout(function() { badge.remove(); }, 300);
    });
    badges = [];
  }

  function cancelTimer() {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Shift') {
      cancelTimer();
      return;
    }
    if (timer || isShowing) return;
    timer = setTimeout(function() {
      timer = null;
      showBadges();
    }, HOLD_DELAY);
  });

  document.addEventListener('keyup', function(e) {
    if (e.key === 'Shift') {
      cancelTimer();
      if (isShowing) removeBadges();
    }
  });

  window.addEventListener('blur', function() {
    cancelTimer();
    if (isShowing) removeBadges();
  });
})();
