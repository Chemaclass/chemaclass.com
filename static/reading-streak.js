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

  var IS_ES = (document.documentElement.lang || '').toLowerCase().indexOf('es') === 0;
  var LABEL_READ = IS_ES ? 'Leído' : 'Read';
  var LABEL_READ_ON = IS_ES ? 'Leído el' : 'Read on';

  var READ_ICON_SVG =
    '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" ' +
         'stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<polyline points="20 6 9 17 4 12"/>' +
    '</svg>';

  function formatDate(ts) {
    if (!ts) return '';
    try {
      var d = new Date(ts);
      return d.toLocaleDateString(IS_ES ? 'es-ES' : 'en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch (e) { return ''; }
  }

  function buildReadPill(timestamp) {
    var pill = document.createElement('span');
    pill.className = 'blog-card__read';
    var when = formatDate(timestamp);
    pill.setAttribute('title', when ? LABEL_READ_ON + ' ' + when : LABEL_READ);
    pill.setAttribute('aria-label', when ? LABEL_READ_ON + ' ' + when : LABEL_READ);
    pill.innerHTML = READ_ICON_SVG + '<span class="blog-card__read-label">' + LABEL_READ + '</span>';
    return pill;
  }

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

      var readAt = read[normalize(url.pathname)];
      if (!readAt) continue;
      var target = a.closest('.blog-card') ||
                   a.closest('.latest-card') ||
                   a;
      target.classList.add('is-read');

      // Inject labeled pill at end of meta row so unread/read cards share the
      // same left-to-right rhythm (date, reading-time, [read]) — idempotent.
      var meta = target.querySelector('.blog-card__meta') ||
                 target.querySelector('.latest-date');
      if (meta && !meta.querySelector('.blog-card__read')) {
        meta.appendChild(buildReadPill(readAt));
      }
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
