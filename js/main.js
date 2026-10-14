/* =========================================================
   Dành cho Man An 💗 — main.js
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- CẤU HÌNH — sửa ở đây ---------------- */
  const CONFIG = {
    password: '0502',
    // Ngày sinh nhật (để đánh dấu trên lịch). Mật khẩu 0502 = 05/02 → tháng 2, ngày 5.
    specialDay: { day: 5, month: 2 }, // month: 1-12
    photos: [
      { src: 'images/anh6.jpg', cap: 'nụ cười mà tui thích nhất 🥰' },
      { src: 'images/anh4.jpg', cap: 'bé với hồ bơi đêm, đẹp dữ dội' },
      { src: 'images/anh7.jpg', cap: 'búi tóc với cái nơ nhỏ xíu 🎀' },
      { src: 'images/anh5.jpg', cap: 'phiên bản đen trắng cũng dễ thương' },
      { src: 'images/anh1.png', cap: 'mèo cam ngủ quên trên bé 🐱' },
      { src: 'images/anh3.png', cap: 'mèo nhỏ ôm bé ngủ, ghen thiệt' },
      { src: 'images/anh2.png', cap: 'cái vòng tay quen quen ✨' },
    ],
    tracks: [
      { title: 'Heartwarming', artist: 'Kevin MacLeod · nhạc nền nhẹ', src: 'audio/nhac1.mp3' },
      { title: 'Touching Moments', artist: 'Kevin MacLeod · piano', src: 'audio/nhac2.mp3' },
    ],
    letter:
`Chào bé, là tui nè.

Tui ngồi làm cái web nhỏ này mà cứ lướt đi lướt lại mấy tấm hình của bé, tự nhiên thấy vui vui.

Tui không giỏi nói mấy câu hoa mỹ, nên tui nói thiệt thôi: tui thương bà chã. Thương cái cách bé cười, thương cả lúc bé nằm im cho mấy đứa mèo đè lên người mà không nỡ đẩy ra.

Hôm nào bé mệt, bé buồn, hay chỉ đơn giản là chán, thì mở cái web này lên nha. Coi như tui đang ngồi kế bên, không nói gì nhiều, chỉ ở đó thôi.

Cảm ơn bé vì đã là Man An. Vậy là đủ rồi.`,
  };

  /* ---------------- Helpers ---------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const rand = (a, b) => a + Math.random() * (b - a);
  const isMobile = matchMedia('(max-width: 767px)').matches;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-show'), 1800);
  }

  /* ---------------- Âm thanh nhỏ (pop) bằng WebAudio, không cần file ---------------- */
  let actx;
  function pop(freq = 660, dur = 0.08) {
    if (reduceMotion) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, actx.currentTime);
      o.frequency.exponentialRampToValueAtTime(freq * 0.6, actx.currentTime + dur);
      g.gain.setValueAtTime(0.12, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
      o.connect(g).connect(actx.destination);
      o.start();
      o.stop(actx.currentTime + dur);
    } catch (e) { /* bỏ qua */ }
  }

  /* =========================================================
     1. NỀN TIM TRÔI (canvas, số lượng ít để nhẹ máy)
     ========================================================= */
  (function heartsBackground() {
    if (reduceMotion) return;
    const cv = $('#hearts-canvas');
    const ctx = cv.getContext('2d');
    let W, H, hearts = [];
    const COUNT = isMobile ? 14 : 24;

    function resize() {
      W = cv.width = innerWidth * devicePixelRatio;
      H = cv.height = innerHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }
    function make(initial) {
      return {
        x: rand(0, innerWidth),
        y: initial ? rand(0, innerHeight) : innerHeight + 20,
        s: rand(8, 18),
        v: rand(0.25, 0.7),
        sway: rand(0, Math.PI * 2),
        a: rand(0.25, 0.6),
      };
    }
    function drawHeart(x, y, s, a) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s / 16, s / 16);
      ctx.globalAlpha = a;
      ctx.fillStyle = '#ff8fb8';
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.bezierCurveTo(0, 2, -3, -2, -7, -2);
      ctx.bezierCurveTo(-12, -2, -12, 5, -12, 5);
      ctx.bezierCurveTo(-12, 9, -8, 13, 0, 18);
      ctx.bezierCurveTo(8, 13, 12, 9, 12, 5);
      ctx.bezierCurveTo(12, 5, 12, -2, 7, -2);
      ctx.bezierCurveTo(3, -2, 0, 2, 0, 5);
      ctx.fill();
      ctx.restore();
    }
    function tick() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y -= h.v;
        h.sway += 0.01;
        h.x += Math.sin(h.sway) * 0.3;
        if (h.y < -30) hearts[i] = make(false);
        drawHeart(h.x, h.y, h.s, h.a);
      }
      requestAnimationFrame(tick);
    }
    resize();
    addEventListener('resize', resize);
    for (let i = 0; i < COUNT; i++) hearts.push(make(true));
    tick();
  })();

  /* =========================================================
     2. MÀN HÌNH KHOÁ
     ========================================================= */
  (function lockScreen() {
    const dots = $$('.pin-dot');
    const dotsWrap = $('#pin-dots');
    const err = $('#pin-error');
    const hint = $('#lock-hint');
    let pin = '';
    let locked = false;

    function render() {
      dots.forEach((d, i) => d.classList.toggle('is-filled', i < pin.length));
    }
    function fail() {
      locked = true;
      err.textContent = 'Sai rồi bà chã ơi, thử lại nha 🥺';
      dotsWrap.classList.add('is-shake');
      pop(220, 0.15);
      setTimeout(() => {
        dotsWrap.classList.remove('is-shake');
        pin = '';
        render();
        locked = false;
      }, 500);
    }
    function success() {
      locked = true;
      err.textContent = '';
      pop(880, 0.12);
      setTimeout(() => pop(1100, 0.12), 90);
      unlockBurst();
      setTimeout(() => {
        $('#lock-screen').classList.remove('is-active');
        $('#lock-screen').hidden = true;
        $('#app').hidden = false;
        initApp();
      }, 700);
    }
    function press(k) {
      if (locked || pin.length >= 4) return;
      pin += k;
      err.textContent = '';
      render();
      pop(600 + pin.length * 80);
      if (pin.length === 4) {
        setTimeout(() => (pin === CONFIG.password ? success() : fail()), 180);
      }
    }

    $('#keypad').addEventListener('click', (e) => {
      const btn = e.target.closest('.key');
      if (!btn) return;
      if (btn.dataset.key !== undefined) return press(btn.dataset.key);
      if (btn.dataset.action === 'del') {
        if (locked) return;
        pin = pin.slice(0, -1);
        render();
        pop(400);
      }
      if (btn.dataset.action === 'hint') {
        hint.hidden = !hint.hidden;
        pop(500);
      }
    });
    // Bàn phím thật (desktop)
    addEventListener('keydown', (e) => {
      if ($('#lock-screen').hidden) return;
      if (/^[0-9]$/.test(e.key)) press(e.key);
      if (e.key === 'Backspace') { pin = pin.slice(0, -1); render(); }
    });
  })();

  /* Hiệu ứng mở khoá: vòng tròn hồng lan ra + hoa bay */
  function unlockBurst() {
    const wrap = $('#unlock-burst');
    wrap.innerHTML = '';
    wrap.classList.add('is-on');
    const bg = document.createElement('div');
    bg.className = 'burst-bg';
    wrap.appendChild(bg);
    const flowers = ['🌸', '🌷', '🌹', '💗', '🌺', '✨', '💮', '🩷'];
    const n = isMobile ? 26 : 40;
    for (let i = 0; i < n; i++) {
      const f = document.createElement('span');
      f.className = 'flower';
      f.textContent = flowers[i % flowers.length];
      const ang = rand(0, Math.PI * 2);
      const dist = rand(120, Math.max(innerWidth, innerHeight) * 0.7);
      f.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
      f.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
      f.style.setProperty('--rot', rand(-180, 180) + 'deg');
      f.style.animationDelay = rand(0, 0.25) + 's';
      wrap.appendChild(f);
    }
    setTimeout(() => { wrap.classList.remove('is-on'); wrap.innerHTML = ''; }, 1500);
  }

  /* =========================================================
     3. APP
     ========================================================= */
  let appInited = false;
  function initApp() {
    if (appInited) return;
    appInited = true;
    initNav();
    initCalendar();
    initAlbum();
    initCube();
    initLetter();
    initMusic();
    initTapHearts();
    // Thử bật nhạc ngay sau khi mở khoá (vừa có tương tác người dùng nên trình duyệt cho phép)
    music.play().catch(() => {});
  }

  /* ---------------- Điều hướng ---------------- */
  let currentPage = 'home';
  function go(page) {
    if (page === currentPage) return;
    const cur = $(`.page[data-page="${currentPage}"]`);
    const next = $(`.page[data-page="${page}"]`);
    if (!next) return;
    cur.classList.add('is-leaving');
    setTimeout(() => {
      cur.classList.remove('is-active', 'is-leaving');
      next.classList.add('is-active');
      currentPage = page;
      $$('.nav-btn').forEach((b) => b.classList.toggle('is-active', b.dataset.go === page));
      scrollTo({ top: 0, behavior: 'smooth' });
      if (page === 'cube') cube.resume(); else cube.pause();
    }, 220);
    pop(700, 0.06);
  }
  function initNav() {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-go]');
      if (b) go(b.dataset.go);
    });
    $('#btn-home').addEventListener('click', () => go('home'));
  }

  /* ---------------- Lịch ---------------- */
  function initCalendar() {
    const monthEl = $('#cal-month');
    const grid = $('#cal-grid');
    const note = $('#cal-note');
    const today = new Date();
    let view = new Date(today.getFullYear(), today.getMonth(), 1);
    const loved = new Set(JSON.parse(localStorage.getItem('ma_loved') || '[]'));
    const notes = [
      'bé đáng yêu lắm luôn 💗', 'hôm nay nhớ uống nước nha', 'tui thương bé nhiều hơn hôm qua',
      'ngủ sớm nha bà chã 🌙', 'cười lên cái coi 😚', 'hôm nay cũng xinh nữa', 'mèo nhớ bé, tui cũng vậy 🐱',
    ];

    function render() {
      const y = view.getFullYear(), m = view.getMonth();
      monthEl.textContent = view.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
      grid.innerHTML = '';
      const first = (new Date(y, m, 1).getDay() + 6) % 7; // T2 = 0
      const days = new Date(y, m + 1, 0).getDate();
      for (let i = 0; i < first; i++) {
        const e = document.createElement('span');
        e.className = 'cal-day is-empty';
        grid.appendChild(e);
      }
      for (let d = 1; d <= days; d++) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cal-day';
        b.textContent = d;
        const key = `${y}-${m + 1}-${d}`;
        if (d === today.getDate() && m === today.getMonth() && y === today.getFullYear()) b.classList.add('is-today');
        if (d === CONFIG.specialDay.day && m + 1 === CONFIG.specialDay.month) b.classList.add('is-special');
        if (loved.has(key)) b.classList.add('is-loved');
        b.addEventListener('click', (ev) => {
          if (loved.has(key)) loved.delete(key); else loved.add(key);
          localStorage.setItem('ma_loved', JSON.stringify([...loved]));
          b.classList.toggle('is-loved');
          if (b.classList.contains('is-special')) note.textContent = 'Sinh nhật bà chã 🎂 — tui nhớ mà!';
          else note.textContent = notes[(d + m) % notes.length];
          spawnHearts(ev.clientX, ev.clientY, 3);
          pop(750);
        });
        grid.appendChild(b);
      }
    }
    $('#cal-prev').addEventListener('click', () => { view.setMonth(view.getMonth() - 1); render(); });
    $('#cal-next').addEventListener('click', () => { view.setMonth(view.getMonth() + 1); render(); });
    render();
  }

  /* ---------------- Album + Lightbox ---------------- */
  const lightbox = (function () {
    const box = $('#lightbox'), img = $('#lb-img'), cap = $('#lb-cap'), counter = $('#lb-counter'), fig = $('.lb-figure');
    let idx = 0, touchX = null;
    function show(i, animate = true) {
      idx = (i + CONFIG.photos.length) % CONFIG.photos.length;
      const p = CONFIG.photos[idx];
      if (animate) { fig.classList.remove('is-switching'); void fig.offsetWidth; fig.classList.add('is-switching'); }
      img.src = p.src;
      img.alt = p.cap;
      cap.textContent = p.cap;
      counter.textContent = `${idx + 1} / ${CONFIG.photos.length}`;
    }
    function open(i) { box.hidden = false; document.body.style.overflow = 'hidden'; show(i, false); pop(800, 0.07); }
    function close() { box.hidden = true; document.body.style.overflow = ''; }
    $('#lb-close').addEventListener('click', close);
    $('#lb-prev').addEventListener('click', () => show(idx - 1));
    $('#lb-next').addEventListener('click', () => show(idx + 1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    addEventListener('keydown', (e) => {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    box.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
      touchX = null;
    });
    return { open, close };
  })();

  function initAlbum() {
    const grid = $('#album-grid');
    CONFIG.photos.forEach((p, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'album-item';
      b.style.setProperty('--i', i);
      // Ảnh ngang (mèo cam, vòng tay) cho chiếm 2 cột để không bị cắt xấu
      if (p.src.includes('anh1') || p.src.includes('anh2')) b.classList.add('is-wide');
      b.innerHTML = `<img src="${p.src}" alt="${p.cap}" loading="lazy">`;
      b.addEventListener('click', () => lightbox.open(i));
      grid.appendChild(b);
    });
  }

  /* ---------------- Hộp ảnh 3D (vòng xoay) ---------------- */
  const cube = (function () {
    const stage = $('#cube-stage'), ring = $('#cube-ring');
    let ry = 0, dragging = false, startX = 0, startRy = 0, moved = false, resumeTimer;
    function pause() { ring.classList.remove('is-auto'); }
    function resume() { if (!reduceMotion) ring.classList.add('is-auto'); }
    function build() {
      const n = CONFIG.photos.length;
      const w = isMobile ? 150 : 190;
      const radius = Math.round((w / 2) / Math.tan(Math.PI / n)) + 24;
      ring.innerHTML = '';
      CONFIG.photos.forEach((p, i) => {
        const f = document.createElement('button');
        f.type = 'button';
        f.className = 'cube-face';
        f.style.setProperty('--angle', (360 / n) * i + 'deg');
        f.style.setProperty('--radius', radius + 'px');
        f.innerHTML = `<img src="${p.src}" alt="${p.cap}" loading="lazy">`;
        f.addEventListener('click', () => { if (!moved) lightbox.open(i); });
        ring.appendChild(f);
      });
    }
    function onDown(x) {
      dragging = true; moved = false; startX = x;
      // lấy góc hiện tại từ animation rồi chuyển sang điều khiển tay
      const m = getComputedStyle(ring).transform;
      if (m && m !== 'none') {
        const v = m.match(/matrix3d\((.+)\)/);
        if (v) {
          const a = v[1].split(',').map(parseFloat);
          ry = Math.atan2(a[8], a[10]) * 180 / Math.PI; // rotateY từ matrix
        }
      }
      startRy = ry;
      pause();
      ring.style.setProperty('--ry', ry + 'deg');
      stage.classList.add('is-dragging');
      clearTimeout(resumeTimer);
    }
    function onMove(x) {
      if (!dragging) return;
      const dx = x - startX;
      if (Math.abs(dx) > 6) moved = true;
      ry = startRy + dx * 0.4;
      ring.style.setProperty('--ry', ry + 'deg');
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove('is-dragging');
      resumeTimer = setTimeout(() => { ring.style.removeProperty('--ry'); resume(); }, 2500);
    }
    stage.addEventListener('mousedown', (e) => onDown(e.clientX));
    addEventListener('mousemove', (e) => onMove(e.clientX));
    addEventListener('mouseup', onUp);
    stage.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true });
    stage.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
    stage.addEventListener('touchend', onUp);
    return { build, pause, resume };
  })();
  function initCube() { cube.build(); }

  /* ---------------- Thư ---------------- */
  function initLetter() {
    const env = $('#envelope'), paper = $('#letter-paper'), body = $('#letter-body');
    const sign = $('#letter-sign'), replay = $('#letter-replay'), hint = $('#env-hint'), wrap = $('#envelope-wrap');
    let typing = null;

    function typeLetter() {
      clearTimeout(typing);
      body.innerHTML = '';
      sign.hidden = true; replay.hidden = true;
      const text = CONFIG.letter;
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      const textNode = document.createTextNode('');
      body.appendChild(textNode); body.appendChild(cursor);
      let i = 0;
      const speed = reduceMotion ? 0 : 28;
      (function step() {
        if (i < text.length) {
          textNode.data += text[i++];
          // dừng lâu hơn một chút ở dấu câu để đọc tự nhiên
          const ch = text[i - 1];
          const d = ch === '.' || ch === '\n' ? speed * 6 : ch === ',' ? speed * 3 : speed;
          typing = setTimeout(step, d);
        } else {
          cursor.remove();
          sign.hidden = false; replay.hidden = false;
        }
      })();
    }

    env.addEventListener('click', () => {
      if (env.classList.contains('is-open')) return;
      env.classList.add('is-open');
      hint.textContent = '';
      pop(900, 0.1);
      music.duck(0.35);
      setTimeout(() => {
        wrap.style.display = 'none';
        paper.hidden = false;
        typeLetter();
      }, 1200);
    });
    replay.addEventListener('click', () => { typeLetter(); pop(700); });
  }

  /* ---------------- Nhạc ---------------- */
  const music = (function () {
    const audio = $('#bgm'), btn = $('#btn-music'), disc = $('#disc');
    const title = $('#track-title'), artist = $('#track-artist');
    const fill = $('#progress-fill'), prog = $('#progress'), tCur = $('#time-cur'), tDur = $('#time-dur');
    const playBtn = $('#ctrl-play'), list = $('#playlist');
    let idx = 0, userMuted = false;

    const fmt = (s) => isNaN(s) ? '0:00' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

    function load(i) {
      idx = (i + CONFIG.tracks.length) % CONFIG.tracks.length;
      const t = CONFIG.tracks[idx];
      audio.src = t.src;
      title.textContent = t.title;
      artist.textContent = t.artist;
      $$('li', list).forEach((li, j) => li.classList.toggle('is-active', j === idx));
    }
    function ui(playing) {
      btn.classList.toggle('is-on', playing);
      btn.setAttribute('aria-pressed', String(playing));
      disc.classList.toggle('is-spinning', playing);
      playBtn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    }
    async function play() {
      try { await audio.play(); userMuted = false; ui(true); } catch (e) { ui(false); throw e; }
    }
    function pause() { audio.pause(); ui(false); }
    function toggle() {
      if (audio.paused) play().then(() => toast('🎵 Đã bật nhạc')).catch(() => toast('Chạm lại để bật nhạc nha'));
      else { pause(); userMuted = true; toast('🔇 Đã tắt nhạc'); }
    }
    function duck(v) {
      // hạ nhỏ nhạc rồi từ từ lên lại (lúc mở thư)
      const base = 0.7;
      audio.volume = v;
      setTimeout(() => {
        let cur = v;
        const iv = setInterval(() => { cur = Math.min(base, cur + 0.05); audio.volume = cur; if (cur >= base) clearInterval(iv); }, 200);
      }, 4000);
    }

    // Playlist
    CONFIG.tracks.forEach((t, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="pl-num">${String(i + 1).padStart(2, '0')}</span>
        <span><div class="pl-title">${t.title}</div><div class="pl-sub">${t.artist}</div></span>
        <i class="fa-solid fa-heart" style="color:var(--pink-400)"></i>`;
      li.addEventListener('click', () => { load(i); play().catch(() => {}); });
      list.appendChild(li);
    });

    audio.volume = 0.7;
    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      fill.style.width = (audio.currentTime / audio.duration) * 100 + '%';
      tCur.textContent = fmt(audio.currentTime);
      tDur.textContent = fmt(audio.duration);
    });
    audio.addEventListener('ended', () => { load(idx + 1); play().catch(() => {}); });
    audio.addEventListener('pause', () => ui(false));
    audio.addEventListener('play', () => ui(true));
    prog.addEventListener('click', (e) => {
      const r = prog.getBoundingClientRect();
      if (audio.duration) audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
    });
    btn.addEventListener('click', toggle);
    playBtn.addEventListener('click', toggle);
    $('#ctrl-prev').addEventListener('click', () => { load(idx - 1); play().catch(() => {}); });
    $('#ctrl-next').addEventListener('click', () => { load(idx + 1); play().catch(() => {}); });

    load(0);
    return { play, pause, toggle, duck, get userMuted() { return userMuted; } };
  })();
  function initMusic() { /* đã khởi tạo ở trên */ }

  /* ---------------- Tim bay khi chạm ---------------- */
  const HEART_EMOJI = ['💗', '💖', '🩷', '💕', '🌸'];
  function spawnHearts(x, y, n = 1) {
    for (let i = 0; i < n; i++) {
      const h = document.createElement('span');
      h.className = 'tap-heart';
      h.textContent = HEART_EMOJI[Math.floor(Math.random() * HEART_EMOJI.length)];
      h.style.left = x + 'px';
      h.style.top = y + 'px';
      h.style.setProperty('--dx', rand(-40, 40) + 'px');
      h.style.setProperty('--rot', rand(-30, 30) + 'deg');
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1000);
    }
  }
  function initTapHearts() {
    let last = 0;
    $('#app').addEventListener('click', (e) => {
      const now = performance.now();
      if (now - last < 80) return; // chống spam, giữ máy nhẹ
      last = now;
      if (document.querySelectorAll('.tap-heart').length > 12) return;
      spawnHearts(e.clientX, e.clientY, 1);
    });
  }
})();
