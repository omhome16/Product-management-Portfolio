/* ============================================================
   PM PORTFOLIO — Interactive Engine
   Halftone Generator, GSAP Timeline, Palette & Cursor Dynamics
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Initialize Lucide Icons ──
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ============================================================
  // PAGE LOADER
  // ============================================================
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      document.body.classList.remove('loading');
      initHeroAnimations();
    }, 1500);
  }

  // ============================================================
  // CUSTOM CURSOR
  // ============================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover scale effects on premium elements
    const interactiveSelectors = 'a, button, .case-panel, .skill-card, .nav-link, .command-item, .magnetic';
    document.body.addEventListener('mouseenter', (e) => {
      if (e.target.matches && e.target.matches(interactiveSelectors)) {
        cursorDot.classList.add('active');
        cursorRing.classList.add('active');
      }
    }, true);

    document.body.addEventListener('mouseleave', (e) => {
      if (e.target.matches && e.target.matches(interactiveSelectors)) {
        cursorDot.classList.remove('active');
        cursorRing.classList.remove('active');
      }
    }, true);

    // Hide cursor when leaving viewport
    document.addEventListener('mouseleave', () => {
      cursorDot.classList.add('hidden');
      cursorRing.classList.add('hidden');
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.classList.remove('hidden');
      cursorRing.classList.remove('hidden');
    });
  }

  // ============================================================
  // GENERATIVE INTERACTIVE AURORA CANVAS ENGINE
  // ============================================================
  function initAuroraCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let mouse = { x: null, y: null, targetX: null, targetY: null };

    // Aurora Wave class definition
    class AuroraWave {
      constructor(color1, color2, baseHeightPercent, speed, amplitude, frequency) {
        this.color1 = color1;
        this.color2 = color2;
        this.baseHeightPercent = baseHeightPercent;
        this.speed = speed;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.phase = Math.random() * 100;
      }

      draw(time, mX, mY) {
        this.phase += this.speed;
        const w = width;
        const h = height;
        const maxRadius = 240;

        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.filter = 'blur(40px)'; // Blurs curves into glowing gaseous curtains

        ctx.beginPath();
        ctx.moveTo(0, h);

        const segments = 16;
        const segmentWidth = w / segments;

        for (let i = 0; i <= segments; i++) {
          const x = i * segmentWidth;
          const baseHeight = h * this.baseHeightPercent;
          
          let y = baseHeight + Math.sin(i * this.frequency + this.phase) * this.amplitude;

          // Mouse warp displacement calculation
          if (mX !== null && mY !== null) {
            const dx = x - mX;
            const dy = y - mY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxRadius) {
              const force = (maxRadius - dist) / maxRadius;
              y += (mY - y) * force * 0.45;
            }
          }

          if (i === 0) {
            ctx.lineTo(x, y);
          } else {
            const prevX = (i - 1) * segmentWidth;
            const cpX = (prevX + x) / 2;
            const prevY = baseHeight + Math.sin((i - 1) * this.frequency + this.phase) * this.amplitude;
            
            let interpolatedPrevY = prevY;
            if (mX !== null && mY !== null) {
              const dxPrev = prevX - mX;
              const dyPrev = prevY - mY;
              const distPrev = Math.sqrt(dxPrev * dxPrev + dyPrev * dyPrev);
              if (distPrev < maxRadius) {
                const forcePrev = (maxRadius - distPrev) / maxRadius;
                interpolatedPrevY += (mY - prevY) * forcePrev * 0.45;
              }
            }
            
            ctx.quadraticCurveTo(prevX, interpolatedPrevY, cpX, (interpolatedPrevY + y) / 2);
          }
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, h * (this.baseHeightPercent - 0.2), 0, h);
        gradient.addColorStop(0, this.color1);
        gradient.addColorStop(0.25, this.color2);
        gradient.addColorStop(0.85, 'rgba(4, 4, 6, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
    }

    // Colors mapping to our branding accents
    const waves = [
      new AuroraWave('rgba(139, 92, 246, 0.45)', 'rgba(59, 130, 246, 0.22)', 0.32, 0.003, 65, 0.22), // Accent Purple & Blue
      new AuroraWave('rgba(29, 185, 84, 0.3)', 'rgba(16, 163, 127, 0.15)', 0.48, 0.002, 50, 0.15),   // Spotify Green & Teal
      new AuroraWave('rgba(226, 55, 68, 0.22)', 'rgba(139, 92, 246, 0.12)', 0.64, 0.0025, 75, 0.26)  // Zomato Red & Purple
    ];

    function resize() {
      // Draw at half resolution and scale via CSS for extreme performance and smoother blur blending
      width = window.innerWidth / 2;
      height = window.innerHeight / 2;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * width;
      mouse.targetY = ((e.clientY - rect.top) / rect.height) * height;
    });

    window.addEventListener('mouseleave', () => {
      mouse.targetX = null;
      mouse.targetY = null;
    });

    mouse.x = width / 2;
    mouse.y = height / 2;

    function render(time) {
      ctx.clearRect(0, 0, width, height);

      // Damp coordinates
      if (mouse.targetX !== null) {
        if (mouse.x === null) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x = null;
        mouse.y = null;
      }

      // Draw soft interactive cursor spotlight
      if (mouse.x !== null && mouse.y !== null) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.filter = 'blur(25px)';
        const spotlight = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        spotlight.addColorStop(0, 'rgba(139, 92, 246, 0.18)');
        spotlight.addColorStop(0.5, 'rgba(59, 130, 246, 0.08)');
        spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      waves.forEach(w => w.draw(time, mouse.x, mouse.y));

      requestAnimationFrame(render);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(render);
  }

  initAuroraCanvas();

  // ============================================================
  // INTERACTIVE BRAINSTORMING ILLUSTRATION
  // ============================================================
  function initBrainstormCanvas() {
    const canvas = document.getElementById('brainstormCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = 0, h = 0;
    let particles = [];
    let mouse = { x: null, y: null };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.baseRadius = Math.random() * 2.5 + 1.5;
        this.radius = this.baseRadius;
        // Palettes: Purple, Teal, Pink, Soft Blue
        const colors = [
          'rgba(139, 92, 246, 0.75)', // violet
          'rgba(16, 163, 127, 0.75)',  // teal
          'rgba(244, 63, 94, 0.75)',   // rose
          'rgba(59, 130, 246, 0.75)'   // blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulsePhase = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Pulse size slightly
        this.pulsePhase += this.pulseSpeed;
        this.radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.8;

        // Bounce off walls
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
        
        // Clamp to fit
        if (this.x < 0) this.x = 0;
        if (this.x > w) this.x = w;
        if (this.y < 0) this.y = 0;
        if (this.y > h) this.y = h;

        // Mouse attraction/repulsion warp
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const activeRadius = 130;

          if (dist < activeRadius) {
            // Pull particles gently towards mouse
            const force = (activeRadius - dist) / activeRadius;
            this.x -= dx * force * 0.04;
            this.y -= dy * force * 0.04;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Soft outer shadow for the brainstorming nodes
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    function initParticles() {
      particles = [];
      const density = Math.floor((w * h) / 4500);
      const count = Math.max(22, Math.min(density, 40));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw line to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = p1.x - mouse.x;
          const dyMouse = p1.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distMouse < 130) {
            const alpha = (1 - (distMouse / 130)) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        // Draw line to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            const alpha = (1 - (dist / 85)) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      // Draw mouse background halo spotlight
      if (mouse.x !== null && mouse.y !== null) {
        ctx.save();
        const spotlight = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 140);
        spotlight.addColorStop(0, 'rgba(139, 92, 246, 0.08)');
        spotlight.addColorStop(0.5, 'rgba(16, 163, 127, 0.03)');
        spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw dynamic web lines
      drawConnections();

      // Update and draw nodes
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });
    requestAnimationFrame(animate);
  }

  initAuroraCanvas();
  initBrainstormCanvas();

  // ============================================================
  // STICKY HEADER & SCROLL TRACKING
  // ============================================================
  const nav = document.getElementById('mainNav');
  let lastScroll = 0;
  let navHidden = false;

  function handleHeader() {
    const currentScroll = window.scrollY;

    // Background blur toggling
    if (currentScroll > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Scroll direction detector (hides/shows navbar)
    if (currentScroll > 250) {
      if (currentScroll > lastScroll + 10 && !navHidden) {
        nav.classList.add('nav-hidden');
        navHidden = true;
      } else if (currentScroll < lastScroll - 10 && navHidden) {
        nav.classList.remove('nav-hidden');
        navHidden = false;
      }
    } else {
      nav.classList.remove('nav-hidden');
      navHidden = false;
    }

    lastScroll = currentScroll;
  }

  // Scroll Progress indicator
  const progressFill = document.getElementById('scrollProgress');
  function updateProgress() {
    const heightLimit = document.documentElement.scrollHeight - window.innerHeight;
    const offset = window.scrollY;
    const progress = heightLimit > 0 ? (offset / heightLimit) * 100 : 0;
    if (progressFill) {
      progressFill.style.width = progress + '%';
    }
  }

  // Active navigation markers
  const menuLinks = document.querySelectorAll('.nav-link[data-section]');
  const mainSections = document.querySelectorAll('.section[id], .hero[id]');

  function updateMenuState() {
    const viewCenter = window.scrollY + window.innerHeight / 3;
    let focused = '';

    mainSections.forEach(sec => {
      if (viewCenter >= sec.offsetTop) {
        focused = sec.id;
      }
    });

    menuLinks.forEach(link => {
      if (link.dataset.section === focused) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    handleHeader();
    updateProgress();
    updateMenuState();
  }, { passive: true });

  // ============================================================
  // MOBILE MENU TRIGGER
  // ============================================================
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================================
  // COUNTERS ANIMATION (Eased triggers)
  // ============================================================
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const targetNum = parseInt(element.dataset.count);
          const suffix = element.dataset.suffix || '';
          const animDuration = 1500;
          const startTime = performance.now();

          function drawCounter(currentTime) {
            const delta = currentTime - startTime;
            const percentage = Math.min(delta / animDuration, 1);
            
            // Ease out cubic curves
            const easeVal = 1 - Math.pow(1 - percentage, 3);
            const currentCount = Math.round(easeVal * targetNum);
            element.textContent = currentCount + suffix;

            if (percentage < 1) {
              requestAnimationFrame(drawCounter);
            }
          }

          requestAnimationFrame(drawCounter);
          countObserver.unobserve(element);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(cnt => countObserver.observe(cnt));
  }

  // ============================================================
  // GSAP SCROLL & TRANSITION SCHEDULER
  // ============================================================
  function initHeroAnimations() {
    animateCounters();

    // Check GSAP availability
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero text line mask reveal
      const textRevealTimeline = gsap.timeline();
      textRevealTimeline
        .from('.hero-badge', { opacity: 0, y: 15, duration: 0.5, ease: 'power2.out' })
        .from('.revealed-text', {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-subtitle', { opacity: 0, y: 15, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('.hero-meta', { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .from('.hero-actions', { opacity: 0, y: 15, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('.brainstorm-container', { opacity: 0, scale: 0.96, y: 25, duration: 0.8, ease: 'power3.out' }, '-=0.7')
        .from('.hero-scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.2');

      // Timeline nodes intersection timeline
      ScrollTrigger.create({
        trigger: '.timeline-container',
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 0.4,
        onUpdate: (self) => {
          const percentage = self.progress;
          const progressEl = document.getElementById('timelineProgress');
          if (progressEl) {
            if (window.innerWidth <= 768) {
              progressEl.style.height = (percentage * 100) + '%';
            } else {
              progressEl.style.width = (percentage * 100) + '%';
            }
          }

          const steps = document.querySelectorAll('.timeline-node');
          steps.forEach((step, idx) => {
            const ratio = (idx + 0.25) / steps.length;
            if (percentage >= ratio) {
              step.classList.add('active');
            } else {
              step.classList.remove('active');
            }
          });
        }
      });

      // Stagger section headers
      gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true
          },
          opacity: 0,
          y: 25,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        });
      });

      // Stagger case showcase panels
      gsap.utils.toArray('.case-panel').forEach((panel, i) => {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: 'top 88%',
            once: true
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      // Skill cards fade grid
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 88%',
          once: true
        },
        opacity: 0,
        y: 25,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  }

  // ============================================================
  // 3D PARALLAX OVERLAYS
  // ============================================================
  if (!isTouchDevice) {
    const panels = document.querySelectorAll('.case-panel, .visual-card');
    panels.forEach(p => {
      p.addEventListener('mousemove', (e) => {
        const box = p.getBoundingClientRect();
        const cursorX = e.clientX - box.left;
        const cursorY = e.clientY - box.top;
        const centerPointX = box.width / 2;
        const centerPointY = box.height / 2;

        const dynamicRotX = ((cursorY - centerPointY) / centerPointY) * -2;
        const dynamicRotY = ((cursorX - centerPointX) / centerPointX) * 2;

        p.style.transform = `perspective(1000px) rotateX(${dynamicRotX}deg) rotateY(${dynamicRotY}deg) translateY(-4px)`;
      });

      p.addEventListener('mouseleave', () => {
        p.style.transform = '';
      });
    });
  }

  // ============================================================
  // MAGNETIC CTA FORCE
  // ============================================================
  if (!isTouchDevice) {
    document.querySelectorAll('.magnetic').forEach(elem => {
      elem.addEventListener('mousemove', (e) => {
        const dim = elem.getBoundingClientRect();
        const strengthX = e.clientX - dim.left - dim.width / 2;
        const strengthY = e.clientY - dim.top - dim.height / 2;
        elem.style.transform = `translate(${strengthX * 0.12}px, ${strengthY * 0.12}px)`;
      });

      elem.addEventListener('mouseleave', () => {
        elem.style.transform = '';
      });
    });
  }

  // ============================================================
  // COMMAND PALETTE NAV ENGINE
  // ============================================================
  const palette = document.getElementById('commandPalette');
  const queryField = document.getElementById('commandInput');
  const listWrapper = document.getElementById('commandResults');
  let cursorIdx = 0;

  const navigateToCaseStudy = (longPath, shortPath) => {
    if (window.location.protocol === 'file:') {
      window.open(longPath, '_blank');
    } else {
      window.open(shortPath, '_blank');
    }
  };

  const dataset = [
    { label: 'Zomato Gold Case Study', desc: 'Subscription and habits layer analysis', action: () => { navigateToCaseStudy('Zomato%20Gold%20Retention-Beyond%20Discounts/web/index.html', '/zomato/'); }},
    { label: 'Spotify Creator Obscurity', desc: 'Podcast retention and discovery loops', action: () => { navigateToCaseStudy('Spotify%20Podcast%20Discovery%20The%20New%20Creator%20Gap/web/index.html', '/spotify/'); }},
    { label: 'ChatGPT Socratic Guidance', desc: 'Academic calibration UX proposal', action: () => { navigateToCaseStudy('ChatGPT%20Academic%20Honesty%20for%20Indian%20Students/web/index.html', '/chatgpt/'); }},
    { label: 'PM Process Steps', desc: 'Horizontal frameworks walk', action: () => scrollToAnchor('#process') },
    { label: 'Case Showcase', desc: 'Rigorous strategic works list', action: () => scrollToAnchor('#case-studies') },
    { label: 'About om', desc: 'IIIT Nagpur credentials and skills', action: () => scrollToAnchor('#about') },
    { label: 'Reset Top', desc: 'Scroll up', icon: 'arrow-up', action: () => scrollToAnchor('#hero') },
  ];

  let matches = [...dataset];

  function scrollToAnchor(targetId) {
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function launchPalette() {
    palette.classList.add('open');
    queryField.value = '';
    matches = [...dataset];
    cursorIdx = 0;
    drawItems();
    setTimeout(() => queryField.focus(), 60);
  }

  function hidePalette() {
    palette.classList.remove('open');
  }

  function drawItems() {
    if (matches.length === 0) {
      listWrapper.innerHTML = '<div class="command-empty">No matching actions</div>';
      return;
    }

    listWrapper.innerHTML = matches.map((item, idx) => `
      <div class="command-item ${idx === cursorIdx ? 'selected' : ''}" data-index="${idx}">
        <span class="command-label">${applyHighlight(item.label, queryField.value)}</span>
        <span class="command-desc">${item.desc}</span>
      </div>
    `).join('');

    listWrapper.querySelectorAll('.command-item').forEach(node => {
      node.addEventListener('click', () => {
        const i = parseInt(node.dataset.index);
        matches[i].action();
        hidePalette();
      });

      node.addEventListener('mouseenter', () => {
        cursorIdx = parseInt(node.dataset.index);
        highlightSelection();
      });
    });
  }

  function applyHighlight(fullStr, searchStr) {
    if (!searchStr) return fullStr;
    const cleanWord = searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${cleanWord})`, 'gi');
    return fullStr.replace(regex, '<strong>$1</strong>');
  }

  function highlightSelection() {
    const list = listWrapper.querySelectorAll('.command-item');
    list.forEach((node, i) => {
      node.classList.toggle('selected', i === cursorIdx);
    });

    const activeNode = listWrapper.querySelector('.command-item.selected');
    if (activeNode) {
      activeNode.scrollIntoView({ block: 'nearest' });
    }
  }

  function searchList(value) {
    const query = value.toLowerCase().trim();
    if (!query) {
      matches = [...dataset];
    } else {
      matches = dataset.filter(x =>
        x.label.toLowerCase().includes(query) ||
        x.desc.toLowerCase().includes(query)
      );
    }
    cursorIdx = 0;
    drawItems();
  }

  // Keyboard shortcut triggers
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (palette.classList.contains('open')) {
        hidePalette();
      } else {
        launchPalette();
      }
      return;
    }

    if (!palette.classList.contains('open')) return;

    if (e.key === 'Escape') {
      hidePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      cursorIdx = Math.min(cursorIdx + 1, matches.length - 1);
      highlightSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cursorIdx = Math.max(cursorIdx - 1, 0);
      highlightSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (matches[cursorIdx]) {
        matches[cursorIdx].action();
        hidePalette();
      }
    }
  });

  if (queryField) {
    queryField.addEventListener('input', () => {
      searchList(queryField.value);
    });
  }

  const shade = palette.querySelector('.command-overlay');
  if (shade) {
    shade.addEventListener('click', hidePalette);
  }

  const triggerBtn = document.getElementById('navCmdBtn');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', launchPalette);
  }

  // Smooth scroll links starting with '#'
  document.querySelectorAll('a[href^="#"]').forEach(node => {
    node.addEventListener('click', (e) => {
      const href = node.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Fallback programmatic navigation for case-panel cards
  document.querySelectorAll('.case-panel').forEach(panel => {
    panel.addEventListener('click', (e) => {
      const href = panel.getAttribute('href');
      if (href) {
        e.preventDefault();
        if (window.location.protocol === 'file:') {
          window.open(href, '_blank');
        } else {
          let shortUrl = '';
          if (href.includes('Zomato')) shortUrl = '/zomato/';
          else if (href.includes('Spotify')) shortUrl = '/spotify/';
          else if (href.includes('ChatGPT')) shortUrl = '/chatgpt/';
          window.open(shortUrl, '_blank');
        }
      }
    });
  });

});
