# 06. Frameworks: Desirability, Feasibility, Viability & RICE

To evaluate the product direction, we analyze the problem through two core frameworks: the Desirability-Feasibility-Viability (DFV) lens and the RICE prioritization matrix.

---

## 1. Desirability, Feasibility, Viability (DFV) Analysis

Evaluating an educational safety feature requires balancing the needs of three distinct stakeholders: the student, the educator, and the platform provider (OpenAI).

```
                 DESIRABILITY
                 /          \
                /            \
               /  [OPT-IN]    \
              /                \
      FEASIBILITY ----------- VIABILITY
      [Intent Class]       [B2B2C licensing]
```

### Desirability
* **For Students Who Want to Learn:** High. These students seek to understand core engineering concepts to clear job interviews and vivas.
* **For Students Who Want to Cheat:** Low. Introducing Socratic friction is actively undesired by students who want a quick homework copy-paste.
* **For Educators/Administrators:** High. It restores the credibility of homework and lab journals as learning tools.
* **Design Decision:** Since forcing Tutor Mode on all users would drive shortcut-seekers to competitors (like Claude or Gemini), Tutor Mode must be **opt-in** by default for standard users. We mitigate this by making it **default-ON** for users who register with educational emails (`.edu` or institutional domains) or select "Student" during onboarding, with an easy settings toggle.

### Viability
* **Regulatory Alignment:** Directly addresses AICTE and UGC academic integrity guidelines, shielding OpenAI from nationwide educational bans.
* **B2B2C Revenue Stream:** Unlocks institutional licensing sales for engineering universities in India, who can endorse ChatGPT as an officially approved study tool.
* **Systemic Quality Protection:** Ensures that the engineering workforce feeding back into developer ecosystems maintains strong problem-solving and coding skills.
* **Risk:** A higher number of turns per query might slightly increase API server usage and decrease the volume of search queries, but it builds higher daily active user (DAU) retention and trust.

### Feasibility
* **Prompt Engineering & Routing:** Highly feasible. Using system prompt overrides and routing templates does not require training a new base model.
* **Query Classification:** Feasible. A lightweight intent classifier can evaluate queries for academic terms and trigger Socratic routing.
* **Latency Management:** Must be optimized. Socratic prompts must be generated within standard token latency limits, using smaller, faster models (like GPT-4o-mini) for intent classification.

---

## 2. RICE Prioritization Matrix

We evaluated five candidate features to determine the execution roadmap:

| Feature Candidate | Reach | Impact | Confidence | Effort | RICE Score | Decision |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **"Tutor Mode" Toggle**<br>(Socratic responses) | High (3) | High (3) | Medium (2) | Low (1) | **18.0** | **Build First** |
| **Confidence Indicators**<br>(Calibrated domain flags) | High (3) | Medium (2) | High (3) | Low (1) | **18.0** | **Build First** |
| **"Check My Understanding" Offer**<br>(Post-answer quiz) | Medium (2) | High (3) | Medium (2) | Medium (2) | **6.0** | **Phase 2** |
| **Hint Progression**<br>(hint-1 -> hint-2 -> answer) | Medium (2) | High (3) | Low (1.5) | Medium (2.5) | **3.6** | **Phase 2** |
| **Institutional API/College Integration** | Low (1) | High (3) | Low (1) | High (4) | **0.75** | **Phase 3** |

### Scoring Criteria Notes:
* **Reach:** 1 = Low (niche users), 2 = Medium (subset of academic users), 3 = High (all academic users).
* **Impact:** 1 = Low (minor change), 2 = Medium, 3 = High (significant learning improvement).
* **Confidence:** % scale (0.1 to 1.0) based on model capabilities and design validation.
* **Effort:** Estimated in Person-Months (PM). 1 = Low (prompt change), 5 = High (infra/API integration).
