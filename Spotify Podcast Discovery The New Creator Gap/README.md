# Spotify Podcast Discovery: The New Creator Gap

> A Product Management case study analyzing Spotify's podcast cold-start challenge — where engagement-biased recommendation algorithms create an obscurity loop for new shows, driving creator churn — and presenting a structured exploration framework to solve it.

**Author:** Om Nawale  
**Role Target:** Product Manager (Growth/Core Product)  
**Live Site:** [View on Vercel →](#)

---

## Problem Statement

New podcasters face a structural cold-start disadvantage in Spotify's recommendation algorithm. Because recommendation models optimize for high-confidence interaction signals (such as listen completion rate, saves, and shares), new shows with empty histories receive no impressions, preventing them from accumulating signals. This creates an obscurity loop driving high creator churn ("podfading"), which threatens Spotify's content supply chain and long-term platform defensibility against search-first alternatives like YouTube.

## Approach

Using the CIRCLES, RICE, and AARRR frameworks, this case study proposes a **non-exclusive exploration framework** that balances immediate listener engagement with long-term creator retention:
1. **"New Voices" Home Shelf:** A horizontal, niche-targeted home feed shelf that surfaces new creators to matching interest graphs.
2. **Creator Discovery Health Dashboard:** A widget within Spotify for Creators providing transparent optimization scores (Keywords, Cadence, Description) and actionable recommendations.

---

## Repository Structure

```
├── README.md                          # Repository overview & index (this file)
├── case-study.md                      # Consolidated case study writeup (first-person)
├── docs/                              # Deep-dive chapters and specifications
│   ├── 01-problem-statement.md        # Problem framing, cold-start mechanics, business case
│   ├── 02-research-plan.md            # Target cohorts & user interview schedules
│   ├── 03-user-research.md            # Qualitative research findings & case summaries
│   ├── 04-competitive-analysis.md     # Competitive scan matrix & discovery model comparisons
│   ├── 05-market-data.md              # Podcast market data & Spotify platform context
│   ├── 06-frameworks.md               # CIRCLES, RICE, and AARRR application details
│   ├── 07-prd.md                      # Product Requirements Document (PRD)
│   ├── 08-solution-design.md          # Journey map & dashboard/shelf ASCII wireframes
│   ├── 09-metrics-and-evaluation.md   # Success metrics & project evaluation
│   └── 10-reflections.md              # Retrospective and retrospective observations
├── web/                               # Interactive portfolio web application
│   ├── index.html                     # Responsive, semantic HTML index
│   ├── styles.css                     # Premium dark theme glassmorphic styles
│   └── script.js                      # Interactivity (RICE sorter, timeline navigations)
└── .gitignore                         # Standard git ignore definitions
```

---

## Key Artifacts & Features

* **RICE Prioritization Matrix:** Evaluates 5 feature candidates to optimize engineering and product ROI.
* **A/B Testing Randomization Plan:** Proposes Show ID-level randomization to prevent user crossover drift over a 90-day test window.

---

## Verified Data Sources & References

1. **Edison Research:** *The Infinite Dial Annual Report* — Industry-standard listener demographics and consumption patterns. [Edison Research](https://www.edisonresearch.com/)
2. **Amplifi Media / Podnews:** *Podcast Activity and Attrition Reports* — Statistics on active vs. inactive feeds. [Podnews](https://podnews.net/)
3. **Buzzsprout:** *Global Podcast Distribution and Audience Benchmarks* — Analytics on download milestones and hosting distribution. [Buzzsprout](https://www.buzzsprout.com/global_stats)
4. **Spotify for Creators Portal:** Documentation on engagement statistics and hosting updates. [Spotify for Creators](https://creators.spotify.com/)

---

## Disclaimer

This is an independent case study created for educational and portfolio purposes. It is not affiliated with, endorsed by, or connected to Spotify, YouTube, Apple, or any other company mentioned. All analysis represents the author's personal assessment based on publicly available data.

---

**Built with:** HTML, CSS, JavaScript (vanilla — no framework dependencies)
