// ==========================================================================
// Text Highlighting & Sharing — highlights.js
// Allows readers to highlight text passages, persist them in localStorage,
// and share quotes via social media or clipboard.
// ==========================================================================
(function() {
  'use strict';

  var content = document.querySelector('.blog-post__content')
    || document.querySelector('.book-chapter__content')
    || document.querySelector('.talk-single__content');
  if (!content) return;

  var STORAGE_PREFIX = 'highlights:';
  var HL_CLASS = 'user-highlight';
  var TOOLBAR_CLASS = 'highlight-toolbar';
  var pageKey = STORAGE_PREFIX + window.location.pathname;

  // Read i18n labels from data attributes on content element
  function t(key, fallback) {
    return content.getAttribute('data-hl-' + key) || fallback;
  }

  // ========================================================================
  // Storage
  // ========================================================================
  function loadHighlights() {
    try {
      return JSON.parse(localStorage.getItem(pageKey)) || [];
    } catch (_) {
      return [];
    }
  }

  function saveHighlights(arr) {
    localStorage.setItem(pageKey, JSON.stringify(arr));
  }

  function addHighlight(entry) {
    var arr = loadHighlights();
    arr.push(entry);
    saveHighlights(arr);
  }

  function removeHighlight(id) {
    var arr = loadHighlights().filter(function(h) { return h.id !== id; });
    saveHighlights(arr);
  }

  // ========================================================================
  // Path serialization — encode a text node position relative to content
  // Format: "TAG:siblingIndex/#text:childIndex"
  // ========================================================================
  function nodeToPath(node) {
    if (!content.contains(node)) return null;
    var parts = [];
    var current = node;
    while (current && current !== content) {
      var parent = current.parentNode;
      if (!parent) break;
      var children = parent.childNodes;
      var idx = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i] === current) { idx = i; break; }
      }
      var tag = current.nodeType === 3 ? '#text' : current.tagName;
      parts.unshift(tag + ':' + idx);
      current = parent;
    }
    return parts.join('/');
  }

  function pathToNode(path) {
    if (!path) return null;
    var parts = path.split('/');
    var node = content;
    for (var i = 0; i < parts.length; i++) {
      var seg = parts[i].split(':');
      var idx = parseInt(seg[1], 10);
      if (!node.childNodes || idx >= node.childNodes.length) return null;
      node = node.childNodes[idx];
    }
    return node;
  }

  // ========================================================================
  // Context extraction (20 chars before/after for validation)
  // ========================================================================
  function getContext(textNode, offset, length) {
    var full = textNode.textContent || '';
    var before = full.substring(Math.max(0, offset - 20), offset);
    var after = full.substring(offset + length, offset + length + 20);
    return { before: before, after: after };
  }

  // ========================================================================
  // Generate unique ID
  // ========================================================================
  function generateId() {
    var hex = Math.random().toString(16).substring(2, 6);
    return 'hl_' + Date.now() + '_' + hex;
  }

  // ========================================================================
  // Wrap text range in <mark> elements
  // For cross-element selections, wrap each text node segment individually
  // ========================================================================
  function wrapRange(range, id) {
    // Simple case: selection within a single text node
    if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
      var mark = document.createElement('mark');
      mark.className = HL_CLASS;
      mark.setAttribute('data-highlight-id', id);
      range.surroundContents(mark);
      return [mark];
    }

    // Complex case: multi-node or element-boundary selection
    var marks = [];
    var root = range.commonAncestorContainer;
    if (root.nodeType === 3) root = root.parentNode;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];

    while (walker.nextNode()) {
      var node = walker.currentNode;
      if (content.contains(node) && range.intersectsNode(node)) {
        textNodes.push(node);
      }
    }

    for (var i = 0; i < textNodes.length; i++) {
      var tn = textNodes[i];
      var start = (tn === range.startContainer) ? range.startOffset : 0;
      var end = (tn === range.endContainer) ? range.endOffset : tn.textContent.length;
      if (start >= end) continue;

      // Skip whitespace-only segments
      var segment = tn.textContent.substring(start, end);
      if (!segment.trim()) continue;

      var subRange = document.createRange();
      subRange.setStart(tn, start);
      subRange.setEnd(tn, end);

      var mark = document.createElement('mark');
      mark.className = HL_CLASS;
      mark.setAttribute('data-highlight-id', id);
      subRange.surroundContents(mark);
      marks.push(mark);
    }

    return marks;
  }

  // ========================================================================
  // Remove highlight marks from DOM
  // ========================================================================
  function unwrapHighlight(id) {
    var marks = content.querySelectorAll('mark[data-highlight-id="' + id + '"]');
    marks.forEach(function(mark) {
      var parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
    });
  }

  // ========================================================================
  // Restore highlights on page load
  // ========================================================================
  function restoreHighlights() {
    var highlights = loadHighlights();
    var valid = [];

    highlights.forEach(function(h) {
      var anchorNode = pathToNode(h.anchorPath);
      var focusNode = pathToNode(h.focusPath);

      if (!anchorNode || !focusNode) return;
      if (anchorNode.nodeType !== 3 || focusNode.nodeType !== 3) return;

      // Validate text content matches
      var anchorText = anchorNode.textContent || '';
      var expectedText = h.text;

      // Check if the text can be found at the expected offsets
      var startText = anchorText.substring(h.anchorOffset, h.anchorOffset + expectedText.length);
      if (anchorNode === focusNode && startText !== expectedText) {
        // Try fuzzy match: search for the text in this node
        var fuzzyIdx = anchorText.indexOf(expectedText);
        if (fuzzyIdx >= 0) {
          h.anchorOffset = fuzzyIdx;
          h.focusOffset = fuzzyIdx + expectedText.length;
        } else {
          return; // Cannot restore this highlight
        }
      }

      try {
        var range = document.createRange();
        range.setStart(anchorNode, Math.min(h.anchorOffset, anchorNode.textContent.length));
        range.setEnd(focusNode, Math.min(h.focusOffset, focusNode.textContent.length));

        if (range.toString() === '' && expectedText) return;

        wrapRange(range, h.id);
        valid.push(h);
      } catch (_) {
        // Range could not be restored — skip
      }
    });

    // Keep only highlights that were successfully restored
    if (valid.length !== highlights.length) {
      saveHighlights(valid);
    }
  }

  // ========================================================================
  // Find nearest heading (h2/h3/h4 with id) above the given node
  // ========================================================================
  function findNearestHeading(node) {
    var el = node.nodeType === 3 ? node.parentNode : node;
    while (el && el !== content) {
      // Check previous siblings
      var prev = el.previousElementSibling;
      while (prev) {
        if (/^H[234]$/i.test(prev.tagName) && prev.id) return prev.id;
        prev = prev.previousElementSibling;
      }
      el = el.parentNode;
    }
    // Fallback: find the last heading before the node in document order
    var headings = content.querySelectorAll('h2[id], h3[id], h4[id]');
    var nodeRect = (node.nodeType === 3 ? node.parentNode : node).getBoundingClientRect();
    var best = null;
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].getBoundingClientRect().top <= nodeRect.top) {
        best = headings[i].id;
      }
    }
    return best;
  }

  // ========================================================================
  // Build share URLs
  // ========================================================================
  function buildShareUrl(text, headingId) {
    var base = window.location.origin + window.location.pathname;
    if (headingId) base += '#' + headingId;
    return base;
  }

  function buildTextFragmentUrl(text, headingId) {
    var base = window.location.origin + window.location.pathname;
    // Text Fragment API
    var encoded = encodeURIComponent(text.substring(0, 200));
    return base + '#:~:text=' + encoded;
  }

  function buildTwitterUrl(text, headingId) {
    var url = buildShareUrl(text, headingId);
    var quote = '"' + text.substring(0, 200) + '"';
    return 'https://x.com/intent/tweet?text=' + encodeURIComponent(quote) + '&url=' + encodeURIComponent(url);
  }

  function buildLinkedInUrl(text, headingId) {
    var url = buildShareUrl(text, headingId);
    var post = '\u201c' + text.substring(0, 500).trim() + '\u201d\n\n' + url;
    return 'https://www.linkedin.com/feed/?shareActive=true&text=' + encodeURIComponent(post);
  }

  // ========================================================================
  // Toolbar
  // ========================================================================
  var toolbar = null;

  function createToolbar() {
    if (toolbar) return toolbar;

    toolbar = document.createElement('div');
    toolbar.className = TOOLBAR_CLASS;
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Text actions');
    document.body.appendChild(toolbar);

    // Prevent toolbar clicks from clearing the selection
    toolbar.addEventListener('mousedown', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });

    return toolbar;
  }

  function showToolbar(rect, buttons) {
    var tb = createToolbar();
    tb.innerHTML = '';

    buttons.forEach(function(btn, i) {
      if (btn.separator && i > 0) {
        var sep = document.createElement('span');
        sep.className = 'highlight-toolbar__sep';
        tb.appendChild(sep);
      }

      var el = document.createElement('button');
      el.className = 'highlight-toolbar__btn';
      el.type = 'button';
      el.title = btn.label;
      el.setAttribute('aria-label', btn.label);
      el.innerHTML = btn.icon;
      el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        btn.action();
      });
      tb.appendChild(el);
    });

    // Position above the selection
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var scrollX = window.scrollX || document.documentElement.scrollLeft;
    var top = rect.top + scrollY - 48;
    var left = rect.left + scrollX + rect.width / 2;

    // Clamp to viewport
    var tbWidth = 180;
    if (left - tbWidth / 2 < 8) left = tbWidth / 2 + 8;
    if (left + tbWidth / 2 > window.innerWidth - 8) left = window.innerWidth - tbWidth / 2 - 8;
    if (top < scrollY + 8) top = rect.bottom + scrollY + 8;

    tb.style.top = top + 'px';
    tb.style.left = left + 'px';

    // Show with animation
    requestAnimationFrame(function() {
      tb.classList.add('visible');
    });
  }

  function hideToolbar() {
    if (toolbar) {
      toolbar.classList.remove('visible');
    }
  }

  // ========================================================================
  // SVG Icons (inline, minimal)
  // ========================================================================
  var ICON = {
    highlight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>',
    remove: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>',
    twitter: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    linkedin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>'
  };

  // ========================================================================
  // Trim whitespace from range boundaries
  // ========================================================================
  function trimRange(range) {
    var sc = range.startContainer;
    var so = range.startOffset;
    var ec = range.endContainer;
    var eo = range.endOffset;

    // Trim leading whitespace
    if (sc.nodeType === 3) {
      var txt = sc.textContent;
      while (so < txt.length && /\s/.test(txt[so])) so++;
      // If we consumed the entire node, move to the next text node
      if (so >= txt.length) {
        var walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
        walker.currentNode = sc;
        while (walker.nextNode()) {
          var n = walker.currentNode;
          var i = 0;
          var t = n.textContent;
          while (i < t.length && /\s/.test(t[i])) i++;
          if (i < t.length) { sc = n; so = i; break; }
        }
      }
    }

    // Trim trailing whitespace
    if (ec.nodeType === 3) {
      var txt = ec.textContent;
      while (eo > 0 && /\s/.test(txt[eo - 1])) eo--;
      // If we consumed the entire node, move to the previous text node
      if (eo <= 0) {
        var walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
        walker.currentNode = ec;
        while (walker.previousNode()) {
          var n = walker.currentNode;
          var t = n.textContent;
          var i = t.length;
          while (i > 0 && /\s/.test(t[i - 1])) i--;
          if (i > 0) { ec = n; eo = i; break; }
        }
      }
    }

    var trimmed = document.createRange();
    trimmed.setStart(sc, so);
    trimmed.setEnd(ec, eo);
    return trimmed;
  }

  // ========================================================================
  // Highlight selected text
  // ========================================================================
  function highlightSelection() {
    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return;

    var range = trimRange(sel.getRangeAt(0));
    if (!content.contains(range.startContainer) || !content.contains(range.endContainer)) return;

    var text = range.toString().trim();
    if (!text) return;

    var id = generateId();
    var headingId = findNearestHeading(range.startContainer);

    // Collect path info before wrapping (wrapping changes the DOM)
    var anchorPath = nodeToPath(range.startContainer);
    var focusPath = nodeToPath(range.endContainer);
    var anchorOffset = range.startOffset;
    var focusOffset = range.endOffset;

    var ctx = getContext(
      range.startContainer,
      range.startOffset,
      text.length
    );

    var entry = {
      id: id,
      text: text,
      anchorPath: anchorPath,
      anchorOffset: anchorOffset,
      focusPath: focusPath,
      focusOffset: focusOffset,
      contextBefore: ctx.before,
      contextAfter: ctx.after,
      nearestHeadingId: headingId,
      createdAt: Date.now()
    };

    wrapRange(range, id);
    addHighlight(entry);
    sel.removeAllRanges();
    hideToolbar();

    showToast(t('saved', 'Highlight saved'));
  }

  // ========================================================================
  // Remove a highlight by ID
  // ========================================================================
  function removeHighlightById(id) {
    unwrapHighlight(id);
    removeHighlight(id);
    hideToolbar();
    showToast(t('removed', 'Highlight removed'));
  }

  // ========================================================================
  // Share / copy actions
  // ========================================================================
  function shareOnTwitter(text, headingId) {
    var url = buildTwitterUrl(text, headingId);
    window.open(url, '_blank', 'noopener,width=550,height=420');
    hideToolbar();
  }

  function shareOnLinkedIn(text, headingId) {
    var url = buildLinkedInUrl(text, headingId);
    window.open(url, '_blank', 'noopener,width=550,height=620');
    hideToolbar();
  }

  function copyQuote(text, headingId) {
    var url = buildTextFragmentUrl(text, headingId);
    var quote = '\u201c' + text.substring(0, 500) + '\u201d\n\n' + url;
    navigator.clipboard.writeText(quote).then(function() {
      showToast(t('copied', 'Quote copied'));
    });
    hideToolbar();
  }

  // ========================================================================
  // Show toolbar for new selection
  // ========================================================================
  function showSelectionToolbar(sel) {
    var text = sel.toString().trim();
    if (!text) return;

    var range = sel.getRangeAt(0);
    var rect = range.getBoundingClientRect();
    var headingId = findNearestHeading(range.startContainer);

    showToolbar(rect, [
      {
        label: t('save', 'Highlight'),
        icon: ICON.highlight,
        action: highlightSelection
      },
      {
        label: t('share-x', 'Share on X'),
        icon: ICON.twitter,
        action: function() { shareOnTwitter(text, headingId); },
        separator: true
      },
      {
        label: t('share-linkedin', 'Share on LinkedIn'),
        icon: ICON.linkedin,
        action: function() { shareOnLinkedIn(text, headingId); }
      },
      {
        label: t('copy-quote', 'Copy quote'),
        icon: ICON.copy,
        action: function() { copyQuote(text, headingId); }
      }
    ]);
  }

  // ========================================================================
  // Show toolbar for existing highlight (clicked)
  // ========================================================================
  function showHighlightToolbar(markEl) {
    var id = markEl.getAttribute('data-highlight-id');
    var text = '';

    // Collect text from all marks with this ID
    var marks = content.querySelectorAll('mark[data-highlight-id="' + id + '"]');
    marks.forEach(function(m) { text += m.textContent; });
    text = text.trim();

    var headingId = findNearestHeading(markEl);
    var rect = markEl.getBoundingClientRect();

    showToolbar(rect, [
      {
        label: t('remove', 'Remove highlight'),
        icon: ICON.remove,
        action: function() { removeHighlightById(id); }
      },
      {
        label: t('share-x', 'Share on X'),
        icon: ICON.twitter,
        action: function() { shareOnTwitter(text, headingId); },
        separator: true
      },
      {
        label: t('share-linkedin', 'Share on LinkedIn'),
        icon: ICON.linkedin,
        action: function() { shareOnLinkedIn(text, headingId); }
      },
      {
        label: t('copy-quote', 'Copy quote'),
        icon: ICON.copy,
        action: function() { copyQuote(text, headingId); }
      }
    ]);
  }

  // ========================================================================
  // Event: mouseup in content — show toolbar if text selected
  // ========================================================================
  content.addEventListener('mouseup', function(e) {
    // Ignore if clicking toolbar
    if (toolbar && toolbar.contains(e.target)) return;

    // Small delay to let selection finalize
    setTimeout(function() {
      var sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) return;

      var range = sel.getRangeAt(0);
      if (!content.contains(range.startContainer)) return;

      showSelectionToolbar(sel);
    }, 10);
  });

  // ========================================================================
  // Event: click on existing highlight mark
  // ========================================================================
  content.addEventListener('click', function(e) {
    var mark = e.target.closest('mark.' + HL_CLASS);
    if (!mark) return;

    // Only show highlight toolbar if no text is being selected
    var sel = window.getSelection();
    if (sel && !sel.isCollapsed) return;

    e.preventDefault();
    showHighlightToolbar(mark);
  });

  // ========================================================================
  // Event: click elsewhere — hide toolbar
  // ========================================================================
  document.addEventListener('mousedown', function(e) {
    if (toolbar && toolbar.contains(e.target)) return;
    if (e.target.closest('mark.' + HL_CLASS)) return;
    hideToolbar();
  });

  // ========================================================================
  // Keyboard shortcut: m to toggle highlight
  // ========================================================================
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key !== 'm') return;

    var sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return;

    var range = sel.getRangeAt(0);
    if (!content.contains(range.startContainer)) return;

    e.preventDefault();

    // Check if the selection is inside an existing highlight
    var mark = range.startContainer.parentNode;
    if (mark && mark.classList && mark.classList.contains(HL_CLASS)) {
      var id = mark.getAttribute('data-highlight-id');
      removeHighlightById(id);
      sel.removeAllRanges();
    } else {
      highlightSelection();
    }
  });

  // ========================================================================
  // Restore on load
  // ========================================================================
  restoreHighlights();
})();
