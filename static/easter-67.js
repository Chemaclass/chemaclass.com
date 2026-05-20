// ==========================================================================
// Easter egg: "67" — full meme mode: page wobble + giant bouncing 6 7
// ==========================================================================
(function () {
  const TRIGGER_RE = /^(67|6\s*7|6-7|six\s*seven|seis\s*siete)$/i;
  const ACTIVE_MS = 4000;

  let active = false;
  let stopTimer = null;
  let banner = null;

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isSmallScreen = () => window.innerWidth < 640;

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
    if (!prefersReducedMotion()) {
      launchConfetti();
    }
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
    document.querySelectorAll(".easter-67-confetti").forEach((c) => c.remove());
  }

  function launchConfetti() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    const canvas = document.createElement("canvas");
    canvas.className = "easter-67-confetti";
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.cssText =
      "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:1501;";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ff8fab", "#ffffff"];
    const small = isSmallScreen();
    const burstCount = small ? 90 : 180;
    const cx = W / 2;
    const cy = H / 2;

    const particles = [];
    for (let i = 0; i < burstCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * (small ? 10 : 16);
      particles.push({
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (small ? 4 : 6),
        size: 4 + Math.random() * 6,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() < 0.5 ? "rect" : "circle",
      });
    }

    // Side cannons fire after a beat for a second burst
    setTimeout(() => {
      if (!active) return;
      const side = small ? 40 : 70;
      for (let i = 0; i < side; i++) {
        const fromLeft = i % 2 === 0;
        particles.push({
          x: fromLeft ? 0 : W,
          y: H * (0.55 + Math.random() * 0.2),
          vx: (fromLeft ? 1 : -1) * (10 + Math.random() * 8),
          vy: -8 - Math.random() * 8,
          size: 3 + Math.random() * 5,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.random() < 0.5 ? "rect" : "circle",
        });
      }
    }, 700);

    const start = performance.now();
    const total = ACTIVE_MS - 200;
    function frame(t) {
      const elapsed = t - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const fadeStart = total - 800;
      const alpha = elapsed < fadeStart ? 1 : Math.max(0, 1 - (elapsed - fadeStart) / 800);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.32;
        p.vx *= 0.995;
        p.rot += p.vrot;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        if (p.shape === "rect") {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (elapsed < total && document.body.contains(canvas)) {
        requestAnimationFrame(frame);
      } else if (document.body.contains(canvas)) {
        canvas.remove();
      }
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => {
    if (active) stop();
  }, { passive: true });

  window.__easter67 = { trigger, stop, isTriggerTerm };
})();
