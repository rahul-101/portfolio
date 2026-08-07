/* ---------- Helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Theme toggle ---------- */
const root = document.documentElement;
const themeToggle = $('#themeToggle');
const storedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const metaTheme = $('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', theme === 'light' ? '#fafaf9' : '#0c0a09');
}

if (storedTheme) {
  applyTheme(storedTheme);
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

themeToggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ---------- Nav scroll state ---------- */
const nav = $('.nav');
const onScrollNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScrollNav, { passive: true });
onScrollNav();

/* ---------- Scroll progress bar ---------- */
const scrollProgress = $('#scrollProgress');
if (scrollProgress) {
  const onScrollProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScrollProgress, { passive: true });
  window.addEventListener('resize', onScrollProgress, { passive: true });
  onScrollProgress();
}

/* ---------- Mobile menu ---------- */
const navToggle = $('#navToggle');
const navLinks = $('#navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

/* ---------- Active nav highlight ---------- */
const sections = $$('section[id]');
const navAnchors = $$('.nav-links a');

function updateActive() {
  let current = '';
  const pos = window.scrollY + 120;
  sections.forEach((s) => {
    if (pos >= s.offsetTop) current = s.id;
  });
  navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}

window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

/* ---------- Scroll reveal with stagger ---------- */
const revealEls = $$('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

const grouped = [
  '.skills-grid .reveal',
  '.projects-grid .reveal',
  '.writing-grid .reveal',
  '.testimonials .reveal',
  '.creds-grid .reveal',
  '.timeline-item'
];

grouped.forEach((selector) => {
  $$(selector).forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 0.08, 0.4) + 's';
  });
});

if (!prefersReducedMotion) {
  $$('.skill-card').forEach((card) => {
    const idx = [...card.parentElement.children].indexOf(card);
    card.style.setProperty('--si', idx);
    card.querySelectorAll('.skill-ic').forEach((ic) => {
      ic.style.setProperty('--si', idx);
    });
  });
}

revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- Count-up stats ---------- */
const counterEls = $$('.stat-num');
let counted = false;

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('en-US');
    if (p < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const statTarget = $('.about-stats');
if (statTarget && counterEls.length) {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          counterEls.forEach(animateCounter);
          statObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  statObserver.observe(statTarget);
}

/* ---------- Skill bar fill ---------- */
const bars = $$('.skill-bar i');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.style.getPropertyValue('--w');
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);
bars.forEach((bar) => barObserver.observe(bar));

/* ---------- Typewriter ---------- */
const typewriterEl = $('#typewriter');
const roles = [
  'intelligent agents.',
  'resilient automation.',
  'data platforms.',
  'measurable outcomes.'
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeTick() {
  const current = roles[roleIndex];
  const delay = deleting ? 45 : 95;

  typewriterEl.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeTick, delay);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeTick, delay);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeTick, 1800);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeTick, 350);
  }
}

if (typewriterEl && !prefersReducedMotion) {
  typeTick();
} else if (typewriterEl) {
  typewriterEl.textContent = roles[0];
}


/* ---------- Contact form ---------- */
const form = $('#contactForm');
const formStatus = $('#formStatus');
const formSubmitBtn = $('#formSubmit');

function setStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = 'form-status' + (type ? ' ' + type : '');
}

function validateField(input) {
  const valid = input.checkValidity();
  input.classList.toggle('invalid', !valid);
  return valid;
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let valid = true;
    ['name', 'email', 'message'].forEach((id) => {
      const input = $('#' + id);
      if (!validateField(input)) valid = false;
    });
    if (!valid) {
      setStatus('Please fill in the highlighted fields.', 'error');
      return;
    }

    formSubmitBtn.disabled = true;
    formSubmitBtn.textContent = 'Sending...';

    const data = new FormData(form);
    if (data.get('_honey')) {
      setStatus('Message received.', 'success');
      formSubmitBtn.disabled = false;
      formSubmitBtn.textContent = 'Send message';
      return;
    }

    try {
      const res = await fetch('https://formsubmit.co/ajax/biswas.rahul1105@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _subject: 'Portfolio message from ' + data.get('name'),
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (res.ok) {
        setStatus('Thanks — your message has been sent. I\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      setStatus('Couldn\'t send via form — email me directly at biswas.rahul1105@gmail.com', 'error');
    }

    formSubmitBtn.disabled = false;
    formSubmitBtn.textContent = 'Send message';
  });

  ['name', 'email', 'message'].forEach((id) => {
    $('#' + id).addEventListener('input', (e) => e.target.classList.remove('invalid'));
  });
}

