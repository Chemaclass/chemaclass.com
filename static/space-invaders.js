(function() {
  'use strict';

  var CANVAS_W = 400;
  var CANVAS_H = 500;
  var PLAYER_W = 30;
  var PLAYER_H = 16;
  var BULLET_W = 2;
  var BULLET_H = 10;
  var INVADER_W = 24;
  var INVADER_H = 16;
  var INVADER_COLS = 7;
  var INVADER_ROWS = 4;
  var INVADER_PAD = 12;
  var INVADER_SPEED_INIT = 0.6;
  var INVADER_DROP = 18;
  var BULLET_SPEED = 6;
  var PLAYER_SPEED = 4;
  var SHOOT_COOLDOWN = 250;
  var ENEMY_SHOOT_INTERVAL = 1200;

  var dialog, canvas, ctx, raf;
  var state, keys, lastShot, lastEnemyShot;

  function initState() {
    var invaders = [];
    var gridW = INVADER_COLS * (INVADER_W + INVADER_PAD) - INVADER_PAD;
    var startX = (CANVAS_W - gridW) / 2;
    for (var r = 0; r < INVADER_ROWS; r++) {
      for (var c = 0; c < INVADER_COLS; c++) {
        invaders.push({
          x: startX + c * (INVADER_W + INVADER_PAD),
          y: 50 + r * (INVADER_H + INVADER_PAD),
          alive: true,
          type: r
        });
      }
    }
    state = {
      player: { x: CANVAS_W / 2 - PLAYER_W / 2, y: CANVAS_H - 40 },
      invaders: invaders,
      bullets: [],
      enemyBullets: [],
      dir: 1,
      speed: INVADER_SPEED_INIT,
      score: 0,
      lives: 3,
      over: false,
      won: false,
      paused: false
    };
    keys = {};
    lastShot = 0;
    lastEnemyShot = 0;
  }

  function createDialog() {
    if (dialog) return;

    var style = document.createElement('style');
    style.textContent = [
      '.si-dialog { border: none; padding: 0; background: transparent; max-width: 90vw; max-height: 90vh; }',
      '.si-dialog::backdrop { background: rgba(0,0,0,0.85); }',
      '.si-dialog canvas { display: block; border-radius: 6px; image-rendering: pixelated; }',
      '.si-dialog .si-hint { text-align: center; font-family: monospace; font-size: 11px; color: #555; margin-top: 6px; }'
    ].join('\n');
    document.head.appendChild(style);

    dialog = document.createElement('dialog');
    dialog.className = 'si-dialog';

    canvas = document.createElement('canvas');
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    canvas.style.width = CANVAS_W + 'px';
    canvas.style.height = CANVAS_H + 'px';
    dialog.appendChild(canvas);

    var hint = document.createElement('div');
    hint.className = 'si-hint';
    hint.textContent = '\u2190 \u2192 move \u2022 space shoot \u2022 esc quit';
    dialog.appendChild(hint);

    dialog.addEventListener('close', stop);
    document.body.appendChild(dialog);
    ctx = canvas.getContext('2d');
  }

  function drawInvader(x, y, type) {
    ctx.save();
    // Different shapes per row for visual variety
    if (type === 0) {
      // Top row: small octopus-like
      ctx.fillRect(x + 8, y, 8, 4);
      ctx.fillRect(x + 4, y + 4, 16, 4);
      ctx.fillRect(x, y + 8, 24, 4);
      ctx.fillRect(x + 4, y + 12, 4, 4);
      ctx.fillRect(x + 16, y + 12, 4, 4);
    } else if (type === 1) {
      // Middle rows: crab-like
      ctx.fillRect(x + 4, y, 16, 4);
      ctx.fillRect(x, y + 4, 24, 4);
      ctx.fillRect(x + 2, y + 8, 20, 4);
      ctx.fillRect(x + 6, y + 12, 4, 4);
      ctx.fillRect(x + 14, y + 12, 4, 4);
    } else {
      // Bottom rows: squid-like
      ctx.fillRect(x + 6, y, 12, 4);
      ctx.fillRect(x + 2, y + 4, 20, 4);
      ctx.fillRect(x, y + 8, 24, 4);
      ctx.fillRect(x + 2, y + 12, 8, 4);
      ctx.fillRect(x + 14, y + 12, 8, 4);
    }
    ctx.restore();
  }

  function drawPlayer(x, y) {
    ctx.fillRect(x + 12, y, 6, 4);
    ctx.fillRect(x + 4, y + 4, 22, 4);
    ctx.fillRect(x, y + 8, 30, 8);
  }

  function update(now) {
    if (state.over || state.paused) return;

    // Player movement
    if (keys.ArrowLeft || keys.a) state.player.x = Math.max(0, state.player.x - PLAYER_SPEED);
    if (keys.ArrowRight || keys.d) state.player.x = Math.min(CANVAS_W - PLAYER_W, state.player.x + PLAYER_SPEED);

    // Shoot
    if ((keys[' '] || keys.ArrowUp) && now - lastShot > SHOOT_COOLDOWN) {
      state.bullets.push({ x: state.player.x + PLAYER_W / 2 - 1, y: state.player.y - BULLET_H });
      lastShot = now;
    }

    // Move bullets
    state.bullets = state.bullets.filter(function(b) {
      b.y -= BULLET_SPEED;
      return b.y > -BULLET_H;
    });

    // Move enemy bullets
    state.enemyBullets = state.enemyBullets.filter(function(b) {
      b.y += BULLET_SPEED * 0.6;
      return b.y < CANVAS_H;
    });

    // Enemy shoots
    if (now - lastEnemyShot > ENEMY_SHOOT_INTERVAL) {
      var alive = state.invaders.filter(function(inv) { return inv.alive; });
      if (alive.length > 0) {
        var shooter = alive[Math.floor(Math.random() * alive.length)];
        state.enemyBullets.push({ x: shooter.x + INVADER_W / 2, y: shooter.y + INVADER_H });
        lastEnemyShot = now;
      }
    }

    // Move invaders
    var needDrop = false;
    state.invaders.forEach(function(inv) {
      if (!inv.alive) return;
      inv.x += state.speed * state.dir;
      if (inv.x <= 0 || inv.x + INVADER_W >= CANVAS_W) needDrop = true;
    });
    if (needDrop) {
      state.dir *= -1;
      state.invaders.forEach(function(inv) {
        if (inv.alive) inv.y += INVADER_DROP;
      });
      state.speed += 0.05;
    }

    // Bullet-invader collision
    state.bullets = state.bullets.filter(function(b) {
      for (var i = 0; i < state.invaders.length; i++) {
        var inv = state.invaders[i];
        if (!inv.alive) continue;
        if (b.x + BULLET_W > inv.x && b.x < inv.x + INVADER_W &&
            b.y < inv.y + INVADER_H && b.y + BULLET_H > inv.y) {
          inv.alive = false;
          state.score += (4 - inv.type) * 10;
          return false;
        }
      }
      return true;
    });

    // Enemy bullet-player collision
    state.enemyBullets = state.enemyBullets.filter(function(b) {
      if (b.x + BULLET_W > state.player.x && b.x < state.player.x + PLAYER_W &&
          b.y + BULLET_H > state.player.y && b.y < state.player.y + PLAYER_H) {
        state.lives--;
        if (state.lives <= 0) {
          state.over = true;
        }
        return false;
      }
      return true;
    });

    // Check win
    if (state.invaders.every(function(inv) { return !inv.alive; })) {
      state.over = true;
      state.won = true;
    }

    // Check invaders reached player
    state.invaders.forEach(function(inv) {
      if (inv.alive && inv.y + INVADER_H >= state.player.y) {
        state.over = true;
      }
    });
  }

  function draw() {
    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Scanline effect (subtle)
    ctx.fillStyle = 'rgba(255,255,255,0.015)';
    for (var i = 0; i < CANVAS_H; i += 3) {
      ctx.fillRect(0, i, CANVAS_W, 1);
    }

    // HUD
    ctx.fillStyle = '#33ff33';
    ctx.font = '14px monospace';
    ctx.fillText('SCORE ' + state.score, 10, 24);
    ctx.fillText('\u2665 '.repeat(state.lives).trim(), CANVAS_W - 60, 24);

    // Invaders
    state.invaders.forEach(function(inv) {
      if (!inv.alive) return;
      var colors = ['#ff4444', '#ff8844', '#ffcc33', '#33ff33'];
      ctx.fillStyle = colors[inv.type] || '#33ff33';
      drawInvader(inv.x, inv.y, inv.type);
    });

    // Player
    ctx.fillStyle = '#33ff33';
    drawPlayer(state.player.x, state.player.y);

    // Player bullets
    ctx.fillStyle = '#33ff33';
    state.bullets.forEach(function(b) {
      ctx.fillRect(b.x, b.y, BULLET_W, BULLET_H);
    });

    // Enemy bullets
    ctx.fillStyle = '#ff4444';
    state.enemyBullets.forEach(function(b) {
      ctx.fillRect(b.x, b.y, BULLET_W, BULLET_H);
    });

    // Game over / win overlay
    if (state.over) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = state.won ? '#33ff33' : '#ff4444';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(state.won ? 'YOU WIN!' : 'GAME OVER', CANVAS_W / 2, CANVAS_H / 2 - 10);
      ctx.fillStyle = '#888';
      ctx.font = '14px monospace';
      ctx.fillText('score: ' + state.score, CANVAS_W / 2, CANVAS_H / 2 + 20);
      ctx.fillText('press enter to retry \u2022 esc to quit', CANVAS_W / 2, CANVAS_H / 2 + 50);
      ctx.textAlign = 'left';
    }
  }

  function loop(now) {
    update(now);
    draw();
    raf = requestAnimationFrame(loop);
  }

  function onKey(e) {
    if (!dialog || !dialog.open) return;
    if (e.type === 'keydown') {
      keys[e.key] = true;
      if (e.key === 'Enter' && state.over) {
        initState();
      }
      // Prevent page scroll while playing
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].indexOf(e.key) !== -1) {
        e.preventDefault();
      }
    } else {
      keys[e.key] = false;
    }
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    keys = {};
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('keyup', onKey);
  }

  window.startSpaceInvaders = function() {
    createDialog();
    initState();
    document.addEventListener('keydown', onKey);
    document.addEventListener('keyup', onKey);
    dialog.showModal();
    raf = requestAnimationFrame(loop);
  };
})();
