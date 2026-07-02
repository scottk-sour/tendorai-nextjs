export interface AeoGuide {
  slug: string
  checkKey: string
  title: string
  metaTitle: string
  metaDescription: string
  whatItIs: string
  whyItMatters: string
  difficulty: 'Easy' | 'Medium' | 'Needs developer' | 'TendorAI fixes this'
  timeToFix: string
  howToFix: {
    platform: string
    steps: string[]
  }[]
  tendoraiFixesThis: boolean
  tendoraiHowItHelps: string
}

export const AEO_GUIDES: AeoGuide[] = [
  {
    slug: 'schema-markup',
    checkKey: 'schema',
    title: 'Schema.org Structured Data',
    metaTitle: 'What is Schema Markup and Why Does AI Need It? | TendorAI',
    metaDescription: 'Schema markup tells AI assistants exactly what your business does. Learn what it is, why it matters, and how TendorAI installs it automatically.',
    whatItIs: 'Schema markup is invisible code added to your website that tells AI assistants — like ChatGPT, Perplexity, and Google AI — exactly what your business is, what services you offer, where you are located, and how much you charge. Without it, AI has to guess based on your page text, which means it often gets it wrong or skips your firm entirely.',
    whyItMatters: 'AI recommendation engines rely on structured data to confidently recommend specific businesses. A firm with schema markup telling AI "this is a CQS-accredited conveyancing solicitor in Cardiff charging £895 fixed fee" is far more likely to be recommended than a firm with no structured data. This is the single highest-impact change you can make for AI visibility.',
    difficulty: 'TendorAI fixes this',
    timeToFix: 'Automatic on Pro — live within 48 hours',
    howToFix: [
      {
        platform: 'TendorAI Pro (recommended)',
        steps: [
          'Upgrade to TendorAI Pro',
          'Complete your profile in the dashboard — add your services, fees, and accreditations',
          'TendorAI automatically installs the correct schema markup on your website within 48 hours',
          'Every time you update your profile, your website schema updates automatically',
        ],
      },
      {
        platform: 'WordPress (manual)',
        steps: [
          'Install the "Schema & Structured Data for WP & AMP" plugin',
          'Go to Schema > All Schema Markup > Add New',
          'Select your business type (LegalService, AccountingService etc.)',
          'Fill in your business name, address, phone, and services',
          'Save and verify at schema.org/validator',
        ],
      },
      {
        platform: 'Any website (manual)',
        steps: [
          'Generate your schema at technicalseo.com/tools/schema-markup-generator/',
          'Select your business type',
          'Fill in your details',
          'Copy the JSON-LD code generated',
          'Paste it into your website before the closing </head> tag',
          'Ask your web developer if you are unsure how to do this',
        ],
      },
    ],
    tendoraiFixesThis: true,
    tendoraiHowItHelps: 'TendorAI Pro automatically generates and installs the correct Schema.org markup for your vertical — LegalService for solicitors, AccountingService for accountants, FinancialService for mortgage advisers. It updates automatically every time you change your profile. No developer needed.',
  },
  {
    slug: 'meta-titles',
    checkKey: 'metaTags',
    title: 'Meta Title & Description',
    metaTitle: 'How to Fix Your Meta Title and Description for AI Visibility | TendorAI',
    metaDescription: 'Your meta title and description are what AI reads first about your business. Learn how to write them for AI recommendations.',
    whatItIs: 'Your meta title is the headline that appears in Google search results. Your meta description is the short summary beneath it. Both are read by AI assistants when they research your business. They tell AI what your firm does, where you are, and why someone should choose you.',
    whyItMatters: 'A meta title like "Welcome to Our Website" tells AI nothing useful. A meta title like "Cardiff Conveyancing Solicitors — Fixed Fees from £895 — CQS Accredited" tells AI exactly what to say when recommending you. This is one of the quickest fixes with immediate impact.',
    difficulty: 'Easy',
    timeToFix: '15-20 minutes',
    howToFix: [
      {
        platform: 'WordPress',
        steps: [
          'Install the free Yoast SEO plugin if not already installed',
          'Go to your homepage in the WordPress editor',
          'Scroll down to the Yoast SEO section at the bottom',
          'Click "Edit snippet"',
          'Write your meta title: [City] [Service] — [Key Benefit] — [Firm Name]. Example: Cardiff Conveyancing Solicitors — Fixed Fees from £895 — Lucas Law',
          'Write your meta description in 150 characters: what you do, where you are, what makes you different',
          'Save the page',
        ],
      },
      {
        platform: 'Wix',
        steps: [
          'Go to your Wix dashboard',
          'Click on your page in the Pages menu',
          'Click the three dots next to the page name',
          'Select SEO Settings',
          'Update the title tag and meta description',
          'Save',
        ],
      },
      {
        platform: 'Squarespace',
        steps: [
          'Go to Pages in your Squarespace dashboard',
          'Click the gear icon next to your homepage',
          'Click SEO',
          'Update the SEO title and description',
          'Save',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro installs schema markup that reinforces your meta title signals. When both work together, AI has two sources confirming what your business does.',
  },
  {
    slug: 'h1-heading',
    checkKey: 'h1',
    title: 'H1 Heading',
    metaTitle: 'Why Your H1 Heading Matters for AI Recommendations | TendorAI',
    metaDescription: 'Your H1 heading is the first thing AI reads on your website. Learn what it should say and how to fix it in under 10 minutes.',
    whatItIs: 'Your H1 heading is the main headline on your webpage — the largest text at the top of the page. Every page should have exactly one H1. AI assistants read it first to understand what your page and business is about.',
    whyItMatters: 'An H1 that says "Welcome" or uses your firm name only tells AI nothing about what you do. An H1 that says "Conveyancing Solicitors in Cardiff — Fixed Fees, No Hidden Costs" immediately tells AI your service, location, and value proposition. AI uses this to decide whether to recommend you for relevant queries.',
    difficulty: 'Easy',
    timeToFix: '10 minutes',
    howToFix: [
      {
        platform: 'WordPress',
        steps: [
          'Go to your homepage in the WordPress editor',
          'Find the main headline text at the top of the page',
          'Make sure it is set as Heading 1 (H1) in the paragraph dropdown',
          'Rewrite it to include: your service, your city, and your key benefit',
          'Example: "Conveyancing Solicitors in Cardiff — Fixed Fees, No Surprises"',
          'Update the page',
        ],
      },
      {
        platform: 'Wix / Squarespace / Webflow',
        steps: [
          'Open the page editor',
          'Click on your main headline',
          'Check it is set as Heading 1 in the text formatting options',
          'Rewrite it to include your service, city, and key benefit',
          'Save and publish',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro schema markup reinforces your H1 by providing structured data that confirms your service and location to AI independently of your page text.',
  },
  {
    slug: 'mobile-viewport',
    checkKey: 'mobileViewport',
    title: 'Mobile Viewport',
    metaTitle: 'Why Mobile Optimisation Affects AI Visibility | TendorAI',
    metaDescription: 'AI assistants check whether your website works on mobile. Learn what mobile viewport means and how to fix it.',
    whatItIs: 'The mobile viewport setting tells browsers how to display your website on phones and tablets. Without it, your website may appear tiny and unreadable on mobile devices. AI platforms check for this as a basic trust signal — websites that do not work on mobile are considered low quality.',
    whyItMatters: 'Over 60% of searches now happen on mobile. Google and AI platforms deprioritise websites that are not mobile-friendly. If your website fails this check it signals to AI that your online presence is outdated, which reduces recommendation confidence.',
    difficulty: 'Needs developer',
    timeToFix: '30 minutes for a developer — free on modern website builders',
    howToFix: [
      {
        platform: 'WordPress',
        steps: [
          'Most modern WordPress themes are mobile-responsive automatically',
          'If failing, your theme is outdated — consider switching to a free modern theme like Astra or GeneratePress',
          'Alternatively ask your web developer to add this to your <head> section:',
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
          'This takes a developer about 5 minutes',
        ],
      },
      {
        platform: 'Wix / Squarespace / Webflow',
        steps: [
          'These platforms handle mobile viewport automatically',
          'If failing, contact the platform support — this should not fail on modern builders',
          'Check you have not disabled mobile view in the editor settings',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'This is a website infrastructure issue TendorAI cannot fix directly. However our done-for-you Website AI Optimisation service includes checking and fixing your mobile viewport as part of the setup.',
  },
  {
    slug: 'ssl-certificate',
    checkKey: 'ssl',
    title: 'SSL Certificate (HTTPS)',
    metaTitle: 'What is an SSL Certificate and Why Does AI Require It? | TendorAI',
    metaDescription: 'AI assistants will not recommend websites without SSL certificates. Learn how to get one free in under 24 hours.',
    whatItIs: 'An SSL certificate creates a secure encrypted connection between your website and visitors. You can tell a website has one because the address starts with https:// and shows a padlock in the browser. Without it your address starts with http:// and browsers show a "Not Secure" warning.',
    whyItMatters: 'AI platforms will not recommend unsecure websites. A missing SSL certificate is an immediate disqualifier for AI recommendations. It also damages trust with human visitors — most people will leave a website that shows "Not Secure." This is a critical fix.',
    difficulty: 'Easy',
    timeToFix: '24 hours — usually free',
    howToFix: [
      {
        platform: 'Any hosting provider',
        steps: [
          'Log into your hosting control panel (cPanel, Plesk, or your host\'s dashboard)',
          'Look for "SSL/TLS" or "Let\'s Encrypt" in the security section',
          'Install a free Let\'s Encrypt certificate — most hosts offer this one click',
          'If you cannot find it, contact your hosting provider and ask them to install a free SSL certificate',
          'Allow 24 hours for the certificate to activate',
          'After activation, set up a redirect from http:// to https:// — ask your host to do this',
        ],
      },
      {
        platform: 'Wix / Squarespace / Webflow',
        steps: [
          'These platforms include SSL automatically',
          'If showing as failed, your custom domain may not be connected correctly',
          'Go to your domain settings and ensure SSL is enabled for your custom domain',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'SSL is a hosting issue outside TendorAI\'s control. However our done-for-you Website AI Optimisation service includes verifying and fixing your SSL setup.',
  },
  {
    slug: 'page-weight',
    checkKey: 'pageWeight',
    title: 'Page Weight (Load Speed)',
    metaTitle: 'How Page Speed Affects AI Visibility and How to Fix It | TendorAI',
    metaDescription: 'Slow websites get deprioritised by AI and Google. Learn how to speed up your website in under 30 minutes without a developer.',
    whatItIs: 'Page weight is how much data your website downloads when someone visits it. A heavy page — usually caused by large images or videos — loads slowly. Slow websites frustrate visitors and signal to AI that the website is poorly maintained.',
    whyItMatters: 'Google uses page speed as a ranking factor and AI platforms follow suit. A website that takes more than 3 seconds to load loses visitors and loses AI recommendation opportunities. Large images are the most common cause — a photo straight from a phone camera can be 5-10MB when it should be under 200KB.',
    difficulty: 'Easy',
    timeToFix: '20-30 minutes',
    howToFix: [
      {
        platform: 'Any website',
        steps: [
          'Go to tinypng.com — it is free',
          'Upload all the images on your homepage and key service pages',
          'Download the compressed versions — typically 60-80% smaller',
          'Replace the images on your website with the compressed versions',
          'Remove any videos that play automatically on page load',
          'Test your speed at pagespeed.web.dev — aim for green on mobile',
        ],
      },
      {
        platform: 'WordPress',
        steps: [
          'Install the free Smush plugin',
          'It automatically compresses all images on your site',
          'Also install WP Super Cache for faster page loading',
          'Both are free and take 5 minutes to set up',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'Our done-for-you Website AI Optimisation service includes compressing your images and basic speed optimisation as part of the setup.',
  },
  {
    slug: 'social-media-links',
    checkKey: 'socialLinks',
    title: 'Social Media Links',
    metaTitle: 'Why Social Media Links Improve AI Visibility | TendorAI',
    metaDescription: 'AI assistants look for social media links to verify your business is active and legitimate. Learn how to add them in 5 minutes.',
    whatItIs: 'Social media links on your website connect your site to your LinkedIn, Facebook, and other profiles. AI assistants use these links to verify your business is real, active, and legitimate. They also use your social profiles as additional sources of information about what you do.',
    whyItMatters: 'LinkedIn is cited in over 44% of AI responses about professional services firms. A solicitor or accountant with an active LinkedIn profile linked from their website gives AI an additional trusted source to draw from when making recommendations. This is a 5-minute fix with meaningful impact.',
    difficulty: 'Easy',
    timeToFix: '5 minutes',
    howToFix: [
      {
        platform: 'Any website',
        steps: [
          'Find your LinkedIn company page URL — it looks like linkedin.com/company/your-firm-name',
          'Find your Facebook page URL if you have one',
          'Add these links to your website footer',
          'Use recognisable icons — most website builders have social media icon blocks',
          'Make sure the links open in a new tab',
          'If you do not have a LinkedIn company page, create one at linkedin.com/company/setup/new — it takes 10 minutes and is free',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro publishes your blog posts to LinkedIn and Facebook automatically, keeping your social profiles active and giving AI fresh content to cite. Your LinkedIn URL is stored in your TendorAI profile and included in your schema markup.',
  },
  {
    slug: 'contact-information',
    checkKey: 'contactInfo',
    title: 'Contact Information',
    metaTitle: 'Why Contact Information is Critical for AI Recommendations | TendorAI',
    metaDescription: 'AI assistants use your contact details to verify you are a real local business. Learn what to publish and where.',
    whatItIs: 'Contact information means your full business address, phone number, and email address published clearly on your website. AI assistants use this to confirm you are a real, legitimate business operating in a specific location.',
    whyItMatters: 'When someone asks AI for a solicitor in Cardiff, AI needs to confirm you are actually in Cardiff. If your address is not clearly published on your website, AI cannot make this confirmation and will recommend a competitor whose address is visible. This is one of the easiest fixes with immediate impact.',
    difficulty: 'Easy',
    timeToFix: '5 minutes',
    howToFix: [
      {
        platform: 'Any website',
        steps: [
          'Add your full business address to your website footer — every page should show it',
          'Add your main phone number to the footer and your contact page',
          'Add your email address to the contact page',
          'Make sure your address matches exactly what is on Google Business Profile and Companies House',
          'Add a Google Maps embed to your contact page — this reinforces location signals for AI',
          'Check your contact page is linked in your main navigation',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'Your full address and contact details are stored in your TendorAI profile and included in your schema markup, giving AI a structured, verified source for your location data.',
  },
  {
    slug: 'faq-section',
    checkKey: 'faqSection',
    title: 'FAQ Section',
    metaTitle: 'How to Add an FAQ Section That AI Will Cite | TendorAI',
    metaDescription: 'FAQ sections are the most cited content format in AI responses. Learn how to write and add one to your website in 30 minutes.',
    whatItIs: 'A FAQ section is a list of questions and answers on your website. It directly mirrors how people ask AI assistants for information — "how much does conveyancing cost?" or "how long does remortgaging take?" — making it the most likely content to be cited in AI responses.',
    whyItMatters: 'AI assistants are essentially FAQ machines. When someone asks ChatGPT "how much does a solicitor charge for conveyancing in Cardiff?" it looks for websites that directly answer that question. A firm with a FAQ that says "Our conveyancing fees start from £895 including VAT for properties up to £250,000" is far more likely to be cited and recommended than a firm that says "contact us for a quote."',
    difficulty: 'Easy',
    timeToFix: '30 minutes',
    howToFix: [
      {
        platform: 'Any website',
        steps: [
          'Create a FAQ page or add a FAQ section to your homepage and service pages',
          'Write 5-10 questions your clients actually ask — think about what people ask on the phone',
          'For solicitors: How much does conveyancing cost? How long does it take? Do you offer fixed fees? Are you CQS accredited? What areas do you cover?',
          'For accountants: How much do you charge? Do you use Xero? Are you MTD compliant? What industries do you specialise in?',
          'Answer each question in 2-4 sentences — be specific with numbers and timescales',
          'Add FAQPage schema markup to the page — this tells AI the content is a FAQ and increases citation likelihood significantly',
          'TendorAI Pro blog writer automatically creates FAQ content for your profile',
        ],
      },
      {
        platform: 'WordPress',
        steps: [
          'Install the free "Accordion FAQ" plugin',
          'Add your questions and answers',
          'The plugin automatically adds FAQPage schema markup',
          'Place the FAQ block on your homepage and key service pages',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro includes an AI blog writer that automatically generates FAQ-rich content for your TendorAI profile twice a week. This content is indexed by AI platforms and improves your citation frequency. Our done-for-you setup service writes and installs a FAQ section on your own website as part of the £395 package.',
  },
  {
    slug: 'content-length',
    checkKey: 'contentLength',
    title: 'Content Length',
    metaTitle: 'How Much Content Does Your Website Need for AI Visibility? | TendorAI',
    metaDescription: 'AI assistants need enough content to understand what your business does. Learn the minimum content requirements and how to fix thin pages.',
    whatItIs: 'Content length refers to how much useful text is on your website pages. Thin pages with very little text — a few sentences or just a contact form — give AI very little to work with. AI needs enough text to understand your services, your expertise, and your location before it can confidently recommend you.',
    whyItMatters: 'A service page that says "We offer conveyancing services. Contact us for more information." gives AI nothing to cite. A service page that explains what conveyancing involves, how long it takes, what it costs, what accreditations you hold, and what areas you cover gives AI everything it needs to recommend you specifically. The minimum is 300 words per key service page.',
    difficulty: 'Medium',
    timeToFix: '30-45 minutes per page',
    howToFix: [
      {
        platform: 'Any website',
        steps: [
          'Identify your key service pages — conveyancing, family law, tax advisory etc.',
          'Check each page has at least 300 words of useful content',
          'For each thin page, add: what the service is, who needs it, how the process works step by step, how long it takes, what it costs, what accreditations or qualifications you hold for this service',
          'Be specific — "we handle conveyancing transactions typically completing in 8-12 weeks with fixed fees from £895" is far better than "we offer professional conveyancing services"',
          'Use the TendorAI AI blog writer to generate properly structured content for your service pages',
          'Each piece of content should answer a specific question someone might ask AI',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro blog writer generates 600-800 word AI-optimised articles about your services twice a week, automatically published to your TendorAI profile. Our done-for-you setup service writes and installs expanded content on your key service pages as part of the £395 package.',
  },
  {
    slug: 'google-reviews',
    checkKey: 'googleReviews',
    title: 'Google Reviews',
    metaTitle: 'How to Get More Google Reviews for AI Visibility | TendorAI',
    metaDescription: 'Google review count and rating are strong AI citation signals. Learn how to ask clients, run a review funnel, and avoid the Google TOS traps.',
    whatItIs: 'Google Reviews are the star-rated reviews left on your Google Business Profile. AI assistants treat review count and average rating as strong trust signals — a firm with 50 reviews averaging 4.8 stars is far more likely to be cited than one with 3 reviews at 3.7 stars, even if the services are identical. Google is typically the most-cited review source in AI responses for UK professional-services firms.',
    whyItMatters: 'When someone asks ChatGPT "who is the best conveyancing solicitor in Cardiff?" the model weighs review volume and rating alongside other signals. Zero or near-zero Google reviews tells AI there is no social proof to cite, so the firm quietly drops out of recommendations. Building a steady review cadence — even 1-2 new reviews per month — is one of the highest-signal, lowest-cost changes a regulated firm can make for AI visibility.',
    difficulty: 'Medium',
    timeToFix: 'Ongoing — 3-6 months to build a meaningful baseline',
    howToFix: [
      {
        platform: 'Any business',
        steps: [
          'Claim and fully populate your Google Business Profile first — reviews require a claimed profile (see the Google Business Profile guide)',
          'Ask every satisfied client at a clear success moment: completion, case close-out, or final invoice paid — not at random',
          'Make the ask personal and short: "It would really help us if you could leave a quick Google review. Here is a direct link: [link]"',
          'Never offer discounts, gifts, or any incentive for a review — Google terms of service prohibit this and reviews obtained this way get removed',
          'Generate your direct review link from your Google Business dashboard — the "Get more reviews" section creates a short form URL you can paste anywhere',
          'Send the ask 3-5 days after the service completes, while the experience is still fresh',
          'Reply to every review, positive or negative. Replies are visible to AI crawlers and signal an engaged, active firm',
          'Track which clients you have asked — avoid double-asking and avoid going silent for months',
        ],
      },
      {
        platform: 'Email workflow (Gmail / Outlook)',
        steps: [
          'Build a saved template: subject "Quick favour from [firm name]", three sentences in the body, the direct Google review link',
          'Body structure: one sentence of thanks, one sentence of context about the work, one sentence asking for the review with the link',
          'Send from a named person, not a generic info@ — response rates are materially higher',
          'Add a soft reminder 7 days later if no review appears — one reminder only, then drop it',
        ],
      },
      {
        platform: 'WordPress',
        steps: [
          'Install a Google reviews widget (for example "Widget for Google Reviews")',
          'Connect your Google Business Profile',
          'Display your average rating and recent reviews on your homepage and key service pages — AI assistants scrape this content too',
          'The visible review widget also improves conversion from website visitors',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro tracks your Google review count and average rating in the weekly visibility report, so you can see whether your review cadence is translating into AI citation improvements. We do not send reviews on your behalf — Google prohibits third-party review solicitation — but we flag when review signal gaps are hurting your AI visibility score and recommend specific next steps.',
  },
  {
    slug: 'pricing-information',
    checkKey: 'pricingInformation',
    title: 'Pricing Information',
    metaTitle: 'How to Publish Prices Without Exposure — AI visibility Fix Guide | TendorAI',
    metaDescription: 'Regulated firms worry about publishing prices. Learn how to comply-to-publish safely, with SRA-compliant language, ranges, and "starting from" framing.',
    whatItIs: 'Pricing information on your website means published fee ranges, fixed fees, or hourly rates that AI can quote directly. When someone asks ChatGPT "how much does a will cost in Bristol?" the assistant looks for firms that publish specific numbers — not ones that say "contact us for a quote." A firm with published pricing gets recommended; a firm without typically gets skipped.',
    whyItMatters: 'Many regulated firms avoid publishing prices for two reasons: fear that pricing fences off negotiation, and fear that published prices create liability if a case runs over scope. Both concerns are overblown. Range-based language ("fees for standard conveyancing start from £895 + VAT and disbursements") protects you because it explicitly describes a standard scope and leaves complex cases open for a quote. AI strongly prefers this kind of transparent firm when making recommendations, and the absence of any published pricing is one of the fastest ways to lose an AI citation to a competitor who has published.',
    difficulty: 'Medium',
    timeToFix: '2-4 hours',
    howToFix: [
      {
        platform: 'Solicitors (SRA regulated)',
        steps: [
          'The SRA Transparency Rules (in force from 6 December 2018) already require published pricing for a defined list of service areas — including residential conveyancing, uncontested probate, motoring offences (summary), employment tribunals, debt recovery up to £100,000, licensing applications, and immigration (excluding asylum)',
          'Check the SRA price and service transparency guidance for the current list — if any of your services are on it, publishing prices is not optional, so the "exposure" concern is already moot',
          'For mandated areas, publish a full pricing page covering scope, fees, timeframes, and who will do the work — the SRA specifies what must be included',
          'For non-mandated areas, adopt the same format voluntarily — AI weighs consistency across your pricing content',
        ],
      },
      {
        platform: 'Any website',
        steps: [
          'Identify your 3-5 highest-volume services',
          'For each, write a pricing section using range or "starting from" language',
          'Example: "Standard residential conveyancing: fees from £895 + VAT and disbursements. Leasehold properties: from £1,195 + VAT. Complex cases are quoted individually."',
          'Always specify the scope: what is included, what triggers additional fees',
          'Add a closing note: "Quoted prices apply to transactions with no complications. We confirm the final fee in writing before you instruct."',
          'For accountants and mortgage advisers (not price-regulated), the same range-based approach works — there is no regulatory barrier',
        ],
      },
      {
        platform: 'WordPress / Squarespace',
        steps: [
          'Create a /pricing or /fees page',
          'Add a simple fees table: service, starting fee, scope, what is included',
          'Link the pricing page from your navigation and from every relevant service page',
          'Squarespace: use the built-in Table block — no plugin needed',
          'WordPress: a standard Table block or a plugin like TablePress works fine',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro generates AI-optimised pricing content using safe range-based language tailored to your regulatory framework. Our done-for-you setup service writes and installs a compliant pricing page on your website as part of the £395 package.',
  },
  {
    slug: 'service-pages',
    checkKey: 'detailedServicePages',
    title: 'Detailed Service Pages',
    metaTitle: 'Why Thin Service Pages Lose AI Citations — Fix Guide | TendorAI',
    metaDescription: 'AI cites firms whose service pages explain the service in depth. Learn what makes a page thick enough to get cited, with examples.',
    whatItIs: 'A service page describes one specific thing your firm does — conveyancing, VAT returns, will writing. "Detailed" means the page has enough depth for AI to confidently understand the service, the process, the fees, and who it is for. The TendorAI detector is not looking for the presence of service pages — it is looking for depth. A page titled "Conveyancing" with one short paragraph counts as thin and fails the check.',
    whyItMatters: 'When AI is asked to recommend a firm for a specific service, it cites the firm whose page explains that service most thoroughly. A thin "we do conveyancing" page tells AI almost nothing about your process, scope, fees, or expertise. A thick page with 800+ words covering process steps, timescales, fees, accreditations, and FAQs gives AI everything it needs to cite you confidently — and to exclude competitors with thinner pages. This is one of the highest-impact content changes a firm can make.\n\nExample thin page (fails): "We offer conveyancing services for residential and commercial property transactions. Contact us for more information."\n\nExample thick page (passes): "Residential conveyancing typically completes in 8-12 weeks. Our fixed fee of £895 + VAT and disbursements covers: searches, Land Registry fees, SDLT filing, exchange, and completion. Leasehold adds £300 for additional landlord enquiries. Complex cases are quoted individually. We hold CQS accreditation from the Law Society. Most of our clients are first-time buyers in Cardiff and the Vale." (Plus process steps, FAQs, and accreditation detail that follows.)',
    difficulty: 'Medium',
    timeToFix: '1-2 hours per service page',
    howToFix: [
      {
        platform: 'Any website',
        steps: [
          'List every service your firm offers',
          'For each service, aim for 600-800 words minimum on a dedicated page',
          'Cover six sections: what the service is, who it is for, the process step by step, typical timescales, pricing (range or fixed fee), your specific qualifications or accreditations for this service',
          'End each page with 3-5 FAQ entries specific to that service',
          'Internal-link between related services (for example, "Buying leasehold? See our Leasehold Conveyancing page")',
          'Use H2 headings for each section so AI can parse the page structure',
          'Avoid image-only service pages — AI cannot read text embedded inside images',
        ],
      },
      {
        platform: 'WordPress',
        steps: [
          'Create a new page for each service under Pages → Add New',
          'Use Yoast or Rank Math to check readability and length — aim for the green scores',
          'Add a "What is included" list and a "What is not included" list — AI responds well to explicit scope',
          'Use the reusable-block feature for your FAQ template, so every service page has a consistent structure',
        ],
      },
      {
        platform: 'Squarespace / Wix',
        steps: [
          'Add a service page in your navigation',
          'Use the built-in content blocks for headings, bullet lists, and FAQ accordions',
          'Write in the page editor directly — do not paste from Word, which can import hidden formatting that trips up crawlers',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro generates 600-800 word AI-optimised service-page content twice a week, automatically published to your TendorAI profile and indexed by AI platforms. Our done-for-you setup service expands your website thin service pages to the depth AI needs as part of the £395 package.',
  },
  {
    slug: 'google-business-profile',
    checkKey: 'googleBusinessProfile',
    title: 'Google Business Profile',
    metaTitle: 'How to Claim and Populate Google Business Profile for AI | TendorAI',
    metaDescription: 'Google Business Profile is the source of truth AI uses for local firms. Learn how to claim, verify, and fully populate yours — including primaryType.',
    whatItIs: 'A Google Business Profile (formerly Google My Business) is the free Google listing that appears in Google Maps, Google search, and — increasingly — in AI Overviews. It is where your opening hours, photos, services, reviews, address, and business description live. AI assistants treat a fully-populated GBP as strong local-business validation. If you are not on Google Maps for your city and service, AI often will not cite you at all.',
    whyItMatters: 'The GBP check is one of the highest-signal AI visibility checks because Google Business Profile is effectively the source of truth AI uses for local-business existence and trust. A firm without a claimed and populated GBP is close to invisible in local AI recommendations. A claimed-but-empty GBP is better than nothing but still fails — AI needs a primary category, opening hours, photos, services, and ideally reviews before it cites you confidently. The primaryType you select (for example "Solicitor", "Chartered Accountant", "Estate agent") is critical — it is how Google classifies you for category-based queries and feeds the Google Maps Presence check.',
    difficulty: 'Easy',
    timeToFix: '1-2 hours setup, plus 2-14 days for verification',
    howToFix: [
      {
        platform: 'Any business (one-time setup)',
        steps: [
          'Go to business.google.com/create',
          'Enter your business name exactly as it appears on your website and Companies House record',
          'Select the most specific primary category — "Solicitor" not "Lawyer", "Chartered Accountant" not just "Accountant". PrimaryType matching drives the Google Maps Presence check',
          'Add your full business address, or mark yourself as a service-area business if you do not have client-facing premises',
          'Verify — Google offers postcard, phone call, or video verification. Video is usually fastest (48-72 hours)',
          'Add opening hours — AI checks for these specifically, and missing hours triggers the amber "incomplete" state on the GBP check',
          'Upload at least 5 photos — exterior, interior, team, logo, and one service photo',
          'Write a 750-character business description using your primary keywords naturally: "We are a CQS-accredited conveyancing solicitor in Cardiff offering fixed-fee residential and commercial conveyancing across the Vale of Glamorgan"',
          'Add services — list each specific service as a separate Service entry, not one generic line',
          'Populate the Q&A section — seed it with 3-5 questions you know clients ask, and answer them yourself',
          'Add attributes relevant to your firm — wheelchair accessible, online appointments, women-owned, etc.',
          'Post a Google Post at least once a month — these appear on your profile and signal an active, current business',
        ],
      },
      {
        platform: 'Website consistency (any CMS)',
        steps: [
          'GBP is independent of your website CMS, but NAP consistency (name, address, phone) matters',
          'Make sure your website footer NAP matches your GBP exactly — including formatting (e.g. "Ltd" vs "Limited")',
          'Inconsistency hurts the Google Maps Presence check and reduces AI confidence in the listing',
        ],
      },
    ],
    tendoraiFixesThis: false,
    tendoraiHowItHelps: 'TendorAI Pro tracks your GBP completeness as part of the weekly visibility report. If opening hours, photos, or the business description drift below threshold, we flag it in your dashboard. Google requires the business owner to claim and verify the profile, so we do not do that on your behalf — but we guide you through setup as part of the £395 done-for-you setup service.',
  },
]
