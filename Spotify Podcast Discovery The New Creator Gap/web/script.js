/* ============================================================
   SPOTIFY PODCAST DISCOVERY — THE NEW CREATOR GAP
   Interactive Scripts
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  initReadingProgress();
  initNavigation();
  initResearchTabs();
  initCreatorJourney();
  initRiceCalculator();
  initMockupDashboard();
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

  // Scroll state class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
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
    rootMargin: '-30% 0px -60% 0px',
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

/* ── Research Tab Switching ── */
function initResearchTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      // Deactivate all
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Activate selected
      btn.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ── Creator Journey Interactive Timeline ── */
function initCreatorJourney() {
  const journeySteps = [
    {
      title: "Episode 1: Launch",
      energy: "Energy: High",
      listeners: "Listeners: 0",
      isEnergyHigh: true,
      isListenersHigh: false,
      description: "Creator uploads the first episode. Expectations are high, and energy is focused on content creation and local distribution.",
      diagnostic: "Initial metadata uploaded. The show is registered in the RSS index but has no catalog search relationships or listener logs."
    },
    {
      title: "Episode 1: Post-Launch Stats",
      energy: "Energy: Stable",
      listeners: "Listeners: 3",
      isEnergyHigh: true,
      isListenersHigh: false,
      description: "Creator checks their stats daily. They see 3 plays — all verified as family and friends.",
      diagnostic: "Recommendation engine ignores the show during weekly modeling runs due to insufficient signal weight."
    },
    {
      title: "Episode 2: Publish",
      energy: "Energy: Stable",
      listeners: "Listeners: 3",
      isEnergyHigh: true,
      isListenersHigh: false,
      description: "Creator spends another 8 hours planning and editing the second episode, expecting organic discovery to build.",
      diagnostic: "Interaction matrix remains blank. Collaborative filters cannot map the show to any consumer profile."
    },
    {
      title: "Episode 2: Flat Stats",
      energy: "Energy: Declining",
      listeners: "Listeners: 3",
      isEnergyHigh: false,
      isListenersHigh: false,
      description: "The dashboard numbers fail to budge. The creator feels invisible and begins to question if their settings are wrong.",
      diagnostic: "Platform offers no explanation on search indexing or visibility parameters. The creator is in the analytics black box."
    },
    {
      title: "Episode 3: Manual Promotion",
      energy: "Energy: Declining",
      listeners: "Listeners: 12",
      isEnergyHigh: false,
      isListenersHigh: false,
      description: "Creator manually shares direct links on Reddit and Twitter groups. A slight listener spike registers, then flatlines.",
      diagnostic: "Direct traffic is unmonitized and doesn't trigger algorithmic loops because listeners do not save or follow the show."
    },
    {
      title: "Episode 4: Is Anyone Listening?",
      energy: "Energy: Low",
      listeners: "Listeners: 12",
      isEnergyHigh: false,
      isListenersHigh: false,
      description: "Creator uploads episode 4. They check stats less frequently, and publishing feels like speaking into an empty room.",
      diagnostic: "The show remains in recommendation obscurity. Standard user home pages prioritize established charts."
    },
    {
      title: "Episode 5: Flatline",
      energy: "Energy: Low",
      listeners: "Listeners: 15",
      isEnergyHigh: false,
      isListenersHigh: false,
      description: "Episode 5 is published. Plays stall at 15. The creator begins to experience creative burnout.",
      diagnostic: "Total completion time remains low, cementing the show in the lowest tier of recommendation filters."
    },
    {
      title: "The Breakpoint",
      energy: "Energy: Critical",
      listeners: "Listeners: 15",
      isEnergyHigh: false,
      isListenersHigh: false,
      description: "The creator realizes that self-promotion is unsustainable and takes too much effort for single-digit returns. The platform provides no distribution support.",
      diagnostic: "CRITICAL CRASH POINT: The creator has published 5 episodes over 40 days without receiving a single platform-driven listener recommendation."
    },
    {
      title: "Episode 10: Final Effort",
      energy: "Energy: Exhausted",
      listeners: "Listeners: 15",
      isEnergyHigh: false,
      isListenersHigh: false,
      description: "Creator uploads one last episode with minimal editing effort. It feels like a waste of resources.",
      diagnostic: "The hosting database record remains active but flags as an endangered feed due to low upload frequency."
    },
    {
      title: "Churn: Podfade",
      energy: "Energy: Zero",
      listeners: "Listeners: Churned",
      isEnergyHigh: false,
      isListenersHigh: false,
      description: "The creator cancels their hosting plan. The show is abandoned. The catalog loses another unique voice.",
      diagnostic: "Ecosystem churn complete. Spotify retains the host infrastructure cost but loses potential catalog diversity and SPAN ad inventory."
    }
  ];

  const navBtns = document.querySelectorAll('.journey-nav-btn');
  const title = document.getElementById('journey-title');
  const energy = document.getElementById('journey-energy');
  const listeners = document.getElementById('journey-listeners');
  const description = document.getElementById('journey-description');
  const diagnostic = document.getElementById('journey-diagnostic');

  if (navBtns.length === 0 || !title) return;

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepIdx = parseInt(btn.dataset.step);
      const data = journeySteps[stepIdx];

      // Update button active states
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update contents
      title.textContent = data.title;
      energy.innerHTML = `<i data-lucide="${data.isEnergyHigh ? 'zap' : 'zap-off'}"></i> ${data.energy}`;
      listeners.innerHTML = `<i data-lucide="users"></i> ${data.listeners}`;
      description.textContent = data.description;
      diagnostic.textContent = data.diagnostic;

      // Update color indicators
      energy.className = `journey-indicator ${data.isEnergyHigh ? 'indicator-high' : 'indicator-low'}`;
      if (stepIdx === 7 || stepIdx === 9) {
        listeners.className = "journey-indicator indicator-low";
      } else {
        listeners.className = `journey-indicator ${data.isListenersHigh ? 'indicator-high' : 'indicator-low'}`;
      }

      // Re-initialize dynamic icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });
}

