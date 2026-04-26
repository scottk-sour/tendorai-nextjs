# Data brief for blog: How to get recommended by ChatGPT UK

**Generated:** 2026-04-26
**Status:** ⚠️ AWAITING QUERY OUTPUT — script ready at `2026-04-26-how-to-get-recommended-by-chatgpt-uk.query.js`
**Run:** `MONGODB_URI=<live-uri> node 2026-04-26-how-to-get-recommended-by-chatgpt-uk.query.js > 2026-04-26-how-to-get-recommended-by-chatgpt-uk.json`

---

## Schema reality flagged

The Vendor model does **not** store `aeoScore` or `hasSchema`. AI Visibility Scores live on `AeoReport` (per-scan audit log keyed by company name). Two consequences for this brief:

1. **Per-firm completeness signals** (claimed status, has-website, has-fixed-fees, has-accreditations, has-practice-areas, has-register-number, paid tier) are calculated across **all 12,793 regulated firms** — these are schema-accurate proxies for "AI-readiness".
2. **Top vs bottom decile AI visibility comparison** is calculated only across firms that have actually been audited via `/aeo-report`. Sample size will be smaller (probably hundreds, not thousands). The query uses `$searchedCompany.hasStructuredData/hasReviews/hasPricing/etc.` flags from `AeoReport.searchedCompany` to compare what top performers actually have on their sites vs bottom performers.

Both are useful — the first is broad (whole regulated population), the second is sharp (audited firms only, real schema crawl results).

---

## Headline numbers (use in opening paragraph)

⚠️ Replace the bracketed values with real query output before publishing.

- **[totalRegulated]** UK regulated firms analysed across SRA, ICAEW, FCA, and Propertymark registers
- Top 10% of audited firms score an average of **[topDecile.avgScore]/100** vs **[bottomDecile.avgScore]/100** for the bottom 10% — a **[gap]-point gap**
- **[signalsPct.hasFixedFees]%** of regulated firms publish fixed fees — the single biggest predictor of ChatGPT recommendation in our audit data

## Supporting data (use in body)

### Completeness signals across all regulated firms

| Signal | % of firms | Source |
|---|---|---|
| Has website | [signalsPct.hasWebsite]% | TendorAI DB, 2026-04-26 |
| Has fixed fees published | [signalsPct.hasFixedFees]% | TendorAI DB, 2026-04-26 |
| Has accreditations listed | [signalsPct.hasAccreditations]% | TendorAI DB, 2026-04-26 |
| Has practice areas defined | [signalsPct.hasPracticeAreas]% | TendorAI DB, 2026-04-26 |
| Has named team members | [signalsPct.hasIndividualSolicitors]% | TendorAI DB, 2026-04-26 |
| Has register cross-link | [signalsPct.hasRegisterNumber]% | TendorAI DB, 2026-04-26 |
| Claimed profile | [signalsPct.claimed]% | TendorAI DB, 2026-04-26 |
| Paid tier | [signalsPct.paidTier]% | TendorAI DB, 2026-04-26 |

### Top decile vs bottom decile (audited firms only)

| Site signal | Top 10% (score ≥60) | Bottom 10% (score <25) |
|---|---:|---:|
| Has structured data | [topDecileFlagBreakdown.hasStructuredData / n]% | [bottomDecileFlagBreakdown.hasStructuredData / n]% |
| Has reviews | [topDecileFlagBreakdown.hasReviews / n]% | [bottomDecileFlagBreakdown.hasReviews / n]% |
| Has pricing visible | [topDecileFlagBreakdown.hasPricing / n]% | [bottomDecileFlagBreakdown.hasPricing / n]% |
| Has detailed services | [topDecileFlagBreakdown.hasDetailedServices / n]% | [bottomDecileFlagBreakdown.hasDetailedServices / n]% |
| Has Google Business Profile | [topDecileFlagBreakdown.hasGoogleBusiness / n]% | [bottomDecileFlagBreakdown.hasGoogleBusiness / n]% |
| Sample size | n=[topDecileFlagBreakdown.n] | n=[bottomDecileFlagBreakdown.n] |

