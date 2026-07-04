# ChatGPT Academic Honesty: Designing a Tutoring Layer for Indian Engineering Students

> A Product Management case study proposing an opt-in "Tutor Mode" within ChatGPT. This feature shifts model behavior from direct-answer delivery to Socratic guided learning for academic queries, mitigating regulatory risks in the Indian higher education market and aligning ChatGPT with cognitive learning principles.

**Author:** Om Nawale  
**Role Target:** AI Product Manager (Core Experience / Safety & Alignment)  
**Live Site:** [View on Vercel →](#)

---

## Problem Statement

ChatGPT’s direct-answer optimization creates a structural mismatch in academic contexts. For Indian engineering students (across a massive market of 1.5M+ annual graduates), the path of least resistance is to copy questions directly into ChatGPT, copy the full answers, and submit them. This bypasses cognitive effort, resulting in academic dishonesty and low conceptual recall during exams and vivas. 

This behavior creates institutional risk: India’s engineering regulator (AICTE) has designated 2025 as the "Year of AI," requiring colleges to submit "AI Implementation Plans" and adopt "AI Affirmation Pledges." If ChatGPT is perceived as enabling mass cheating, it risks institutional bans, threatening OpenAI's market share in a critical growth region.

## Approach

This case study proposes a Socratic "Tutor Mode" academic learning layer:
1. **Lightweight Intent Classifier:** Evaluates incoming user queries to separate casual requests from academic/conceptual learning queries.
2. **Socratic Dialogues:** Reroutes academic queries when Tutor Mode is toggled ON to ask guiding questions, build on current understanding, and provide progressive hints.
3. **Calibrated Confidence Indicators:** Displays clear confidence signals only for validated factual domains (math, classical physics) to manage user trust and model hallucination.
4. **Within-Session Comprehension Check:** Measures learning efficacy via micro-quizzes at the end of study sessions instead of relying on subjective user feedback.

---

## Repository Structure

```
├── README.md                          # Repository overview & index (this file)
├── case-study.md                      # Consolidated case study writeup (first-person)
├── docs/                              # Deep-dive chapters and specifications
│   ├── 01-problem-statement.md        # Problem framing, alignment, regulatory risk, AICTE guidelines
│   ├── 02-research-plan.md            # Primary research design & interview questions
│   ├── 03-user-research.md            # Qualitative research findings, student & professor cohorts
│   ├── 04-competitive-analysis.md     # Competitive scan table & learning design analysis
│   ├── 05-market-data.md              # Indian engineering education market context (1.5M+ graduates)
│   ├── 06-frameworks.md               # DFV analysis (Desirability, Feasibility, Viability)
│   ├── 07-prd.md                      # Product Requirements Document (PRD) Excerpt
│   ├── 08-solution-design.md          # Side-by-side prompt comparisons, wireframes, and mocks
│   ├── 09-metrics-and-evaluation.md   # Success metrics (leading, lagging, strategic, guardrail)
│   └── 10-reflections.md              # Retrospective and retrospective observations
├── web/                               # Interactive portfolio web application
│   ├── index.html                     # Responsive, semantic HTML index
│   ├── styles.css                     # Premium dark theme glassmorphic styles
│   └── script.js                      # Interactivity (RICE sorter, visual toggles, flow simulator)
└── .gitignore                         # Standard git ignore definitions
```

---

## Key Frameworks & Features

* **RICE Prioritization Matrix:** Evaluates 5 feature candidates to identify high-impact, low-effort initial builds.
* **Precision-Recall Trade-off:** Optimizes for high recall on academic intent classification to catch student assignments.
* **Domain-Scoping Calibration:** Selectively maps confidence metrics to hard-coded text validation datasets.

---

## Verified Data Sources & References

1. **All India Council for Technical Education (AICTE):** *AI Implementation Plan and ATAL Academy Certifications* — National guidelines for AI in engineering campuses. [AICTE India](https://www.aicte-india.org/)
2. **University Grants Commission (UGC):** *UGC Guidelines on AI in Higher Education Streams* — Policies for ethical AI use in universities. [UGC India](https://www.ugc.gov.in/)
3. **Journal of Educational Psychology:** *The Power of Retrieval Practice and Desirable Difficulty* — Research showing that minor friction increases retention. [APA PsycNet](https://psycnet.apa.org/)
4. **National Council of Educational Research and Training (NCERT):** *Science and Physics Curriculum Standards* — Curriculum validation data for Indian students. [NCERT India](https://ncert.nic.in/)

---

## Disclaimer

This is an independent case study created for educational and portfolio purposes. It is not affiliated with, endorsed by, or connected to OpenAI, Microsoft, AICTE, UGC, or any company mentioned. All analysis represents the author's personal assessment based on publicly available data.

---

**Built with:** HTML, CSS, JavaScript (vanilla — no framework dependencies)
