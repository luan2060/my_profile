document.addEventListener('DOMContentLoaded', () => {

  /* 1. Navbar scroll effect */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* 2. Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });

  /* 3. Smooth scroll */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        const collapse = document.getElementById('navMenu');
        if (collapse?.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        }
      }
    });
  });

  /* 4. Skill bar animation */
  const skillBars = document.querySelectorAll('.skill-bar');
  const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.width = entry.target.dataset.width + '%';
        }, i * 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(bar => barObserver.observe(bar));

  /* 5. Scroll reveal */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* 6. Avatar upload */
  const uploadInput = document.getElementById('uploadAv');
  const profileImg  = document.getElementById('profileImg');
  if (uploadInput && profileImg) {
    uploadInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = ev => {
        profileImg.style.opacity = '0';
        profileImg.style.transition = 'opacity 0.4s ease';
        profileImg.src = ev.target.result;
        setTimeout(() => { profileImg.style.opacity = '1'; }, 50);
      };
      reader.readAsDataURL(file);
    });
  }

  /* 7. Canvas particles */
  const canvas = document.getElementById('particleCanvas');
  const hero   = document.querySelector('.hero-section');
  if (canvas && hero) {
    const ctx = canvas.getContext('2d');
    let W, H, dots;

    const resize = () => {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    };
    const init = () => {
      const count = Math.floor((W * H) / 16000);
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        a: Math.random() * 0.45 + 0.15
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,179,237,${d.a})`;
        ctx.fill();
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      });
      requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    window.addEventListener('resize', () => { resize(); init(); });
  }

});