# AEO Checks Roadmap

Analysis of the five AEO checks that currently return `null` from
`services/publicAeoReportBuilder.js` and are rendered as "Not Checked" in
both the PDF and the HTML report pending real implementation.

**Scope of this document:** per-check decision input only. No code. Implementation
follows in separate sessions once each check is approved.

**Context of the null fields**

The detector at `services/aeoDetector.js` runs 10 deterministic HTML-level checks
(schema, meta, h1, viewport, ssl, speed, social, contact, faq, content) plus blog
detection. The five fields below require either an external API, deeper crawling
than the homepage fetch, or fuzzy text analysis — which is why they were left
out of the first detector build.

---

## 1. Google Business Profile — `hasGoogleBusiness`

### Data source
Google Places API (New) — Text Search endpoint.

```
POST https://places.googleapis.com/v1/places:searchText
Headers:
  Content-Type: application/json
  X-Goog-Api-Key: $GOOGLE_PLACES_API_KEY
  X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress
Body: { "textQuery": "<companyName> <city>" }
```

Pass if `response.places[]` is non-empty AND at least one result's
`formattedAddress` contains the submitted city (case-insensitive), to avoid a
same-named firm in a different city triggering a false positive.

### Cost per report
Places API (New) Text Search pricing (as of April 2026): **$32 per 1,000
requests** for "Text Search Pro" (the SKU that returns `places.id` / the minimum
fields we need). 1 lookup per report = **~£0.025 per report** at current FX.

Caching by `${companyName}|${city}` for 24h brings repeat-lookup cost to zero
within the window — for high-volume reporting this is significant; for free-tier
single-report usage, negligible.

### Complexity
~4 hours. New `services/googleBusinessProfile.js` wrapping `fetch` to the Places
endpoint with 5s timeout, in-memory LRU cache (keyed by `companyName|city`, 24h
TTL), and a 3-attempt retry with exponential backoff on 5xx. Wire into
`publicAeoReportBuilder.js:mapSearchedCompany` so `hasGoogleBusiness` is
populated before the result is returned.

### Signal quality (regulated UK prof services)
**Very high.** For solicitors, accountants, mortgage advisers, and estate
agents in the UK, presence on Google Business Profile is near-universal for
firms that have any customer-facing presence at all. Absence is a genuine red
flag — it strongly correlates with invisibility in Google Local Pack, AI
Overviews, and ChatGPT's "recommend an X in Y" queries. Unlike the other four
checks below, this one almost never produces a false positive for a real firm,
and absence is almost always actionable.

### Verdict
**SHIP.** Highest signal-to-cost ratio of the five. Clear user win
(ground-truth evidence of a real deficiency, actionable fix). Cost per report
is immaterial at current volumes. Ship this first.

---

## 2. Customer Reviews — `hasReviews`

### Data source
There's no clean single source. Three options, in descending order of quality:

- **A. Google Reviews via Places API (New)** — the same Text Search call
  we'd make for GBP can include `places.rating,places.userRatingCount` in the
  field mask for **$37 / 1,000 requests** ("Text Search Enterprise"). Pass if
  `userRatingCount >= 5`. Zero additional API call when paired with check #1.
- **B. Trustpilot** — no free API. The Business Data API is enterprise-tier
  only ($thousands/month). Public profile pages are scrapable but Trustpilot
  actively blocks scrapers and the scrape breaks monthly.
- **C. Category-specific UK directories** — ReviewSolicitors (solicitors),
  VouchedFor (mortgage advisers), AllAgents (estate agents). Each would need
  its own scraper; all moderately hostile to scraping; detection logic would
  need category-aware routing.

### Cost per report
If combined with check #1 under "Text Search Enterprise": effectively **£0.003
extra per report** (the rating field upgrade over Pro tier). Independent of #1:
**~£0.029 per report**.

### Complexity
**~2 hours** if piggybacking on #1 (just upgrade the field mask and add
`userRatingCount` parsing). **~20+ hours** for a robust multi-source (A+B+C)
implementation, most of that in keeping scrapers alive.

### Signal quality
**Medium.** Google Reviews alone is a decent proxy — a firm with 0 Google
reviews is almost certainly under-indexed for AI. But it misses firms whose
customers primarily leave reviews on Trustpilot or vertical directories
(common for mortgage advisers on VouchedFor, solicitors on ReviewSolicitors).
So "0 Google reviews" ≠ "0 reviews online". Risk of false fails is material.

