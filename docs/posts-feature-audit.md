# Posts Feature Audit — v7 Gap Analysis

**Date:** 2026-04-23
**Scope:** `/vendor-dashboard/posts`, public post render at `/posts/[slug]`, schema injection on `/suppliers/vendor/[slug]`.
**Mode:** Read-only audit. No code changed.

---

## Pending

This audit covers the frontend repo only. Backend findings — generator prompt verbatim, Mongo model enforcement, backend body cap, existing post-publish jobs — will be added in a follow-up commit once the backend session completes its own audit.

---

## 1. Feature inventory

### Files located

| File | Purpose |
|---|---|
| `app/(dashboard)/vendor-dashboard/posts/page.tsx` (887 LOC) | Single-page editor + list. Two-column: AI writer + editor / post list. |
| `app/posts/[slug]/page.tsx` (219 LOC) | Public post render. `revalidate = 3600`. Emits `BlogPosting` + `BreadcrumbList` JSON-LD. |
| `app/suppliers/vendor/[slug]/page.tsx:252-273` | `getVendorPosts()` — last 3 published inlined as `hasPart: BlogPosting` on the vendor's primary JSON-LD. |
| `app/suppliers/profile/[id]/page.tsx` | Older profile route — does not inject post JSON-LD. |
| `app/(dashboard)/admin/posts/page.tsx` | Admin listing + publish/unpublish toggle. Not a moderation gate. |
| `lib/db/models/VendorPost.ts` | Frontend Mongoose model. |

### Mongo fields (frontend model)

```
vendor       ObjectId  ref 'Vendor'
title        String    maxlength 200
body         String    maxlength 5000     ← UI cap is 10000 — drift
category     enum      news|product|offer|guide|update
tags         [String]
status       enum      published|hidden   ← UI also sends 'draft'
slug         String    unique
isDemoVendor Boolean
createdAt / updatedAt
```

The page saves `aiGenerated`, `linkedInText`, `facebookText`, `topic`, `stats` and uses `status: 'draft'`. Backend model is a superset; the Next.js reader only surfaces the fields above.

### API endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET`  | `/api/public/vendors/:vendorId/posts?limit=50` | List |
| `GET`  | `/api/vendors/profile` | vendorType / city / practiceAreas / tier |
| `POST` | `/api/vendors/:vendorId/posts/generate` | **AI generation** — accepts `{topic, stats, vendorType}`, returns `{title, body, linkedInText, facebookText}` in **one call**. |
| `POST`/`PUT` | `/api/vendors/:vendorId/posts[/:id]` | Create/update. |
| `DELETE` | `/api/vendors/:vendorId/posts/:id` | Hard delete. |

No Next.js API routes for posts. All the Express backend.

### Generator prompt

**Not in this repo.** Lives on the Express backend. LinkedIn + Facebook variants are returned by the *same* call as the blog body — not separate reformat endpoints. Whether the backend runs one big prompt or three sequential calls is unknown from here.

### UI flow

1. Load `/vendor-dashboard/posts`. Tier check (`hasTierAccess`). Pro = unlimited, Starter = 2/month, Free = upsell.
2. AI writer: **topic** (required) + **stats** (optional) textareas.
3. Optional "Content ideas" accordion. 3 category tabs × 3-4 ideas, per vendorType. **Hardcoded in `CONTENT_IDEAS`** (lines 54-145), with `[city]`, `[practice area]`, `[X]` substituted client-side. Not data-driven, not LLM-generated.
4. **Generate Post** → ~30s → editor pre-filled with blog + LinkedIn + Facebook variants on three tabs.
5. Category select. **Save as Draft** or **Publish**. Publish = instantly live. No admin review.
6. Post-save "Share this post" row: copy-to-clipboard buttons for LinkedIn + Facebook. No OAuth, manual paste.
7. Post list: title / category pill / AI pill / status pill / 120-char preview / View / Edit / Delete.

---

## 2. v7 scorecard

