// Profile page: reads the embedded posts metadata + localStorage (reading-streak
// keys + favorites keys) and renders a dashboard. 100% client-side — no fetch,
// no analytics, no sync. Clearing site data resets everything.
(function () {
  if (typeof window === 'undefined') return;

  var READ_KEY = 'chemaclass:read-posts';
  var FAV_KEY  = 'chemaclass:favorites';

  var dataEl = document.getElementById('profile-data');
  var root   = document.getElementById('profile-app');
  if (!dataEl || !root) return;

  var payload;
  try { payload = JSON.parse(dataEl.textContent); }
  catch (e) { payload = { posts: [], series: {}, lang: 'en' }; }

  var lang = payload.lang || 'en';
  var es = lang === 'es';

  // Tiny i18n dictionary — kept in JS so we don't pollute config.toml for a
  // single page. Keep strings short and sober.
  var t = es ? {
    overall: 'Progreso general',
    overallHint: 'Posts que has terminado en todo el sitio.',
    blog: 'Blog',
    readings: 'Lecturas',
    bySeries: 'Por series',
    bySeriesHint: 'Progreso a través de cada serie de posts relacionados.',
    byTag: 'Por temas',
    recent: 'Leídos recientemente',
    recentHint: 'Los últimos 5 posts que terminaste.',
    favorites: 'Favoritos',
    favoritesHint: 'Los posts que marcaste con la estrella para volver a ellos.',
    empty: 'Aún no has terminado ningún post. Cuando leas uno hasta el final, aparecerá aquí.',
    emptyFavs: 'Aún no has guardado ningún post. Usa el botón ★ en la cabecera de un post para guardarlo.',
    reset: 'Borrar mis datos',
    resetConfirm: '¿Seguro? Esto borra tus posts leídos y favoritos guardados en este navegador.',
    export: 'Exportar',
    of: 'de',
    posts: 'posts',
    read: 'leídos',
    starred: 'guardados',
    pct: '%',
    remove: 'Quitar',
    doneOn: 'Marcado el',
    savedOn: 'Guardado el',
    noSeries: 'Sin series aún.',
    topTags: 'Etiquetas que más lees',
    noTags: 'Cuando marques posts como leídos, sus etiquetas aparecerán aquí.',
    dataLocal: 'Todos tus datos están en este navegador. Puedes exportarlos o borrarlos.',
    tools: 'Herramientas'
  } : {
    overall: 'Overall progress',
    overallHint: "Posts you've finished across the site.",
    blog: 'Blog',
    readings: 'Readings',
    bySeries: 'By series',
    bySeriesHint: 'Progress through each series of related posts.',
    byTag: 'By topic',
    recent: 'Recently read',
    recentHint: 'The last 5 posts you finished.',
    favorites: 'Favorites',
    favoritesHint: 'Posts you starred to come back to.',
    empty: "You haven't finished any post yet. When you read one to the end, it'll show up here.",
    emptyFavs: "You haven't saved any posts yet. Use the ★ button at the top of a post to save it.",
    reset: 'Clear my data',
    resetConfirm: "Sure? This clears the posts you've read and the favorites you've saved in this browser.",
    export: 'Export',
    of: 'of',
    posts: 'posts',
    read: 'read',
    starred: 'saved',
    pct: '%',
    remove: 'Remove',
    doneOn: 'Marked on',
    savedOn: 'Saved on',
    noSeries: 'No series yet.',
    topTags: 'Tags you read most',
    noTags: 'As you mark posts as read, their tags will show up here.',
    dataLocal: 'All your data lives in this browser. You can export or clear it.',
    tools: 'Tools'
  };

  function loadJSON(key) {
    try { return JSON.parse(localStorage.getItem(key)) || {}; }
    catch (e) { return {}; }
  }

  function saveJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch (e) { /* ignore */ }
  }

  function normalize(path) {
    if (!path) return '';
    return path.replace(/\/+$/, '').toLowerCase();
  }

  // Build a path→post index for cross-referencing localStorage keys.
  var posts = payload.posts || [];
  var byPath = {};
  for (var i = 0; i < posts.length; i++) {
    var p = posts[i];
    // permalink like "https://chemaclass.com/blog/slug/" → "/blog/slug"
    var pl = '';
    try { pl = new URL(p.permalink).pathname; } catch (e) { /* skip */ }
    if (!pl) continue;
    var key = normalize(pl);
    p._key = key;
    byPath[key] = p;
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function fmtDate(ts) {
    if (!ts) return '';
    var d = new Date(ts);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString(es ? 'es-ES' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  function pct(done, total) {
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Inline SVG icon in section headings. `d` may contain multiple subpaths
  // separated by ` M …` — we split them into sibling <path> elements so each
  // renders as an independent stroke (clean line caps, no accidental joins).
  function iconSVG(d) {
    var parts = String(d).trim().split(/\s+M/).filter(Boolean);
    var paths = parts.map(function (p, i) {
      return '<path d="' + (i === 0 ? p : 'M' + p) + '"/>';
    }).join('');
    return '<svg class="profile-card__icon" viewBox="0 0 24 24" width="18" height="18" ' +
           'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
           'stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  }

  // ----- Rendering -----

  function render() {
    var read = loadJSON(READ_KEY);
    var favs = loadJSON(FAV_KEY);

    // Only count posts in this language. A post's URL starts with /es/ in
    // Spanish, and without the prefix in English.
    var sectionPosts = { blog: [], readings: [] };
    for (var i = 0; i < posts.length; i++) {
      var p = posts[i];
      var inEs = p._key.indexOf('/es/') === 0;
      if ((es && !inEs) || (!es && inEs)) continue;
      sectionPosts[p.section].push(p);
    }

    root.innerHTML = '';

    root.appendChild(renderOverall(sectionPosts, read));
    root.appendChild(renderSeries(sectionPosts, read));
    root.appendChild(renderTags(sectionPosts, read));
    root.appendChild(renderRecent(read));
    root.appendChild(renderFavorites(favs));
    root.appendChild(renderTools(read, favs));
  }

  function renderOverall(sectionPosts, read) {
    var section = el('section', 'profile-card profile-overall');
    section.appendChild(el('h2', 'profile-card__title',
      iconSVG('M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3') + escapeHTML(t.overall)));
    section.appendChild(el('p', 'profile-card__hint', escapeHTML(t.overallHint)));

    var grid = el('div', 'profile-overall__grid');

    var prefix = es ? '/es' : '';
    [
      ['blog', t.blog, prefix + '/blog/'],
      ['readings', t.readings, prefix + '/readings/']
    ].forEach(function (pair) {
      var key = pair[0], label = pair[1], href = pair[2];
      var list = sectionPosts[key];
      var total = list.length;
      var done = 0;
      for (var j = 0; j < list.length; j++) {
        if (read[list[j]._key]) done++;
      }
      var p = pct(done, total);

      var tile = document.createElement('a');
      tile.className = 'profile-tile';
      tile.href = href;
      tile.style.setProperty('--profile-pct', p + '%');
      tile.innerHTML =
        '<div class="profile-tile__head">' +
          '<span class="profile-tile__label">' + escapeHTML(label) + '</span>' +
          '<span class="profile-tile__pct">' + p + t.pct + '</span>' +
        '</div>' +
        '<div class="profile-tile__bar"><div class="profile-tile__fill"></div></div>' +
        '<div class="profile-tile__meta">' +
          '<strong>' + done + '</strong> ' + escapeHTML(t.of) + ' ' +
          '<strong>' + total + '</strong> ' + escapeHTML(t.posts) +
        '</div>';
      grid.appendChild(tile);
    });

    section.appendChild(grid);
    return section;
  }

  function renderSeries(sectionPosts, read) {
    var section = el('section', 'profile-card');
    section.appendChild(el('h2', 'profile-card__title',
      iconSVG('M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5') + escapeHTML(t.bySeries)));
    section.appendChild(el('p', 'profile-card__hint', escapeHTML(t.bySeriesHint)));

    var all = sectionPosts.blog.concat(sectionPosts.readings);
    var bySeries = {};
    for (var i = 0; i < all.length; i++) {
      var p = all[i];
      if (!p.series) continue;
      (bySeries[p.series] = bySeries[p.series] || []).push(p);
    }

    var keys = Object.keys(bySeries);
    if (keys.length === 0) {
      section.appendChild(el('p', 'profile-empty', escapeHTML(t.noSeries)));
      return section;
    }

    // Sort each series by order, then sort series keys by the dictionary in config.
    var list = el('div', 'profile-series');
    keys.sort().forEach(function (key) {
      var items = bySeries[key].slice().sort(function (a, b) {
        return (a.series_order || 0) - (b.series_order || 0);
      });
      var total = items.length;
      var done = 0;
      for (var j = 0; j < items.length; j++) if (read[items[j]._key]) done++;
      var p = pct(done, total);
      var titleRaw = (payload.series[key] && payload.series[key].title) || key;
      var firstHref = items[0] && items[0].permalink;

      var row = document.createElement('a');
      row.className = 'profile-series__row';
      row.href = firstHref || '#';
      row.style.setProperty('--profile-pct', p + '%');
      row.innerHTML =
        '<div class="profile-series__head">' +
          '<span class="profile-series__title">' + escapeHTML(titleRaw) + '</span>' +
          '<span class="profile-series__count">' + done + '/' + total + '</span>' +
        '</div>' +
        '<div class="profile-series__bar"><div class="profile-series__fill"></div></div>';
      list.appendChild(row);
    });

    section.appendChild(list);
    return section;
  }

  function renderTags(sectionPosts, read) {
    var section = el('section', 'profile-card');
    section.appendChild(el('h2', 'profile-card__title',
      iconSVG('M4 9h16 M4 15h16 M10 3L8 21 M16 3l-2 18') + escapeHTML(t.byTag)));
    section.appendChild(el('p', 'profile-card__hint', escapeHTML(t.topTags)));

    var counts = {};
    var all = sectionPosts.blog.concat(sectionPosts.readings);
    for (var i = 0; i < all.length; i++) {
      var p = all[i];
      if (!read[p._key]) continue;
      (p.tags || []).forEach(function (tag) {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    }

    var entries = Object.keys(counts)
      .map(function (k) { return { name: k, count: counts[k] }; })
      .sort(function (a, b) { return b.count - a.count; })
      .slice(0, 15);

    if (entries.length === 0) {
      section.appendChild(el('p', 'profile-empty', escapeHTML(t.noTags)));
      return section;
    }

    var cloud = el('div', 'profile-tags');
    entries.forEach(function (e) {
      var tagUrl = (es ? '/es' : '') + '/tags/' + encodeURIComponent(e.name) + '/';
      var a = document.createElement('a');
      a.className = 'profile-tag';
      a.href = tagUrl;
      a.innerHTML =
        '<span class="profile-tag__name">' + escapeHTML(e.name) + '</span>' +
        '<span class="profile-tag__count">' + e.count + '</span>';
      cloud.appendChild(a);
    });

    section.appendChild(cloud);
    return section;
  }

  function renderRecent(read) {
    var section = el('section', 'profile-card');
    section.appendChild(el('h2', 'profile-card__title',
      iconSVG('M12 8v4l3 3 M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10z') + escapeHTML(t.recent)));
    section.appendChild(el('p', 'profile-card__hint', escapeHTML(t.recentHint)));

    // Sort by timestamp desc, take 5 that still map to a known post.
    var keys = Object.keys(read)
      .map(function (k) { return { k: k, ts: read[k] }; })
      .sort(function (a, b) { return b.ts - a.ts; });

    var items = [];
    for (var i = 0; i < keys.length && items.length < 5; i++) {
      var p = byPath[keys[i].k];
      if (p) items.push({ post: p, ts: keys[i].ts });
    }

    if (items.length === 0) {
      section.appendChild(el('p', 'profile-empty', escapeHTML(t.empty)));
      return section;
    }

    var list = el('ul', 'profile-list');
    items.forEach(function (entry) {
      var li = document.createElement('li');
      li.className = 'profile-list__item';
      li.innerHTML =
        '<a class="profile-list__link" href="' + escapeHTML(entry.post.permalink) + '">' +
          '<span class="profile-list__title">' + escapeHTML(entry.post.title) + '</span>' +
          '<span class="profile-list__meta">' +
            '<span class="profile-list__section">' + escapeHTML(entry.post.section) + '</span>' +
            '<span class="profile-list__date">' + escapeHTML(t.doneOn + ' ' + fmtDate(entry.ts)) + '</span>' +
          '</span>' +
        '</a>';
      list.appendChild(li);
    });

    section.appendChild(list);
    return section;
  }

  function renderFavorites(favs) {
    var section = el('section', 'profile-card profile-card--favs');
    section.appendChild(el('h2', 'profile-card__title',
      '<svg class="profile-card__icon profile-card__icon--amber" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true">' +
        '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
      '</svg>' + escapeHTML(t.favorites)));
    section.appendChild(el('p', 'profile-card__hint', escapeHTML(t.favoritesHint)));

    var keys = Object.keys(favs)
      .map(function (k) { return { k: k, ts: favs[k] }; })
      .sort(function (a, b) { return b.ts - a.ts; });

    var items = [];
    for (var i = 0; i < keys.length; i++) {
      var p = byPath[keys[i].k];
      if (p) items.push({ post: p, ts: keys[i].ts });
    }

    if (items.length === 0) {
      section.appendChild(el('p', 'profile-empty', escapeHTML(t.emptyFavs)));
      return section;
    }

    var list = el('ul', 'profile-list profile-list--favs');
    items.forEach(function (entry) {
      var li = document.createElement('li');
      li.className = 'profile-list__item';
      li.innerHTML =
        '<a class="profile-list__link" href="' + escapeHTML(entry.post.permalink) + '">' +
          '<span class="profile-list__title">' + escapeHTML(entry.post.title) + '</span>' +
          '<span class="profile-list__meta">' +
            '<span class="profile-list__section">' + escapeHTML(entry.post.section) + '</span>' +
            '<span class="profile-list__date">' + escapeHTML(t.savedOn + ' ' + fmtDate(entry.ts)) + '</span>' +
          '</span>' +
        '</a>' +
        '<button class="profile-list__remove" type="button" data-key="' + escapeHTML(entry.post._key) + '" title="' + escapeHTML(t.remove) + '" aria-label="' + escapeHTML(t.remove) + '">' +
          '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        '</button>';
      list.appendChild(li);
    });

    list.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.profile-list__remove');
      if (!btn) return;
      e.preventDefault();
      var k = btn.getAttribute('data-key');
      var current = loadJSON(FAV_KEY);
      delete current[k];
      saveJSON(FAV_KEY, current);
      render();
    });

    section.appendChild(list);
    return section;
  }

  function renderTools(read, favs) {
    var section = el('section', 'profile-card profile-card--tools');
    section.appendChild(el('h2', 'profile-card__title',
      iconSVG('M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z') + escapeHTML(t.tools)));
    section.appendChild(el('p', 'profile-card__hint', escapeHTML(t.dataLocal)));

    var row = el('div', 'profile-tools');

    var exportBtn = el('button', 'profile-btn', escapeHTML(t.export));
    exportBtn.type = 'button';
    exportBtn.addEventListener('click', function () {
      var blob = new Blob([JSON.stringify({
        read: read, favorites: favs, exportedAt: Date.now(), version: 1
      }, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'chemaclass-profile-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
    row.appendChild(exportBtn);

    var resetBtn = el('button', 'profile-btn profile-btn--danger', escapeHTML(t.reset));
    resetBtn.type = 'button';
    resetBtn.addEventListener('click', function () {
      if (!window.confirm(t.resetConfirm)) return;
      saveJSON(READ_KEY, {});
      saveJSON(FAV_KEY, {});
      render();
    });
    row.appendChild(resetBtn);

    section.appendChild(row);
    return section;
  }

  // Re-render if the user stars/un-stars a post in another tab, or if the
  // current page dispatches one of the module events.
  window.addEventListener('chemaclass:post-read', render);
  window.addEventListener('chemaclass:favorite-toggled', render);
  window.addEventListener('storage', function (e) {
    if (e.key === READ_KEY || e.key === FAV_KEY) render();
  });

  render();
})();
