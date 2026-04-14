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
    // Fast path: if the page has no listing cards AND no counter widget, we
    // have nothing to paint and nothing to count for — bail before scanning
    // every anchor. Covers post pages, CV, 404, etc.
    var hasCards = document.querySelector('.blog-card, .latest-card');
    var hasCounter = document.querySelector('[data-read-counter]');
    if (!hasCards && !hasCounter) return;

    var read = loadRead();
    // Scope anchor scan to the containers that can host post links. On a
    // listing page that's typically one .blog-list, on the homepage the
    // latest-cards wrapper. Fall back to `document` if neither is present.
    var scope = document.querySelector('.blog-list') ||
                document.querySelector('.latest-grid') ||
                document;
    var anchors = scope.querySelectorAll('a[href]');
    var seenPaths = {};
    var total = 0;
    var doneCount = 0;

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

      var key = normalize(url.pathname);
      // De-dupe: same post linked multiple times counts once.
      if (!seenPaths[key]) {
        seenPaths[key] = true;
        total++;
        if (read[key]) doneCount++;
      }

      if (!read[key]) continue;
      var target = a.closest('.blog-card') ||
                   a.closest('.latest-card') ||
                   a;
      target.classList.add('is-read');
    }

    renderCounter(doneCount, total);
  }

  function renderCounter(done, total) {
    var nodes = document.querySelectorAll('[data-read-counter]');
    if (!nodes.length) return;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    var complete = total > 0 && done >= total;

    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (total < 2) {
        el.hidden = true;
        continue;
      }
      el.hidden = false;
      el.classList.toggle('is-complete', complete);
      el.classList.toggle('is-empty', done === 0);
      el.style.setProperty('--read-pct', pct + '%');
      el.setAttribute('title', done + ' of ' + total + ' read (' + pct + '%)');
      el.innerHTML =
        '<span class="read-counter__badge" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="20 6 9 17 4 12"/>' +
          '</svg>' +
        '</span>' +
        '<span class="read-counter__main">' +
          '<span class="read-counter__primary">' + done + '</span>' +
          '<span class="read-counter__sep">/</span>' +
          '<span class="read-counter__total">' + total + '</span>' +
          '<span class="read-counter__label">' + (complete ? 'complete' : 'read') + '</span>' +
        '</span>' +
        '<span class="read-counter__pct">' + pct + '%</span>' +
        '<span class="read-counter__bar" aria-hidden="true"></span>';
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
