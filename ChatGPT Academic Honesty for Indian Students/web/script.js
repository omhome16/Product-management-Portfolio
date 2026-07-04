/* ============================================================
   CHATGPT ACADEMIC HONESTY — PORTFOLIO INTERACTIVITY
   Vanilla JS Engine
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  initReadingProgress();
  initNavigation();
  initResearchTabs();
  initRiceCalculator();
  initTutorSimulator();
  initScrollAnimations();
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

/* ── Navigation Scrolls & Highlighting ── */
function initNavigation() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  // Scroll transparency state toggler
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // Intersections observer for current section focus
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;
        navAnchors.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${activeId}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));
}

/* ── Research Panel Tabs ── */
function initResearchTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`panel-${selectedTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* ── Interactive RICE calculator ── */
function initRiceCalculator() {
  const features = [
    {
      id: "toggle",
      name: "Tutor Mode Toggle (Socratic Routing)",
      reach: 3,
      impact: 3,
      confidence: 70,
      effort: 1
    },
    {
      id: "confidence",
      name: "Confidence Indicators (Scoped Flags)",
      reach: 3,
      impact: 2,
      confidence: 85,
      effort: 1
    },
    {
      id: "check",
      name: "Check My Understanding (Quiz Flow)",
      reach: 2,
      impact: 3,
      confidence: 65,
      effort: 2
    },
    {
      id: "hints",
      name: "Hint Progression (Incremental Steps)",
      reach: 2,
      impact: 3,
      confidence: 50,
      effort: 2.5
    },
    {
      id: "portal",
      name: "Institutional API / Portal Integration",
      reach: 1,
      impact: 3,
      confidence: 40,
      effort: 4
    }
  ];

  let selectedIdx = 0;
  let activeSortCol = "score";
  let sortDirectionAsc = false;

  const featureTitle = document.getElementById('calc-feature-title');
  const slideReach = document.getElementById('slide-reach');
  const slideImpact = document.getElementById('slide-impact');
  const slideConfidence = document.getElementById('slide-confidence');
  const slideEffort = document.getElementById('slide-effort');

  const labelReach = document.getElementById('val-reach');
  const labelImpact = document.getElementById('val-impact');
  const labelConfidence = document.getElementById('val-confidence');
  const labelEffort = document.getElementById('val-effort');
  const tableBody = document.getElementById('rice-tbody');

  if (!tableBody) return;

  function calculateScore(f) {
    return Math.round((f.reach * f.impact * f.confidence) / f.effort);
  }

  function getScoreBadge(score) {
    if (score >= 400) return `<span class="rice-badge rice-badge-high">High</span>`;
    if (score >= 100) return `<span class="rice-badge rice-badge-med">Medium</span>`;
    return `<span class="rice-badge rice-badge-low">Low</span>`;
  }

  function renderTable() {
    tableBody.innerHTML = '';

    const sortedFeatures = [...features].sort((a, b) => {
      let valA, valB;
      const scoreA = calculateScore(a);
      const scoreB = calculateScore(b);

      if (activeSortCol === "name") {
        return sortDirectionAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (activeSortCol === "score") {
        valA = scoreA;
        valB = scoreB;
      } else {
        valA = a[activeSortCol];
        valB = b[activeSortCol];
      }

      return sortDirectionAsc ? valA - valB : valB - valA;
    });

    sortedFeatures.forEach(f => {
      const idx = features.findIndex(item => item.id === f.id);
      const score = calculateScore(f);
      const row = document.createElement('tr');
      
      if (idx === selectedIdx) {
        row.className = "highlight-row-chatgpt";
      }

      row.innerHTML = `
        <td style="cursor: pointer; font-weight: 600;">${f.name}</td>
        <td>${f.reach === 3 ? 'High (3)' : f.reach === 2 ? 'Medium (2)' : 'Low (1)'}</td>
        <td>${f.impact}</td>
        <td>${f.confidence}%</td>
        <td>${f.effort} PM</td>
        <td>${score} ${getScoreBadge(score)}</td>
      `;

      row.addEventListener('click', () => {
        selectedIdx = idx;
        updateSlidersFromSelection();
        renderTable();
      });

      tableBody.appendChild(row);
    });
  }

  function updateSlidersFromSelection() {
    const f = features[selectedIdx];
    featureTitle.textContent = `Feature: ${f.name}`;
    
    slideReach.value = f.reach;
    slideImpact.value = f.impact;
    slideConfidence.value = f.confidence;
    slideEffort.value = f.effort;

    labelReach.textContent = f.reach;
    labelImpact.textContent = f.impact;
    labelConfidence.textContent = `${f.confidence}%`;
    labelEffort.textContent = `${f.effort} PM`;
  }

  // Sliders Input Listeners
  slideReach.addEventListener('input', () => {
    features[selectedIdx].reach = parseInt(slideReach.value);
    labelReach.textContent = features[selectedIdx].reach;
    renderTable();
  });

  slideImpact.addEventListener('input', () => {
    features[selectedIdx].impact = parseFloat(slideImpact.value);
    labelImpact.textContent = features[selectedIdx].impact;
    renderTable();
  });

  slideConfidence.addEventListener('input', () => {
    features[selectedIdx].confidence = parseInt(slideConfidence.value);
    labelConfidence.textContent = `${features[selectedIdx].confidence}%`;
    renderTable();
  });

  slideEffort.addEventListener('input', () => {
    features[selectedIdx].effort = parseFloat(slideEffort.value);
    labelEffort.textContent = `${features[selectedIdx].effort} PM`;
    renderTable();
  });

  // Table header sort click handlers
  document.querySelectorAll('#interactiveRiceTable th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      if (activeSortCol === col) {
        sortDirectionAsc = !sortDirectionAsc;
      } else {
        activeSortCol = col;
        sortDirectionAsc = false;
      }
      renderTable();
    });
  });

  // Initialize Calculator layout
  updateSlidersFromSelection();
  renderTable();
}

/* ── Socratic Tutor Chat Simulator ── */
function initTutorSimulator() {
  const toggleBtn = document.getElementById('tutorToggle');
  const badge = document.getElementById('tutorModeBadge');
  const chatBody = document.getElementById('chatBody');
  const confidenceIndicator = document.getElementById('confidenceIndicator');
  const marker = document.getElementById('indicatorMarker');
  const indicatorText = document.getElementById('indicatorText');

  if (!toggleBtn || !chatBody) return;

  let isTutorModeOn = true;

  toggleBtn.addEventListener('click', () => {
    isTutorModeOn = !isTutorModeOn;
    toggleBtn.classList.toggle('active', isTutorModeOn);
    
    if (isTutorModeOn) {
      badge.classList.add('visible');
      renderTutorDialogue();
    } else {
      badge.classList.remove('visible');
      renderDefaultDialogue();
    }
  });

  // Render Socratic Dialogues
  function renderTutorDialogue() {
    chatBody.innerHTML = '';
    confidenceIndicator.classList.remove('visible');

    // Message 1: User Prompt
    appendMessage('user', "Explain Newton's second law and write a script to calculate acceleration.");

    // Message 2: Assistant Socratic Intro
    setTimeout(() => {
      appendMessage('assistant', `
        <p><strong>Tutor Mode [Enabled]</strong></p>
        <p>I can help you build that calculation. Before we look at the code structure, let's check the relationship between forces and movement.</p>
        <p>Suppose you push a lightweight toy car and a heavy cargo truck with the exact same amount of force. Which one speeds up faster (accelerates), and how does the mass of the object affect its rate of speed increase?</p>
        <div class="chat-actions">
          <button class="chat-btn-choice" id="choiceA">The car accelerates faster because it is lighter.</button>
          <button class="chat-btn-choice" id="choiceB">Give me the answer directly, I am in a hurry.</button>
        </div>
      `);

      // Bind choice events
      document.getElementById('choiceA').addEventListener('click', handleRecallPath);
      document.getElementById('choiceB').addEventListener('click', handleBypassPath);
    }, 800);
  }

  // Render Default complete solutions
  function renderDefaultDialogue() {
    chatBody.innerHTML = '';
    confidenceIndicator.classList.remove('visible');

    // Message 1: User Prompt
    appendMessage('user', "Explain Newton's second law and write a script to calculate acceleration.");

    // Message 2: Assistant Direct Solution
    setTimeout(() => {
      appendMessage('assistant', `
        <p>Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass:</p>
        <p><strong>Formula:</strong> <code>a = F / m</code></p>
        <p>Here is a Python script to calculate acceleration:</p>
        <code>def get_acceleration(force, mass):
    return force / mass

