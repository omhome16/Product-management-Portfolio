# Frameworks: JTBD, Kano Model, RICE

## 1. Jobs-to-be-Done (JTBD) Analysis

JTBD is the primary framing tool for this case study because it reveals **why discounts fail as the primary value prop** for retention.

### JTBD Gap Map

| Job Type | What the Job Is | Current Gold Coverage | Proposed Coverage |
|----------|----------------|----------------------|-------------------|
| **Functional** | "Order food without worrying about delivery fees and get the best prices" | Covered — free delivery on ≥₹199 orders, dining discounts | Maintained |
| **Emotional** | "Feel like a smart, savvy food person getting the best of my city's food scene" | Not covered — Gold doesn't create identity or pride | Gold Picks — personalized monthly restaurant discovery with exclusive perks |
| **Social** | "Be someone who discovers new restaurants before my friends do" | Not covered — Gold is invisible to others | "Year in Food" shareable summaries, early access to new restaurant launches |

### Why This Matters for Retention

- **Functional jobs** create transactional relationships. When the transaction math fails, the relationship ends.
- **Emotional jobs** create identity. "I'm a food explorer" survives a month when you only order twice.
- **Social jobs** create community. Sharing your "Year in Food" or telling friends about an early-access restaurant creates investment that has nothing to do with delivery fees.

Gold currently addresses only the functional job. This is why switching costs are low and churn is rational.

---

## 2. Kano Model Analysis

The Kano Model classifies features by their impact on customer satisfaction. It reveals that Gold is entirely composed of Basic and Performance features — with zero Delighters.

### Feature Classification

| Feature | Kano Category | Current/Proposed | Satisfaction Impact |
|---------|--------------|------------------|---------------------|
| Free delivery | **Basic** (Must-Have) | Current | Removing causes churn; improving doesn't impress |
| Priority customer service | **Basic** (Must-Have) | Current | Expected as part of premium; absence frustrates |
| Restaurant discounts / B1G1 | **Performance** (More = Better) | Current | More restaurants, deeper discounts help — but have a ceiling and cost money |
| Gold Picks (monthly restaurant perk) | **Delighter** | Proposed | Unexpected, creates positive emotion, builds food identity |
| Early access to new restaurants | **Delighter** | Proposed | Creates FOMO benefit and social shareability |
| "Year in Food" annual summary | **Delighter** | Proposed | Identity-forming, shareable (Spotify Wrapped model) |

### The Kano Insight

**Gold is 100% Basic + Performance. No Delighters.**

- **Basic features** prevent dissatisfaction when present but don't create delight. Subscribers expect free delivery — it doesn't make them feel special.
- **Performance features** (discounts) have linear satisfaction curves — but they have a ceiling, and Swiggy can always match them.
- **Delighters** are the features that create positive surprise and emotional attachment. They're the features subscribers don't expect, can't easily get elsewhere, and feel personal enough to create genuine loss aversion when considering cancellation.

Moving from "no Delighters" to "Delighter-led" retention means building features that create positive emotion and surprise — the kind of features whose absence is felt as identity loss, not just savings loss.

---

## 3. RICE Prioritization

Features scored on Reach (how many subscribers are affected), Impact (how much it changes behavior), Confidence (how sure we are it works), and Effort (engineering/ops cost).

### Scoring Key
- **Reach:** High (>70% of subscribers) / Medium (30–70%) / Low (<30%)
- **Impact:** High (behavior change) / Medium (engagement) / Low (awareness)
- **Confidence:** High (strong evidence) / Medium (reasonable hypothesis) / Low (speculative)
- **Effort:** High (>3 months, cross-team) / Medium (1–3 months) / Low (<1 month)

### RICE Table

| Feature | Reach | Impact | Confidence | Effort | Score | Decision |
|---------|-------|--------|------------|--------|-------|----------|
| Personalized "Gold Pick" monthly restaurant perk | High | High | Medium | Medium | **HIGH** | Build First |
| ML churn prediction + proactive intervention | High | High | Medium | High | **HIGH** | Build First |
| Gold-exclusive menu items at partner restaurants | Medium | High | Low | High | MEDIUM | Phase 2 |
| "Year in Food" annual summary (Spotify Wrapped style) | Medium | High | Medium | Low | MEDIUM | Phase 2 |
| Food explorer streak / gamification | Low | Medium | Low | Medium | LOW | Backlog |

### Prioritization Rationale

**Build First — Gold Picks:** Addresses the emotional JTBD gap directly. High reach because every subscriber sees the home screen card. Medium confidence because the food identity hypothesis needs validation through A/B testing. Medium effort because it requires ML recommendation + restaurant partner onboarding.

**Build First — ML Churn Prediction:** Directly addresses the retention goal. High reach because it scores every subscriber. Medium confidence because model accuracy depends on data quality. High effort but high leverage — preventing one churn is worth more than acquiring one new subscriber.

**Phase 2 — Year in Food:** Lower reach (annual event) but high emotional impact. Low effort (data already exists, just needs visualization). The Spotify Wrapped model has proven shareability — but it's a once-a-year feature, not a retention lever for month-to-month churn.

**Backlog — Explorer Streak:** Speculative impact. Gamification works for some user segments but risks feeling forced. Requires more user research before committing engineering resources.
