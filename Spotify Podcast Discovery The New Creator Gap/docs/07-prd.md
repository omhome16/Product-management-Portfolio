# Chapter 7: Product Requirements Document (PRD)

**PROJECT:** Spotify Podcast Cold-Start Program  
**STATUS:** Concept — Discovery Phase  
**OWNER:** Om Nawale  
**DATE:** June 2026  

---

## 1. Overview
The Spotify Podcast Cold-Start Program aims to build a structured ecosystem path for newly launched podcasts (<90 days old, <500 followers). The initiative consists of two paired components: a temporary algorithmic discovery boost to provide initial listener exposure, and an actionable "Discovery Health" dashboard within Spotify for Creators.

---

## 2. Problem Statement
New podcasters face a structural cold-start disadvantage within Spotify's recommendation algorithms. Because the recommendation engine optimizes for high-confidence interaction signals (completion rate, follows, shares), new shows with empty listening logs are excluded from recommendation pools. 

This creates a permanent obscurity cycle, resulting in high creator churn ("podfading") and a less diverse catalog. This content supply loss weakens Spotify's defensibility against search-first platforms like YouTube and established directories like Apple Podcasts.

---

## 3. Goals & Success Metrics

* **Goal 1: Reduce creator churn in the first 90 days.**
  * *Primary Metric:* % of new shows that publish ≥5 episodes.
  * *Success Target:* Increase this ratio from the current baseline to 25% (offsetting the standard 90% early-stage attrition).
* **Goal 2: Increase discovery rate for new shows.**
  * *Primary Metric:* % of new shows reaching 100+ unique, organic (non-follower) listeners within 90 days.
  * *Success Target:* Achieve a 30% improvement across the cohort.
* **Goal 3: Maintain listener recommendation satisfaction.**
  * *Primary Metric:* CSAT score for "Recommended for you" podcast rows.
  * *Success Target:* Maintain a flat or positive score, ensuring the injection of new voices does not degrade the listener experience.

---

## 4. Non-Goals
* This program does not alter creator monetization, advertising payouts, or premium subscription models.
* It does not change the music recommendation algorithms.
* It does not modify editorial selections for top-chart podcasts.
* It does not guarantee audience conversion—it only guarantees a baseline probability of discovery surface.

---

## 5. User Stories
1. **As a new podcaster**, I want to know exactly why my show isn't being recommended to listeners, so that I can take specific action on my titles, descriptions, and cadence rather than guessing.
2. **As a niche listener**, I want to discover newly launched, high-quality shows in my specific areas of interest, so that I can access fresh perspectives beyond the same established top-chart networks.
3. **As a new podcaster**, I want a realistic opportunity to reach an audience of interested strangers in my first 90 days, so that I can validate my content value before choosing whether to continue production.

---

## 6. Functional & Technical Requirements

### Must-Have Requirements (V1)

#### 1. Creator "Discovery Health" Dashboard
* **Metadata Optimization Score:** A rating (0–100) based on category alignment and keyword density in show and episode titles.
* **Cadence Consistency Score:** A rating based on the regularity of publishing (e.g., weekly, bi-weekly) relative to the show's stated schedule, penalizing irregular breaks.
* **Description Quality Meter:** An analyzer checking for detailed descriptions, links, and chapter insertions.
* **Actionable Recommendations:** The dashboard must display at least one high-priority tip per metric (e.g., *"Add 3 keywords related to 'history' to improve search matching"*).

#### 2. Niche-Targeted 90-Day Algorithmic Boost
* **Eligibility Gate:** Shows must be <90 days old, have published ≥2 episodes, and maintain a consistent cadence (gap between episodes ≤10 days).
* **Targeting Filter:** Boosted impressions must be matched strictly to listeners who have a high-affinity interest score in the show's primary category. Shows are never recommended to generic or unrelated user profiles.
* **Impression Budget:** The system allocates a maximum of 2,000 test impressions over the 90-day window to accumulate initial interaction signals.

#### 3. "New Voices" Shelf (Listener UI)
* **Placement:** Positioned on the podcast home tab for users who have active listening histories in niche categories.
* **UI Elements:** Display 4–6 shows horizontally. Each show card must contain: show cover art, primary category tag, episode count, and a distinct "New Creator" badge.
* **Badge Function:** The "New Creator" badge sets listener expectations regarding production scale, mitigating potential negative bias compared to established shows.

### Nice-to-Have Requirements (Phase 2)
* **In-Workflow Keyword Suggestion:** Real-time semantic keyword suggestions inside the publishing interface to optimize search indexability prior to uploading.
* **Creator Milestone Notifications:** Automated push/email notifications celebrating progress (e.g., *"Your first episode reached 50 organic listeners this week. Here is what is working..."*).
* **Editorial Fast-Track:** A submission form for shows maintaining an optimization score >85 for 30 days to receive expedited editorial review.

---

## 7. Risks & Mitigation Plan

* **Risk 1: Low-quality content is surfaced, leading to listener dissatisfaction.**
  * *Mitigation:* Implement an automated quality gate checking audio profile settings (e.g., average bit rate ≥96kbps, loudness within -16 LUFS). Track the Listen Completion Rate (LCR) of boosted shows; if a show's average LCR falls below 35% across 3 consecutive episodes, the algorithmic boost is suspended.
* **Risk 2: Creators game the optimization score via keyword stuffing.**
  * *Mitigation:* The recommendation model weights actual user interaction signals (LCR, share rates) higher than metadata optimization scores once initial impressions are served. Metadata optimization only serves to bootstrap the first 500 impressions; downstream performance determines long-term recommendations.
