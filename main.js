/* ═══════════════════════════════════════════
   BLOOME VINTAGE PORTFOLIO — main.js
═══════════════════════════════════════════ */

/* ── STAR FIELD (intro screen) ── */
function buildStars() {
  const field = document.querySelector('.star-field');
  if (!field) return;
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random()*100}%; left:${Math.random()*100}%;
      animation-duration:${1.5 + Math.random()*3}s;
      animation-delay:${Math.random()*4}s;
    `;
    field.appendChild(s);
  }
}

/* ── INTRO OVERLAY ── */
function initIntro() {
  buildStars();
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;

  // Auto-dismiss after 3.5s OR on button click
  const dismiss = () => {
    overlay.classList.add('hide');
    setTimeout(() => overlay.remove(), 900);
  };

  const btn = document.getElementById('intro-enter');
  if (btn) btn.addEventListener('click', dismiss);
  setTimeout(dismiss, 4000);
}

/* ── NAV SCROLL ── */
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger
  const ham = document.querySelector('.nav-hamburger');
  const mob = document.getElementById('nav-mobile');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
      document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mob.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, #nav-mobile a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === './') || href.endsWith(path)) {
      a.classList.add('active');
    }
  });
}

/* ── SCROLL FADE-IN ── */
function initScrollReveal() {
  const els = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* ── FLOATING PARTICLES ── */
function initParticles(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  const items = ['🍂', '✦', '🦋', '❧', '🌿', '📜', '🌸', '·'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute; font-size:${10+Math.random()*12}px;
      left:${Math.random()*100}%; top:${100+Math.random()*20}%;
      opacity:0; animation:particleDrift ${14+Math.random()*18}s linear ${Math.random()*12}s infinite;
      pointer-events:none;
    `;
    p.textContent = items[Math.floor(Math.random() * items.length)];
    c.appendChild(p);
  }
}

/* ── LIGHTBOX ── */
function initLightbox() {
  const items = document.querySelectorAll('[data-lightbox]');
  if (!items.length) return;
  const box = document.createElement('div');
  box.id = 'lightbox';
  box.style.cssText = `
    position:fixed;inset:0;z-index:8000;background:rgba(14,8,4,0.95);
    display:none;align-items:center;justify-content:center;flex-direction:column;gap:16px;
    cursor:zoom-out;
  `;
  box.innerHTML = `
    <div style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);opacity:0.7;font-family:'Crimson Text',serif;" id="lb-caption"></div>
    <div id="lb-frame" style="max-width:min(700px,90vw);max-height:80vh;overflow:hidden;padding:10px;background:var(--brown-mid);box-shadow:0 0 60px rgba(0,0,0,0.8);">
      <img id="lb-img" src="" alt="" style="width:100%;max-height:75vh;object-fit:contain;filter:sepia(25%) contrast(1.05);display:block;"/>
    </div>
    <button onclick="document.getElementById('lightbox').style.display='none'" style="background:none;border:1px solid var(--gold);color:var(--gold);padding:8px 24px;font-family:'Crimson Text',serif;font-size:14px;letter-spacing:2px;cursor:pointer;">✕ Close</button>
  `;
  document.body.appendChild(box);
  items.forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      document.getElementById('lb-img').src = item.dataset.lightbox;
      document.getElementById('lb-caption').textContent = item.dataset.caption || '';
      box.style.display = 'flex';
    });
  });
  box.addEventListener('click', e => { if (e.target === box) box.style.display = 'none'; });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Letter Sent — Thank You!';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--brown-deep)';
    setTimeout(() => {
      btn.textContent = 'Send Your Letter ✉';
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 3500);
  });
}

/* ── INJECT PARTICLE KEYFRAME ── */
const style = document.createElement('style');
style.textContent = `
  @keyframes particleDrift {
    0%   { opacity:0; transform:translateY(0) rotate(0deg); }
    10%  { opacity:0.35; }
    90%  { opacity:0.2; }
    100% { opacity:0; transform:translateY(-110vh) rotate(360deg); }
  }
`;
document.head.appendChild(style);

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initNav();
  initScrollReveal();
  initLightbox();
  initContactForm();
  initParticles('particle-field');
});
