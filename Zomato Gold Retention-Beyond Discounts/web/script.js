/* ============================================================
   ZOMATO GOLD — RETENTION BEYOND DISCOUNTS
   Interactive Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  initReadingProgress();
  initNavigation();
  initScrollReveal();
  initResearchTabs();
  initKanoChart();
  initRiceSort();
  initChurnFlow();
  initCountUp();
});

/* ── Reading Progress Bar ── */
function initReadingProgress() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
}

/* ── Navigation ── */
function initNavigation() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  // Scroll state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });

    // Close on link click
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const observerOpts = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOpts);

  sections.forEach(sec => sectionObserver.observe(sec));
}

/* ── Scroll Reveal Animations ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .flow-step');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — keep it visible once shown
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ── Research Tabs ── */
function initResearchTabs() {
  const tabs = document.querySelectorAll('.research-tab');
  const panels = document.querySelectorAll('.research-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = `panel-${tab.dataset.tab}`;

      // Deactivate all
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Activate clicked
      tab.classList.add('active');
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger reveal animations inside the panel
        panel.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
          el.classList.remove('visible');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.classList.add('visible');
            });
          });
        });
      }
    });
  });
}

/* ── Kano Model Chart ── */
function initKanoChart() {
  const chart = document.getElementById('kanoChart');
  if (!chart) return;

  // Data points: [x%, y%, label, type]
  // x = degree of implementation (left=none, right=full)
  // y = satisfaction (bottom=dissatisfied, top=satisfied)
  const points = [
    // Current features (red) — Basic/Performance zone
    { x: 78, y: 38, label: 'Free Delivery', type: 'current', category: 'Basic' },
    { x: 72, y: 42, label: 'Restaurant Discounts / B1G1', type: 'current', category: 'Performance' },
    { x: 60, y: 35, label: 'Priority Customer Service', type: 'current', category: 'Basic' },

    // Proposed features (gold) — Delighter zone
    { x: 70, y: 78, label: 'Gold Picks (Monthly Perk)', type: 'proposed', category: 'Delighter' },
    { x: 62, y: 82, label: 'Early Access to New Restaurants', type: 'proposed', category: 'Delighter' },
    { x: 55, y: 75, label: '"Year in Food" Summary', type: 'proposed', category: 'Delighter' },
  ];

  points.forEach((pt, i) => {
    // Create dot
    const dot = document.createElement('div');
    dot.className = `kano-dot ${pt.type}`;
    dot.style.left = `${pt.x}%`;
    dot.style.top = `${100 - pt.y}%`;
    dot.style.transform = 'translate(-50%, -50%)';
    dot.style.animationDelay = `${i * 150}ms`;

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'kano-tooltip';
    tooltip.innerHTML = `<strong>${pt.label}</strong><br><span style="color:var(--text-tertiary);font-size:0.7rem">${pt.category}</span>`;

    // Position tooltip
    const tooltipX = pt.x > 60 ? 'right' : 'left';
    if (tooltipX === 'right') {
      tooltip.style.right = `${100 - pt.x + 3}%`;
    } else {
      tooltip.style.left = `${pt.x + 3}%`;
    }
    tooltip.style.top = `${100 - pt.y}%`;
    tooltip.style.transform = 'translateY(-50%)';

    // Hover events
    dot.addEventListener('mouseenter', () => tooltip.classList.add('visible'));
    dot.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));

    // Animate in when chart becomes visible
    dot.style.opacity = '0';
    dot.style.transition = `opacity 0.5s ${i * 0.1}s var(--ease-out), transform 0.3s var(--ease-spring)`;

    chart.appendChild(dot);
    chart.appendChild(tooltip);
  });

  // Animate dots when chart is visible
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        chart.querySelectorAll('.kano-dot').forEach(dot => {
          dot.style.opacity = '1';
        });
      }
    });
  }, { threshold: 0.3 });

  chartObserver.observe(chart);
}

/* ── RICE Table Sorting ── */
function initRiceSort() {
  const table = document.getElementById('riceTable');
  if (!table) return;

  const headers = table.querySelectorAll('th[data-sort]');
  let currentSort = { key: null, asc: true };

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const key = header.dataset.sort;
      const isAsc = currentSort.key === key ? !currentSort.asc : false;
      currentSort = { key, asc: isAsc };

      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));

      rows.sort((a, b) => {
        let aVal, bVal;

        if (key === 'feature') {
          aVal = a.querySelector('td').textContent.trim();
          bVal = b.querySelector('td').textContent.trim();
          return isAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        aVal = parseInt(a.dataset[key]) || 0;
        bVal = parseInt(b.dataset[key]) || 0;
        return isAsc ? aVal - bVal : bVal - aVal;
      });

      rows.forEach(row => tbody.appendChild(row));

      // Update sort icons
      headers.forEach(h => {
        const icon = h.querySelector('.sort-icon');
        if (icon) {
          icon.textContent = h === header ? (isAsc ? '↑' : '↓') : '⇅';
        }
      });
    });
  });
}

/* ── Churn Flow Animation ── */
function initChurnFlow() {
  const flow = document.getElementById('churnFlow');
  if (!flow) return;

  const steps = flow.querySelectorAll('.flow-step');

  const flowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate steps sequentially
        steps.forEach((step, i) => {
          setTimeout(() => {
            step.classList.add('visible');
          }, i * 200);
        });
        flowObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });

  flowObserver.observe(flow);
}

/* ── Count-Up Animation ── */
function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;

          // Format number
          let formatted;
          if (target >= 100) {
            formatted = Math.round(current).toLocaleString();
          } else if (target >= 10) {
            formatted = current.toFixed(current === Math.round(current) ? 0 : 1);
          } else {
            formatted = current.toFixed(current === Math.round(current) ? 0 : 1);
          }

          el.textContent = `${prefix}${formatted}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Ensure final value is exact
            if (Number.isInteger(target)) {
              el.textContent = `${prefix}${target}${suffix}`;
            } else {
              el.textContent = `${prefix}${target}${suffix}`;
            }
          }
        }

        requestAnimationFrame(animate);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));
}
