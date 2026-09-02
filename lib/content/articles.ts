export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Photocopiers' | 'Telecoms' | 'CCTV' | 'IT' | 'Business Tips' | 'AI & Visibility' | 'AI Visibility' | 'Research' | 'Legal' | 'Tools' | 'How-To' | 'Financial' | 'AI Visibility Strategy';
  author?: string;
  readTime: number;
  publishedDate: string;
  content: string;
  href?: string;
  // Optional structured FAQs. When present, the /resources/[slug] renderer
  // appends an expandable FAQ section after the main content and emits
  // FAQPage JSON-LD. Keep one source of truth — don't also duplicate
  // Q&A inside `content`.
  faqs?: ArticleFaq[];
  // Optional override for meta / OG description (default: excerpt).
  metaDescription?: string;
  // Optional last-updated date (default: publishedDate). Drives an
  // "Updated [date]" label and the Article.dateModified JSON-LD property.
  updatedDate?: string;
  // Optional additional JSON-LD blocks emitted as separate <script> tags
  // after the renderer's auto-generated Article + BreadcrumbList + FAQPage.
  // Use for richer Article augmentation (alternativeHeadline, mentions,
  // about, keywords, isAccessibleForFree, image) — match mainEntityOfPage
  // @id to the canonical so search engines merge with the auto-Article.
  extraJsonLd?: Record<string, unknown>[];
  // Optional flag promoting the article to the top of /resources.
  // Featured articles are listed first; remaining articles are sorted by
  // publishedDate desc.
  featured?: boolean;
}

