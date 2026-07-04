# Success Metrics & Model Evaluation

## Metrics Framework

Success metrics are organized into three categories: **Leading** (early signals), **Lagging** (confirmed impact), and **Guardrail** (prevent unintended harm).

### Leading Metrics

| Metric | Definition | Why It Matters | Target |
|--------|-----------|---------------|--------|
| Gold Pick card CTR | % of subscribers who tap the Gold Pick card | Engagement signal for the habit layer — are subscribers even noticing the new feature? | >15% monthly |
| Gold Pick redemption rate | % of subscribers who order from the Gold Pick restaurant | Actual behavior change — not just clicks, but orders at new restaurants | >5% monthly |
| Churn intervention open rate | % of high-risk subscribers who open the personalized perk notification | Is the ML-triggered offer reaching the right people at the right time? | >25% |
| Churn intervention perk redemption | % of notified subscribers who redeem the perk | Is the offer compelling enough to drive action? | >8% |

### Lagging Metrics

| Metric | Definition | Why It Matters | Target |
|--------|-----------|---------------|--------|
| M3 renewal rate | % of subscribers who renew at Month 3 vs. baseline | Primary retention metric — Month 3 is the highest-churn window | +15–20% improvement |
| % of Gold orders without active promo | Orders placed without discount codes or promotions | Habit vs. discount dependency signal — are subscribers ordering for food identity or just savings? | Trending upward MoM |
| Gold-specific NPS delta | NPS score from "as a Gold member" framed prompt vs. general Zomato NPS | Is identity attachment forming? Do Gold members feel distinctly positive about their membership? | Gold NPS > General NPS |

### Guardrail Metrics

| Metric | Definition | Why It Matters | Threshold |
|--------|-----------|---------------|-----------|
| Restaurant partner satisfaction score | Survey of Gold Pick partner restaurants | Perks shouldn't feel punitive to partners — if restaurants resent the program, supply shrinks | >4.0/5.0 |
| Subscriber acquisition cost (SAC) | Cost to acquire a new Gold subscriber | Don't spend more acquiring new subscribers to replace churned ones — retention should reduce SAC pressure | Stable or declining |
| Gold Pick recommendation accuracy | % of subscribers who rate their Gold Pick as "relevant" | The personalization engine must feel personal, not random | >60% |

---

## Model Evaluation Framework (Pre-Ship)

Before deploying the churn prediction model to production, validate using holdout testing:

### Holdout Test Design

1. **Training set:** Historical Gold subscriber data with labeled churn events (renewed vs. cancelled)
2. **Holdout set:** 20% of data reserved for evaluation, never seen during training
3. **Evaluation at 70% threshold:** Users the model scores >70% churn probability

### Key Evaluation Metrics

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| **Precision** | True Positives / (True Positives + False Positives) | Of users flagged as high-risk, how many actually churned? Low precision = wasting intervention budget on users who'd have renewed. |
| **Recall** | True Positives / (True Positives + False Negatives) | Of users who churned, how many were flagged? Low recall = missing the subscribers you should have saved. |
| **Cost-per-prevented-churn** | Total intervention cost / Number of churns prevented | Compare to subscriber acquisition cost (SAC). If cost-per-prevented-churn > SAC, the model isn't worth the investment. |

### Go/No-Go Criteria

| Criteria | Threshold | Rationale |
|---------|-----------|-----------|
| Precision at 70% threshold | >60% | Below 60%, too many false positives — sending perks to users who'd renew anyway |
| Recall | >40% | Below 40%, missing too many at-risk subscribers |
| Cost-per-prevented-churn vs. SAC | < SAC | If it's cheaper to acquire a new subscriber than to retain one, the model isn't justified |

---

## Measurement Timeline

| Timeframe | What to Measure | Decision Point |
|-----------|----------------|----------------|
| Week 1–4 | Gold Pick CTR and initial engagement | Is the feature being noticed? Iterate on card design if CTR < 10% |
| Month 2–3 | Gold Pick redemption rate + first cohort M3 renewal data | Is the habit layer driving actual behavior change? |
| Month 4–6 | Churn model precision/recall in production + intervention conversion | Is the ML model worth the ongoing operational cost? |
| Month 6+ | NPS delta, promo-dependency trend, SAC trend | Long-term identity attachment signal — are we shifting from discount to habit? |
