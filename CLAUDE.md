# TendorAI — Claude Code Context

## Project Overview
TendorAI is a UK AI Visibility Platform for regulated professional services firms — solicitors (SRA), accountants (ICAEW), mortgage advisers (FCA), and estate agents. Firms are pre-loaded from regulatory registers. They claim a free profile or upgrade to Pro at £299/month.

## Repo Structure
This is the Next.js frontend. The Express/Node.js backend is a separate repo. Never create Next.js API routes that duplicate backend functionality — check the backend first.

## Tech Stack
- Frontend: Next.js, TypeScript, Tailwind CSS, Prisma
- Hosting: Vercel
- Backend: Express/Node.js on Render (separate repo)
- Database: MongoDB
- Payments: Stripe
- Email: Resend

## Architecture Rules
- Commit content and documentation changes via feature branch + PR. Direct commits to main are reserved for trivial operational fixes only.
- ALWAYS run `npx tsc --noEmit` before committing and fix all errors first
- NEVER create a Next.js API route for data that comes from the Express backend
- NEVER duplicate pages that already exist — search before creating
- ALWAYS check that internal links point to routes that actually exist in the app directory
- ALWAYS match the existing design system — colours, fonts, component patterns
- ALWAYS use the /session-start command at the beginning of every new session

## Content production

All content produced by Claude Code in this repository — blog posts, landing pages, comparison pages, city pages, vertical pages, proof assets, FAQ content, schema markup, llms.txt updates — follows the TendorAI Content OS at /docs/content-os/tendorai-content-os.md.

This is the canonical, enforced framework. There is no v6, v7, v8, v9, or v9.1. Earlier versions are archived under /docs/content-os/archive/ and are not authoritative.

### Mandatory workflow

Before producing any content task:

1. Read the relevant sections of /docs/content-os/tendorai-content-os.md.
2. Read /docs/content-os/brief-template.md and fill it out as the first deliverable. No approved brief, no draft (Content OS Section 4).
3. Cite which OS sections govern the work being produced.
4. Apply the Content OS rules — passage discipline (Section 5), single-CTA discipline (Section 16), worked £ example on pillar / comparison / pricing pages (Section 17), timeframe table on pillar and how-to pages (Section 22), H2 Formula Bank (Section 18), vertical playbook (Section 34), and all 46 core rules (Section 40).
5. Run the pre-publish checklist at /docs/content-os/pre-publish-checklist.md before any commit that ships content.

### Highest-frequency sections to cite

When briefing or producing content, the most-referenced sections are:

- Section 4 — 14-point structured planning
- Section 5 — GEO and passage discipline
- Section 7 — Pre-publish verification checklist
- Section 11 — Content refresh protocol
- Section 16 — Conversion layer (single-CTA rule)
- Section 17 — Worked £ example rule
- Section 18 — H2 Formula Bank
- Section 19 — Tier 0 / Tier 0+ data hierarchy
- Section 21 — Revenue attribution with UTMs
- Section 22 — Timeframe table rule
- Section 25 — Intro citation stack (44.2% rule)
- Section 26 — Off-site authority engine
- Section 27 — Proof asset doctrine
- Section 28 — AI-Recommended vs Market Alternatives comparison framing
- Section 29 — Platform divergence per AI engine
- Section 30 — Query fan-out mapping
- Section 34 — Vertical signal playbooks (solicitors, accountants, mortgage advisers, estate agents)
- Section 40 — The 46 core rules

### Vertical compliance

Every content piece declares its vertical and applies the relevant playbook from Section 34. Verticals: solicitors (SRA), accountants (ICAEW / ACCA), mortgage advisers (FCA), estate agents (Propertymark / TPO). Cross-vertical content is permitted but must declare which verticals it crosses and apply each playbook to its respective section.

### Proof assets

Third-party citations of TendorAI follow the 48-Hour Citation Loop (Section 32). Capture within 6 hours, verify within 24, deploy within 48. Perplexity citations are priority-one and deploy within 24 hours.

### Forbidden behaviour

