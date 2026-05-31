document.addEventListener('DOMContentLoaded', () => {

  /* NAV scroll shadow */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20), { passive: true });

  /* Hamburger */
  const hamburger = document.getElementById('navHamburger');
  const drawer    = document.getElementById('navDrawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      drawer.setAttribute('aria-hidden', !open);
    });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }));
  }

  /* Scroll reveal */
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* FAQ toggle */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-item__q');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-item__q').setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* Terminal typewriter */
  let delay = 400;
  document.querySelectorAll('.t-line').forEach(line => {
    setTimeout(() => { line.style.opacity = '1'; }, delay);
    delay += 600;
  });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