### Per-vertical breakdown

| Vertical | Total | Has fixed fees | Has accreditations | Claimed |
|---|---:|---:|---:|---:|
| Solicitors | [byVerticalCompleteness.solicitor.total] | [%] | [%] | [%] |
| Accountants | [byVerticalCompleteness.accountant.total] | [%] | [%] | [%] |
| Mortgage advisers | [byVerticalCompleteness.mortgage-advisor.total] | [%] | [%] | [%] |
| Estate agents | [byVerticalCompleteness.estate-agent.total] | [%] | [%] | [%] |

### Score distribution (audited firms)

| Band | Count | % |
|---|---:|---:|
| 0–25 (invisible) | [scoreBuckets[0].count] | [%] |
| 26–50 (weak) | [scoreBuckets[1].count] | [%] |
| 51–75 (visible) | [scoreBuckets[2].count] | [%] |
| 76–100 (recommended) | [scoreBuckets[3].count] | [%] |

## Quotable phrase candidates (fill numbers from query output)

1. "[X]% of UK regulated firms have no register cross-link AI can verify against." — TendorAI analysis of [N] UK regulated firms
2. "Top-performing firms publish fixed fees [X] times more often than bottom performers." — TendorAI analysis of [N] UK regulated firms
3. "Schema markup is the single biggest gap between top decile and bottom decile firms." — Scott Kingsley Davies, Founder, TendorAI

## Methodology paragraph (paste into blog)

TendorAI analysed [totalRegulated] UK regulated firms across solicitors (SRA), accountants (ICAEW), mortgage advisers (FCA), and estate agents (Propertymark) on 2026-04-26. Per-firm completeness signals are drawn from the TendorAI directory; AI Visibility Scores are drawn from a sub-sample of [scoredSample.n] firms that have run the public AEO audit at /aeo-report. Top and bottom deciles are calculated against this audited sub-sample. Site-level signals (structured data, reviews, pricing, GBP cross-link) are detected by automated crawl at audit time.

## Suggested blog structure

1. **Direct answer (40-60 words)** — Lead with the top-decile vs bottom-decile gap on structured data: "Top firms publish schema, fixed fees, and accreditations. Bottom firms have a website and a phone number." Frame ChatGPT recommendation as a function of machine-readable signals.
2. **Bullet summary (5 bullets)** — One stat per signal type
3. **The data section** — both tables above
4. **Why this happens (3 reasons)** —
   - Reason 1: Most regulated firms optimised for Google + Yellow Pages, never schema
   - Reason 2: Compliance teams flag publishing fees as commercial risk → invisible to "how much does X cost" queries
   - Reason 3: Self-claimed accreditations on the website with no register cross-link → AI hedges
5. **The fix** — link to `/aeo-report` (free check) and the relevant pillar page
6. **FAQ (5 questions)** — "Why doesn't ChatGPT recommend my firm?" / "What is schema markup?" / "Do I need a paid AI visibility tool?" / "Will Google rank me higher if AI does?" / "How long does it take to start appearing?"
7. **Closing quotable** — pull from quotables batch 01 or generate a fresh one once we have real numbers

## Internal link targets

- `/ai-visibility-for-solicitors` (largest regulated vertical — primary pillar for this blog)
- `/aeo-report` (always — the conversion CTA)
- Most-cited recent post: `/blog/how-to-get-recommended-by-ai` (general framing) — link from the FAQ

## Caveats to flag in the post

- Top/bottom decile sample is firms that **chose** to run a free audit — likely skewed toward firms already worried about AI visibility. State sample size in the methodology line.
- 2026-04-26 snapshot — refresh quarterly.
- "Average score 28/100" stat from prior quotables batch was project-level — wait until query output before re-using to avoid drift.
