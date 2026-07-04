# 09. Metrics & Evaluation: Measuring Comprehension

To ensure that the Socratic tutoring layer actually improves learning outcomes without causing user churn, we establish a metrics and evaluation framework.

---

## Success Metrics Matrix

| Metric Type | Metric Name | Definition | Strategic Importance |
| :--- | :--- | :--- | :--- |
| **Leading** | **Tutor Mode Opt-In Rate** | % of student accounts that keep Tutor Mode toggled ON. | Measures initial desirability and setting persistence. |
| **Leading** | **Multi-Turn Engagement Ratio** | % of academic sessions with $\ge 3$ conversational turns. | Proxy for Socratic dialogue vs. copy-paste behavior. |
| **Leading** | **"Check My Understanding" CTR** | % of sessions where the student accepts the post-explanation quiz. | Measures student willingness to test their comprehension. |
| **Lagging** | **Within-Session Concept Mastery** | Efficacy rate: % of correct responses to the final comprehension check. | Evaluates whether Tutor Mode increases learning retention. |
| **Strategic** | **Institutional Endorsements** | Number of Indian universities/departments officially adopting ChatGPT. | Brand validation and protection against AI CTE/UGC bans. |
| **Guardrail** | **Toggle-Off Rate (Within Session)** | % of users who toggle Tutor Mode OFF within 5 minutes of activation. | Signals if the Socratic friction is too frustrating. |
| **Guardrail** | **Total Platform Session Time** | Weekly usage minutes per student account. | Ensures students do not leave the platform for competitors. |

---

## Evaluation Methodology: Testing Efficacy

Because subjective user ratings (e.g., *"Did you like this response?"*) are heavily biased toward low-friction, direct answers, we implement a quantitative within-session evaluation model.

```
+-------------------------------------------------------------+
|               A/B TESTING EVALUATION SPLIT                  |
+-------------------------------------------------------------+
|                                                             |
|                       Academic Query                        |
|                             ||                              |
|              +--------------+--------------+                |
|              |                             |                |
|              \/                            \/               |
|      TREATMENT COHORT                CONTROL COHORT         |
|      [Tutor Mode Socratic]          [Default Direct Q&A]    |
|              ||                            ||               |
|              \/                            \/               |
|      Interactive Dialogue           Single Answer Block     |
|              ||                            ||               |
|              +--------------+--------------+                |
|                             |                               |
|                             \/                              |
|                    SILENT EVALUATION STAGE                  |
|                 (Unseen, related application Q)             |
|                                                             |
+-------------------------------------------------------------+
```

### 1. The Cohort Setup
* **Treatment Group (Cohort A):** Users who have Tutor Mode enabled and query an academic topic. They experience the Socratic, dialogue-based flow.
* **Control Group (Cohort B):** Users who have Tutor Mode disabled. They receive the standard direct answer immediately.

### 2. The Verification Step
At the end of an explanation session, both cohorts are offered a voluntary or semi-integrated comprehension check:
* The check consists of a single multiple-choice or short-answer question mapping to the *same* concept but using a *different* scenario and numbers.
* *Example:* If the session explained binary search using a list of 10 items, the test question asks about search iterations on a list of 100 items.

### 3. Calculating Efficacy
We measure the accuracy rate of Cohort A vs. Cohort B. A statistically significant higher score in Cohort A validates that the Socratic dialogue leads to active mental representation and stronger conceptual recall, proving the educational value of the tutoring layer.
