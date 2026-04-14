// Minimal 3D tilt effect for elements marked with [data-tilt].
// Tracks the pointer, sets CSS custom properties (--tilt-rx, --tilt-ry, --tilt-mx, --tilt-my)
// and lets SCSS handle the actual transforms/spotlight. rAF-throttled, pointer events only,
// honors prefers-reduced-motion, and no-ops on coarse pointers (touch).
(function () {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  if (reduceMotion || coarsePointer) return;

  // Max tilt angle in degrees. Kept subtle on purpose.
  var MAX_TILT = 6;

  function bind(el) {
    var frame = 0;
    var rect = null;

    function refreshRect() {
      rect = el.getBoundingClientRect();
    }

    function onEnter() {
      refreshRect();
      el.classList.add('is-tilting');
    }

    function onMove(e) {
      if (!rect) refreshRect();
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var px = x / rect.width;  // 0..1
        var py = y / rect.height; // 0..1
        var rx = (0.5 - py) * MAX_TILT * 2; // rotateX
        var ry = (px - 0.5) * MAX_TILT * 2; // rotateY
        el.style.setProperty('--tilt-rx', rx.toFixed(2) + 'deg');
        el.style.setProperty('--tilt-ry', ry.toFixed(2) + 'deg');
        el.style.setProperty('--tilt-mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--tilt-my', (py * 100).toFixed(1) + '%');
      });
    }

    function onLeave() {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      el.classList.remove('is-tilting');
      el.style.setProperty('--tilt-rx', '0deg');
      el.style.setProperty('--tilt-ry', '0deg');
    }

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
  }

  function init() {
    var nodes = document.querySelectorAll('[data-tilt]');
    for (var i = 0; i < nodes.length; i++) bind(nodes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