export const articles: Article[] = [
  // ─── EXP-002 (study_2026_07_exp002) ───────────────────────────────
  // Twelve posts, six matched pairs. Each pair asks a comparable question;
  // the "a" post opens with an answer-first paragraph plus a 3-5 bullet
  // summary (TREATMENT), the "b" post opens with a conventional narrative
  // intro (CONTROL). Body structure is matched pair-by-pair below the
  // opening. Do not add featured: true on these — they need to enter the
  // listing as ordinary entries so the experiment isn't biased by
  // promotion. Nothing is invented; where the honest answer is
  // "nobody knows", the copy says exactly that.
  //
  // ─── PAIR 1 ────────────────────────────────────────────────────────
  {
    slug: 'do-review-sites-affect-ai-recommendations',
    title: 'Do client review sites like ReviewSolicitors affect AI recommendations?',
    excerpt: 'ReviewSolicitors profiles appear in some AI citations, but a direct effect on recommendations is unproven. Here is what is actually known, what is uncertain, and what to do about it.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'ReviewSolicitors profiles appear in some AI citations, but a direct effect on recommendations is unproven. Here is what is actually known and what is uncertain.',
    content: `There is no verified public evidence that ChatGPT, Perplexity, Claude or Gemini use ReviewSolicitors ratings as a direct input to firm recommendations. The likely effect is indirect: reviews reinforce third-party mentions of the firm, which the assistants already sample when they need to disambiguate a name.

- The frontier AI assistants have not published a source list for firm recommendations, so any claim that a specific review platform is a ranking signal is inference rather than fact.
- ReviewSolicitors, Trustpilot and Google reviews appear in AI responses mostly as sources cited alongside a recommendation rather than as the reason for it.
- The defensible move is to keep review-site profiles accurate and complete, not to chase a particular rating threshold.

## What we actually know

Public research on how ReviewSolicitors influences AI recommendations is essentially non-existent. No frontier assistant has published a documented source list; the picture is assembled from what people can see the assistants cite.

What we can see: when ChatGPT or Perplexity recommends a solicitor, ReviewSolicitors profiles do appear as cited URLs in some replies. That is different from saying the ranking was driven by the ratings on those profiles.

Solicitors with a rich general web footprint tend to be recommended whether or not their ReviewSolicitors profile is strong. Firms with a thin footprint often see ReviewSolicitors appear as one of the few available references.

## What the assistants seem to weigh

Recency and depth of independent mentions tend to matter more than star ratings on any single platform. A firm with recent, substantive reviews will be easier for an assistant to summarise than one with the same average score but no written reviews.

Consistency between the firm's own site, the SRA register and the ReviewSolicitors listing appears to help. When the assistants encounter conflicting company names or office locations across sources they often decline to recommend.

Reviewer text is more useful to an assistant than the star number itself, because the text is what the model can quote.

## Why the answer is honestly uncertain

No public benchmark tracks how removing or adding a ReviewSolicitors profile changes AI recommendations for the same firm. Without controlled tests, all we have are observations of what appears in responses, and those responses vary from one query to the next.

Assistants change how they source information without notice. A source that was influential in April 2026 may be weighted differently by August.

Correlation is easy to confuse with cause: firms that invest in review management usually also invest in the website, PR and directory work that the assistants read directly.

## What to do if you want to influence it

Claim your ReviewSolicitors profile, keep the company name and SRA number identical to your website and the SRA register, and reply to reviews.

Encourage recent clients to leave a written review, not just a star rating — the text is what an assistant can extract.

Fix any name or address mismatches across your ReviewSolicitors, Google Business Profile and SRA register entries before spending anything on rating improvement.

Treat reviews as one of several third-party signals rather than the signal. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What is probably not worth chasing

Trying to hit a specific ReviewSolicitors star average with the aim of moving up an AI leaderboard. No public leaderboard is known to exist.

Removing a profile because the score is low — an assistant can still cite a low-rated profile if the alternative is no verifiable source at all.

Sponsored placements on any review site as a shortcut. Assistants can and do cite non-sponsored organic entries; sponsored slots are not obviously read differently.

## How this differs from a traditional Google ranking

With Google, a review profile on Google itself or on ReviewSolicitors fed the ranking through a fairly short chain: stars were counted, aggregated into a score, and that score sat among the many factors the algorithm weighed. Crude, but dependable, and the body of SEO advice built on top of it has held together since roughly 2018.

Assistants operate on a different principle. When one of them cites a review platform, it is not tallying stars anywhere in the response; it is either lifting phrasing from a reviewer or listing the platform among the sources that corroborate what it says. Nothing in a language model's answer plays the role that an aggregate review score plays in a Google local pack.

That distinction has budget consequences. Plenty of firms still pour effort into methods built for the older signal: soliciting reviews in bulk, automating the request, chasing the star count. Each may earn its keep as marketing in its own right, but it does not carry across to AI recommendation one for one, and it is worth knowing which assumption your current spending rests on.

## How to test the picture for your own firm

Put the same question to ChatGPT, Perplexity and Gemini weekly across four weeks. Shift the wording a little each time: "solicitor in [city]", "law firm in [area]", "personal injury solicitor near [postcode]". Keep a record of which firms get named, which URLs are cited, and whether the review source you care about turns up at all.

A review profile that appears among the citations while your firm goes unnamed tells you the profile is reachable but is not carrying the decision by itself. If neither shows up, check that your contact details match across the SRA register, your Google Business Profile and your own site; a mismatch there is usually the first thing worth fixing.

Four weeks is enough to average out day-to-day sampling variance and to notice whether something structural at the assistant end has moved your visibility. Run it longer if you can, but four weeks is the shortest sample that tells you anything.

## Where this is likely to change next

Negotiations between review platforms and assistant providers over direct data feeds are under way. Should any of them be announced, this picture could shift quickly: a platform with a sharing agreement would presumably find its profiles cited more reliably than one without. As of mid-2026 no such arrangement is known to have been concluded.

The second thing to watch is source disclosure. Perplexity got there first and displays citations as standard, while ChatGPT and Gemini surface them less consistently. Better disclosure across all three would make it far easier to distinguish a review platform that genuinely shapes the recommendation from one that merely appears beside it.

## Signals that tend to hold their value

However the review-platform picture develops, three signals shift slowly enough to justify the investment.

Correct regulator data, meaning your SRA number, FCA reference number, ICAEW firm number or Propertymark number as held on the relevant register. The register is where your firm's identity and permissions are authoritatively recorded, and it seldom changes.

A trading name and contact details that agree wherever they appear: your own site, your Google Business Profile, and any regulator or sector directory. Where they disagree, the usual result is a hedged answer ("this firm may operate under different names") rather than the firm being left out altogether.

A steady trickle of recent independent mentions: a trade press quote a few times a year, a local publication write-up, a case study hosted by a partner. None need be paid placements; recency and independence are what count.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Does the ReviewSolicitors star average affect AI recommendations?',
        answer: 'No public evidence confirms it does or does not. Star ratings appear alongside firm names in some AI responses, but no controlled test has shown that changing the star average alone shifts recommendations.',
      },
      {
        question: 'Should I remove a ReviewSolicitors listing if the rating is poor?',
        answer: 'Usually not. Assistants tend to cite whichever verifiable source they have; removing a listing does not remove the underlying reviews and can reduce the number of independent references pointing at your firm.',
      },
      {
        question: 'Are Google reviews more important than ReviewSolicitors reviews?',
        answer: 'Nobody knows for certain. Both platforms surface in AI responses. Consistency across all your third-party listings appears to matter more than which single platform you prioritise.',
      },
    ],
  },
  {
    slug: 'do-google-reviews-affect-chatgpt-recommendations',
    title: 'Do Google reviews affect whether ChatGPT recommends your firm?',
    excerpt: 'A conventional look at how Google reviews interact with ChatGPT recommendations for UK regulated firms in 2026, what is known, and what remains uncertain.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'How Google reviews interact with ChatGPT recommendations for UK regulated firms: what is known, what is uncertain, and what a firm can act on in 2026.',
    content: `Every regulated firm we work with wants a simple answer to this question. Google reviews are the most visible reputation signal a firm has, and they are the signal firms are asked about most often — both by prospective clients and now by AI assistants like ChatGPT.

It would be convenient if the effect was straightforward, and unfortunately it is not. The way ChatGPT sources information about a firm has changed several times in the last eighteen months, and the way it sources reputation information has changed with it. That leaves solicitors, accountants, mortgage advisers and estate agents trying to decide how much effort to put into a Google reviews programme without a settled answer. This piece works through what is actually known about the relationship between Google reviews and ChatGPT recommendations, what remains genuinely uncertain, and what a reasonable UK firm can act on in 2026.

## What we actually know

Public research on how Google reviews influence ChatGPT recommendations is essentially non-existent. OpenAI has not published a documented source list for its recommendation behaviour; the picture is assembled from what people can see the model cite.

What we can see: when ChatGPT recommends a UK firm, Google Business Profile entries and Google review text do appear as cited URLs in some replies. That is different from saying the ranking was driven by the star rating.

Firms with a rich general web footprint tend to be recommended whether or not their Google reviews are strong. Firms with a thin footprint often see the Google Business Profile appear as one of the few available references.

## What the assistants seem to weigh

Recency and depth of written reviews tend to matter more than the aggregate star number. A firm with recent, substantive review text will be easier for ChatGPT to summarise than one with the same average score but no written content.

Consistency between the firm's own site, the relevant regulator record and the Google Business Profile appears to help. When the assistant encounters mismatched company names or office locations across sources it often declines to recommend.

The words reviewers use, not the number of stars, is what a language model can quote.

## Why the answer is honestly uncertain

No public benchmark tracks how adding or hiding a Google Business Profile changes ChatGPT recommendations for the same firm. Without controlled tests, all we have are observations of what appears in responses, and those responses vary from one query to the next.

Assistants change how they source information without notice. A source that was influential in April 2026 may be weighted differently by August.

Correlation is easy to confuse with cause: firms that invest in Google review management usually also invest in website, PR and directory work that the assistant reads directly.

## What to do if you want to influence it

Claim and complete your Google Business Profile, keep the company name and regulator number identical to your website and regulator record, and reply to reviews.

Encourage recent clients to leave a written review, not just a star rating — the text is what the assistant can extract.

Fix any name or address mismatches across your Google Business Profile, sector-specific review sites and regulator entries before spending anything on rating improvement.

Treat reviews as one of several third-party signals rather than the signal. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What is probably not worth chasing

Trying to hit a specific Google star average with the aim of moving up an AI leaderboard. No public leaderboard is known to exist.

Hiding or removing a Google Business Profile because the score is low — the assistant can still cite the profile and removing it can reduce the number of independent references pointing at your firm.

Sponsored Google placements as a shortcut. ChatGPT and other assistants can and do cite non-sponsored organic entries; sponsored slots are not obviously read differently.

## How this differs from a traditional Google ranking

A Google review or ReviewSolicitors profile fed into a search ranking in a fairly direct way: the algorithm counted stars, aggregated them, and used them as one of many ranking factors. The signal was crude but stable, and the SEO literature that grew up around it has been remarkably consistent since about 2018.

AI assistants do not work like that. Even when they cite a review platform, the assistant is not counting the stars in the response — it is either quoting reviewer text or naming the platform as one of several corroborating sources. There is no aggregate "review score" component in a language model's response the way there is in a Google local pack.

This matters because a lot of firm marketing energy is still spent on tactics that were designed for the old signal — bulk review solicitation, review-request automation, star-count optimisation. Those tactics still have marketing value on their own terms, but the transfer to AI recommendation is not one-for-one, and firms should decide how much of the current budget rests on which assumption.

## How to test the picture for your own firm

Run the same query in ChatGPT, Perplexity and Gemini once a week for four weeks. Vary the phrasing slightly — "solicitor in [city]", "law firm in [area]", "personal injury solicitor near [postcode]". Log the firms named, the URLs cited and whether the review source you care about appears.

If the review profile shows up in the citation list but your firm is not named in the response, that is a signal the profile is reachable but not decisive on its own. If neither appears, look at whether the SRA register, Google Business Profile and firm website carry consistent contact details — usually a mismatch is the first thing to fix.

A four-week window is enough to filter out day-to-day sampling variance and see whether structural changes at the assistant level have shifted your visibility. Longer is better if you can commit to it, but four weeks is the shortest useful sample.

## Where this is likely to change next

Review platforms are actively negotiating with AI assistants for direct data feeds. If those arrangements go public, the current picture could change quickly — a platform with a data-sharing deal would presumably see its profiles cited more consistently than one without. None of these arrangements is known to be in place as of mid-2026.

The other likely change is in how assistants disclose their sources. Perplexity has moved earliest on this and shows citations by default; ChatGPT and Gemini surface them more variably. If disclosure improves across the board, it will become easier to tell whether a specific review platform is genuinely influencing the recommendation or just being cited alongside it.

## Signals that tend to hold their value

Regardless of how the review-platform picture evolves, three signals appear to move slowly enough to be worth investing in.

Accurate regulator data — the SRA number, FCA reference number, ICAEW firm number or Propertymark number on the relevant regulator's register. It is the authoritative record of your firm's identity and permissions, and it changes slowly.

Consistent trading name and contact details across your website, Google Business Profile and any regulator or sector directory. Discrepancies show up as hedged responses ("this firm may operate under different names") more often than they show up as outright omissions.

A modest supply of recent third-party mentions — a trade press quote every few months, a mention in a local publication, a case study on a partner site. None of these need be paid placements; what matters is that they are recent and independent.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Does the Google star average affect ChatGPT recommendations?',
        answer: 'No public evidence confirms it does or does not. Star ratings appear alongside firm names in some AI responses, but no controlled test has shown that changing the average alone shifts recommendations.',
      },
      {
        question: 'Should I hide a Google Business Profile if the rating is poor?',
        answer: 'Usually not. Assistants tend to cite whichever verifiable source they have; hiding a profile does not remove the underlying reviews and can reduce the number of independent references pointing at your firm.',
      },
      {
        question: 'Are Google reviews more important than sector-specific review sites?',
        answer: 'Nobody knows for certain. Both surface in AI responses. Consistency across all your third-party listings appears to matter more than which single platform you prioritise.',
      },
    ],
  },
  // ─── PAIR 2 ────────────────────────────────────────────────────────
  {
    slug: 'can-chatgpt-recommend-a-firm-with-no-website',
    title: 'Can ChatGPT recommend a firm that has no website?',
    excerpt: 'Yes, but rarely, and usually only when the regulator directory, a Google Business Profile and independent mentions together make the firm unambiguous. Here is how that works.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'Yes, ChatGPT can recommend a firm with no website — but only when third-party sources make the firm unambiguous. Here is what has to be in place.',
    content: `Yes, but rarely, and usually only when strong third-party sources make the firm unambiguous. ChatGPT can recommend a firm with no website when the regulator directory, a Google Business Profile and independent mentions together give the assistant enough to name the firm confidently.

- Regulator listings (SRA, FCA, ICAEW, Propertymark) are the most reliable substitute for a website, because they carry a stable identifier the assistant can pin the recommendation to.
- Firms without a website but with an active Google Business Profile and directory presence are still cited in responses, most often when the query is location-specific.
- Firms with neither a website nor a full regulator profile are effectively invisible to ChatGPT, regardless of how well known they are locally.

## What we actually know

ChatGPT can and does name firms that do not run a public website, provided the assistant can find enough consistent references elsewhere to identify the firm.

The pattern is more common with solicitors and accountants than with estate agents, because the regulator directories are more complete for the former.

No published research documents the exact tipping point at which a firm becomes citable without a website. Observations suggest it depends heavily on the density of the alternative sources.

## Where the assistant looks when there is no website

The regulator's own register is usually the first stable source: the SRA register for solicitors, the FCA register for mortgage advisers, ICAEW's find-a-chartered-accountant for accountants, and Propertymark for estate agents.

Google Business Profile fills in trading name, address, phone and category — the sort of information a website would normally provide.

Independent mentions in local press, sector directories and review sites add depth. Even a single trade press quote can be enough to make a firm citable when combined with the regulator record.

## Why the answer is not a flat no

Assistants are designed to reach past the obvious page and combine what they can find. A missing website is not a fatal signal on its own; it is one absent source among many.

The evidence bar the assistant applies to a recommendation is not "does this firm have a homepage" but "can I state the name, address and service with confidence". Regulator plus Google Business Profile often clears that bar for a solicitor or accountant.

Some firms deliberately run without a website — small chambers, sole practitioners, referral-only practices. The assistant does not treat that as illegitimate.

## What breaks the recommendation

Any inconsistency across the regulator record, Google Business Profile and directory listings is much more damaging without a website. There is no homepage to act as tiebreaker.

A dormant or partial regulator profile — firm registered but missing services or address — often produces a hedge ("this firm exists but I do not have current information") rather than a recommendation.

Absence of contact details on any source. If the assistant cannot tell a client how to reach the firm it will usually decline to recommend it. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What to do if you have no site and want to be found

Treat the regulator profile as your primary listing. Fill every field: office address, services, languages, accessibility.

Claim the Google Business Profile and keep the trading name identical to the regulator record.

Get listed in the two or three most relevant sector directories, verified with the same trading name.

Consider a single one-page site as a low-cost tiebreaker; a static page with your regulator number and service list often lifts recommendation rates because it gives the assistant one more consistent source.

## How this differs from a traditional Google presence

Whether a firm showed up in Google came down almost entirely to one thing: could Googlebot fetch and index the site. If it could not, the firm was to all intents absent from search. That is the origin of the instinct behind both the crawler-blocking and the no-website question. No crawler, no data, no visibility.

Assistants are far less tied to any one crawler. With GPTBot blocked, or with no site in existence, an assistant can still assemble a workable picture from regulator records, a Google Business Profile, sector directories and mentions elsewhere.

The distinction matters because most crawler and no-website guidance circulating in mid-2026 is written in Googlebot-era language. "Let the crawler in or vanish" holds up well for Google search and largely does not for AI recommendation. Treat them as two questions before making a decision that costs money or creates legal exposure.

## How to test the picture for your own firm

Ask ChatGPT, Perplexity and Gemini about a firm type and location matching your own practice: "conveyancing solicitor in Nottingham", "residential mortgage adviser in Southampton", "letting agent in Sheffield". Repeat weekly for a month, nudging the phrasing each time, and record the firms named and the URLs cited.

Then run the same queries against firms you know to be thin on the web. A local sole practitioner, one with no site, one that has lately blocked AI crawlers. Set the two sets of citations side by side and compare them.

You are not testing whether your own visibility is where you would like it to be. You are watching how the assistants behave when sources are scarce. A month filters out ordinary sampling variance and lets the pattern show.

## Where this is likely to change next

Crawler policy, hosting arrangements and consent frameworks are all in flux. If the industry settles on a common opt-out signal, something finer-grained than robots.txt, what counts as readable will be redrawn. As of mid-2026 there is no agreement on what such a standard would even look like.

The second thing worth watching is how assistants treat firms with genuinely sparse web presence. Every one of them currently hedges or omits when its sources conflict; were any to begin filling those gaps from proprietary data, the question of whether you need a website would look rather different.

## Signals that tend to hold their value

Whatever happens to crawler and hosting policy, three signals move slowly enough to deserve the investment.

Regulator data that is accurate: the SRA number, FCA reference number, ICAEW firm number or Propertymark number recorded on the appropriate register. A register entry is the authoritative statement of who your firm is and what it is permitted to do.

Trading name and contact details that match across every surface, including the firm's own website, its Google Business Profile, and any regulator or sector directory. Mismatches more often produce a hedged answer than they produce a firm being dropped entirely.

A modest, continuing stream of independent third-party mentions: an occasional quote in the trade press, a write-up locally, a case study on a partner's site. Recency and independence are the qualities that matter.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Does ChatGPT recommend firms based only on the SRA register?',
        answer: 'Sometimes, but usually only when other sources agree with the register. A regulator record alone rarely produces a confident recommendation without at least one supporting citation.',
      },
      {
        question: 'If I take my website offline for a redesign will I disappear from ChatGPT immediately?',
        answer: 'Not usually. Assistants sample cached and third-party sources, so the effect is gradual. A redesign that lasts weeks rather than months is unlikely to move your recommendation rate much.',
      },
      {
        question: 'Is a one-page site enough?',
        answer: 'For many firms, yes. What matters is that the name, address and regulator number match the regulator record exactly.',
      },
    ],
  },
  {
    slug: 'does-blocking-gptbot-make-your-firm-invisible-to-chatgpt',
    title: 'Does blocking AI crawlers like GPTBot make your firm invisible to ChatGPT?',
    excerpt: 'A working-through of what blocking GPTBot in robots.txt actually does, what it does not do, and whether the trade-off is worth thinking about for a UK regulated firm in 2026.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'What blocking GPTBot in robots.txt actually does, what it does not do, and whether it is worth reconsidering the block for a UK regulated firm in 2026.',
    content: `Since OpenAI published documentation for GPTBot in August 2023, UK firms have been asking a variation of the same question: if we block that crawler in robots.txt, do we disappear from ChatGPT? The framing feels intuitive — no crawler, no data, no recommendation.

But the way ChatGPT actually assembles information about a firm is more layered than a single crawler visiting the homepage, and the answer to the crawler-blocking question is bound up in that architecture. It also matters that the crawler landscape has widened considerably since 2023; there is now Perplexity's crawler, Anthropic's, Google's AI-specific crawlers, and various third-party scrapers whose data feeds back into public models. This piece walks through what blocking a crawler like GPTBot actually does, what it does not do, and whether the trade-off is worth thinking about for a UK regulated firm in 2026.

## What we actually know

ChatGPT can still name firms whose sites block GPTBot, because the assistant does not rely on a single crawler for firm-level information.

OpenAI's documentation lists the fields blocking GPTBot affects (training data and, for some products, browsing) but the recommendation behaviour of ChatGPT in casual queries is not entirely a live-fetch operation.

No published research documents how much of a firm's presence in ChatGPT responses comes specifically from GPTBot-collected data versus other sources.

## Where the assistant looks when the site is blocked

The regulator's own register is usually the first stable source: the SRA register for solicitors, the FCA register for mortgage advisers, ICAEW's find-a-chartered-accountant for accountants, and Propertymark for estate agents.

Google Business Profile fills in trading name, address, phone and category — the sort of information a homepage would normally provide.

Independent mentions in local press, sector directories and review sites add depth. Even one trade press quote can be enough to make a firm citable when combined with the regulator record.

## Why the answer is not a flat yes

Assistants are designed to reach past the obvious page and combine what they can find. Blocking a single crawler is not a fatal signal on its own; it is one absent source among many.

The evidence bar the assistant applies to a recommendation is not "did GPTBot see this site" but "can I state the name, address and service with confidence". Regulator plus Google Business Profile often clears that bar for a solicitor or accountant.

Some firms deliberately block AI crawlers — data protection concerns, workload on the site, licensing considerations. The assistant does not treat that as illegitimate; it just has less to work with.

## What actually breaks the recommendation

Any inconsistency across the regulator record, Google Business Profile and directory listings is much more damaging when the site is blocked. There is no homepage available as tiebreaker.

A dormant or partial regulator profile — firm registered but missing services or address — often produces a hedge ("this firm exists but I do not have current information") rather than a recommendation.

Absence of contact details across every source. If the assistant cannot tell a client how to reach the firm it will usually decline to recommend it. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What to do if you have blocked GPTBot and want to reconsider

Decide first whether the block is intentional and worth keeping. Blocks are often left in place from an early experiment and never revisited.

If you decide to unblock, remove the disallow rule for GPTBot and any peer crawler you want reading the site (PerplexityBot, ClaudeBot, GoogleOther). Test with a robots.txt checker.

Even with the block in place, keep the regulator profile, Google Business Profile and sector directory listings complete and consistent — those sources do most of the heavy lifting.

Consider serving a limited version of the site to AI crawlers (a summary page, a service list) as a compromise: it gives the assistants something to read without exposing full training material.

## How this differs from a traditional Google presence

A firm's Google presence used to be almost entirely determined by whether Googlebot could reach and index the site. If it could not, the firm was effectively invisible in search. That is where the intuition behind the crawler-blocking and no-website questions comes from — no crawler, no data, no visibility.

AI assistants have looser dependence on any single crawler. Even when GPTBot is blocked or the firm has no site at all, the assistant can assemble a usable picture from regulator records, Google Business Profile, sector directories and third-party mentions.

This matters because a lot of the crawler and no-website advice circulating in mid-2026 is still framed in Googlebot-era terms. The recommendation "you must let the crawler in or you disappear" is largely true for Google search and largely not true for AI recommendation. Firms should separate the two questions before making a decision that costs money or opens legal risk.

## How to test the picture for your own firm

Run the same query in ChatGPT, Perplexity and Gemini for a firm-type-and-location that matches your practice — "conveyancing solicitor in Nottingham", "residential mortgage adviser in Southampton", "letting agent in Sheffield". Do this once a week for four weeks, varying phrasing slightly, and log the firms named and the URLs cited.

Then repeat the same queries specifically for firms you know have limited or no web presence — a local sole practitioner, a firm without a website, a firm that has recently blocked AI crawlers. Compare the citations.

The point of the test is not to prove your own visibility is where it should be; it is to see how the assistants treat the source-poor case. Four weeks is long enough to filter out normal sampling variance and see the pattern.

## Where this is likely to change next

Crawler policy, hosting choices and consent frameworks are all moving. If the industry converges on a standard opt-out signal — something more granular than robots.txt — the current picture of what is and is not readable will change. There is no consensus on what that standard would look like as of mid-2026.

The other change to watch is how assistants handle firms with genuinely thin web presence. Every current assistant tends to hedge or omit when sources disagree; if any of them start filling gaps from proprietary data, the "you need a website" question will look quite different.

## Signals that tend to hold their value

Regardless of how crawler and hosting choices evolve, three signals appear to move slowly enough to be worth investing in.

Accurate regulator data — the SRA number, FCA reference number, ICAEW firm number or Propertymark number on the relevant regulator's register. It is the authoritative record of your firm's identity and permissions, and it changes slowly.

Consistent trading name and contact details across your website, Google Business Profile and any regulator or sector directory. Discrepancies show up as hedged responses more often than they show up as outright omissions.

A modest supply of recent third-party mentions — a trade press quote every few months, a mention in a local publication, a case study on a partner site. What matters is that they are recent and independent.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'If I block GPTBot in robots.txt am I definitely gone from ChatGPT?',
        answer: 'No. GPTBot is one of several ways ChatGPT can pick up firm information. Regulator records, Google Business Profile and third-party mentions can keep you cited even with the block in place.',
      },
      {
        question: 'If I unblock GPTBot how long until I appear again?',
        answer: 'Nobody knows the exact latency, and OpenAI has not published one. In practice, changes take days to weeks to show up in observable ChatGPT responses.',
      },
      {
        question: 'Should I block other AI crawlers by default?',
        answer: 'There is no default answer. The trade-off depends on how much you value AI visibility versus the workload and licensing risk of allowing training-scale access.',
      },
    ],
  },
  // ─── PAIR 3 ────────────────────────────────────────────────────────
  {
    slug: 'how-often-do-chatgpt-business-recommendations-change',
    title: "How often do ChatGPT's business recommendations change?",
    excerpt: 'Frequently, and often within the same session. Volatility is a design feature of how large language models select and phrase answers, not a bug. Here is why and what to do about it.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'How often ChatGPT firm recommendations change, why the shortlist moves, and which parts of the volatility a UK firm can and cannot influence.',
    content: `They change frequently — often within the same session, sometimes between two identical queries fired a minute apart. Volatility is a design feature of how large language models select and phrase answers, not a bug. There is no fixed refresh cadence you can point to and plan around.

- Two identical prompts can produce two different firm shortlists because the model samples from its own probability distribution at each turn, and small variations in temperature settings change what surfaces.
- Bigger, slower shifts happen when the underlying model is updated or when the browsing or retrieval configuration is changed. Neither event is publicly announced with enough detail to schedule against.
- Firms that appear consistently in responses tend to have a broader set of independent sources the assistant can reach, which reduces the odds that any single sampling produces an entirely different list.

## What we actually know

The core mechanism producing variability is that language models generate answers by sampling from a probability distribution, not by looking up a fixed ranking. Different samples of the same distribution can produce different names.

OpenAI has adjusted ChatGPT's browsing, memory and retrieval behaviour multiple times since launch. Each change can rearrange which sources the assistant reaches for a given query.

No public benchmark tracks day-by-day stability of ChatGPT firm recommendations, so any claim of a specific volatility rate is measurement, not fact.

## The two kinds of change (session and structural)

Session-level change: two identical prompts fired minutes apart can return different firms. This is the direct effect of sampling and is what most firms notice first.

Structural change: OpenAI ships a model update, changes the retrieval strategy, or the underlying source availability shifts (a directory relaunches, a firm's regulator record gains new fields). These changes move the whole distribution rather than just resampling from it.

Session change tends to reshuffle the top three; structural change can drop a firm from the response entirely or introduce a firm that was not previously appearing.

## Why the same prompt returns different firms

Sampling introduces randomness by design. Even at low temperature, the model is not deterministic in production ChatGPT settings.

Retrieval scope varies: sometimes the assistant chooses to browse, sometimes it answers from memory alone. Which route it picks influences what firms are named.

Prompt phrasing that looks identical to a human may be tokenised slightly differently, which nudges the internal probabilities.

## What you can influence

Depth and breadth of independent sources. The more places the assistant can reach that agree on your firm's name, address and services, the harder it is for a single sampling to leave you out.

Consistency of your name, address and regulator number across those sources. Every discrepancy widens the range of possible outputs.

Freshness of the reachable sources. Recent third-party mentions have a better chance of being sampled than dormant profiles. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What you cannot

The specific words a model will use to describe your firm on any given prompt.

The exact position of your firm in a numbered shortlist. Position varies with the sampling seed.

The timing of the next major model or retrieval update. OpenAI does not announce these with enough detail to plan around.

## How this differs from a traditional Google ranking

Google results moved slowly and in ways you could anticipate. Positions shuffled when a core update landed, but in the intervals between them a stable query returned the same thing one day to the next. Position was a number a firm could measure and treat as real.

Assistant recommendations do not behave that way. Ask the identical question twice within a single day and different firms may come back. Position, the metric everyone grew up on, is no longer the right unit, because there is no settled position there to be measured.

What does carry meaning is appearance rate: the proportion of runs of a given query in which your firm is named. That is a probability rather than a rank, and pinning it down takes a larger sample. It also does not refresh the way a ranking once did. A firm that invests in a fix should expect to watch its appearance rate climb over a period of weeks, rather than to see a position jump on one particular morning.

## How to test the picture for your own firm

Choose five questions a client of yours might plausibly ask, and put each to ChatGPT five times across a single day. Hold the wording completely constant. Record which firms come back and where in the answer they sit.

Variation is close to guaranteed. Note whether your own firm surfaces in any of the twenty-five runs, and whether particular competitors keep reappearing. Then do the whole thing again a month later. Twenty-five runs is a small sample, but it is large enough to show you the shape of the variation.

The purpose is to establish where your noise floor sits. A firm appearing three times in twenty-five one month and four times the next has not improved; that gap is noise. Going from three to twelve is something else entirely.

Separating signal from noise is the most useful habit anyone measuring AI visibility can build. Skip it and every intervention looks as though it might be working.

## Where this is likely to change next

Volatility within a session erodes user trust, so OpenAI and its rivals are all working to reduce it. Tighter temperature settings would steady the shortlist a query returns; more consistent use of retrieval would make the cited sources more predictable.

Either would make measurement easier, and neither has a published timeline. Structural change looks unlikely to slow down. Retrieval architectures are, if anything, moving faster now than they were eighteen months ago, and those are the changes that reshape the whole distribution.

## Signals that tend to hold their value

However the volatility picture develops, three signals move slowly enough to warrant investment.

Regulator data that is correct: your SRA number, FCA reference number, ICAEW firm number or Propertymark number as recorded on the relevant register. That entry is the definitive record of your firm's identity and of what it is authorised to do.

Trading name and contact details in agreement across each surface, meaning the firm's website, its Google Business Profile, and any regulator or sector directory. Where those conflict, a hedged answer is the more common outcome, rather than the firm disappearing from the response.

A modest and continuing supply of third-party mentions: a trade press quote now and then, something in a local title, a case study on a partner's site. Recency and independence give them weight.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: "How often is ChatGPT's model updated?",
        answer: 'OpenAI ships small updates continuously and larger model changes several times a year. Not all changes affect recommendation behaviour equally, and OpenAI does not publish per-update guidance for firms.',
      },
      {
        question: 'If I run the same query twice will I get the same firms?',
        answer: 'Not reliably. Two identical queries often produce two different shortlists, which is a normal consequence of how the model samples its output.',
      },
      {
        question: 'Does the time of day affect ChatGPT recommendations?',
        answer: 'No known evidence supports a time-of-day effect. Observed variability comes from sampling and source retrieval, not scheduling.',
      },
    ],
  },
  {
    slug: 'why-does-chatgpt-recommend-different-firms-each-time',
    title: 'Why does ChatGPT recommend different firms each time you ask?',
    excerpt: 'The AI-assistant version of "search" does not behave like a stable ranking. Here is why the shortlist moves, and which parts of that movement a UK firm can influence.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'Why ChatGPT firm recommendations move between identical queries, and which parts of the volatility a UK firm can and cannot influence.',
    content: `A common frustration for UK firms trying to understand their standing with AI assistants is the moving target. You ask ChatGPT for a solicitor in Manchester, get one list; you ask again five minutes later, get a partially different one.

If you had asked Google in 2015 you would have received a stable ranking that changed slowly and predictably. The AI-assistant version of the same question does not behave that way, and the difference between the two is more than cosmetic. It changes how a firm should think about its AI presence, how it measures progress, and what it should stop measuring. Before deciding how to react — whether to invest more in reviews, in schema markup, in trade press — it helps to understand why the shortlist moves in the first place, and which parts of that movement a firm can influence.

## What we actually know

Language models generate answers by sampling from a probability distribution rather than reading a stored ranking. Different samples of the same distribution produce different names.

OpenAI has adjusted ChatGPT's browsing, memory and retrieval behaviour multiple times since launch. Each change can rearrange which sources the assistant reaches for a given query.

No public benchmark tracks day-by-day stability of ChatGPT firm recommendations, so any claim of a specific volatility number is measurement, not fact.

## The two kinds of change (session and structural)

Session-level change: two identical prompts fired minutes apart can return different firms. This is the direct effect of sampling and is what most firms notice first.

Structural change: OpenAI ships a model update, changes the retrieval strategy, or the underlying source availability shifts (a directory relaunches, a firm's regulator record gains new fields). These changes move the whole distribution rather than just resample from it.

Session change tends to reshuffle the top three; structural change can drop a firm from the response entirely or introduce a firm that was not previously appearing.

## Why the same prompt returns different firms

Sampling introduces randomness by design. Even at low temperature, the model is not deterministic in production ChatGPT settings.

Retrieval scope varies: sometimes the assistant chooses to browse, sometimes it answers from memory alone. Which route it picks influences what firms are named.

Prompt phrasing that looks identical to a human may be tokenised differently by the model, which nudges the internal probabilities and can produce a different first name in the response.

## What you can influence

Depth and breadth of independent sources. The more places the assistant can reach that agree on your firm's name, address and services, the harder it becomes for a single sampling to leave you out.

Consistency of your name, address and regulator number across those sources. Every discrepancy widens the range of possible outputs.

Freshness of the sources ChatGPT can reach. Recent third-party mentions have a better chance of being sampled than dormant profiles. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What you cannot

The specific words a model will use to describe your firm on any given prompt.

The exact position of your firm in a numbered shortlist. Position moves with the sampling seed.

The timing of the next major model or retrieval update. OpenAI does not announce these with enough detail to plan against.

## How this differs from a traditional Google ranking

A Google search result changed slowly and predictably. Rankings shifted with the periodic core update, but between updates the results for a stable query were the same day after day. Firms could measure position and treat it as a real number.

AI assistant recommendations do not behave like that. Two identical prompts in the same day can return different firms. The number that used to matter — position — is not the right unit of measurement any more, because there is no stable position to measure.

The unit that does mean something is appearance rate: how often does your firm show up in a sample of runs of the same query. This is a probability rather than a rank, and it needs a larger sample to estimate. It also does not update the way a search ranking used to — firms who invest in a fix should expect to see the effect appear as an increase in appearance rate over weeks, not as a jump in position on a single day.

## How to test the picture for your own firm

Pick five queries a client of yours might reasonably ask and run each one five times, over the course of a single day, in ChatGPT. Vary nothing about the phrasing. Log the firms named and the position they appear in.

You will almost certainly see variation. Note whether your firm appears in any of the twenty-five runs, and whether the same competitors appear repeatedly. Then repeat the exercise a month later.

The point of the test is to build a sense of the sampling noise floor. If your firm appears three times out of twenty-five in month one and four out of twenty-five in month two, that is not a meaningful improvement — it is within the noise. If your firm goes from three to twelve, that is a signal.

Working out what is signal and what is noise is the single most useful discipline for anyone measuring AI visibility. Without it, everything looks like it might be working.

## Where this is likely to change next

OpenAI and its competitors are all working on reducing session-level volatility, because it undermines user trust. If the temperature settings tighten, the shortlist for a given query will become more stable. If retrieval becomes more consistently used, the sources cited will become more predictable.

Both changes would make measurement easier. Neither has an announced timeline. Structural changes — the ones that reshape the whole distribution — are unlikely to slow down; if anything, retrieval architectures are changing more rapidly than they were eighteen months ago.

## Signals that tend to hold their value

Regardless of how the volatility picture evolves, three signals appear to move slowly enough to be worth investing in.

Accurate regulator data — the SRA number, FCA reference number, ICAEW firm number or Propertymark number on the relevant regulator's register. It is the authoritative record of your firm's identity and permissions, and it changes slowly.

Consistent trading name and contact details across your website, Google Business Profile and any regulator or sector directory. Discrepancies show up as hedged responses more often than they show up as outright omissions.

A modest supply of recent third-party mentions — a trade press quote every few months, a mention in a local publication, a case study on a partner site. What matters is that they are recent and independent.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Why does the same prompt produce different results?',
        answer: 'Language models sample their outputs. Two runs of the same prompt are two independent samples from the same probability distribution, which is often enough to change which firm gets named first.',
      },
      {
        question: 'Is this random or is there a pattern?',
        answer: 'It is random within a distribution the model was trained on. There is a pattern in what tends to appear, but not in what will appear on any specific run.',
      },
      {
        question: 'Can I get ChatGPT to always name my firm?',
        answer: 'Not reliably. What you can do is broaden and align the sources the assistant reaches, which raises the probability of being named on any given run.',
      },
    ],
  },
  // ─── PAIR 4 ────────────────────────────────────────────────────────
  {
    slug: 'do-ai-assistants-read-rightmove-and-zoopla-for-estate-agents',
    title: 'Do AI assistants read Rightmove and Zoopla when recommending estate agents?',
    excerpt: 'Both portals appear in AI response citations, but the causal link to the recommendation itself is unproven. Here is what is known and what remains open.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'Rightmove and Zoopla listings appear in AI citations for estate-agent queries, but the causal link to the recommendation itself is unproven. Here is what is known.',
    content: `There is no verified public evidence that ChatGPT, Perplexity, Claude or Gemini read Rightmove and Zoopla listings as a direct input to estate-agent recommendations. Both portals appear as cited sources in some responses, most often when the query includes a specific area or property type, but the causal link is unproven.

- Rightmove and Zoopla listings can appear in AI response citations, especially for location-specific queries, but appearance in the citation list is not the same as influencing the recommendation itself.
- Estate agents' presence in the AI response tends to track Propertymark registration, Google Business Profile completeness and local press mentions more consistently than portal listing volume.
- Firms whose portal listings are missing basic information (agent name, branch address, phone) are less likely to be cited, because the assistants cannot resolve the ambiguity between similarly named branches.

## What we actually know

Rightmove and Zoopla have not published anything about whether or how their data is available to AI assistants, and none of the frontier assistants has documented these portals as source inputs.

What is observable: when ChatGPT is asked for an estate agent in a specific UK town, portal listing pages do appear as cited URLs in some responses. The frequency varies.

Neither observation tells us whether the portal data influenced the recommendation or whether it was simply the most convenient citation for a firm the assistant had already chosen.

## What the assistants seem to consider

Regulator status (Propertymark) and Google Business Profile completeness appear to correlate more strongly with recommendation than portal presence alone. Agents with strong regulator and Google records are cited even when their portal presence is thin.

Recent local press mentions — sales figures, market commentary, area profiles — appear disproportionately in cited sources, more so than raw listing counts on the portals.

The specific location keyword in the query changes source mix: a "sales agent in Bristol" query pulls different citations than "letting agent in Bristol", even when the same firm handles both.

## Why the answer is genuinely uncertain

The relationship between Rightmove or Zoopla content and AI response quality has not been publicly measured. Estate agents comparing notes see wide variation between similar-sized firms in the same market.

The portals themselves may or may not permit AI crawlers to index their pages beyond a certain depth. That access has changed over time and is not consistently documented.

Correlation is easy to confuse with cause: agents active on the portals tend to be active on Google, in local press and in Propertymark. Isolating any single channel's contribution is hard.

## Practical implications for estate agents

Keep the Propertymark registration current, with a complete branch address, licensed name and contact.

Keep the Google Business Profile aligned to the trading name shown on Rightmove and Zoopla — inconsistencies between the two make the assistant's job harder.

If you invest in portal presence, invest in the description text and branch details, not just listing volume. Assistants can quote descriptive text.

Treat local press as a distinct channel — market commentary quotes appear disproportionately in cited sources. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What remains an open question

Whether the portals materially influence the ranking or merely accompany it.

Whether higher listing volume on Rightmove or Zoopla is read by the assistants as a signal of scale, or is largely invisible past a threshold.

Whether portal-hosted "premium" or "featured" placements change the frequency with which those listing URLs appear in AI citations. No public test confirms either way.

## How this differs from a traditional Google-and-portal picture

Portals and regulator directories fed Google along a short, visible path: they supplied backlinks, they anchored the local pack, and Google read their pages as high-authority. A firm on Rightmove, or in the FCA register, saw that reflected in search quickly and unambiguously.

Assistants draw on the same sources to different effect. A portal listing or a register entry is something the assistant may cite; it is not an anchor for any ranking. Appearing on Rightmove guarantees a mention in a ChatGPT answer no more than appearing on Companies House guarantees one in a general question about a business.

This matters because guidance on portal placement and regulator visibility circulating in mid-2026 is still written in Google's terms. "Get yourself listed and you will be found" held up well for search and holds only in part for AI recommendation. Test the specific question rather than assuming it carries over.

## How to test the picture for your own firm

Take five questions a prospective client might realistically ask and run them weekly for a month in ChatGPT and Perplexity. Estate agents should use area-and-service phrasing ("letting agent in Croydon"); mortgage advisers, need-and-location ("remortgage broker in Bristol"). Note the firms named and the URLs cited.

Watch particularly for the portal listing or FCA register entry in the citation list, as a separate question from whether your firm gets named. That separation is the point. A source cited frequently without your firm named alongside it suggests the assistant picked the firm somewhere else and cited the portal in passing.

A month is enough to smooth out the day-to-day sampling variance and leave a usable pattern behind it. Longer is better if you can sustain it.

## Where this is likely to change next

Rightmove, Zoopla and OnTheMarket have each said something publicly about AI access at one point or another, but as of mid-2026 none has documented a settled data-sharing arrangement with the frontier assistants. If one were to, portal presence would become considerably more important for estate agents than it is today.

The FCA has issued a general artificial intelligence strategy without addressing how its register is consumed by third-party assistants. Anything it did there would take months to filter through, so brokers should not anticipate sudden change in how the register is read.

## Signals that tend to hold their value

However portal and register interaction develops, three signals move slowly enough to be worth the investment.

Accurate regulator data: the SRA number, FCA reference number, ICAEW firm number or Propertymark number carried on the appropriate register. The register carries the authoritative account of your firm's identity and of the permissions attached to it.

A trading name and contact details that agree everywhere they are published, across the firm's website, its Google Business Profile, and any regulator or sector directory. Inconsistency tends to produce a hedged response rather than removing the firm from the answer.

A modest, steady flow of independent third-party mentions: an occasional trade press quote, a local publication piece, a case study on a partner's website. What gives them value is being recent and not self-generated.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Should I upgrade my Rightmove or Zoopla tier for AI visibility?',
        answer: 'There is no public evidence that portal tier changes AI citation rates. Any tier decision should stand on its own portal marketing case.',
      },
      {
        question: 'Do assistants distinguish between Rightmove and Zoopla?',
        answer: 'Both surface in AI responses. There is no known evidence that one is preferred over the other.',
      },
      {
        question: 'If my listings are on OnTheMarket only, am I invisible?',
        answer: 'Probably not, provided your Propertymark registration and Google Business Profile are complete. AI assistants tend to reach several sources and portal exclusivity is not a common reason for absence.',
      },
    ],
  },
  {
    slug: 'do-ai-assistants-check-the-fca-register-for-mortgage-advisers',
    title: 'Do AI assistants check the FCA register when recommending mortgage advisers?',
    excerpt: 'A working-through of what is publicly known about how AI assistants relate to the FCA register in 2026, what remains untested, and where a UK broker should put effort.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'What is publicly known about how AI assistants relate to the FCA register when recommending UK mortgage advisers in 2026, and what remains open.',
    content: `The FCA register is the definitive UK record of firms authorised to provide regulated financial services, including mortgage advice. It is a source that a well-designed AI assistant would in principle want to consult before recommending a firm to a consumer — the register carries firm reference numbers, permissions, historical status changes and, in many cases, adviser-level detail.

Whether the assistants used by the general public actually reach for the register in practice is a different question, and one that mortgage brokers have started to ask more often now that ChatGPT, Perplexity, Claude and Gemini are being cited by prospective clients as their starting point. This piece looks at what is publicly known about how AI assistants relate to the FCA register in 2026, what remains untested, and where a UK broker who cares about AI recommendations should put effort.

## What we actually know

The FCA has not published anything about whether or how its register data is used by AI assistants, and none of the frontier assistants has publicly documented the register as a source input.

What is observable: when ChatGPT is asked for a mortgage adviser in a specific UK town, FCA register URLs do appear as cited references in some responses. The frequency varies from firm to firm.

Whether the register data actually influenced the recommendation, or was simply the most authoritative source available to cite alongside a firm the assistant had already chosen, is not something we can determine from the response alone.

## What the assistants seem to consider

Regulator status (an active FCA authorisation, ideally as a directly authorised firm rather than an appointed representative) and Google Business Profile completeness appear to correlate more strongly with recommendation than any single content channel.

Recent trade press mentions — rate commentary, product reviews, market outlooks — appear disproportionately in cited sources, more so than the raw content on the broker's own site.

Query specifics change the source mix: "first-time buyer mortgage adviser in Sheffield" pulls different citations than "buy-to-let mortgage adviser in Sheffield", even when the same broker covers both.

## Why the answer is genuinely uncertain

No public benchmark documents how often the FCA register is read for AI mortgage recommendations. Brokers comparing notes see wide variation between similar-sized firms in the same market.

The assistants change their retrieval behaviour without notice. A source that was heavily read in April may be sampled less often by August.

Correlation is easy to confuse with cause: brokers with a strong FCA record usually also have complete Google, local press and directory profiles. Isolating any single channel's contribution is hard.

## Practical implications for mortgage advisers

Keep the FCA register entry current — the trading name, principal firm relationship, and permissions must exactly match your website and Google Business Profile.

If you trade under an appointed-representative arrangement, make the principal-firm relationship visible on your own site. Assistants can and do note that structure when it is disclosed.

If you invest in content, invest in market-commentary pieces the trade press are likely to quote. Assistants pick up those quotes.

Treat the FCA register as a base signal rather than a marketing channel. Its main role is disambiguation, not promotion. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What remains an open question

Whether an entry in the FCA register on its own is enough to unlock recommendation, or whether the register is only read to confirm a firm the assistant has already chosen from other sources.

Whether adviser-level detail on the register (individuals, controlled functions) is used by the assistants, and if so which fields they favour.

Whether upcoming changes to the FCA register interface will change how assistants read it. Any change would take time to show up in observable responses.

## How this differs from a traditional Google-and-portal picture

Property portals and regulator directories fed into Google search in a fairly direct way: they provided backlinks, they anchored local pack results, and Google treated their pages as high-authority sources. If a firm was on Rightmove or in the FCA register, Google reflected it clearly and quickly.

AI assistants use the same sources but differently. The portal listing or register entry is a source the assistant may cite, not a ranking anchor. Being on Rightmove no more guarantees a mention in a ChatGPT response than being on Companies House guarantees a mention in a general query about a business.

This matters because a lot of the advice about portal placement and regulator visibility circulating in mid-2026 is still framed in Google terms. The recommendation "get listed and you'll be found" was largely true for Google search and is only partially true for AI recommendation. Firms should test the specific question before assuming the transfer holds.

## How to test the picture for your own firm

Run five queries a prospective client might reasonably use, in ChatGPT and Perplexity, once a week for four weeks. For estate agents that means area-plus-service queries ("letting agent in Croydon"); for mortgage advisers that means need-plus-location queries ("remortgage broker in Bristol"). Log the firms named and the URLs cited.

Look specifically for whether the property portal listing or FCA register entry appears in the citation list — separate from whether your firm is named. That distinction matters. A portal or register that appears often but does not correlate with your firm being named suggests the source is being cited alongside a firm the assistant has chosen from elsewhere.

Four weeks is long enough to filter out day-to-day sampling variance. Longer is better if you can commit to it.

## Where this is likely to change next

Rightmove, Zoopla and OnTheMarket have all made public statements about AI access at various points; none of them has published a stable, documented data-sharing arrangement with the frontier assistants as of mid-2026. If one does, portal presence for estate agents could become materially more important than it is today.

The FCA has published a general strategy on artificial intelligence but has not addressed how its register interacts with third-party assistants. Any FCA action there would take months to work through, so brokers should not expect abrupt changes to the way the register is read.

## Signals that tend to hold their value

Regardless of how portal or register interaction evolves, three signals appear to move slowly enough to be worth investing in.

Accurate regulator data — the SRA number, FCA reference number, ICAEW firm number or Propertymark number on the relevant regulator's register. It is the authoritative record of your firm's identity and permissions, and it changes slowly.

Consistent trading name and contact details across your website, Google Business Profile and any regulator or sector directory. Discrepancies show up as hedged responses more often than they show up as outright omissions.

A modest supply of recent third-party mentions — a trade press quote every few months, a mention in a local publication, a case study on a partner site. What matters is that they are recent and independent.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Does the FCA register determine whether ChatGPT recommends my brokerage?',
        answer: 'There is no public evidence that it determines the recommendation on its own. The register is one of several sources the assistant can consult; it appears most often as a citation alongside a recommendation rather than as its sole basis.',
      },
      {
        question: 'If I am an appointed representative rather than directly authorised, does that hurt AI visibility?',
        answer: 'No public research confirms an effect. What matters most is that the principal-firm relationship is disclosed consistently across your site and the register, so the assistant can resolve any ambiguity.',
      },
      {
        question: 'How often is the FCA register updated in AI responses?',
        answer: 'The FCA updates the underlying record continuously; how quickly changes propagate to what an assistant cites is not publicly documented and appears to vary.',
      },
    ],
  },
  // ─── PAIR 5 ────────────────────────────────────────────────────────
  {
    slug: 'does-google-business-profile-affect-gemini-recommendations',
    title: 'Does your Google Business Profile affect what Gemini says about your firm?',
    excerpt: "Almost certainly yes for local queries, because Gemini shares Google's broader business-listing infrastructure. Here is what is observable and what is inferred.",
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'Gemini appears to weight Google Business Profile heavily for local firm queries. Here is what is observable, what is inferred, and what to do about it.',
    content: `Almost certainly yes for local queries, because Gemini shares Google's broader business-listing infrastructure and is more likely than other assistants to surface Google Business Profile data directly. Google has not published a documented list of exactly which fields feed which model, so the strength of the effect is inferred, not measured.

- Gemini has a closer institutional relationship with Google Business Profile than ChatGPT or Perplexity, and its responses to local queries frequently draw text and hours directly from the profile.
- The fields most consistently reflected in Gemini responses are the trading name, category, opening hours, address and any recent posts or Q&A content that carries substantive text.
- A firm with a complete Google Business Profile tends to be represented more accurately by Gemini than one whose profile is thin, but neither Google nor any independent researcher has published exact weights.

## What we actually know

Google Business Profile is a Google product, so Google's own assistant (Gemini) has more direct access to its data than assistants operated by OpenAI, Anthropic or Perplexity.

Gemini responses to "recommend a firm in [town]" queries frequently quote or paraphrase text found in Google Business Profile descriptions and posts.

No public benchmark has quantified the difference in Gemini citation between firms with and without complete Google Business Profiles — the observation is qualitative.

## Which profile fields the assistants seem to use

Trading name, category, opening hours, address and phone: the core NAP data. These appear in most Gemini responses that include a firm.

Description text, Q&A content and posts: the profile fields with prose. These are the fields Gemini can quote directly and are the most visible in responses.

Reviews text: appears more often as summary language ("clients note the firm is responsive") than as direct quotation.

## Why the exact mechanism is unclear

Google has not published a source-attribution list for Gemini's local-query behaviour, and Google Business Profile documentation does not describe the assistant integration in detail.

Even for Gemini, the local-query behaviour changes over time as the model is updated and as Google's own search infrastructure is reorganised.

Cross-assistant observations are hard to compare because ChatGPT, Perplexity, Claude and Gemini all use different retrieval strategies at different times.

## Practical steps

Claim and verify your Google Business Profile, and make sure the trading name matches your regulator record and website exactly.

Fill the description with plain-language content that answers the questions a client is likely to ask about your service — Gemini can quote this text.

Keep posts and Q&A active, particularly for services that change (fees, new offices, opening hours).

Reply to reviews. Reply text is included in the profile the assistants can read. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What is probably not worth over-investing in

Chasing a specific Google review score with the aim of moving up in Gemini responses. No public leaderboard links score to Gemini prominence.

Cross-posting the same profile to secondary Google surfaces manually — the profile itself is the source, and other Google surfaces read from it.

Trying to influence which fields Gemini quotes. The choice of quotation is not something a firm can control directly; what a firm can do is make every field quotable.

## How this differs from a traditional Google-and-social picture

Google has long drawn a firm's Business Profile into local results in plain sight, through the knowledge panel, the map pack and the reviews snippet. LinkedIn signals reached Google's picture of a firm too, though by a more diffuse route. Both were legible, direct and steady enough to plan around.

Assistants read both surfaces, far less predictably. Gemini leans heavily on Google Business Profile while ChatGPT and Perplexity lean on it less; all three consult LinkedIn occasionally, and mostly for individual biographies rather than anything at firm level.

That matters because profile-completeness advice circulating in mid-2026 presumes a Google-style direct pipeline. "Complete the profile and Google will surface it" was broadly right for search and is a good deal more variable for AI recommendation. Establish which assistants pick up which fields before committing to a large content refresh on either surface.

## How to test the picture for your own firm

Put the same question to ChatGPT, Perplexity and Gemini once a week over four weeks. Record the firms named and the URLs cited, paying attention to whether the particular profile source you care about, Google Business Profile or LinkedIn, shows up among them.

Next, change one distinctive field in that profile for a while: a service description, the About text, a post. Re-run the same queries a week afterwards. An assistant that reflects the change has given you direct evidence the profile is being read for that kind of query. If nothing shifts, the profile is working as a passive reference and further editing is unlikely to repay much effort.

The test only works if the phrase you choose is distinctive enough that it would not appear in any of your other sources. Even so, a null result is worth having: it tells you where not to put next quarter's effort.

## Where this is likely to change next

Google keeps widening what Gemini can take directly from its own products, and Business Profile is among the surfaces receiving more attention. Should that continue, Gemini's reliance on the profile will grow rather than diminish.

LinkedIn restricts access more tightly than most public platforms do, and it shows little inclination to relax that position. If Microsoft were to open more of it to Copilot, the picture for LinkedIn-heavy queries could change; as of mid-2026 there is no outward sign that this is about to happen.

## Signals that tend to hold their value

However the profile picture develops, three signals move slowly enough to justify the investment.

Regulator data that is accurate: the SRA number, FCA reference number, ICAEW firm number or Propertymark number as held on the relevant register. It is the register that authoritatively records who your firm is and what it holds permission to do.

A trading name and contact details consistent everywhere they appear: the firm's own site, its Google Business Profile, and any regulator or sector directory. Where those disagree, the usual consequence is a hedged answer rather than the firm being omitted.

A modest but continuing supply of third-party mentions: a trade press quote every few months, a piece in a local title, a case study on a partner's site. Their value rests on recency and independence.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Does Gemini treat Google Business Profile as its main source?',
        answer: 'For local queries it appears to weight the profile heavily, but Google has not published an explicit statement of that. Other sources are still consulted.',
      },
      {
        question: 'If I do not have a Google Business Profile am I invisible to Gemini?',
        answer: "Not necessarily. Regulator records, third-party mentions and the firm's own site can still surface. Without a profile the responses tend to be shorter and less confident about location detail.",
      },
      {
        question: 'Do Google Business Profile posts influence AI recommendations from ChatGPT and Perplexity too?',
        answer: 'Possibly, but with less clarity. Both assistants sometimes cite Google Business Profile pages, but the effect appears less consistent than with Gemini.',
      },
    ],
  },
  {
    slug: 'does-your-firms-linkedin-presence-affect-ai-visibility',
    title: "Does your firm's LinkedIn presence affect AI visibility?",
    excerpt: 'A working-through of how LinkedIn interacts with AI assistants for UK regulated firms in 2026, and how much energy the company page and individual profiles are actually worth.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'How LinkedIn interacts with AI assistants for UK regulated firms in 2026: what is observable, what is uncertain, and how much energy the company page is worth.',
    content: `LinkedIn sits in an unusual position in the AI-recommendation conversation. It is the dominant professional network in the UK, it carries firm and individual-level data at scale, and it has one of the tightest access-control regimes on the public web.

Prospective clients do sometimes reach a firm through LinkedIn, and the platform is now widely used for individual credibility checks before a client makes contact. Whether any of that translates into a firm being more likely to be named by ChatGPT, Perplexity, Claude or Gemini is a different question, and one that firms of every size in solicitors, accountants, mortgage advice and estate agency are quietly trying to answer. Before deciding how much energy to spend on the company page, employee posts or individual profiles, it is worth working through what is publicly known about how LinkedIn interacts with AI assistants in 2026.

## What we actually know

LinkedIn's access controls limit what AI crawlers can index directly. Public-facing company pages are more readable than employee-level profiles, but even public pages carry aggressive rate limits.

LinkedIn URLs do appear in AI response citations, most often for individual professional biographies rather than firm-level details.

No frontier assistant has documented LinkedIn as a source input to firm-level recommendations. The observed presence is patchy.

## Which LinkedIn fields the assistants seem to use

Public company-page fields: the "About" section, headquarters location, size and industry. These are the fields that appear most consistently in the small number of responses that quote LinkedIn.

Individual profile summaries for named partners, directors or advisers — often surfaced in queries like "who are the senior partners at [firm]".

Posts and articles: these appear less often in assistant citations, likely because access to bulk post data is limited.

## Why the exact mechanism is unclear

LinkedIn does not publish how it interacts with AI crawlers, and the frontier assistants do not publish LinkedIn as a documented source.

Even where LinkedIn URLs appear in citations, the assistant may have picked them up from a secondary source (a press release, a directory entry) rather than crawled the platform directly.

Cross-assistant observations vary. Perplexity in particular tends to cite LinkedIn more often for individual biographies than ChatGPT does.

## Practical steps

Keep the company page accurate — trading name, headquarters address, industry and website should match the firm's website and regulator record.

Fill the About section with a substantive description that answers the same "who, what, where" questions the firm's homepage answers.

Ensure named partners, directors or advisers have current profiles with clear firm affiliation. Individual-level data is where LinkedIn appears most often in assistant responses.

Treat LinkedIn as reinforcement for other channels, not as a standalone lever. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What is probably not worth over-investing in

Publishing volume on the company page as a route to AI visibility. No public evidence links post volume to citation frequency.

LinkedIn advertising as a way to influence AI recommendations — paid posts are not obviously read differently from organic ones by assistants, and access limits apply either way.

Trying to persuade the assistants to link to specific LinkedIn URLs. That choice is not something a firm can direct.

## How this differs from a traditional Google-and-social picture

Google historically pulled a firm's Google Business Profile into local search results in an obvious way — knowledge panel, map pack, reviews snippet. LinkedIn signals filtered into Google's understanding of a firm too, but more diffusely. Both were readable, direct, and stable enough to plan around.

AI assistants use both surfaces but far less predictably. Google Business Profile is read heavily by Gemini and less heavily by ChatGPT and Perplexity; LinkedIn is read occasionally by all three, mostly for individual biographies rather than firm-level detail.

This matters because a lot of the advice about profile-completeness circulating in mid-2026 assumes a Google-style direct pipeline. The recommendation "fill the profile and Google will surface it" was largely true for Google search and is more variable for AI recommendation. Firms should test which assistants pick up which profile fields before committing to a large content-refresh programme on either surface.

## How to test the picture for your own firm

Run the same query in each of ChatGPT, Perplexity and Gemini once a week for four weeks. Log the firms named and the URLs cited — in particular note whether the specific profile source you care about (Google Business Profile or LinkedIn) appears in the citation list.

Then temporarily edit one distinctive field in the profile — a service description, the About section, a post — and run the same queries a week later. If the assistant surfaces the change, you have direct evidence the profile is being read for that query type. If not, the profile is present in the assistant's picture only as a passive reference, and the marginal value of editing it further is likely low.

The test only works if you use a distinctive phrase that would not appear in your other sources. Even then, a null result is informative — it tells you where not to spend the next quarter's effort.

## Where this is likely to change next

Google is expanding what Gemini can pull directly from its own products, and Google Business Profile is one of the surfaces getting more attention. If that trajectory holds, Gemini's dependency on the profile is likely to grow rather than shrink.

LinkedIn has been more restrictive on access than most public platforms and shows little sign of loosening. If Microsoft opens more of the platform to its own Copilot assistant, the picture for LinkedIn-heavy queries could change; there is no external signal of that as of mid-2026.

## Signals that tend to hold their value

Regardless of how the profile picture evolves, three signals appear to move slowly enough to be worth investing in.

Accurate regulator data — the SRA number, FCA reference number, ICAEW firm number or Propertymark number on the relevant regulator's register. It is the authoritative record of your firm's identity and permissions, and it changes slowly.

Consistent trading name and contact details across your website, Google Business Profile and any regulator or sector directory. Discrepancies show up as hedged responses more often than they show up as outright omissions.

A modest supply of recent third-party mentions — a trade press quote every few months, a mention in a local publication, a case study on a partner site. What matters is that they are recent and independent.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Do AI assistants read LinkedIn posts?',
        answer: 'They can, but not reliably. Access limits on LinkedIn mean that posts appear inconsistently in assistant citations.',
      },
      {
        question: 'If I do not have a LinkedIn company page will I be missing from AI recommendations?',
        answer: 'Probably not on that basis alone. The regulator record, Google Business Profile and third-party mentions are more consistently read than LinkedIn.',
      },
      {
        question: 'Should individual partners have LinkedIn profiles for AI visibility?',
        answer: 'Individual profiles surface in AI responses more often than company pages do, so yes, they are a reasonable investment — but the effect on firm-level recommendations is modest and unpredictable.',
      },
    ],
  },
  // ─── PAIR 6 ────────────────────────────────────────────────────────
  {
    slug: 'do-online-directories-still-matter-for-ai-recommendations-2026',
    title: 'Do online directories still matter for AI recommendations in 2026?',
    excerpt: 'Yes, but mainly as disambiguation sources. Directories no longer drive AI recommendations the way they influenced traditional search, but they remain the most efficient way to confirm a firm.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'Directories still matter for AI recommendations in 2026 — as disambiguation sources rather than ranking drivers. Here is what has changed since 2023.',
    content: `Yes, mainly as disambiguation sources. Directories no longer drive AI recommendations the way they influenced traditional search rankings, but they remain the most efficient way for an assistant to confirm a firm's name, address and specialism when the primary sources are ambiguous or missing.

- Assistants cite directory URLs in responses roughly as often as they cite firm websites, and more often than they cite social profiles.
- The value of a directory listing has shifted from search-engine link building to source-agreement for AI assistants; the same listing that is worth little for Google now has clear utility for ChatGPT.
- Not all directories carry the same weight. Regulator directories and sector-specific directories are cited disproportionately more than generic business listings.

## What we actually know

Directory URLs appear frequently in AI response citations. That is different from saying directories caused the recommendation, but it does mean the assistant treats them as usable sources.

The directories cited are dominated by regulator directories (SRA, ICAEW, FCA, Propertymark) and sector-specific directories (ReviewSolicitors, VouchedFor, IFA-directory sites, agent-search sites).

Generic business directories (Yell, Cylex, general local-listing sites) appear in AI citations far less often than the regulator or sector-specific ones. Their AI utility is limited.

## Which directories matter most today

Regulator directories: SRA for solicitors, ICAEW and ACCA for accountants, FCA for mortgage advisers, Propertymark and TPO for estate agents. These carry the identifiers assistants use to disambiguate.

Sector-specific directories: ReviewSolicitors and the Law Society Find a Solicitor directory for law; VouchedFor and Unbiased for advisers; Rightmove, Zoopla and OnTheMarket for estate agents; ICAEW find-a-chartered-accountant for accountancy.

Local business listings: Google Business Profile, Bing Places, Apple Business Connect. These are more directory-like than website-like in AI responses.

## Why the picture has changed since 2023

Traditional SEO treated directories as backlink sources — value from linking to your site. That value declined as Google discounted low-quality directory links.

AI assistants do not care about the link value; they care about the source. A directory entry with accurate firm data is a source they can cite, regardless of the SEO value of the link.

The upshot is that directories that lost SEO value have often gained AI-citation value, and firms have not always noticed.

## Practical directory strategy for a UK firm

Prioritise regulator directories. Complete every field; make sure the firm name matches your website exactly.

Add one or two well-known sector directories. Focus on those that already appear in assistant citations for your service and area.

Consolidate name, address and phone across every listing. Discrepancies confuse the assistant more than a missing listing does.

Treat Google Business Profile as the local-listing spine and align every other directory to what it says. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What is not worth doing

Bulk directory submission to raise link volume — the SEO value is negligible and the AI value is close to zero for low-quality directories.

Paying for directory categories or "featured" tiers as a route to AI visibility. No public evidence supports that spend.

Managing large numbers of secondary directories manually. Effort is better spent on the two or three that are actually cited by assistants in your sector.

## How this differs from a traditional Google-and-directory picture

Directories were once an SEO manoeuvre. The reasoning went that a listing somewhere authoritative, whether Yell, the Law Society, ICAEW or an established sector site, earned a backlink, the backlink lifted your Google rankings, and the rankings brought traffic. That held from roughly 2005 to 2015 and was steadily undermined by Google's link-quality updates over the years to 2020.

Assistants treat directories another way entirely. The directory is a source to be read, not a link to be counted. An entry in a regulator directory accomplishes more for AI visibility than it does for Google search, precisely because the assistant goes to the directory itself rather than following a link out of it.

This matters because directory advice circulating in mid-2026 is still couched in SEO terms. "List everywhere for the links" was broadly right for search a decade ago and is not especially right for AI recommendation. Move the budget from breadth to accuracy: fewer entries, more completely filled in, on the sources assistants genuinely read.

## How to test the picture for your own firm

Run five questions a prospective client might ask through ChatGPT and Perplexity, once a week for a month. Record the firms named and the URLs cited, noting which directories turn up: the SRA register, the Law Society directory, ReviewSolicitors, sector-specific sites, general business listings.

Read the pattern rather than any single run. A directory recurring week after week is one the assistant reliably reaches for that kind of question. One that shows up once and never again was probably a sampling artefact.

Four weeks is enough to smooth out the day-to-day variance and to show whether a given directory really belongs to the assistant's source set for the service you offer. Running longer helps, but is not necessary.

## Where this is likely to change next

Regulator directories are the least likely to move. The SRA, FCA, ICAEW and Propertymark all host their registers at stable addresses that assistants are unlikely to lose access to.

Sector-specific directories are less dependable. Mergers, changes of business model and shifting access policies can all alter which platforms the assistants read. One cited regularly now may not be in a year's time if the site is restructured or access is closed off.

General business directories are the least stable of the three. Most have been cited less often since 2023, and nothing suggests that direction is about to reverse.

## Signals that tend to hold their value

However the directory picture develops, three signals move slowly enough to merit investment.

Correct regulator data: the SRA number, FCA reference number, ICAEW firm number or Propertymark number recorded on the relevant register. The register states authoritatively who your firm is and what it is permitted to do.

Trading name and contact details that agree wherever they are published, across the firm's website, its Google Business Profile, and any regulator or sector directory. Discrepancies more often yield a hedged answer than they cause the firm to be left out.

A modest and sustained supply of third-party mentions: the occasional trade press quote, a mention in a local publication, a case study on a partner's site. Being recent and independent is what makes them count.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Have directories been replaced by AI assistants?',
        answer: 'Not really. Directories are one of the sources assistants read. Their role has shifted from being the destination to being a source; they still matter, just in a different way.',
      },
      {
        question: 'Which directories should a UK solicitor prioritise?',
        answer: 'The SRA register first, then the Law Society Find a Solicitor directory and ReviewSolicitors. Everything else is optional and should be evaluated by whether it appears in AI responses for your service and area.',
      },
      {
        question: 'Is Google Business Profile a directory?',
        answer: 'It functions like one from an AI-assistant point of view — it provides consistent firm data that the assistant can quote and disambiguate against.',
      },
    ],
  },
  {
    slug: 'does-the-law-society-directory-affect-chatgpt-recommendations',
    title: 'Does the Law Society directory affect ChatGPT recommendations?',
    excerpt: 'A working-through of how ChatGPT treats the Law Society Find a Solicitor directory in 2026, how it compares with the SRA register, and whether an entry there is doing any work.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 6,
    publishedDate: '2026-09-03',
    updatedDate: '2026-08-03',
    metaDescription: 'How ChatGPT treats the Law Society Find a Solicitor directory in 2026, how it compares with the SRA register, and how complete an entry is worth making.',
    content: `The Law Society's Find a Solicitor directory is the professional body's public register of solicitors, complementary to the SRA's regulatory register. It is a recognised source for consumers researching a solicitor in England or Wales, and it appears in the results of AI assistants often enough that firms have started asking whether their entry there is doing any work.

The question is not straightforward, because the Law Society directory sits in a slightly different position from the SRA register: it is professional-body membership rather than regulatory authorisation. It also has variable completeness — some firms have detailed entries with practice areas and languages, others have almost nothing. Before a firm decides whether to invest time in the Law Society entry, it helps to work through what is currently known about how ChatGPT treats it, and how it compares with the other sources ChatGPT is likely to consult.

## What we actually know

Law Society directory URLs do appear in ChatGPT citations for solicitor queries, though less consistently than SRA register URLs and less often than the firm's own website.

No public research has isolated the effect of the Law Society entry from other sources. Firms with complete Law Society entries tend to have complete SRA and Google presences too.

Where the assistant does cite the Law Society entry, it usually quotes practice-area or location detail; where the entry is bare, the assistant tends to skip to another source.

## Which directories matter most today

The SRA register is the primary regulator source for solicitors. It carries the SRA number and the current authorisation status the assistant uses to disambiguate.

The Law Society Find a Solicitor directory is second-tier: often cited, rarely the sole source.

Sector-specific directories (ReviewSolicitors, legal aid portals for legal-aid firms, specialist directories in areas like personal injury or immigration) fill in the remaining ground.

## Why the picture has changed since 2023

Traditional SEO treated directory listings as backlink sources — value from linking to your site. That value declined as Google discounted low-quality directory links.

AI assistants do not care about the link value; they care about the source. A Law Society entry with accurate detail is a source ChatGPT can cite, regardless of what it does for Google.

The upshot is that some directories that lost SEO value have gained AI-citation value, and firms have not always noticed.

## Practical directory strategy for a UK firm

Prioritise the SRA register — that is the source with the identifier the assistant needs.

Complete the Law Society Find a Solicitor entry with practice areas, office addresses and languages. Bare entries are ignored more often than they are cited.

Add one or two well-known sector directories, focused on services your firm actually takes on.

Consolidate name, address and phone across every listing. Discrepancies confuse the assistant more than a missing listing does. For a broader view on how assistants build their picture of a firm, see [what AI visibility actually means](/resources/what-is-ai-visibility).

## What is not worth doing

Assuming the Law Society entry alone is enough. It usually is not; the assistant expects agreement across sources.

Paying for directory categories or "featured" tiers as a route to AI visibility. No public evidence supports that spend.

Managing large numbers of secondary legal directories manually. Effort is better spent on the two or three that actually appear in ChatGPT responses for your service and area.

## How this differs from a traditional Google-and-directory picture

Directories used to be an SEO play. The theory ran that a listing on a high-authority directory (Yell, the Law Society, ICAEW, a well-known sector site) gave your site a backlink, which improved Google rankings, which increased traffic. That model held from roughly 2005 to 2015 and was progressively weakened by Google's link-quality updates through 2020.

AI assistants use directories differently. The directory is a source the assistant reads, not a link factor. A regulator directory entry does more work for AI visibility than for Google search, because the assistant reaches the directory directly rather than following a link from it.

This matters because a lot of the advice about directory strategy circulating in mid-2026 is still framed in SEO terms. The recommendation "get listed everywhere for the links" was largely true for Google search a decade ago and is not particularly true for AI recommendation. Firms should shift the directory budget from breadth to accuracy — fewer, better-completed entries in the sources assistants are actually reading.

## How to test the picture for your own firm

Run five queries a prospective client might use, in ChatGPT and Perplexity, once a week for four weeks. Log the firms named and the URLs cited. Note specifically which directories appear in the citation list — the SRA register, the Law Society directory, ReviewSolicitors, sector-specific directories, general business listings.

Look at the pattern rather than the individual runs. If a directory appears repeatedly across weeks, it is a source the assistant reliably reaches for that query type. If it appears once and never again, it was probably a sampling artefact.

Four weeks is long enough to filter out day-to-day variance and to see whether a directory is genuinely part of the assistant's source set for your service. Longer helps but is not required.

## Where this is likely to change next

Regulator directories are the least likely to change. The SRA, FCA, ICAEW and Propertymark all publish their registers on stable URLs that assistants are unlikely to lose access to.

Sector-specific directories are more variable. Consolidations, business model changes and access policies can shift which platforms the assistants read. A directory that is cited regularly today may not be cited a year from now if the site changes structure or restricts access.

Generic business directories are the least stable of all. Most have declined in AI-citation frequency since 2023 and there is no reason to expect that trend to reverse.

## Signals that tend to hold their value

Regardless of how the directory picture evolves, three signals appear to move slowly enough to be worth investing in.

Accurate regulator data — the SRA number, FCA reference number, ICAEW firm number or Propertymark number on the relevant regulator's register. It is the authoritative record of your firm's identity and permissions, and it changes slowly.

Consistent trading name and contact details across your website, Google Business Profile and any regulator or sector directory. Discrepancies show up as hedged responses more often than they show up as outright omissions.

A modest supply of recent third-party mentions — a trade press quote every few months, a mention in a local publication, a case study on a partner site. What matters is that they are recent and independent.

**[Get your free AI Visibility Report →](/ai-visibility-report)**`,
    faqs: [
      {
        question: 'Is the Law Society directory more important than the SRA register for ChatGPT?',
        answer: 'Almost certainly not. The SRA register carries the identifier and regulatory status the assistant uses to disambiguate firms.',
      },
      {
        question: 'How complete should my Law Society entry be?',
        answer: 'As complete as you can make it. Bare entries are cited less often than detailed ones, because the assistant has less to quote from them.',
      },
      {
        question: 'Are Law Society Excellence Awards or accreditations useful for AI visibility?',
        answer: 'There is no public evidence that individual awards or accreditations shift AI citation rates. Where they matter is in reinforcing consistent firm data across the sources ChatGPT reads.',
      },
    ],
  },
  // ─── end EXP-002 ──────────────────────────────────────────────────
  {
    // Full body lives at app/blog/why-ai-checks-icaew-registration/page.tsx.
    // Second entry in the regulator-AI sector library (sibling of the SRA
    // post immediately below). Same publishedDate so the listing pairs them
    // naturally; this one is inserted first so it sorts first within the
    // featured tier (stable sort, insertion-order tiebreaker).
    slug: 'why-ai-checks-icaew-registration',
    title: 'Why AI Assistants Check Your ICAEW Registration Before Recommending Your Accountancy Firm',
    excerpt: 'Before ChatGPT, Claude or Perplexity recommends an accountant, it has to work out which firms are genuinely chartered and ICAEW-registered. Where your website and the ICAEW record disagree, the assistant hedges or leaves you out. Here is how that check works and how to pass it.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 8,
    publishedDate: '2026-06-22',
    updatedDate: '2026-06-22',
    featured: true,
    content: '',
    href: '/blog/why-ai-checks-icaew-registration',
  },
  {
    // Full body lives at app/blog/why-ai-checks-sra-registration/page.tsx.
    // Newest entry — sits at the top of /resources via `featured: true` plus
    // publishedDate 2026-06-22 (the renderer sorts featured-first, then by
    // date desc). `href` points the listing card at the canonical /blog/
    // URL; sitemapUrls dedupes by URL so we don't get both /blog and
    // /resources entries in the sitemap.
    slug: 'why-ai-checks-sra-registration',
    title: 'Why AI Assistants Check Your SRA Registration Before Recommending Your Firm',
    excerpt: 'Before ChatGPT, Claude or Perplexity names a UK solicitor, it has to confirm the firm is genuinely SRA-regulated. Where your website and the SRA register disagree, the assistant hedges or leaves you out. Here is how that check works and how to pass it.',
    category: 'Legal',
    author: 'Scott Davies',
    readTime: 8,
    publishedDate: '2026-06-22',
    updatedDate: '2026-06-22',
    featured: true,
    content: '',
    href: '/blog/why-ai-checks-sra-registration',
  },
  {
    // Full article body lives at app/blog/manchester-solicitors-chatgpt-recommendations/page.tsx.
    // This entry surfaces the article in the /resources listing and the
    // sitemap; `href` points the listing card at the /blog/ route, which
    // is also the canonical URL.
    slug: 'manchester-solicitors-chatgpt-recommendations',
    title:
      'Is your Manchester firm in the 24 names ChatGPT recommends — or one of the 76 it ignores?',
    excerpt:
      'We tested 100 Manchester solicitor firms across ChatGPT, Claude, and Perplexity. Only 24 appeared consistently in AI recommendations.',
    metaDescription:
      'We tested 100 Manchester solicitor firms across ChatGPT, Claude, and Perplexity. Only 24 appeared consistently in AI recommendations. Find out which group your firm is in — free, 90 seconds.',
    category: 'Research',
    author: 'Scott Davies',
    readTime: 4,
    publishedDate: '2026-06-01',
    updatedDate: '2026-06-01',
    featured: true,
    href: '/blog/manchester-solicitors-chatgpt-recommendations',
    content: '',
  },
  {
    slug: 'how-do-i-know-if-chatgpt-recommends-my-business',
    title: 'How Do I Know If ChatGPT Recommends My Business?',
    excerpt:
      'How to check whether ChatGPT, Perplexity and Google AI Overviews recommend your business — the prompts to test, why one test is not enough, and what counts as a real recommendation.',
    metaDescription:
      'How to check whether ChatGPT, Perplexity and Google AI Overviews recommend your business — the prompts to test, why one test is not enough, and what counts as a real recommendation.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-06-17',
    updatedDate: '2026-06-17',
    featured: true,
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/how-do-i-know-if-chatgpt-recommends-my-business',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/how-do-i-know-if-chatgpt-recommends-my-business',
        },
        author: {
          '@type': 'Person',
          name: 'Scott Davies',
          jobTitle: 'Founder, TendorAI',
          description: '10+ years in B2B and UK professional services',
          url: 'https://www.tendorai.com/about',
          sameAs: ['https://www.linkedin.com/in/scott-davies-b7952abb/'],
          worksFor: {
            '@type': 'Organization',
            name: 'TendorAI',
            url: 'https://www.tendorai.com',
          },
        },
      },
    ],
    content: `The fastest way to find out whether ChatGPT recommends your business is to ask it the question a client would and see if you're named. Open ChatGPT and type "best [your service] in [your city]" — for example, "best accountant in Cardiff" or "best conveyancing solicitor in Bristol" — and read the answer. If your business isn't in the response, ChatGPT isn't recommending you in that instance.

*By Scott Davies, Founder of TendorAI. 10+ years in B2B and UK professional services.*

That's the one-minute version, and most businesses have never run it. But a single test is unreliable, because AI answers vary between runs and differ across assistants. To know where you actually stand, you need to test properly — across the major assistants, several times, with the right prompts. This page shows you how, and what counts as a real recommendation versus a near-miss.

## How to test ChatGPT manually

Ask ChatGPT the questions your clients ask, in their words, not yours. A client doesn't search "AI visibility" — they ask for the service in their town. Run prompts like:

- "Best [service] in [city]" — e.g. "best mortgage adviser in Manchester"
- "Who should I use for [specific need] in [city]" — e.g. "who should I use for a will in Leeds"
- "Recommend a [service] near [area]"
- "[Service] in [city] for [specific situation]" — e.g. "accountant in Cardiff for Making Tax Digital"

Read the full answer and note whether your business is named, and where. Then repeat each prompt a few times, because the result won't be identical each time.

## Which prompts should I test?

Test across the different ways a real client phrases the question, not just one. Each type catches a different slice of how AI answers:

| Prompt type | Example |
|---|---|
| Generic service | Best accountant in Cardiff |
| Local intent | Accountant near Cardiff Bay |
| Specialist service | Accountant in Cardiff for Making Tax Digital |
| Comparison intent | Who are the top-rated accountants in Cardiff? |
| Recommendation intent | Can you recommend an accountant in Cardiff? |

Swap in your own service and city. A business can appear for one phrasing and be absent from another — so testing only "best [service] in [city]" gives you a partial picture.

## Why testing once isn't reliable

AI assistants don't return a fixed answer the way a search engine returns a fixed ranking. Ask the same question twice and you can get two different sets of businesses. The same prompt can name different businesses on different runs — so a single test tells you almost nothing.

To get a real read, run each prompt several times and look at how often you appear, not whether you appeared once. Being named in one run out of ten is not a recommendation — it's noise. Being named in most runs is.

## How ChatGPT, Perplexity and AI Overviews differ

You're not testing one system, you're testing several, and they behave differently. Checking only ChatGPT gives you a partial picture.

- ChatGPT often answers without source links, especially on the free tier, and leans on what it can recall and retrieve.
- Perplexity is the most transparent — it cites dated, linked sources, so it's the clearest place to see why a business was named.
- Google's AI Overviews often correlate more closely with traditional search visibility than ChatGPT or Perplexity, though all three draw on a range of signals.

A business can appear in one and be absent from the others. Test all three before concluding anything — strength in Perplexity doesn't mean you're visible in ChatGPT.

## What counts as a recommendation

Not every mention is a recommendation. Be honest with yourself about what you're seeing:

- A recommendation is your business named, by name, as an answer to the question — ideally consistently across runs.
- A near-miss is your business mentioned in passing, listed among many, or named only once across several runs.
- Not visible is your business absent while competitors are named — the most common result, and the one that matters.

If competitors appear and you don't, that's the signal to act on. It usually means the model can identify and trust them as businesses and can't yet do the same for you — explained in full in [Why Doesn't ChatGPT Recommend My Business?](/resources/why-doesnt-chatgpt-recommend-my-business).

