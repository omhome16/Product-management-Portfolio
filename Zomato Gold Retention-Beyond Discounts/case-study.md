# Zomato Gold: Retention Beyond Discounts
**Product Management Case Study**

* **Author:** Om Nawale
* **Role Target:** Product Manager (AI / Growth / Core Product)
* **Date:** June 2025
* **Project Status:** Discovery & Concept Validation

---

## 1. Executive Summary

### The Three-Line Thesis
* **The Problem:** Zomato Gold's entire value proposition is discount-based. When subscriber math tips unfavorable (due to fewer orders, platform fee hikes, or rain surcharges), churn is not a system failure—it is rational. You cannot solve rational churn with deeper discounts.
* **The Approach:** Add a non-discount "habit layer" to Zomato Gold. This comprises personalized monthly "Gold Picks," ML-driven proactive churn intervention with reason-coded perks, and social/emotional food-identity features.
* **Projected Impact:** Increase Month 3 (M3) renewal rates by 15–20% and reduce discount dependency by building emotional and social switching costs.

---

## 2. My PM Playbook: How I Approached This Problem

To design a rigorous, real-world growth strategy for Zomato Gold, I executed a structured product discovery playbook:
1. **Diagnostic Discovery:** I analyzed public community sentiment (Reddit r/india, r/bangalore, r/mumbai), Google Play Store, and Trustpilot reviews to find raw, qualitative user complaints. I validated these findings against Eternal Limited's official NSE India investor reports and consolidated earnings to ground user problems in hard financial metrics.
2. **JTBD Mapping:** I applied the Jobs-to-be-Done (JTBD) framework to classify user needs. I discovered that Zomato Gold successfully addresses functional jobs but leaves emotional and social food-identity jobs completely unaddressed.
3. **Kano & RICE Prioritization:** I mapped candidate features on a Kano Model to identify baseline features vs. high-leverage "Delighters." I then scored these features in a RICE matrix to establish a roadmap optimized for engineering and business ROI.
4. **AI & ML Product Bridge:** Defined the data signal specifications for a churn prediction model, set the precision-recall evaluation thresholds, mapped reason-coded CRM interventions, and built the mathematical constraints for personalized recommendations.

---

## 3. Context & Problem: Discount-Dependent Loyalty

Zomato Gold is a major revenue and order driver for Eternal Limited, accounting for over 50% of food delivery orders. However, the subscription is structurally fragile.

Subscribers join Gold because of simple functional math: *“I spend ₹299 on this subscription, and I will save more than that on delivery fees and dining discounts.”* 

This creates a purely transaction-oriented relationship. When Zomato introduces friction—such as raising per-order platform fees to ₹14.90 or implementing rain surcharges—the user's cost-benefit calculation shifts. Because there is no social status, emotional attachment, or habit-driven hook associated with Gold, the user cancels. 

### Jobs-to-be-Done (JTBD) Mapping
* **Functional Job (Current Gold):** *“Order food without worrying about delivery fees and get the best prices.”* Status: Fully Met (free delivery on orders ≥₹199 within 7km, plus dining out discounts).
* **Emotional Job (Proposed Habit Layer):** *“Feel like a savvy food insider who is discovering the best culinary experiences in my city.”* Status: Unmet by Current Gold. Met by **Gold Picks**.
* **Social Job (Proposed Habit Layer):** *“Be the curator in my social circle who shares and recommends new restaurants.”* Status: Unmet by Current Gold. Met by **Year in Food summaries and early access**.

---

## 4. Research Findings & Financial Context

### Consolidated Financial Diagnostics
According to Eternal Limited's official financial reports:
* **Active Gold Subscribers:** Grew from 7.4 million (March 2024) to **12.1 million** (March 2025), a YoY growth of **+63.5%**.
* **Consolidated Revenue:** Reached **₹21,320 Cr** in FY25, with food delivery Adjusted EBITDA margins reaching **5.2%** of Net Order Value (Q4 FY25).
* **Friction Points:** Platforms fees have climbed to **~₹14.90/order** in early 2026. Rain surcharges were extended to Gold members in mid-2025.

### User Sentiment Patterns
* **The "Illusion of Savings":** Users report that although Gold waives delivery fees, non-Gold users receive larger direct discounts, neutralizing the subscription's financial benefit.
* **Support Loops:** Gold users experience frustrating, automated chatbot support loops, expressing that the program fails to provide a priority customer service experience.
* **Dark Pattern Cancellation:** Scrutiny has risen regarding the difficult and multi-step cancellation flows, matching consumer protection concerns outlined by the Central Consumer Protection Authority (CCPA).

---

## 5. Kano Model Application

* **Must-Haves (Basic):** Free delivery, basic dining discounts, and order support. If missing, users churn instantly.
* **Performance Features:** Number of partner restaurants and depth of discounts. Satisfaction scales linearly, but profit margins drop as discount depth increases.
* **Delighters (Proposed):** Personalized "Gold Picks," early access to new restaurant launches, and "Year in Food" shareable annual summaries. These features create unexpected delight, build brand affinity, and drive renewals without reducing order margins.

---

## 6. RICE Prioritization Matrix

To decide what to build first, I scored five candidate initiatives:

