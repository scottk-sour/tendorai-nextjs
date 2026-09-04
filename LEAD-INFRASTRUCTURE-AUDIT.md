# Lead & Quote Infrastructure Audit — TendorAI

**Date:** 16/05/2026
**Scope audited:** Frontend repo (`tendorai-nextjs`) only.
**Mode:** Read-only. No files modified. Nothing committed.

> ## ⚠️ Audit scope limitation — read first
>
> This audit was run inside an isolated cloud environment that contains **only the frontend repository** (`tendorai-nextjs`). The backend repository (`ai-procurement-backend`) was **not present** and there was **no database access**.
>
> As a result, the following requested items **could not be audited** and are marked **NOT AUDITABLE** throughout:
> - Section 3 — backend `Lead` model file, live DB record counts, source breakdown, recent-10 leads.
> - Section 4 — `services/emailService.js` / `services/emailTemplates.js` and all six email functions, including the previously-flagged `sendVendorContactRequest` XSS.
> - Section 6 / 7 — backend `/api/ai-query` matching engine, TCO logic, tier weighting.
> - Backend-side sanitisation, CSRF, and rate limiting on `/api/vendor-leads` and `/api/public/*`.
>
> Everything reported below is verified against frontend source. A second pass against `ai-procurement-backend` is required to close the gaps. Nothing in the NOT AUDITABLE sections has been inferred or fabricated.

---

## 1. Executive summary

TendorAI's lead infrastructure is **split, partially legacy, and leaking conversions**. The single working modern capture path is `/aeo-report`, which feeds the Express backend — but it is a *report* request, not a firm enquiry, and it has no GDPR consent checkbox. The vendor profile pages, which should be the core lead surface, are inconsistent: `/suppliers/vendor/[slug]` has a live enquiry form, but `/suppliers/profile/[id]` has an **orphaned, never-imported** form component and diverts all its CTAs to `/aeo-report` — a dead-end for anyone wanting to contact that specific firm. The `/get-quotes` and `/compare` flows are fully **photocopier-era legacy** (Photocopiers / Telecoms / CCTV / IT categories, colour/A3/volume questions) and have never been adapted to solicitors, accountants, or mortgage advisers. Lead routing happens entirely server-side in a backend not auditable here.

## 2. What's built and working

- **`/aeo-report`** — modern, functional report-request form. Posts to backend `POST /api/public/aeo-report`, retries on Render cold-start, redirects to a results page. Indexable. This is the de-facto primary lead funnel.
- **`/suppliers/vendor/[slug]`** — has a working `ContactForm` ("Contact {firm}") that posts enquiries to backend `POST /api/vendor-leads` with UTM/source attribution.
- **`/get-quotes` and `/compare`** — multi-step quote flows are functionally wired end-to-end (matching → results → lead submission). Both have a GDPR consent checkbox and Privacy Policy link.
- **Vendor dashboard lead views** — two views exist (`/vendor-dashboard/leads` and `/vendor-dashboard/quotes`), both read `GET /api/vendor-leads/vendor/me`, both support status changes; free-tier sees a masked teaser, Pro sees full detail.
- **Source attribution** — every frontend lead payload includes `source.page`, `source.referrer`, and `source.utm`, so a `/aeo-report` lead is distinguishable from a profile-page lead at write time.
- **Page-view tracking** — `ProfileViewTracker` and `AiReferralTracker` fire on `/suppliers/vendor/[slug]`, attributing AI-referral traffic (ChatGPT, Perplexity, Claude, Gemini, Grok, Copilot).
- **Privacy Policy** — exists at `/privacy`, explicitly describes "Quote Request Information", forwarding to firms, and a documented **24-month retention** for quote requests.
- **GA4** — Google Analytics is installed globally in `app/layout.tsx`.

## 3. What's built but broken or risky

