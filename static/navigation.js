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

// Keyboard shortcuts: vim-style with g-prefix commands
(function() {
  var gPending = false;
  var gTimer = null;
  var gBadges = [];

  var G_PREFIX_MAP = [
    { key: 'h', selector: '.header-left' },
    { key: 'b', selector: '.nav-links a[href$="/blog/"]' },
    { key: 'r', selector: '.nav-links a[href$="/readings/"]' },
    { key: 'p', selector: '.nav-links a[href$="/topics/"]' },
    { key: 'e', selector: '.nav-links a[href$="/services/"]' },
    { key: 'a', selector: '.nav-links a[href$="/talks/"]' },
    { key: 'g', selector: '#scroll-to-top' },
  ];

  function isElVisible(el) {
    if (!el) return false;
    var style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    var rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function showGBadges() {
    G_PREFIX_MAP.forEach(function(item) {
      var els = document.querySelectorAll(item.selector);
      var target = null;
      els.forEach(function(el) { if (isElVisible(el)) target = el; });
      if (!target) return;

      var rect = target.getBoundingClientRect();
      var badge = document.createElement('kbd');
      badge.className = 'shortcut-hint';
      badge.textContent = item.key;
      badge.style.position = 'fixed';
      badge.style.top = (rect.top + rect.height / 2) + 'px';
      badge.style.left = (rect.left + rect.width / 2) + 'px';
      document.body.appendChild(badge);
      gBadges.push(badge);

      requestAnimationFrame(function() {
        badge.classList.add('visible');
      });
    });
  }

  function removeGBadges() {
    gBadges.forEach(function(badge) {
      badge.classList.remove('visible');
      badge.addEventListener('transitionend', function() { badge.remove(); });
      setTimeout(function() { badge.remove(); }, 300);
    });
    gBadges = [];
  }

  function cancelG() {
    gPending = false;
    if (gTimer) { clearTimeout(gTimer); gTimer = null; }
    removeGBadges();
  }

  function getLangPrefix() {
    return document.documentElement.lang === 'es' ? '/es' : '';
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSearch();
      closeShortcutsModal();
      cancelG();
      return;
    }

    // Skip shortcuts when typing in inputs
    var isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable;
    if (isTyping) return;

    // Skip if modifier keys are pressed
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    // Skip if global shortcuts are disabled (e.g., 404 page)
    if (window.disableGlobalShortcuts) return;

    // Handle g-prefix commands (gg, gh, gb, gr, gp, ge, ga)
    if (gPending) {
      if (e.repeat) return;
      cancelG();
      var langPrefix = getLangPrefix();
      switch (e.key) {
        case 'g': // gg - scroll to top (vim)
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        case 'h': // gh - go home
          e.preventDefault();
          window.location.href = langPrefix + '/';
          return;
        case 'b': // gb - go blog
          e.preventDefault();
          window.location.href = langPrefix + '/blog/';
          return;
        case 'r': // gr - go readings
          e.preventDefault();
          window.location.href = langPrefix + '/readings/';
          return;
        case 'p': // gp - go topics
          e.preventDefault();
          window.location.href = langPrefix + '/topics/';
          return;
        case 'e': // ge - go services
          e.preventDefault();
          window.location.href = langPrefix + '/services/';
          return;
        case 'a': // ga - go talks
          e.preventDefault();
          window.location.href = langPrefix + '/talks/';
          return;
        default:
          return;
      }
    }

    // "g" - Start g-prefix mode and show hint badges
    if (e.key === 'g') {
      if (e.repeat) return;
      gPending = true;
      showGBadges();
      gTimer = setTimeout(function() {
        gPending = false;
        gTimer = null;
        removeGBadges();
      }, 500);
      return;
    }

    // "G" (Shift+G) - Scroll to bottom (vim)
    if (e.key === 'G') {
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }

    // "/" or "s" - Toggle search (vim: / to search)
    if (e.key === '/' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      toggleSearch();
      return;
    }

    // "j" - Scroll down (vim: down)
    if (e.key === 'j') {
      e.preventDefault();
      window.scrollBy({ top: 150, behavior: 'smooth' });
      return;
    }

    // "k" - Scroll up (vim: up)
    if (e.key === 'k') {
      e.preventDefault();
      window.scrollBy({ top: -150, behavior: 'smooth' });
      return;
    }

    // "h" - Previous post (vim: left)
    if (e.key === 'h') {
      var prevLink = document.querySelector('.blog-post__nav-link--prev');
      if (prevLink) {
        e.preventDefault();
        window.location.href = prevLink.href;
      }
      return;
    }

    // "l" - Next post (vim: right)
    if (e.key === 'l') {
      var nextLink = document.querySelector('.blog-post__nav-link--next');
      if (nextLink) {
        e.preventDefault();
        window.location.href = nextLink.href;
      }
      return;
    }

    // "y" - Yank (copy) URL to clipboard (vim: yank = copy)
    if (e.key === 'y' || e.key === 'Y') {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(function() {
        showToast('URL copied!');
      });
      return;
    }

    // "?" - Show keyboard shortcuts help
    if (e.key === '?') {
      e.preventDefault();
      toggleShortcutsModal();
      return;
    }
  });
})();

