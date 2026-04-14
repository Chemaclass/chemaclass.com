// Favorites: lets the reader star a post and surfaces those stars on /profile/.
// Storage is a plain { [normalizedPath]: timestamp } map, keyed separately from
// reading-streak so "read" and "starred" don't entangle.
(function () {
  if (typeof window === 'undefined' || !window.localStorage) return;

  var STORAGE_KEY = 'chemaclass:favorites';
  // Blog and reading post paths — tag pages and listings are not favorable.
  var POST_PATH_RE = /^\/(?:es\/)?(?:blog|readings)\/[^\/]+\/?$/;

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function save(map) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }
    catch (e) { /* quota or privacy mode — ignore */ }
  }

  function normalize(path) {
    if (!path) return '';
    return path.replace(/\/+$/, '').toLowerCase();
  }

  function isPostPage() {
    return POST_PATH_RE.test(location.pathname);
  }

  function emit(path, starred) {
    window.dispatchEvent(new CustomEvent('chemaclass:favorite-toggled', {
      detail: { path: path, starred: starred }
    }));
  }

  // The star lives inside the blog-post__top-row — same row as "← all posts"
  // and the TOC toggle. It mirrors their pill shape so it blends in.
  function injectButton() {
    var row = document.querySelector('.blog-post__top-row');
    if (!row || row.querySelector('.favorite-toggle')) return;

    var key = normalize(location.pathname);
    var map = load();
    var starred = !!map[key];

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'favorite-toggle';
    btn.setAttribute('aria-pressed', starred ? 'true' : 'false');
    btn.setAttribute('title', starred ? 'Remove from favorites' : 'Save to favorites');
    btn.innerHTML =
      '<svg class="favorite-toggle__icon" viewBox="0 0 24 24" width="16" height="16" ' +
           'fill="none" stroke="currentColor" stroke-width="2" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
      '</svg>' +
      '<span class="favorite-toggle__label">Save</span>';

    if (starred) btn.classList.add('is-starred');

    btn.addEventListener('click', function () {
      var current = load();
      var k = normalize(location.pathname);
      if (current[k]) {
        delete current[k];
        btn.classList.remove('is-starred');
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('title', 'Save to favorites');
        emit(k, false);
      } else {
        current[k] = Date.now();
        btn.classList.add('is-starred', 'just-starred');
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('title', 'Remove from favorites');
        window.setTimeout(function () {
          btn.classList.remove('just-starred');
        }, 600);
        emit(k, true);
      }
      save(current);
    });

    // Slot it right after the back link, before the toc-toggle, so layout stays
    // "[ back ] [ favorite ] … [ toc toggle ]".
    var back = row.querySelector('.blog-post__back');
    if (back && back.nextSibling) {
      row.insertBefore(btn, back.nextSibling);
    } else {
      row.appendChild(btn);
    }
  }

  // Debug / profile-page API.
  window.__favorites = {
    list: function () { return load(); },
    toggle: function (path) {
      var map = load();
      var k = normalize(path || location.pathname);
      if (map[k]) delete map[k]; else map[k] = Date.now();
      save(map);
      return map;
    },
    remove: function (path) {
      var map = load();
      delete map[normalize(path)];
      save(map);
      return map;
    },
    reset: function () { save({}); return {}; }
  };

  function init() {
    if (isPostPage()) injectButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
