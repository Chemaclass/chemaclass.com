// ==========================================================================
// Easter egg: "67" — seesaw split with kid, confetti, konami trigger
// ==========================================================================
(function () {
  const TRIGGER_RE = /^(67|6\s*7|6-7|six\s*seven|seis\s*siete)$/i;
  const ACTIVE_MS = 6000;

  let active = false;
  let stopTimer = null;

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isSmallScreen = () => window.innerWidth < 640;

  function isTriggerTerm(term) {
    return typeof term === "string" && TRIGGER_RE.test(term.trim());
  }

  function buildHalf(main, side) {
    const half = main.cloneNode(true);
    half.removeAttribute("id");
    // Drop floating utility controls that rely on ID-scoped CSS
    half.querySelectorAll("#scroll-to-top").forEach((el) => el.remove());
    half.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
    half.querySelectorAll("input, button, a, [tabindex]").forEach((el) => {
      el.setAttribute("tabindex", "-1");
      el.setAttribute("aria-hidden", "true");
    });
    half.classList.add("easter-67-half", `easter-67-${side}`);
    half.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;margin:0;";
    return half;
  }

  function trigger(opts) {
    if (active) return;
    const main = document.getElementById("main-content");
    if (!main) return;
    active = true;
    const persistent = !!(opts && opts.persistent);

    const rect = main.getBoundingClientRect();
    const stage = document.createElement("div");
    stage.className = "easter-67-stage";
    stage.setAttribute("aria-hidden", "true");
    stage.style.cssText =
      "position:fixed;top:" + rect.top + "px;left:" + rect.left + "px;" +
      "width:" + rect.width + "px;height:" + rect.height + "px;" +
      "pointer-events:none;z-index:1500;overflow:visible;";

    stage.appendChild(buildHalf(main, "left"));
    stage.appendChild(buildHalf(main, "right"));

    const pivot = document.createElement("div");
    pivot.className = "easter-67-pivot";
    pivot.innerHTML =
      '<span class="easter-67-kid" aria-hidden="true">🧒</span>' +
      '<span class="easter-67-wedge" aria-hidden="true"></span>';
    stage.appendChild(pivot);

    document.body.appendChild(stage);
    document.body.classList.add("easter-67");
    main.style.visibility = "hidden";

    if (!prefersReducedMotion()) {
      launchConfetti(rect.left + rect.width / 2, rect.top + rect.height * 0.5);
    }

    clearTimeout(stopTimer);
    if (!persistent) {
      stopTimer = setTimeout(stop, ACTIVE_MS);
    }
  }

  function stop() {
    if (!active) return;
    active = false;
    clearTimeout(stopTimer);
    stopTimer = null;
    document.body.classList.remove("easter-67");
    document.querySelectorAll(".easter-67-stage, .easter-67-confetti")
      .forEach((el) => el.remove());
    const main = document.getElementById("main-content");
    if (main) main.style.visibility = "";
  }

  function launchConfetti(cx, cy) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement("canvas");
    canvas.className = "easter-67-confetti";
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.cssText =
      "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:1501;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
    const burst = isSmallScreen() ? 20 : 30;
    const speed = isSmallScreen() ? 8 : 11;
    const particles = Array.from({ length: burst }, () => ({
      x: cx,
      y: cy,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 1.1) * speed,
      r: 3 + Math.random() * 4,
      c: colors[Math.floor(Math.random() * colors.length)],
    }));

    const start = performance.now();
    function frame(t) {
      const elapsed = t - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const alpha = Math.max(0, 1 - elapsed / 2000);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      if (elapsed < 2000 && document.body.contains(canvas)) {
        requestAnimationFrame(frame);
      } else if (document.body.contains(canvas)) {
        canvas.remove();
      }
    }
    requestAnimationFrame(frame);
  }

  // Cleanup if window resizes mid-egg (rect would be stale)
  window.addEventListener("resize", () => {
    if (active) stop();
  }, { passive: true });

  window.__easter67 = { trigger, stop, isTriggerTerm };
})();
