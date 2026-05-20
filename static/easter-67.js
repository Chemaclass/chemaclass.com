// ==========================================================================
// Easter egg: "67" — full meme mode: page wobble + giant bouncing 6 7
// ==========================================================================
(function () {
  const TRIGGER_RE = /^(67|6\s*7|6-7|six\s*seven|seis\s*siete)$/i;
  const ACTIVE_MS = 4000;

  let active = false;
  let stopTimer = null;
  let banner = null;

  function isTriggerTerm(term) {
    return typeof term === "string" && TRIGGER_RE.test(term.trim());
  }

  function buildBanner() {
    const el = document.createElement("div");
    el.className = "easter-67-banner";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<span class="easter-67-digit easter-67-six">6️⃣</span>' +
      '<span class="easter-67-digit easter-67-seven">7️⃣</span>';
    return el;
  }

  function trigger() {
    if (active) return;
    active = true;
    document.body.classList.add("easter-67");
    banner = buildBanner();
    document.body.appendChild(banner);
    clearTimeout(stopTimer);
    stopTimer = setTimeout(stop, ACTIVE_MS);
  }

  function stop() {
    if (!active) return;
    active = false;
    clearTimeout(stopTimer);
    stopTimer = null;
    document.body.classList.remove("easter-67");
    if (banner && banner.parentNode) {
      banner.parentNode.removeChild(banner);
    }
    banner = null;
  }

  window.addEventListener("resize", () => {
    if (active) stop();
  }, { passive: true });

  window.__easter67 = { trigger, stop, isTriggerTerm };
})();
