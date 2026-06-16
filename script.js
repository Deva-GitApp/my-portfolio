/* =========================================================
   RUDRA DEVA E — PORTFOLIO INTERACTIONS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- Year ----- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* =========================================================
     1. PAGE LOADER
     ========================================================= */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      document.body.classList.remove('no-scroll');
      // GSAP hero entrance once loader is gone
      gsap.from('.hero-content > *', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
      });
    }, 1500);
  });

  /* =========================================================
     2. CUSTOM CURSOR
     ========================================================= */
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cursor hover state on interactive elements
  document.querySelectorAll('a, button, .magnetic-btn, .project-card, .service-card, input, textarea, [data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });

  /* =========================================================
     3. THREE.JS PARTICLES BACKGROUND
     ========================================================= */
  function initThreeBackground() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas, alpha: true, antialias: true, powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle system
    const particleCount = window.innerWidth < 768 ? 800 : 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors    = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x2563EB),
      new THREE.Color(0x06B6D4),
      new THREE.Color(0x14B8A6),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    let targetX = 0, targetY = 0;
    document.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    });

    // Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    const clock = new THREE.Clock();
    function tick() {
      const t = clock.getElapsedTime();
      particles.rotation.y = t * 0.05 + targetX;
      particles.rotation.x = t * 0.03 + targetY;
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    }
    tick();
  }
  initThreeBackground();

  /* =========================================================
     4. LENIS SMOOTH SCROLL
     ========================================================= */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // Hook ScrollTrigger to Lenis
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* =========================================================
     5. TYPED.JS
     ========================================================= */
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'Full Stack Developer',
        'Laravel Specialist',
        'React Developer',
        'Next.js Engineer',
        'Node.js Developer',
        'CodeIgniter Developer',
        'CakePHP Developer',
        'REST API Architect',
        'Flutter Developer',
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1500,
      loop: true,
      showCursor: false,
    });
  }

  /* =========================================================
     6. AOS
     ========================================================= */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: 'mobile',
    });
  }

  /* =========================================================
     7. VANILLA TILT
     ========================================================= */
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      perspective: 1000,
    });
  }

  /* =========================================================
     8. NAVBAR scroll behaviour + active link
     ========================================================= */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollProgress = document.getElementById('scrollProgress');
  const fab = document.getElementById('backToTop');

  function onScroll() {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / docHeight) * 100;

    if (scrollProgress) scrollProgress.style.width = `${progress}%`;
    if (navbar) navbar.classList.toggle('scrolled', scrolled > 60);
    if (fab) fab.classList.toggle('visible', scrolled > 500);

    // Active link
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (scrolled >= top) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* =========================================================
     9. SMOOTH SCROLL on anchor clicks (works with Lenis)
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -80, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile menu after click
      document.getElementById('mobileMenu')?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  /* =========================================================
     10. MOBILE MENU
     ========================================================= */
  const mobileMenu = document.getElementById('mobileMenu');
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.classList.add('no-scroll');
  });
  document.getElementById('mobileMenuClose')?.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  /* =========================================================
     11. BACK TO TOP
     ========================================================= */
  fab?.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =========================================================
     12. THEME TOGGLE
     ========================================================= */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* =========================================================
     13. MAGNETIC BUTTONS
     ========================================================= */
  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* =========================================================
     14. SKILL BARS — animate on scroll into view
     ========================================================= */
  const skillBars = document.querySelectorAll('.skill-bar span');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.progress;
        entry.target.style.width = `${target}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach((bar) => skillObserver.observe(bar));

  /* =========================================================
     15. COUNTERS
     ========================================================= */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => counterObserver.observe(c));

  /* =========================================================
     16. PROJECT FILTERS
     ========================================================= */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hide', !match);
      });
    });
  });

  /* =========================================================
     17. CONTACT FORM
     ========================================================= */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const subject = data.get('subject')?.toString().trim();
    const message = data.get('message')?.toString().trim();

    formStatus.hidden = false;
    formStatus.className = 'form-status';

    if (!name || !email || !subject || !message) {
      formStatus.classList.add('error');
      formStatus.textContent = 'Please fill in all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formStatus.classList.add('error');
      formStatus.textContent = 'Please enter a valid email address.';
      return;
    }

    // Build mailto fallback (replace with real endpoint if you wire one up)
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:deva33.rd5@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    formStatus.classList.add('success');
    formStatus.textContent = 'Thanks! Opening your mail app now…';
    contactForm.reset();
  });

  /* =========================================================
     18. GSAP SCROLLTRIGGER — section title reveals
     ========================================================= */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Section titles
    gsap.utils.toArray('.section-title').forEach((title) => {
      gsap.from(title, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Parallax blobs
    gsap.to('.blob-1', {
      y: 100, scrollTrigger: { scrub: 1 },
    });
    gsap.to('.blob-2', {
      y: -100, scrollTrigger: { scrub: 1 },
    });
  }

  /* =========================================================
     19. CONSOLE EASTER EGG
     ========================================================= */
  console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #2563EB, #14B8A6); -webkit-background-clip: text; background-clip: text; color: transparent;');
  console.log('%cThanks for inspecting the source. Drop me a line: deva33.rd5@gmail.com', 'font-size: 14px; color: #06B6D4;');
});