/* ---------- Reduced-motion fallback ---------- */
if (prefersReducedMotion) {
  counterEls.forEach((el) => {
    el.textContent = parseInt(el.dataset.count, 10).toLocaleString('en-US');
  });
  bars.forEach((bar) => {
    bar.style.width = bar.style.getPropertyValue('--w');
  });
}

/* ---------- Certifications marquee (right to left loop) ---------- */
const certGrid = $('.cert-grid');
if (certGrid) {
  const track = certGrid.querySelector('.cert-track');

  if (prefersReducedMotion) {
    certGrid.classList.add('is-reduced');
    if (track) track.remove();
  } else {
    const items = Array.from(certGrid.children).filter((el) => el.classList.contains('cert-item'));
    if (track) {
      items.forEach((it) => track.appendChild(it));
      // duplicate for seamless 50% loop
      items.forEach((it) => track.appendChild(it.cloneNode(true)));
    }
  }
}

/* ============================================================
   Modern interactions — cursor glow, spotlight, magnetic,
   parallax, tilt (guarded by reduced-motion)
   ============================================================ */

/* ---------- Cursor glow ---------- */
if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  document.documentElement.style.setProperty('--gx', '50%');
  document.documentElement.style.setProperty('--gy', '50%');
  window.addEventListener('pointermove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    document.documentElement.style.setProperty('--gx', ((e.clientX / w) * 100).toFixed(1) + '%');
    document.documentElement.style.setProperty('--gy', ((e.clientY / h) * 100).toFixed(1) + '%');
  }, { passive: true });
}

/* ---------- Spotlight on skill/writing cards ---------- */
if (!prefersReducedMotion) {
  $$('.skill-card, .writing-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left).toFixed(1) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top).toFixed(1) + 'px');
    }, { passive: true });
  });
}

/* ---------- Magnetic buttons ---------- */
if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  $$('.btn[data-magnetic]').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = 'translate(' + (dx * 0.18).toFixed(1) + 'px, ' + (dy * 0.22).toFixed(1) + 'px)';
    }, { passive: true });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    }, { passive: true });
  });
}

/* ---------- Hero parallax (scroll + pointer) ---------- */
if (!prefersReducedMotion) {
  const heroBg = $('.background');
  if (heroBg) {
    const setParallax = () => {
      const sy = window.scrollY;
      document.documentElement.style.setProperty('--parallax-y', (sy * -0.1).toFixed(1) + 'px');
    };
    window.addEventListener('scroll', setParallax, { passive: true });
    setParallax();
  }
}

/* ---------- 3D tilt on project cards ---------- */
if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  $$('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', ((px - 0.5) * 5).toFixed(2) + 'deg');
      card.style.setProperty('--rx', ((0.5 - py) * 5).toFixed(2) + 'deg');
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    }, { passive: true });
  });
}

/* ---------- Scroll-linked text reveal ---------- */
/* Splits each section title into characters that progressively rise
   and flash into view as the user scrolls, then fade out on exit. */
if (!prefersReducedMotion) {
  const scrollTitles = $$('.section-title');
  const titleChars = [];

  scrollTitles.forEach((title) => {
    const text = title.textContent.trim();
    if (!text) return;
    title.setAttribute('aria-label', text);
    title.textContent = '';
    const mask = document.createElement('span');
    mask.className = 'st-mask';
    text.split('').forEach(() => {
      const c = document.createElement('span');
      c.className = 'st-char';
      c.textContent = '';
      mask.appendChild(c);
    });
    title.appendChild(mask);

    // populate char texts (render spaces as non-breaking so inline-block spans keep them)
    const chars = [...text];
    mask.querySelectorAll('.st-char').forEach((el, i) => {
      el.textContent = chars[i] === ' ' ? '\u00A0' : chars[i];
    });
    titleChars.push({ title, chars: mask.querySelectorAll('.st-char'), start: null });
  });

  function onScrollTitles() {
    titleChars.forEach((item) => {
      const rect = item.title.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) {
        item.chars.forEach((c) => {
          c.classList.remove('st-in');
          c.classList.remove('st-out');
        });
        return;
      }
      const progress = (vh - rect.top) / (vh * 0.6);
      const k = Math.max(0, Math.min(1, progress));
      item.chars.forEach((c, i) => {
        const dur = 1.2;
        const phase = i / item.chars.length * dur;
        c.style.transitionDelay = phase + 's';
        if (k > 0.02) {
          c.classList.add('st-in');
          c.classList.remove('st-out');
        }
        if (k < 0.05 || rect.top > vh * 0.98) {
          c.classList.remove('st-in');
        }
      });
    });
  }
  onScrollTitles();
  window.addEventListener('scroll', onScrollTitles, { passive: true });
  window.addEventListener('resize', onScrollTitles, { passive: true });
}
