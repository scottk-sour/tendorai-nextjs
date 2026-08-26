Scan the codebase for terminology violations defined in CLAUDE.md.

Search the entire repo (excluding `node_modules`, `.next`, `dist`, `.git`). Do not fix — audit and report only.

### User-facing copy
1. "vendor" / "Vendor" / "Vendors" in any user-facing string — JSX text, button labels, nav labels, headings, alt text, aria-label, title, metadata. Backend field names, route segments (`/vendor-login`, `/vendor-dashboard`), and internal variables are OK. Should be "firm" / "Firm" / "Firms".
2. "Vendor Login" anywhere in UI — should be "Firm Login".
3. "tendorai" lower-case or "Tendorai" mixed-case — should be "TendorAI" everywhere it appears as the brand name.
4. "Yadav format" / "yadav" — should be "TendorAI AEO Format".

### Pricing
5. Any price for Pro tier other than £299/month or £299/mo. Search for `$`, `£`, `/month`, `/mo`, `per month`.
6. Any crossed-out / strikethrough price markup: `line-through`, `<s>`, `<del>`, `text-decoration: line-through`.
7. Any user-facing reference to a "Starter" tier. (DB enums may still contain `starter` for backwards compat — that's allowed; flag UI references only.)

### Routes & nav
8. Any `href` or link to `/ai-visibility-checker` — should redirect to `/aeo-report`.
9. Any `href` or link to `/for-vendors` — that route is deleted; pricing lives at `/pricing`.
10. Any nav item literally labelled "Home" — the logo handles home.
11. Any nav item literally labelled "Pricing" as a standalone link.

### UK English
12. Common American spellings: "color", "optimize", "organization", "behavior", "center", "license" (as noun), "favor", "analyze", "specialty". Should be UK English (`colour`, `optimise`, `organisation`, `behaviour`, `centre`, `licence`, `favour`, `analyse`, `speciality`).

### Output format
For every match, report:
```
file:line — matched text — what it should be
```
End with a summary count by category. If a category is clean, say so explicitly.