| Severity | Finding |
|---|---|
| **CRITICAL** | **`sendVendorContactRequest` XSS — NOT AUDITABLE here.** The previously-flagged raw-HTML-injection issue lives in backend `services/emailService.js`, which is not in this environment. It is **neither confirmed nor cleared** by this audit. Must be checked in `ai-procurement-backend` before Phase 2. Flagged, not patched. |
| **CRITICAL** | **`/aeo-report` has no GDPR consent checkbox and no Privacy Policy link** (`app/aeo-report/AeoReportClient.tsx` lines 327–486 — grep for `consent`/`privacy` returns nothing). This is the highest-volume capture form on the site and it collects name + email + company with no explicit marketing consent. GDPR exposure. |
| **HIGH** | **`/suppliers/profile/[id]` is a conversion dead-end.** `QuoteRequestForm.tsx` exists in `app/suppliers/profile/[id]/` but is **never imported** (`grep -rln QuoteRequestForm app` returns only the file itself). The page's "Request a Quote" buttons all link to `getQuoteUrl = '/aeo-report'` (`page.tsx:773`, used at lines 1020, 1027, 1208, 1221). A visitor who wants to contact *that firm* cannot. |
| **HIGH** | **Orphan Next.js API route writing leads directly to MongoDB.** `app/api/public/quote-request/route.ts` builds and saves a `Lead` document via `lib/db/models`. It is **called by nothing** (`grep` confirms no caller). It violates the CLAUDE.md rule against duplicating backend functionality, has **no input sanitisation** (only `.trim()` + email regex — lines 84–89), **no rate limiting**, and **no CSRF protection**. Dead but live-deployable attack surface. |
| **HIGH** | **`/get-quotes` and `/compare` are photocopier-era legacy.** `QuoteFlow.tsx` `CATEGORIES` (lines 106–110) are Photocopiers, Telecoms, CCTV, IT only — no solicitor/accountant/mortgage/estate-agent. Question banks are `pc-volume`, `pc-colour`, `pc-a3`, monthly print volume, etc. This directly contradicts CLAUDE.md's forbidden-terminology rule. Any lead they generate is mis-shaped for the current verticals. |
| **MEDIUM** | **`ContactForm` (vendor profile) has no GDPR consent checkbox.** `app/components/vendor/ContactForm.tsx` has a passive "By submitting, you agree to be contacted…" disclaimer (line 190–192) but **no checkbox** and **no Privacy Policy link**. Weaker than `/get-quotes`, which has both. |
| **MEDIUM** | **Lead fan-out: one submission → up to 3 firms.** `QuoteFlow.handleSubmitQuote` loops `POST /api/vendor-leads` over `vendorIds` (`QuoteFlow.tsx:762–772`), defaulting to `vendors.slice(0,3)`. `CompareView` does the same and supports "request all" (`CompareView.tsx:321–326`). The same customer's contact details are sent to multiple firms — acceptable for a marketplace, but must be disclosed in the consent copy and is currently not explicit about *how many* firms receive it. |
| **MEDIUM** | **Two parallel dashboard lead views.** `/vendor-dashboard/leads` and `/vendor-dashboard/quotes` both render the same `/api/vendor-leads/vendor/me` data with different UIs and different status vocabularies (`leads` uses `viewed`; `quotes` uses `viewed/contacted/quoted/won/lost`). Duplication risk and inconsistent UX. |
| **LOW** | **GA4 measurement ID may be a placeholder.** `app/layout.tsx:272` carries the comment *"replace G-0D3RVTRZY9 with your real measurement ID"*. If `G-0D3RVTRZY9` is not the production property, all analytics is going nowhere. Needs confirmation. |
| **LOW** | **`NewsletterSignup` component is dead code.** `app/components/landing/NewsletterSignup.tsx` posts to `/api/public/subscribe` but is only re-exported in `index.ts` and rendered on no page. |
| **LOW** | **Frontend `lib/db/models/Lead.ts` `service` enum still lists `Photocopiers`, `Telecoms`, `CCTV`, `IT Services`** (lines 62) alongside the professional-services values — legacy residue. |

## 4. What's missing entirely (ordered by Phase 2 impact)

