# Spotify Podcast Discovery: The New Creator Gap
**Product Management Case Study**

* **Author:** Om Nawale
* **Role Target:** Product Manager (Growth / Core Product)
* **Date:** June 2026
* **Project Status:** Discovery & Concept Validation

---

## 1. Executive Summary

* **The Problem:** New podcasters face a structural cold-start disadvantage where Spotify's engagement-biased recommendation algorithms exclude them from discovery surfaces, creating a cycle of obscurity that leads to rapid creator churn (podfading).
* **The Approach:** Implement a non-exclusive exploration framework consisting of a dedicated, niche-targeted "New Voices" home shelf for listeners and an actionable "Discovery Health" optimization dashboard for creators.
* **Projected Impact:** Stabilize creator retention by improving the 90-day retention rate (creators publishing ≥5 episodes) by 15-20%, while enhancing catalog diversity for niche-interest listeners.

---

## 2. Context & Problem: The Cold-Start Loop

As a Product Manager, I view Spotify’s podcast platform as a classic two-sided marketplace. The supply-side (creators) and the demand-side (listeners) are bound by cross-side network effects. Our platform's defensive moat relies on catalog diversity. However, we have a structural leak on our supply side.

When a new creator publishes their first few episodes, they start with zero listening history, zero followers, and zero shares. Because our recommendation engine optimizes for engagement signals like Listen Completion Rate (LCR) and user saves to ensure high-confidence matches, these new shows are structurally excluded from algorithmic surfaces. 

Without impressions, they accumulate no listening data, keeping them in permanent obscurity. This cold-start loop is a system design failure, not a quality issue. 

This loop drives extreme creator churn. Industry benchmarks show that approximately 90% of podcasts do not survive past their third episode, and another 90% of the survivors stop before episode 20. 

For Spotify, which acquired Anchor (now Spotify for Creators) to build a dominant hosting footprint, this churn represents lost ad inventory, wasted hosting resources, and an erosion of content catalog diversity. If creators leave Spotify for search-first platforms like YouTube, our long-term defensibility against Apple Podcasts and YouTube is compromised.

---

## 3. Research Findings

### Primary Research Cohorts
To validate my hypotheses, I structured a user research plan targeting two distinct groups:
1. **Indie Creators (Cohort A):** 8–10 creators active for <1 year with <500 listeners on Spotify.
2. **Niche Listeners (Cohort B):** 5–6 listeners seeking specialized audio topics.

* **Cohort A Key Finding (Creators):** All 8 interviewed creators expressed high enthusiasm at launch but described a rapid decline in motivation around episode 5. The primary driver of burnout was the "obscurity ceiling"—the realization that without pre-existing marketing budgets, organic search on Spotify fails to surface new uploads.
  > *Direct Quote:* "I spend 10 to 12 hours editing each episode, adjusting audio levels. I put it on Spotify, and I get 15 plays. Unless I manually post the link directly to my WhatsApp student groups, the stats stay at absolute zero. It feels like the algorithm requires you to already be famous to be shown." (Chennai-based music educator, creator of *Modern Carnatic Ragas Explained*).
* **Cohort B Key Finding (Listeners):** Niche listeners express high satisfaction with music recommendations but report that podcast recommendations are repetitive and dominated by massive, mainstream media networks.
  > *Direct Quote:* "When I search for 'quantum computing,' Spotify's search returns corporate tech shows that discussed AI for 5 minutes. The real indie shows that dedicate hours to it are completely buried because they don't have thousands of reviews. It's highly frustrating." (Tech professional and active listener).

### Competitive Scan

To analyze how competitors handle cold starts, I constructed this scan:

| Platform | Discovery Mechanism | Cold-Start Support | Creator Analytics | Key Insight |
| :--- | :--- | :--- | :--- | :--- |
| **Spotify** | Algorithm + Editorial | Very Weak | Spotify for Creators | Dominant listening, broken discovery |
| **Apple Podcasts** | Charts + Editorial | Editorial nominations only | Basic | Strong for established shows, not new |
| **YouTube (Video Podcasts)** | Search + Algorithm | Search helps new creators | Strong (YouTube Studio) | Search-based = fairer cold start |
| **Amazon Music** | Algorithm | Unknown | Limited | Small market share |
| **Pocket Casts** | Manual + Charts | None | None | Power-user tool, no discovery layer |

*Competitive Insight:* YouTube's search-first model and automatic test impression budget give new creators a fairer cold start than Spotify's recommendation-first model.

### Secondary Data Trends
* **Reddit Analysis:** In r/podcasting, the top creator complaints center on the "Spotify algorithm black box" and flatlined play counts.
* **App Store Sentiment:** User reviews complain that podcast search functionality on Spotify is weak, prioritizing review counts over keyword matching.

---

## 4. Frameworks