| # | v7 requirement | State | Notes |
|---|---|---|---|
| 1 | Plan-first (12-point plan) | ✗ | Generator takes `{topic, stats, vendorType}` only. No plan step, no stored plan field. |
| 2 | Intro citation stack (3-5 extractable in first 200 words) | ✗ | No UI affordance. Backend prompt not inspected — assume absent. |
| 3 | Statistical density (every H2 opens with data) | ✗ | Not enforced. `stats` textarea is one blob, not per-H2. |
| 4 | Passage discipline (1 idea/para, 2-4 sentences, no cross-refs) | ✗ | Not enforced. |
| 5 | Tier 0 primary data elevated | ⚠️ | Content-idea copy asks for primary data ("your actual transaction count"). Optional `stats` textarea is the only slot. No structured primary-data field. |
| 6 | FAQ block after main content, before single CTA | ✗ | `body` is a freeform markdown blob. Public page renders body + generic CTA card — no enforced FAQ block. |
| 7 | Schema: Article + Person + BreadcrumbList; NOT FAQPage | ⚠️ | `posts/[slug]/page.tsx:80-99` emits `BlogPosting` (Article subtype — OK) + `BreadcrumbList`. Author is `Organization` **not `Person`** — E-E-A-T gap. `suppliers/vendor/[slug]/page.tsx:682` emits `FAQPage` for vendor FAQs — against v7 preference. |
| 8 | Worked £ example on pillar content | ✗ | No pillar/post distinction. |
| 9 | Word count targets (1000-1800 blog) | ✗ | `body` maxlength 5000 chars (~800 words); UI `maxLength={10000}`. Schema cap truncates v7-compliant posts if the backend shares it. Counter shows `/10000` — misleading. |
| 10 | Named entity density | ✗ | Not enforced. |
| 11 | Definition blocks (1-2 standalone-citable) | ✗ | Not enforced. |
| 12 | Recency signals ("Last updated" visible, year in title) | ⚠️ | `datePublished` + `dateModified` in JSON-LD. Visible UI shows `createdAt` only (line 153) — no "Last updated" line, no year-in-title rule. Some content ideas include "in 2026" — partial. |
| 13 | UK English | ⚠️ | `CONTENT_IDEAS` uses UK spelling. Generator prompt not inspectable. |
| 14 | Off-site amplification (distribution plan, 14 days) | ⚠️ | LinkedIn + Facebook generated and copy-paste ready. Nothing for Reddit / Medium / industry forums. No distribution tracking, no 14-day reminder. Manual. |
| 15 | Statistical prompt testing (N=10/platform 14d post-publish, SMV) | ✗ | No post-publish tests, no SMV field, no scheduled job. |
| 16 | Platform-divergence plays (per-LLM) | ✗ | Off-site variants exist (LinkedIn / Facebook). No per-LLM on-site plays. |

**Count:** 0 ✓, 5 ⚠️, 11 ✗.

---

## 3. Architecture assessment

- **Prompt-only isn't enough.** #1 (plan-first), #14 (amplification tracking), #15 (N=10 testing), #7 (Person author) all need new UI, new Mongo fields, or frontend changes. Prompt upgrades move #2-4, #10, #11, #13.
- **Post model needs new fields** (both Mongo copies): `plan` (12-point structured), `primaryData` (structured), `amplificationPlan` (checklist with `dispatchedAt`), `postPublishTests` (array of `{platform, runAt, mentioned, smv}`), `smvScore`.
- **Schema emits `BlogPosting` + `BreadcrumbList`.** Missing v7 Person author. `Article` vs `BlogPosting` is fine (BlogPosting IS an Article subtype). `FAQPage` on the vendor profile should be dropped.
- **LinkedIn/Facebook = one LLM call, not template.** `/posts/generate` returns all three variants. Output is three independent text blobs; each editable post-generation.
- **Publishing flow.** Vendor → Publish → instantly live. No draft-review, no admin approval. Frontend enum missing `draft`; silent backend tolerance holds it together.

---

## 4. Quick wins vs deep rebuilds

**Prompt-only (backend session, no frontend change):** v7 #2 intro stack, #3 statistical density, #4 passage discipline, #10 named entity, #11 definition blocks, #13 UK English, #12 year-in-title. Raise body cap 5000 → 15000 to unblock #9.

**UI additions (frontend, 1-2 sessions each):** #1 plan-preview step; #6 FAQ + single-CTA block structure on public render; #12 visible "Last updated" line; #14 amplification checklist panel post-publish.

**Backend additions:** Post model fields (plan, primaryData, amplificationPlan, postPublishTests, smvScore); plan-generation endpoint; scheduled N=10 testing job; SMV service. **Reusable infrastructure:** the AEO free-report `platformResults` runner (per-platform query across Perplexity/ChatGPT/Claude/Gemini/Grok/Meta) + `retry-platform` endpoint already do most of what N=10 testing needs.