1. **A firm-specific enquiry path on `/suppliers/profile/[id]`** — the largest gap. This template is the canonical firm profile and currently cannot capture a lead. (`QuoteRequestForm` is built but disconnected.)
2. **A unified, vertical-correct lead form** — there is no single "enquire with this firm" component shared across both profile templates. `ContactForm` (vendor/[slug]) and `QuoteRequestForm` (profile/[id], orphaned) are two separate, divergent implementations.
3. **GDPR consent on `/aeo-report` and on `ContactForm`** — required before any Phase 2 lead monetisation.
4. **Outbound click tracking on firm website links** — both profile templates render the firm's website as a plain `<a target="_blank">` (`profile/[id]/page.tsx:1178–1192`; `vendor/[slug]` website link) with **no click tracking**. There is no way to attribute a conversion that happens after a click-through.
5. **Form-submission analytics events** — `grep "gtag("` across `app/` and `components/` returns **nothing outside `layout.tsx`**. No GA event fires on lead submit, so funnel conversion is invisible in analytics.
6. **A `ContactAction` in structured data** — neither profile template's `potentialAction` is a proper `ContactAction`/`ReserveAction` whose `target` is the enquiry endpoint (see Section 8).
7. **Lead-to-firm matching for organic/generic enquiries** — there is no frontend path for "I need a conveyancing solicitor in Cardiff → routed to firms". Matching only exists inside the legacy copier flows via backend `/api/ai-query`.
8. **A retention/cleanup job reference** — the Privacy Policy promises 24-month retention but nothing auditable here enforces it (would be backend/cron).

## 5. The single highest-leverage fix

**Wire a vertical-correct enquiry form into `/suppliers/profile/[id]` (and standardise it with `/suppliers/vendor/[slug]`).**

The profile pages are where AI-referred and organic visitors land on a *specific firm*. Right now `profile/[id]` sends every "Request a Quote" click to `/aeo-report` — a tool for the firm's own marketing, not a channel for a prospective client to reach the firm. Fixing this converts the highest-intent traffic TendorAI already receives (a visitor on a named firm's page) from a guaranteed dead-end into a captured lead. The component largely exists (`QuoteRequestForm.tsx`) — it needs de-copier-fying, GDPR consent added, and actually importing. This unlocks more lead flow than any new acquisition channel because the traffic is already arriving.

## 6. Phase 2 readiness score

**≈ 35%.**

Justification: the plumbing exists (lead model, dashboard views, source attribution, one working capture form) but the core profile-page conversion path is broken, consent/GDPR is incomplete on the busiest forms, the quote flows are still copier-shaped, and the entire backend lead-handling + email + matching layer is unverified. Not safe to monetise lead-gen until the profile-page path and consent gaps are closed and the backend is audited.

## 7. Recommended build order (next 5 actions)

1. **Audit `ai-procurement-backend`** — confirm/fix the `sendVendorContactRequest` XSS, and verify sanitisation, rate limiting, and CSRF on `/api/vendor-leads` and `/api/public/*`. Nothing else ships until CRITICAL items are cleared.
2. **Add GDPR consent + Privacy Policy link** to `/aeo-report` and to `ContactForm` (match the `/get-quotes` pattern, including disclosure that an enquiry may reach multiple firms).
3. **Build one shared `FirmEnquiryForm`** (vertical-aware: solicitor/accountant/mortgage/estate-agent fields, not colour/A3/volume) and mount it on **both** `/suppliers/profile/[id]` and `/suppliers/vendor/[slug]`, replacing `ContactForm` and the orphaned `QuoteRequestForm`.
4. **Add conversion tracking** — a GA4 event on every lead-form submit, and outbound click tracking on firm website links on both profile templates.
5. **Decommission or repurpose the legacy copier flows** — delete the orphan `app/api/public/quote-request/route.ts`, retire or re-vertical `/get-quotes` + `/compare`, remove the dead `NewsletterSignup`, and strip the legacy values from the `Lead.service` enum.

---

## Appendix A — Section-by-section detail

### Section 1 — Public-facing lead capture pages

