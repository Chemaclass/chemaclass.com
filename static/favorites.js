// Saved posts ("favorites"): lets the reader bookmark a post and surfaces those
// bookmarks on /profile/ and on blog/reading list cards.
// Storage is a plain { [normalizedPath]: timestamp } map, keyed separately from
// reading-streak so "read" and "saved" don't entangle.
(function () {
  if (typeof window === 'undefined' || !window.localStorage) return;

  var STORAGE_KEY = 'chemaclass:favorites';
  // Blog and reading post paths, tag pages and listings aren't saveable.
  var POST_PATH_RE = /^\/(?:es\/)?(?:blog|readings)\/[^\/]+\/?$/;

  var BOOKMARK_SVG_FILLED =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" aria-hidden="true">' +
      '<path d="M2 0h20v32l-10-8-10 8z"/>' +
    '</svg>';

  function load() {
    var raw;
    // Reading localStorage throws when the origin has no storage access, e.g.
    // Safari private browsing. Nothing is stored then, so an empty map is right
    // and there is nothing to report.
    try { raw = localStorage.getItem(STORAGE_KEY); }
    catch (e) { return {}; }
    if (!raw) return {};

    // Past this point the value is one we wrote, and it is still reader-writable
    // and outlives every release, so treat it as untrusted. `JSON.parse(...) || {}`
    // caught only null and syntax errors: an array, a number or a string parses
    // truthy, and writing through one loses everything, because JSON.stringify of
    // an array drops string properties. Saving then appeared to work and persisted
    // nothing, permanently, with no error anywhere.
    var parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) {
      console.error('[favorites] ' + STORAGE_KEY + ' is not valid JSON, ignoring it:', e);
      return {};
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      console.error('[favorites] ' + STORAGE_KEY + ' is not an object, ignoring it:', parsed);
      return {};
    }

    // Drop entries whose timestamp is not a real one, or the "saved on" dates
    // render as Invalid Date. Rebuilding the map means the next save heals it.
    var map = {};
    for (var path in parsed) {
      if (!Object.prototype.hasOwnProperty.call(parsed, path)) continue;
      var ts = parsed[path];
      if (typeof ts === 'number' && isFinite(ts) && ts > 0) map[path] = ts;
      else console.warn('[favorites] dropping ' + path + ', timestamp is not usable:', ts);
    }
    return map;
  }

  function save(map) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }
    catch (e) { /* quota or privacy mode, ignore */ }
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

  // The button is rendered by the post templates, inside .blog-post__top-row
  // alongside "back" and the TOC toggle. Injecting it here used to widen that row
  // after load, which rewrapped it on narrow screens and pushed the article down.
  // All that is left is reading the stored state and keeping it in sync.
  function bindButton() {
    var btn = document.querySelector('.favorite-toggle');
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = 'true';

    var labelSave = btn.dataset.labelSave || 'Save post';
    var labelRemove = btn.dataset.labelRemove || 'Remove from saved';

    function render(saved) {
      btn.classList.toggle('is-saved', saved);
      btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
      btn.setAttribute('title', saved ? labelRemove : labelSave);
      btn.setAttribute('aria-label', saved ? labelRemove : labelSave);
    }

    var key = normalize(location.pathname);
    render(!!load()[key]);

    btn.addEventListener('click', function () {
      var current = load();
      var k = normalize(location.pathname);
      var saved = !current[k];

      if (saved) {
        current[k] = Date.now();
        btn.classList.add('just-saved');
        window.setTimeout(function () {
          btn.classList.remove('just-saved');
        }, 600);
      } else {
        delete current[k];
      }

      render(saved);
      save(current);
      emit(k, saved);
    });
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
    if (isPostPage()) bindButton();
    decorateCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
