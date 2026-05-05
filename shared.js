// ===== THEME TOGGLE =====
(function () {
  var saved = localStorage.getItem('cw-theme');
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');

  function buildToggle() {
    var nav = document.querySelector('nav');
    if (!nav || nav.querySelector('.theme-toggle')) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle colour mode');
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    btn.textContent = isLight ? '☾' : '☀';
    btn.addEventListener('click', function () {
      var nowLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (nowLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('cw-theme', 'dark');
        btn.textContent = '☀';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('cw-theme', 'light');
        btn.textContent = '☾';
      }
    });
    var cta = nav.querySelector('.nav-cta');
    if (cta) nav.insertBefore(btn, cta);
    else nav.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildToggle);
  } else {
    buildToggle();
  }
})();

// ===== MOBILE NAV =====
(function () {
  function buildMobileNav() {
    var nav = document.querySelector('nav');
    var links = nav && nav.querySelector('.nav-links');
    if (!nav || !links || nav.querySelector('.nav-mobile-toggle')) return;
    var btn = document.createElement('button');
    btn.className = 'nav-mobile-toggle';
    btn.setAttribute('aria-label', 'Open menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('mobile-open');
      btn.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('mobile-open');
        btn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    nav.appendChild(btn);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildMobileNav);
  else buildMobileNav();
})();

// ===== SCROLL TO TOP =====
(function () {
  function buildScrollTop() {
    var btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
    window.addEventListener('scroll', function () {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildScrollTop);
  else buildScrollTop();
})();

// ===== ANIMATED COUNTERS =====
(function () {
  function runCounter(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    var duration = 2000;
    var start = performance.now();
    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 4);
      var val = target * ease;
      el.textContent = prefix + (decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function buildCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCounter(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { obs.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildCounters);
  else buildCounters();
})();

// Custom cursor disabled — using native browser cursor

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
reveals.forEach(r => observer.observe(r));

// ===== FAQ TOGGLE =====
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== NAV SCROLL ACTIVE =====
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
  navLinks.forEach(link => {
    if (!link.classList.contains('active')) {
      link.style.color = link.getAttribute('href') === '#' + current ? 'var(--lime)' : '';
    }
  });
}, { passive: true });
