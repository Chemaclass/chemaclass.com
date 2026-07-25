// Reading streak: on blog/reading pages, mark a post as "read" once the user
// has scrolled past READ_SCROLL_PCT and stayed for READ_DWELL_MS (both below).
// On any listing, tag cards whose href matches an already-read path with
// .is-read so the reader sees a quiet trail of what they've already been through.
//
// ---------------------------------------------------------------------------
// SHARED localStorage CONTRACT (canonical description, keep this in sync)
//
// These keys are read or written by more than one plain IIFE. There is no
// bundler and no module system here, so the constants below are duplicated by
// hand in the files listed. Changing a shape means changing every listed file.
// Never rename a key: the stored value is the reader's own data, and a rename
// silently discards their saved posts and read history.
//
//   'chemaclass:read-posts'  { [normalizedPath]: epochMs }  when a post was read
//     written by: reading-streak.js       read by: reading-streak.js, profile.js
//   'chemaclass:favorites'   { [normalizedPath]: epochMs }  when a post was saved
//     written by: favorites.js            read by: favorites.js, profile.js
//
//   normalizedPath: location.pathname with trailing slashes stripped and
//   lower-cased, e.g. "/es/blog/my-post". Produced by the identical local
//   `normalize()` in reading-streak.js, favorites.js and profile.js.
//
//   POST_PATH_RE gates which pages participate; the identical literal lives in
//   reading-streak.js and favorites.js.
//
// Related keys that deliberately do NOT follow the above:
//   'highlights:' + location.pathname (highlights.js) is an ARRAY, is not
//     namespaced under 'chemaclass:', and uses the RAW pathname (trailing
//     slash kept, original case), so its keys never match the two maps above.
//     profile.js export/import/reset does not cover it.
//   'tocHiddenPreference' (toc.js) is the string 'true' | 'false'.
//   'theme' ('dark' | 'light', the only one read) and 'preference-theme'
//     ('theme-dark' | 'theme-light', written by base.html but never read).
// ---------------------------------------------------------------------------
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
    var d = new Date(ts);
    // The catch this replaces could never fire: new Date never throws, and
    // toLocaleDateString only throws on a bad locale, which is a literal here. A
    // junk timestamp does not throw either, it formats as "Invalid Date" and went
    // straight into the pill's tooltip. Check the date, like profile.js does.
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(IS_ES ? 'es-ES' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
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

  // Stored reader data is untrusted input: it is reader-writable, it survives
  // every release, and the profile page's Import button copies a whole file into
  // it. `JSON.parse(...) || {}` caught only null and a syntax error, so an array,
  // a number or a string all came through truthy and then broke writing silently
  // (JSON.stringify of an array drops string properties). Values have to be real
  // timestamps too: formatDate() below feeds them to new Date(), and a string
  // like "yesterday" yields an Invalid Date that toLocaleDateString renders as
  // the literal text "Invalid Date" in the card pill instead of throwing.
  function loadRead() {
    var raw;
    // Reading localStorage throws when the origin has no storage access, e.g.
    // Safari private browsing. Nothing is stored then, so an empty map is right
    // and there is nothing to report.
    try { raw = localStorage.getItem(STORAGE_KEY); }
    catch (e) { return {}; }
    if (!raw) return {};

    // Past this point the value is one we wrote, but it stays reader-writable, so
    // treat it as untrusted. A silent {} on corruption is how a reader's whole
    // reading history disappears: the next save replaces whatever is there.
    var parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) {
      console.error('[reading-streak] ' + STORAGE_KEY + ' is not valid JSON, ignoring it:', e);
      return {};
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      console.error('[reading-streak] ' + STORAGE_KEY + ' is not an object, ignoring it:', parsed);
      return {};
    }

    // Keep only real timestamps, or the "read on" tooltip renders Invalid Date.
    // Rebuilding the map means the next save heals the stored value.
    var map = {};
    for (var path in parsed) {
      if (!Object.prototype.hasOwnProperty.call(parsed, path)) continue;
      var ts = parsed[path];
      if (typeof ts === 'number' && isFinite(ts) && ts > 0) map[path] = ts;
      else console.warn('[reading-streak] dropping ' + path + ', timestamp is not usable:', ts);
    }
    return map;
  }

  function saveRead(map) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(map)); }
    catch (e) { /* quota or privacy mode, ignore */ }
  }

  // Normalize path as stable storage key.
  function normalize(path) {
    if (!path) return '';
    return path.replace(/\/+$/, '').toLowerCase();
  }

  function markReadLinks() {
    // Fast path: if the page has no listing cards, nothing to paint, bail
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
      // same left-to-right rhythm (date, reading-time, [read]), idempotent.
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

  // Debug API, useful in devtools, no-op in normal use.
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
