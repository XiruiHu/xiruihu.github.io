// main.js — Xirui Hu Portfolio

const DESKTOP = () => window.innerWidth >= 768;

// ── Shared scroll utility ─────────────────────────────────────
function scrollToEl(el, offset = 12) {
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
}

// ── Nav DOM construction ──────────────────────────────────────
function makeStrand() {
  const strand = document.createElement('div');
  strand.className = 'nav-strand';

  const thread = document.createElement('div');
  thread.className = 'nav-thread';
  strand.appendChild(thread);

  for (let i = 0; i < 6; i++) {
    const bead = document.createElement('div');
    bead.className = 'nav-bead';
    strand.appendChild(bead);
  }
  return strand;
}

function makeDoubleStrand() {
  const ds = document.createElement('div');
  ds.className = 'nav-double-strand';
  ds.appendChild(makeStrand());
  ds.appendChild(makeStrand());
  return ds;
}

function buildNav() {
  const nav = document.getElementById('nav');

  const fill = document.createElement('div');
  fill.className = 'nav-fill';
  fill.setAttribute('data-fill', 'true');
  for (let i = 0; i < 80; i++) fill.appendChild(makeStrand());

  const linkRow = document.createElement('div');
  linkRow.className = 'nav-link-row';

  const CN_LABELS = { 'Work': '作品集', 'About': '关于我', 'Resume': '简历', 'Email Me': '邮件我' };

  ['Work', 'About', 'Resume', 'Email Me'].forEach((label, i) => {
    if (i !== 0) linkRow.appendChild(makeDoubleStrand());
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'nav-link';
    a.dataset.section = label;

    const en = document.createElement('span');
    en.className = 'nav-link-en';
    en.textContent = label;

    const cn = document.createElement('span');
    cn.className = 'nav-link-cn';
    cn.textContent = CN_LABELS[label];

    a.appendChild(en);
    a.appendChild(cn);
    linkRow.appendChild(a);
  });
  linkRow.appendChild(makeDoubleStrand());

  // nav-sep: the separator between logo and fill — desktop-only
  const sep = makeDoubleStrand();
  sep.classList.add('nav-sep');

  nav.appendChild(sep);
  nav.appendChild(fill);
  nav.appendChild(linkRow);
}


// ── Hamburger menu ────────────────────────────────────────────
function initHamburger() {
  const btn  = document.getElementById('nav-hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('open');
    if (isOpen) {
      menu.classList.add('open');
      menu.setAttribute('aria-hidden', 'false');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
    } else {
      closeMenu();
    }
  });

  document.querySelectorAll('.mobile-menu-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const s = a.dataset.section;
      closeMenu();
      setTimeout(() => {
        if (s === 'Work')     scrollToEl(document.getElementById('menu'));
        if (s === 'About')    scrollToEl(document.getElementById('about'));
        if (s === 'Resume')   window.location.href = './resume.html';
        if (s === 'Email Me') window.location.href = 'mailto:huxirui24@gmail.com';
      }, 320);
    });
  });
}

// ── Nav bead animations — desktop only ────────────────────────
function initNavAnimations() {
  if (!DESKTOP()) return;

  const nav = document.getElementById('nav');
  const strands = Array.from(nav.querySelectorAll('.nav-strand'));

  const naturalCenters = strands.map(s => {
    const r = s.getBoundingClientRect();
    return r.left + r.width / 2;
  });

  const fillEl = nav.querySelector('[data-fill]');
  const fillRight = fillEl ? fillEl.getBoundingClientRect().right : Infinity;

  const tweens = strands.map(s =>
    gsap.to(s, {
      x: gsap.utils.random(-8, 8),
      rotation: gsap.utils.random(-3, 3),
      duration: gsap.utils.random(2.5, 5.0),
      repeat: -1, yoyo: true,
      ease: 'sine.inOut',
      delay: gsap.utils.random(0, 1.0),
      transformOrigin: 'top center',
    })
  );

  let attractedSet = new Set();

  function startIdle(i) {
    tweens[i] = gsap.to(strands[i], {
      x: gsap.utils.random(-8, 8),
      rotation: gsap.utils.random(-3, 3),
      duration: gsap.utils.random(2.5, 5.0),
      repeat: -1, yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'top center',
    });
  }

  function release(i) {
    gsap.to(strands[i], {
      x: 0, rotation: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)',
      overwrite: true,
      onComplete: () => startIdle(i),
    });
  }

  nav.addEventListener('mousemove', e => {
    const cursorX = e.clientX;
    const RADIUS = 80;

    const dists = naturalCenters.map((cx, i) => ({ i, dist: Math.abs(cursorX - cx) }));
    dists.sort((a, b) => a.dist - b.dist);

    const newSet = new Set();
    for (let k = 0; k < 3 && k < dists.length; k++) {
      if (dists[k].dist < RADIUS) newSet.add(dists[k].i);
    }

    attractedSet.forEach(i => { if (!newSet.has(i)) release(i); });

    newSet.forEach(i => {
      const factor = Math.max(0.08, Math.min(1, (fillRight - naturalCenters[i]) / 60));
      gsap.to(strands[i], {
        x: (cursorX - naturalCenters[i]) * factor,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
      });
    });

    attractedSet = newSet;
  });

  nav.addEventListener('mouseleave', () => {
    attractedSet.forEach(release);
    attractedSet = new Set();
  });
}

