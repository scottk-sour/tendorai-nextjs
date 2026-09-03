Audit phase — read-only. Starting from current main.

Checked route existence for /research, /blog, /resources
Noted on the audit doc — the content you referenced didn't come through, so there's nothing to write yet. Continuing the audit meanwhile.


Ran 2 commands
This is the key structural finding. Quantifying the overlap precisely.

Quantify the resources/blog duplication
Systematic — 21 articles, not one. Now canonical metadata, sitemap, and the research asset inventory.


Ran 7 commands
Root cause found for the header — and it isn't a DOM or CSS defect. Confirming the structure.


Ran 3 commands
Audit complete. Read-only — nothing edited, no branch, no commit.

First: the audit-doc request
Your mid-turn message says "with the content I paste below" but no content followed. I haven't created the branch or the file — an empty docs/audits/website-audit-2026-09-03.md would be worse than none. Paste the content and I'll do it as a standalone change: branch docs/website-audit-2026-09-03, that one file, verbatim, PR against main, no merge.

Audit — base main = bd44b3b
1 · /research — 404
Why. No app/research/page.tsx. The directory exists but contains only two leaf routes:

app/research/solicitors-july-2026/deviations/page.tsx
app/research/solicitors-august-2026/deviations/page.tsx
Next.js serves no index for a segment without page.tsx, so /research 404s while its children resolve. lib/sitemapUrls.ts:33 lists /resources in the static route table; /research is absent, so nothing references the missing page.

Assets that already exist, all sourced from the repo:

Class	Asset	Current URL
Flagship	TAI-R-2026-001 — "The UK AI Visibility Report for Solicitors — July 2026"	/resources/ai-visibility-report-solicitors-july-2026
Flagship	TAI-R-2026-002 — "Most UK Solicitors Are Never Recommended by AI. We Measured How Many."	/resources/ai-visibility-report-solicitors-august-2026
Tested-firm	"We Asked AI to Recommend 216 UK Solicitors. It Named 16."	/resources/ai-recommends-uk-solicitors-study
Tested-firm	Accountants in 10 Major UK Cities	/resources/ai-recommends-accountants-uk-cities
Tested-firm	Mortgage Advisers in 10 Major UK Cities	/resources/ai-recommends-mortgage-advisors-uk-cities
Tested-firm	Estate Agents in 10 Major UK Cities	/resources/ai-recommends-estate-agents-uk-cities
Deviation log	July 2026 deviations	/research/solicitors-july-2026/deviations
Deviation log	August 2026 deviations	/research/solicitors-august-2026/deviations
Dataset	prompts.csv, panel.csv, domain-classification.csv	/research/solicitors-july-2026/*.csv
Note the solicitors tested-firm study carries category: 'Legal', not 'Research' — so a category filter alone won't collect all four. The hub needs an explicit list.

Also worth flagging: cardiff-solicitors-ai-visibility-may-2026 ("36 Firms Tested, Median Score 40/100") is a fifth tested-firm study by nature. Your brief says four. I've listed the four that share the "We Asked AI to Recommend…" form; tell me if Cardiff belongs in that section.

2 · /blog — 404
Why. No app/blog/page.tsx. Under app/blog/ there are 46 static article directories plus app/blog/[slug]/. Articles are live; only the index is missing.

An index does exist elsewhere: /resources (app/resources/page.tsx). And app/components/Footer.tsx:18 already maps "Blog" → /resources — the footer treats /resources as the blog index today.

"Back to Blog" links point at the 404. app/blog/[slug]/page.tsx:190 plus at least three static articles link href="/blog". Every one currently lands on a 404.

Recommendation — make it an index, not a redirect. Redirecting /blog → /resources would work, but 46 live /blog/* articles with breadcrumbs and "Back to Blog" links imply a real section. A redirect sends every one of those through a hop and leaves /blog/* with no parent. An index is the smallest change that makes existing links resolve correctly.

3 · Report duplication — systematic, not isolated
This is the finding that changes the shape of the job.

All 21 inline articles are prerendered at both /resources/{slug} and /blog/{slug}. The August report is not a special case — it's one of 21. The July report (TAI-R-2026-001) is another.

Worse, neither route declares dynamicParams = false, so Next's default allows any slug in articles.ts to render on demand at either path.

Competing self-canonicals confirmed:

app/blog/[slug]/page.tsx:36,55 — canonical = https://www.tendorai.com/blog/${slug}
app/resources/[slug]/page.tsx:28,57-59 — canonical = https://www.tendorai.com/resources/${slug}
Each version declares itself canonical. That is the defect, and it applies to all 21.

Good news on sitemap and links. lib/sitemapUrls.ts:91-101 emits /resources/{slug} when href is unset, and line 187 already dedupes /blog/ collisions — so only the /resources URL is in the sitemap. And there are zero internal links to /blog/ai-visibility-report-solicitors-august-2026. The /blog twins are unlinked, unsitemapped orphans that nonetheless self-canonicalise.

Implication for the fix. Correcting the August report alone would leave 20 identical defects. The clean fix is one line in app/blog/[slug]/page.tsx — drop !a.href || from generateStaticParams so /blog/[slug] serves only genuinely blog-homed articles, plus dynamicParams = false on both routes. That resolves all 21 at once and changes no published /resources/ URL. It does remove 21 /blog/* URLs, which is an architecture-wide routing change, so per your instruction I'm reporting it rather than implementing it. I need your approval on scope: August only, or all 21.

4 · Header — not the defect described. Materially different
There is no nesting, no shared parent link, no overlap, no absolute positioning, no shared handler. Desktop (:110-122) and mobile (:228-240) both render navLinks.map into separate sibling <Link> elements with ordinary padding.

The actual cause is two defects in the data, app/components/Header.tsx:77-83:

Both items point to the same destination. They are independent links that go to the identical page — which is why clicking either "activates the other's destination".
Duplicate React key. Both render with key={link.href}, so the two entries collide in reconciliation — a React key warning, and isActive() highlights both simultaneously. That is almost certainly what reads as "one clickable area".
This cannot be fixed without a decision I can't make from the repo: what should "For Firms" point to? /for-vendors was retired and 308s to /pricing (next.config.js:23), and /pricing is already its own nav item — so "For Firms" may be a redundant item rather than a mis-targeted one.

Per your separate-PR rule this goes to PR 2, and it's blocked on that destination.

Proposed split
PR 1 — research/site architecture: create /research hub; create /blog index; add Research to header and footer; canonicalise the August report. Scope question: all 21 duplicates or August alone.

PR 2 — header: the duplicate-href and duplicate-key fix, once you tell me where "For Firms" should go, or whether to remove it.

Stopping here for approval, as instructed. Two answers needed: duplication scope, and the "For Firms" destination — plus the audit-doc content when you have it.