/* ── Interactive RICE Calculator ── */
function initRiceCalculator() {
  const features = [
    {
      id: "shelf",
      name: "\"New Voices\" Shelf on Home Screen",
      reach: 3000000,
      impact: 2,
      confidence: 80,
      effort: 2
    },
    {
      id: "dashboard",
      name: "Creator Discovery Health Dashboard",
      reach: 150000,
      impact: 3,
      confidence: 90,
      effort: 3
    },
    {
      id: "algo-boost",
      name: "Algorithmic Cold-Start Boost (90-Day)",
      reach: 4000000,
      impact: 3,
      confidence: 50,
      effort: 6
    },
    {
      id: "editorial",
      name: "Editorial Submission for New Shows",
      reach: 50000,
      impact: 2,
      confidence: 70,
      effort: 1
    },
    {
      id: "explore-mode",
      name: "Listener \"Explore New Creators\" Mode",
      reach: 80000,
      impact: 2,
      confidence: 40,
      effort: 4
    }
  ];

  let selectedFeatureIdx = 0;
  let currentSortCol = "score";
  let sortAscending = false;

  const titleEl = document.getElementById('calc-feature-title');
  const slideReach = document.getElementById('slide-reach');
  const slideImpact = document.getElementById('slide-impact');
  const slideConfidence = document.getElementById('slide-confidence');
  const slideEffort = document.getElementById('slide-effort');

  const lblReach = document.getElementById('val-reach');
  const lblImpact = document.getElementById('val-impact');
  const lblConfidence = document.getElementById('val-confidence');
  const lblEffort = document.getElementById('val-effort');
  const tbody = document.getElementById('rice-tbody');

  if (!tbody) return;

  function calculateScore(f) {
    return Math.round((f.reach * f.impact * (f.confidence / 100)) / f.effort);
  }

  function getScoreBadge(score) {
    if (score >= 1000000) return `<span class="rice-badge rice-badge-high">High</span>`;
    if (score >= 100000) return `<span class="rice-badge rice-badge-med">Medium</span>`;
    return `<span class="rice-badge rice-badge-low">Low</span>`;
  }

  function renderTable() {
    tbody.innerHTML = '';

    // Sort features
    const sortedFeatures = [...features].sort((a, b) => {
      let aVal, bVal;
      const scoreA = calculateScore(a);
      const scoreB = calculateScore(b);

      if (currentSortCol === "name") {
        aVal = a.name;
        bVal = b.name;
        return sortAscending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else if (currentSortCol === "score") {
        aVal = scoreA;
        bVal = scoreB;
      } else {
        aVal = a[currentSortCol];
        bVal = b[currentSortCol];
      }

      return sortAscending ? aVal - bVal : bVal - aVal;
    });

    sortedFeatures.forEach(f => {
      const idx = features.findIndex(item => item.id === f.id);
      const score = calculateScore(f);
      const row = document.createElement('tr');
      if (idx === selectedFeatureIdx) {
        row.className = "highlight-row-spotify";
      }

      row.innerHTML = `
        <td style="cursor: pointer; font-weight: 600;">${f.name}</td>
        <td>${f.reach.toLocaleString()}</td>
        <td>${f.impact}</td>
        <td>${f.confidence}%</td>
        <td>${f.effort} PM</td>
        <td class="rice-score-num">${score.toLocaleString()} ${getScoreBadge(score)}</td>
      `;

      row.addEventListener('click', () => {
        selectedFeatureIdx = idx;
        updateSlidersFromSelection();
        renderTable();
      });

      tbody.appendChild(row);
    });
  }

  function updateSlidersFromSelection() {
    const f = features[selectedFeatureIdx];
    titleEl.textContent = `Feature: ${f.name}`;
    
    slideReach.value = f.reach;
    slideImpact.value = f.impact;
    slideConfidence.value = f.confidence;
    slideEffort.value = f.effort;

    lblReach.textContent = f.reach.toLocaleString();
    lblImpact.textContent = f.impact;
    lblConfidence.textContent = `${f.confidence}%`;
    lblEffort.textContent = `${f.effort} PM`;
  }

  // Event Listeners for Sliders
  slideReach.addEventListener('input', () => {
    features[selectedFeatureIdx].reach = parseInt(slideReach.value);
    lblReach.textContent = features[selectedFeatureIdx].reach.toLocaleString();
    renderTable();
  });

  slideImpact.addEventListener('input', () => {
    features[selectedFeatureIdx].impact = parseFloat(slideImpact.value);
    lblImpact.textContent = features[selectedFeatureIdx].impact;
    renderTable();
  });

  slideConfidence.addEventListener('input', () => {
    features[selectedFeatureIdx].confidence = parseInt(slideConfidence.value);
    lblConfidence.textContent = `${features[selectedFeatureIdx].confidence}%`;
    renderTable();
  });

  slideEffort.addEventListener('input', () => {
    features[selectedFeatureIdx].effort = parseFloat(slideEffort.value);
    lblEffort.textContent = `${features[selectedFeatureIdx].effort} PM`;
    renderTable();
  });

  // Table Headers Sorting
  document.querySelectorAll('#interactiveRiceTable th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (currentSortCol === col) {
        sortAscending = !sortAscending;
      } else {
        currentSortCol = col;
        sortAscending = false;
      }
      renderTable();
    });
  });

  // Init UI
  updateSlidersFromSelection();
  renderTable();
}