# Example usage:
print(get_acceleration(10, 2))  # Output: 5.0</code>
      `);

      // Show amber caution calibration flag
      confidenceIndicator.classList.add('visible');
      marker.className = "indicator-marker"; // no glow
      marker.style.backgroundColor = "#f97316";
      indicatorText.textContent = "Amber Flag. Model calibration on general code generation scripts is unverified.";
    }, 800);
  }

  // User selects Option A: Active Recall Path
  function handleRecallPath() {
    // Disable other actions
    removeChatActions();
    appendMessage('user', "The car accelerates faster because it is lighter.");

    setTimeout(() => {
      appendMessage('assistant', `
        <p>Exactly right! Mass resists acceleration. The same force acting on a smaller mass produces a larger acceleration (<code>a = F / m</code>).</p>
        <p>Here is your Python code template to implement this logic:</p>
        <code>def get_acceleration(force, mass):
    return force / mass

# Example: Force = 10N, Mass = 2kg
print(get_acceleration(10, 2))  # Output: 5.0</code>
        <p><strong>Check your understanding:</strong> Want to test your understanding of this concept with a quick 10-second quiz?</p>
        <div class="chat-actions">
          <button class="chat-btn-choice" id="quizYes">Test Me</button>
          <button class="chat-btn-choice" id="quizNo">Skip Quiz</button>
        </div>
      `);

      // Show validated green indicator banner
      confidenceIndicator.classList.add('visible');
      marker.className = "indicator-marker green";
      marker.style.backgroundColor = "#10a37f";
      indicatorText.textContent = "High confidence. Verified across NCERT and standard physics curricula.";

      document.getElementById('quizYes').addEventListener('click', startComprehensionQuiz);
      document.getElementById('quizNo').addEventListener('click', skipComprehensionQuiz);
    }, 800);
  }

  // User selects Option B: Bypass Path
  function handleBypassPath() {
    removeChatActions();
    appendMessage('user', "Give me the answer directly, I am in a hurry.");

    setTimeout(() => {
      appendMessage('assistant', `
        <p><strong>Bypass requested.</strong> Here is the direct explanation and solution:</p>
        <p>Newton's Second Law states that acceleration is directly proportional to net force and inversely proportional to mass: <code>a = F / m</code>.</p>
        <code>def get_acceleration(force, mass):
    return force / mass

