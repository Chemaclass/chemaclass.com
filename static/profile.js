// Profile page: reads the embedded posts metadata + localStorage (reading-streak
// keys + favorites keys) and renders a dashboard. 100% client-side, no fetch,
// no analytics, no sync. Clearing site data resets everything.
(function () {
  if (typeof window === 'undefined') return;

  // These two keys are owned by reading-streak.js and favorites.js respectively
  // and are repeated here on purpose. profile.html emits this script tag inside
  // the content block, which base.html renders above the reading-streak.js and
  // favorites.js tags, so with `defer` this file executes first and neither
  // window.__readingStreak nor window.__favorites exists yet. Reading
  // localStorage directly is what makes that order irrelevant. Rename a key in
  // one of those files and it must be renamed here too.
  var READ_KEY = 'chemaclass:read-posts';
  var FAV_KEY  = 'chemaclass:favorites';

  var dataEl = document.getElementById('profile-data');
  var root   = document.getElementById('profile-app');
  if (!dataEl || !root) return;

  // #profile-data is a <script type="application/json"> that templates/profile.html
  // writes at build time, so it either parses for every visitor or for none: a
  // failure here is a template bug, not a runtime condition. The empty
  // { posts: [], lang: 'en' } fallback this replaces turned that bug
  // into a dashboard that told the reader they had finished nothing and read it
  // back to them in English. Let the SyntaxError reach the console instead.
  var parsed = JSON.parse(dataEl.textContent);

  var payload = {
    posts: Array.isArray(parsed.posts) ? parsed.posts : [],
    lang: parsed.lang === 'es' ? 'es' : 'en'
  };

  var lang = payload.lang;
  var es = lang === 'es';

  // Tiny i18n dictionary, kept in JS so we don't pollute config.toml for a
  // single page. Keep strings short and sober.
  var t = es ? {
    recent: 'Leídos recientemente',
    recentHint: 'Los últimos 5 posts que terminaste.',
    favorites: 'Guardados',
    favoritesHint: 'Los posts que has guardado para volver a ellos.',
    empty: 'Aún no has terminado ningún post. Cuando leas uno hasta el final, aparecerá aquí.',
    emptyFavs: 'Aún no has guardado ningún post. Usa el botón de marcador en la cabecera de un post para guardarlo.',
    reset: 'Borrar mis datos',
    resetConfirm: '¿Seguro? Esto borra tus posts leídos y favoritos guardados en este navegador.',
    export: 'Exportar',
    import: 'Importar',
    importInvalid: 'Archivo no válido. Esperaba un export del perfil.',
    importDone: 'Importado: {read} leídos y {favs} guardados añadidos.',
    remove: 'Quitar',
    doneOn: 'Marcado el',
    savedOn: 'Guardado el',
    dataLocal: 'Todos tus datos están en este navegador. Puedes exportarlos, importarlos o borrarlos.',
    tools: 'Herramientas'
  } : {
    recent: 'Recently read',
    recentHint: 'The last 5 posts you finished.',
    favorites: 'Saved',
    favoritesHint: 'Posts you saved to come back to.',
    empty: "You haven't finished any post yet. When you read one to the end, it'll show up here.",
    emptyFavs: "You haven't saved any posts yet. Use the bookmark button at the top of a post to save it.",
    reset: 'Clear my data',
    resetConfirm: "Sure? This clears the posts you've read and the favorites you've saved in this browser.",
    export: 'Export',
    import: 'Import',
    importInvalid: 'Invalid file. Expected a profile export.',
    importDone: 'Imported: {read} read and {favs} saved added.',
    remove: 'Remove',
    doneOn: 'Marked on',
    savedOn: 'Saved on',
    dataLocal: 'All your data lives in this browser. You can export, import, or clear it.',
    tools: 'Tools'
  };

  // Both stored maps are { normalizedPath: timestamp }. They are reader-writable
  // and the Import button below feeds a whole file into them, so treat what comes
  // back as untrusted: `JSON.parse(...) || {}` passed arrays, numbers and strings
  // straight through, and this page then sorted and date-formatted them. Keep
  // only real timestamps so the sort comparators below cannot see NaN and
  // fmtDate() cannot be handed something new Date() will not take.
  function asTimestampMap(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
    var map = {};
    for (var path in raw) {
      if (!Object.prototype.hasOwnProperty.call(raw, path)) continue;
      var ts = raw[path];
      if (typeof ts === 'number' && isFinite(ts) && ts > 0) map[path] = ts;
    }
    return map;
  }

  function loadJSON(key) {
    var raw;
    // Reading localStorage throws when the origin has no storage access, e.g.
    // Safari private browsing. Nothing is stored then, so an empty map is right.
    try { raw = localStorage.getItem(key); }
    catch (e) { return {}; }
    if (!raw) return {};

    // Past this point the value is one favorites.js or reading-streak.js wrote. A
    // value that no longer parses, or that is not a map, is corruption, and this
    // page has an Import button that merges into it and writes it straight back:
    // returning {} quietly is how the reader's history gets overwritten instead of
    // added to.
    var parsed;
    try { parsed = JSON.parse(raw); }
    catch (e) {
      console.error('[profile] ' + key + ' is not valid JSON, ignoring it:', e);
      return {};
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      console.error('[profile] ' + key + ' is not an object, ignoring it:', parsed);
      return {};
    }
    // Every caller reads these as { path: timestamp }, and a bad timestamp reaches
    // the progress maths and the rendered dates, so drop those entries here.
    return asTimestampMap(parsed);
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
  var rawPosts = Array.isArray(payload.posts) ? payload.posts : [];
  var byPath = {};
  for (var i = 0; i < rawPosts.length; i++) {
    var p = rawPosts[i];
    if (!p || (p.section !== 'blog' && p.section !== 'readings')) continue;
    // permalink like "https://chemaclass.com/blog/slug/" → "/blog/slug"
    // Every permalink comes from the same `{{ post.permalink }}` in
    // templates/profile.html and Zola always renders it absolute, so new URL
    // either works for all of them or for none. Skipping the odd one silently
    // dropped a post from the lists below, so let a broken permalink throw.
    var key = normalize(new URL(p.permalink).pathname);
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

  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Inline SVG icon in section headings. `d` may contain multiple subpaths
  // separated by ` M …`, we split them into sibling <path> elements so each
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

    root.innerHTML = '';

    root.appendChild(renderRecent(read));
    root.appendChild(renderFavorites(favs));
    root.appendChild(renderTools(read, favs));
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

    var importBtn = el('button', 'profile-btn', escapeHTML(t.import));
    importBtn.type = 'button';
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json,.json';
    fileInput.style.display = 'none';
    importBtn.addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        var data;
        try { data = JSON.parse(reader.result); }
        catch (e) { window.alert(t.importInvalid); fileInput.value = ''; return; }
        // `typeof x === 'object'` is true for null and for arrays, so the old
        // check accepted both and then copied whatever the file held straight
        // into live reader storage: a value like "2024-01-01" or true became a
        // timestamp that every date read afterwards had to survive. Run the file
        // through the same shape gate as stored data, and require at least one
        // recognisable map so an unrelated JSON file is still rejected loudly.
        if (!data || typeof data !== 'object' || Array.isArray(data) ||
            (data.read === undefined && data.favorites === undefined)) {
          window.alert(t.importInvalid);
          fileInput.value = '';
          return;
        }
        var curRead = loadJSON(READ_KEY);
        var curFavs = loadJSON(FAV_KEY);
        var addedRead = 0, addedFavs = 0;
        var inRead = asTimestampMap(data.read);
        var inFavs = asTimestampMap(data.favorites);
        Object.keys(inRead).forEach(function (k) {
          if (!(k in curRead)) { curRead[k] = inRead[k]; addedRead++; }
        });
        Object.keys(inFavs).forEach(function (k) {
          if (!(k in curFavs)) { curFavs[k] = inFavs[k]; addedFavs++; }
        });
        saveJSON(READ_KEY, curRead);
        saveJSON(FAV_KEY, curFavs);
        fileInput.value = '';
        window.alert(t.importDone.replace('{read}', addedRead).replace('{favs}', addedFavs));
        window.dispatchEvent(new Event('chemaclass:post-read'));
        window.dispatchEvent(new Event('chemaclass:favorite-toggled'));
        render();
      };
      reader.onerror = function () { window.alert(t.importInvalid); fileInput.value = ''; };
      reader.readAsText(file);
    });
    row.appendChild(importBtn);
    row.appendChild(fileInput);

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