/* ── Interactive Wireframe Mockups ── */
function initMockupDashboard() {
  const toggles = document.querySelectorAll('.mock-toggle-btn');
  const panels = document.querySelectorAll('.mockup-panel');

  toggles.forEach(t => {
    t.addEventListener('click', () => {
      const targetMock = t.dataset.mock;

      toggles.forEach(btn => btn.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      t.classList.add('active');
      const targetPanel = document.getElementById(`mock-${targetMock}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Creator Dashboard Score Tuner
  const metricRows = document.querySelectorAll('.metric-row');
  const scoreAdjuster = document.getElementById('score-adjuster');
  const titleEl = document.getElementById('detail-metric-title');
  const priorityEl = document.getElementById('lbl-rec-priority');
  const adviceEl = document.getElementById('detail-metric-advice');

  let activeMetric = "keywords";

  const metricInfo = {
    keywords: {
      title: "Category & Keywords Analysis",
      scoreId: "lbl-score-keywords",
      barId: "bar-score-keywords",
      getAdvice: (val) => {
        if (val >= 85) return { text: "Strong optimization profile. Episode titles contain targeted keywords and matches category indexes.", priority: "Low", class: "score-high" };
        if (val >= 60) return { text: "Your description lacks keywords matching your selected category. Add 3–4 terms related to your niche (e.g., 'startup history') to boost indexing weight.", priority: "Medium", class: "score-medium" };
        return { text: "Critical metadata gap. The system cannot index your show without relevant topic descriptors. Rewrite titles immediately.", priority: "High", class: "score-low" };
      }
    },
    cadence: {
      title: "Publishing Cadence Consistency",
      scoreId: "lbl-score-cadence",
      barId: "bar-score-cadence",
      getAdvice: (val) => {
        if (val >= 85) return { text: "Consistent weekly/bi-weekly publication timeline. No algorithmic visibility penalties are applied.", priority: "Low", class: "score-high" };
        if (val >= 60) return { text: "Irregular publishing gaps (e.g. 12 days between episodes) penalizes search visibilities. Standardize to a weekly cycle.", priority: "Medium", class: "score-medium" };
        return { text: "Critical consistency penalty. Gaps over 20 days trigger archive status, suppressing exploration boosts. Publish immediately.", priority: "High", class: "score-low" };
      }
    },
    description: {
      title: "Description Quality Meter",
      scoreId: "lbl-score-description",
      barId: "bar-score-description",
      getAdvice: (val) => {
        if (val >= 85) return { text: "Descriptions are comprehensive, featuring timeline chapters and relevant links to target platforms.", priority: "Low", class: "score-high" };
        if (val >= 60) return { text: "Add structured timestamps (chapters) and external references to increase semantic index values.", priority: "Medium", class: "score-medium" };
        return { text: "Description is too brief. Provide a summary of topics discussed to support semantic indexing pipelines.", priority: "High", class: "score-low" };
      }
    }
  };

  metricRows.forEach(row => {
    row.addEventListener('click', () => {
      activeMetric = row.dataset.metric;
      metricRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      const info = metricInfo[activeMetric];
      titleEl.textContent = info.title;

      // Extract current score value from DOM label
      const currentScoreLabel = document.getElementById(info.scoreId).textContent;
      const scoreVal = parseInt(currentScoreLabel);
      scoreAdjuster.value = scoreVal;

      updateMetricAdvice(scoreVal);
    });
  });

  scoreAdjuster.addEventListener('input', () => {
    const val = parseInt(scoreAdjuster.value);
    const info = metricInfo[activeMetric];

    // Update Dashboard Labels & Progress Bars
    const lbl = document.getElementById(info.scoreId);
    const bar = document.getElementById(info.barId);

    lbl.textContent = `${val}/100`;
    bar.style.width = `${val}%`;

    // Apply color class dynamically
    lbl.className = "metric-score " + (val >= 85 ? "score-high" : val >= 60 ? "score-medium" : "score-low");
    bar.className = "progress-bar-fill " + (val >= 85 ? "progress-high" : val >= 60 ? "progress-medium" : "progress-low");

    updateMetricAdvice(val);
  });

  function updateMetricAdvice(val) {
    const info = metricInfo[activeMetric];
    const adv = info.getAdvice(val);

    priorityEl.textContent = `Priority: ${adv.priority}`;
    priorityEl.className = `badge-status-update ${adv.class}`;
    adviceEl.textContent = adv.text;
  }
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
        const duration = 1500;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = target * eased;

          let formatted;
          if (target >= 10) {
            formatted = Math.round(current).toLocaleString();
          } else {
            formatted = current.toFixed(1);
          }

          el.textContent = `${prefix}${formatted}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(animate);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => countObserver.observe(el));
}