Claude Code does not:
- Produce content without first reading the Content OS section relevant to the task
- Skip the brief stage, the draft gate, or the pre-publish gate
- Reference v6, v7, v8, v9, or v9.1 — those are archived
- Use the deprecated terminology from before the brand fix (no "office equipment", "copiers", "telecoms", "CCTV" framing of TendorAI's product)
- Ship content with multiple CTAs, missing worked £ examples on pillar pages, missing timeframe tables on pillar / how-to pages, or missing vertical playbook compliance
- Produce content that fails the standalone passage extraction test (Section 5.9)

### Format definition

The canonical TendorAI content format is defined by the Content OS. Earlier shorthand names ("TendorAI AEO Format", "Yadav format") are retired. When format conformance is required, reference /docs/content-os/tendorai-content-os.md by section number.

## Key URLs & Routes
- Homepage: /
- Vendor signup: /vendor-signup
- Vendor login: /vendor-login
- Vendor dashboard: /vendor-dashboard
- Getting started: /vendor-dashboard/getting-started
- AEO report (free tool): /aeo-report
- AI visibility checker: DELETED — redirects to /aeo-report
- Schema checker: /tools/schema-checker
- AEO checklist: /tools/aeo-checklist
- Admin: /admin
- For vendors/firms: /for-vendors
- Pricing: /for-vendors#pricing (no separate /pricing page)

## API Routes
- Vendor profile: GET /api/vendors/profile — lives in Express backend (vendorUploadRoutes.js), NOT a Next.js route
- AEO audit: GET /api/aeo-audit/latest — Express backend
- Schema checker: POST /api/tools/schema-checker — Next.js API route (exception)

## Terminology — Critical
- Always use "firms" not "vendors" in user-facing copy
- Always use "Firm Login" not "Vendor Login" in UI
- Pro tier is £299/month — never display any other price without being explicitly told
- The product is called "TendorAI" — one word, capital T and AI
- Content production follows the **TendorAI Content OS** at `docs/content-os/tendorai-content-os.md` — the canonical format and process definition. Never reference legacy framework names (v6, v7, v8, v9, v9.1, "AEO Format", "Yadav format") in code, copy, or documentation.

## Known Issues to Never Repeat
- Push content and documentation changes to feature branches and merge via PR. Direct push to main is reserved for trivial operational fixes only and may be blocked by branch protection.
- Do not create /ai-visibility-checker — deleted, redirects to /aeo-report
- Do not add "Pricing" as a standalone nav item — lives at /for-vendors#pricing
- Do not add "Home" to the main Header navigation — the logo handles this. BreadcrumbList breadcrumbs MAY include "Home" as the first item per Google's structured data guidelines and SEO best practice.
- Do not use dark purple hero backgrounds on tool pages — match the light gradient style of /vendor-login
- Do not create duplicate pages for the same content at different URLs

## Commands Available
Run these with /command-name in Claude Code:

**Session & deploy**
- /session-start — run at the start of every session
- /pre-deploy — run before every push
- /typecheck-fix — run tsc and fix every error in priority order

**Audits**
- /route-audit — audit all internal links
- /nav-audit — verify nav matches the rules in CLAUDE.md
- /terminology-sweep — scan for forbidden terms ("vendor" in UI, wrong prices, dead routes)
- /new-page — checklist before creating any new page
- /page-audit — full SEO + GEO audit of any page

**Content & outreach**
- /aeo-report-email — cold outreach email from AEO data
- /cold-call-brief — cold call scripts
- /industry-blog — blog post in TendorAI AEO Format
- /schema-generator — JSON-LD schema for any page type
- /weekly-report — weekly AI visibility report for Pro clients

**Content-ops loop (Sat → Sun → Mon)**
- /db-query-blog — Saturday: Prisma query against the firms dataset, outputs Monday's data brief
- /prompt-test-batch — Sunday: 31-prompt test across ChatGPT/Perplexity/Claude/Gemini, week-over-week report
- /quotable-extractor — extracts 8-15 word AI-citable phrases with attribution from any source

## Before Starting Any Task
1. Run /session-start
2. Read this file in full
3. Search for existing files before creating new ones
4. Check that any route you link to actually exists in the app directory
5. Plan all file changes before touching anything

## Before Committing
1. Run /pre-deploy
2. Run `npx tsc --noEmit` — fix all errors
3. Verify you are on main branch
4. Write a descriptive commit message
5. Push to main
