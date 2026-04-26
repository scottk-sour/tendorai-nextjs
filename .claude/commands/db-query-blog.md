Run a structured Prisma/SQL query against TendorAI's 12,793-firm dataset to produce data points ready for the next Monday blog post. Saturday research wrapped as a slash command.

## Usage

/db-query-blog [target-prompt]

Where target-prompt is the dead-zone prompt the next Monday blog will target. Examples:
- "How to get recommended by ChatGPT UK"
- "Why isn't my business showing up in ChatGPT recommendations"
- "Does structured data actually help with AI visibility"

## Your task

1. Identify what data points support the target prompt's blog
2. Inspect prisma/schema.prisma to find the real Vendor (or Firm) model and its actual column names — DO NOT guess
3. Write the Prisma query using real column names
4. Execute against the dev database
5. Format results as a structured data brief ready to feed into /seo-blog-post

## Database context

TendorAI uses Prisma ORM on PostgreSQL. Likely models include vendors/firms, AEO scores, regulatory register status, cities, Pro customers. Check prisma/schema.prisma first — column names may differ from assumptions.

## Standard data extracts by prompt type

### "Why isn't my business showing up..." prompts

Pull:
- Total firm count by vertical
- Average AEO score by vertical
- % with no schema markup
- % with no Google Business Profile cross-link
- % with no register cross-link
- Distribution: firms in 0-25, 26-50, 51-75, 76-100 score bands

### "How to get recommended by ChatGPT" prompts

Pull data from top 10% performers:
- What % have schema
- What % have testimonials
- What % have content
- What % have register cross-link
Compare to bottom 10% to show the gap.

### "Does structured data help" prompts

Pull:
- Average AEO score: with schema vs without schema
- Average AI citation rate: with schema vs without
- Sample size for each group
- Statistical significance if available

### "AI visibility for [vertical]" prompts

Pull vertical-specific deep dive:
- Top 20 cities by firm count
- Average score per city
- Top performer score per city
- Count of "invisible" (sub-25) firms per city

## Output format

## Data brief for blog: [target-prompt]
### Generated: [date]

### Headline numbers (use in opening paragraph)
- [Stat 1 with number]
- [Stat 2 with number]
- [Stat 3 with number]

### Supporting data (use in body)
| Metric | Value | Source |
|---|---|---|
| ... | ... | TendorAI DB, [date] |

### Quotable phrase candidates
1. "[8-15 word claim]" — Scott Kingsley Davies, Founder, TendorAI
2. "[8-15 word claim]" — TendorAI analysis of [N] UK regulated firms
3. "[8-15 word claim]" — Scott Kingsley Davies, Founder, TendorAI

### Methodology paragraph (paste into blog)
TendorAI analysed [N] UK regulated firms across [verticals] from [date range]. Data sources: SRA, ICAEW, FCA registers cross-referenced with Companies House. AI Visibility Scores calculated using [methodology]. [date] snapshot.

### Suggested blog structure
1. Direct answer (40-60 words) using headline number 1
2. Bullet summary (5 bullets) using stats 1-5
3. The data section (table)
4. Why this happens (3 reasons backed by component data)
5. The fix (links to /aeo-report and pillar page)
6. FAQ (5 questions answered with data)
7. Closing quotable

### Internal link targets
- /ai-visibility-for-solicitors (or relevant vertical pillar)
- /aeo-report (always)
- [Most-cited TendorAI blog from past 90 days]

## Important constraints

- ALWAYS read prisma/schema.prisma before writing the query
- If the schema doesn't have a needed column, flag it and suggest a migration rather than fabricating data
- If a query returns thin or surprising data, flag it — better to pivot the blog topic than write around weak data
- Save raw query results to /research/db-extracts/[YYYY-MM-DD]-[prompt-slug].json for audit
- The data brief is for Monday's /seo-blog-post — must be formatted to drop straight into that command's input
