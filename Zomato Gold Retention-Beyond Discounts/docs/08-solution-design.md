# Solution Design: Gold Pick + ML Churn Intervention

## 1. "Gold Pick" — Monthly Personalized Restaurant Card

### Overview

A personalized restaurant recommendation card that appears on every Gold subscriber's home screen on the 1st of each month, featuring a restaurant they haven't tried with an exclusive perk available only to Gold members.

### Card Design Elements

| Element | Purpose | Design Rationale |
|---------|---------|-----------------|
| "Your Gold Pick" label | Possessive "Your" makes it personal | Generic labels like "Featured Restaurant" don't create ownership |
| Restaurant photo + name | Visual-first design drives engagement | Food photography triggers appetite and curiosity |
| Cuisine tag + rating | Quick decision context | Reduces friction between discovery and ordering |
| Exclusive perk badge | Communicates Gold-only value | Green badge = positive emotion; specific perk ("Free Khao Suey") not vague ("special offer") |
| Expiry date (end of month) | Natural urgency | Full month avoids pressure; not a flash sale that creates anxiety |
| "Gold Members Only" label | Reinforces membership identity | Creates in-group feeling; social proof when shared |

### Personalization Engine Requirements

The recommendation engine for Gold Picks requires more than standard collaborative filtering ("users like you ordered at X"). It needs a **constraint layer**:

| Constraint | Rationale |
|-----------|-----------|
| Only recommend within subscriber's delivery radius | A great restaurant 15km away is irrelevant |
| Only recommend restaurants enrolled in the perk program | Don't surface restaurants that can't deliver the exclusive perk |
| Avoid restaurants visited in last 2 weeks | Freshness — discovery requires novelty |
| De-prioritize restaurants with recent low ratings (<4.0) | Quality floor — a bad Gold Pick damages trust in the feature |
| Diversify cuisine categories month-over-month | Prevent "cuisine rut" recommendations |

### Objective Function Decision

A regular PM says "recommend a restaurant." A data-driven PM asks: "optimize for what?"

| Objective | Resulting Behavior | When to Use |
|-----------|-------------------|-------------|
| Predicted conversion (will they order?) | Safe, familiar recommendations | Never — defeats the purpose of discovery |
| Predicted satisfaction (will they rate it highly?) | Quality-first but potentially boring | Default objective for risk-averse launch |
| Behavior shift toward food exploration | Novel, stretch recommendations | Ideal objective — but harder to measure |

**Recommendation:** Launch with predicted satisfaction as the primary objective, with a novelty bonus term that rewards cuisine diversity. Measure food exploration behavior change as a secondary metric. Shift the objective function toward exploration once the feature has established trust.

---

## 2. ML Churn Intervention Flow

### Flow Architecture

```
ML Model Scores Subscribers Daily
        │
        ▼
Churn Probability Score + Reason Code
        │
        ▼
    Score > 70%?
       / \
      /   \
   YES     NO
    │       │
    ▼       ▼
Flag in    Standard
CRM at     renewal
T-21 days  flow at
before     T-7 days
renewal
    │
    ▼
Personalized Perk
Notification
(reason-code driven)
    │
    ▼
Track Outcome:
- Perk redeemed?
- Subscriber renewed?
- Feed back to model
```

### Model Signal Design

The PM's job is to define what goes into the model. These are the signals I would prioritize:

| Signal | Type | Rationale |
|--------|------|-----------|
| Days since last order | Recency | Strongest single predictor of churn across subscription businesses |
| Order frequency trend (last 30d vs prior 30d) | Trajectory | Declining frequency is more predictive than absolute frequency |
| % of orders with active promotion vs without | Dependency | High promo dependency = subscriber who stays for discounts, not habit |
| Session frequency without ordering | Engagement | Browsing without transacting = "thinking about cancelling" |
| Days to renewal | Proximity | Churn intent spikes as renewal date approaches |
| Gold Pick engagement | Feature adoption | Did they view/redeem this month's Gold Pick? Non-engagement = disengagement |

### Reason Code → Intervention Mapping

The model output should include a **reason code** because different churn causes require different interventions:

| Reason Code | What It Means | Intervention |
|-------------|--------------|--------------|
| Declining Frequency | Subscriber is ordering less over time | "Your Gold Pick has a surprise waiting — [Restaurant] is your match this month" |
| Discount Dependency | Almost all orders use promotions | "As a Gold member, you've saved ₹X this year. Here's what's coming next month..." |
| Competitor Signal | Sessions are declining but competitor app installs detected | "Only on Gold: early access to [new restaurant] before anyone else" |
| Ghost Sessions | Browsing without ordering | Push notification with Gold Pick card visual |

### Model Evaluation Before Shipping

How to know the churn model is worth shipping before it's live:

| Metric | Definition | Target |
|--------|-----------|--------|
| Precision at 70% threshold | Of 100 users flagged as high-risk, how many actually churned in holdout? | >60% |
| Recall | Of all users who churned, how many were flagged as high-risk? | >40% |
| Cost per prevented churn | Intervention cost / churns prevented | Less than subscriber acquisition cost (SAC) |
| False positive rate | Users flagged who would have renewed anyway | Monitor and minimize — wasted perk budget |

**Key principle:** If the churn model has low precision, you're spending intervention budget on users who would have renewed anyway — that's wasted personalization spend, not retention.