| Page | Route | File | Fields | Endpoint | Login req? | `noindex`? | GDPR checkbox? | Privacy link? |
|---|---|---|---|---|---|---|---|---|
| AEO Report | `/aeo-report` | `app/aeo-report/page.tsx` + `AeoReportClient.tsx` | companyName, websiteUrl, category, customIndustry, city, email, name(opt), source(opt) | `POST {BACKEND}/api/public/aeo-report` | No | No (`index:true`, `page.tsx:30`) | **No** | **No** |
| Get Quotes | `/get-quotes` | `app/get-quotes/page.tsx` + `QuoteFlow.tsx` | category, postcode, dynamic Q&A, companyName, contactName, email, phone, postcode, message, timeline, **consent** | `{BACKEND}/api/ai-query` (match) → loop `POST {BACKEND}/api/vendor-leads` | No | No (`index:true`) | **Yes** (`QuoteFlow.tsx:1553`) | **Yes** (`:1559`) |
| Compare | `/compare` | `app/compare/page.tsx` + `CompareView.tsx` | companyName, contactName, email, phone, postcode, message, timeline, **consent** | `{BACKEND}/api/ai-query` → loop `POST {BACKEND}/api/vendor-leads` | No | metadata present, no explicit `noindex` | **Yes** | **Yes** (`CompareView.tsx:806–808`) |
| Vendor profile (slug) | `/suppliers/vendor/[slug]` | `app/suppliers/vendor/[slug]/page.tsx` → `ContactForm` | contactName, email, phone, message | `POST {BACKEND}/api/vendor-leads` | No | conditional `index` (`page.tsx:358–359`) | **No** | **No** |
| Vendor profile (id) | `/suppliers/profile/[id]` | `app/suppliers/profile/[id]/page.tsx` | — no live form — CTAs link to `/aeo-report` | n/a | No | no `robots` set | n/a | n/a |
| Contact | `/contact` | `app/contact/page.tsx` | **No form** — links + `mailto:scott.davies@tendorai.com` | n/a | No | No | n/a | n/a |
| Schema checker | `/tools/schema-checker` | `app/tools/schema-checker/` | URL only — `POST /api/tools/schema-checker` | Next route | No | — | n/a | n/a |
| AEO checklist | `/tools/aeo-checklist` | `app/tools/aeo-checklist/` | No lead capture / no email gate | n/a | No | — | n/a | n/a |
| Savings calculator | `/tools/savings-calculator` | `app/tools/savings-calculator/page.tsx` | Calls `{BACKEND}/api/ai-query` — no lead capture | n/a | No | — | n/a | n/a |
| Newsletter | (component only) | `app/components/landing/NewsletterSignup.tsx` | email → `POST {BACKEND}/api/public/subscribe` | — | No | — | **No** | **No** |

- `/quote`, `/get-quote`, `/request-quote`, `/leads`, `/enquiry` — **not found** as routes.
- City/vertical landing pages (`app/suppliers/solicitors/*`, `app/suppliers/accountants/*`, `app/ai-visibility-for-*`) — **no embedded lead forms found**.
- `NewsletterSignup` is **not rendered on any page** (only re-exported in `app/components/landing/index.ts`).

**Where leads go:** all live forms POST to the Express backend (`/api/vendor-leads` or `/api/public/aeo-report`). DB collection / email recipients are backend-side — **NOT AUDITABLE** here. The only frontend-side write path is the **orphan** route `app/api/public/quote-request/route.ts` → MongoDB `vendorleads` collection.

### Section 2 — Vendor profile page enquiry forms

**`app/suppliers/vendor/[slug]/page.tsx`**
- Enquiry CTA: **Yes.** "Contact {firm}" card at lines 1122–1126 renders `<ContactForm vendorId={vendor._id} vendorName={vendor.company} isPro={isPro} />`, **unconditionally** (no claim/tier gate).
- Form component: `app/components/vendor/ContactForm.tsx`. Fields: `contactName`, `email`, `phone`, `message`. Posts `POST {BACKEND}/api/vendor-leads` with `service: 'General Enquiry'` and `source.page = window.location.pathname`.
- Website link: outbound `<a target="_blank" rel="noopener noreferrer">` — **no click tracking**.
- Conversion mechanism: present and functional.

**`app/suppliers/profile/[id]/page.tsx`**
- Enquiry CTA: **No enquiry form present on this template.** `QuoteRequestForm.tsx` sits in the same directory but is **never imported** anywhere in `app/`. Every "Request a Quote" / "Check AI Visibility" button uses `getQuoteUrl` which is hard-coded to `'/aeo-report'` (`page.tsx:773`).
- Website link: outbound `<a target="_blank">` at lines 1178–1192 — **no click tracking**.
- Conversion mechanism: **effectively a dead-end** for contacting the firm — the visitor is diverted to the AEO report tool, not to the firm.