| Feature | Reach (1-3) | Impact (1-3) | Confidence (1-3) | Effort (1-3) | RICE Score | Decision |
|---|---|---|---|---|---|---|
| **Personalized "Gold Pick" monthly perk** | 3 (High) | 3 (High) | 2 (Medium) | 2 (Medium) | **3.0 (High)** | **Build First** |
| **ML churn prediction + proactive CRM** | 3 (High) | 3 (High) | 2 (Medium) | 3 (High) | **2.0 (High)** | **Build First** |
| **Gold-exclusive menu items** | 2 (Med) | 3 (High) | 1 (Low) | 3 (High) | **2.0 (Med)** | **Phase 2** |
| **"Year in Food" annual summary** | 2 (Med) | 3 (High) | 2 (Med) | 1 (Low) | **12.0 (Med)** | **Phase 2** |
| **Food explorer streaks & gamification** | 1 (Low) | 2 (Med) | 1 (Low) | 2 (Med) | **1.0 (Low)** | **Backlog** |

---

## 7. Product Requirements Document (PRD) Excerpt

### Core Requirements
1. **Gold Pick recommendation card:**
   * A personalized, ML-curated restaurant recommendation displayed on the home screen starting the 1st of every month.
   * Includes a partner-funded, high-perceived-value perk (e.g., free dessert, signature dish, or priority table booking).
2. **Proactive Churn Prediction (ML):**
   * Daily scoring of all subscribers to identify users with a >70% churn risk.
   * Generation of reason codes (e.g., frequency decline, high promo-dependency) to map targeted CRM interventions.
3. **Reason-Coded Proactive CRM:**
   * Automatically trigger push notifications and emails 21 days before subscription renewal for high-risk users, offering personalized perks instead of generic pricing discounts.

---

## 8. ML Churn Intervention Flow

```
[Daily ML scoring of subscribers]
             │
             ▼
[Identify high-risk users (Prob >70%)]
             │
             ├────────► [Reason Code: Declining Frequency] ──► CRM: "Surprise awaiting at your Gold Pick"
             ├────────► [Reason Code: Discount Dependency] ──► CRM: "You saved ₹X, here is what you will miss"
             └────────► [Reason Code: Ghost Sessions] ────────► CRM: Personalized in-app home screen nudge
             │
             ▼
[Track Perk Redemption & M3 Renewal Rate]
```

---

## 9. "Gold Pick" UX Design & Personalization Constraints

The "Gold Pick" is designed as a premium, glassmorphism home screen card card. It recommends a restaurant the subscriber has not yet tried, but which matches their taste profile.

### Recommendation Engine Constraints:
* **Delivery Radius:** The recommended restaurant must be within the user's standard delivery radius (typically 7km).
* **Perk Enrollment:** Must be an active partner enrolled in the Gold Pick program.
* **Freshness Constraint:** Exclude restaurants visited or ordered from within the last 2 weeks to promote genuine discovery.
* **Quality Guardrail:** Exclude any restaurant with an aggregate rating below 4.0 or experiencing recent delivery rating drops.

---

## 10. Success Metrics Framework

* **Leading Indicators:**
  * Gold Pick card Click-Through Rate (CTR) and redemption rate.
  * Open rates and redemption rates of ML-triggered CRM interventions.
* **Lagging Indicators:**
  * M3 subscription renewal rate (primary North Star).
  * Percentage of Gold orders placed without active promotions (habit strength indicator).
  * Gold-specific Net Promoter Score (NPS) delta compared to standard users.
* **Guardrail Indicators:**
  * Restaurant partner satisfaction scores (ensuring perks are mutually beneficial and sustainable).
  * Subscriber Acquisition Cost (SAC) vs. Customer Lifetime Value (LTV).

---

## 11. Retrospective & Reflections

If I were to execute this case study again with unlimited time, I would address the following gaps:
1. **Primary Research Limitations:** Relying on public forum discussions introduces selection bias, as dissatisfied users are more vocal online. I would conduct 8–10 structured subscriber interviews to gather balanced behavioral insights.
2. **Supply-Side Economics:** The viability of the Gold Pick program relies entirely on restaurant partners. I would design a tiered commission or cost-sharing structure to ensure the "free signature dish" does not hurt restaurant operating margins.
3. **Causal Validation:** I would structure an A/B test comparing subscribers exposed to Gold Picks against a control group to confirm whether the program drives renewal rate improvements or merely correlates with pre-existing high-intent behavior.

---

## Sources & References

1. Eternal Limited FY25 Annual Report — NSE India Filings. [NSE India](https://www.nseindia.com/)
2. Eternal Q4 FY25 Earnings & Profits. [LiveMint](https://www.livemint.com/companies/news/eternal-q4-results-2025-net-profit-falls-78-yoy-to-rs-39-crore-revenue-surges-64-11746152345672.html)
3. Eternal Q4 Revenue Surges. [BusinessToday](https://www.businesstoday.in/markets/company-stock/story/eternal-zomato-q4-results-net-profit-dives-78-to-rs-39-crore-revenue-up-64-475271-2025-05-01)
4. Zomato Gold Rain Surcharges. [India Today](https://www.indiatoday.in/)
5. User Sentiment & Complaints. [Trustpilot](https://www.trustpilot.com/review/zomato.com)
6. Zomato App Details. [Google Play Store](https://play.google.com/store/apps/details?id=com.application.zomato)
7. Zomato iOS App. [Apple App Store](https://apps.apple.com/in/app/zomato-food-delivery-dining/id434613896)
8. Swiggy One Perks. [Swiggy](https://www.swiggy.com/one)
9. CCPA Guidelines on Dark Patterns. [CCPA Guidelines](https://consumeraffairs.nic.in/sites/default/files/CP%20Act%20Notification/Guidelines-Dark-Patterns.pdf)
10. Subscription Economy Benchmarks. [Reelo.io](https://www.reelo.io/)
