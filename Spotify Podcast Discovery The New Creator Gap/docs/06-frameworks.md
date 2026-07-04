# Chapter 6: Product Frameworks & Prioritization

This chapter details the application of product management frameworks to structure the problem, prioritize solutions, and identify where the user funnel breaks.

---

## 1. The CIRCLES Framework

### **C**omprehend the Situation
* **Product:** Spotify’s podcast platform.
* **Problem Type:** Structural discovery failure for new podcasts, causing creator churn (podfading) and reducing catalog diversity.
* **Market Structure:** Two-sided marketplace. Supply (creators) depends on visibility, and demand (listeners) depends on content diversity.

### **I**dentify the Customer
* **Primary Persona:** The New Indie Creator (<6 months, <500 listeners) who spends significant time editing but gets single-digit plays.
* **Secondary Persona:** The Niche Listener seeking specific content areas who is repeatedly recommended high-profile shows.

### **R**eport Customer Needs
* **Creator Needs:**
  1. A clear indicator of why their show is or is not discoverable.
  2. A realistic opportunity to reach an organic (non-friend) audience.
  3. Feedback loop validation (e.g., initial listen metrics) to keep publishing.
* **Listener Needs:**
  1. High-quality recommendations for new, niche audio content matching their taste profile.
  2. Clear markers indicating the relevance of a recommended new show.

### **C**ut Priorities
* **Root Cause:** The cold-start signal loop. Low-volume shows are excluded from recommendation training datasets due to lack of historical signals.
* **Priority Focus:** Focus on establishing a minimal viable audience signal (e.g., the first 100 organic listeners) within a creator's first 90 days. Listener-side changes (like search filters) are secondary to creating a structured programmatic discovery surface.

### **L**ist Solutions
1. **"New Voices" Home Shelf:** A dedicated, horizontal-scroll shelf on the listener's home screen showing curated new shows in their interest areas.
2. **Creator Discovery Health Dashboard:** A checklist and score widget in Spotify for Creators detailing metadata quality, cadence, and description scores with actionable tips.
3. **Algorithmic Cold-Start Boost:** A temporary 90-day boost giving new shows matching a quality gate increased exploration probability in recommendation algorithms.
4. **Editorial Nomination Form:** A manual submission channel for small creators to pitch editors for playlist placement.
5. **Explore New Creators Mode:** An opt-in navigation toggle that changes the home feed to focus purely on newly launched shows.

### **E**valuate & Prioritize
*(See RICE Prioritization below)*

### **S**ummarize Recommendations
We recommend building the **"New Voices" Shelf** paired with the **Creator Discovery Health Dashboard** as our initial product package. This combination addresses both ends of the marketplace: the dashboard helps creators optimize their signals, and the shelf provides the algorithmic surface to accumulate listener interactions.

---

## 2. RICE Prioritization

To select features for the initial release (V1) versus future phases, we evaluated the five candidate solutions using the RICE framework:

* **Reach:** Scaled 1–3 (Low, Medium, High) based on the user segment affected.
* **Impact:** Scaled 1–3 (Low, Medium, High) based on impact on the core metric (90-day retention).
* **Confidence:** Scaled 1–3 (Low, Medium, High) based on engineering feasibility and product risk.
* **Effort:** Scaled 1–3 (Low, Medium, High) based on cross-functional developer resources.

| Feature Candidate | Reach (1-3) | Impact (1-3) | Confidence (1-3) | Effort (1-3) | RICE Score | Decision |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **"New Voices" Shelf (Home Screen)** | 3 (High) | 3 (High) | 2 (Medium) | 1 (Low) | **18.0 (High)** | **Build First (V1)** |
| **Creator Discovery Health Dashboard** | 2 (Medium) | 3 (High) | 3 (High) | 2 (Medium) | **9.0 (High)** | **Build First (V1)** |
| **Algorithmic Cold-Start Boost** | 3 (High) | 3 (High) | 1 (Low) | 3 (High) | **3.0 (Medium)** | **Phase 2** |
| **Editorial Nominations for New Shows** | 1 (Low) | 3 (High) | 2 (Medium) | 1 (Low) | **6.0 (Medium)** | **Phase 2** |
| **Listener "Explore New Creators" Mode** | 1 (Low) | 3 (High) | 1 (Low) | 2 (Medium) | **1.5 (Low)** | **Backlog** |

---

## 3. AARRR Funnel Analysis

The user growth funnel for new creators on Spotify breaks at the very first hand-off point:

```
    Funnel Stage                 Status / Analysis
 ┌─────────────────┐
 │   ACQUISITION   │  ──►  Healthy: Creators sign up via Spotify for Creators
 └────────┬────────┘       due to ease of distribution and editing tools.
          │
          ▼
 ┌─────────────────┐
 │   ACTIVATION    │  ──►  CRITICAL BREAK: Creator publishes episode 1 & 2.
 └────────┬────────┘       Expected organic reach fails to materialize. Show receives 
          │                zero views from strangers.
          ▼
 ┌─────────────────┐
 │    RETENTION    │  ──►  Broken: Creator notices flat stats, experiences
 └────────┬────────┘       burnout, and podfades before episode 5.
          │
          ▼
 ┌─────────────────┐
 │    REFERRAL     │  ──►  Failed: Creator does not recommend Spotify's platform
 └────────┬────────┘       to peer creators.
          │
          ▼
 ┌─────────────────┐
 │    REVENUE      │  ──►  Failed: Zero ad inventory generated; Spotify receives no 
 └─────────────────┘       fees from the SPAN ad network.
```

### The Bottleneck
The entire bottleneck is located at the **Acquisition → Activation** transition. If a creator’s initial episodes are never shown to a listener, the downstream stages (Retention, Referral, Revenue) cannot be realized. Therefore, the product intervention must be positioned directly at this transition to force initial distribution.
