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
  var cards = document.querySelectorAll('.blog-card');
  var selectedIndex = -1;

  // Hint mode state (f key - vimium-style link following)
  var hintMode = false;
  var hintLinks = [];
  var hintBadges = [];
  var hintInput = '';

  function selectCard(index) {
    if (cards.length === 0) return;
    index = Math.max(0, Math.min(index, cards.length - 1));
    if (selectedIndex >= 0 && cards[selectedIndex]) {
      cards[selectedIndex].classList.remove('blog-card--active');
    }
    selectedIndex = index;
    cards[selectedIndex].classList.add('blog-card--active');
    cards[selectedIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast((selectedIndex + 1) + ' / ' + cards.length);
  }

  function clearCardSelection() {
    if (selectedIndex >= 0 && cards[selectedIndex]) {
      cards[selectedIndex].classList.remove('blog-card--active');
    }
    selectedIndex = -1;
  }

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

  function generateHintLabels(count) {
    var labels = [];
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    if (count <= 26) {
      for (var i = 0; i < count; i++) labels.push(chars[i]);
    } else {
      for (var i = 0; i < chars.length; i++) {
        for (var j = 0; j < chars.length; j++) {
          labels.push(chars[i] + chars[j]);
          if (labels.length >= count) return labels;
        }
      }
    }
    return labels;
  }

  function enterHintMode() {
    var elements = document.querySelectorAll('a, button');
    hintLinks = [];
    elements.forEach(function(el) { if (isElVisible(el)) hintLinks.push(el); });
    if (hintLinks.length === 0) return;

    hintMode = true;
    hintInput = '';
    var labels = generateHintLabels(hintLinks.length);

    hintLinks.forEach(function(el, i) {
      var rect = el.getBoundingClientRect();
      var badge = document.createElement('kbd');
      badge.className = 'shortcut-hint';
      badge.textContent = labels[i];
      badge.dataset.label = labels[i];
      badge.style.position = 'fixed';
      badge.style.top = (rect.top + rect.height / 2) + 'px';
      badge.style.left = (rect.left) + 'px';
      badge.style.zIndex = '10000';
      document.body.appendChild(badge);
      hintBadges.push(badge);
      requestAnimationFrame(function() { badge.classList.add('visible'); });
    });
  }

  function exitHintMode() {
    hintMode = false;
    hintInput = '';
    hintBadges.forEach(function(badge) {
      badge.classList.remove('visible');
      badge.addEventListener('transitionend', function() { badge.remove(); });
      setTimeout(function() { badge.remove(); }, 300);
    });
    hintBadges = [];
    hintLinks = [];
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSearch();
      closeShortcutsModal();
      cancelG();
      clearCardSelection();
      if (hintMode) exitHintMode();
      return;
    }

    // Handle hint mode input
    if (hintMode) {
      e.preventDefault();
      var key = e.key.toLowerCase();
      if (key.length !== 1 || key < 'a' || key > 'z') {
        exitHintMode();
        return;
      }
      hintInput += key;
      // Filter visible badges
      var matches = [];
      var matchIndex = -1;
      hintBadges.forEach(function(badge, i) {
        var label = badge.dataset.label;
        if (label === hintInput) {
          matchIndex = i;
        }
        if (label.indexOf(hintInput) === 0) {
          matches.push(i);
          badge.style.opacity = '1';
        } else {
          badge.style.opacity = '0.2';
        }
      });
      if (matchIndex >= 0) {
        var target = hintLinks[matchIndex];
        exitHintMode();
        target.click();
      } else if (matches.length === 0) {
        exitHintMode();
      }
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
        case 'g': // gg - scroll to top / select first card
          e.preventDefault();
          if (cards.length > 0) {
            selectCard(0);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast('Top');
          }
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

    // "G" (Shift+G) - Scroll to bottom / select last card
    if (e.key === 'G') {
      e.preventDefault();
      if (cards.length > 0) {
        selectCard(cards.length - 1);
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        showToast('Bottom');
      }
      return;
    }

    // "f" - Enter hint mode (vimium-style link following)
    if (e.key === 'f') {
      e.preventDefault();
      enterHintMode();
      return;
    }

    // "/" or "s" - Toggle search (vim: / to search)
    if (e.key === '/' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      toggleSearch();
      return;
    }

    // "i" - Toggle language (i18n)
    if (e.key === 'i' || e.key === 'I') {
      e.preventDefault();
      var currentPath = window.location.pathname;
      var isSpanish = currentPath.startsWith('/es/');
      if (isSpanish) {
        window.location.href = currentPath.replace(/^\/es\//, '/');
      } else {
        window.location.href = '/es' + currentPath;
      }
      return;
    }

    // "j" - Scroll down / next card (vim: down)
    if (e.key === 'j') {
      e.preventDefault();
      if (cards.length > 0) {
        selectCard(selectedIndex + 1);
      } else {
        window.scrollBy({ top: 150, behavior: 'smooth' });
      }
      return;
    }

    // "k" - Scroll up / previous card (vim: up)
    if (e.key === 'k') {
      e.preventDefault();
      if (cards.length > 0) {
        selectCard(selectedIndex - 1);
      } else {
        window.scrollBy({ top: -150, behavior: 'smooth' });
      }
      return;
    }

    // "Enter" - Open selected card
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && cards[selectedIndex]) {
        var link = cards[selectedIndex].querySelector('.blog-card__link');
        if (link) window.location.href = link.href;
      }
      return;
    }

    // "H" (Shift+H) - Go back (browser history)
    if (e.key === 'H') {
      e.preventDefault();
      history.back();
      return;
    }

    // "h" - Previous post (vim: left)
    if (e.key === 'h') {
      var prevLink = document.querySelector('.blog-post__nav-link--prev');
      if (prevLink) {
        e.preventDefault();
        window.location.href = prevLink.href;
      } else if (document.querySelector('.blog-post__nav')) {
        showToast('No older post');
      }
      return;
    }

    // "l" - Next post / open selected card (vim: right)
    if (e.key === 'l') {
      if (selectedIndex >= 0 && cards[selectedIndex]) {
        e.preventDefault();
        var link = cards[selectedIndex].querySelector('.blog-card__link');
        if (link) window.location.href = link.href;
        return;
      }
      var nextLink = document.querySelector('.blog-post__nav-link--next');
      if (nextLink) {
        e.preventDefault();
        window.location.href = nextLink.href;
      } else if (document.querySelector('.blog-post__nav')) {
        showToast('No newer post');
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

    // ":" - Open terminal (vim: command mode)
    if (e.key === ':') {
      e.preventDefault();
      var langPrefix = getLangPrefix();
      window.location.href = langPrefix + '/terminal/';
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
  setTimeout(function() { toast.classList.remove('show'); }, 1500);
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

  var HOLD_DELAY = 400;
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