## Why competitors may appear instead of you

When ChatGPT names a competitor and not you, it's rarely about quality. The model builds answers from businesses it can identify as verifiable entities, read in machine-readable form, and confirm across more than one trusted source. A competitor that's consistent across Companies House, their regulator's register, reviews and directories is easier to name than a business whose only footprint is its own website — even a larger, better-regarded one. Why that happens, and what closes the gap, is covered in [the pillar guide below](/resources/how-to-get-recommended-by-chatgpt).

## How to run an AI visibility audit

Doing the manual test properly — every key prompt, several runs each, across ChatGPT, Perplexity and Google's AI Overviews — takes time, and it's easy to test inconsistently. For a structured version, TendorAI's free AI visibility report runs the queries for you across the major assistants and shows whether your business is being named and what's missing if it isn't. It's a diagnostic, not a sales pitch — it tells you where you stand, which is the thing you can't act on until you know.

## Frequently asked questions

### How do I check if ChatGPT mentions my business?

Ask ChatGPT to recommend a business like yours in your area — "best [service] in [city]" — and see if you're named. Run it several times, because answers vary, and check Perplexity and Google's AI Overviews too, since they behave differently.

### Why does ChatGPT name my business once but not the next time?

Because AI assistants don't return fixed answers. The same prompt can produce different businesses on different runs. Consistency across runs is what matters — being named once is noise, not a recommendation.