### Section 3 — Lead model & database

- **Backend canonical model — NOT AUDITABLE** (backend repo absent).
- **Frontend model present:** `lib/db/models/Lead.ts`. Mongoose schema, `collection: 'vendorleads'`.
  - Fields: `vendor` (ObjectId→Vendor, **required**, indexed), `service` (**required**, enum incl. legacy `Photocopiers/Telecoms/CCTV/IT Services`), `timeline` (enum, default `planning`), `budgetRange` (opt), `customer.{companyName, contactName, email, phone}` (**required**) + `customer.{postcode, message}` (opt), `requirements.{monthlyVolume, features, paperSize, colourRequired}` (opt — copier-shaped), `source.{page, referrer, utm.{source,medium,campaign}}`, `status` (enum `pending/contacted/quoted/won/lost/spam`, default `pending`), `notes`, `respondedAt`, `quotedAt`, `closedAt`, `closedReason`, `value`, `createdAt`/`updatedAt`.
  - Indexes: `{vendor:1, createdAt:-1}`, `{status:1}`, `{'customer.email':1}`, `{service:1}`, `{createdAt:-1}`, plus the inline `vendor` index.
  - Relationships: `vendor` ref only. **No** ref to User or Subscription.
  - Lead-source field: yes — `source.page` distinguishes (`'vendor-profile'`, `'get-quotes'`, `'compare'`, `'public-api'`).
- **DB record counts / source breakdown / recent-10 leads — NOT AUDITABLE** (no database access).

### Section 4 — Email notifications on lead creation

**NOT AUDITABLE.** `services/emailService.js` and `services/emailTemplates.js` are in `ai-procurement-backend`, which is not present. None of `sendNewLeadNotification`, `sendVendorContactRequest`, `sendQuoteAcceptedNotification`, `sendQuoteDeclinedNotification`, `sendAeoReportEmail`, `sendReviewRequestEmail` could be inspected. The previously-flagged `sendVendorContactRequest` XSS is **neither confirmed nor cleared** — it must be re-checked against the backend repo. Flagged under CRITICAL; not patched.

### Section 5 — Vendor dashboard leads tab

Two views exist, both client components, both reading the backend:

| | `/vendor-dashboard/leads` | `/vendor-dashboard/quotes` |
|---|---|---|
| File | `app/(dashboard)/vendor-dashboard/leads/page.tsx` | `app/(dashboard)/vendor-dashboard/quotes/page.tsx` |
| Fetch | `GET {BACKEND}/api/vendor-leads/vendor/me` | `GET {BACKEND}/api/vendor-leads/vendor/me?limit=100` |
| Per-lead display | name, status, service, message snippet, email, phone, time-ago | richer — counts, status workflow, notes, quote value |
| Status changes | "Mark Contacted" → `PATCH /api/vendor-leads/{id}/status` | full workflow `viewed/contacted/quoted/won/lost` → same PATCH, plus `note` + `quoteValue` |
| Reply from dashboard | No — contact details only | No — contact details + notes only |
| Free-tier behaviour | **Teaser** — name masked (`X•••••`), message truncated to 40 chars, contact hidden, "Upgrade to Pro to see full contact details" | tier-gated (`vendorTier` fetched; `TierGate` in use) |

Vendors **cannot reply** to a lead from the dashboard in either view — they only see contact details and update status.

### Section 6 — Legacy quote / comparison flow

- **Still live & accessible:** Yes — `/get-quotes` (`QuoteFlow.tsx`, 1647 lines) and `/compare` (`CompareView.tsx`). Both indexable.
- **Still functional:** Yes — both run category → questions → results → lead form, calling backend `/api/ai-query` for matching and `POST /api/vendor-leads` for submission.
- **Adapted for professional services:** **No.** `CATEGORIES` = Photocopiers, Telecoms, CCTV, IT (`QuoteFlow.tsx:106–110`). Question IDs `pc-volume`, `pc-colour`, `pc-a3`, `tel-*`, `cctv-*`. `CompareView` payload still sends `needsColour`, `needsA3`, `monthlyVolume`. **Still copier-shaped.**
- **Generating leads:** Would generate leads *if used* — both POST real leads to `/api/vendor-leads`. Whether they receive live traffic is **NOT AUDITABLE** (no analytics/DB access).
- `/api/ai-query` — backend endpoint, **NOT AUDITABLE**. No Next.js `ai-query` route exists in the frontend.
- **Verdict: legacy — candidate for removal or repurposing.**

