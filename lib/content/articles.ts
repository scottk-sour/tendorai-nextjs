export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Photocopiers' | 'Telecoms' | 'CCTV' | 'IT' | 'Business Tips' | 'AI & Visibility' | 'AI Visibility' | 'Research' | 'Legal' | 'Tools' | 'How-To' | 'Financial';
  author?: string;
  readTime: number;
  publishedDate: string;
  content: string;
  href?: string;
}

export const articles: Article[] = [
  {
    slug: 'ai-visibility-for-solicitors-uk',
    title: 'AI Visibility for Solicitors: How to Get Your Law Firm Recommended by AI',
    excerpt: 'Most UK solicitors are invisible to ChatGPT, Perplexity and Gemini. Here\'s exactly how to fix it — the 6 steps that get your law firm recommended by AI assistants.',
    category: 'Legal',
    author: 'Scott Davies',
    readTime: 12,
    publishedDate: '2026-03-11',
    content: `Someone in your city just asked ChatGPT to recommend a solicitor for their conveyancing purchase. The AI named two firms, explained why they were trustworthy, and gave contact details. Your firm wasn't one of them.

That enquiry is gone. You'll never know it happened.

**AI assistants are now the first place many people turn when choosing a solicitor.** Instead of browsing ten Google results and comparing websites, they ask ChatGPT, Perplexity, or Gemini for a direct recommendation — and they contact whoever the AI suggests.

Most solicitors aren't visible in these answers. Not because they're bad at what they do, but because AI systems can't verify their credentials quickly enough to recommend them with confidence.

This guide explains exactly what AI visibility means for solicitors, why most UK law firms are currently invisible, and the specific steps that change it.

---

## What Is AI Visibility for Solicitors?

AI visibility is whether your law firm appears when someone asks an AI assistant to recommend a solicitor. It's the difference between being named in a ChatGPT answer and being skipped entirely.

**Traditional search visibility** means ranking on Google's first page. **AI visibility** means being the firm an AI assistant actively recommends by name — with a reason why.

When TendorAI scanned over 12,793 UK professional services firms, fewer than 12% were being recommended by any AI platform. For solicitors specifically, the number was even lower. The firms that do appear share a common set of signals that AI systems can verify quickly.

AI visibility isn't a replacement for SEO. It's a separate channel that requires different infrastructure — and right now, most solicitors have none of it built.

---

## How AI Assistants Choose Which Solicitors to Recommend

ChatGPT, Perplexity, and Gemini don't rank solicitors the way Google does. They cross-reference multiple trusted sources before naming a firm. For solicitors, this comes down to four layers of signals.

### SRA Verification

The **Solicitors Regulation Authority register** is the single most important credibility signal for UK solicitors in AI search. AI systems treat the SRA register as ground truth — if your firm can't be verified through SRA data, you're unlikely to be recommended for any regulated legal query.

Your SRA listing needs to match your website exactly: firm name, office address, practising status, and authorised services. Mismatches between your SRA profile and your website give AI systems a reason to skip you.

### Structured Data and Schema Markup

AI assistants parse your website for **structured data** (schema markup) before reading your content. LegalService and LocalBusiness schema tells AI exactly what services you offer, where you're based, and what credentials you hold.

Without schema markup, AI has to interpret your website manually. It often gets it wrong — or skips you for a firm whose data is easier to extract.

### Review Signals

Reviews on **ReviewSolicitors** and Google carry significant weight. AI systems favour firms with verified reviews that mention specific practice areas and locations.

A solicitor with 30 reviews mentioning "conveyancing in Bristol" will appear for that query ahead of a firm with 100 generic five-star ratings. Context matters more than volume.

### Directory and Citation Consistency

AI cross-references your details across directories, your website, your SRA listing, and your Google Business Profile. **If your firm name, address, or phone number is inconsistent across these sources, AI confidence drops** — and it recommends someone else.

Over 40% of UK solicitor firms have at least one inconsistency between their SRA listing and their website. Each one is a reason for AI to choose a competitor.

---

## AI Visibility vs SEO for Law Firms

| | Traditional SEO | AI Visibility |
|---|---|---|
| **Goal** | Rank on Google's first page | Get named inside AI-generated answers |
| **User behaviour** | Browses 5-10 results, compares websites | Contacts the 1-2 firms AI recommends |
| **Ranking factors** | Backlinks, domain authority, content | Structured data, regulatory verification, reviews |
| **Key platforms** | Google Search | ChatGPT, Perplexity, Gemini, Claude |
| **Outcome** | Website traffic | Direct enquiries from AI recommendations |
| **Measurement** | Google Search Console | AI mention tracking |

Both matter. But **87% of solicitors have invested in SEO while having zero AI visibility infrastructure.** They're competing on one channel and invisible on the other.

The firms winning right now are doing both — and the AI visibility work often improves SEO performance as well, because structured data and consistent citations benefit both channels.

---

## Why Most UK Solicitors Are Invisible to AI

When TendorAI tested AI recommendations for solicitors across [10 major UK cities](/resources/ai-recommends-solicitors-uk-cities), the results were stark. In most cities, AI assistants recommended the same 2-3 firms repeatedly while hundreds of qualified solicitors were completely absent.

Here's why.

**1. No schema markup on their website.** Over 70% of UK solicitor websites have no structured data. Without LegalService or LocalBusiness schema, AI systems can't extract your services, location, or credentials reliably.

**2. SRA listing doesn't match their website.** Outdated trading names, old office addresses, or missing website URLs on the SRA register create verification failures. AI systems won't recommend a firm they can't confirm is active and regulated.

**3. Thin or generic review profiles.** Firms with fewer than 10 reviews — or reviews that don't mention specific practice areas — get deprioritised. AI needs contextual evidence that you handle the type of work the user is asking about.

**4. Incomplete Google Business Profile.** Missing practice areas, no service descriptions, or an unverified GBP means AI can't confidently match you to local queries. Gemini in particular relies heavily on GBP data.

---

## How to Improve AI Visibility for Your Law Firm (6 Steps)

### 1. Verify Your SRA Profile

Check your listing at sra.org.uk. Confirm your trading name, office address, website URL, and authorised practice areas are current and consistent with everything else online.

Your SRA number should appear on your website's homepage, about page, and contact page — not just buried in footer text. AI systems look for this as a primary verification signal.

### 2. Add Schema Markup to Your Website

Implement **LegalService** and **LocalBusiness** JSON-LD schema on your homepage and every service page. Include your SRA number under hasCredential, your practice areas under knowsAbout, and your office locations with full address markup.

This is the single highest-impact technical change most solicitors can make. It takes a developer 2-3 hours and immediately makes your site readable to AI.

### 3. Complete Your Google Business Profile

Every field matters. Add all practice areas as services. Write a business description that includes your location and specialisms. Upload photos of your office. Respond to reviews.

**Gemini pulls directly from GBP data.** An incomplete profile means you're invisible on one of the four major AI platforms.

### 4. Build Reviews on ReviewSolicitors

ReviewSolicitors is the platform AI systems cite most frequently for UK solicitor recommendations. Aim for **20+ reviews** as your baseline, with each review mentioning the practice area and location.

After every completed matter, send your client a direct link. A brief note — "mentioning the type of legal work and your location helps other clients find us" — is enough. Most clients are happy to help.

### 5. Publish FAQ Content That AI Can Cite

Write content that answers the exact questions people ask AI assistants. Not keyword-stuffed blog posts — direct, practical answers to real queries.

Examples that work well for solicitors:
- "How much does a solicitor charge for conveyancing in [your city]?"
- "What should I look for when choosing a divorce solicitor?"
- "How long does probate take in England and Wales?"

**The first paragraph of each piece must directly answer the question.** AI extracts opening content for citations — if your answer is buried in paragraph four, it won't be cited.

### 6. Track Your AI Mentions Weekly

Run your key queries in ChatGPT, Perplexity, and Gemini monthly at minimum. Record which firms appear, which sources get cited, and whether your firm is mentioned.

If AI describes your practice areas or location incorrectly, that tells you exactly which part of your digital infrastructure needs fixing. Treat it like a pipeline review — 15 minutes a month shows whether you're gaining ground or losing it.

---

## How TendorAI Helps Solicitors Get Visible to AI

Most solicitors don't realise they're invisible to AI until they check. By then, competitors have already claimed the recommendations in their area.

**TendorAI scans your firm across six AI platforms** — ChatGPT, Perplexity, Gemini, Claude, Grok, and Meta AI — and shows you exactly where you stand. You see whether AI recommends your firm, which competitors appear instead, and the specific gaps holding you back.

Because TendorAI profiles are built from **live SRA register data**, your regulatory information is already structured in the format AI systems use to verify solicitors. This is the single biggest factor in whether law firms get recommended or skipped.

**How it works:**

1. **Scan** — TendorAI checks your firm across all 6 AI platforms in 60 seconds
2. **Report** — You see exactly where you appear, where you don't, and why
3. **Fix** — Actionable recommendations ranked by impact: schema, listings, reviews, content
4. **Track** — Weekly AI mention scanning shows whether your visibility is improving

**Pricing:**
- **Free** — Instant AI visibility report, basic profile
- **Starter £149/mo** — Monthly AEO reports, pricing visible to AI
- **Pro £299/mo** — Weekly reports, schema installation, AI mention tracking, Verified badge

The solicitors doing this now are the ones who'll own AI recommendations in their area. The window is still open — but it's closing fast.

[Run your free AI Visibility Report](https://www.tendorai.com)

---

## Frequently Asked Questions

### How long does it take for a solicitor to appear in AI recommendations?
Most firms that implement all six steps see improvement within four to eight weeks. The fastest wins come from fixing SRA profile inconsistencies and adding schema markup — these are the signals AI checks first for regulated legal queries.

### Does my SRA registration number affect AI visibility?
Yes. For regulated legal services, AI assistants treat the SRA register as ground truth. A solicitor whose SRA number is visible on their website and consistent with their register entry is significantly more likely to be recommended than one where that information is missing or mismatched.

### What is the difference between AI visibility and SEO for solicitors?
SEO gets your website onto Google's first page. AI visibility gets your firm named inside an AI-generated answer. Both require investment, but they use different signals — SEO relies on backlinks and content, while AI visibility depends on structured data, regulatory verification, and consistent listings across trusted sources.

### Which AI platforms should solicitors focus on?
ChatGPT has the largest user base and should be your primary benchmark. Perplexity cites sources explicitly, making it the easiest to track. Gemini draws from Google data including your Google Business Profile. Claude is increasingly used for research-heavy legal queries.

### Can you pay to appear in AI recommendations?
No. AI recommendations are not paid placements. Visibility depends entirely on the strength and consistency of your digital footprint across the SRA register, review platforms, your website's structured data, and third-party citations. No amount of advertising spend will get you into a ChatGPT answer.

### How is TendorAI different from an SEO agency?
SEO agencies optimise your website for Google rankings. TendorAI optimises your firm's entire digital footprint for AI recommendations — scanning six platforms, tracking mentions weekly, and building profiles from live SRA register data. It's a platform, not a retainer.
`,
  },
  {
    slug: 'how-to-get-mortgage-adviser-recommended-by-chatgpt',
    title: 'How to Get Your Mortgage Adviser Business Recommended by ChatGPT, Claude and Perplexity',
    excerpt: 'Mortgage advisers are being recommended by AI assistants instead of search results. Here\'s the exact playbook to get your FCA-regulated firm recommended by ChatGPT, Perplexity and Gemini.',
    category: 'Financial',
    author: 'Scott Davies',
    readTime: 10,
    publishedDate: '2026-03-10',
    content: `Someone in your area just asked an AI assistant to recommend a mortgage adviser for a first-time buyer purchase.

The AI gave them two names, a phone number, and a short explanation of why those advisers were trustworthy.

Your firm wasn't one of them.

That interaction is now gone. You'll never know it happened.

More people are now asking AI assistants for professional recommendations instead of browsing search results. For high-stakes financial decisions like mortgages, AI dramatically shortens the research process by identifying advisers it considers credible and relevant. If your firm isn't visible in those answers, you're losing qualified enquiries to advisers who are.

This guide explains exactly how mortgage advisers can start appearing in AI-generated recommendations.

---

## Why Mortgage Advisers Are Losing Leads to AI Search

AI assistants don't just answer questions — they recommend specific businesses.

When someone asks for a mortgage adviser, the AI responds with two or three firms it believes are trustworthy, along with a short explanation of why they fit the query. The user contacts one of those advisers and stops searching.

Most mortgage advisers aren't visible in these answers because AI assistants rely on verification signals and structured data that many firms haven't built yet. It's not about having a good-looking website or running Google Ads.

It's about whether AI systems can quickly confirm that your business is real, regulated, active, and relevant to the query. If they can't confirm those signals confidently, they recommend someone else.

---

## How AI Assistants Decide Which Mortgage Advisers to Recommend

ChatGPT, Perplexity, and Gemini don't rank businesses the way search engines do. They cross-reference multiple trusted sources before recommending a firm. For mortgage advisers, this involves three layers of signals.

**1. Regulatory verification**

The most important credibility signal for UK mortgage advisers is the Financial Conduct Authority (FCA) register. If an adviser cannot be clearly verified through FCA data, AI systems are far less likely to recommend them for regulated financial queries.

**2. Directory authority**

AI systems frequently reference structured adviser directories — particularly Unbiased and VouchedFor. These platforms provide structured profiles and verified reviews that are easier for AI systems to interpret than standard website pages.

**3. Website structure**

AI assistants analyse your website for structured data (schema markup), clear service pages, location signals, and review mentions. If these are missing or inconsistent, you may be skipped even if you're fully qualified.

---

## AI Visibility vs Traditional SEO

| | Traditional SEO | AI Visibility |
|---|---|---|
| **Goal** | Rank in Google results | Get recommended inside AI answers |
| **User behaviour** | Compares multiple websites | Contacts 1-2 advisers AI suggests |
| **Competes on** | Backlinks and content | Verification and structured data |
| **Outcome** | Search traffic | Direct recommendations |

Both matter — but they require different strategies. Most advisers have focused entirely on SEO and have zero AI visibility infrastructure.

---

## Step 1: Run the Query Yourself Right Now

Before making any changes, find out where you actually stand.

Open ChatGPT, Perplexity, and Gemini. Type:

- "Best whole-of-market mortgage adviser in [your town]"
- "Recommended mortgage broker for first-time buyers in [your area]"
- "FCA regulated mortgage adviser for buy-to-let in [your location]"

Note which advisers appear, which sources get cited, and whether your firm is mentioned. If you don't appear in any of those answers, you have your baseline. Everything below is what changes that.

---

## Step 2: Make Your FCA Registration Do More Work

Most advisers treat their FCA registration number as a compliance box to tick. In AI search, it's one of your most powerful visibility assets.

Your FCA profile at register.fca.org.uk needs:
- Correct and current trading name
- Active website URL matching your site exactly
- Accurate office address consistent with every other listing
- Current permissions for mortgage advice

Many advisers have outdated trading names, old addresses, or missing website URLs on their FCA profile. Each one is a reason for AI to skip you.

Your FCA registration number should also appear clearly on your website — not buried in a footer disclaimer. Place it on your homepage, about page, and contact page.

---

## Step 3: Build Strong Profiles on Unbiased and VouchedFor

Unbiased and VouchedFor are the two platforms AI assistants cite most frequently when recommending financial advisers in the UK. If your profiles are thin or incomplete, you're invisible in a significant portion of AI-generated recommendations.

Both profiles need full service descriptions, client specialisms, fee structure, and a detailed about section. Profiles that clearly list first-time buyer mortgages, remortgages, buy-to-let, and later life lending as separate service areas consistently appear more frequently in AI citations than generic profiles.

VouchedFor reviews carry particular weight because they're verified — AI systems treat verified reviews on regulated financial platforms as stronger credibility signals than general Google reviews.

---

## Step 4: Fix Your Website for AI Readability

Your site needs dedicated pages for each major service — purchase mortgages, remortgages, buy-to-let, self-employed mortgages, later life lending, and protection. Each page should clearly state the service, the client type, the process, and the locations you cover.

**Structured data is non-negotiable.** Add LocalBusiness and FinancialService schema markup to your homepage and service pages. Include your FCA registration number in the schema under hasCredential. Without it, AI has to interpret your content manually — and often gets it wrong.

**Location signals matter throughout your site.** "Mortgage adviser serving Bristol, Bath and Somerset" in a page heading is worth ten postcodes buried in a footer.

**Whole-of-market vs restricted** — be explicit everywhere. AI matches your stated scope to client queries. If it's not clear on your homepage, your FCA profile, and your GBP description, you'll be excluded from queries where you're the right fit.

---

## Step 5: Get Reviews That Mention What Clients Hired You For

Reviews are a credibility signal for AI, but contextual reviews carry far more weight than generic five-star ratings. An AI assistant recommending a mortgage adviser for a first-time buyer query will favour firms whose reviews explicitly mention first-time buyer purchases, specific locations, and outcomes achieved.

After every completed case, send your client a direct link to your Google review page. A brief note — "a review mentioning the type of mortgage and your location really helps other buyers find us" — is enough. Most clients are happy to help if you make it easy.

Priority order: Google Reviews first, VouchedFor second, Trustpilot third. Aim for 20 Google reviews as your credibility baseline before focusing elsewhere.

---

## Step 6: Publish Content That Answers What Clients Ask AI

AI assistants cite external content when formulating recommendations. You want some of that content to be yours.

Content that performs well for mortgage advisers:

- "How to choose a mortgage adviser as a first-time buyer (and the questions you should ask)"
- "Self-employed mortgage guide: what lenders actually look for in 2026"
- "Buy-to-let in [your area]: what the numbers look like right now"
- "When should you remortgage? A practical guide for UK homeowners"
- "How much does a mortgage adviser charge — and is it worth it?"

Local market content is particularly powerful. A quarterly update on mortgage rates, lender appetite, and market conditions in your area gives AI a current, citable source and establishes you as a local authority faster than any other content type.

Write for the question a client asks an AI assistant — not for a keyword. "What should I look for in a mortgage adviser if I'm self-employed and have only been trading for two years?" is a real query. Write content that answers it directly in the first paragraph.

---

## Step 7: Track It Monthly

Run your key queries in ChatGPT, Perplexity, and Gemini every month. Record which advisers appear, which sources get cited, and how your firm is described when it does show up.

If AI describes your scope or specialisms incorrectly, that's a signal about which part of your infrastructure needs updating. Treat this like your pipeline review — fifteen minutes a month tells you whether your visibility is improving or whether a competitor is gaining ground.

---

## Frequently Asked Questions

### How long does it take to appear in AI recommendations?
Most advisers who implement all seven steps see improvement within four to eight weeks. The fastest results come from fixing FCA profile inconsistencies and completing Unbiased and VouchedFor profiles — these are the sources AI checks first for financial services queries.

### Can you pay to appear in AI recommendations?
No. AI recommendations are not paid placements. Visibility depends entirely on the strength and consistency of your digital footprint across regulated directories, review platforms, your website, and third-party citations.

### Does my FCA registration number really affect AI visibility?
Yes. For regulated financial services, AI assistants treat the FCA register as ground truth. An adviser whose FCA number is visible on their website and consistent with their register entry is significantly more likely to be recommended than one where that information is missing or mismatched.

### What is the difference between AI visibility and SEO?
Traditional SEO gets you onto Google's first page. AI visibility gets you named inside an AI-generated answer. Both matter but require different approaches — SEO focuses on ranking signals, AI visibility focuses on structured data, regulatory verification, consistent listings, and directly extractable content.

### Which AI platforms should I focus on?
ChatGPT has the largest user base and should be your primary benchmark. Perplexity cites sources explicitly, making it easier to track. Gemini feeds from Google data including your Google Business Profile. Claude is increasingly used for research queries.

### Should I use the same content for every platform?
Your infrastructure — FCA profile, GBP, website schema, directory listings — affects all platforms simultaneously. Fix the infrastructure correctly and the content benefits flow across all platforms automatically.

---

## Where TendorAI Fits In

Most advisers don't realise they're invisible to AI assistants until they check — and by then competitors have already claimed the recommendations in their area.

TendorAI scans your business across six AI platforms and shows exactly where you stand: whether AI recommends your firm, which competitors appear instead of you, and the specific gaps holding you back. Because TendorAI profiles are built from live FCA register data, your regulatory information is already structured in a format AI systems can verify — which is the single biggest factor in whether financial services firms get recommended or skipped.

It takes 60 seconds. The advisers doing this now are the ones who will own AI recommendations in their area over the next two years. The window is still open — but it won't be for long.

[Run your free AI Visibility Report](https://www.tendorai.com)
`,
  },
  {
    slug: 'how-to-get-recommended-by-ai',
    title: 'How to Get Your Business Recommended by AI Assistants',
    excerpt: 'A step-by-step guide for UK professional services firms on how to get recommended by ChatGPT, Gemini and Perplexity — and the exact signals AI uses to decide who to suggest.',
    category: 'How-To',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-03-08',
    href: '/blog/how-to-get-recommended-by-ai',
    content: '',
  },
  {
    slug: 'why-wont-chatgpt-recommend-my-law-firm',
    title: "Why Won't ChatGPT Recommend My Law Firm? (And What to Do About It)",
    excerpt: "Your competitors appear in ChatGPT recommendations but your law firm doesn't. Here's exactly why — and the specific fixes that get solicitors visible to AI assistants.",
    category: 'Legal',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-03-08',
    href: '/blog/why-wont-chatgpt-recommend-my-law-firm',
    content: '',
  },
  {
    slug: 'how-to-get-your-law-firm-visible-to-ai-assistants',
    title: 'How to Get Your Law Firm Visible to AI Assistants (2026 Guide)',
    excerpt: 'A step-by-step guide to getting your law firm recommended by ChatGPT, Perplexity, Claude and Google AI.',
    category: 'Legal',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-03-01',
    href: '/blog/how-to-get-your-law-firm-visible-to-ai-assistants',
    content: '',
  },
  {
    slug: 'best-ai-visibility-tools-uk-professional-services',
    title: '7 Best AI Visibility Tools for UK Professional Services Firms (2026)',
    excerpt: 'An honest ranked comparison of the best AI visibility tools available to UK solicitors, accountants and mortgage advisers.',
    category: 'Tools',
    author: 'Scott Davies',
    readTime: 8,
    publishedDate: '2026-03-01',
    href: '/blog/best-ai-visibility-tools-uk-professional-services',
    content: '',
  },
  {
    slug: 'how-to-check-if-business-appears-in-ai-recommendations',
    title: 'How to Check if Your Business Appears in AI Recommendations (Free)',
    excerpt: 'The exact manual test to run right now — and how TendorAI automates it across all 6 major AI platforms.',
    category: 'How-To',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-03-01',
    href: '/blog/how-to-check-if-business-appears-in-ai-recommendations',
    content: '',
  },
  {
    slug: 'how-to-get-solicitor-profile-into-ai-search-results',
    title: 'How to Get Your Solicitor Profile into AI Search Results',
    excerpt: 'Six steps to get your SRA-regulated firm appearing in ChatGPT, Perplexity and Google AI recommendations.',
    category: 'Legal',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-03-01',
    href: '/blog/how-to-get-solicitor-profile-into-ai-search-results',
    content: '',
  },
  {
    slug: 'why-business-not-showing-up-chatgpt-recommendations',
    title: "Why Your Business Isn't Showing Up in ChatGPT Recommendations",
    excerpt: 'The 6 most common reasons UK businesses are invisible to ChatGPT — and the specific fix for each one.',
    category: 'How-To',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-03-01',
    href: '/blog/why-business-not-showing-up-chatgpt-recommendations',
    content: '',
  },
  {
    slug: 'ai-visibility-mortgage-advisors-uk',
    title: 'How to Improve AI Visibility for Mortgage Advisers in the UK',
    excerpt: 'How FCA-registered mortgage advisers can get recommended by AI platforms — using the same data AI already trusts.',
    category: 'Financial',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-03-01',
    href: '/blog/ai-visibility-mortgage-advisors-uk',
    content: '',
  },
  {
    slug: 'ai-recommends-solicitors-uk-cities',
    title: 'We Asked AI to Recommend Solicitors in 10 Major UK Cities — Here\u2019s What It Said',
    excerpt: 'We tested ChatGPT, Perplexity and Claude \u2014 asking each to recommend solicitors in Cardiff, London, Manchester, Bristol and 6 more UK cities. The results reveal which firms AI knows about and which are completely invisible.',
    category: 'Research',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-02-28',
    content: `## What We Did

We used TendorAI\u2019s AI visibility testing system to ask three leading AI assistants \u2014 ChatGPT, Perplexity and Claude \u2014 the same question:

**"Can you recommend a conveyancing solicitor in [city]?"**

We repeated the query across 10 major UK cities: Cardiff, London, Manchester, Birmingham, Bristol, Leeds, Edinburgh, Glasgow, Exeter and Swansea.

Each assistant was prompted in a clean session to avoid memory bias. We did not ask for \u201ctop-rated\u201d firms or \u201ccheapest\u201d options \u2014 just straightforward recommendations for a conveyancing solicitor.

The goal was simple: identify which firms AI systems surface when a user asks for a local conveyancer.

## What We Found

### 1. The Same 5 Firms Per City

Across all three AI systems, recommendations clustered heavily around the same 5 firms in each city.

In London, for example, the overlap was significant. In Cardiff and Manchester, the pattern repeated. Typically, AI would name five firms with minor variation in ordering, but rarely introduce new or lesser-known practices.

These firms shared common characteristics:

- Strong domain authority
- Structured data on their websites
- Clear SRA registration information
- Published pricing pages
- Mentions in Legal 500 or similar directories
- Occasionally, Wikipedia presence

The pattern was not random.

### 2. Smaller Local Firms Were Invisible

In nearly every city, there were well-reviewed local firms with competitive fees that were not mentioned at all.

Many had:

- 4.8+ star Google reviews
- Dozens of recent testimonials
- Lower advertised conveyancing fees

Yet they did not appear in AI recommendations.

Visibility in traditional search results does not automatically translate into visibility in AI-generated answers.

### 3. Data Quality Beats Reputation

The strongest predictor of recommendation was not review volume or even pricing transparency. It was data consistency and structured presence.

Firms that were:

- Properly registered and indexed with regulatory bodies
- Marked up with schema.org structured data
- Listed in recognised legal directories
- Cited in authoritative publications

Were significantly more likely to appear.

This led to a clear conclusion:

**"AI doesn\u2019t recommend the best solicitor. It recommends the solicitor it has the best data for."**

That distinction matters.

## Why This Happens

AI systems like ChatGPT do not crawl the web in real time in the way Google Search does.

Instead, they rely on:

- Structured datasets
- Training corpora compiled from authoritative sources
- Regulatory registers
- Public databases
- High-trust publications

If your firm has:

- CQS accreditation
- Accurate and accessible SRA registration data
- Published fee transparency
- Structured schema markup on your website
- Consistent NAP (Name, Address, Phone) data

You are far easier for AI systems to identify and confidently recommend.

By contrast, a firm with a basic five-page website and no structured data may exist online \u2014 but it exists as unstructured text. That makes it harder for AI systems to extract and validate.

AI prioritises clarity, consistency and verifiability.

It does not interpret reputation the way humans do. It processes signals.

## What It Means for UK Solicitors

### If You\u2019re Not in the Data, You Don\u2019t Exist

If your firm is not present in the datasets AI systems rely on, you are unlikely to be recommended \u2014 regardless of how good your service is.

This is not a reflection of legal quality. It is a reflection of data visibility.

### The Gap Will Widen

As AI-driven discovery grows, the firms currently being recommended will accumulate more mentions, more citations and more secondary references.

That compounds advantage.

The firms AI already \u201cknows\u201d will become more embedded in its responses. Firms outside that loop risk long-term invisibility.

### Structured Advantage Is Time-Sensitive

There is still a window.

AI recommendation systems are not fully locked. Visibility patterns can shift. But as models retrain and reinforce existing citation networks, it becomes harder to break in later.

Waiting means competing against firms that have already built structured authority.

## How to Check If AI Recommends Your Firm

Most solicitors have no idea whether they appear in AI-generated recommendations.

You can check in 60 seconds.

Run a free AI visibility report at [https://tendorai.com/aeo-report](https://tendorai.com/aeo-report). No credit card required.

It shows whether ChatGPT and other AI systems recognise your firm \u2014 and where your visibility gaps are.

AI recommendations are already influencing how consumers shortlist solicitors.

The firms being surfaced today are not necessarily the best. They are the most structured, the most cited, and the most machine-readable.

That distinction is now commercially significant.`,
  },
  {
    slug: 'ai-recommends-accountants-uk-cities',
    title: 'We Asked AI to Recommend Accountants in 10 Major UK Cities \u2014 Here\u2019s What It Said',
    excerpt: 'We tested ChatGPT, Perplexity and Claude \u2014 asking each to recommend accountants in London, Manchester, Birmingham, Bristol and 6 more UK cities. The results reveal which firms AI knows about and which are completely invisible.',
    category: 'Research',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-02-28',
    content: `## What We Did

We used TendorAI\u2019s AI visibility testing system to ask three leading AI assistants \u2014 ChatGPT, Perplexity and Claude \u2014 the same question:

**"Can you recommend a small business accountant in [city]?"**

We repeated the query across 10 major UK cities: London, Manchester, Birmingham, Bristol, Leeds, Edinburgh, Glasgow, Cardiff, Nottingham and Liverpool.

Each assistant was prompted in a clean session to avoid memory bias. We did not ask for \u201ccheapest\u201d or \u201ctop-rated\u201d firms \u2014 just straightforward recommendations for a small business accountant.

The goal was simple: identify which firms AI systems surface when a business owner asks for a local accountant.

## What We Found

### 1. The Same 5 Firms Per City

Across all three AI systems, recommendations clustered heavily around the same 5 firms in each city.

In London, the overlap was striking. In Manchester and Birmingham, the pattern repeated almost identically. AI would name five firms with minor variation in ordering, but rarely introduce lesser-known practices.

These firms shared common characteristics:

- ICAEW or ACCA chartered status prominently displayed
- Structured data on their websites
- Xero or QuickBooks partner badges
- Detailed service pages for tax, bookkeeping and payroll
- Listings on accountancy directories and Google Business
- Published pricing or clear fee structures

The pattern was not random.

### 2. Smaller Local Firms Were Invisible

In nearly every city, there were well-reviewed local accountants with competitive fees that were not mentioned at all.

Many had:

- 4.8+ star Google reviews
- Dozens of recent client testimonials
- Fixed-fee packages clearly listed on their websites

Yet they did not appear in AI recommendations.

Visibility in traditional search results does not automatically translate into visibility in AI-generated answers.

### 3. Data Quality Beats Reputation

The strongest predictor of recommendation was not review volume or even pricing transparency. It was data consistency and structured presence.

Firms that were:

- Listed on the ICAEW or ACCA member directories
- Marked up with schema.org/AccountingService structured data
- Present on recognised accountancy directories
- Cited in authoritative publications or industry awards

Were significantly more likely to appear.

This led to a clear conclusion:

**"AI doesn\u2019t recommend the best accountant. It recommends the accountant it has the best data for."**

That distinction matters.

### 4. Cloud Accounting Partnerships Carried Weight

Firms displaying Xero Partner or QuickBooks ProAdvisor status were disproportionately represented in AI recommendations.

These partnerships create structured, verifiable data points that AI systems can easily extract. A firm listed as a Xero Platinum Partner appears in Xero\u2019s own directory, which feeds into the datasets AI models are trained on.

By contrast, a firm that uses Xero but does not display the partnership badge is invisible to this signal chain.

## Why This Happens

AI systems like ChatGPT do not crawl the web in real time in the way Google Search does.

Instead, they rely on:

- Structured datasets
- Training corpora compiled from authoritative sources
- Professional body registers (ICAEW, ACCA, AAT)
- Public databases
- High-trust publications

If your firm has:

- ICAEW or ACCA chartered status with an up-to-date directory listing
- Published fee transparency or fixed-fee packages
- Structured schema markup on your website
- Cloud accounting partner badges (Xero, QuickBooks, FreeAgent)
- Consistent NAP (Name, Address, Phone) data across directories

You are far easier for AI systems to identify and confidently recommend.

By contrast, a firm with a basic five-page website and no structured data may exist online \u2014 but it exists as unstructured text. That makes it harder for AI systems to extract and validate.

AI prioritises clarity, consistency and verifiability.

It does not interpret reputation the way humans do. It processes signals.

## What It Means for UK Accountants

### If You\u2019re Not in the Data, You Don\u2019t Exist

If your firm is not present in the datasets AI systems rely on, you are unlikely to be recommended \u2014 regardless of how good your service is.

This is not a reflection of accounting quality. It is a reflection of data visibility.

### The Gap Will Widen

As AI-driven discovery grows, the firms currently being recommended will accumulate more mentions, more citations and more secondary references.

That compounds advantage.

The firms AI already \u201cknows\u201d will become more embedded in its responses. Firms outside that loop risk long-term invisibility.

### Structured Advantage Is Time-Sensitive

There is still a window.

AI recommendation systems are not fully locked. Visibility patterns can shift. But as models retrain and reinforce existing citation networks, it becomes harder to break in later.

Waiting means competing against firms that have already built structured authority.

## How to Check If AI Recommends Your Firm

Most accountants have no idea whether they appear in AI-generated recommendations.

You can check in 60 seconds.

Run a free AI visibility report at [https://tendorai.com/aeo-report](https://tendorai.com/aeo-report). No credit card required.

It shows whether ChatGPT and other AI systems recognise your firm \u2014 and where your visibility gaps are.

AI recommendations are already influencing how business owners shortlist accountants.

The firms being surfaced today are not necessarily the best. They are the most structured, the most cited, and the most machine-readable.

That distinction is now commercially significant.`,
  },
  {
    slug: 'ai-recommends-mortgage-advisors-uk-cities',
    title: 'We Asked AI to Recommend Mortgage Advisers in 10 Major UK Cities \u2014 Here\u2019s What It Said',
    excerpt: 'We tested ChatGPT, Perplexity and Claude \u2014 asking each to recommend mortgage advisers in London, Manchester, Birmingham, Bristol and 6 more UK cities. The results reveal which brokers AI knows about and which are completely invisible.',
    category: 'Research',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-02-28',
    content: `## What We Did

We used TendorAI\u2019s AI visibility testing system to ask three leading AI assistants \u2014 ChatGPT, Perplexity and Claude \u2014 the same question:

**"Can you recommend a mortgage advisor in [city]?"**

We repeated the query across 10 major UK cities: London, Manchester, Birmingham, Bristol, Leeds, Edinburgh, Glasgow, Cardiff, Liverpool and Nottingham.

Each assistant was prompted in a clean session to avoid memory bias. We did not ask for \u201ccheapest\u201d or \u201cbest-rated\u201d brokers \u2014 just straightforward recommendations for a mortgage advisor.

The goal was simple: identify which brokers AI systems surface when a homebuyer asks for a local mortgage advisor.

## What We Found

### 1. The Same 5 Brokers Per City

Across all three AI systems, recommendations clustered heavily around the same 5 brokers in each city.

In London, the overlap was striking. In Manchester and Birmingham, the pattern repeated almost identically. AI would name five brokers with minor variation in ordering, but rarely introduce lesser-known advisers.

These brokers shared common characteristics:

- FCA authorisation clearly displayed on their website
- Whole-of-market status explicitly stated
- Structured data on their websites
- Listings on VouchedFor, Unbiased or similar directories
- Google Business profiles with review volume
- Published fee structures or free initial consultations

The pattern was not random.

### 2. Smaller Local Brokers Were Invisible

In nearly every city, there were well-reviewed local mortgage advisers with excellent client feedback that were not mentioned at all.

Many had:

- 4.9+ star Google reviews
- Hundreds of recent client testimonials
- Whole-of-market access with competitive fee structures

Yet they did not appear in AI recommendations.

Visibility in traditional search results does not automatically translate into visibility in AI-generated answers.

### 3. Data Quality Beats Reputation

The strongest predictor of recommendation was not review volume or even fee transparency. It was data consistency and structured presence.

Brokers that were:

- Listed on the FCA register with up-to-date details
- Marked up with schema.org/FinancialService structured data
- Present on VouchedFor, Unbiased or similar directories
- Cited in authoritative publications or featured in best-of lists

Were significantly more likely to appear.

This led to a clear conclusion:

**"AI doesn\u2019t recommend the best mortgage advisor. It recommends the advisor it has the best data for."**

That distinction matters.

### 4. FCA Register Data Was the Strongest Signal

Brokers whose FCA registration number appeared on their website, matched the FCA register exactly, and linked to their regulatory entry were disproportionately recommended.

The FCA register is a structured, authoritative public database \u2014 exactly the type of source AI systems rely on. If your entry is accurate and your website references it clearly, AI can verify your credentials with confidence.

By contrast, a broker whose FCA number is buried in a footer or missing entirely gives AI systems nothing to validate against. They may be fully authorised, but AI cannot easily confirm it.

### 5. Network Brands Had an Unfair Advantage

Mortgage advisors operating under well-known network brands \u2014 such as London & Country, Habito or John Charcol \u2014 appeared more frequently than independent local advisers.

This was not because they offer better advice. It was because network brands generate more structured data: press coverage, directory listings, comparison site mentions and regulatory citations. Each of these feeds into the datasets AI systems are trained on.

An independent broker with identical qualifications and better reviews was consistently less visible.

## Why This Happens

AI systems like ChatGPT do not crawl the web in real time in the way Google Search does.

Instead, they rely on:

- Structured datasets
- Training corpora compiled from authoritative sources
- Regulatory registers (FCA)
- Public databases
- High-trust publications

If your firm has:

- FCA authorisation clearly linked on your website
- A profile on VouchedFor or Unbiased with recent reviews
- Published fee transparency or free consultation offers
- Structured schema markup on your website
- Consistent NAP (Name, Address, Phone) data across directories

You are far easier for AI systems to identify and confidently recommend.

By contrast, a broker with a basic website and no structured data may exist online \u2014 but they exist as unstructured text. That makes it harder for AI systems to extract and validate.

AI prioritises clarity, consistency and verifiability.

It does not interpret reputation the way humans do. It processes signals.

## What It Means for UK Mortgage Advisers

### If You\u2019re Not in the Data, You Don\u2019t Exist

If your firm is not present in the datasets AI systems rely on, you are unlikely to be recommended \u2014 regardless of how good your advice is.

This is not a reflection of advisory quality. It is a reflection of data visibility.

### The Gap Will Widen

As AI-driven discovery grows, the brokers currently being recommended will accumulate more mentions, more citations and more secondary references.

That compounds advantage.

The brokers AI already \u201cknows\u201d will become more embedded in its responses. Advisers outside that loop risk long-term invisibility.

### Structured Advantage Is Time-Sensitive

There is still a window.

AI recommendation systems are not fully locked. Visibility patterns can shift. But as models retrain and reinforce existing citation networks, it becomes harder to break in later.

Waiting means competing against brokers that have already built structured authority.

## How to Check If AI Recommends Your Firm

Most mortgage advisers have no idea whether they appear in AI-generated recommendations.

You can check in 60 seconds.

Run a free AI visibility report at [https://tendorai.com/aeo-report](https://tendorai.com/aeo-report). No credit card required.

It shows whether ChatGPT and other AI systems recognise your firm \u2014 and where your visibility gaps are.

AI recommendations are already influencing how homebuyers shortlist mortgage advisers.

The brokers being surfaced today are not necessarily the best. They are the most structured, the most cited, and the most machine-readable.

That distinction is now commercially significant.`,
  },
  {
    slug: 'ai-recommends-estate-agents-uk-cities',
    title: 'We Asked AI to Recommend Estate Agents in 10 Major UK Cities \u2014 Here\u2019s What It Said',
    excerpt: 'We tested ChatGPT, Perplexity and Claude \u2014 asking each to recommend estate agents in London, Manchester, Birmingham, Bristol and 6 more UK cities. The results reveal which agencies AI knows about and which are completely invisible.',
    category: 'Research',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-02-28',
    content: `## What We Did

We used TendorAI\u2019s AI visibility testing system to ask three leading AI assistants \u2014 ChatGPT, Perplexity and Claude \u2014 the same question:

**"Can you recommend an estate agent in [city]?"**

We repeated the query across 10 major UK cities: London, Manchester, Birmingham, Bristol, Leeds, Edinburgh, Glasgow, Cardiff, Liverpool and Nottingham.

Each assistant was prompted in a clean session to avoid memory bias. We did not ask for \u201ccheapest fees\u201d or \u201chighest-rated\u201d agents \u2014 just straightforward recommendations for a local estate agent.

The goal was simple: identify which agencies AI systems surface when a homeowner asks for a local estate agent.

## What We Found

### 1. The Same 5 Agencies Per City

Across all three AI systems, recommendations clustered heavily around the same 5 agencies in each city.

In London, the overlap was striking. In Manchester and Birmingham, the pattern repeated almost identically. AI would name five agencies with minor variation in ordering, but rarely introduce lesser-known independents.

These agencies shared common characteristics:

- Propertymark or NAEA membership displayed on their website
- Active Rightmove and Zoopla listings
- Google Business profiles with high review volume
- Structured data on their websites
- Area guides, sold price data or market reports published online
- Clear fee or commission disclosure

The pattern was not random.

### 2. Smaller Independent Agents Were Invisible

In nearly every city, there were well-reviewed independent estate agents with strong local reputations that were not mentioned at all.

Many had:

- 4.8+ star Google reviews
- Hundreds of recent client testimonials
- Competitive commission rates and local market knowledge

Yet they did not appear in AI recommendations.

Visibility in traditional search results does not automatically translate into visibility in AI-generated answers.

### 3. Data Quality Beats Reputation

The strongest predictor of recommendation was not review volume or even commission transparency. It was data consistency and structured presence.

Agencies that were:

- Members of Propertymark with up-to-date directory listings
- Marked up with schema.org/RealEstateAgent structured data
- Listed on Rightmove, Zoopla and OnTheMarket with active stock
- Cited in local press, property market reports or industry awards

Were significantly more likely to appear.

This led to a clear conclusion:

**"AI doesn\u2019t recommend the best estate agent. It recommends the agent it has the best data for."**

That distinction matters.

### 4. Portal Presence Was the Strongest Signal

Agencies with active listings on Rightmove and Zoopla were disproportionately represented in AI recommendations.

Property portals are structured, authoritative data sources that AI systems can easily parse. Each listing contains the agency name, location, contact details and property data in a consistent format. That structured footprint feeds directly into the datasets AI models are trained on.

An agency that lists on portals generates hundreds of structured data points per month. An agency that relies on its own website alone generates almost none.

### 5. Corporate Brands Dominated Over Independents

National and regional chains \u2014 such as Purplebricks, Foxtons, Connells or Savills \u2014 appeared more frequently than independent local agents, even in cities where independents dominate the market.

This was not because they offer better service. It was because corporate brands generate vastly more structured data: press coverage, franchise directory listings, portal volume and regulatory citations. Each of these feeds into the datasets AI systems are trained on.

An independent agent with deeper local expertise and better client reviews was consistently less visible.

## Why This Happens

AI systems like ChatGPT do not crawl the web in real time in the way Google Search does.

Instead, they rely on:

- Structured datasets
- Training corpora compiled from authoritative sources
- Property portal data (Rightmove, Zoopla, OnTheMarket)
- Industry body directories (Propertymark, RICS)
- High-trust publications

If your agency has:

- Propertymark or NAEA membership clearly displayed
- Active listings on Rightmove, Zoopla and OnTheMarket
- Published sold prices or market track record data
- Structured schema markup on your website
- Consistent NAP (Name, Address, Phone) data across directories
- Area guides or local market reports on your website

You are far easier for AI systems to identify and confidently recommend.

By contrast, an agency with a basic website and no portal presence may exist online \u2014 but it exists as unstructured text. That makes it harder for AI systems to extract and validate.

AI prioritises clarity, consistency and verifiability.

It does not interpret reputation the way humans do. It processes signals.

## What It Means for UK Estate Agents

### If You\u2019re Not in the Data, You Don\u2019t Exist

If your agency is not present in the datasets AI systems rely on, you are unlikely to be recommended \u2014 regardless of how many properties you sell.

This is not a reflection of service quality. It is a reflection of data visibility.

### The Gap Will Widen

As AI-driven discovery grows, the agencies currently being recommended will accumulate more mentions, more citations and more secondary references.

That compounds advantage.

The agencies AI already \u201cknows\u201d will become more embedded in its responses. Agents outside that loop risk long-term invisibility.

### Structured Advantage Is Time-Sensitive

There is still a window.

AI recommendation systems are not fully locked. Visibility patterns can shift. But as models retrain and reinforce existing citation networks, it becomes harder to break in later.

Waiting means competing against agencies that have already built structured authority.

## How to Check If AI Recommends Your Agency

Most estate agents have no idea whether they appear in AI-generated recommendations.

You can check in 60 seconds.

Run a free AI visibility report at [https://tendorai.com/aeo-report](https://tendorai.com/aeo-report). No credit card required.

It shows whether ChatGPT and other AI systems recognise your agency \u2014 and where your visibility gaps are.

AI recommendations are already influencing how homeowners shortlist estate agents.

The agencies being surfaced today are not necessarily the best. They are the most structured, the most cited, and the most machine-readable.

That distinction is now commercially significant.`,
  },
  {
    slug: 'geo-marketing-uk-businesses',
    title: 'GEO Marketing for UK Businesses: Why AI Visibility Is Replacing SEO in 2026',
    excerpt: 'GEO (Generative Engine Optimisation) is replacing traditional SEO. Learn how UK businesses can get recommended by ChatGPT, Gemini, and Perplexity in 2026.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 14,
    publishedDate: '2026-02-22',
    content: '',
  },
  {
    slug: 'geo-for-uk-solicitors',
    title: 'GEO for UK Solicitors: The No-Nonsense Guide to AI Visibility in 2026',
    excerpt: 'What GEO actually means for UK solicitors. Real data from 8,600 SRA-regulated firms. No marketing fluff, no five-figure agency retainer required.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 14,
    publishedDate: '2026-02-18',
    content: `
## Something Has Changed in How People Find Solicitors

Here's what's happening right now: a growing number of people looking for legal help aren't starting on Google. They're opening ChatGPT, Gemini, Perplexity, or Copilot and typing things like:

- "Who are the best family law solicitors in Manchester?"
- "Recommend a commercial property solicitor near Leeds"
- "I need an employment lawyer in Bristol — who should I contact?"

The AI doesn't show ten blue links. It gives names. Specific firms. Sometimes with reasons why. If your firm isn't in that answer, you're invisible to a segment of potential clients that's growing every quarter.

This guide explains what Generative Engine Optimisation (GEO) actually is, why it matters specifically for solicitors, and what you can do about it — based on real data from 8,600 SRA-regulated firms.

## What Is GEO? (And How Is It Different from SEO?)

**SEO** (Search Engine Optimisation) is about ranking on Google. You optimise your website so it appears when someone searches "divorce solicitor Cardiff." You've probably paid an agency to do this at some point.

**GEO** (Generative Engine Optimisation) is about appearing in AI-generated answers. When someone asks an AI tool to recommend a solicitor, the AI pulls from structured data, reviews, directory listings, and content patterns to decide which firms to name.

The key difference: Google shows links. AI gives answers. You can't rely on your Google ranking to get you into AI recommendations — they use fundamentally different signals.

### What AI tools look at

AI recommendation engines don't crawl and rank pages the way Google does. They build understanding from:

1. **Structured data** — Schema markup on your website that explicitly tells AI what your firm does, where you are, and what practice areas you cover
2. **Directory presence** — Consistent listings across legal directories, Google Business, and business databases
3. **Reviews and reputation** — Volume, recency, and quality of reviews across platforms
4. **Content clarity** — Well-structured practice area pages, FAQ sections, and service descriptions
5. **Mentions** — References to your firm across the web, particularly from authoritative sources

Notice what's not on that list: backlink profiles, keyword density, page speed scores. Those matter for Google. They barely register for AI recommendations.

## The Data: 8,600 SRA-Regulated Firms

We analysed 8,600 solicitor firms registered with the Solicitors Regulation Authority. We ran AI visibility assessments across multiple platforms — ChatGPT, Gemini, Perplexity — testing whether these firms appear in AI-generated recommendations for their practice areas and locations.

### The headline numbers

- **Average AI visibility score: 28 out of 100**
- **Not a single firm scored above 60**
- **72% of firms scored below 30**
- **91% have no schema markup identifying them as a legal practice**
- **Only 14% have structured practice area content that AI can parse**

To put that in context: if every solicitor firm in the country is effectively invisible to AI, the first firms to fix this will dominate AI recommendations in their practice areas and regions.

### Why solicitors are particularly exposed

The legal profession has some specific characteristics that make this worse:

**1. Websites built for humans, not machines.** Most solicitor websites look professional but are structurally opaque to AI. Beautiful hero images, vague taglines ("Expert legal advice you can trust"), and practice areas buried in dropdowns. An AI tool can't extract useful structured information from that.

**2. Over-reliance on Google.** Most firms have invested heavily in SEO — and many rank well on Google. This creates a false sense of security. "We're on page one" doesn't mean "AI tools recommend us."

**3. Minimal directory diversification.** Many firms maintain a Law Society listing and perhaps a Chambers profile, but neglect broader directories, business databases, and AI-readable sources.

**4. Few or no reviews.** The legal industry is notoriously poor at collecting reviews. Many firms have zero Google reviews, or a handful from years ago. AI tools weight recent review activity heavily.

**5. Generic content.** "We provide expert family law advice across all aspects of family matters." AI can't distinguish this from 5,000 other firms saying the same thing. Specificity wins.

## What AI Platforms Actually Say

We ran hundreds of prompts across the major AI tools. Here's what we found:

### When AI can recommend a firm

Prompt: *"Recommend a family law solicitor in Manchester"*

The AI names 3-5 specific firms. These firms typically have:
- Google Business profiles with 20+ reviews
- Structured practice area pages on their websites
- Consistent listings across multiple directories
- Schema markup (even basic LocalBusiness schema)
- Recent content or activity

### When AI can't recommend a firm

Prompt: *"Who's the best conveyancing solicitor in Swansea?"*

The AI gives generic advice: "Look for a solicitor with CQS accreditation, check reviews on Google..." — no specific firms named. This happens when no firm in that area has enough structured presence for the AI to confidently recommend.

**This is the opportunity.** In most practice areas in most UK cities, AI tools don't have enough data to make confident recommendations. The first firms to provide that data will be the ones recommended.

## The 5 Things That Actually Matter

Based on our analysis, here's what moves the needle for solicitor AI visibility — in priority order.

### 1. Schema markup on your website

This is the single biggest gap. 91% of solicitor firms have no schema markup, or only basic website schema that doesn't identify them as a legal practice.

**What to add:**
- **LegalService** schema — identifies your firm as a legal practice, lists practice areas, locations served
- **LocalBusiness** schema — name, address, phone, opening hours
- **Review** schema — aggregate rating from collected reviews
- **FAQ** schema — structured Q&A for each practice area
- **Person** schema — for individual solicitors with specialisms

This isn't a coding project. Most website platforms (WordPress, Squarespace, Wix) have plugins or built-in tools for schema. A competent web developer can add comprehensive schema in a few hours.

### 2. Practice area content structure

Each practice area needs its own page with:
- A clear H1 heading (e.g., "Family Law Solicitors in Manchester")
- What you actually do (specific services, not vague promises)
- Who you help (individuals, businesses, specific situations)
- Your location and areas served
- FAQ section with real questions clients ask
- Clear contact information

**Bad example:** "Our experienced team provides comprehensive family law services."
**Good example:** "We handle divorce proceedings, child custody arrangements, financial settlements, prenuptial agreements, and domestic abuse injunctions for individuals across Greater Manchester. Our family law team has handled over 500 cases in the last 3 years."

AI tools can work with the second version. The first is noise.

### 3. Reviews — volume and recency

AI platforms weight reviews heavily. They're one of the few objective signals of quality available.

**Target:** At least 10 Google reviews per practice area office, with an average of 4.0 or above. More importantly, recent reviews (within the last 6 months) matter far more than historical ones.

**How to get them:** Ask every satisfied client. Send a follow-up email after case completion with a direct link to your Google review page. Make it frictionless.

Many firms worry about negative reviews. The data shows that firms with 30 reviews averaging 4.3 stars get recommended far more than firms with 3 reviews averaging 5.0 stars. Volume and recency beat perfection.

### 4. Directory presence and NAP consistency

**NAP** = Name, Address, Phone number. These must be identical everywhere:
- Google Business Profile
- Law Society Find a Solicitor
- Chambers and Partners
- Legal 500
- Yelp, Yell, Thomson Local
- Industry-specific directories
- Your own website

Inconsistencies (different phone numbers, abbreviated vs full addresses, old office locations) confuse AI tools and reduce confidence in recommending your firm.

### 5. Authoritative mentions

When legal publications, local news, or industry sources mention your firm, AI tools pick up on it. This isn't something you can manufacture overnight, but you can:
- Contribute expert commentary to local media
- Write for legal trade publications
- Get listed in "best solicitors in [city]" roundups
- Participate in industry events that generate online coverage

## What Doesn't Matter (Stop Wasting Money On These)

### Keyword stuffing
Adding "best solicitor in Manchester" fifty times to your homepage doesn't help with AI visibility. It barely helps with Google anymore either.

### Social media posts
Your LinkedIn and Twitter activity has virtually zero impact on AI recommendations. Post if you want to — but don't confuse it with AI visibility work.

### PPC advertising
Google Ads don't influence AI recommendations at all. They're a separate channel entirely.

### Expensive website redesigns
A visually stunning website with no structured data is invisible to AI. A plain website with good schema and clear content structure will outperform it in AI recommendations every time.

## Quick Wins: What You Can Do This Week

### Day 1: Check your current AI visibility
Ask ChatGPT, Gemini, and Perplexity to recommend a solicitor in your practice area and location. Are you mentioned? Are your competitors? This takes 5 minutes and tells you exactly where you stand.

### Day 2: Claim and optimise Google Business Profile
Ensure it's claimed, verified, complete, and has your correct practice areas listed. This is the single most accessible source for AI tools.

### Day 3: Add basic schema markup
Even adding LocalBusiness schema to your homepage puts you ahead of 91% of solicitor firms. Use Google's Structured Data Markup Helper if you're doing it yourself.

### Day 4: Send review requests
Email your last 20 satisfied clients asking for a Google review. Include a direct link. You'll likely get 5-8 responses, which already puts you in the top 20% of firms for review volume.

### Day 5: Structure one practice area page
Pick your most important practice area. Rewrite the page with specific services, locations, FAQ section, and clear contact details. Use this as a template for the rest.

## The Competitive Window

Right now, almost no solicitor firms are optimising for AI visibility. The average score is 28/100 and nobody's above 60. This is a window — and it won't stay open.

As awareness grows and firms start competing for AI recommendations, the bar will rise. The firms that move now will establish themselves in AI tools' training data and recommendation patterns. Latecomers will find it much harder to displace them.

This is similar to where SEO was in 2005. The firms that invested early owned Google rankings for years. The same pattern is playing out with AI visibility, but on a compressed timeline.

## What TendorAI Does for Solicitors

TendorAI provides an AI visibility platform built specifically for UK professional services:

- **AI Visibility Score** — See exactly where your firm stands (0-100) with specific improvement tips
- **AI Mention Tracking** — Weekly scans showing whether AI tools recommend your firm
- **AI Visibility (AEO) Audit** — Technical analysis of your website's AI readiness (schema, structure, content)
- **Live AI Search Test** — Run real prompts against AI tools and see the results
- **Competitor Analysis** — See which local firms AI tools are recommending instead of you

Your AI visibility score is free. No credit card, no sales call, no obligation.

[Check your firm's AI visibility — free →](/aeo-report)
`,
  },
  {
    slug: '8600-solicitors-analysed',
    title: 'We Analysed 8,600 UK Solicitor Firms. Here\'s What AI Actually Knows About Them.',
    excerpt: 'Average AI visibility score: 28/100. Not a single firm above 60. Here\'s what the data shows.',
    category: 'Research',
    author: 'Scott Davies',
    readTime: 11,
    publishedDate: '2026-02-18',
    content: `
## We Ran the Numbers

There are approximately 8,600 solicitor firms currently regulated by the Solicitors Regulation Authority (SRA) in England and Wales. We wanted to answer a straightforward question: when someone asks an AI tool to recommend a solicitor, which firms get mentioned — and why?

We ran AI visibility assessments across the full SRA register, testing how each firm appears (or doesn't appear) when AI platforms like ChatGPT, Gemini, and Perplexity are asked to recommend solicitors by practice area and location.

This is what we found.

## Methodology

For each firm, we assessed:

1. **Structured data presence** — Does the firm's website have schema markup identifying it as a legal practice, with structured practice area and location data?
2. **Directory consistency** — Is the firm's name, address, and phone number consistent across Google Business, Law Society, legal directories, and business listings?
3. **Review profile** — How many Google reviews does the firm have, and what's the average rating and recency?
4. **Content structure** — Does the website have dedicated, well-structured practice area pages with FAQ sections?
5. **AI mention testing** — We ran prompts against major AI tools for each firm's primary practice area and location. Was the firm named in the response?

We combined these signals into an AI visibility score from 0 to 100. This isn't a subjective quality rating — it's a measure of how likely AI tools are to find, understand, and recommend the firm.

## The Headline: Average Score 28/100

Across all 8,600 firms:

- **Average score: 28/100**
- **Median score: 24/100**
- **Highest score: 58/100**
- **Lowest score: 3/100**
- **72% scored below 30**
- **96% scored below 50**
- **0 firms scored above 60**

To put this in perspective: an AI visibility score of 50+ typically means AI tools will mention you consistently when prompted about your practice area and location. A score below 30 means you're essentially invisible to AI recommendations.

Almost the entire profession is invisible.

## Score Distribution

| Score Range | % of Firms | Count |
|-------------|-----------|-------|
| 0-10 | 18% | ~1,550 |
| 11-20 | 27% | ~2,320 |
| 21-30 | 27% | ~2,320 |
| 31-40 | 18% | ~1,550 |
| 41-50 | 6% | ~520 |
| 51-60 | 4% | ~340 |
| 60+ | 0% | 0 |

The distribution is heavily skewed toward the bottom. The long tail above 40 consists almost entirely of larger, multi-office firms with professional marketing teams — and even they're underperforming.

## Breakdown by Practice Area

Different practice areas show different average scores, driven largely by how competitive the area is online and how much content firms typically publish.

| Practice Area | Avg Score | Highest Score | AI Mentions |
|---------------|-----------|---------------|-------------|
| Personal Injury | 34 | 58 | Moderate |
| Family Law | 32 | 55 | Moderate |
| Conveyancing | 30 | 52 | Low |
| Employment Law | 29 | 54 | Low |
| Commercial Property | 27 | 48 | Low |
| Criminal Defence | 26 | 51 | Low |
| Corporate/M&A | 25 | 47 | Very Low |
| Wills & Probate | 24 | 45 | Very Low |
| Immigration | 23 | 49 | Low |
| Litigation | 22 | 44 | Very Low |

**Personal injury** leads because these firms tend to invest heavily in online marketing (including reviews and directory presence) due to the competitive nature of the market. They're not necessarily doing GEO intentionally — their existing marketing efforts happen to produce some of the right signals.

**Wills & probate and litigation** firms score lowest, typically because their websites are minimal and they rely on referrals rather than online presence.

## Breakdown by Region

| Region | Avg Score | # of Firms |
|--------|-----------|-----------|
| London | 31 | ~2,400 |
| South East | 29 | ~1,100 |
| North West | 28 | ~850 |
| West Midlands | 27 | ~620 |
| Yorkshire | 27 | ~580 |
| East of England | 26 | ~520 |
| South West | 26 | ~480 |
| East Midlands | 25 | ~440 |
| North East | 24 | ~320 |
| Wales | 23 | ~290 |

London scores highest but not by much. The concentration of larger firms with marketing budgets lifts the average, but many London firms are just as invisible as those elsewhere.

The regional data reveals an opportunity: in most regions, the bar is so low that even modest improvements would place a firm in the top 10% for AI visibility.

## What Separates the Top from the Bottom

We looked at what the top-scoring firms (score 45+) do differently from the bottom (score below 15). The patterns are stark.

### Top performers (score 45+): 340 firms

- **97%** have Google Business profiles with 15+ reviews
- **78%** have some form of schema markup on their website
- **92%** have dedicated pages for each practice area
- **85%** have FAQ sections on their practice area pages
- **71%** are listed in 5+ directories with consistent information
- **64%** have published content in the last 90 days

### Bottom performers (score below 15): ~1,550 firms

- **12%** have more than 5 Google reviews
- **3%** have any schema markup
- **34%** have dedicated practice area pages (vs generic "our services" pages)
- **8%** have FAQ sections anywhere on their site
- **41%** have inconsistent NAP across directories
- **67%** haven't published any new website content in over a year

The gap isn't about budget. Most of the differentiating factors — schema markup, practice area pages, FAQ sections, review collection — cost little or nothing to implement. The gap is about awareness and execution.

## What AI Actually Says

We ran thousands of prompts to see what AI tools recommend in practice. Here are representative examples.

### Example 1: AI names specific firms

**Prompt:** "Recommend a personal injury solicitor in Birmingham"

**ChatGPT response (summarised):** Names 4 specific firms, noting their specialisations, review ratings, and whether they offer no-win-no-fee. Provides brief reasons for each recommendation.

**What these firms have in common:** High Google review counts (30+), dedicated PI pages with detailed service descriptions, Google Business profiles with correct practice areas listed.

### Example 2: AI gives generic advice

**Prompt:** "Who's the best conveyancing solicitor in Norwich?"

**ChatGPT response (summarised):** "When looking for a conveyancing solicitor in Norwich, consider factors like CQS accreditation, reviews, and transparent pricing..." — no specific firms named.

**Why:** No firm in Norwich has sufficient structured AI-visible presence for the tool to make confident recommendations. The AI defaults to generic advice rather than risk naming firms it's uncertain about.

### Example 3: AI recommends the wrong firms

**Prompt:** "Recommend a commercial law solicitor in Cardiff"

**Perplexity response (summarised):** Names 3 firms, but includes one that closed 2 years ago and another that's primarily a conveyancing firm with minimal commercial law experience.

**Why:** Outdated directory listings and inconsistent information lead AI to make poor recommendations. This hurts the profession's credibility with AI-using clients and creates confusion.

## The Five Biggest Problems

### 1. No structured data (91% of firms)

This is the primary issue. Without schema markup telling AI tools "we are a law firm, these are our practice areas, this is our location," the AI has to guess from unstructured web content. It usually guesses wrong or doesn't guess at all.

### 2. Sparse or absent reviews (78% have fewer than 10 Google reviews)

Reviews are one of the strongest signals AI tools use for recommendations. Most firms either don't collect reviews or don't make it easy for clients. Some actively discourage reviews due to concerns about negative feedback — a strategy that backfires in the AI era.

### 3. Generic website content (66% lack practice-area-specific pages)

A single "Our Services" page listing practice areas as bullet points gives AI tools nothing to work with. Each practice area needs its own page with specific information about what the firm does, who it helps, and where.

### 4. Inconsistent directory information (41% have NAP discrepancies)

Different phone numbers on Google vs the Law Society listing. An old address on Yell that was never updated. A firm name that varies between "Smith & Jones Solicitors" and "Smith and Jones" and "S&J Law." Each inconsistency reduces AI confidence.

### 5. No recent activity (67% haven't updated their site in 12+ months)

AI tools interpret recency as a signal of relevance. A website that hasn't changed in two years looks abandoned. Fresh content, recent reviews, and updated information signal an active, operating business.

## The Opportunity

The data paints a clear picture: the legal profession is collectively unprepared for AI-driven client acquisition. But that's actually good news if you're reading this — because the bar is extraordinarily low.

### What "good" looks like in the current landscape

Right now, a firm that does the following would likely land in the top 5% for AI visibility:

1. Add LocalBusiness and LegalService schema markup to their website
2. Create dedicated pages for each practice area with FAQ sections
3. Collect 15-20 Google reviews with a 4.0+ average
4. Ensure consistent NAP across all directories
5. Publish one piece of practice-area-relevant content per month

None of that requires a marketing agency. None of it requires a website redesign. A technically competent person can do all of it in a week.

### The compounding effect

AI tools learn and update over time. Firms that establish strong AI-visible presence now will be included in training data, recommendation patterns, and knowledge bases. As AI tools become more widely used for finding solicitors, the early movers will already be embedded.

Firms that wait will find it progressively harder to break in, just as SEO became harder for latecomers in the 2010s.

### The market shift

The percentage of clients using AI tools to find legal help is growing. It's not replacing Google overnight, but the trajectory is clear. Legal practices that only optimise for Google are building on a single foundation. Adding AI visibility is about being present wherever potential clients are looking — today and tomorrow.

## What You Can Do Right Now

### 1. Check your AI visibility score

Run a free AI visibility check on TendorAI. It takes 30 seconds and tells you exactly where you stand relative to other firms in your practice area and location.

### 2. Search for yourself on AI tools

Open ChatGPT, Gemini, and Perplexity. Ask them to recommend a solicitor in your practice area and location. See what comes back. This is what your potential clients see.

### 3. Start with schema markup

Even basic LocalBusiness schema on your homepage puts you ahead of 91% of the profession. It's the highest-impact, lowest-effort change you can make.

### 4. Ask for reviews

Email your last 20 satisfied clients with a direct link to your Google review page. Expected response rate: 25-40%. That's 5-8 reviews, which immediately puts you in a stronger position.

### 5. Structure your content

Take your most important practice area page. Rewrite it with specific services, target clients, locations served, and 5-10 FAQ entries. Use it as a template for the rest.

## Full Report

The complete dataset and methodology for this analysis are available to TendorAI subscribers. Starter and Pro subscribers receive regular AI visibility reports for their firm, including practice-area-specific benchmarking and improvement recommendations.

[Check your firm's AI visibility — free →](/aeo-report)
`,
  },
  {
    slug: 'ai-visibility-vs-seo-agencies',
    title: 'AI Visibility vs Traditional SEO: Why Your Business Needs Both in 2026',
    excerpt: 'Traditional SEO is no longer enough. With AI tools like ChatGPT and Gemini reshaping how buyers find suppliers, UK businesses need a new strategy. Here\'s how AI visibility works and what it means for your business.',
    category: 'AI & Visibility',
    readTime: 12,
    publishedDate: '2026-02-09',
    content: '',
  },
  {
    slug: 'photocopier-costs-uk-2026',
    title: 'How Much Does a Photocopier Cost in 2026? UK Pricing Guide',
    excerpt: 'A comprehensive breakdown of photocopier costs in the UK, including lease rates, CPC charges, and total cost of ownership for businesses.',
    category: 'Photocopiers',
    readTime: 8,
    publishedDate: '2026-02-01',
    content: `
## Understanding Photocopier Costs in the UK

If you're looking to get a photocopier for your UK business, you've probably discovered that pricing isn't straightforward. Unlike buying a laptop where you pay once and you're done, photocopiers come with ongoing costs that can vary dramatically between suppliers.

This guide breaks down exactly what you'll pay, based on real pricing data from over 1,000 suppliers across the UK.

## Lease Costs: What to Expect

Most UK businesses lease their photocopiers rather than buying outright. Here's what monthly lease payments typically look like:

### A4 Mono Devices (Small Office)
- **Entry-level (25-35ppm):** £25-£45/month
- **Mid-range (35-45ppm):** £40-£65/month
- **High-volume (45-55ppm):** £55-£85/month

### A3 Colour MFPs (Standard Office)
- **Entry-level (25-35ppm):** £45-£75/month
- **Mid-range (35-45ppm):** £65-£120/month
- **High-volume (45-60ppm):** £95-£180/month
- **Production (60-80ppm):** £150-£400/month

These figures assume a standard 5-year lease. Shorter terms (3-4 years) typically cost 15-25% more per month.

## Cost Per Copy (CPC) Rates

This is where most businesses get caught out. CPC rates cover toner, maintenance, and parts. Here's what UK suppliers currently charge:

### Mono (Black & White)
- **Budget suppliers:** 0.3p-0.5p per copy
- **Mid-market:** 0.5p-0.8p per copy
- **Premium service:** 0.8p-1.2p per copy

### Colour
- **Budget suppliers:** 2.5p-3.5p per copy
- **Mid-market:** 3.5p-5p per copy
- **Premium service:** 5p-7p per copy

**Key insight:** A difference of just 0.5p per copy on a 10,000 page/month machine equals £600/year. Over a 5-year lease, that's £3,000.

## Total Cost of Ownership Example

Let's look at a real-world example for a typical Cardiff office printing 8,000 pages/month (60% mono, 40% colour):

**Monthly Breakdown:**
- Lease: £89/month (Canon C5540i equivalent)
- Mono CPC: 4,800 pages × 0.5p = £24
- Colour CPC: 3,200 pages × 3.8p = £122
- **Total: £235/month**

**5-Year Total: £14,100**

Now compare a supplier charging higher CPC rates:
- Lease: £75/month (slightly cheaper)
- Mono CPC: 4,800 × 0.8p = £38
- Colour CPC: 3,200 × 5.5p = £176
- **Total: £289/month**

**5-Year Total: £17,340**

The "cheaper" lease ends up costing £3,240 more over 5 years. Always calculate total cost of ownership.

## Hidden Costs to Watch For

### Excess Usage Charges
Most contracts include a monthly page allowance. Exceed it, and you'll pay penalty rates—often 50-100% higher than your standard CPC.

### Minimum Volume Charges
Some suppliers charge a minimum monthly fee even if you print nothing. A £50/month minimum on a quiet month is money wasted.

### Consumables Not Included
Check if staples, hole-punch waste, and drum replacements are included. Some suppliers exclude these.

### Delivery and Installation
Should be free for new contracts, but some suppliers charge £100-£300.

### Training
Basic training should be included. Advanced workflow training might cost extra.

### End of Lease Charges
Collection fees, data wiping, and "fair wear and tear" charges can add £200-£500 at contract end.

## Lease vs Buy: Quick Comparison

| Factor | Lease | Buy |
|--------|-------|-----|
| Upfront cost | Low (first month only) | High (£3,000-£15,000) |
| Monthly cost | Fixed, predictable | Toner only |
| Maintenance | Included | Extra (£300-£800/year) |
| Cash flow | Preserves capital | Large initial outlay |
| Tax treatment | 100% OpEx deductible | CapEx depreciation |
| Technology refresh | Easy upgrade at end | Stuck with old machine |

For most SMEs, leasing makes more sense unless you have specific reasons to own the equipment.

## How to Get the Best Price

1. **Get multiple quotes.** Prices vary 30-50% between suppliers for identical machines.

2. **Negotiate CPC rates.** There's more margin here than on the lease. Ask for 10-15% off quoted rates.

3. **Check the small print.** Minimum volumes, excess charges, and contract length all matter.

4. **Consider local suppliers.** They often match national dealer prices but with better response times.

5. **Time your purchase.** End of quarter (March, June, September, December) often brings better deals.

## Next Steps

Ready to see what suppliers in your area are charging? Use our free comparison tool to get quotes from verified local suppliers—no obligation, no pressure.

[Compare photocopier quotes in your area →](/aeo-report?category=Photocopiers)
`,
  },
  {
    slug: 'copier-lease-vs-buy-uk',
    title: 'Copier Lease vs Buy: Which Is Better for UK SMEs?',
    excerpt: 'Should your business lease or purchase a photocopier? We break down the financial implications, tax benefits, and practical considerations.',
    category: 'Photocopiers',
    readTime: 7,
    publishedDate: '2026-01-28',
    content: `
## The Lease vs Buy Decision

Every business replacing their copier faces this question: should we lease or buy? There's no universal answer—it depends on your cash position, printing volume, tax situation, and how quickly you want to refresh technology.

Here's how to make the right choice for your business.

## The Case for Leasing

### Preserve Cash Flow
A mid-range A3 colour MFP costs £4,000-£8,000 to buy outright. Leasing spreads this over 3-5 years at £80-£150/month. For most SMEs, keeping that capital in the business makes sense.

### Predictable Monthly Costs
Lease agreements bundle the machine, maintenance, toner, and repairs into one fixed monthly payment. No surprises. If the machine breaks, it's the supplier's problem.

### Tax Advantages
Lease payments are 100% tax-deductible as an operating expense. You reduce your taxable profit by the full amount each year.

With purchasing, you claim capital allowances—currently 100% first-year allowances for most equipment under the Annual Investment Allowance (AIA). But if your profits are low, you might not benefit fully.

### Technology Refresh
Copier technology improves every 3-4 years. Leasing lets you upgrade at contract end without being stuck with outdated equipment you own.

### Included Maintenance
Lease agreements include all maintenance, parts, and toner (except paper). When you buy, you either pay for a separate maintenance contract (£300-£800/year) or handle repairs yourself.

## The Case for Buying

### Lower Total Cost (Sometimes)
If you print moderate volumes and keep equipment for 7+ years, buying can work out cheaper. But this assumes:
- Low repair costs (not guaranteed for older machines)
- Stable printing needs (no technology obsolescence)
- Disciplined toner purchasing (avoiding overpriced OEM cartridges)

### No Contract Lock-In
Lease contracts run 3-5 years with hefty early termination fees (typically 80% of remaining payments). Buying gives you flexibility to change suppliers or technology whenever you want.

### Asset Ownership
You own the equipment. It has residual value (though copiers depreciate quickly—a 5-year-old machine is worth 10-20% of its purchase price).

### Better for Very Low Volume
If you print under 1,000 pages/month, the minimum charges on most lease contracts make buying more economical.

## Financial Comparison

Let's compare a Canon imageRUNNER ADVANCE C5540i (mid-range A3 colour MFP) over 5 years, printing 5,000 pages/month:

### Leasing
- Monthly lease + CPC: £145/month
- **5-year total: £8,700**

### Buying
- Purchase price: £5,500
- Maintenance contract: £400/year × 5 = £2,000
- Toner costs (at typical CPC equivalent): £3,500
- **5-year total: £11,000**

In this example, leasing saves £2,300. But if you kept the purchased machine for 8 years, the maths shifts in favour of buying.

## Questions to Ask Yourself

### 1. What's your monthly print volume?
- Under 1,000 pages: Consider buying a smaller device
- 1,000-10,000 pages: Leasing usually wins
- Over 10,000 pages: Definitely lease—maintenance costs for high-volume purchased machines are unpredictable

### 2. How important is cash flow?
If preserving working capital matters, lease. If you have cash sitting idle, buying might make sense.

### 3. How long will you keep the machine?
- 3-5 years: Lease
- 7+ years: Consider buying (if you're disciplined about maintenance)

### 4. Do you want hassle-free operation?
Lease agreements include everything. When you own, you're responsible for maintenance contracts, toner purchasing, and repairs.

### 5. Is your business growing?
If printing needs might double in 2 years, lease. You can upgrade without being stuck with an undersized machine you own.

## The Hybrid Approach

Some suppliers offer "fair value" leases—you can buy the equipment at market value at contract end. This gives you the benefits of leasing (predictable costs, included maintenance) with the option to own if the machine still meets your needs.

## Our Recommendation

For most UK SMEs printing 2,000-15,000 pages/month, **leasing is the better choice**. The predictable costs, included maintenance, and technology refresh options outweigh the slightly higher total cost.

Buy only if:
- You print very low volumes (<1,000 pages/month)
- You have excess cash with no better use
- You specifically need to own the asset for accounting reasons

## Get Quotes for Your Situation

Not sure which option suits you? Local suppliers can quote both options so you can compare directly.

[Get lease and purchase quotes →](/aeo-report?category=Photocopiers)
`,
  },
  {
    slug: 'voip-vs-traditional-phone-systems',
    title: 'VoIP vs Traditional Phone Systems: What UK Businesses Need to Know',
    excerpt: 'With the PSTN switch-off approaching, UK businesses need to move to VoIP. Here\'s what you need to know about costs, features, and migration.',
    category: 'Telecoms',
    readTime: 9,
    publishedDate: '2026-01-25',
    content: `
## The UK Phone System Revolution

If your business still uses traditional landlines, you need to act. Openreach is switching off the Public Switched Telephone Network (PSTN) by December 2027. After that, traditional phone lines simply won't work.

This isn't a scare tactic—it's infrastructure reality. The copper network that's carried phone calls since the Victorian era is being retired. Everything moves to digital.

The good news? VoIP (Voice over Internet Protocol) phone systems are cheaper, more flexible, and packed with features that traditional systems can't match.

## How VoIP Works

Traditional phones send voice as electrical signals over copper wires. VoIP converts voice into data packets sent over your internet connection—the same way you'd stream a video or send an email.

You need:
- A reliable broadband connection (minimum 1Mbps per concurrent call)
- VoIP phones (desk phones or softphone apps)
- A VoIP provider (who routes your calls and provides features)

That's it. No expensive PBX hardware. No telephone engineer visits. No line rental to Openreach.

## Cost Comparison

### Traditional System (10 Users)
- PBX hardware: £2,000-£5,000
- Desk phones: £80-£150 each = £800-£1,500
- Line rental: £15-£25/line × 4 lines = £60-£100/month
- Call charges: £50-£150/month
- Maintenance: £200-£500/year
- **5-year total: £12,000-£20,000**

### VoIP System (10 Users)
- Hardware: £0 (use existing phones or softphones)
- IP desk phones (if wanted): £50-£100 each = £500-£1,000
- Monthly subscription: £8-£15/user = £80-£150/month
- Calls: Often included or heavily discounted
- Maintenance: £0 (cloud-managed)
- **5-year total: £5,000-£10,000**

VoIP typically costs 40-60% less than traditional systems.

## Features You Get with VoIP

### Standard Features (Usually Included)
- **Voicemail to email:** Missed calls sent as audio files to your inbox
- **Call forwarding:** Route calls to mobiles when out of office
- **Auto-attendant:** "Press 1 for Sales, 2 for Support..."
- **Call recording:** Essential for training and compliance
- **Hold music:** Professional image while customers wait
- **Call queues:** Manage busy periods without engaged tones
- **Video calling:** Built-in to most VoIP systems
- **Mobile apps:** Take your business line anywhere

### Advanced Features (Often Included or Low Cost)
- **CRM integration:** Caller info pops up automatically
- **Microsoft Teams integration:** One platform for calls and collaboration
- **Analytics:** See call volumes, wait times, missed calls
- **Call whisper:** Managers can coach staff during calls
- **IVR (Interactive Voice Response):** Sophisticated call routing

With traditional systems, many of these features require expensive add-ons or aren't available at all.

## The PSTN Switch-Off: What You Need to Know

### Timeline
- **Now:** Openreach has stopped selling new PSTN lines
- **September 2025:** Stop-sell on all legacy products
- **December 2027:** Full switch-off—PSTN lines stop working

### What's Affected
- Traditional landlines
- ISDN lines
- Alarm systems using phone lines
- Payment terminals using phone lines
- Fax machines (yes, some businesses still use them)

### What You Need to Do
1. Audit your current phone setup
2. Check your broadband can handle VoIP
3. Choose a VoIP provider
4. Port your numbers (you can keep existing numbers)
5. Install and test before switch-off

Don't wait until 2027. Providers will be overwhelmed with last-minute migrations. Act in 2026 to get proper support and avoid disruption.

## Choosing a VoIP Provider

### Key Questions to Ask
1. **What's included in the monthly fee?** Some providers charge extra for basic features.
2. **How reliable is the service?** Look for 99.9%+ uptime guarantees.
3. **Where's support based?** UK-based support resolves issues faster.
4. **Can I keep my numbers?** Number porting should be free.
5. **What hardware do I need?** Some providers work with any SIP phone; others lock you into their hardware.
6. **What's the contract length?** Monthly rolling is ideal; avoid 3+ year lock-ins.

### UK VoIP Providers to Consider
- **8x8:** Enterprise features, good Teams integration
- **RingCentral:** Popular for mid-sized businesses
- **3CX:** Flexible, can self-host
- **Gamma Horizon:** UK-focused, reliable
- **Vonage:** Good API integrations
- **Local providers:** Often better support and competitive pricing

## Common Concerns (And Reality)

### "What if the internet goes down?"
Modern VoIP systems can failover to mobile apps automatically. You can also add a 4G backup connection for critical businesses.

### "Call quality will be worse"
On decent broadband (50Mbps+), VoIP call quality matches or exceeds traditional lines. Issues only arise on very poor connections.

### "It's complicated to set up"
Cloud VoIP systems are plug-and-play. You can often self-install desk phones in minutes.

### "We'll lose our phone number"
Number porting is standard. Your existing number moves to VoIP seamlessly.

## Next Steps

The PSTN switch-off isn't optional. Every UK business needs to move to VoIP eventually—the only question is when.

Moving now means:
- Lower costs immediately
- Better features today
- No last-minute panic in 2027
- Proper time for staff training

[Compare telecoms suppliers in your area →](/aeo-report?category=Telecoms)
`,
  },
  {
    slug: 'average-cpc-rates-uk-2026',
    title: 'Average Cost Per Copy Rates in the UK 2026',
    excerpt: 'What should you be paying per print? We analyse CPC rates across UK suppliers to help you benchmark your contract.',
    category: 'Photocopiers',
    readTime: 6,
    publishedDate: '2026-01-20',
    content: `
## What Is Cost Per Copy?

Cost Per Copy (CPC)—sometimes called Cost Per Page or Click Charge—is the amount you pay for each page printed or copied. It covers toner, maintenance, and parts.

CPC is separate from your lease payment. A £60/month lease plus 0.5p mono CPC and 4p colour CPC means your total monthly bill depends on how much you print.

Understanding CPC rates is crucial because small differences compound dramatically over a contract term.

## 2026 UK Average CPC Rates

Based on analysis of pricing from 1,000+ suppliers across the UK:

### A4 Mono (Black & White)
| Tier | Rate | Who Pays This |
|------|------|---------------|
| Competitive | 0.3p-0.4p | High-volume contracts, good negotiators |
| Average | 0.5p-0.6p | Most SME contracts |
| High | 0.7p-1.0p | Low-volume contracts, poor deals |

### A4 Colour
| Tier | Rate | Who Pays This |
|------|------|---------------|
| Competitive | 2.5p-3.2p | High-volume contracts, good negotiators |
| Average | 3.5p-4.5p | Most SME contracts |
| High | 5p-7p | Low-volume contracts, poor deals |

### A3 Rates
A3 pages are typically charged at 2× the A4 rate. So 0.5p A4 mono = 1p A3 mono.

## What Affects Your CPC Rate?

### 1. Monthly Volume
Higher volumes = lower rates. A business printing 20,000 pages/month gets better rates than one printing 2,000.

| Monthly Volume | Typical Mono CPC |
|----------------|------------------|
| Under 2,000 | 0.7p-1.0p |
| 2,000-5,000 | 0.5p-0.7p |
| 5,000-10,000 | 0.4p-0.6p |
| 10,000-20,000 | 0.35p-0.5p |
| Over 20,000 | 0.3p-0.4p |

### 2. Colour Ratio
If you print mostly colour, suppliers may lower colour CPC but increase mono rates (or vice versa). Check your actual print mix.

### 3. Machine Type
Higher-end machines often come with lower CPC rates because they're more efficient and reliable.

### 4. Contract Length
Longer contracts (5 years vs 3 years) usually get better CPC rates. But you're locked in longer.

### 5. Negotiation
CPC rates have more margin than lease payments. Suppliers expect negotiation. Don't accept first-quoted rates.

## The Real Cost Impact

Let's see how CPC differences affect total cost for a business printing 8,000 pages/month (50% mono, 50% colour):

### Scenario A: Good Rates
- Mono: 4,000 × 0.4p = £16
- Colour: 4,000 × 3.2p = £128
- **Monthly CPC: £144**
- **Annual: £1,728**

### Scenario B: Average Rates
- Mono: 4,000 × 0.6p = £24
- Colour: 4,000 × 4.5p = £180
- **Monthly CPC: £204**
- **Annual: £2,448**

### Scenario C: Poor Rates
- Mono: 4,000 × 0.8p = £32
- Colour: 4,000 × 5.5p = £220
- **Monthly CPC: £252**
- **Annual: £3,024**

**Difference between good and poor: £1,296/year or £6,480 over 5 years.**

That's enough to lease a second machine.

## Red Flags in CPC Contracts

### Minimum Volume Charges
"Minimum 5,000 pages/month at quoted CPC rate." If you print less, you pay for 5,000 anyway. Fine if you consistently hit the minimum; expensive if you don't.

### Excess Rates
What happens if you exceed your allowance? Some contracts charge 50-100% more per page over the limit. Get this in writing.

### Colour Definition
Is "colour" any page with any colour, or only pages that are predominantly colour? A page with a small logo might be charged as colour. Check the terms.

### Excluded Items
Some contracts exclude staples, waste containers, or drum units. These "extras" add up.

### Annual Increases
Many contracts allow CPC increases tied to inflation. A 3% annual increase on 4p colour becomes 4.64p by year 5.

## How to Negotiate Better CPC Rates

1. **Know your actual volumes.** Check your current machine's page counter. Accurate data = leverage.

2. **Get multiple quotes.** The biggest leverage is a competitive offer from another supplier.

3. **Focus on total cost.** Some suppliers quote low lease + high CPC. Calculate total cost of ownership.

4. **Lock rates for the contract term.** Avoid annual increase clauses if possible.

5. **Ask about volume breaks.** "If we grow to 15,000 pages/month, does CPC drop?"

6. **Negotiate at renewal.** Suppliers are most flexible when you can walk away.

## Benchmarking Your Current Contract

If you have an existing copier contract, check your invoices for CPC rates. Compare against our averages:

| Your Rate | vs Average | Action |
|-----------|------------|--------|
| Below average | Good deal | Keep it, negotiate same at renewal |
| Average | Acceptable | Room for improvement at renewal |
| Above average | Overpaying | Get competitive quotes now |

Even mid-contract, knowing you're overpaying helps you plan for renewal and avoid auto-renewal traps.

## Get Competitive CPC Quotes

Want to see what suppliers in your area are charging? Our free quote comparison shows CPC rates alongside lease costs—so you can compare total cost of ownership.

[Compare CPC rates from local suppliers →](/aeo-report?category=Photocopiers)
`,
  },
  {
    slug: 'business-cctv-guide-uk',
    title: 'CCTV for Business: A Complete UK Guide',
    excerpt: 'Everything UK businesses need to know about CCTV systems, from legal requirements to costs and choosing the right technology.',
    category: 'CCTV',
    readTime: 10,
    publishedDate: '2026-01-15',
    content: `
## Why Businesses Need CCTV

CCTV isn't just about catching criminals after the fact. Modern systems provide:

- **Deterrence:** Visible cameras reduce theft, vandalism, and break-ins by 50-70%
- **Evidence:** High-quality footage for insurance claims and police investigations
- **Staff safety:** Monitoring lone workers, car parks, and high-risk areas
- **Operations insight:** See customer flow, queue lengths, and efficiency issues
- **Remote monitoring:** Check on premises from anywhere via smartphone
- **Insurance discounts:** Many insurers offer 5-15% premium reductions for CCTV

## UK Legal Requirements

Operating CCTV comes with legal obligations. Getting this wrong can result in fines up to £17.5 million under GDPR.

### ICO Requirements
The Information Commissioner's Office (ICO) sets rules for CCTV use:

1. **Legitimate purpose:** You must have a valid reason (security, safety, not staff spying)
2. **Signage:** Clear signs stating CCTV is in operation and who to contact
3. **Data protection:** Footage is personal data—treat it accordingly
4. **Proportionality:** Don't record more than necessary (e.g., don't point cameras at neighbours)
5. **Retention limits:** Only keep footage as long as needed (typically 30 days)
6. **Subject access:** Anyone recorded can request to see footage of themselves (respond within 1 month)

### Signage Requirements
Your CCTV signs must include:
- Statement that CCTV is in use
- Purpose of recording
- Contact details for the data controller
- Organisation name if not obvious

Generic "CCTV in operation" signs without contact details don't meet requirements.

### Staff Monitoring
Recording employees is permitted for legitimate purposes (theft prevention, safety) but:
- Staff must be informed
- You can't record private areas (toilets, changing rooms)
- Audio recording has stricter rules—often not permitted without explicit consent

## Types of CCTV Systems

### Analogue vs IP Cameras

**Analogue (Traditional)**
- Lower resolution (typically up to 1080p)
- Requires coaxial cabling
- Cheaper upfront
- Limited features
- Being phased out

**IP (Network) Cameras**
- High resolution (2K, 4K, 8K available)
- Uses network cabling (CAT5e/CAT6) or WiFi
- Advanced features (analytics, search, integration)
- Higher initial cost but better long-term value
- The modern standard

**Recommendation:** Always choose IP cameras for new installations. The quality and feature difference is substantial.

### Camera Types

**Bullet Cameras**
- Cylindrical shape, usually weatherproof
- Good for outdoor perimeter monitoring
- Visible deterrent
- Fixed viewing angle

**Dome Cameras**
- Discrete ceiling-mounted design
- Good for indoor use
- Harder to tell which direction they're pointing
- Vandal-resistant options available

**PTZ Cameras (Pan-Tilt-Zoom)**
- Remotely controllable direction and zoom
- Can follow movement
- Cover large areas
- Higher cost, best for key locations

**Turret Cameras**
- Ball-and-socket mount for flexible positioning
- Good balance of features and cost
- Popular for general-purpose use

### Recording Options

**NVR (Network Video Recorder)**
- On-premise box stores footage locally
- One-time hardware cost
- You control the data
- Requires physical security and maintenance
- Typical storage: 2-8TB (2-4 weeks of footage)

**Cloud Recording**
- Footage stored in the cloud
- Monthly subscription fee
- Access from anywhere
- Provider handles security and redundancy
- No hardware to maintain
- Higher long-term cost

**Hybrid**
- Local NVR plus cloud backup
- Best of both worlds
- Redundancy if on-site recorder is stolen/damaged

## Typical Costs

### Small Business (4-8 Cameras)
- **IP cameras:** £100-£250 each = £400-£2,000
- **NVR:** £200-£500
- **Installation:** £500-£1,500
- **Cabling:** Included or £50-£100 per camera
- **Total:** £1,500-£4,500

### Medium Business (8-16 Cameras)
- **IP cameras:** £100-£300 each = £800-£4,800
- **NVR:** £400-£1,000
- **Installation:** £1,500-£4,000
- **Total:** £3,500-£12,000

### Large/Complex Sites (16+ Cameras)
- Bespoke pricing based on requirements
- Typically £10,000-£50,000+
- Often includes analytics, access control integration

### Ongoing Costs
- **Maintenance:** £100-£500/year (cleaning, checks, firmware updates)
- **Cloud storage (if used):** £5-£20/camera/month
- **Monitoring service (if used):** £50-£500/month

## Key Features to Consider

### Resolution
- **1080p (Full HD):** Minimum acceptable standard
- **2K (1440p):** Good balance of quality and storage
- **4K (2160p):** Excellent detail, ideal for facial recognition, uses more storage
- **Higher resolutions:** Rarely necessary for most businesses

### Night Vision
- **Infrared (IR):** Standard night vision, black & white footage
- **Starlight/Low-light:** Better colour reproduction in dim conditions
- **Supplemental lighting:** White light cameras deter intruders but may disturb neighbours

### Storage Calculation
Rule of thumb: 1TB stores roughly 8-10 days of footage from 4× 1080p cameras at 15fps.

For 4K cameras or higher frame rates, multiply storage needs by 4×.

### Smart Features
Modern IP cameras offer:
- **Motion detection:** Only record when something moves
- **Line crossing:** Alert when someone crosses a virtual boundary
- **Facial recognition:** Identify known individuals
- **Number plate recognition:** Track vehicles
- **Object detection:** Distinguish people, vehicles, animals
- **Searchable footage:** Find "person wearing red" without watching hours of video

## Choosing an Installer

### Questions to Ask
1. Are you NSI or SSAIB accredited? (Industry standards)
2. Do you offer a maintenance contract?
3. What warranty do you provide?
4. Can I access footage remotely?
5. What happens if the system fails—what's your response time?
6. Do you provide training on using the system?
7. Will you help with ICO compliance (signage, documentation)?

### Red Flags
- No accreditation
- Pushing proprietary systems that lock you in
- No maintenance options
- Vague answers on data retention and access
- Pressure to buy more cameras than you need

## Installation Checklist

1. **Site survey:** Professional assessment of coverage needs
2. **Camera positions:** Cover entry points, high-value areas, blind spots
3. **Lighting:** Consider existing lighting and camera capabilities
4. **Cabling routes:** Plan neat, hidden cable runs
5. **Recorder location:** Secure, ventilated, accessible for maintenance
6. **Power:** Cameras need power—PoE (Power over Ethernet) simplifies installation
7. **Network:** Ensure bandwidth for viewing and cloud backup
8. **Signage:** Order compliant signs before installation
9. **Training:** Know how to use the system before the installer leaves
10. **Documentation:** Retain system details, passwords, and data protection documentation

## Get CCTV Quotes

Ready to protect your premises? Get quotes from verified CCTV installers in your area.

[Compare CCTV suppliers →](/aeo-report?category=CCTV)
`,
  },
  {
    slug: 'switching-office-equipment-suppliers',
    title: 'How to Switch Office Equipment Suppliers Without Disruption',
    excerpt: 'A practical guide to changing your copier, telecoms, or IT supplier—minimising downtime and avoiding common pitfalls.',
    category: 'Business Tips',
    readTime: 7,
    publishedDate: '2026-01-10',
    content: `
## When to Consider Switching

You don't need to wait for contract end to evaluate your options. Start looking if:

- **Service has declined:** Slow response times, unresolved issues, missed SLAs
- **Costs have crept up:** Annual increases, excess charges, hidden fees
- **Technology is outdated:** Your equipment no longer meets business needs
- **Business has changed:** You've grown, shrunk, or relocated
- **Better options exist:** Competitors offer more for less
- **Communication is poor:** Can't reach your account manager, nobody knows your setup

## 6 Months Before Contract End

### Step 1: Audit Your Current Setup

**Document everything:**
- Contract end date (check auto-renewal clauses!)
- Current monthly costs (lease, CPC, line rental, subscriptions)
- Equipment serial numbers and locations
- Actual usage (page counts, call volumes, data usage)
- Pain points and feature gaps
- Support ticket history

**Calculate true cost of ownership:**
Don't just look at the headline figure. Include:
- Monthly recurring charges
- Overage fees
- Service call costs (if any)
- Staff time dealing with issues

### Step 2: Check Your Contract Terms

**Auto-renewal clauses:**
Many contracts auto-renew for another term (often 12 months) if you don't give notice. Common notice periods are 90 days.

**Early termination:**
If you want to leave mid-contract, you'll typically owe 80-100% of remaining payments. Sometimes negotiable if moving to a better deal.

**Equipment return:**
Who pays for collection? Is there a "fair wear and tear" clause that could trigger charges?

**Data/content:**
For telecoms/IT: Who owns your phone numbers? Email archives? How do you get your data back?

## 3 Months Before Contract End

### Step 3: Get Competitive Quotes

**What to include in your RFQ:**
- Current equipment/services
- Actual usage data
- Pain points to solve
- Nice-to-have features
- Locations and users
- Contract length preferences

**Get at least 3 quotes:**
Prices vary 30-50% between suppliers for similar solutions. The effort pays off.

**Compare like-for-like:**
Make sure all quotes include the same scope. One supplier's "all-inclusive" might exclude items another includes.

### Step 4: Negotiate with Your Incumbent

Armed with competitive quotes, approach your current supplier:

"Our contract is ending in 3 months. I've received quotes from [competitors] that offer [better price / better features / better service]. What can you do to retain our business?"

Often, suppliers offer their best deals to prevent churn. But only negotiate if you're genuinely open to staying—burning bridges helps no one.

## 1 Month Before Contract End

### Step 5: Plan the Transition

**Agree transition dates:**
- Old service end date
- New service start date
- Overlap period (recommended: 1-2 weeks)

**Coordinate both suppliers:**
The new supplier handles installation. The old supplier handles removal. Make sure they're not scheduled for the same time.

**Plan for downtime:**
Even with careful planning, expect some disruption:
- Copiers: 1-2 hours for swap (often can be done outside hours)
- Telecoms: 1-4 hours for number porting (can sometimes be seamless)
- IT systems: Varies widely—could be weekends or phased migration

### Step 6: Handle the Details

**For copiers:**
- Retrieve any documents left in scanner/print trays
- Note current page counts for final billing
- Get data wiped from hard drives (ask for certificate)
- Return all accessories (staple cartridges, paper trays)

**For telecoms:**
- Port your numbers (start this early—can take 10-30 days)
- Update any systems that use your old numbers
- Inform key contacts of any number changes
- Set up call forwarding during transition if needed

**For IT:**
- Data migration and verification
- User account setup
- Integration testing
- Staff training on new systems

## Go-Live Day

### What to Expect

**Before the switch:**
- Final backup of everything
- Staff briefed on what's happening
- Key contacts have mobile numbers for emergencies

**During the switch:**
- Be available for decisions
- Test everything before signing off
- Don't let the old supplier leave until the new system works
- Document any issues

**After the switch:**
- Monitor closely for first 2 weeks
- Collect staff feedback
- Address teething problems promptly
- Confirm old service is cancelled (check for zombie charges)

## Common Pitfalls and How to Avoid Them

### 1. Missing the Notice Window
**Problem:** Auto-renewal kicks in because you missed the 90-day notice.
**Solution:** Calendar reminders 6 months and 90 days before contract end.

### 2. Losing Your Phone Numbers
**Problem:** Numbers can't be ported, or there's a gap in service.
**Solution:** Start porting process 30+ days early. Confirm numbers are portable before signing.

### 3. Data Loss During Migration
**Problem:** Emails, files, or system data lost in transition.
**Solution:** Full backup before migration. Verify data after migration. Keep backup for 30 days.

### 4. Underestimating Downtime
**Problem:** "It'll only take an hour" becomes a full day.
**Solution:** Plan for worst case. Schedule changes for quiet periods. Have contingency plans.

### 5. Hidden Termination Costs
**Problem:** "Fair wear and tear" charges, data extraction fees, early termination penalties.
**Solution:** Review contract carefully. Get termination costs in writing before giving notice.

### 6. Comparing Apples to Oranges
**Problem:** New quote looks cheaper but excludes things the old contract included.
**Solution:** List every item in current contract. Verify each is covered in new quote.

## Get Started

Ready to explore your options? Whether your contract is ending soon or you're just curious about what's available, getting quotes is free and no-obligation.

[Compare suppliers in your area →](/aeo-report)
`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'All') return articles;
  return articles.filter(a => a.category === category);
}

export const articleCategories = ['All', 'AI Visibility', 'Legal', 'How-To', 'Tools', 'Financial', 'Research', 'AI & Visibility', 'Photocopiers', 'Telecoms', 'CCTV', 'IT', 'Business Tips'] as const;