# Calculate acceleration
print(get_acceleration(10, 2))  # Output: 5.0</code>
      `);

      // Show amber flag
      confidenceIndicator.classList.add('visible');
      marker.className = "indicator-marker";
      marker.style.backgroundColor = "#f97316";
      indicatorText.textContent = "Amber Flag. Code correctness and reasoning output is uncalibrated.";
    }, 800);
  }

  function startComprehensionQuiz() {
    removeChatActions();
    appendMessage('user', "Test Me");

    setTimeout(() => {
      appendMessage('assistant', `
        <p>Great! Here is your question:</p>
        <p><em>If you double the net force acting on an object but reduce its mass by half, what happens to the acceleration?</em></p>
        <div class="chat-actions">
          <button class="chat-btn-choice" id="ansCorrect">It quadruples (4x)</button>
          <button class="chat-btn-choice" id="ansDouble">It doubles (2x)</button>
          <button class="chat-btn-choice" id="ansSame">It remains the same</button>
        </div>
      `);

      document.getElementById('ansCorrect').addEventListener('click', () => handleQuizFeedback(true));
      document.getElementById('ansDouble').addEventListener('click', () => handleQuizFeedback(false, "doubles"));
      document.getElementById('ansSame').addEventListener('click', () => handleQuizFeedback(false, "remains same"));
    }, 800);
  }

  function skipComprehensionQuiz() {
    removeChatActions();
    appendMessage('user', "Skip Quiz");

    setTimeout(() => {
      appendMessage('assistant', `
        <p>No problem! Feel free to copy your acceleration calculation code block. Happy coding!</p>
      `);
    }, 800);
  }

  function handleQuizFeedback(isCorrect, choiceText = "") {
    removeChatActions();
    if (isCorrect) {
      appendMessage('user', "It quadruples (4x)");
      setTimeout(() => {
        appendMessage('assistant', `
          <p>Correct! Since <code>a = F / m</code>, doubling the force (<code>2F</code>) and halving the mass (<code>0.5m</code>) yields: <code>a_new = 2F / 0.5m = 4(F / m)</code>. The acceleration quadruples! Excellent conceptual mastery.</p>
        `);
      }, 800);
    } else {
      appendMessage('user', choiceText === "doubles" ? "It doubles (2x)" : "It remains the same");
      setTimeout(() => {
        appendMessage('assistant', `
          <p>Not quite. Let's look at the math: <code>a = F / m</code>. If force is doubled (<code>2F</code>) and mass is halved (<code>0.5m</code>), then: <code>a_new = 2F / 0.5m = 4(F / m)</code>. The acceleration actually quadruples (4x).</p>
        `);
      }, 800);
    }
  }

  // Helper appends
  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    msg.innerHTML = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeChatActions() {
    const actionContainers = chatBody.querySelectorAll('.chat-actions');
    actionContainers.forEach(container => container.remove());
  }

  // Trigger default startup state
  renderTutorDialogue();
}

/* ── Scroll Reveal Animations ── */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));
}

/* ── Numeric Count-Up Stats ── */
function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();

        function step(timestamp) {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          const currentVal = target * easedProgress;

          let textOut;
          if (target % 1 === 0) {
            textOut = Math.round(currentVal).toLocaleString();
          } else {
            textOut = currentVal.toFixed(1);
          }

          el.textContent = `${prefix}${textOut}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(step);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => statObserver.observe(num));
}
