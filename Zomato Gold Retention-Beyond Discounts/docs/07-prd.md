# Product Requirements Document

```
PROJECT:    Zomato Gold Habit Layer
STATUS:     Concept — Discovery Phase
OWNER:      Om Nawale
VERSION:    1.0
```

---

## 1. Overview

Add a non-discount retention layer to Zomato Gold that builds food identity and ordering habit, reducing churn among subscribers whose discount math becomes unfavorable month-to-month.

## 2. Problem

Zomato Gold's value proposition is entirely discount-based, creating rational churn whenever subscribers perceive the discount value as less than the subscription cost. Gold currently only addresses the functional JTBD ("avoid delivery fees") without addressing the emotional JTBD ("feel like a savvy food person") or social JTBD ("discover restaurants before my friends"). This creates low switching costs and high sensitivity to any change in perceived discount value.

**Evidence:**
- 12.1M Gold subscribers (FY25), >50% of food orders — [Eternal Ltd. Annual Report](https://www.eternal.com/investor-relations)
- Rising platform fees (₹14.90/order) and rain surcharges eroding perceived value — [India Today, May 2025](https://www.indiatoday.in/technology/news/story/zomato-changes-gold-membership-benefits-now-in-rain-it-wont-help-you-much-2729969-2025-05-14)
- Reddit/Trustpilot sentiment shows "not worth it" as dominant Gold-specific complaint — [Trustpilot](https://www.trustpilot.com/review/zomato.com)
- Swiggy One's grocery bundling creates structurally stronger retention — [swiggy.com](https://www.swiggy.com/one)

## 3. Goals & Metrics

**Goal 1:** Increase M3 renewal rate (Month 3 is the highest-churn window)
- Metric: M3 subscription renewal rate vs. current baseline

**Goal 2:** Increase "non-discount-driven" ordering behavior
- Metric: % of Gold subscriber orders placed without an active promotion, month-over-month trend

**Goal 3:** Improve Gold NPS vs. regular Zomato NPS
- Metric: Gold-specific NPS (add "as a Gold member" framing to NPS prompt for subscribers)

## 4. Non-Goals

- Does not change the discount structure or subscription price
- Does not address Blinkit/Instamart integration (separate entity/roadmap under Eternal Ltd.)
- Does not change restaurant acquisition or B2B partner agreements
- Does not propose a tiered Gold membership (a potential follow-up)

## 5. User Stories

**US-1:** As a Gold subscriber, I want to feel like I'm getting exclusive access non-subscribers don't get, so that my membership feels like an identity — not just a coupon code.

**US-2:** As a food-curious subscriber, I want Zomato to surface restaurants I wouldn't have found myself, so that Gold actively expands my food world rather than just discounting the same 5 restaurants I always visit.

**US-3:** As a subscriber approaching renewal, I want a reason to stay that isn't just "you saved ₹340 on delivery this month," so that I feel a genuine sense of loss if I cancel.

## 6. Requirements

### Must-Have (Phase 1)

**6.1 "Gold Pick" — Monthly Personalized Restaurant Recommendation**

A monthly personalized restaurant recommendation (based on order history + cuisine preference) with an exclusive perk at that restaurant (member-only dish, free dessert, or priority table).

- Appears as a card on the home screen from the 1st of each month
- Perk is additive (extra dish, priority service) — not price-discriminatory (different price for same item)
- Requires restaurant partner enrollment; start with 10–15 anchor partners per city
- Expires at end of month (natural urgency without artificial scarcity)

**6.2 ML Churn Prediction (Internal Tool)**

Score each Gold subscriber for churn probability 21 days before renewal.

- Model inputs: order frequency trend, % promo-driven orders, session frequency without ordering, days since last order, days to renewal
- Model outputs: probability score (0–100%) + reason code (declining frequency | discount dependency | competitor signal)
- High-risk threshold: >70% churn probability
- Surfaced to CRM/growth team as a dashboard with cohort breakdown

**6.3 Proactive Intervention Flow**

Push notification + email for high-churn-risk subscribers, sent 21 days before renewal.

- Message is specific and personal, not a "don't cancel" blast
- Reason-code-driven content: different intervention for declining frequency vs. discount dependency
- Example: "Your Gold Pick this month includes a surprise from [Restaurant]"

### Nice-to-Have (Phase 2)

**6.4 Gold Early Access**

New restaurant launches in subscriber's city available to Gold members 48 hours before general listing.

**6.5 "Year in Food" Annual Summary**

Annual summary released in January: top cuisine, most visited restaurant, food personality type, shareable card. (Spotify Wrapped model for food.)

**6.6 Explorer Streak**

Gentle in-app recognition for trying a new cuisine category each month. No punitive loss mechanics.

## 7. Risks & Open Questions

**Risk 1:** Gold Picks requires restaurant partner agreements — longer lead time than expected.
- *Mitigation:* Start with 10–15 anchor restaurant partners per city in Phase 1. Scale only after proving the engagement model.

**Risk 2:** ML churn model requires clean historical behavioral data with labelled churn events.
- *Open Question:* Does Zomato have sufficient Gold subscriber data to train a reliable churn model, or is this a cold-start ML problem?

**Risk 3:** Gold-exclusive perks may feel unequal to non-Gold users at the same restaurant.
- *Mitigation:* Perks should be additive (extra dish, priority service) — not price-discriminatory (different price for the same item).

**Risk 4:** Partner economics — who funds the "free dessert"?
- *Open Question:* Is this a Zomato-subsidized perk, a restaurant marketing investment, or a cost-sharing model? The answer determines financial viability.

**Open Question:** Should Gold Pick be opt-in or default-on?
- *Hypothesis:* Default-on. Opt-in would require active discovery of the feature by the users who need it most (disengaging subscribers who aren't browsing the app proactively).