### Verdict
**SHIP (Google Reviews only, piggybacked on #1).** Accept the known false-fail
risk; frame the detail copy as "Google reviews found" rather than
"Customer reviews found" to make the scope of the check explicit. Skip B and C
— the maintenance burden of scrapers outweighs the marginal signal gain.

---

## 3. Pricing / Fee Transparency — `hasPricing`

### Data source
HTML crawl of the submitted website. Fetch `/pricing`, `/plans`, `/fees`,
`/our-fees`, `/costs`, plus the homepage, and scan for:

- `£` symbol within 20 characters of a numeric digit sequence
- `$` / `€` symbol (same pattern) — surfaces firms priced in foreign currency
- Tokens like "from £X", "fixed fee", "fee estimate", "starting at £"
- For mortgage/regulated: "commission", "broker fee", "disclosure"
- Negative signals: "call for a quote", "bespoke pricing", "contact us for pricing"

Pass if ≥1 positive pattern and 0 dominating negative patterns.

### Cost per report
**£0.** All HTTP fetches, no external API.

### Complexity
~5 hours. Extend `aeoDetector.js` to follow up to N=5 candidate URLs from the
homepage (or try the common path list above). Add pattern-matching layer.
Add to check list as 11th deterministic check.

### Signal quality
**Low to medium for regulated UK prof services, for three reasons:**

1. **Regulatory norms vary.** SRA solicitors frequently publish hourly rates
   or fee estimates (pass easily). FCA mortgage advisers often don't publish
   firm fees because commission structure depends on product (legitimate
   false fail). ICAEW accountants split 50/50 — "pricing" is often
   "contact for a quote" and that's *fine*.
2. **False positives on incidental mentions.** A blog post mentioning
   "conveyancing fees have risen 8% this year" would trip the check.
   Requires tight enough heuristics that you'll either miss real pricing
   pages or flag blog posts as pricing.
3. **Actionability is questionable.** If a firm deliberately doesn't publish
   pricing (often for commercial reasons that have nothing to do with AI
   visibility), flagging this as a "failure" is not actually helpful advice —
   they know, they chose it, and AI platforms aren't actually penalising
   them for it.

### Verdict
**DROP** for regulated professional services. Keep the row permanently as
"Not Checked — not applicable to regulated firms" (or remove the row for these
categories entirely). Consider SHIP for the non-regulated "other" category
(copiers, telecoms, IT support) where pricing transparency is a stronger
discriminator.

---

## 4. Brand Partnerships Listed — `hasBrands`

### Data source
HTML crawl of `/about`, `/partners`, `/clients`, `/press`, `/accreditations`,
plus homepage. Scan for:

- `<img>` tags with `alt` containing known brand tokens (very category-specific)
- Logo grids (dense clusters of same-sized `<img>` tags on a section)
- Headings containing "Our Clients", "As Seen In", "Trusted By", "Partners",
  "Accreditations"
- For legal: "Lexcel", "CQS", "Conveyancing Quality Scheme", "Law Society"
- For mortgage: explicit lender names from a curated UK panel list
  (Halifax, HSBC, Nationwide, Barclays, etc., ~40 UK lenders)
- For estate: "Propertymark", "ARLA", "NAEA", "Client Money Protection", "CMP"

### Cost per report
**£0.** HTML crawl only.

### Complexity
**~12–20 hours**, largely in per-category pattern curation and keeping the
lender / accreditation lists fresh. Implementation itself is straightforward
(regex + optional category-aware dictionary lookup); maintenance is the
expensive part.

### Signal quality
**Medium for regulated categories; highly variable.** For mortgage advisers,
lender panel disclosure genuinely is a meaningful signal (FCA guidance
favours whole-of-market disclosure). For solicitors, accreditations like
Lexcel / CQS are strong. For estate agents, Propertymark / CMP membership
is strong. For copiers / IT / general commercial categories, it's noisy —
plenty of good firms don't maintain a "trusted by" logo grid because their
clients don't want their logos displayed.

High false-fail risk: firms who genuinely have accreditations but don't
display them in a way the crawler can detect (e.g. embedded in a PDF, referenced
only in privacy policy, or only visible behind a login).

### Verdict
**SHIP — but only for regulated categories (legal, mortgage, estate), and
with category-specific dictionaries.** DROP for the generic "other" category.
The current PDF already labels this per-category ("Propertymark / ARLA / NAEA"
for estate agents, "FCA Register Listing" for mortgage, etc.) — the rename is
a signal that this was always intended as a category-specific check. Ship
legal first (Lexcel, CQS), then mortgage (lender panel), then estate
(Propertymark). Pattern catalogue needs a quarterly refresh.

---

## 5. Detailed Service Pages — `hasDetailedServices`

### Data source
HTML crawl. From the homepage:

1. Find navigation links matching `/services/*`, `/practice-areas/*`,
   `/what-we-do/*`, `/expertise/*` (path-pattern catalogue).
2. Fetch up to 5 candidate service pages (cap at 5 to bound per-report time and
   respect robots.txt).
3. For each page, measure:
   - Word count of main content area (exclude nav, footer, boilerplate)
   - Heading depth (count of h2 + h3)
   - Presence of process/fee/timeline language

Pass if ≥3 candidate pages each clear the bar (>400 words and ≥2 H2 headings).

### Cost per report
**£0** for API. Adds ~3–5s per report to latency (5 extra fetches).

### Complexity
**~15 hours.** Link discovery is straightforward; content extraction requires
Readability-style main-content isolation (we'd pull in `@mozilla/readability` or
reimplement the heuristic) to stop nav/footer tokens polluting the word count.
Also needs robots.txt honouring and a per-origin concurrency cap.

### Signal quality
**High for regulated categories, genuinely useful.** A solicitor with a
three-sentence "Conveyancing" page is a solicitor that won't be cited by AI;
a solicitor with a 1,500-word conveyancing guide with process detail is cited
materially more often. Same pattern holds for accountants ("Tax Advisory",
"VAT Services" stubs vs. detailed pages) and mortgage advisers
("First-Time Buyer" stubs vs. walkthroughs).

False-fail risk: firms whose services are gated behind a client portal, firms
whose content lives on a separate subdomain, and firms whose sites use heavy
client-side rendering (the fetch won't see content rendered by React/Vue
unless we run Puppeteer — which multiplies cost and complexity 10×).

### Verdict
**PAID-TIER-ONLY.** The signal is genuinely useful for regulated firms, and
it's one of the most actionable findings an AEO report can return ("your
Conveyancing page is 180 words, here's what competitors publish, here's how
to structure it"). But:

- Per-report latency adds 3–5s on top of the existing 30–60s, making the
  free-tier experience noticeably worse.
- False-fail on client-rendered sites is common enough to embarrass us when
  surfaced to free-tier users ("we couldn't find your services page" is a
  support ticket waiting to happen).
- It's the most differentiated vs. competing tools — worth reserving for
  paying customers who get the full crawl depth + remediation guidance.

Ship the free-tier row as "Not Checked — available on TendorAI Pro" once the
paid detector path is built. Until then: leave null, render as Not Checked.

---

## Summary table

| # | Check | Source | Cost/report | Complexity | Signal | Verdict |
|---|---|---|---|---|---|---|
| 1 | Google Business Profile | Places API Text Search | ~£0.025 | 4h | Very high | **SHIP first** |
| 2 | Customer Reviews | Places API (piggyback #1) | +£0.003 | 2h (atop #1) | Medium | **SHIP** (Google-only) |
| 3 | Pricing | HTML crawl | £0 | 5h | Low/medium | **DROP** for regulated; SHIP for generic |
| 4 | Brand Partnerships | HTML crawl | £0 | 12–20h + upkeep | Medium/high | **SHIP** per-category only |
| 5 | Detailed Service Pages | HTML crawl | £0 (5× latency) | 15h | High | **PAID-TIER-ONLY** |

## Suggested implementation order

1. **#1 Google Business Profile** — standalone, 4h, highest ROI, best first demo.
2. **#2 Customer Reviews** — piggyback on #1, add the field mask upgrade. Total sprint for #1 + #2: one session.
3. **#4 Brand Partnerships (legal first)** — Lexcel / CQS / SRA accreditations for solicitors. Useful for the biggest single vertical. Estate + mortgage can follow in separate sessions.
4. **#5 Detailed Service Pages — behind Pro tier only.** Scoped separately when the paid-tier flow is ready.
5. **#3 Pricing — do not build for regulated categories.** Only revisit if we materially grow the non-regulated customer base.

## Env vars needed

- `GOOGLE_PLACES_API_KEY` — needed for #1 and #2. Enable "Places API (New)"
  in the Google Cloud project and restrict the key to the Render service's
  egress IPs (or restrict by API key referrer if Render's egress is dynamic).