// Toast notification
function showToast(message) {
  var toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 2000);
}

// Shortcuts dialog (native HTML dialog element)
function openShortcutsModal() {
  var dialog = document.getElementById('shortcuts-dialog');
  if (dialog && !dialog.open) {
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
}

function closeShortcutsModal() {
  var dialog = document.getElementById('shortcuts-dialog');
  if (dialog) {
    dialog.close();
    document.body.classList.remove('modal-open');
  }
}

function toggleShortcutsModal() {
  var dialog = document.getElementById('shortcuts-dialog');
  if (dialog && dialog.open) {
    closeShortcutsModal();
  } else {
    openShortcutsModal();
  }
}

// Setup dialog event listeners
document.addEventListener('DOMContentLoaded', function() {
  var dialog = document.getElementById('shortcuts-dialog');
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
  var overlay = document.getElementById('search-overlay');
  var toggle = document.getElementById('search-toggle');
  if (!overlay?.classList.contains('active')) return;
  if (!overlay.contains(e.target) && !toggle.contains(e.target)) {
    closeSearch();
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(function(el) {
  el.addEventListener('click', function() {
    document.querySelector('.navbar').classList.remove('open');
    document.querySelector('.hamburger').classList.remove('open');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
  var navbar = document.querySelector('.navbar');
  var hamburger = document.querySelector('.hamburger');
  if (!navbar?.classList.contains('open')) return;
  if (!hamburger.contains(e.target)) {
    navbar.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// ==========================================================================
// Shortcut Hints Overlay: Hold Shift to show badges on UI elements
// ==========================================================================
(function() {
  if (window.matchMedia('(max-width: 600px)').matches) return;

  var HOLD_DELAY = 1000;
  var SHORTCUT_MAP = [
    { key: 'gh', selector: '.header-left' },
    { key: 'gb', selector: '.nav-links a[href$="/blog/"]' },
    { key: 'gr', selector: '.nav-links a[href$="/readings/"]' },
    { key: 'gp', selector: '.nav-links a[href$="/topics/"]' },
    { key: 'ge', selector: '.nav-links a[href$="/services/"]' },
    { key: 'ga', selector: '.nav-links a[href$="/talks/"]' },
    { key: '/',  selector: '#search-toggle' },
    { key: 'd',  selector: '#light-mode, #dark-mode' },
    { key: 't',  selector: '#toc-toggle' },
    { key: 'gg', selector: '#scroll-to-top' },
    { key: 'h',  selector: '.blog-post__nav-link--prev' },
    { key: 'l',  selector: '.blog-post__nav-link--next' },
  ];

  var timer = null;
  var badges = [];
  var isShowing = false;

  function isVisible(el) {
    if (!el) return false;
    var style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
    var rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
  }

  function showBadges() {
    isShowing = true;
    SHORTCUT_MAP.forEach(function(item) {
      var els = document.querySelectorAll(item.selector);
      var target = null;
      els.forEach(function(el) { if (isVisible(el)) target = el; });
      if (!target) return;

      var rect = target.getBoundingClientRect();
      var badge = document.createElement('kbd');
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