**Frontend schema change (trivial):** `posts/[slug]/page.tsx:85-91` swap `Organization` author → `{ '@type': 'Person', name: vendor.principalName }`, keep Organization as `publisher`. Drop the `FAQPage` block at `suppliers/vendor/[slug]/page.tsx:682`.

---

## 5. Unknowns and risks

- **Active Pro users today.** Unknown from this repo. Any schema change affects live users.
- **Version-lock.** Published posts re-render from Mongo on every ISR rebuild (`revalidate = 3600`). Schema and template changes apply **retroactively** to every existing post. No post-level version pinning.
- **Post-publish analytics.** None visible in frontend. A separate collection may exist — flag as unknown.
- **AEO-platformQuery reuse.** Endpoint `/api/public/aeo-report/:id/retry-platform` is the clearest reuse point for N=10 testing. A parallel `/api/vendor-posts/:id/platform-test` fits the pattern.
- **Body cap conflict.** 5000 chars (model) vs 10000 (UI counter). Either the backend enforces 5000 (UI lies about space) or backend is looser (frontend model misdescribes). Reconcile before any word-count policy ships.
- **`status: 'draft'`.** Frontend enum is `published|hidden`; UI saves `draft`. Silent backend tolerance is load-bearing.

---

## 6. Proposed phasing

*(1 session ≈ 3h focused work. Ordered by leverage ÷ effort.)*

**Phase 1 — Schema fix on public post + visible updated date (1 session, frontend-only).**
Swap `Organization` author → `Person` (needs a `principalName` on Vendor — check model first). Drop `FAQPage` from vendor profile. Add visible "Last updated" line.
*Files:* `app/posts/[slug]/page.tsx`, `app/suppliers/vendor/[slug]/page.tsx`.
*Pro vendors see:* published posts gain corrected schema + visible updated-at line. No dashboard change.

**Phase 2 — Generator prompt upgrade (1 session, backend-only).**
Rewrites prompt to enforce v7 #2, #3, #4, #10, #11, #13, and word-count target. Raises body cap in both Mongo models.
*Files:* backend `services/postGenerator.js`, `lib/db/models/VendorPost.ts`.
*Pro vendors see:* better drafts immediately. No UI change.

**Phase 3 — Body structure + FAQ block (1-2 sessions, full-stack).**
v7 #6. Split body into intro / H2 sections / FAQ / single CTA. Either a structured `sections` array in the model or a parser on read.
*Files:* backend prompt + model, `app/posts/[slug]/page.tsx`.
*Depends on:* Phase 2.
*Pro vendors see:* cleaner post layout, explicit FAQ accordion, single CTA.

**Phase 4 — Plan-first generation (2 sessions, full-stack).**
v7 #1. New UI step between "Generate" and the draft. New `plan` Mongo field. New endpoint `POST /api/vendors/:id/posts/plan`. Vendor approves plan before drafting.
*Files:* backend routes + model, new multi-step `/vendor-dashboard/posts/new`.
*Depends on:* Phase 2.
*Pro vendors see:* two-step flow (plan → draft) replacing the one-shot generator.

**Phase 5 — Amplification tracker (1-2 sessions, full-stack).**
v7 #14. Post-publish checklist (LinkedIn / Facebook / Reddit / Medium / industry forum / email), 14-day countdown, per-channel `dispatchedAt`. Optional email nudges at days 0/3/7/13.
*Files:* backend routes + model + scheduled job, new `AmplificationPanel` component.
*Depends on:* none — ships alongside any of 1-4.
*Pro vendors see:* "Your distribution plan" card after each publish.

**Phase 6 — N=10 post-publish testing + SMV dashboard (2-3 sessions, backend-heavy).**
v7 #15, #16. Scheduled job runs N=10 queries per platform 14 days post-publish against each post URL. Stores `postPublishTests` + `smvScore`. Reuses existing AEO `platformResults` infrastructure.
*Files:* backend `services/platformQuery.js` extension, scheduled job, `/api/vendor-posts/:id/platform-test` endpoint, SMV dashboard component, model fields.
*Depends on:* ideally after 1-5; not blocking.
*Pro vendors see:* per-post SMV + platform-by-platform citation data 14 days post-publish.

**Total:** ~9 sessions end-to-end. Phases 1 + 2 ship ~40% of v7 gaps in two sessions.

---

*End of audit.*
