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
- ALWAYS commit and push to main, never to feature branches unless explicitly told otherwise
- ALWAYS run `npx tsc --noEmit` before committing and fix all errors first
- NEVER create a Next.js API route for data that comes from the Express backend
- NEVER duplicate pages that already exist — search before creating
- ALWAYS check that internal links point to routes that actually exist in the app directory
- ALWAYS match the existing design system — colours, fonts, component patterns
- ALWAYS use the /session-start command at the beginning of every new session

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
- Blog/content format is called "TendorAI AEO Format" — never "Yadav format"

## Known Issues to Never Repeat
- Do not push to feature branches — always push to main
- Do not create /ai-visibility-checker — deleted, redirects to /aeo-report
- Do not add "Pricing" as a standalone nav item — lives at /for-vendors#pricing
- Do not add "Home" to the nav — the logo handles this
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