### The CIRCLES Framework Application
* **Comprehend:** We are addressing a two-sided marketplace content supply problem. Creator churn degrades catalog diversity.
* **Identify Customer:** Primary is the New Indie Creator; secondary is the Niche Listener.
* **Report Needs:** Creators need early audience signals (first 100 listeners in 90 days) and transparent discoverability feedback. Listeners need high-quality niche recommendations.
* **Cut Priorities:** Algorithmic cold-start barriers are the root cause. Editorial curation does not scale. We will prioritize a paired solution: "New Voices" Home Shelf + Creator Discovery Dashboard.
* **List Solutions:** Shelf, Dashboard, Algorithmic boost, Editorial submission form, Explore mode.
* **Evaluate:** Checked via RICE prioritization.
* **Summarize:** Implement the home shelf to supply listener impressions, and the dashboard to guide creator metadata optimization.

### RICE Prioritization

| Feature Candidate | Reach | Impact | Confidence | Effort | RICE Score | Decision |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **"New Voices" Shelf (Home Screen)** | High (3) | High (3) | Medium (2) | Low (1) | **18.0 (High)** | **Build First** |
| **Creator Discovery Health Dashboard** | Medium (2) | High (3) | High (3) | Medium (2) | **9.0 (High)** | **Build First** |
| **Algorithmic Cold-Start Boost** | High (3) | High (3) | Low (1) | High (3) | **3.0 (Medium)** | **Phase 2** |
| **Editorial Nominations for New Shows** | Low (1) | High (3) | Medium (2) | Low (1) | **6.0 (Medium)** | **Phase 2** |
| **Listener "Explore New Creators" Mode** | Low (1) | High (3) | Low (1) | Medium (2) | **1.5 (Low)** | **Backlog** |

---

## 5. Product Requirements Document (PRD) Excerpt

### Core Requirements
1. **Creator Discovery Health Dashboard:**
   * Provide optimization scores (0–100) across Keywords/Category, Episode Cadence, and Description Quality.
   * Display one actionable recommendation per score (e.g., *"Publishing gaps hurt your ranking—try weekly"*).
2. **90-Day Algorithmic Boost:**
   * Qualify shows (<90 days, ≥2 episodes, cadence ≤10 days) for niche-targeted test impressions (up to 2,000 impressions).
   * Enforce a quality gate: suspend boost if average completion rate drops below 35%.
3. **"New Voices" Home Shelf:**
   * Display a horizontal shelf of 4–6 shows matching the listener's category interests.
   * Include a cover image, category label, episode count, and a prominent "New Creator" badge to set quality expectations.

---

## 6. Creator Journey Map

My user research maps this 10-episode arc where a creator quits:

```
Launch Show (Episode 1) ──► Check Analytics ──► 3 Listens (All Friends) ──► Publish Episode 2
                                                                                 │
                                                                                 ▼
Episode 5 (15 Listens) ◄── Manual Promo (12 Listens) ◄── Stats Flatline ◄── Same 3 Listens
         │
         ▼
Episode 8 (Flat 15) ──► Episode 10 (Exhaustion) ──► QUIT / PODFADE (Breakpoint)
```

The breakpoint occurs after Episode 2. Once the creator realizes that manual sharing (family/friends) does not scale and the platform drives zero organic traffic, motivation drops, leading to abandonment by Episode 10.

---

## 7. Solution Design: Artifact Specifications

### "New Voices" Shelf (Listener UI)
A horizontal home screen shelf containing 4–6 cards.
* *Cover Art:* Dominant visual element.
* *Category Tag:* Placed below art (e.g., "True Crime"). Replaces reputation with topic interest.
* *"New Creator" Badge:* Placed on card corner. Sets listener expectations, reducing quality bias.
* *Episode Count:* Displays show consistency (e.g., "4 Episodes").

### Creator Discovery Dashboard (Creator UI)
Located within Spotify for Creators.
* *Keywords Row:* Score bar + tip (e.g., *"Score 72/100: Add 3 category terms to descriptions"*).
* *Cadence Row:* Score bar + tip (e.g., *"Score 55/100: Standardize weekly to avoid algorithm penalties"*).
* *Description Row:* Score bar + tip (e.g., *"Score 90/100: Good metadata profile"*).

---

## 8. Success Metrics Framework

| Metric Type | Metric Name | Strategic Importance |
| :--- | :--- | :--- |
| **Leading** | Creator Dashboard WAU | Measures creator engagement with discovery tips. |
| **Leading** | "New Voices" Shelf CTR | Measures listener willingness to explore new shows. |
| **Leading** | Average Listen Completion Rate (LCR) | Evaluates if the quality gate filters out bad content. |
| **Lagging** | 90-Day Creator Retention Rate | Primary indicator of supply-side health (North Star). |
| **Lagging** | 100+ Listener Conversion Rate | Confirms impressions translate into audience building. |
| **Guardrail** | Session Listening Duration | Ensures exploration does not degrade total listening time. |

---

## 9. Retrospective & Reflections

If I were to manage this initiative again, I would prioritize validating our supply-side economic assumptions. While retaining creators strengthens catalog diversity, hosting thousands of low-engagement podcasts incurs storage and streaming costs that must be balanced against ad revenue. Additionally, providing transparent dashboard scoring creates a risk of creators gaming the system with ChatGPT-generated metadata. Mitigating this requires keeping the dashboard simple and ensuring that user-engagement signals (LCR) quickly override metadata optimizations once exploration begins.
