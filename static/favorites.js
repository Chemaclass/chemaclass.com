// Saved posts ("favorites"): lets the reader bookmark a post and surfaces those
// bookmarks on /profile/ and on blog/reading list cards.
// Storage is a plain { [normalizedPath]: timestamp } map, keyed separately from
// reading-streak so "read" and "saved" don't entangle.
(function () {
  if (typeof window === 'undefined' || !window.localStorage) return;

  var STORAGE_KEY = 'chemaclass:favorites';
  // Blog and reading post paths — tag pages and listings aren't saveable.
  var POST_PATH_RE = /^\/(?:es\/)?(?:blog|readings)\/[^\/]+\/?$/;

  var BOOKMARK_SVG_OUTLINE =
    '<svg class="favorite-toggle__icon" viewBox="0 0 24 24" width="16" height="16" ' +
         'fill="none" stroke="currentColor" stroke-width="2" ' +
         'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>' +
    '</svg>';

  var BOOKMARK_SVG_FILLED =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" aria-hidden="true">' +
      '<path d="M2 0h20v32l-10-8-10 8z"/>' +
    '</svg>';

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

  function emit(path, saved) {
    window.dispatchEvent(new CustomEvent('chemaclass:favorite-toggled', {
      detail: { path: path, saved: saved }
    }));
  }

  // The bookmark toggle lives inside .blog-post__top-row — same row as
  // "← all posts" and the TOC toggle. Mirrors their pill shape to blend in.
  function injectButton() {
    var row = document.querySelector('.blog-post__top-row');
    if (!row || row.querySelector('.favorite-toggle')) return;

    var key = normalize(location.pathname);
    var map = load();
    var saved = !!map[key];

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'favorite-toggle';
    btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
    btn.setAttribute('title', saved ? 'Remove from saved' : 'Save post');
    btn.setAttribute('aria-label', saved ? 'Remove from saved' : 'Save post');
    btn.innerHTML = BOOKMARK_SVG_OUTLINE;

    if (saved) btn.classList.add('is-saved');

    btn.addEventListener('click', function () {
      var current = load();
      var k = normalize(location.pathname);
      if (current[k]) {
        delete current[k];
        btn.classList.remove('is-saved');
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('title', 'Save post');
        btn.setAttribute('aria-label', 'Save post');
        emit(k, false);
      } else {
        current[k] = Date.now();
        btn.classList.add('is-saved', 'just-saved');
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('title', 'Remove from saved');
        btn.setAttribute('aria-label', 'Remove from saved');
        window.setTimeout(function () {
          btn.classList.remove('just-saved');
        }, 600);
        emit(k, true);
      }
      save(current);
    });

    // Slot it right after the back link, before the toc-toggle, so layout stays
    // "[ back ] [ save ] … [ toc toggle ]".
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

  // List pages (/blog/, /readings/) render a .blog-card per post; the homepage
  // renders a .latest-card anchor. Mark saved cards on both so the bookmark
  // indicator is visible without opening the post. Blog-cards expose path via
  // data-post-path; latest-cards expose it via the anchor href.
  function pathFromCard(card) {
    var raw = card.getAttribute('data-post-path');
    if (raw) return normalize(raw);
    var href = card.getAttribute('href');
    if (!href) return '';
    try {
      var url = new URL(href, location.href);
      if (url.origin !== location.origin) return '';
      if (!POST_PATH_RE.test(url.pathname)) return '';
      return normalize(url.pathname);
    } catch (e) { return ''; }
  }

  function decorateCards() {
    var cards = document.querySelectorAll(
      '.blog-card[data-post-path], .latest-card'
    );
    if (!cards.length) return;
    var map = load();
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var path = pathFromCard(card);
      if (!path || !map[path]) continue;
      if (card.querySelector('.blog-card__favorite')) continue;
      card.classList.add('is-saved');
      var badge = document.createElement('span');
      badge.className = 'blog-card__favorite';
      badge.setAttribute('aria-label', 'Saved');
      badge.setAttribute('title', 'Saved');
      badge.innerHTML = BOOKMARK_SVG_FILLED;
      card.insertBefore(badge, card.firstChild);
    }
  }

  function init() {
    if (isPostPage()) injectButton();
    decorateCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
