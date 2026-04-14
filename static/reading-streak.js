// Reading streak: on blog/reading pages, mark a post as "read" once the user
// has scrolled to ~85% and spent at least 30s on the page. On any listing,
// tag cards whose href matches an already-read path with .is-read so the
// reader sees a quiet trail of what they've already been through.
(function () {
  if (typeof window === 'undefined' || !window.localStorage) return;

  var STORAGE_KEY = 'chemaclass:read-posts';
  var READ_SCROLL_PCT = 0.7;
  var READ_DWELL_MS = 30000;
  // Matches /blog/slug/, /es/blog/slug/, /readings/slug/, /es/readings/slug/
  var POST_PATH_RE = /^\/(?:es\/)?(?:blog|readings)\/[^\/]+\/?$/;

  function loadRead() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function saveRead(map) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }
    catch (e) { /* quota or privacy mode — ignore */ }
  }

  // Normalize path as stable storage key.
  function normalize(path) {
    if (!path) return '';
    return path.replace(/\/+$/, '').toLowerCase();
  }

  function markReadLinks() {
    // Fast path: if the page has no listing cards, nothing to paint — bail
    // before scanning every anchor. Covers post pages, CV, 404, etc.
    if (!document.querySelector('.blog-card, .latest-card')) return;

    var read = loadRead();
    // Scope anchor scan to the containers that can host post links. On a
    // listing page that's typically one .blog-list, on the homepage the
    // latest-cards wrapper. Fall back to `document` if neither is present.
    var scope = document.querySelector('.blog-list') ||
                document.querySelector('.latest-grid') ||
                document;
    var anchors = scope.querySelectorAll('a[href]');

    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];
      var href = a.getAttribute('href');
      if (!href) continue;
      // Cheap pre-filter: skip external and non-post paths before URL parsing.
      if (href.charAt(0) !== '/' && href.indexOf(location.origin) !== 0) continue;
      var url;
      try { url = new URL(href, location.href); }
      catch (e) { continue; }
      if (url.origin !== location.origin) continue;
      if (!POST_PATH_RE.test(url.pathname)) continue;

      if (!read[normalize(url.pathname)]) continue;
      var target = a.closest('.blog-card') ||
                   a.closest('.latest-card') ||
                   a;
      target.classList.add('is-read');
    }
  }

  function isPostPage() {
    return POST_PATH_RE.test(location.pathname);
  }

  function trackCurrentPost() {
    var key = normalize(location.pathname);
    var read = loadRead();
    if (read[key]) return; // already done

    var scrollReached = false;
    var dwellReached = false;
    var committed = false;

    function commit() {
      if (committed || !scrollReached || !dwellReached) return;
      committed = true;
      var latest = loadRead();
      latest[key] = Date.now();
      saveRead(latest);
      if (window.console && console.info) {
        console.info('[reading-streak] marked read:', key);
      }
      window.dispatchEvent(new CustomEvent('chemaclass:post-read', {
        detail: { path: key, at: latest[key] }
      }));
    }

    function onScroll() {
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0 || window.scrollY / docH >= READ_SCROLL_PCT) {
        scrollReached = true;
        window.removeEventListener('scroll', onScroll);
        commit();
      }
    }

    window.setTimeout(function () {
      dwellReached = true;
      commit();
    }, READ_DWELL_MS);

    onScroll(); // short posts may already qualify
    if (!scrollReached) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  function init() {
    markReadLinks();
    if (isPostPage()) trackCurrentPost();
  }

  // Debug API — useful in devtools, no-op in normal use.
  window.__readingStreak = {
    list: function () { return loadRead(); },
    mark: function (path) {
      var map = loadRead();
      map[normalize(path || location.pathname)] = Date.now();
      saveRead(map);
      markReadLinks();
      return map;
    },
    forget: function (path) {
      var map = loadRead();
      delete map[normalize(path)];
      saveRead(map);
      return map;
    },
    reset: function () { saveRead({}); return {}; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