### Section 7 — Routing & firm matching logic

- **No frontend matching logic.** Matching happens entirely in backend `POST /api/ai-query` (**NOT AUDITABLE**). The frontend only sends `{ category/service, location/postcode, answers }`.
- **Fan-out is one-to-many:** `QuoteFlow` submits a lead to up to 3 vendors (`vendors.slice(0,3)`); `CompareView` submits to the selected vendor or *all* compared vendors (`requestAll`). The same customer details reach multiple firms.
- **Tier (Pro vs Free) effect on routing — NOT AUDITABLE** (backend decision).
- A generic organic enquiry ("I need a conveyancing solicitor in Cardiff") has **no routing path at all** outside the legacy copier flows.

### Section 8 — Schema / structured data on conversion pages

- **`/aeo-report`** — only `FAQPage` JSON-LD (`page.tsx:35–64`). No `WebApplication`/`Service` schema, no `potentialAction`.
- **`/suppliers/vendor/[slug]`** — JSON-LD with `@type` from `schemaTypeMap` (`LegalService` for solicitors, else `LocalBusiness`, `page.tsx:430–435`), plus `BreadcrumbList` and conditional `FAQPage`. `potentialAction` is a `CommunicateAction` (`:632–637`) but its `target` is the **page URL**, not the enquiry endpoint — not a true actionable `ContactAction`.
- **`/suppliers/profile/[id]`** — JSON-LD `@type` `LegalService` (claimed solicitors) or `LocalBusiness` (`page.tsx:801`), plus `BreadcrumbList` and conditional `FAQPage`. `potentialAction` is an `AskAction` (`:867–872`) with `target` = page URL — again not wired to an enquiry endpoint.
- No page exposes the enquiry endpoint as a schema `target`.

### Section 9 — Analytics & tracking

- **GA4** installed globally (`app/layout.tsx:272–284`, id `G-0D3RVTRZY9` — comment says "replace with your real measurement ID", so possibly a placeholder).
- **No form-submission events** — `gtag(` appears nowhere outside `layout.tsx`. Lead submits are invisible in analytics.
- **No outbound click tracking** on firm website links on either profile template.
- **Page-view tracking only:** `ProfileViewTracker` (`POST /api/analytics/profile-view`) and `AiReferralTracker` (`POST /api/analytics/ai-referral`) fire on `/suppliers/vendor/[slug]`.
- **Source attribution on the Lead record:** Yes — every frontend lead payload includes `source.page`, `source.referrer`, and `source.utm`. `ContactForm` also captures live `document.referrer`.

### Section 10 — Security & GDPR

- **XSS — backend sanitisation NOT AUDITABLE.** Frontend forms send raw user strings. The orphan Next route `app/api/public/quote-request/route.ts` performs **only** `.trim()` + an email regex (lines 84–89) — no HTML sanitisation.
- **CSRF:** none. Public lead POSTs carry no CSRF token. The orphan Next route has no CSRF protection.
- **Rate limiting:** none in the frontend — `middleware.ts` only handles auth redirects and security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`). Backend rate limiting **NOT AUDITABLE**.
- **Consent checkbox:** `/get-quotes` ✅, `/compare` ✅, `/aeo-report` ❌, `ContactForm` (vendor profile) ❌, `NewsletterSignup` ❌.
- **Retention policy:** documented — `/privacy` states quote requests are retained **24 months**.
- **Privacy Policy references the lead mechanism:** Yes — `/privacy` has a "Quote Request Information" section and describes forwarding requests to firms (`app/privacy/page.tsx:52, 96, 134, 190`).

---

*End of audit. Frontend verified against source; backend and database sections require a follow-up pass against `ai-procurement-backend`.*