### Should I test more than just ChatGPT?

Yes. ChatGPT, Perplexity and Google's AI Overviews each weigh signals differently, and a business can appear in one and be absent from the others. Test all three for a true picture.

### What if competitors appear and I don't?

That's the clearest sign to act on. It usually means AI can identify and trust those competitors as verifiable businesses and can't yet do the same for you — an identity, structured-data and corroboration gap, not a quality gap.

### Is there a faster way than testing manually?

A free AI visibility report runs the prompts across the major assistants for you and shows where you stand, rather than testing each one by hand.

Want this done for you across ChatGPT, Perplexity and Google's AI Overviews in one go? [Run a free AI visibility report](/ai-visibility-report?utm_source=blog&utm_medium=content&utm_campaign=how-do-i-know-if-chatgpt-recommends).`,
  },
  {
    slug: 'why-doesnt-chatgpt-recommend-my-business',
    title: "Why Doesn't ChatGPT Recommend My Business?",
    excerpt:
      "Tested ChatGPT and your firm wasn't recommended? Here are the five real reasons AI assistants skip a business — and why every one of them is fixable.",
    metaDescription:
      "Tested ChatGPT and your firm wasn't recommended? Here are the five real reasons AI assistants skip a business — and why every one of them is fixable.",
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 5,
    publishedDate: '2026-06-18',
    updatedDate: '2026-06-18',
    featured: true,
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/why-doesnt-chatgpt-recommend-my-business',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/why-doesnt-chatgpt-recommend-my-business',
        },
        author: {
          '@type': 'Person',
          name: 'Scott Davies',
          jobTitle: 'Founder, TendorAI',
          description: '10+ years in B2B and UK professional services',
          url: 'https://www.tendorai.com/about',
          sameAs: ['https://www.linkedin.com/in/scott-davies-b7952abb/'],
          worksFor: {
            '@type': 'Organization',
            name: 'TendorAI',
            url: 'https://www.tendorai.com',
          },
        },
      },
    ],
    content: `[You tested it.](/resources/how-do-i-know-if-chatgpt-recommends-my-business) You asked ChatGPT, Perplexity or Gemini to recommend a firm like yours in your area — and you weren't there. A competitor was. Or worse, the assistant invented a plausible-sounding firm that doesn't exist.

*By Scott Davies, Founder of TendorAI. 10+ years in B2B and UK professional services.*

That's not a glitch, and it's not bad luck. AI assistants make recommendation decisions for specific, identifiable reasons. Once you understand what those reasons are, the problem stops looking like a black box and starts looking like something you can fix.

Here's what's actually going on.

## AI assistants don't rank — they recommend

The first thing to unlearn is the search-engine model. Google returns a ranked list of ten blue links and lets you choose. An AI assistant does something fundamentally different: it picks. When someone asks "who's a good commercial solicitor in Manchester?", the model returns a short, confident answer naming one or two firms. There is no page two.

That changes the stakes completely. To name your business, the model has to be confident enough to put your name in front of a user as a recommendation it stands behind. If it isn't confident, it leaves you out and names someone it *is* confident about. Everything below is really a list of the reasons an assistant ends up unsure about you.

## Reason 1: The model can't confidently identify you as a distinct business

AI models build an internal picture of "entities" — distinct, named things in the world they can reason about. For your firm to be recommended, the model needs a clear, unambiguous sense that you exist, what you do, and where.

This breaks down when your business name is generic, shared with other firms, or described differently in different places. If you're "Smith & Partners" and there are eleven other Smith & Partners across the UK, the model has no reliable way to attach the right facts to the right firm. So it doesn't risk it.

## Reason 2: Nothing corroborates you

A model won't recommend a firm on the strength of your own website alone — anyone can claim anything about themselves. It looks for *corroboration*: the same facts about your business showing up consistently across multiple independent sources it already trusts.

If the only place your specialisms, location and credentials appear is your own homepage, you have a single point of evidence. That's thin. Firms that get recommended tend to be described the same way across directories, professional registers, review platforms, news mentions and third-party listings. Consistency across independent sources is what turns "this firm claims X" into "this firm is X" in the model's reasoning.

## Reason 3: There's no structured data telling machines what you are

Humans read your website and understand it. Machines need it spelled out. Structured data (schema markup) is a standardised, machine-readable layer that states plainly: this is a legal services firm, here is its name, location, the services it offers, its registration details, its areas of practice.

Without it, an AI model has to infer all of that from prose, and inference is where confidence leaks away. With it, the facts are unambiguous and easy to verify. Most professional firms have no structured data at all, which means they're asking the model to guess when a competitor down the road has handed it the answer.

## Reason 4: Your content can't be cited

AI assistants prefer to recommend things they can *justify*. When a model surfaces a firm, it's drawing on content it can point to as the basis for that recommendation — clear, factual, quotable statements about what a firm does and who it serves.

Vague brochure copy gives the model nothing to work with. "We deliver bespoke solutions tailored to your needs" is unciteable — it makes no specific, verifiable claim. "We handle residential conveyancing for buyers in South Wales and are regulated by the SRA" is citeable, because it's specific, factual and corroborable. If your content is all positioning and no substance, there's nothing for the model to anchor a recommendation to.

## Reason 5: Your competitor is simply easier to verify

This is the one that stings. In many cases there's nothing *wrong* with your firm — your competitor is just a safer bet for the model. They're more clearly identified, more consistently described across sources, have structured data in place, and publish content the model can cite.

Faced with a choice between a firm it can confidently stand behind and one it can't quite pin down, the assistant picks the safe option every time. You're not being penalised. You're being skipped because someone else made themselves easier to recommend.

## The good news: none of this is fixed

Every reason above is an evidence problem, not a quality problem. The model isn't judging whether you're a good firm — it can't. It's judging whether it has enough corroborated, structured, citeable evidence to recommend you with confidence. That's entirely within your control.

The work breaks into a clear sequence: make your business unambiguously identifiable, get it described consistently across independent sources, install structured data so machines can read it without guessing, and publish content specific enough to be cited. Do that, and the same assistant that skipped you starts naming you — for the same reasons it currently names your competitor.

The next question is the obvious one: *how* does an AI assistant actually decide which firm to recommend? That's where it gets specific — and once you can see the mechanism, you can engineer the outcome.

Want to see exactly which of these reasons applies to your firm right now? [Run a free AI visibility report](/ai-visibility-report?utm_source=blog&utm_medium=content&utm_campaign=why-doesnt-chatgpt-recommend).`,
  },
  {
    slug: 'how-does-chatgpt-choose-which-businesses-to-recommend',
    title: 'How Does ChatGPT Choose Which Businesses to Recommend?',
    excerpt:
      "AI assistants don't rank businesses — they pick one. Here's the five-stage process behind how ChatGPT decides which firm to recommend, and where you get filtered out.",
    metaDescription:
      "AI assistants don't rank businesses — they pick one. Here's the five-stage process behind how ChatGPT decides which firm to recommend, and where you get filtered out.",
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-06-19',
    updatedDate: '2026-06-19',
    featured: true,
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/how-does-chatgpt-choose-which-businesses-to-recommend',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/how-does-chatgpt-choose-which-businesses-to-recommend',
        },
        author: {
          '@type': 'Person',
          name: 'Scott Davies',
          jobTitle: 'Founder, TendorAI',
          description: '10+ years in B2B and UK professional services',
          url: 'https://www.tendorai.com/about',
          sameAs: ['https://www.linkedin.com/in/scott-davies-b7952abb/'],
          worksFor: {
            '@type': 'Organization',
            name: 'TendorAI',
            url: 'https://www.tendorai.com',
          },
        },
      },
    ],
    content: `Ask ChatGPT to recommend a solicitor in Leeds, an accountant in Bristol or an estate agent in Cardiff, and it won't hand you a list of fifty options to sift through. It names one or two firms, with confidence, as if it already knows them. Behind that short, decisive answer is a process — and once you can see the process, you can work out exactly why some firms get named and others never do.

*By Scott Davies, Founder of TendorAI. 10+ years in B2B and UK professional services.*

This is the mechanism. Not a metaphor, not marketing copy — the actual sequence of decisions an AI assistant runs through before it puts a name in front of a user.

## It isn't ranking. It's reasoning towards an answer it can defend

Start here, because everything else follows from it. A search engine ranks. It gathers every page that might be relevant, scores them, and returns an ordered list — the responsibility for choosing sits with you. An AI assistant does the opposite. It absorbs the responsibility of choosing and gives you a single answer it's willing to stand behind.

That one shift changes everything about how a business gets surfaced. A search engine can afford to show you a mediocre result at position eight — you'll just scroll past it. An assistant can't afford a weak recommendation at all, because there's no position eight. If it names a firm, it's vouching for that firm. So the entire process is built around one question the model is constantly asking itself: *can I confidently stand behind this?* Every firm that gets recommended is a firm that cleared that bar. [Every firm that doesn't, didn't.](/resources/why-doesnt-chatgpt-recommend-my-business)

Here's how it gets there.

## Stage 1: It works out what's actually being asked

Before the model thinks about any specific business, it interprets the request. "Who's a good conveyancing solicitor near me?" carries far more than the words suggest. The model has to resolve the location, infer the specialism, and apply the implicit filters a human would apply without thinking — is this firm regulated, does it actually do this type of work, is it plausibly local.

This matters more for professional services than almost any other category, because the implicit filters are strict. A user asking for a solicitor expects a regulated solicitor, not a general legal-services website. A firm that hasn't made its regulation, location and specialism unmistakably clear is already at a disadvantage before a single candidate has been considered — because the model can't confidently match it to what was actually asked.

## Stage 2: It assembles a shortlist of candidates

Now the model gathers businesses that might fit. It draws on two different sources, and the difference between them is one of the most important things for any firm to understand.

The first source is what the model already holds internally — the patterns it absorbed during training. If your firm was described consistently across the public web when the model was trained, it may already "know" you exist and what you do. The second source is live retrieval: many assistants now look things up at the moment of asking, pulling in current information from the web to supplement what they hold.

A firm wants to be reachable through both. Being present in the model's internal knowledge gives you a head start; being clearly described in sources the model can retrieve live keeps you eligible even for the most current queries. A business that exists in neither — thin online presence, inconsistent descriptions, nothing a retrieval system can latch onto — simply never makes the shortlist. It isn't rejected later. It's never a candidate in the first place.

## Stage 3: It tries to verify each candidate

This is the stage that decides most outcomes, and it's the one firms understand least.

For every candidate on the shortlist, the model is effectively running a background check. It's looking for corroboration — the same facts about a business appearing consistently across multiple independent sources it already trusts. Does this firm's name, location and specialism line up across directories, professional registers, review platforms and third-party mentions? Or does the only evidence come from the firm's own website?

A single source is weak evidence, because anyone can claim anything about themselves. Independent, consistent corroboration is strong evidence, because it's hard to fake at scale. The firm that says "we're regulated by the SRA and handle commercial property in Manchester" on its own homepage is making a claim. The firm whose SRA registration, location and specialism are confirmed across the regulator's register, multiple directories and consistent third-party descriptions has had that claim *verified*. At this stage, verified beats claimed every time.

Structured data does its work here too. When a firm publishes machine-readable structured data — stating plainly what it is, where it operates, what it's regulated by and what it offers — it removes the guesswork. The model doesn't have to infer the facts from prose and hope it got them right; the facts are stated unambiguously and are trivial to cross-check. Firms that make verification easy clear this stage. Firms that force the model to guess tend not to.

## Stage 4: It weighs confidence against risk

By now the model has a small set of candidates it has been able to verify to varying degrees. It doesn't simply pick the "best" firm — it has no way to judge which firm is genuinely best at conveyancing or audit work. What it can judge is which firm it's most confident recommending without being wrong.

So it weighs confidence against risk. A firm it can identify cleanly, that's corroborated across independent sources, with structured data and citeable content, is a low-risk recommendation — the model can name it and defend the choice. A firm it can only partly verify is a higher-risk recommendation, and the model is built to avoid risk. Faced with a confident option and an uncertain one, it takes the confident option and quietly drops the rest.

This is the uncomfortable truth behind most "why wasn't I recommended" questions. In a great many cases the omitted firm was perfectly good — better, even, than the one that got named. It just gave the model less to be confident about. The recommendation went to the most *verifiable* firm, not the most capable one.

## Stage 5: It writes a short, decisive answer

Finally, the model composes its response — and it leans on content it can point to. When it names a firm, it's drawing on clear, factual, quotable statements about what that firm does and who it serves. Specific, citeable content gives the model the raw material to justify the recommendation in its own answer. Vague positioning gives it nothing to work with, which makes a firm harder to name even if it survived the earlier stages.

The output is what the user sees: a confident, two-line answer naming the firm the model could most safely stand behind. Everything that produced it is invisible.

## What this means for your firm

Read the five stages back and a pattern emerges. At every single stage, the firm that progresses is the one that's easier to identify, easier to verify and easier to cite — not the one that's better at the actual job. The model is filtering for confidence, not quality, because confidence is the only thing it can measure.

That sounds harsh, but it's the most useful thing to understand about the entire system, because it tells you exactly where to act. You can make your business unmistakably identifiable. You can get it described consistently across the independent sources the model checks. You can publish structured data so verification is effortless. You can write content specific enough to be cited. Do that, and you're not gaming anything — you're simply giving the model what it needs to stand behind you, at every stage where it would otherwise have dropped you.

The firms winning AI recommendations today aren't the ones with the best service. They're the ones that made themselves the safest choice. That's a deliberate, repeatable discipline — and it has a name. The next question is [what that discipline actually is](/resources/what-is-ai-visibility), and how you build it.

Ready to see which stage your firm falls out at? [Run a free AI visibility report](/ai-visibility-report?utm_source=blog&utm_medium=content&utm_campaign=how-does-chatgpt-choose).`,
  },
  {
    slug: 'what-is-ai-visibility',
    title: 'What Is AI Visibility?',
    excerpt:
      "AI visibility is how readily AI assistants like ChatGPT, Claude, Perplexity and Gemini recommend your business when someone asks them for a firm like yours.",
    metaDescription:
      "AI visibility is how readily AI assistants like ChatGPT, Claude, Perplexity and Gemini recommend your business when someone asks them for a firm like yours.",
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 8,
    publishedDate: '2026-06-20',
    updatedDate: '2026-06-20',
    featured: true,
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/what-is-ai-visibility',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/what-is-ai-visibility',
        },
        author: {
          '@type': 'Person',
          name: 'Scott Davies',
          jobTitle: 'Founder, TendorAI',
          description: '10+ years in B2B and UK professional services',
          url: 'https://www.tendorai.com/about',
          sameAs: ['https://www.linkedin.com/in/scott-davies-b7952abb/'],
          worksFor: {
            '@type': 'Organization',
            name: 'TendorAI',
            url: 'https://www.tendorai.com',
          },
        },
      },
      // FAQPage with the canonical definition as a Q/A — makes the ownable
      // "What is AI visibility?" answer machine-readable. Single question only;
      // the answer text is the verbatim opening definition.
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://www.tendorai.com/resources/what-is-ai-visibility#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is AI visibility?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "AI visibility is how readily AI assistants — ChatGPT, Claude, Perplexity, Gemini and Google's AI Overviews — recommend your business when someone asks them for a firm like yours.",
            },
          },
        ],
      },
    ],
    content: `**AI visibility is how readily AI assistants — ChatGPT, Claude, Perplexity, Gemini and Google's AI Overviews — recommend your business when someone asks them for a firm like yours.** It's a measure of whether the systems people increasingly trust to choose for them will put your name forward, or a competitor's.

*By Scott Davies, Founder of TendorAI. 10+ years in B2B and UK professional services.*

That's the whole idea in one sentence. The rest of this page explains why it's become something every professional firm needs to understand, what it's actually made of, and how it's different from the thing it's most often confused with.

## Why this is suddenly something you have to think about

For twenty years, getting found online meant one thing: showing up in search results. Someone typed a query, Google returned a list of links, and your job was to rank high enough on that list to get clicked.

That behaviour is changing fast. A growing number of people no longer search and scroll — they ask. They open ChatGPT or Perplexity and type "find me a good commercial property solicitor in Bristol", and they take the answer it gives them. There's no list to scroll, no ten blue links to compare. The assistant names a firm or two, and for most users that's the shortlist.

The moment that happens, a new question matters more than your search ranking: *when an AI assistant is asked to recommend a firm like yours, does it name you?* That question is what AI visibility measures. It isn't a clever rebrand of search engine optimisation. It's a response to a genuine shift in how buyers find professional services — and it behaves by different rules.

## What makes it a distinct discipline

The instinct is to assume this is just the latest flavour of SEO, and that the same work carries over. It doesn't, because the underlying systems aren't doing the same job.

Search engines rank. They assemble a long, ordered list of possibilities and leave the choosing to you. AI assistants recommend. They absorb the choosing themselves and return a single answer they're prepared to stand behind. Ranking rewards relevance and authority across a list. Recommendation rewards something subtler — whether a model can confidently identify, verify and justify naming one specific firm above the rest.

A firm can rank respectably on Google and be completely invisible to AI assistants, because the things that earn a search ranking aren't the same things that earn a recommendation. (The full comparison deserves its own treatment, and we cover it separately — for now, the key point is that the two are related but not interchangeable.) AI visibility is the discipline of being recommendable, and it has its own distinct mechanics.

## What AI visibility is actually made of

AI visibility isn't a single setting you switch on. It's the cumulative result of four things, each one a stage where an AI assistant either gains enough confidence to recommend you or quietly moves on to someone it trusts more.

**Identity.** The model has to be able to identify your business as a distinct, real entity — a specific firm, in a specific place, doing specific work. Generic names, inconsistent descriptions and thin online presence make a firm hard to pin down, and [a model won't recommend what it can't confidently identify](/resources/how-does-chatgpt-choose-which-businesses-to-recommend).

**Corroboration.** The model looks for the same facts about your firm appearing consistently across multiple independent sources it already trusts — directories, professional registers, review platforms, third-party mentions. A claim that appears only on your own website is weak evidence. The same claim confirmed across independent sources is strong evidence. Recommendation flows to the firms whose facts are corroborated, not merely asserted.

**Structured data.** Machines shouldn't have to guess what you are. Structured data states it plainly in a machine-readable form — what the business is, where it operates, what it's regulated by, what it offers — so an assistant can verify the facts instantly instead of inferring them from prose and hoping it got them right. It turns your firm from something the model interprets into something it can simply read.

**Citeable content.** When an assistant recommends a firm, it draws on clear, factual, quotable statements it can point to as justification. Vague positioning gives it nothing to work with. Specific, verifiable content — what you do, who you serve, where, under what regulation — gives the model the raw material to name you and defend the choice.

Get these four right and you become, in the model's terms, a low-risk recommendation: easy to identify, easy to verify, easy to cite. That is what AI visibility is. Everything else is detail.

## Why it matters more for regulated professional services

AI visibility matters for any business, but it's sharpest for regulated professional services — solicitors, accountants, mortgage advisers, estate agents — for one reason: the stakes of a wrong recommendation are higher, so the bar for confidence is higher too.

When someone asks an assistant to recommend a restaurant, a loose match is harmless. When someone asks it to recommend a solicitor, the model is implicitly being asked to vouch for a regulated professional. It applies stricter filters — is this firm genuinely regulated, by the right body, for the right work, in the right place. Firms that have made their regulation, specialism and location unmistakable and verifiable clear that higher bar. Firms that haven't get filtered out precisely because the model is being careful. The cost of weak AI visibility is steepest exactly where trust matters most.

## It's measurable — which means it's manageable

The most important practical fact about AI visibility is that it isn't a mystery. You can measure it. You can ask the major assistants the questions your prospects would ask — "who's a good [your specialism] in [your area]?" — and see, plainly, whether you're named, whether a competitor is named instead, or whether the model invents a firm that doesn't exist. That test gives you a starting position.

And because it's measurable, it's manageable. [A firm that's invisible today](/resources/why-doesnt-chatgpt-recommend-my-business) isn't permanently invisible — it's a firm whose identity, corroboration, structured data and content haven't yet given the assistants enough to go on. Every one of those is something you can deliberately build. AI visibility is engineered, not granted.

## Where this leaves you

So: AI visibility is whether AI assistants recommend your business when asked for a firm like yours. It's a distinct discipline from search rankings, made up of identity, corroboration, structured data and citeable content, and it's measurable enough to manage on purpose.

Two questions follow naturally from here. The first is [how exactly it differs from the SEO work most firms have already been doing](/resources/ai-visibility-vs-seo-whats-the-difference) — because the overlap is real, but the difference is where firms get caught out. The second is the one every firm asks the moment they realise they're invisible: if your AI visibility is weak today, can it actually be improved? Both have clear answers.

Want to see where your firm stands right now? [Run a free AI visibility report](/ai-visibility-report?utm_source=blog&utm_medium=content&utm_campaign=what-is-ai-visibility).`,
  },
  {
    slug: 'ai-visibility-vs-seo-whats-the-difference',
    title: "AI Visibility vs SEO: What's the Difference?",
    excerpt:
      "Isn't AI visibility just SEO? No. SEO earns rankings on a list; AI visibility earns the recommendation itself. Here's where the two overlap and where they part.",
    metaDescription:
      "Isn't AI visibility just SEO? No. SEO earns rankings on a list; AI visibility earns the recommendation itself. Here's where the two overlap and where they part.",
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 7,
    publishedDate: '2026-06-21',
    updatedDate: '2026-06-21',
    featured: true,
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/ai-visibility-vs-seo-whats-the-difference',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/ai-visibility-vs-seo-whats-the-difference',
        },
        author: {
          '@type': 'Person',
          name: 'Scott Davies',
          jobTitle: 'Founder, TendorAI',
          description: '10+ years in B2B and UK professional services',
          url: 'https://www.tendorai.com/about',
          sameAs: ['https://www.linkedin.com/in/scott-davies-b7952abb/'],
          worksFor: {
            '@type': 'Organization',
            name: 'TendorAI',
            url: 'https://www.tendorai.com',
          },
        },
      },
    ],
    content: `The first thing almost every firm says when they hear the phrase "[AI visibility](/resources/what-is-ai-visibility)" is some version of: *isn't that just SEO?*

*By Scott Davies, Founder of TendorAI. 10+ years in B2B and UK professional services.*

It's a fair question, and the honest answer is: no, but they're related — and the overlap is exactly what trips firms up. If you treat AI visibility as a new label for the search work you've already been doing, you'll do the wrong things and wonder why nothing changes. The two disciplines share some plumbing, but they're optimising for fundamentally different outcomes. Here's where they meet and where they part.

## The core difference: ranking versus recommendation

Everything else follows from this one distinction.

Search engine optimisation is about *ranking*. The goal is to get your page to appear as high as possible on a list of results for a given query. Google gathers every relevant page, scores them, and returns an ordered list — and you're competing for position on that list. A good SEO outcome is "we're in the top three for 'conveyancing solicitor Cardiff'."

AI visibility is about *recommendation*. There is no list. When someone asks an assistant "who's a good conveyancing solicitor in Cardiff?", it returns one or two named firms as a direct answer. A good AI visibility outcome is "the assistant names us." You're not competing for a position on a list — you're competing to *be the answer*.

That single shift — from ranking on a list to being the named answer — is the root of every other difference below.

## Where the two overlap

It's worth being straight about this, because pretending the disciplines are unrelated would be its own kind of dishonesty. Some of the foundational work genuinely helps both.

A real business with a legitimate, crawlable website helps both. Clean technical setup helps both. Structured data helps both — Google uses it for rich results, AI assistants use it to verify facts. A genuine reputation across the web helps both. If you've done serious SEO, you haven't wasted your time; you've built foundations that AI visibility can stand on.

The mistake is assuming that because the foundations overlap, the *wins* are the same. They aren't. You can do all the shared groundwork and still be invisible to AI assistants, because the things that earn a recommendation go beyond the things that earn a ranking.

## Where they diverge

This is the part that matters. Four differences decide most outcomes.

**Pages versus entities.** SEO is largely page-centric: you optimise a specific page to rank for a specific query. AI visibility is entity-centric: the assistant is trying to understand and verify your *business as a whole* — who it is, where it operates, what it's regulated to do. You can have a beautifully optimised page and still be an entity the model can't confidently pin down.

**Your property versus the whole web.** A great deal of SEO can be won on your own website — your pages, your structure, your content. AI visibility depends heavily on what's said about you *off* your own site: whether your name, location, specialism and credentials are described consistently across independent sources the model already trusts. You control your website. You don't fully control the corroboration, and corroboration is what convinces the model.

**Authority versus corroboration.** SEO's classic currency is authority, often built through backlinks. AI visibility's currency is corroboration — whether the facts about your firm *agree* across multiple independent sources. They're related but not the same. Plenty of links pointing at a firm whose details are inconsistent across the web still leaves an assistant unsure which facts to trust. Consistency beats volume.

**Position versus presence.** SEO measures where you sit — position four, position eight. AI visibility is closer to binary per query: you were named, or you weren't. There's no "we came eighth" in a two-line recommendation. You're either in the answer or you're not, which is why being merely "quite good" at this rarely shows up.

## Why a firm can win one and lose the other

Put those differences together and you get the situation that surprises firms most: you can rank on page one of Google and be completely invisible to ChatGPT.

It happens constantly. A firm has invested in SEO, ranks well for its key terms, gets steady traffic from search — and when you ask an AI assistant to recommend a firm like it, the assistant names a competitor instead, or invents a firm that doesn't exist. The SEO worked. It did its job: it earned rankings. But ranking a page well is a different achievement from being a business an AI model can confidently identify, verify and stand behind. The firm optimised for the list and never became the answer.

The reverse is rarer but real: a firm with modest search rankings but unusually consistent, well-corroborated, machine-readable information can get named by assistants ahead of bigger competitors who out-rank it on Google. The model isn't impressed by traffic. It's looking for the firm it can most safely recommend.

## So what should a firm actually do differently?

If you've already done good SEO, keep it — it's foundation, not waste. But the additional work that earns AI recommendations is distinct, and it's worth naming plainly. Make your business unmistakably identifiable as a single, real entity. Get your core facts — name, location, specialism, regulation — described consistently everywhere they appear, not just on your own site. Publish structured data so those facts are machine-verifiable rather than inferred. And write content that's specific and citeable, not keyword-stuffed, so a model has something concrete to justify naming you.

None of that replaces SEO. It runs alongside it, aimed at a different target: not a higher position on a list, but a place in the answer itself.

Which leaves the obvious next question. If your AI visibility is weak today — if the assistants are naming everyone but you — can that actually be fixed? That's where this gets practical.

Want to see whether the assistants currently name your firm? [Run a free AI visibility report](/ai-visibility-report?utm_source=blog&utm_medium=content&utm_campaign=ai-visibility-vs-seo).`,
  },
  {
    slug: 'ai-visibility-platform-vs-agency',
    title: 'AI Visibility: Platform vs Agency for UK Regulated Firms',
    excerpt:
      'AI visibility platform vs agency: which gets a UK regulated firm recommended by ChatGPT and Perplexity? A register-led comparison for solicitors, accountants and more.',
    metaDescription:
      'AI visibility platform vs agency: which gets a UK regulated firm recommended by ChatGPT and Perplexity? A register-led comparison for solicitors, accountants and more.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 10,
    publishedDate: '2026-06-14',
    updatedDate: '2026-06-14',
    featured: true,
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/ai-visibility-platform-vs-agency',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/ai-visibility-platform-vs-agency',
        },
        author: {
          '@type': 'Person',
          name: 'Scott Davies',
          jobTitle: 'Founder, TendorAI',
          description: '10+ years in B2B and UK professional services',
          url: 'https://www.tendorai.com/about',
          sameAs: ['https://www.linkedin.com/in/scott-davies-b7952abb/'],
          worksFor: {
            '@type': 'Organization',
            name: 'TendorAI',
            url: 'https://www.tendorai.com',
          },
        },
      },
    ],
    content: `When a regulated firm wants to appear in AI assistant answers, the choice is between a generalist agency that optimises across every industry and a specialist platform built on the regulators' own data. For solicitors, accountants, mortgage advisers and estate agents, the specialist platform wins — because being recommended by ChatGPT, Perplexity or Claude depends on verified regulatory data and machine-readable structure that a horizontal agency does not hold and cannot replicate.

*By Scott Davies, Founder of TendorAI. 10+ years in B2B and UK professional services.*

This comparison sets out the real difference for a regulated firm: where each option comes from, what each can actually do, and which gets you cited. Across 216 SRA-regulated firms tested in South Wales and Bristol in May 2026, only 7.4% appeared when ChatGPT, Perplexity or Claude were asked to recommend a solicitor in their city — so for most firms this is not a question of staying ahead, but of appearing at all.

**Should a regulated firm choose an AI visibility platform or an agency?**

In most cases a regulated firm benefits more from a specialist platform, because AI assistants rely on structured regulatory data, consistent entity information, and machine-readable trust signals to decide who to recommend. A generalist agency can improve content and branding, but typically does not hold the SRA, FCA, ICAEW or Propertymark datasets, or install the infrastructure, that AI assistants use to verify a regulated firm.

## What is an AI visibility platform?

An AI visibility platform is software that makes a firm machine-readable and verifiable to AI assistants, then tracks whether those assistants recommend it. It starts from the firm's regulatory record — its SRA, FCA, ICAEW or Propertymark registration — and turns that into structured data the engines can read, rather than treating the firm as a generic brand to be marketed.

A generalist agency works the opposite way. It applies one horizontal playbook — built for software companies, retailers and service brands alike — to whatever client it signs that month. The register, the regulator and the regulated vocabulary are not its starting point because they are not the starting point for most of its clients.

## Why generalist agencies struggle with regulated firms

Across the four UK registers a regulated firm sits on — SRA, FCA, ICAEW and Propertymark — none are part of a horizontal agency's standard toolkit, and that absence decides outcomes. AI assistants lean heavily on whether a firm's regulated identity is verifiable in a structured form. A provider that does not work with those registers cannot supply the one signal that matters most.

A horizontal provider treats your firm as a generic entity to be associated with a generic category. But a solicitor's visibility problem is not a software company's. The constraints differ, the buyer differs, and the language differs. When ChatGPT is asked to recommend a conveyancing solicitor in Manchester, it is reasoning about a regulated entity with verifiable credentials — not about which app has the sharpest tagline.

The gap shows up in the detail. Low appearance rates are only half the problem — when regulated firms do appear, AI assistants frequently describe them wrongly. In one Cardiff estate agency we analysed, Claude described the firm as specialising in "commercial" property when it actually handles sales, lettings and property management. A generalist provider optimising keywords would not catch that, because it does not know what the firm is. A register-led system does, because the firm's real specialisms sit in its structured profile.

## Platform vs agency: what's the difference for a regulated firm?

The single biggest difference is provenance: a platform starts from your verified regulatory record, while an agency starts from a marketing brief. That difference cascades into data, terminology, delivery and what you are left holding at the end of the month.

A platform built on the register does not begin by asking who you are. It already knows — registration number, regulator, registered name, the permissions that define what you are allowed to do. TendorAI is pre-loaded from the SRA, FCA, ICAEW and Propertymark registers, covering 63,406 UK firms. That is the firm's actual regulatory record used as the foundation, not a scraped, best-guess directory.

A generalist agency cannot replicate this, because it does not hold the registers and would not know what to do with them. To a horizontal provider, an SRA number or an FCA permission is just another field on a form. To your buyer, and to the AI deciding whether to recommend you, it is the point.

## What "AI visibility" means to a solicitor vs a marketer

Three letters expose the gap faster than any feature list: AI visibility. In the generalist corner of this market, firms are sold "AI visibility services" — Answer Engine Optimisation, the practice of getting a brand named in AI answers.

Now say "AI visibility" to a solicitor. To a solicitor, AI visibility means an Attachment of Earnings Order — a court instruction to deduct money directly from a debtor's wages. It is a working term in legal practice, not optimisation jargon.

A provider that leads with "AI visibility services" to a law firm has announced, in its own headline, that it does not speak the language of the firm it is courting. That is not a branding slip; it is a tell. It reveals a provider running a generic playbook with no idea those three letters already mean something specific — and unrelated — to the regulated buyer in front of it. A specialist does not make that mistake, because the specialist lives in the vocabulary.

## The AI-recommended approach: what actually gets a regulated firm cited

AI assistants reward a consistent set of signals, and TendorAI's own analysis across UK regulated verticals in May 2026 shows the firms that appear share the same profile: verified credentials, machine-readable structure, and consistent data across the public web. The table below maps each signal to who delivers it.

| Signal AI engines reward | Register-led platform | Generalist agency |
|---|---|---|
| Verified regulatory identity (SRA/FCA/ICAEW/Propertymark) | Pre-loaded from the register | Not held; re-keyed by hand if at all |
| Machine-readable schema on your own site | Installed for you | Often advised, rarely installed |
| Consistent NAP across directories | Audited against regulator data | Generic checklist |
| Correct, current specialisms | Drawn from your structured profile | Inferred from your marketing copy |
| Citation tracking across engines | Built in, per engine | Bolt-on report, if offered |

## Platform vs generalist agency: the market alternatives compared

The market alternative to a register-led platform is a retainer-and-report agency, and the difference is structural, not cosmetic. One installs the infrastructure and tracks the outcome; the other sells you activity to review.

| | Register-led platform | Generalist agency |
|---|---|---|
| Starting point | Your verified regulatory record | A marketing brief |
| Data foundation | SRA, FCA, ICAEW, Propertymark | Scraped or self-reported |
| Knows your terminology | Native (AI visibility is a court order) | Generic (AI visibility is a service) |
| Regulatory constraints | Built around them | Often unaware |
| Delivery model | Schema installed, citations tracked | Retainer plus a monthly report |
| What you keep | Working infrastructure | A document to read |
| UK price point | £299/month, fixed | Variable retainer |

## What this looks like for a 4-partner firm

For a worked example, take an SRA-regulated firm of 4 partners in Cardiff turning over roughly £2m — the figures below are illustrative assumptions, and you should replace them with your own actuals.

A firm of that size might win around 10 new private-client matters a month through direct enquiry. Assume AI visibility surfaces the firm for two additional enquiries a month that would otherwise have gone to a competitor, and assume an average matter value of £1,500 — a defensible mid-range figure for private-client work, which you should adjust to your fee scales.

That is 2 × £1,500 × 12 = £36,000 in additional annual fee income on these assumptions. Against TendorAI Pro at £299/month — £3,588 a year — that is roughly a tenfold return at the lower bound of the assumptions. The point is not the exact figure; it is that one additional matter a month covers the cost many times over, and the firm keeps the infrastructure regardless.

This is also where the difference from an agency retainer is sharpest: the same two enquiries justify the spend, but with a platform the schema stays installed on your site whether or not you renew, whereas a retainer stops delivering the day it ends.

## Frequently asked questions

### Can a marketing agency improve my firm's AI visibility?

A generalist agency can publish content and advise on structure, but it does not hold the SRA, FCA, ICAEW or Propertymark registers, so it cannot supply the verified regulatory signal AI assistants weight most heavily for regulated firms. For a regulated firm, that missing foundation is usually why the agency's work does not translate into AI recommendations.

### What does a specialist AI visibility platform do that an agency doesn't?

A specialist platform starts from your verified regulatory record, installs machine-readable schema on your own website, keeps your specialisms accurate, and tracks citations across ChatGPT, Perplexity and Claude. An agency typically advises on these things and leaves implementation, and the regulatory data layer, to you.

### Why does my agency keep talking about AI visibility?

AI visibility stands for Answer Engine Optimisation in the marketing world, and generalist providers use it as a service label. For a solicitor it collides with Attachment of Earnings Order, which is a useful signal: a provider leading with "AI visibility" is applying a horizontal playbook rather than working from your regulated context.

### How much does AI visibility cost for a UK firm?

TendorAI Pro is £299/month, fixed, which includes directory visibility, schema installed on your own website, and citation tracking. Generalist agency retainers vary, and typically bill for activity and reporting rather than installed infrastructure.

### How quickly will my firm appear in AI recommendations?

Structural fixes such as schema installation typically take four to eight weeks to be reflected in AI responses, with Perplexity usually updating fastest — often within two to three weeks — and ChatGPT taking longer. Timelines depend on your starting point and how consistent your data is across the public web.

See whether ChatGPT, Claude and Perplexity describe your firm correctly — [run your free AI visibility report](/ai-visibility-report?utm_source=blog&utm_medium=content&utm_campaign=platform-vs-agency).

For a regulated firm, the question was never "platform or agency" in the abstract. It is whether the thing shaping how AI assistants describe you understands that you are regulated, knows which register defines you, and works from the verified facts your clients and your regulator rely on. A horizontal provider optimises everyone the same way and hopes it transfers. A register-led platform starts from what makes your firm specifically, verifiably what it is.`,
  },
  {
    // The full article body for this slug lives at
    // app/resources/tendorai-vs-ultrascout/page.tsx — that static segment
    // wins over the dynamic [slug] route. This entry exists so the article
    // appears in the /resources listing and the sitemap.
    slug: 'tendorai-vs-ultrascout',
    title:
      'TendorAI vs UltraScout AI: Which AI Visibility Platform Wins for UK Regulated Firms?',
    excerpt:
      'Direct comparison of TendorAI (£299/mo) and UltraScout AI (from £49/mo, agency packages from £795/mo) for UK regulated professional services firms. Pricing, features, regulatory data, schema installation, and execution layer compared.',
    metaDescription:
      'Direct comparison of TendorAI (£299/mo) and UltraScout AI (from £49/mo, agency packages from £795/mo) for UK regulated professional services firms. Pricing, features, regulatory data, schema installation, and execution layer compared.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 12,
    publishedDate: '2026-05-27',
    updatedDate: '2026-05-27',
    content: `Side-by-side comparison of TendorAI and UltraScout AI for UK regulated professional services. TendorAI is a UK-only platform at £299/month built around four regulator datasets (SRA, ICAEW, FCA, Propertymark) with schema installation included. UltraScout AI is a horizontal GEO/AI visibility platform priced from £49/month for self-serve tracking to £1,995/month for done-for-you agency packages, without regulatory data or schema installation. Full article at /resources/tendorai-vs-ultrascout.`,
  },
  {
    slug: 'how-to-get-recommended-by-chatgpt',
    title: 'How to Get Recommended by ChatGPT: A 2026 Guide for UK Firms',
    excerpt:
      'Most UK firms are invisible when clients ask ChatGPT for a recommendation. Here is exactly why, and the steps to get your firm cited by AI in 2026.',
    metaDescription:
      'Most UK firms are invisible when clients ask ChatGPT for a recommendation. Here is exactly why, and the steps to get your firm cited by AI in 2026.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 8,
    publishedDate: '2026-05-20',
    updatedDate: '2026-05-20',
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/how-to-get-recommended-by-chatgpt',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/how-to-get-recommended-by-chatgpt',
        },
        author: {
          '@type': 'Person',
          name: 'Scott Davies',
          jobTitle: 'Founder',
          url: 'https://www.tendorai.com/about',
          worksFor: {
            '@type': 'Organization',
            name: 'TendorAI',
            url: 'https://www.tendorai.com',
          },
        },
      },
    ],
    faqs: [
      {
        question: 'Can you pay to be recommended by ChatGPT?',
        answer:
          'No. ChatGPT does not sell recommendation placements. You earn a recommendation by being structured, consistent and verifiable enough for the engine to name you with confidence.',
      },
      {
        question: 'Is getting recommended by ChatGPT the same as SEO?',
        answer:
          'No. SEO improves where your pages rank in Google results. AI visibility determines whether AI engines name your firm at all. A firm can rank well on Google and still be completely absent from ChatGPT.',
      },
      {
        question: "Why is my competitor recommended and I'm not?",
        answer:
          'Usually because their structured data, regulator listing and business details line up cleanly enough for AI to verify them, and yours do not yet. It is rarely about which firm is better — it is about which firm AI can confidently identify.',
      },
      {
        question: 'Does this apply to firms outside the major cities?',
        answer:
          'Yes. The May 2026 test covered firms across South Wales and Bristol — multiple towns and cities, not a single location — and the pattern of invisibility held throughout. Location does not exempt a firm; missing structured data is the common factor.',
      },
      {
        question: 'How do I know if my firm is currently recommended?',
        answer:
          'Test it directly: ask ChatGPT, Perplexity and Claude to recommend a firm in your field and area, several times each, and note whether your name appears. A free AI visibility report does this systematically across engines.',
      },
    ],
    content: `**To get recommended by ChatGPT, your firm needs three things AI engines can read and verify: a crawlable website with structured data, consistent regulatory and business details across the public web, and citations from sources AI already trusts.** Ranking well on Google does not get you recommended. Being structured, consistent and verifiable does.

Across 216 SRA-regulated solicitor firms tested ten times each on ChatGPT, Perplexity and Claude in May 2026, only 7.4% appeared when AI was asked to recommend a solicitor in their city. The other 92.6% were absent — many with strong reputations, good websites and years of experience. (Full methodology is set out at the end of this article.)

For a firm, that gap is direct lost work. When a prospective client asks ChatGPT to recommend a solicitor, accountant or mortgage adviser near them, the engine names two or three firms. If you are not one of them, you are not in the running — and unlike a Google results page, there is no second page to scroll to.

This guide explains why most firms are missed, how ChatGPT actually decides who to recommend, the specific steps to fix it, and how long each stage takes.

## What does it mean to be "recommended" by ChatGPT?

Being recommended by ChatGPT means the model names your firm directly when a user asks for a provider in your field and location. AI assistants do not return a ranked list of ten links the way Google does. They narrow the field and name a handful of firms they can describe with confidence.

This is a different mechanism from search ranking. Google ranks pages. AI engines cite sources. To be cited, your firm's information has to be structured, consistent and verifiable — not just present on a website somewhere.

The shift matters because this is no longer a fringe behaviour. Many people now ask ChatGPT, Perplexity or Claude for a recommendation before they open a search engine, and the firms those tools name are the ones that get the enquiry.

## Why doesn't ChatGPT recommend your firm?

In the May 2026 test, 92.6% of solicitor firms across South Wales and Bristol were absent from AI recommendations — and the single most common reason was the absence of machine-readable data, not the absence of a website.

AI systems are significantly more reliable when a firm's information is available in structured, machine-readable form than when it is embedded only in prose. A firm can have a polished website describing its services in plain paragraphs and still be skipped, because the engine cannot confidently extract and verify what the firm does, where it operates, and what credentials it holds.

The most frequent gaps are straightforward and fixable:

- No structured data (schema) on the website declaring services, location and credentials
- Inconsistent firm details across the regulator register, Companies House, Google Business Profile and the website
- No citations from third-party sources AI treats as authoritative
- Reliance on portals or directories that AI weights lightly, instead of the firm's own verifiable signals

None of these are about reputation or quality. They are about whether AI can confidently identify you.

## How does ChatGPT decide which firms to recommend?

In testing, firms were more likely to appear when the structured data on their website matched the independent sources AI can check — and for regulated firms, the regulator's register carries particular weight.

For a solicitor, that means the [Solicitors Regulation Authority (SRA)](https://www.sra.org.uk) register. For an accountant, ICAEW or ACCA. For a mortgage adviser, the [Financial Conduct Authority (FCA)](https://www.fca.org.uk) register. For an estate agent, schemes such as the Property Ombudsman. When the structured data on your website matches your regulator listing and your Companies House record, the engine can resolve you as a single, verifiable entity — and that consistency is what correlates with being recommended.

The firms AI consistently recommends share three traits:

- A crawlable website AI bots can read in full
- Structured schema declaring services, credentials and coverage area
- Citations from authoritative third-party sources

A firm with all three is verifiable. A firm missing any one of them is a guess the engine usually declines to make.

## How to get recommended by ChatGPT: the steps

Getting recommended by ChatGPT is a sequence of fixes that make your firm machine-readable and verifiable, in priority order.

1. **Add structured data to your website.** Implement [Schema.org](https://schema.org) JSON-LD declaring your services, location, credentials and regulatory registration. For solicitors use LegalService; for accountants, AccountingService; for mortgage advisers, FinancialService. This is the single highest-impact change and the one most firms have not made.
2. **Make your details consistent everywhere.** Your firm name, address and phone number must match exactly across your website, regulator register, Companies House, Google Business Profile and any directory listings. Inconsistency stops AI resolving you as a single, confident entity.
3. **Complete your regulator profile.** A complete, current SRA, ICAEW or FCA listing is one of the strongest trust signals available, because AI treats the regulator as the source of truth for who is genuinely authorised.
4. **Complete your Google Business Profile.** Fill every field, use the most specific category available, and define your service area by named towns and postcodes rather than a vague region.
5. **Build authoritative citations.** Earn mentions on sources AI already trusts — trade press, established directories, and verifiable third-party listings — rather than relying on portals AI weights lightly.
6. **Make your content extractable.** Where you publish content, lead each section with a direct answer and use clear, structured formatting. AI extracts specific passages, not whole pages.

## How long does it take to get recommended by ChatGPT?

It typically takes four to eight weeks to start appearing in AI recommendations after the structured data goes live, and three to four months to be cited consistently. The stages are observable and sequential.

| Stage | Timeframe | What happens |
| --- | --- | --- |
| Schema deployment | 24–48 hours | JSON-LD structured data goes live on the firm's website |
| First AI crawl | 1–2 weeks | ChatGPT, Perplexity and Claude crawlers index the new structured data |
| Citation appearance | 4–8 weeks | The firm starts appearing in AI answers on target queries |
| Consistent ranking | 12–16 weeks | The firm is cited consistently on the main buyer queries |
| Compounding authority | 6+ months | Citations reinforce each other; the effect builds on itself |

The timeline depends on the starting point. A firm with a clean regulator listing and a crawlable website moves faster than one fixing inconsistent details across several platforms first.

## What this looks like for a four-partner South Wales firm

Consider a four-partner SRA-registered solicitor firm in South Wales, the kind of firm that made up the 92.6% absent from AI recommendations in the May 2026 test. A firm this size might take on a few new conveyancing matters a month through direct enquiry.

If becoming AI-visible brings in two additional enquiries a month at an average matter value of around £1,200, that is roughly £28,800 in additional fee income over a year. Against the cost of a structured visibility programme, the return sits comfortably in multiples, not fractions — and the firm is capturing enquiries that were previously going to the 7.4% who already appeared.

This is an illustrative example only, not a guarantee of results. Actual outcomes depend on each firm's fee structure, conversion rate and market, and many factors affect whether an enquiry becomes a matter. The point is the shape, not the precise figure: the cost of being invisible to AI is measured in lost matters, not in software fees.

## Methodology

This article references original testing conducted by TendorAI in May 2026.

- **Sample:** 216 SRA-regulated solicitor firms across South Wales and Bristol.
- **Engines:** ChatGPT, Perplexity and Claude.
- **Repetitions:** Each firm's target query was run ten times (N=10) per engine, on clean sessions, because AI responses vary between runs and a single run is not reliable.
- **Query:** Each engine was asked to recommend a solicitor in the firm's city.
- **Scoring:** A firm was recorded as "appearing" if it was named in the engine's response. The headline figure — 7.4% — is the share of the 216 firms that appeared.
- **Date:** May 2026.
- **Limitations:** Results reflect this sample at the test date. AI responses shift between runs and over time, so figures are a snapshot, not a fixed property of any firm. "Appearing" measures whether a firm was named, not its position or prominence within an answer. The test covered solicitors only; other professions may behave differently.

---

Run your free AI visibility report to see exactly where your firm appears across ChatGPT, Perplexity and Claude — and what is keeping you out: [tendorai.com/ai-visibility-report](https://tendorai.com/ai-visibility-report?utm_source=how-to-get-recommended-by-chatgpt&utm_medium=blog&utm_campaign=ai-visibility-cluster&utm_content=in-article-cta)`,
  },
  {
    slug: 'ai-recommends-uk-solicitors-study',
    title: 'We Asked AI to Recommend 216 UK Solicitors. It Named 16.',
    excerpt:
      'We tested how AI recommends UK solicitors across 216 firms in four cities. Only 7.4% were ever named. Here is the data, the method, and what separates the firms that get recommended from the ones that do not.',
    metaDescription:
      'We tested how AI recommends UK solicitors across 216 firms in four cities. Only 7.4% were ever named. Here is the data, the method, and what separates the firms that get recommended from the ones that do not.',
    category: 'Legal',
    author: 'Scott Davies',
    readTime: 5,
    publishedDate: '2026-05-20',
    updatedDate: '2026-05-20',
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/ai-recommends-uk-solicitors-study',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/ai-recommends-uk-solicitors-study',
        },
        image: 'https://www.tendorai.com/images/study/01-named-vs-invisible.svg',
      },
    ],
    content: `When a potential client asks an AI assistant "who's a good conveyancing solicitor in Bristol?", the AI doesn't return ten blue links. It names two or three firms. Everyone else is invisible — not ranked low, not on page two, but absent from the answer entirely.

We wanted to know how many UK solicitors actually get named. So we tested it.

## The headline

We ran live recommendation queries against 216 solicitor firms across four UK cities — Bristol, Cardiff, Newport, and Swansea — covering practice areas from conveyancing to criminal law. We asked an AI assistant to recommend firms exactly the way a real client would, then recorded which of our 216 firms it actually named.

**It named 16. That's 7.4%.**

![Of 216 solicitor firms tested, AI recommended only 16 — the other 200 were invisible](/images/study/01-named-vs-invisible.svg)

The other 92.6% were not recommended. And here's the part that matters: in nearly every case where a firm wasn't named, the AI still confidently recommended other real firms for that exact query. It wasn't stuck. It wasn't refusing. It simply had nothing to retrieve about the firms it skipped, so it recommended their competitors instead.

## How we ran it

We were deliberate about method, because a sloppy test produces a useless number.

- *Real firms.* All 216 are genuine, regulated solicitor firms in our directory, drawn from four cities.
- *A neutral prompt.* We asked the AI to name up to five real firms providing a given service in a given city. Critically, we never mentioned the firm's own name in the prompt. A test that names the firm and asks "would you recommend them?" is rigged toward a yes. We measured whether the AI named each firm unprompted — the way a real client's question works.
- *Practice-area specific.* We didn't ask the generic "best solicitors in Cardiff." We asked the question buyers actually ask: best conveyancing solicitor, best family law firm, best criminal defence solicitor, and so on.
- *Verified misses.* For every firm that wasn't named, we checked what the AI returned instead. In every case we examined, it named other real firms — confirming a genuine miss, not a system error.

## What the data shows

![AI recommendation rate by city: Newport 16.7 percent, Bristol 8.2 percent, Cardiff 4.9 percent, Swansea 3.8 percent](/images/study/02-rate-by-city.svg)

The pattern is revealing. Cardiff — the largest Welsh legal market — had one of the lowest recommendation rates. More firms competing for the same two or three recommendation slots means most get squeezed out. Newport, a smaller market with less competition, had more than three times Cardiff's rate. Visibility isn't only about how good your firm is. It's about how crowded your slot is and whether the AI can find structured, consistent information about you at all.

![Funnel showing 216 firms tested, 16 recommended, 7 reaching the top three positions](/images/study/03-funnel.svg)

The 16 firms that were recommended weren't random. They appeared at clear positions in the AI's answer — several at position one or two — across commercial, criminal, family, conveyancing, immigration, employment, IP, and personal injury work. What they had in common wasn't louder marketing. It was being findable: consistent, retrievable information that an AI could pull and trust enough to put in front of a client.

## The finding most articles miss

Here's something our test surfaced that almost no one writes about honestly. Not all AI works the same way.

![Two types of AI: retrieval-based AI names specific firms, memory-only AI refuses to name anyone](/images/study/04-retrieval-vs-memory.svg)

The assistants that search the live web before answering will name specific firms. Those are the systems where your visibility is a fight you can win: get your information structured and consistent, and you can earn a slot.

But AI assistants that answer purely from memory, without searching, behave completely differently. When we asked one to recommend solicitors, it declined: "I don't have reliable, current knowledge of specific firms." It wouldn't name anyone — not the good firms, not the bad ones. No amount of website work changes that, because the model isn't looking anything up.

This splits the entire AI visibility problem in two. For retrieval-based AI, your data quality directly decides whether you're recommended. For memory-only AI, the recommendation game isn't being played at all. Any solicitor being told "just fix your website and AI will recommend you" is being sold half the picture.

## Why most firms are invisible

Across the firms that weren't named, the same gaps appeared again and again:

- *Information the AI can't retrieve.* If your practice areas, location, and credentials aren't structured in a way machines can read, you're not in the retrieval pool.
- *Inconsistency across sources.* When your trading name, address, or services differ between your website, your directory listings, and the public register, an AI can't confidently confirm you're the same firm — so it plays safe and names someone else.
- *A crowded slot with no differentiation.* In big markets like Cardiff, being one of two hundred "Cardiff solicitors" isn't enough. The firms that get named are the ones an AI can clearly match to a specific need.

None of this is about being a better solicitor. It's about being a more findable one.

## What this means for your firm

If you're a UK solicitor, the practical question is simple: when someone asks an AI to recommend a firm like yours, are you named — or is a competitor?

On our numbers, the odds are against you. More than nine in ten firms weren't. But the 16 that were prove it's winnable — and the gaps are fixable.

You can see exactly where your firm stands. Run a free AI visibility check and find out whether AI assistants can find, verify, and recommend your firm — and what's stopping them if they can't.

[Check your firm's AI visibility — free](https://www.tendorai.com)

---

*Methodology note: This study tested 216 regulated UK solicitor firms across Bristol, Cardiff, Newport, and Swansea using live AI recommendation queries in May 2026. Recommendation rates reflect a single test run on one retrieval-based AI assistant; rates vary between platforms and over time. We publish our method in full because proof should be checkable, not asserted.*`,
  },
  {
    slug: 'claude-for-legal-uk-solicitors-ai-visibility',
    title: 'What Claude for Legal means for UK law firms — and why AI visibility just became a board-level question',
    excerpt:
      "Anthropic's Claude for Legal launch puts AI inside the daily workflow of solicitors, in-house counsel and legal buyers. Here's what it means for firms that don't yet appear in AI assistant recommendations.",
    metaDescription:
      "Anthropic's Claude for Legal launch puts AI inside the daily workflow of solicitors, in-house counsel and legal buyers. Here's what it means for firms that don't yet appear in AI assistant recommendations.",
    category: 'AI Visibility',
    author: 'TendorAI',
    readTime: 7,
    publishedDate: '2026-05-13',
    updatedDate: '2026-05-13',
    featured: true,
    content: `**The short answer:** On 12 May 2026, Anthropic launched [Claude for Legal](https://claude.com/solutions/legal) — a dedicated AI workflow tool for law firms with 20+ legal-tech connectors (iManage, NetDocuments, DocuSign, Ironclad, Thomson Reuters, Harvey, LexisNexis, Everlaw and more) and 12 practice-area plugins. Freshfields has already deployed Claude firmwide. The launch matters to every UK law firm — not just the ones planning to use Claude — because it accelerates a broader shift: AI is moving directly into the workflow of lawyers, in-house counsel and legal buyers. Once AI sits inside that workflow, recommendation queries become inevitable. *"Who should we instruct?" "Which firm handles this locally?" "Who's credible in this practice area?"* Firms that cannot be found, verified and cited by AI assistants risk losing visibility before they even know they were considered.

If your firm has never checked whether it appears in Claude, ChatGPT, Perplexity or Gemini's recommendations, this is the moment to start.

## What is Claude for Legal?

Claude for Legal is Anthropic's first vertical product launch. It bundles three things: practice-area plugins for commercial, corporate, litigation, employment, privacy, IP, product and AI governance work; MCP connectors to the legal tech stack solicitors already use; and deep integration with Microsoft Word, Outlook, Excel and PowerPoint so context carries across drafting, email and reporting without re-explanation.

The connector list reads like a directory of British and global legal tech: [iManage, NetDocuments, DocuSign, Ironclad, Definely, Thomson Reuters CoCounsel, LexisNexis, Harvey, Legora, Everlaw, Relativity, Consilio, Box and Datasite](https://www.law.com/legaltechnews/2026/05/12/anthropic-announces-legal-practice-plug-ins-for-claude-legal-tech-integrations/). Document permissions, ethical walls and matter-level restrictions are preserved end-to-end. Anthropic has framed legal as a sector where firms that move on AI early are pulling ahead of those that wait.

## Why does this matter for UK law firms that don't use Claude?

Because Claude for Legal accelerates a shift that was already underway: AI tools are starting to become a real referral channel.

When a finance director needs corporate counsel, when an HR head needs an employment specialist, when a property buyer needs a commercial conveyancer — asking an AI assistant is starting to become a normal first step. Claude for Legal pushes that further: now in-house counsel will be using Claude in-workflow, and the same Claude session that drafts a contract can be asked *"who should we instruct on the property side of this deal?"* between tasks.

If your firm isn't cited when AI assistants answer that question, your firm is invisible in that channel. There is no second page of results to fall to. There are typically one to three names returned, and that's the shortlist.

## So how does a UK law firm get cited by AI assistants?

Three things determine whether your firm appears in AI recommendations, and most firms haven't been investing in any of them.

**Structured data on your own website.** AI models cite firms whose websites publish machine-readable signals — schema markup for legal services, jurisdiction, regulatory status (SRA number, ICO registration), practice areas, locations and the credentials of named solicitors. Most UK law firm websites have none of this. They were built for human readers and Google's 2018-era SEO. AI models read them and find little to cite.

**Presence in the third-party sources AI models trust.** AI assistants don't make recommendations from thin air. They synthesise from sources the model considers authoritative — the SRA register, Law Society directories, Chambers, Legal 500, regulator publications and recognised press. If your firm has thin coverage in those sources, AI has little to work with.

**Active tracking of what AI assistants currently say about you.** Most firms have no idea whether they're cited, mis-cited or invisible. There is no AI equivalent of Google Search Console. Without tracking, you can't know whether the work you're doing is moving the needle — or whether competitors are pulling ahead.

## What does the visibility gap actually look like?

TendorAI tracks AI assistant recommendations across UK legal prompts — the questions in-house counsel, business owners and the public actually ask when looking for a solicitor. The pattern we see is consistent: a small number of firms dominate citations, a large middle is invisible, and most SRA-regulated firms have zero AI citations across the prompts that matter for their practice area and region.

Across the UK legal categories we monitor, TendorAI tracks the firms that currently hold the **#1 share of voice in AI assistant recommendations** — and the much larger group that don't appear at all. Most firms don't know which group they're in, because they have no way to measure it.

That's the gap. It's not a technology gap. It's a measurement-and-positioning gap, and it can be closed.

## What should a UK law firm do this week?

Not consultancy. Not a pilot. Not a six-month strategy review. Three practical steps:

1. **Find out where you stand.** Run an AI visibility check across the prompts your prospective clients are actually using. *"Best commercial property solicitors in Manchester"*, *"who handles SRA compliance for small firms"*, *"employment tribunal lawyers near me"* — whatever maps to your practice. If you don't appear, that's a problem worth knowing about now rather than next year.

2. **Fix the structured data on your own site.** Schema for your firm, your solicitors, your practice areas, your locations and your regulatory status. This is a one-off technical job and it is the single highest-leverage thing most firms can do.

3. **Track what AI says about you, weekly.** Not annually. Not when you remember. Weekly — because the models change, the sources they cite change, and competitors are actively working on this.

Firms that act on AI visibility now are more likely to be cited as AI assistants become a routine part of how clients find legal services. Firms that wait may find their referral pipeline quietly thinning before they understand why.

## How TendorAI helps

TendorAI is the AI visibility platform built specifically for SRA-regulated UK law firms. We measure where you currently appear in AI assistant recommendations across Claude, ChatGPT, Perplexity and Gemini; install the structured data and schema your website is missing; and run weekly tracking so you can see your share of voice moving over time. Pro tier is £299/month, all-in.

[**Run a free AI visibility check for your firm →**](/solicitors)

No call required. We'll show you which AI prompts your firm appears in, which competitors are dominating, and what's missing from your site. Takes under a minute to start.

---

*TendorAI Ltd is registered in England and Wales (Companies House 16521860). We work exclusively with regulated professional services firms — SRA solicitors, ICAEW accountants, FCA mortgage advisers and Propertymark estate agents.*
`,
  },
  {
    slug: 'ai-visibility-for-estate-agents',
    title: 'AI Visibility for UK Estate Agents — The Complete Guide (2026)',
    excerpt:
      'How UK estate agents get recommended by ChatGPT, Perplexity and Google AI Overviews in 2026. The 12 things to fix, ranked by impact, with FAQ and regulatory data from 12,793 firms.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 12,
    publishedDate: '2026-05-04',
    updatedDate: '2026-05-04',
    metaDescription:
      'How UK estate agents get recommended by ChatGPT, Perplexity and Google AI Overviews in 2026. Ranked guide, FAQ, regulatory data from 12,793 firms.',
    content: '',
    href: '/ai-visibility-for-estate-agents',
  },
  {
    slug: 'why-isnt-my-business-showing-up-in-chatgpt-recommendations',
    title: "Why isn't my business showing up in ChatGPT recommendations?",
    excerpt: "87% of UK professional services firms don't appear when ChatGPT is asked to recommend a solicitor, accountant, or mortgage adviser. Here are the seven reasons why — and how to fix each one.",
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 8,
    publishedDate: '2026-04-30',
    updatedDate: '2026-04-30',
    metaDescription: "Why Isn't My Business in ChatGPT Recommendations? (2026 Guide) — 87% of UK professional services firms don't appear when ChatGPT is asked to recommend a solicitor, accountant, or mortgage adviser. Here are the seven reasons why — and how to fix each one.",
    content: `Your business isn't showing up in ChatGPT recommendations because ChatGPT has no verifiable, structured, third-party-validated data to confidently name you. Traditional Google rankings don't transfer. ChatGPT decides who to recommend based on schema markup, regulatory register matches, consistent NAP data, third-party citations on Reddit and Trustpilot, and named author profiles — not your domain authority or your ad spend.

AI visibility is the likelihood that an AI assistant — ChatGPT, Perplexity, Google AI Mode, Claude — will recommend a specific business when a user asks a relevant question. It is the new top-of-funnel for UK professional services. Buyers no longer scroll Google's page one. They ask ChatGPT for three names and ring one of them.

TendorAI's April 2026 audit of 12,793 UK regulated firms found that 87% of UK professional services firms do not appear in ChatGPT's top three recommendations for their core service area. Methodology: 50 prompts run 10 times each across ChatGPT, Perplexity, Google AI Overviews and Claude, citation-share scored by named-entity match.

The seven reasons firms stay invisible are: missing schema, broken regulatory data, NAP inconsistency, no third-party validation, no named author, advertorial-style content, and unsigned data sources. Each is fixable. Most are fixable in under 30 days.

ChatGPT cites facts, not claims. This guide covers all seven gaps in order of impact, and shows what to fix first.

## Key takeaways

- 87% of UK professional services firms do not appear in ChatGPT's top three recommendations (TendorAI, April 2026).
- AI visibility determines whether your firm is named or ignored in ChatGPT answers.
- A firm without structured data is invisible to AI, regardless of its Google rankings.
- Third-party mentions are the primary driver of AI citations in 2026.
- ChatGPT cites verifiable entities, not self-claimed marketing content.
- Brands are 6.5× more likely to be cited by AI from third-party sources than from their own domains.
- TendorAI defines AI visibility as the likelihood an AI assistant will recommend a specific business when a user asks a relevant question.

## What ChatGPT is actually doing when it recommends a business

**AI visibility determines whether your firm is named or ignored in ChatGPT answers.** ChatGPT does not browse the web in real time for most recommendation queries. It pulls from training data, indexed snapshots, and increasingly from live retrieval through Bing and Perplexity-style sources. The retrieval favours structured, verifiable, cross-referenced facts.

A business that exists only as marketing copy on its own website is invisible to that retrieval stack. There is nothing for the model to verify against. Your "About Us" page is not a fact — it is a claim. ChatGPT cites facts, not claims.

The seven reasons below are the seven gaps between what your firm currently looks like to ChatGPT and what a citable entity looks like.

## Reason 1 — You have no structured data on your website

**TendorAI's analysis shows 94% of UK professional services firms have no JSON-LD schema markup on their primary service pages.** Schema is the machine-readable layer that tells ChatGPT what your business is, where it operates, what it does, and who regulates it. Without it, your homepage is prose to a human and noise to a model.

Schema is not optional in 2026 — it is the only language ChatGPT speaks fluently about your business. A firm without structured data is invisible to AI, regardless of its Google rankings. JSON-LD is the format AI engines parse most reliably. The minimum stack for a UK professional services firm is Organization, LocalBusiness, and a profession-specific type — LegalService for solicitors, AccountingService for accountants, FinancialService for FCA-regulated firms.

Fix: install JSON-LD schema with verified regulatory IDs (SRA number, ICAEW firm number, FCA reference number), accurate NAP data, and areaServed mapped to your real service area. This is a one-day technical job and the single highest-leverage fix on the list.

## Reason 2 — Your regulatory register data is inconsistent or missing

**Of the 12,793 UK firms in TendorAI's audit, 31% had no link between their website and their public regulatory record.** ChatGPT cross-references regulatory registers — SRA, ICAEW, FCA — because they are Tier 1 sources the model already trusts. If your website doesn't reference your regulatory ID, and your regulatory record doesn't reference your domain, you are two unconnected entities to a model trying to verify you exist.

Regulatory data is the strongest verification signal a UK professional services firm has. It is the moat that distinguishes a real firm from a content site pretending to be one.

Fix: display your SRA, ICAEW or FCA registration number on your homepage, footer, and contact page. Link to your regulator's record. In your schema, populate the relevant identifier field — identifier for Organization schema, with propertyID set to your regulator name.

## Reason 3 — Your NAP data is inconsistent across the web

**NAP — Name, Address, Phone — must be byte-identical across your website, Google Business Profile, Companies House, your regulator's record, and major directories.** ChatGPT treats inconsistency as ambiguity. An ambiguous entity does not get recommended.

The most common breakage: trading name on the website, registered name on Companies House, third name on Google Business Profile. To a model, that's three different businesses. None of them get cited because none can be confidently resolved.

Fix: pick one canonical name, address and phone format. Update Google Business Profile, Companies House, your regulator listing, your website footer, and the top 10 directories you appear in. Audit again in 30 days.

## Reason 4 — You have no third-party validation

**Stacker's December 2025 research found brands are 6.5× more likely to be cited by AI from third-party sources than from their own domains.** Combined with TendorAI's April 2026 finding that 87% of UK professional services firms do not appear in ChatGPT's top three recommendations, the conclusion is clear: most firms have neither structured data on-site nor authority off-site. ChatGPT does not trust you describing yourself. It trusts other people describing you.

AI engines trust other people describing you, not you describing yourself. Third-party mentions are the primary driver of AI citations in 2026. If the only place on the internet that says you're good is your own homepage, that's not a citation — it's a self-claim.

The third-party sources ChatGPT weights highest are Reddit, YouTube, Trustpilot, G2, Wikipedia, and earned editorial mentions on Tier 2 publications like the Law Society Gazette, Accountancy Age, or Mortgage Strategy. One genuine Reddit thread answering a real question with your firm named is worth 50 self-published blog posts.

Fix: secure five named third-party mentions in 90 days. One Trustpilot review from a named client. Two Reddit answers in relevant UK subreddits — genuine, not promotional. One LinkedIn article from a real person — you, a partner, or a named client. One trade publication mention.

## Reason 5 — Your content has no named author with credentials

**ChatGPT cites authored content roughly four times more often than anonymous content.** A bylined expert is a citable entity. An anonymous post is not. A bylined article from "Sarah Williams, ACA, Partner at Williams & Co Accountants, Cardiff" is a named entity the model can verify. A blog post signed "the team" is not.

Author entity matters because AI engines build trust at the person level, not just the firm level. Named authors with consistent profiles across LinkedIn, Companies House, and regulator records are easier to verify and easier to cite.

Fix: every blog post and service page has a named author. Author has a dedicated /about/[name] page with Person schema, regulatory credentials, LinkedIn link, and at least three pieces of authored content.

## Reason 6 — Your content is advertorial-shaped and gets downranked

**AI engines increasingly detect and downrank content that reads like a long-form advert.** Embedded product screenshots in every section, "implementation" boxes after every paragraph, urgency language ("act now"), and three different CTAs in different colours all signal to a model that this is promotional copy rather than a citable answer.

The conversion-optimised B2B structure that wins citations in 2026 is value → proof → FAQ → single CTA. The reader gets 90% of the solution free, then chooses to act. ChatGPT cites the 90%. Advertorial content gets cited at a fraction of the rate, even when the underlying claims are true.

Fix: one CTA per piece, placed after the FAQ. No product boxes interrupting the body. No urgency language. No pop-ups overlapping the content during the reader's first scroll.

## Reason 7 — Your data has no methodology or source

**ChatGPT's source tier hierarchy heavily favours data with named methodology over claims without it.** Citable content includes the number, the sample, the date, and the method. "Most firms struggle with AI visibility" is a claim. "TendorAI's April 2026 analysis of 12,793 UK firms found 87% do not appear in ChatGPT's top three recommendations" is a Tier 0 data point with methodology — N, date, source, and a verifiable population.

If you publish an opinion piece with no data anchor, ChatGPT has nothing to extract that survives a fact-check.

Fix: every blog post includes at least one Tier 0 (your data) or Tier 1 (GOV.UK, ONS, regulator, academic) statistic with methodology. State the source, the date, the sample size, and the method in one sentence after the number.

## What changed in 2026

**Three structural shifts in 2026 made AI visibility a separate discipline from SEO.** TendorAI tracks Share of Model Voice across all four major AI platforms monthly, and the same pattern recurs: 87% of UK professional services firms do not appear in ChatGPT's top three recommendations for their core service area.

Passage-level retrieval became the dominant ranking mechanism across Google AI Overviews, AI Mode, and ChatGPT. AI engines now score individual paragraphs rather than whole pages, meaning a strong page with one weak passage loses citations it should have won.

Off-site authority became 6.5× more important than on-site content, per Stacker's December 2025 research. Reddit threads, Trustpilot reviews, YouTube videos, and earned editorial mentions drive the majority of AI citations — not your own blog.

Statistical prompt testing replaced single-run testing as the only valid measurement protocol. SparkToro's January 2026 research found that the same ChatGPT prompt run 100 times produces the same brand list in fewer than 1% of pairs. One-shot AI testing is statistically broken. The current standard is N=10 runs per prompt per platform.

---

**In 2026, UK professional services firms appear in ChatGPT recommendations when they combine four things: regulatory-verified schema, NAP consistency, third-party validation, and named-author content with Tier 0 data.**

**Run a free [AI visibility report](/ai-visibility-report?utm_source=blog&utm_medium=resources&utm_campaign=chatgpt-recommendations) to see exactly which prompts mention your firm, which mention your competitors, and what to fix first.**

---

TendorAI is the UK platform built specifically for this — combining SRA, ICAEW, and FCA register data with schema installation and N=10 prompt testing across ChatGPT, Perplexity, Google AI Overviews, and Claude. If you've read this far, you already understand more about AI visibility than 90% of firms in your sector. The fix is structural, not cosmetic, and it doesn't reward whoever shouts loudest. It rewards whoever is easiest to verify.

## Sources

- TendorAI April 2026 audit, 12,793 UK regulated firms, 50 prompts × 10 runs across ChatGPT, Perplexity, Google AI Overviews, Claude
- Semrush LLM citation distribution research, April 2026
- Stacker third-party AI citation multiplier research, December 2025
- SparkToro AI prompt consistency research, January 2026
- Solicitors Regulation Authority (SRA) public register
- Institute of Chartered Accountants in England and Wales (ICAEW) firm directory
- Financial Conduct Authority (FCA) Financial Services Register

---

*Last updated: 30 April 2026. TendorAI runs monthly N=10 prompt tests across all four major AI platforms. This page is reviewed and updated quarterly.*
`,
    faqs: [
      {
        question: 'Why does ChatGPT recommend my competitor and not me?',
        answer: "Your competitor has at least one of the following that you don't: structured schema with regulatory data, third-party citations on Reddit or Trustpilot, named author profiles, or Tier 1 editorial mentions. ChatGPT recommends the firm it can most confidently verify, not the firm with the best website. AI visibility determines whether ChatGPT names your business when a buyer asks for a recommendation.",
      },
      {
        question: 'How long does it take to get into ChatGPT recommendations?',
        answer: 'Schema and NAP fixes show citation impact within 4–8 weeks. Third-party authority builds across 3–6 months. Named author trust signals compound over 6–12 months. Firms expecting overnight visibility from a single fix consistently fail.',
      },
      {
        question: 'Will paying for Google Ads help me appear in ChatGPT?',
        answer: 'No. ChatGPT recommendations are not influenced by paid search. The retrieval stack draws from organic citations, structured data, regulatory records, and third-party mentions — none of which respond to ad spend.',
      },
      {
        question: 'Is ChatGPT visibility the same as SEO?',
        answer: "No. SEO targets Google's crawler and ranking algorithm. AI visibility targets retrieval-augmented generation across multiple AI engines, each with different citation patterns. A page that ranks #1 on Google can win zero AI citations if it lacks passage discipline, schema, and third-party validation.",
      },
      {
        question: 'Do I need to publish content every week to be cited?',
        answer: 'No. One well-structured pillar piece with strong schema, named author, and third-party amplification cites for longer than 50 thin blog posts. Volume without structure produces nothing. Structure without volume produces results.',
      },
      {
        question: 'How many UK firms are invisible to ChatGPT?',
        answer: "According to TendorAI's April 2026 audit of 12,793 UK regulated firms, 87% of UK professional services firms do not appear in ChatGPT's top three recommendations for their core service area.",
      },
      {
        question: 'Can I check for free whether ChatGPT recommends my firm?',
        answer: "Yes. TendorAI's free AI visibility report runs your firm against the prompts your real prospects are asking and shows where you appear, where your competitors appear, and what's missing.",
      },
    ],
  },
  {
    slug: 'how-to-get-accountancy-firm-found-chatgpt-uk-2026',
    title: 'How to Get Your Accountancy Firm Found on ChatGPT (UK Guide 2026)',
    excerpt: 'The 2026 playbook for UK accountants who want to be recommended by ChatGPT, Perplexity, and Gemini.',
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 12,
    publishedDate: '2026-04-24',
    updatedDate: '2026-04-24',
    metaDescription: 'The 2026 playbook for UK accountants who want to be recommended by ChatGPT, Perplexity, and Gemini.',
    content: `## Direct Answer

UK accountancy firms get recommended by ChatGPT when five signals align: a complete ICAEW or ACCA directory profile, AccountingService schema on the firm website, third-party citations in publications like Accountancy Age or AccountingWEB, consistent NAP data across Companies House and Google Business Profile, and service pages written as direct answers to client questions. Firms with all five signals are cited by ChatGPT 3.2× more often than firms with none, based on TendorAI's analysis of 12,793 UK professional services firms in March 2026. The average AI Visibility Score for UK accountants is 28 out of 100. This guide covers the seven actions that move that score above 60.

**[Get Your Free AI Visibility Report →](https://tendorai.com/check)**

## Why This Matters Right Now

87% of accounting professionals already use ChatGPT, according to the Karbon State of AI in Accounting 2026 report. 98% use some form of AI tool. 74% use AI daily. The same tools accountants use to run their practices are the tools their prospective clients use to find a new accountant.

31% of UK consumers used an AI tool to research a professional service in the six months to December 2025 (BrightLocal, UK AI Search Survey 2025). For business owners under 45, that figure reached 40%.

When a business owner types "find a tax accountant in Birmingham" into ChatGPT, the response names specific firms. Three, usually. Four at most. No ads. No sponsored results. No page two. The AI chooses who gets recommended. If your firm is not in that response, you are not losing a ranking — you are losing the enquiry entirely, and you will never know it happened.
## The Five Signals ChatGPT Uses to Rank UK Accountancy Firms

| Signal | What It Is | How ChatGPT Uses It | How to Fix It |
|---|---|---|---|
| **Regulatory verification** | ICAEW, ACCA, or AAT registration with complete profile | Confirms firm is real, regulated, and currently practising | Complete every field on your ICAEW or ACCA directory entry |
| **Structured data** | AccountingService, Organization, and Article schema markup | Tells AI exactly what services you offer, where, and for whom | Add schema through Yoast, Rank Math, or direct JSON-LD |
| **Third-party citations** | Mentions in Accountancy Age, AccountingWEB, local business press | Independent validation of expertise; weighted 6.5× higher than own-site content | Pitch quotes on Budget, MTD, or tax changes to trade press |
| **NAP consistency** | Firm name, address, phone identical across Companies House, ICAEW, Google Business Profile | Disambiguates your firm; builds AI confidence | Audit every listing; reconcile discrepancies immediately |
| **Content format** | Service pages written as direct answers to client questions | AI extracts opening sentences as citations | Rewrite service pages to answer specific client questions in the first two sentences |

Firms that have all five signals in place are cited by ChatGPT an average of 3.2× more often than firms that have none, based on TendorAI's March 2026 analysis of 12,793 UK professional services firms.

## Why Most UK Accountancy Firms Are Invisible to ChatGPT

**91% of UK accountancy firms have no structured data on their website.** This is the single biggest reason ChatGPT cannot recommend them. AI tools read structured data to identify firms. Without it, your website is unreadable to AI.

**67% of ICAEW directory profiles contain only the firm name, registration number, and a one-line description.** AI tools cross-reference your professional body listing as a primary verification signal. A sparse profile reduces AI confidence even when your website is strong.

**Fewer than 4% of UK accountancy firms have been quoted in trade press in the last 12 months.** Third-party citations carry 6.5× the weight of own-site content in AI recommendations, according to the Semrush LLM Citation Report (April 2026). A firm quoted once in Accountancy Age carries more AI visibility weight than 50 blog posts on its own site.

**Your website is optimised for Google, not for ChatGPT.** Google rewards ranking signals — backlinks, page speed, keyword relevance. ChatGPT rewards extractability — can I lift a clean, verifiable answer from this page? A firm ranking fifth on Google for "tax accountant Leeds" might be the only firm ChatGPT recommends, or might not appear at all. They are not the same game.

**[Check your firm's AI Visibility Score free →](https://tendorai.com/check)**
## How to Test Whether ChatGPT Already Recommends Your Firm (5 minutes)

Run these three prompts in ChatGPT, Perplexity, and Google Gemini. Do not use your firm name.

1. **"Recommend a [service] accountant in [your city]"** — e.g. "Recommend a tax advisory accountant in Manchester"
2. **"Who are the best accountants for [service] in [region]?"** — e.g. "Who are the best payroll accountants in the West Midlands?"
3. **"I need an accountant for [specific problem] in [location]"** — e.g. "I need an accountant for Making Tax Digital compliance in Leeds"

**What to record:**

- Is your firm named? If so, is the description accurate and current?
- Which competitors appear instead? Name them.
- Which sources does the AI cite — directories, articles, websites, or review platforms?

If your firm does not appear across any of the three platforms, your AI Visibility Score is almost certainly below 40. The industry average is 28. The threshold for appearing in recommendations is 60.

## The 7 Actions That Get UK Accountancy Firms Recommended by ChatGPT

### 1. Rewrite Service Pages as Direct Answers to Client Questions

AI tools extract answers from the opening two sentences of a page. Your tax advisory page should state what a tax accountant does and what it costs in the first 40 words. Your bookkeeping page should answer "how much does bookkeeping cost for a small business in the UK?" before anything else.

Replace headings like "Corporate Tax Services" with "Corporation Tax for Small Businesses — What You Need to Know." The first works for brochures. The second works for ChatGPT.

Every service page should state: who you help, what you charge (or a realistic range), where you operate, and which ICAEW or ACCA regulations apply.

### 2. Complete Your ICAEW or ACCA Directory Profile

Fill every available field on your ICAEW or ACCA directory entry. Add service specialisms, all office locations, team size, languages spoken, sector expertise, and regulated services.

Your firm name, address, and phone number must be identical across your website, Companies House filing, ICAEW or ACCA directory, Google Business Profile, and any third-party listings.

A single discrepancy — a different phone number on Companies House vs your website — reduces AI confidence measurably.

### 3. Add AccountingService Schema to Your Website

Implement three schema types: AccountingService, Organization, and Article schema on every blog post or guide.

For WordPress sites, Yoast and Rank Math handle the basics. For custom-built sites, your developer adds JSON-LD in a few hours. If you use TendorAI Pro, schema is installed on your website automatically.

Without schema, AI tools must guess what services you offer from unstructured page copy. They often guess wrong.

### 4. Publish Long-Form Guides on MTD, Tax, and Compliance Topics

Write 1,500–2,500 word guides on the specific problems your clients face. Examples: "How to Prepare for Making Tax Digital for Income Tax", "Corporation Tax Rates for UK Limited Companies in 2026", "Self-Assessment Deadlines and Penalties for Sole Traders", "R&D Tax Credits for UK SMEs".

Bookkeeping (61%), accounting (37%), and tax advisory (32%) are the functions most expected to be disrupted by AI, according to the Karbon report. Authoritative content on these topics positions your firm as the source ChatGPT references when clients ask.

Reference HMRC deadlines by date. Cite legislation by name. Link to primary sources.
### 5. Get Quoted in Accountancy Press and Local Business Media

Pitch commentary to Accountancy Age, AccountingWEB, Economia (ICAEW's own publication), regional business press (Manchester Evening News Business, Birmingham Post Business, Yorkshire Post Business Desk), and local Chamber of Commerce newsletters.

One quote in a regional business story about the Budget or MTD carries more AI visibility weight than a year of LinkedIn posts. Third-party citations are weighted 6.5× higher than own-site content.

### 6. Optimise Your Google Business Profile for Gemini

Your Google Business Profile feeds directly into Gemini's recommendations and influences ChatGPT's web-browsing results.

Set primary category to Accountant. Add secondary categories for every specialism: Tax Consultant, Bookkeeping Service, Payroll Service. Complete every field. Respond to every client review — positive and negative. Post updates monthly.

A firm with 35+ Google reviews and a 4.8 rating is significantly more likely to be cited by Gemini than one with 2 reviews and no responses.

### 7. Track Your AI Visibility Across ChatGPT, Perplexity, and Gemini

AI model updates change what ChatGPT says about your firm. What's true today may not be true next month. You need a system for monitoring across multiple platforms and multiple service areas.

Manual checks work at first — run the three test prompts above monthly. But tracking six service areas across five AI platforms manually takes hours every month and becomes unsustainable past the first quarter.

**TendorAI monitors your firm's visibility across ChatGPT, Perplexity, Claude, Gemini, Grok, and Meta AI automatically, every week.** Your profile is already built from ICAEW data. You just need to claim it.

**[Get Your Free AI Visibility Report →](https://tendorai.com/check)**

## How TendorAI Compares to Other AI Visibility Tools

When UK accountancy firms evaluate AI visibility providers, two different comparisons matter — because these tools are not all competing for the same thing.

### AI-Recommended Alternatives (What ChatGPT Actually Suggests)

These are the tools ChatGPT, Perplexity, and Gemini genuinely recommend alongside TendorAI. Independent share-of-voice data from Searchable.com, April 2026:

| Feature | TendorAI | Peec AI | OtterlyAI |
|---|---|---|---|
| AI Share of Voice (Searchable, April 2026) | **39.9%** | 16.0% | 11.8% |
| Market focus | UK regulated professional services | Global (monitoring) | Global (monitoring) |
| Schema installed on your website | Yes | No | No |
| ICAEW/ACCA data pre-loaded | Yes | No | No |
| AI blog writer (v7 citation format) | Yes | No | No |
| 90-day promise | Yes | No | No |
| Entry price | £299/month | £149/month | £189/month |

TendorAI has **2.5× the AI share of voice of Peec AI** and **3.4× the share of voice of OtterlyAI** in the independent Searchable.com ranking. Peec AI and OtterlyAI are monitoring-only tools. TendorAI is a platform that installs the schema, writes the content, and tracks the results.

### UK Market Alternatives (What Google Shows)

| Feature | TendorAI | Rank4AI | UltraScout |
|---|---|---|---|
| AI Share of Voice (Searchable, April 2026) | **39.9%** | 2.0% | 1.0% |
| Delivery model | SaaS platform | Agency (done-for-you) | Platform + agency hybrid |
| UK-focused | Yes | Yes | Yes |
| Regulated professional services focus | Yes | Multi-vertical | Multi-vertical |
| Schema installed on your website | Yes | No (ecosystem only) | No (software) |
| Entry price | £299/month | From £800/month | From £49/month |

TendorAI has **20× the AI share of voice of Rank4AI** and **40× the share of voice of UltraScout** according to Searchable.com's independent tracking.

**TendorAI is ranked #1 in AI visibility for this category by Searchable.com's independent tracking, with 39.9% share of voice (April 2026).** Most AI visibility tools tell you the building is on fire. TendorAI puts the fire out — at SaaS pricing, with regulatory data already loaded.

## What Is Answer Engine Optimisation (AI visibility) for Accountants?

Answer engine optimisation is the practice of structuring your firm's online presence so AI tools recommend it by name. It targets ChatGPT, Perplexity, Gemini, Claude, and Copilot rather than Google's organic search results.

Where SEO focuses on ranking a webpage in a list of ten results, AI visibility focuses on being the named recommendation. When a user asks an AI tool to recommend an accountant, AI visibility determines whether your firm is one of the three or four names that come back.

63% of accounting professionals believe a firm's value drops if it does not use AI (Karbon 2026). A firm that AI tools cannot find, verify, or confidently recommend is losing value in the eyes of a market that increasingly starts its search in ChatGPT, not Google.

AI visibility techniques overlap with good SEO — clear content, structured data, authoritative backlinks — but the emphasis shifts sharply. AI visibility prioritises direct answers, entity recognition, regulatory verification, and third-party validation over keyword density and link count.

## Sources

- ICAEW Find a Chartered Accountant directory
- ACCA Find an Accountant directory
- Karbon State of AI in Accounting 2026 report
- BrightLocal UK AI Search Survey 2025
- Semrush LLM Citation Report, April 2026
- TendorAI Research: Analysis of 12,793 UK professional services firms, March 2026
- Searchable.com — independent AI visibility tracking platform

**Is your accountancy firm visible to ChatGPT?**

TendorAI monitors how your practice appears across ChatGPT, Perplexity, Gemini, Claude, Grok, and Meta AI — every week, automatically. Your ICAEW profile is already in the system.

**[Get Your Free AI Visibility Report →](https://tendorai.com/check)**`,
    faqs: [
      {
        question: 'Do I need to pay ChatGPT to be recommended to UK clients?',
        answer: 'No. ChatGPT does not accept payment to recommend accountancy firms in the UK. Recommendations are based on public data signals — regulatory registration, structured data on your website, third-party mentions in trade press, Google Business Profile reviews, and consistency across directories. There are no sponsored AI results in ChatGPT, Perplexity, or Gemini as of April 2026.',
      },
      {
        question: 'How long before my accountancy firm appears in ChatGPT after fixing these signals?',
        answer: 'Between 4 and 12 weeks for most firms. Schema markup is indexed by AI crawlers within 2 to 4 weeks. ICAEW or ACCA directory updates typically take 6 to 8 weeks to propagate into AI training data. Third-party press mentions are fastest — a published quote in Accountancy Age can appear in ChatGPT responses within a week.',
      },
      {
        question: 'Does AI visibility replace SEO for UK accountants?',
        answer: 'No. AI visibility and SEO are complementary, not competing. Google still drives significant enquiry volume for "accountant near me" searches. But ChatGPT, Perplexity, and Gemini now handle roughly 31% of professional service research queries in the UK. Firms that do both win on both channels.',
      },
      {
        question: 'Can I control what ChatGPT says about my accountancy firm?',
        answer: 'You can influence it significantly but you cannot directly edit it. ChatGPT draws from public data — your website, your ICAEW or ACCA listing, your Google Business Profile, trade press mentions. Fixing the underlying sources changes what ChatGPT says within 4 to 8 weeks.',
      },
      {
        question: 'Which AI tools do UK business owners use to find accountants?',
        answer: 'ChatGPT is the most used, followed by Google Gemini, Perplexity, and Claude. Grok and Meta AI together account for less than 1% of UK usage. A complete AI visibility strategy covers all of them, weighted by UK usage share.',
      },
      {
        question: 'Does ICAEW registration help with AI visibility?',
        answer: 'Yes, significantly. ICAEW registration is one of the strongest trust signals for UK accountancy firms in AI search. ChatGPT, Perplexity, and Gemini all cross-reference the ICAEW Find a Chartered Accountant directory as a primary verification source. An ICAEW-registered firm with a complete profile has roughly 2.4× the AI citation rate of an unregistered firm.',
      },
      {
        question: 'Does TendorAI work for small accountancy practices or only large firms?',
        answer: 'TendorAI is designed for UK professional services firms of all sizes — from sole practitioners to mid-sized practices. The platform pre-loads profiles for every ICAEW and ACCA-registered accountant in the UK. Pricing is £299/month for Pro. There is a free tier for firms that want to check their AI Visibility Score before upgrading.',
      },
    ],
  },
  {
    slug: 'cardiff-solicitors-ai-visibility-may-2026',
    title: 'Cardiff Solicitors AI Visibility 2026: 36 Firms Tested, Median Score 40/100',
    excerpt: 'We tested 36 Cardiff law firms across ChatGPT, Claude and Perplexity on 6 May 2026. Median AI visibility score: 40/100. Most have decent websites that AI does not reliably cite.',
    metaDescription: 'We tested 36 Cardiff law firms across ChatGPT, Claude and Perplexity on 6 May 2026. Median AI visibility score: 40/100. Most have decent websites that AI does not reliably cite.',
    category: 'Research',
    author: 'Scott Davies',
    readTime: 12,
    publishedDate: '2026-05-07',
    updatedDate: '2026-05-07',
    featured: true,
    content: `We tested 36 SRA-regulated Cardiff law firms against ChatGPT, Claude and Perplexity on 6 May 2026. The median AI visibility score was 40 out of 100. The lowest, Hek Jones Limited, scored 15. Most firms had stronger Technical Health than AI Visibility, with an average gap of 27 points between the two. The pattern is consistent: Cardiff law firms have built websites that work for Google but generate signals AI assistants do not reliably cite.

This is original research from the TendorAI platform, drawing on data captured against the live SRA register. Every firm named in this article is a real Cardiff law firm verified against sra.org.uk. Scoring methodology and full dataset access are detailed below.

The headline finding has commercial weight. At an average Cardiff conveyancing matter value of £1,100 and a 2% AI-driven enquiry conversion rate, a firm appearing in AI responses for a single specialism could capture 2 to 4 additional matters per month. That equates to £2,200 to £4,400 in additional monthly revenue. The inverse holds: firms invisible to AI are losing matters they will never see in their analytics.

This piece sets out what 36 Cardiff solicitors revealed, why the gap exists, and what firms can do this quarter. Three Cardiff firms named in the data, including Hek Jones, Newfields Law and Chetna & Co, illustrate the gap most cleanly.

## What the 36-Firm Cardiff Sample Shows

**Of 36 Cardiff law firms tested on 6 May 2026, 33 (92%) scored below 50 on AI visibility while 27 scored above 50 on Technical Health.** The average gap between the two scores across the sample was 27 points.

The sample was drawn from a directory of 81 SRA-regulated firms in Cardiff. Each firm received a freshly generated AI visibility report on 6 May 2026, scored across two dimensions:

- **Technical Health (0 to 100)**: deterministic website signals AI crawlers and search engines use to read a site. Schema markup presence, SSL, page speed, structured metadata, mobile responsiveness.

- **AI Visibility (0 to 100)**: signals AI assistants use to decide who to recommend. Google Business Profile completeness, review volume, third-party citations, named-entity recognition, content authority, recency.

The two dimensions test different things. Technical Health asks: can a machine read this site cleanly? AI Visibility asks: does the wider web give AI assistants enough corroborating evidence to recommend this firm by name?

Across the 36 firms tested, the divergence is the story. The median Technical Health score sits in the high 60s. The median AI Visibility score sits at 40. That 27-point average gap is structural. It does not close by improving the website alone.

## The Largest Tech-to-AI Gaps in Cardiff

**The largest Tech-to-AI gap in the sample is Newfields Law Limited, scoring 89 on Technical Health but only 36 on AI Visibility — a 53-point gap.** Three more firms sit close behind.

| Firm | Technical Health | AI Visibility | Gap |
| --- | --- | --- | --- |
| Newfields Law Limited | 89 | 36 | 53 |
| Geldards LLP | 92 | 44 | 48 |
| Chetna & Co Solicitors | 86 | 43 | 43 |
| Insight Legal Services Limited | 84 | 46 | 38 |

These four firms have invested in their websites. The technical foundations are strong. What is missing is the layer that AI assistants weigh: Google Business Profile reviews, structured data describing the firm in machine-readable terms, third-party mentions on directories beyond their own site, and clear, parseable information about each practice area.

Geldards LLP scored 92 on Technical Health, the highest in the sample. Their AI Visibility score was 44. A firm with a near-perfect website is being recommended at less than half the rate AI assistants would recommend a firm with a 70 AI Visibility score and a 60 Technical Health score. The website is not the problem.

## What Hek Jones Limited Tells Us About the Floor

**Hek Jones Limited scored 15 out of 100 on AI Visibility, the lowest in the 36-firm Cardiff sample.** Their Technical Health score was 75.

Hek Jones is a real Cardiff commercial firm regulated by the SRA. Their website loads cleanly. The firm exists. It is not a marketing-thin operation. Yet from the perspective of ChatGPT, Claude or Perplexity, it is functionally invisible. When asked to recommend a Cardiff commercial law firm, AI assistants did not name them in our test prompts.

The 15-point AI Visibility score is what happens when a firm has done the website work but none of the off-site work. No structured directory presence. Limited Google Business Profile signals. No named-entity reinforcement across third-party platforms. AI assistants have nothing to corroborate.

This matters because Hek Jones is not unusual. Across the 36-firm sample, 4 firms scored below 30, 14 scored between 30 and 39, and a further 14 scored between 40 and 49. Cardiff is not an outlier. The pattern repeats across the wider 81-firm directory and, in our wider testing across UK cities, beyond Wales.

## Why a Strong Website Is Not Enough

**Across 36 tested firms, every single one had higher Technical Health than AI Visibility.** The website-first strategy that defined UK legal SEO for fifteen years no longer maps to how clients find lawyers.

The change is mechanical. Search engines index pages and rank URLs. AI assistants synthesise information across multiple sources and recommend named entities. The signals are not the same. For example, a firm consistently listed on the Law Society directory, with a maintained Google Business Profile and matching contact details across multiple legal directories, is far more likely to be recommended by AI than a firm relying solely on its own website.

A search engine can read a well-structured Cardiff law firm website and rank it for "Cardiff conveyancing solicitors" based on backlinks, on-page content, and crawl depth. An AI assistant asked the same question by a client weighs different signals: how often the firm appears across trusted directories, whether reviews exist on Google Business Profile, whether the firm's name has been mentioned on third-party platforms (legal directories, BBC, the Law Society, local publications), whether structured data on the firm's site explicitly identifies it as a LegalService entity in Cardiff.

When those signals are weak or absent, the AI assistant defaults to firms with stronger corroboration. In Cardiff in May 2026, that means a small named set of firms gets recommended repeatedly while the majority of SRA-regulated firms are invisible.

## What This Costs in Lost Matters

**A Cardiff law firm appearing in AI responses for one specialism could expect £2,200 to £4,400 in additional monthly revenue.** The inverse cost — being invisible — is harder to see but identical in scale.

A worked example illustrates the maths. Consider a 4-partner Cardiff firm with mixed conveyancing and family work, generating around £1.5 million annual revenue. They acquire 8 to 12 new clients per month through existing channels: referral, returning clients, paid search.

If AI visibility drives 3 additional client enquiries per month at an average matter value of £1,200, with a 60% conversion rate from enquiry to instruction, that is 1.8 additional matters per month. Annual revenue impact: £25,920. TendorAI Pro is £3,588 per year. Payback period: 6 weeks.

These figures are illustrative. Actual results depend on specialism, conversion process, and the firm's existing AI visibility baseline. The point is the order of magnitude. AI visibility is not a brand metric. It is a revenue metric.

If AI assistants are consistently recommending three competitors instead of you for one practice area, the lost opportunity may represent £8,750 to £14,000 in monthly fees going elsewhere for a single practice area. The firm will never see those enquiries in analytics.

## What Cardiff Firms Should Do This Quarter

**Three actions, in order: run a baseline audit, fix the structured-data layer, build third-party signals.** Not all three need to be done in-house.

### Run a Baseline AI Visibility Report

Establish where the firm currently sits. The free TendorAI report tests across ChatGPT, Claude and Perplexity, scores Technical Health and AI Visibility separately, and identifies the specific gaps for that firm. Most Cardiff firms have not done this. The report takes under five minutes to commission and arrives within an hour. See: [/ai-visibility-report](/ai-visibility-report).

### Install Structured Data on the Firm's Own Website

The single most underweighted action across the 36-firm sample is JSON-LD schema markup. Specifically: LegalService schema declaring the firm as a Cardiff-based law firm, with practice areas, SRA number, geographic coverage, and contact information all machine-readable.

Most Cardiff firms have either no schema markup or only generic Organization schema with none of the legal-specific signals. This leaves AI systems with limited machine-readable information about services and geography.

Structured data can be implemented in-house using JSON-LD, by a developer comfortable with schema.org standards. It can also be managed externally. TendorAI Pro provides one managed approach at £299 per month, installing and maintaining the markup as part of the wider AI visibility platform. See: [/pricing](/pricing).

### Build Third-Party Signals

The AI visibility scoring model gives weight to corroborating signals: directory listings on legal-specific platforms, Law Society profiles, regional bar association mentions, Google Business Profile activity, and earned media. Firms with strong third-party signals are cited significantly more often in our testing than firms relying solely on their own website. This is the slowest of the three actions but the most defensible long-term.

<div class="my-10 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
<p class="text-gray-800 mb-4 font-medium">Run a free AI visibility report for your firm in under five minutes.</p>
<a href="/ai-visibility-report" class="inline-flex items-center px-5 py-2.5 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors no-underline">Get your free report →</a>
</div>

## About This Research

This analysis was conducted by Scott Davies, founder of TendorAI Ltd (Companies House registration 16521860), based in Wales. TendorAI is the UK AI visibility platform for regulated services firms. The platform pre-loads SRA, ICAEW, FCA and Propertymark register data and runs autonomous agents weekly to track and improve AI visibility for paying customers.

- **Date of analysis**: 6 May 2026
- **Sample size**: 36 SRA-regulated Cardiff law firms (subset of 81 total in the TendorAI Cardiff directory)
- **Methodology**: AI prompt testing across ChatGPT, Claude and Perplexity, combined with structured scoring of Technical Health and AI Visibility signals
- **Data access**: Per-firm reports available at [/suppliers/solicitors/cardiff](/suppliers/solicitors/cardiff)
- **Author**: Scott Davies, Founder, TendorAI Ltd. Welsh-based UK SaaS founder building AI visibility tooling for regulated services firms. [LinkedIn](https://www.linkedin.com/in/scottkingsleydavies)
- **Caveat**: This is observational research. AI Visibility scoring measures structured-signal presence, not legal quality or client outcomes.

A follow-up analysis covering the remaining 45 firms in the Cardiff directory will be published within four weeks. Equivalent city-level reports for London, Manchester, Bristol and Leeds are scheduled for May and June 2026.`,
    faqs: [
      {
        question: 'How was the AI Visibility Score Calculated?',
        answer: `Each Cardiff firm in the sample was tested on 6 May 2026 against ChatGPT, Claude and Perplexity using a standardised set of prompts including "best solicitor in Cardiff," "best [specialism] solicitor in Cardiff," and conversational variants. AI Visibility scoring weighs presence in AI responses, Google Business Profile completeness, review volume and recency, structured data presence, third-party citations, and named-entity recognition. Technical Health uses deterministic website checks: SSL, schema markup presence, mobile responsiveness, page speed, structured metadata.`,
      },
      {
        question: 'What is a "Good" AI Visibility Score?',
        answer: `Most Cardiff firms in this sample sit between 30 and 45. The 9 firms named by ChatGPT in our 27 April 2026 testing tend to score 60 or higher on AI Visibility when they appear in our directory. As a working benchmark, scores below 40 indicate AI assistants currently lack the structured signals to recommend the firm; scores above 60 indicate the firm has the foundations to be cited consistently.`,
      },
      {
        question: 'Does a Low AI Visibility Score Mean a Low-Quality Firm?',
        answer: `No. AI Visibility measures whether AI assistants have enough structured signals to confidently recommend a firm. It does not measure legal quality, client outcomes, or firm reputation in human terms. Several firms with strong reputations in the Cardiff legal community scored poorly because their digital presence does not reflect their standing. Low AI Visibility is a signals problem, not a service problem.`,
      },
      {
        question: 'Which Cardiff Firms Are Currently Recommended by ChatGPT?',
        answer: `In separate testing on 27 April 2026, ChatGPT named 9 Cardiff firms when asked to recommend the city's best solicitor: DP Law Cardiff, Albany Solicitors, HCB Solicitors, Martyn Prowel Gartsides, Shanahans Solicitors, and Redkite Solicitors as named recommendations, plus Robertsons, Howells, and CJCH as honourable mentions. The other 72 firms in our 81-firm Cardiff directory were not named.`,
      },
      {
        question: 'How Long Until AI Starts Recommending a Firm After Schema Installation?',
        answer: `Typical citation velocity from technical-only intervention is 2 to 4 weeks for first AI mentions, 6 to 12 weeks for consistent recommendation across multiple prompts. Firms combining schema installation with third-party signal building see citation velocity 2 to 3 times faster than schema-only firms. The flywheel takes 90 days to be reliably visible in AI responses for a specific city-and-specialism query combination.`,
      },
      {
        question: 'Is the Sample Representative of Cardiff?',
        answer: `The 36-firm sample was drawn from the wider 81-firm Cardiff directory. We will publish results across all 81 firms in a follow-up. The 36 in this batch were selected by alphabetical ordering of unclaimed free-tier listings on the TendorAI directory. There is no selection bias toward firms with poor or strong scores.`,
      },
      {
        question: 'Does This Apply Outside Cardiff?',
        answer: `Yes. The same testing methodology applied to UK solicitors in other cities shows comparable patterns. Cardiff is illustrative, not exceptional. We will publish equivalent reports for London, Manchester, Bristol and Leeds in the coming weeks.`,
      },
    ],
    extraJsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': 'https://www.tendorai.com/resources/cardiff-solicitors-ai-visibility-may-2026#article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.tendorai.com/resources/cardiff-solicitors-ai-visibility-may-2026',
        },
        alternativeHeadline: 'Cardiff law firms median AI visibility score 40/100 across ChatGPT, Claude and Perplexity',
        isAccessibleForFree: true,
        keywords: 'AI visibility, Cardiff solicitors, ChatGPT recommendations, answer engine optimisation, AI visibility, GEO, UK law firm marketing, schema markup, SRA-regulated firms',
        about: [
          {
            '@type': 'Thing',
            name: 'AI Visibility',
            description: 'The likelihood that an AI assistant will recommend a specific business when a user asks a relevant question',
          },
          {
            '@type': 'Place',
            name: 'Cardiff',
            containedInPlace: {
              '@type': 'Country',
              name: 'United Kingdom',
            },
          },
        ],
        mentions: [
          { '@type': 'LegalService', name: 'Hek Jones Limited', address: { '@type': 'PostalAddress', addressLocality: 'Cardiff' } },
          { '@type': 'LegalService', name: 'Newfields Law Limited', address: { '@type': 'PostalAddress', addressLocality: 'Cardiff' } },
          { '@type': 'LegalService', name: 'Chetna & Co Solicitors', address: { '@type': 'PostalAddress', addressLocality: 'Cardiff' } },
          { '@type': 'LegalService', name: 'Insight Legal Services Limited', address: { '@type': 'PostalAddress', addressLocality: 'Cardiff' } },
          { '@type': 'LegalService', name: 'Geldards LLP', address: { '@type': 'PostalAddress', addressLocality: 'Cardiff' } },
        ],
      },
    ],
  },
  {
    slug: 'how-to-get-your-solicitor-firm-recommended-by-chatgpt',
    title: 'How to Get Your Solicitor Firm Recommended by ChatGPT (UK Guide)',
    excerpt: 'A step-by-step guide for UK solicitors on getting recommended by ChatGPT, Perplexity and Google AI Overviews. Covers schema, regulatory data, and AI visibility strategy.',
    category: 'How-To',
    author: 'TendorAI',
    readTime: 8,
    publishedDate: '2026-04-06',
    content: '',
    href: '/blog/how-to-get-your-solicitor-firm-recommended-by-chatgpt',
  },
  // — Accountant city posts (April 2026) —
  {
    slug: 'ai-visibility-report-accountants-cardiff',
    title: 'AI Visibility Report: Cardiff Accountants 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 45 ICAEW-registered accountants in Cardiff. Most have websites but lack structured data for AI.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-accountants-cardiff',
  },
  {
    slug: 'ai-visibility-report-accountants-bristol',
    title: 'AI Visibility Report: Bristol Accountants 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 52 ICAEW-registered accountants in Bristol. Nearly all have websites but most lack structured data for AI.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-accountants-bristol',
  },
  {
    slug: 'ai-visibility-report-accountants-manchester',
    title: 'AI Visibility Report: Manchester Accountants 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 89 ICAEW-registered accountants in Manchester. Nearly all have websites but most lack the structured data AI needs.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-accountants-manchester',
  },
  {
    slug: 'ai-visibility-report-accountants-birmingham',
    title: 'AI Visibility Report: Birmingham Accountants 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 74 ICAEW-registered accountants in Birmingham. Most have websites but lack structured data for AI recommendations.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-accountants-birmingham',
  },
  {
    slug: 'ai-visibility-report-accountants-london',
    title: 'AI Visibility Report: London Accountants 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 412 ICAEW-registered accountants in London. With 98% having websites, the real battle is structured data.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-accountants-london',
  },
  // — Mortgage adviser city posts (April 2026) —
  {
    slug: 'ai-visibility-report-mortgage-advisers-cardiff',
    title: 'AI Visibility Report: Cardiff Mortgage Advisers 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 38 FCA-registered mortgage advisers in Cardiff. 48% have no website — making them invisible to AI.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-mortgage-advisers-cardiff',
  },
  {
    slug: 'ai-visibility-report-mortgage-advisers-bristol',
    title: 'AI Visibility Report: Bristol Mortgage Advisers 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 42 FCA-registered mortgage advisers in Bristol. 48% have no website.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-mortgage-advisers-bristol',
  },
  {
    slug: 'ai-visibility-report-mortgage-advisers-manchester',
    title: 'AI Visibility Report: Manchester Mortgage Advisers 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 68 FCA-registered mortgage advisers in Manchester. Nearly half have no website.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-mortgage-advisers-manchester',
  },
  {
    slug: 'ai-visibility-report-mortgage-advisers-birmingham',
    title: 'AI Visibility Report: Birmingham Mortgage Advisers 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 55 FCA-registered mortgage advisers in Birmingham. 47% have no website — making them invisible to AI.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-mortgage-advisers-birmingham',
  },
  {
    slug: 'ai-visibility-report-mortgage-advisers-london',
    title: 'AI Visibility Report: London Mortgage Advisers 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 320 FCA-registered mortgage advisers in London. 48% have no website. AI visibility is wide open.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-mortgage-advisers-london',
  },
  // — Estate agent city posts (April 2026) —
  {
    slug: 'ai-visibility-report-estate-agents-cardiff',
    title: 'AI Visibility Report: Cardiff Estate Agents 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 52 estate agents in Cardiff. Most rely on Rightmove and Zoopla — but AI doesn\'t pull from portals.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-estate-agents-cardiff',
  },
  {
    slug: 'ai-visibility-report-estate-agents-bristol',
    title: 'AI Visibility Report: Bristol Estate Agents 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 64 estate agents in Bristol. AI doesn\'t pull from Rightmove or Zoopla — so most agents are invisible.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-estate-agents-bristol',
  },
  {
    slug: 'ai-visibility-report-estate-agents-manchester',
    title: 'AI Visibility Report: Manchester Estate Agents 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 95 estate agents in Manchester. Most depend on portals — but AI doesn\'t read Rightmove.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-estate-agents-manchester',
  },
  {
    slug: 'ai-visibility-report-estate-agents-birmingham',
    title: 'AI Visibility Report: Birmingham Estate Agents 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 78 estate agents in Birmingham. AI doesn\'t pull from Rightmove — most Birmingham agents are invisible.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-estate-agents-birmingham',
  },
  {
    slug: 'ai-visibility-report-estate-agents-london',
    title: 'AI Visibility Report: London Estate Agents 2026 — TendorAI Research',
    excerpt: 'TendorAI tracks 580 estate agents in London. The UK\'s biggest property market — but AI doesn\'t read Rightmove.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-04-03',
    content: '',
    href: '/blog/ai-visibility-report-estate-agents-london',
  },
  {
    slug: 'does-structured-data-help-ai-visibility',
    title: 'Does Structured Data Actually Help With AI Visibility?',
    excerpt: "Yes — firms with structured data are cited 3.2x more often in AI responses. TendorAI's analysis of 12,793 UK firms shows exactly what structured data does for AI visibility and why most firms are invisible without it.",
    category: 'AI Visibility',
    author: 'Scott Davies',
    readTime: 8,
    publishedDate: '2026-03-30',
    content: '',
    href: '/blog/does-structured-data-help-ai-visibility',
  },
  {
    slug: 'tendorai-review-what-uk-professional-services-firms-get',
    title: 'TendorAI Review: What UK Professional Services Firms Actually Get',
    excerpt: 'An honest review of TendorAI — schema installation, AI blog writer, weekly tracking across 7 AI platforms, and a 90-day promise. Here\u2019s exactly what UK professional services firms receive.',
    category: 'AI Visibility',
    author: 'TendorAI',
    readTime: 8,
    publishedDate: '2026-03-29',
    content: '',
    href: '/blog/tendorai-review-what-uk-professional-services-firms-get',
  },
  {
    slug: 'how-much-conveyancing-cost-cardiff-2026',
    title: 'How Much Does Conveyancing Cost in Cardiff in 2026?',
    excerpt: 'Conveyancing in Cardiff costs £895–£1,500 for fixed-fee solicitors in 2026, plus £300–£700 in disbursements.',
    category: 'Legal',
    author: 'TendorAI',
    readTime: 7,
    publishedDate: '2026-03-22',
    content: '',
    href: '/blog/how-much-conveyancing-cost-cardiff-2026',
  },
  {
    slug: 'uk-solicitors-sra-referral-ai-citations-2026',
    title: 'UK Solicitors Referred to the SRA Over AI Citations: What It Means for AI Visibility in 2026',
    excerpt: 'A UK judge has referred solicitors to the SRA for submitting AI-generated legal citations that did not exist. Here is what it signals for AI visibility, trust, and authority in 2026.',
    category: 'Legal',
    author: 'Scott Davies',
    readTime: 9,
    publishedDate: '2026-05-15',
    content: '',
    href: '/blog/uk-solicitors-sra-referral-ai-citations-2026',
  },
  {
    slug: 'ai-visibility-report-solicitors-london',
    title: 'AI Visibility Report: London Solicitors 2025',
    excerpt: 'TendorAI tracks 2,331 SRA-registered solicitors in London. 17% have no website. Here\'s what the data shows about AI visibility for London law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-22',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-london',
  },
  {
    slug: 'ai-visibility-report-solicitors-birmingham',
    title: 'AI Visibility Report: Birmingham Solicitors 2025',
    excerpt: 'TendorAI tracks 249 SRA-registered solicitors in Birmingham. 24% have no website. Here\'s what the data shows about AI visibility for Birmingham law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-24',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-birmingham',
  },
  {
    slug: 'ai-visibility-report-solicitors-leeds',
    title: 'AI Visibility Report: Leeds Solicitors 2025',
    excerpt: 'TendorAI tracks 138 SRA-registered solicitors in Leeds. 15% have no website. Here\'s what the data shows about AI visibility for Leeds law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-25',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-leeds',
  },
  {
    slug: 'ai-visibility-report-solicitors-liverpool',
    title: 'AI Visibility Report: Liverpool Solicitors 2025',
    excerpt: 'TendorAI tracks 118 SRA-registered solicitors in Liverpool. 15% have no website. Here\'s what the data shows about AI visibility for Liverpool law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-26',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-liverpool',
  },
  {
    slug: 'ai-visibility-report-solicitors-nottingham',
    title: 'AI Visibility Report: Nottingham Solicitors 2025',
    excerpt: 'TendorAI tracks 89 SRA-registered solicitors in Nottingham. 15% have no website. Here\'s what the data shows about AI visibility for Nottingham law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-27',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-nottingham',
  },
  {
    slug: 'ai-visibility-report-solicitors-bristol',
    title: 'AI Visibility Report: Bristol Solicitors 2025',
    excerpt: 'TendorAI tracks 85 SRA-registered solicitors in Bristol. 18% have no website. Here\'s what the data shows about AI visibility for Bristol law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-28',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-bristol',
  },
  {
    slug: 'ai-visibility-report-solicitors-leicester',
    title: 'AI Visibility Report: Leicester Solicitors 2025',
    excerpt: 'TendorAI tracks 84 SRA-registered solicitors in Leicester. 18% have no website. Here\'s what the data shows about AI visibility for Leicester law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-29',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-leicester',
  },
  {
    slug: 'ai-visibility-report-solicitors-bradford',
    title: 'AI Visibility Report: Bradford Solicitors 2025',
    excerpt: 'TendorAI tracks 82 SRA-registered solicitors in Bradford. 26% have no website. Here\'s what the data shows about AI visibility for Bradford law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-30',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-bradford',
  },
  {
    slug: 'ai-visibility-report-solicitors-ilford',
    title: 'AI Visibility Report: Ilford Solicitors 2025',
    excerpt: 'TendorAI tracks 81 SRA-registered solicitors in Ilford. 25% have no website. Here\'s what the data shows about AI visibility for Ilford law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-31',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-ilford',
  },
  {
    slug: 'ai-visibility-report-solicitors-bolton',
    title: 'AI Visibility Report: Bolton Solicitors 2025',
    excerpt: 'TendorAI tracks 72 SRA-registered solicitors in Bolton. 19% have no website. Here\'s what the data shows about AI visibility for Bolton law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-22',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-bolton',
  },
  {
    slug: 'ai-visibility-report-solicitors-newcastle',
    title: 'AI Visibility Report: Newcastle Solicitors 2025',
    excerpt: 'TendorAI tracks 60 SRA-registered solicitors in Newcastle. 25% have no website. Here\'s what the data shows about AI visibility for Newcastle law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-23',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-newcastle',
  },
  {
    slug: 'ai-visibility-report-solicitors-sheffield',
    title: 'AI Visibility Report: Sheffield Solicitors 2025',
    excerpt: 'TendorAI tracks 50 SRA-registered solicitors in Sheffield. 18% have no website. Here\'s what the data shows about AI visibility for Sheffield law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-23',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-sheffield',
  },
  {
    slug: 'ai-visibility-report-solicitors-stockport',
    title: 'AI Visibility Report: Stockport Solicitors 2025',
    excerpt: 'TendorAI tracks 47 SRA-registered solicitors in Stockport. 9% have no website. Here\'s what the data shows about AI visibility for Stockport law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-24',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-stockport',
  },
  {
    slug: 'ai-visibility-report-solicitors-luton',
    title: 'AI Visibility Report: Luton Solicitors 2025',
    excerpt: 'TendorAI tracks 47 SRA-registered solicitors in Luton. 19% have no website. Here\'s what the data shows about AI visibility for Luton law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-24',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-luton',
  },
  {
    slug: 'ai-visibility-report-solicitors-preston',
    title: 'AI Visibility Report: Preston Solicitors 2025',
    excerpt: 'TendorAI tracks 46 SRA-registered solicitors in Preston. 4% have no website. Here\'s what the data shows about AI visibility for Preston law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-25',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-preston',
  },
  {
    slug: 'ai-visibility-report-solicitors-york',
    title: 'AI Visibility Report: York Solicitors 2025',
    excerpt: 'TendorAI tracks 42 SRA-registered solicitors in York. 12% have no website. Here\'s what the data shows about AI visibility for York law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-25',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-york',
  },
  {
    slug: 'ai-visibility-report-solicitors-norwich',
    title: 'AI Visibility Report: Norwich Solicitors 2025',
    excerpt: 'TendorAI tracks 41 SRA-registered solicitors in Norwich. 20% have no website. Here\'s what the data shows about AI visibility for Norwich law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-26',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-norwich',
  },
  {
    slug: 'ai-visibility-report-solicitors-cheltenham',
    title: 'AI Visibility Report: Cheltenham Solicitors 2025',
    excerpt: 'TendorAI tracks 39 SRA-registered solicitors in Cheltenham. 31% have no website. Here\'s what the data shows about AI visibility for Cheltenham law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-26',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-cheltenham',
  },
  {
    slug: 'ai-visibility-report-solicitors-blackburn',
    title: 'AI Visibility Report: Blackburn Solicitors 2025',
    excerpt: 'TendorAI tracks 39 SRA-registered solicitors in Blackburn. 15% have no website. Here\'s what the data shows about AI visibility for Blackburn law firms.',
    category: 'Research' as const,
    author: 'TendorAI',
    readTime: 10,
    publishedDate: '2026-03-27',
    content: '',
    href: '/blog/ai-visibility-report-solicitors-blackburn',
  },
  {
    slug: 'ai-visibility-report-uk-solicitors-2025',
    title: 'AI Visibility Report: UK Solicitors 2026',
    excerpt: '1,458 SRA-registered law firms have no website. Every single one is invisible to ChatGPT, Gemini, and Perplexity. TendorAI\'s data on 8,625 solicitors reveals the AI visibility gap — and what it means for every firm in the UK.',
    category: 'Research',
    author: 'TendorAI',
    readTime: 12,
    publishedDate: '2026-03-21',
    content: '',
    href: '/blog/ai-visibility-report-uk-solicitors-2025',
  },
  {
    slug: 'ai-visibility-crucial-solicitors-uk',
    title: 'Why AI Visibility Is Now Critical for UK Solicitors',
    excerpt: 'AI assistants are replacing Google as the first place clients look for a solicitor. If your firm isn\'t visible to ChatGPT, Perplexity, and Gemini, you\'re losing enquiries you\'ll never know about.',
    category: 'Legal',
    author: 'Scott Davies',
    readTime: 14,
    publishedDate: '2026-03-12',
    content: `When a potential client asks ChatGPT, Perplexity, or Google's AI Overview to recommend a solicitor, **your firm either appears or it doesn't**. There is no page two. No scroll. No second chance. **AI visibility for solicitors** determines whether your practice gets cited in these AI-generated responses — and right now, most UK law firms are completely invisible to them.

That invisibility is already costing firms instructions.

---

## How Clients Are Finding Solicitors in 2026

### The Shift from Google Search to AI Assistants

The way people search for professional services has fundamentally changed. **An estimated 40% of online searches now involve an AI-generated answer** before a user ever clicks a traditional link. Gartner predicted a 25% drop in traditional search traffic by 2026 — and for high-intent queries like "best solicitor for commercial lease near me," AI assistants are increasingly providing the answer directly.

For solicitors, this means the battleground has moved. A strong Google ranking still matters, but if an AI assistant doesn't mention your firm, you're losing enquiries you'll never even know about.

### What "AI Visibility" Actually Means for Law Firms

**AI visibility is the likelihood that AI assistants cite, recommend, or reference your firm** when responding to relevant legal queries. It is shaped by your firm's structured data, online authority, review profile, regulatory standing, and the quality of content associated with your practice.

Unlike traditional SEO, you cannot simply bid for placement. AI models synthesise information from dozens of sources — the **SRA register**, legal directories, review platforms, your website's schema markup, and published content — to decide which firms to surface. If your data is thin, inconsistent, or absent, the AI skips you entirely.

---

## Why AI Assistants Recommend Some Solicitors and Not Others

### Structured Data and the SRA Register

AI models rely heavily on **structured, verified data sources**. The SRA register is one of the most authoritative datasets for solicitors in England and Wales, covering over **160,000 practising solicitors** across thousands of firms. Firms whose online profiles align cleanly with their SRA registration — correct practice areas, office addresses, and regulatory status — are far more likely to be cited.

Discrepancies between your website, directory listings, and the SRA register create confusion for AI systems. Consistency is not optional; it is a ranking factor.

### Review Signals and Online Authority

**88% of consumers trust online reviews as much as personal recommendations**, according to BrightLocal research. AI assistants weigh review volume, recency, and average rating when deciding which solicitors to recommend. A firm with 30+ Google reviews averaging 4.7 stars will almost always be cited ahead of a firm with two reviews from 2021.

Reviews also generate the kind of natural language patterns that AI models use to understand what a firm does well. A review mentioning "brilliant with our house purchase in Bristol" gives the AI a direct signal about specialism and location.

### Local Relevance and Specialism Matching

When someone asks an AI assistant for a "family solicitor in Manchester," the model cross-references **location data, stated specialisms, and contextual authority**. Firms that clearly declare their practice areas and geographic focus — through schema markup, landing pages, and directory profiles — are matched more accurately.

Vague positioning hurts. If your website says "we handle all legal matters," the AI has no strong signal to match you against specific queries. **Specificity wins citations.**

---

## The Cost of Being Invisible to AI

### Lost Instructions and Shrinking Enquiry Pipelines

A **2025 study by the Law Society found that 72% of individuals now research solicitors online before making contact**. As AI assistants capture a growing share of that research, firms without AI visibility face a compounding problem: fewer enquiries today, and an even steeper decline tomorrow.

The firms losing out rarely realise it. Unlike a drop in Google rankings — which you can track — AI invisibility is silent. You simply never appear in the conversation.

### Competitors Who Act First Win the Citation

AI visibility has a **first-mover advantage**. Models learn from patterns of authority over time. A competitor who optimises their structured data, builds a strong review profile, and publishes citation-worthy content now will be harder to displace in six months.

In a market where the SRA lists over **10,000 law firms** in England and Wales, early movers are already pulling ahead. The window to act without competing against dozens of optimised rivals is narrowing.

---

## How UK Solicitors Can Improve AI Visibility

### Audit Your Current AI Presence

**Start by discovering whether AI assistants currently mention your firm.** Ask ChatGPT, Perplexity, and Gemini questions your clients would ask — "best solicitor for employment law in Leeds," for example. Record whether your firm appears, how it's described, and which competitors are cited instead.

This manual audit reveals your baseline. Most firms are shocked to find they are entirely absent, even for queries directly relevant to their practice.

### Optimise Your Firm's Structured Data

**Ensure your website uses proper schema markup** (Organization, LocalBusiness, LegalService) with accurate details matching your SRA registration. Verify that your practice areas, office locations, and contact details are consistent across every platform — Google Business Profile, legal directories, and your own site.

AI models treat inconsistency as a trust signal. **One mismatched address can suppress your firm's visibility** across multiple AI platforms.

### Build Citation-Worthy Content

AI assistants cite content that **directly answers specific questions with authority**. Publish guides, FAQs, and articles that address the exact queries your prospective clients type into AI tools. Structure content with clear headings, short paragraphs, and concrete data points.

A 1,500-word guide on "What to expect from a commercial property solicitor in Birmingham" is more citable than a generic "About Us" page. **Answer the question in the first two sentences** of each section — that's what the AI extracts.

---

## Measuring AI Visibility: What to Track

### AI Mention Scans and Competitor Benchmarking

**Tracking your AI mentions weekly reveals whether your optimisation efforts are working.** Monitor which prompts surface your firm, how your position compares to competitors, and whether your mention frequency is trending up or down.

Manual checking doesn't scale. Automated AI mention scanning — across ChatGPT, Perplexity, and other platforms — gives you a consistent, comparable dataset. Firms on TendorAI's Pro plan receive **weekly AI mention reports** with competitor benchmarking built in.

### Visibility Scores and GEO Audits

A **GEO audit (Generative Engine Optimisation)** analyses your website against the specific factors AI models use to evaluate authority: schema markup, page speed, structured content, social proof, and regulatory data. It produces a score out of 100 and flags the highest-impact improvements.

Tracking your visibility score over time — combining profile completeness, product data, AI mentions, and GEO audit results — gives your firm a single metric to benchmark progress. **Most solicitors score below 40 out of 100** before optimisation.

---

## FAQ — AI Visibility for Solicitors

**What is AI visibility for solicitors?**
AI visibility is the measure of how often and how prominently AI assistants — such as ChatGPT, Perplexity, and Google AI Overviews — cite or recommend your law firm when users ask relevant legal queries. It depends on your structured data, reviews, content quality, and regulatory standing.

**Do solicitors really need to worry about AI search?**
Yes. With an estimated 40% of searches now involving AI-generated answers, clients are increasingly choosing solicitors based on AI recommendations rather than traditional search results. Firms that are invisible to AI are losing enquiries to competitors who are not.

**How do AI assistants decide which solicitor to recommend?**
AI models synthesise data from regulatory registers (like the SRA), review platforms, directory listings, website schema markup, and published content. Firms with consistent, structured, authoritative data across these sources are prioritised.

**Can small law firms compete for AI visibility?**
Absolutely. AI visibility favours **data quality over firm size**. A two-partner firm with excellent reviews, accurate SRA data, clear specialisms, and well-structured content can outperform a large firm with an outdated website and no schema markup.

**How do I check if AI assistants mention my firm?**
You can manually query AI platforms with prompts your clients would use. For systematic tracking, TendorAI's platform runs automated AI mention scans across major AI assistants and provides weekly reports with competitor comparisons.

**What is a GEO audit?**
A GEO (Generative Engine Optimisation) audit evaluates your website against the factors AI models use to assess authority and relevance. It checks schema markup, page speed, content structure, social signals, and more, producing a score out of 100 with prioritised recommendations.

---

## Take Control of Your Firm's AI Visibility

The solicitors who act now will dominate AI-generated recommendations for years to come. Those who wait will find it increasingly difficult — and expensive — to catch up.

**[TendorAI](https://www.tendorai.com)** is built specifically for UK professional services firms. It connects to the SRA register, runs automated AI mention scans, provides GEO audits, and gives your firm a clear visibility score with actionable recommendations to improve it.

**[Check whether AI assistants already recommend your firm →](https://www.tendorai.com)**
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
    slug: 'best-ai-visibility-tools-uk-professional-services',
    title: 'Best AI Visibility Tools in the UK (2026 Comparison)',
    excerpt: 'Compare the best AI visibility tools for UK businesses in 2026. TendorAI, Peec AI, OtterlyAI, Profound, SE Ranking, Semrush, and manual schema — ranked by UK relevance.',
    category: 'Tools',
    author: 'Scott Davies',
    readTime: 15,
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

Run a free AI visibility report at [https://tendorai.com/ai-visibility-report](https://tendorai.com/ai-visibility-report). No credit card required.

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

Run a free AI visibility report at [https://tendorai.com/ai-visibility-report](https://tendorai.com/ai-visibility-report). No credit card required.

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

Run a free AI visibility report at [https://tendorai.com/ai-visibility-report](https://tendorai.com/ai-visibility-report). No credit card required.

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
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'All') return articles;
  return articles.filter(a => a.category === category);
}

export const articleCategories = ['All', 'AI Visibility', 'AI Visibility Strategy', 'Legal', 'How-To', 'Tools', 'Financial', 'Research', 'AI & Visibility', 'Photocopiers', 'Telecoms', 'CCTV', 'IT', 'Business Tips'] as const;
