# 08. Solution Design: Socratic Interface & Wireframes

This document details the user interface elements and behavioral flows for ChatGPT Tutor Mode.

---

## 1. Response Format Comparison (Socratic vs. Default)

To compare outputs, we analyze a standard student query:
* **Query:** *"Explain Newton's second law and write a Python script to calculate acceleration."*

### Default ChatGPT Output
```
Newton's Second Law of Motion states that acceleration (a) is directly proportional
to the net force (F) acting on an object and inversely proportional to its mass (m).
Formula: F = ma  => a = F/m

Python Code:
def calculate_acceleration(force, mass):
    return force / mass

print(calculate_acceleration(10, 2))  # Outputs: 5.0
```
* **Pedagogical Failure:** The student copies the code, pastes it, and exits. There is no active thinking.

### Tutor Mode (Socratic Layer) Output
```
Tutor Mode [Enabled]

I can help you build that calculation. Before we look at the code, let's explore
the relationship between force, mass, and acceleration.

Suppose you push a lightweight toy car and a heavy cargo truck with the exact same
amount of force. Which one speeds up faster (accelerates), and how does the mass of
the object affect its rate of speed increase?
```
* **Pedagogical Value:** The student is nudged to recall the inverse relationship between mass and acceleration. 
* **Model Routing:** The system prompts the student for input. Once the student replies (e.g., *"The car speeds up faster because it is lighter"*), the model validates their conceptual model and provides the code block, reinforcing the logic.

---

## 2. Confidence Indicator Mockup

Factual explanations append a validation banner to clarify the reliability of the statement.

```
+-----------------------------------------------------------------------------+
| [O] High Confidence. Verified across NCERT and standard physics syllabi.    |
+-----------------------------------------------------------------------------+
```
* **Visual Marker:** A small green dot (`[O]`) indicates verified mathematical or physics constants/formulas.
* **Amber Marker:** A small amber dot (`[!]`) signals domains with lower calibration (e.g., custom coding advice or historical interpretations), prompting: *"Self-verify: LLM calibration on this topic is unverified. Cross-reference with your lecture notes."*
* **Scoping:** Banners appear ONLY for verified static datasets (such as core physics, mathematics, and chemistry). They are omitted for open-ended queries or code debugging.

---

## 3. Tutor Mode Toggle Wireframe

Located in **Settings > Personalization**.

```
+-----------------------------------------------------------------------------+
|  Settings                                                                   |
|                                                                             |
|  [ General ]      Tutor Mode                                                |
|  [ Account ]      [========================================] [ ON / (O) ]   |
|  [ Security]      ChatGPT will ask guiding questions before explaining,     |
|  [ Personal]      helping you build conceptual understanding rather than     |
|                   delivering quick, copy-paste homework answers.            |
+-----------------------------------------------------------------------------+
```
* **Explainer Copy:** We explain *why* the friction exists (building conceptual understanding) so that students understand it is a learning feature, not a restriction.
* **State Representation:** Activated toggles show a clear green accent color matching the ChatGPT design system.

---

## 4. "Check My Understanding" Flow

A 3-step interactive loop at the end of a study session:

```
[Step 1: Concept Explanation Complete]
              ||
              \/
[Step 2: ChatGPT Offers Quiz]
"Want a quick question to check your understanding? It takes 10 seconds. [Yes] [No]"
              ||
              \/ (User clicks Yes)
[Step 3: Socratic Question & Feedback]
Model: "If you push an object with 20N of force and its mass is 4kg, the acceleration
is 5m/s². What happens to the acceleration if you increase the force to 40N and
double the mass to 8kg?"
User: "It remains the same (5m/s²)."
Model: "Exactly right! Both doubled, so the ratio remains 5. Great job."
```
* **Validation:** By selecting a different numeric example than the original explanation, we test genuine comprehension rather than simple text recognition.
