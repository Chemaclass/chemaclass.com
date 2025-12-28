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

// Keyboard shortcuts: Escape closes, "/" opens search
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSearch();
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    toggleSearch();
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
