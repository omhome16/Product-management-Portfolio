# User Research: Sentiment Analysis

> **Methodology Note:** This analysis uses publicly available user feedback from Reddit, Trustpilot, Google Play Store, and Apple App Store as proxy evidence for subscriber sentiment. This introduces a known selection bias — see [Research Plan](./02-research-plan.md) for limitations.

---

## Key Sentiment Themes

### 1. "The Illusion of Savings"

**Finding:** Multiple Reddit threads argue that Zomato adjusts pricing for Gold members, with non-Gold users receiving larger direct discounts that effectively neutralize the "free delivery" benefit.

**Evidence:** Users on r/india and r/bangalore report comparing checkout totals between Gold and non-Gold accounts for the same restaurant and finding minimal real differences. The pattern suggests that while delivery fees are waived, item markups or reduced discount coupons offset the savings.

**Implication for product:** If the core value prop (saving money) is perceived as illusory, no discount-based retention strategy will work. The subscription needs value that isn't denominated in rupees.

**Sources:**
- [Reddit r/india — Zomato Gold discussions](https://www.reddit.com/r/india/) (2024–2025, multiple threads)
- [Reddit r/bangalore — food delivery threads](https://www.reddit.com/r/bangalore/) (2024–2025)

---

### 2. Rain Surcharge Policy Change

**Finding:** On May 16, 2025, Zomato began charging a "rain fee" (₹15–₹35) to Gold members — a cost previously waived as a membership benefit. Zomato stated the fee compensates delivery partners working in difficult weather.

**Evidence:** This single policy change generated significant negative sentiment across social media and news coverage. Users cited it as a breach of the "premium" promise — paying for a subscription that no longer protects against surcharges.

**Implication for product:** Trust erosion from benefit removal is disproportionate to the financial impact. Subscribers don't just calculate savings — they track broken promises.

**Source:** [India Today — "Zomato changes Gold Membership benefits, now in rain it won't help you much"](https://www.indiatoday.in/technology/news/story/zomato-changes-gold-membership-benefits-now-in-rain-it-wont-help-you-much-2729969-2025-05-14) (May 14, 2025)

---

### 3. Platform Fee Stacking

**Finding:** The platform fee has risen from approximately ₹2 to ₹14.90 per order. This fee applies to all users, including Gold members, with no exemption or discount.

**Evidence:** Widespread user frustration across Reddit and social media. Users describe paying a subscription fee + per-order platform fee as "double-dipping." The cumulative effect on a subscriber ordering 5 times/month is an additional ₹74.50/month on top of the subscription.

**Implication for product:** Platform fees are eroding the savings math that justifies Gold subscription in the first place. This accelerates rational churn.

**Sources:**
- User reports across Reddit r/india, r/mumbai (2025–2026)
- Verified against in-app pricing data

---

### 4. Customer Support Quality Gap

**Finding:** Gold membership provides no meaningful priority in customer support. Users report being trapped in automated AI chatbot loops when dealing with incorrect orders, missing items, or refund disputes.

**Evidence:** Zomato holds a 1.6-star average on Trustpilot (self-selecting negative, but directionally significant). Common complaints: automated responses, inability to reach a human agent, delayed refunds, poor resolution for delivery issues.

**Implication for product:** A "premium" membership that doesn't feel premium in moments of failure (wrong order, late delivery) reinforces the perception that Gold is just a discount code, not a relationship.

**Sources:**
- [Trustpilot — Zomato Reviews](https://www.trustpilot.com/review/zomato.com) (1.6-star average, 2024–2025)
- [Reddit discussions on customer support](https://www.reddit.com/r/india/) (2024–2025)
- [Apple App Store — Zomato iOS reviews](https://apps.apple.com/in/app/zomato-food-delivery-dining/id434613896) (filtered for "Gold")

---

### 5. Cancellation UX Friction

**Finding:** Users report difficulty finding the cancellation option within the Zomato app. The interface appears designed to make accidental renewals more likely — a pattern consistent with "dark patterns."

**Evidence:** Online guides and forum discussions frequently appear to help users navigate cancellation. The CCPA's 2023 Guidelines for Prevention and Regulation of Dark Patterns explicitly address such practices.

**Implication for product:** Friction-based retention is the opposite of genuine retention. It delays churn without building loyalty, and creates negative brand sentiment when users eventually do cancel.

**Sources:**
- User reports across Reddit and YouTube cancellation guides
- [CCPA Dark Patterns Guidelines 2023 (PDF)](https://consumeraffairs.nic.in/sites/default/files/CP%20Act%20Notification/Guidelines-Dark-Patterns.pdf)

---

### 6. Shrinking Restaurant Coverage

**Finding:** Long-term subscribers note that the number of partner restaurants offering significant Gold discounts has decreased over time, with restaurants opting out of the program.

**Evidence:** Reddit threads from r/mumbai and r/bangalore document specific restaurants that previously participated in Gold but have since withdrawn. Users describe a narrowing pool of options that reduces the practical value of membership.

**Implication for product:** Supply-side erosion compounds the subscriber's negative savings math. Even if discounts exist on paper, they matter less if the subscriber's preferred restaurants aren't participating.

**Sources:**
- [Reddit r/mumbai, r/bangalore food delivery threads](https://www.reddit.com/r/mumbai/) (2024–2025)

---

## Sentiment Summary

| Theme | Severity | Frequency | Primary Source |
|-------|----------|-----------|----------------|
| Illusory savings perception | High | Very Common | Reddit |
| Rain surcharge trust erosion | High | Common | India Today, Reddit |
| Platform fee stacking | High | Very Common | Reddit, User reports |
| Support quality gap | Medium | Common | Trustpilot, App Store |
| Cancellation dark patterns | Medium | Moderate | Reddit, CCPA guidelines |
| Restaurant coverage decline | Medium | Moderate | Reddit |

## Important Caveat

This sentiment analysis represents the **vocal minority**. Zomato Gold grew from 7.4M to 12.1M subscribers in FY25 (+63.5%), indicating that the majority of subscribers find sufficient value to join and remain. The 4.7-star Play Store aggregate (carried by the broader user base) contrasts sharply with the 1.6-star Trustpilot average (self-selecting critics). The truth likely falls between these extremes.