// ── Nav hide/reveal on scroll ─────────────────────────────────
function initNavScroll() {
  const nav    = document.getElementById('nav');
  const blurEl = nav.querySelector('.nav-blur-bg');
  let lastY    = window.scrollY;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y <= 5) {
      gsap.to(nav,    { y: 0,   duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(blurEl, { opacity: 0, duration: 0.35, overwrite: 'auto' });
    } else if (y > lastY) {
      gsap.to(nav,    { y: -65, duration: 0.28, ease: 'power2.in',  overwrite: 'auto' });
    } else {
      gsap.to(nav,    { y: 0,   duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(blurEl, { opacity: 1, duration: 0.38, overwrite: 'auto' });
    }
    lastY = y;
  }, { passive: true });
}

// ── Footer visibility ─────────────────────────────────────────
function initFooter() {
  const footer = document.getElementById('footer');
  window.addEventListener('scroll', () => {
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
    footer.classList.toggle('visible', atBottom);
  }, { passive: true });
}

// ── Desktop nav link clicks ───────────────────────────────────
function initNavLinks() {
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const s = a.dataset.section;
      if (s === 'Work')     scrollToEl(document.getElementById('menu'));
      if (s === 'About')    scrollToEl(document.getElementById('about'));
      if (s === 'Resume')   window.location.href = './resume.html';
      if (s === 'Email Me') window.location.href = 'mailto:huxirui24@gmail.com';
    });
  });
}

// ── Hero "Order" → scroll to menu ────────────────────────────
function initHeroOrder() {
  const label = document.getElementById('hero-order');
  const menu  = document.getElementById('menu');
  if (!label || !menu) return;
  label.addEventListener('click', () => scrollToEl(menu));
}

// ── About: bowl of tool logos — scattered on load, draggable within
// the oval afterward (clamped to the ellipse, not just its box) ──
function initToolsBowl() {
  const bowl = document.getElementById('tools-bowl');
  if (!bowl) return;
  const chips = Array.from(bowl.querySelectorAll('.tool-chip'));
  if (!chips.length) return;

  let scattered = false;

  function ellipseClamp(xPct, yPct, chip) {
    const rect = bowl.getBoundingClientRect();
    if (!rect.width || !rect.height) return [xPct, yPct];
    const rx = 50 - (chip.offsetWidth  / 2 / rect.width)  * 100;
    const ry = 50 - (chip.offsetHeight / 2 / rect.height) * 100;
    const dx = xPct - 50, dy = yPct - 50;
    const norm = Math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry));
    if (norm > 1) {
      xPct = 50 + dx / norm;
      yPct = 50 + dy / norm;
    }
    return [xPct, yPct];
  }

  function place(chip, xPct, yPct) {
    chip.style.left = xPct + '%';
    chip.style.top  = yPct + '%';
  }

  function randomScatter() {
    const rect = bowl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    chips.forEach(chip => {
      const angle = Math.random() * Math.PI * 2;
      const r     = Math.sqrt(Math.random()) * 0.85;
      let xPct = 50 + Math.cos(angle) * r * 42;
      let yPct = 50 + Math.sin(angle) * r * 42;
      [xPct, yPct] = ellipseClamp(xPct, yPct, chip);
      place(chip, xPct, yPct);
    });
    scattered = true;
  }

  randomScatter();

  // the bowl is hidden (display:none) below the desktop breakpoint, so
  // it has no size to scatter into until it first becomes visible
  const mq = window.matchMedia('(min-width: 768px)');
  const tryScatter = () => { if (!scattered) randomScatter(); };
  mq.addEventListener('change', tryScatter);
  window.addEventListener('load', tryScatter);

  let active = null, offsetX = 0, offsetY = 0;

  chips.forEach(chip => {
    chip.addEventListener('pointerdown', (e) => {
      active = chip;
      chip.setPointerCapture(e.pointerId);
      chip.classList.add('is-dragging');
      const chipRect = chip.getBoundingClientRect();
      offsetX = e.clientX - (chipRect.left + chipRect.width  / 2);
      offsetY = e.clientY - (chipRect.top  + chipRect.height / 2);
      e.preventDefault();
    });
  });

  window.addEventListener('pointermove', (e) => {
    if (!active) return;
    const rect = bowl.getBoundingClientRect();
    let xPct = ((e.clientX - offsetX - rect.left) / rect.width)  * 100;
    let yPct = ((e.clientY - offsetY - rect.top)  / rect.height) * 100;
    [xPct, yPct] = ellipseClamp(xPct, yPct, active);
    place(active, xPct, yPct);
  });

  window.addEventListener('pointerup', () => {
    if (active) active.classList.remove('is-dragging');
    active = null;
  });
}

// ── Init ──────────────────────────────────────────────────────
buildNav();

gsap.registerPlugin(ScrollTrigger);

requestAnimationFrame(() => {
  initNavAnimations(); // no-op on mobile
  initNavScroll();
});

initHamburger();
initFooter();
initNavLinks();
initHeroOrder();
initToolsBowl();
