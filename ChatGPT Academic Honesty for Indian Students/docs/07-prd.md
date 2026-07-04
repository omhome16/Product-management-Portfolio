# 07. Product Requirements Document (PRD) Excerpt

**Project Title:** ChatGPT Tutor Mode — Academic Learning Layer  
**Status:** Concept Validation & Behavioral Design  
**Product Manager:** Om Nawale  

---

## 1. Overview
Design and implement an opt-in "Tutor Mode" within ChatGPT that intercepts academic and conceptual queries. When enabled, this mode shifts ChatGPT's output from direct answers to Socratic, dialogic guidance, prompting engineering students to think critically and verify their own understanding.

---

## 2. Problem
ChatGPT's default Q&A design encourages copy-pasting code and text, enabling engineering students to submit assignments without understanding the underlying concepts. This creates a severe learning gap, leading to student failure in vivas and practical exams, and introduces regulatory risks for OpenAI in the Indian engineering education ecosystem.

---

## 3. Goals & Metrics
* **Goal 1: Improve student comprehension of academic topics.**
  * *Metric:* Efficacy rate of within-session comprehension questions (accuracy of response to the final quiz vs. control group).
* **Goal 2: Increase active learning dialogue.**
  * *Metric:* % of academic sessions with $\ge 3$ conversational turns.
* **Goal 3: Shield OpenAI from regulatory bans and open institutional pathways.**
  * *Metric:* Number of Indian technical colleges formally adopting or endorsing ChatGPT for Education.

---

## 4. Non-Goals
* We do not attempt to detect or report student cheating to universities (not a plagiarism detector).
* We do not block or censor any user queries (not a content filter).
* We do not alter model behavior for non-academic/general-utility queries.

---

## 5. User Stories

1. **The Learning Student:**
   * *As a* student who wants to understand a concept,
   * *I want* ChatGPT to ask about my current understanding before explaining,
   * *So that* I can connect new information to my existing knowledge base and verify my logic.
2. **The Risk-Aware Student:**
   * *As a* student copy-pasting code or formulas,
   * *I want* to see a clear indicator of ChatGPT's confidence on factual claims,
   * *So that* I do not confidently submit a hallucinated or incorrect answer.
3. **The Engineering Professor:**
   * *As a* university lecturer,
   * *I want* to recommend ChatGPT as an approved study assistant,
   * *So that* my students can access personalized help without having their homework done for them.

---

## 6. Functional Requirements

### 1. Settings Toggle & Onboarding (Must-Have)
* The user settings panel shall display a "Tutor Mode" toggle.
* The toggle shall be default-OFF for general accounts, but default-ON for accounts registered with university email addresses or flagged as "Student" in onboarding.
* Onboarding shall display a text banner explaining the cognitive benefits of Socratic friction.

### 2. Intent Classification (Must-Have)
* Every prompt entered when Tutor Mode is ON shall pass through a fast intent classifier to determine if it is an academic/conceptual query.
* Academic queries shall trigger the Socratic System Prompt instead of the default complete-answer prompt.

### 3. Socratic Prompting Layer (Must-Have)
* For academic queries, the model shall ask clarifying or guiding questions to prompt the user's recall.
* The model shall not output the final code block or mathematical solution in the first turn.
* If a student indicates they are stuck, the model shall provide progressive hints (Hint 1 -> Hint 2 -> worked example) rather than the complete code or solution immediately.

### 4. Confidence Indicators (Must-Have)
* The system shall display a colored confidence flag (green/amber) at the bottom of the response for validated conceptual domains (e.g., NCERT physics, core math).
* The confidence indicator shall be omitted for domains where model accuracy is low or uncalibrated (e.g., custom code correctness, reasoning).

### 5. "Check My Understanding" (Nice-to-Have)
* At the end of a conceptual explanation, ChatGPT shall offer a quick, interactive question testing the student's understanding.
* The question must evaluate the same core concept but use a different example than the one explained.

---

## 7. Risks & Mitigations

* **Risk 1: High user abandonment.**
  * *Description:* Students find Socratic questions annoying and switch to competing platforms (Claude, Gemini).
  * *Mitigation:* Allow an override button ("Show direct answer") but require a confirmation tap. Keep Socratic dialogue focused and limit it to a maximum of 3 turns before revealing the answer.
* **Risk 2: Miscalibrated confidence indicators.**
  * *Description:* The model displays "High Confidence" on a hallucinated response, eroding student and professor trust.
  * *Mitigation:* Do not calculate confidence dynamically. Use static validation maps based on standard engineering datasets and display flags *only* for queries that match these validated topics.
