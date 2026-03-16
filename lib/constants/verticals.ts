export interface VerticalConfig {
  slug: string;
  name: string;
  nameSingular: string;
  regulatoryBody: string;
  hero: {
    badge: string;
    h1: string;
    subtitle: string;
    ctaText: string;
  };
  problem: {
    heading: string;
    body: string;
  };
  howItWorks: { step: string; title: string; description: string }[];
  seoVsAi: string;
  services: { name: string; slug: string }[];
  pricingCallout: {
    free: string;
    pro: string;
  };
  faqs: { question: string; answer: string }[];
  meta: {
    title: string;
    description: string;
  };
}

export const VERTICALS: Record<string, VerticalConfig> = {
  solicitors: {
    slug: 'ai-visibility-for-solicitors',
    name: 'Solicitors',
    nameSingular: 'solicitor',
    regulatoryBody: 'SRA',
    hero: {
      badge: '12,000+ businesses already listed',
      h1: 'AI Visibility (AEO) for Solicitors',
      subtitle:
        '200M people now ask ChatGPT instead of Google when they need a solicitor. If your firm isn\u2019t in AI\u2019s data sources, you\u2019re invisible to these potential clients.',
      ctaText: 'Run Your Free AI Visibility Report',
    },
    problem: {
      heading: 'Your firm isn\u2019t showing up in AI recommendations',
      body: 'When someone asks ChatGPT \u201Cwho\u2019s the best conveyancing solicitor near me?\u201D, AI doesn\u2019t Google you. It pulls from structured data sources \u2014 and most law firms don\u2019t have any. Your competitors who do are getting recommended by name. Your firm is being skipped entirely.',
    },
    howItWorks: [
      {
        step: '1',
        title: 'We build your profile from SRA data',
        description:
          'Your firm gets a free profile built from Solicitors Regulation Authority records \u2014 practice areas, office locations, SRA number, and contact details.',
      },
      {
        step: '2',
        title: 'You add pricing and specialisms',
        description:
          'Add your fee ranges, accreditations, and areas of expertise. This is the structured data AI needs to recommend you with confidence.',
      },
      {
        step: '3',
        title: 'AI recommends your firm by name',
        description:
          'When someone asks ChatGPT, Claude, or Perplexity for a solicitor, AI reads your enriched profile and recommends your firm directly.',
      },
    ],
    seoVsAi:
      'SEO gets you ranked on Google. AI visibility gets you recommended by ChatGPT, Claude, Perplexity, and Google AI. These are different systems with different data sources. Your website copy alone isn\u2019t enough \u2014 AI needs structured, verified data to recommend your firm. The firms investing in AI visibility now will dominate for years, just like the firms that invested in SEO in 2005.',
    services: [
      { name: 'Conveyancing', slug: 'conveyancing' },
      { name: 'Family Law', slug: 'family-law' },
      { name: 'Criminal Law', slug: 'criminal-law' },
      { name: 'Commercial Law', slug: 'commercial-law' },
      { name: 'Employment Law', slug: 'employment-law' },
      { name: 'Wills & Probate', slug: 'wills-and-probate' },
      { name: 'Immigration', slug: 'immigration' },
      { name: 'Personal Injury', slug: 'personal-injury' },
    ],
    pricingCallout: {
      free: 'Claim your SRA-verified profile and get listed in the TendorAI directory.',
      pro: 'We install AI-optimised structured data on your firm\u2019s website.',
    },
    faqs: [
      {
        question: 'How does TendorAI know about my firm?',
        answer:
          'We build your initial profile from public SRA (Solicitors Regulation Authority) data \u2014 your practice areas, registered offices, SRA number, and authorisation status. You then claim and enrich it with pricing, specialisms, and accreditations.',
      },
      {
        question: 'Which AI platforms will recommend my firm?',
        answer:
          'TendorAI structures your data for all major AI platforms \u2014 ChatGPT, Google Gemini, Claude, Perplexity, Microsoft Copilot, and Apple Intelligence. When any of these are asked for a solicitor, your enriched profile is in their data sources.',
      },
      {
        question: 'How is this different from legal directories like Chambers or Legal 500?',
        answer:
          'Legal directories rank firms for humans browsing websites. TendorAI structures your data for AI assistants. When someone asks ChatGPT for a solicitor recommendation, it doesn\u2019t read Chambers \u2014 it reads structured data. Different audience, different technology.',
      },
      {
        question: 'Do I need to be SRA-regulated?',
        answer:
          'TendorAI is built for SRA-regulated law firms in England and Wales. Your SRA registration is used to verify your profile and give AI platforms confidence in recommending you.',
      },
      {
        question: 'Can I cancel at any time?',
        answer:
          'Yes. All paid plans are month-to-month with no contracts. Cancel from your dashboard at any time and keep access until the end of your billing period.',
      },
    ],
    meta: {
      title: 'AI Visibility for Solicitors \u2014 Get Recommended by ChatGPT',
      description:
        'AI is how people find solicitors now. TendorAI structures your firm\u2019s data so ChatGPT, Claude, and Perplexity recommend you by name. Free SRA-verified profile. Plans from \u00A3299/month.',
    },
  },

  accountants: {
    slug: 'ai-visibility-for-accountants',
    name: 'Accountants',
    nameSingular: 'accountant',
    regulatoryBody: 'ICAEW/ACCA',
    hero: {
      badge: '12,000+ businesses already listed',
      h1: 'AI Visibility (AEO) for Accountants',
      subtitle:
        '200M people now ask ChatGPT instead of Google when they need an accountant. If your practice isn\u2019t in AI\u2019s data sources, you\u2019re invisible to these potential clients.',
      ctaText: 'Run Your Free AI Visibility Report',
    },
    problem: {
      heading: 'Your practice isn\u2019t showing up in AI recommendations',
      body: 'When a business owner asks ChatGPT \u201Cwho\u2019s the best accountant for small businesses near me?\u201D, AI doesn\u2019t search Google. It pulls from structured data \u2014 and most accounting firms don\u2019t have any. The practices that do are being recommended by name. Yours is being skipped.',
    },
    howItWorks: [
      {
        step: '1',
        title: 'We build your profile from public data',
        description:
          'Your practice gets a free profile built from Companies House and professional body records \u2014 services offered, office locations, and contact details.',
      },
      {
        step: '2',
        title: 'You add pricing and service areas',
        description:
          'Add your fee ranges, qualifications, and specialist areas. This is the structured data AI needs to recommend you over competitors.',
      },
      {
        step: '3',
        title: 'AI recommends your practice by name',
        description:
          'When someone asks ChatGPT, Claude, or Perplexity for an accountant, AI reads your enriched profile and recommends your practice directly.',
      },
    ],
    seoVsAi:
      'SEO gets you ranked on Google. AI visibility gets you recommended by ChatGPT, Claude, Perplexity, and Google AI. These are different systems with different data sources. Your website alone isn\u2019t enough \u2014 AI needs structured, verified data to recommend your practice. The firms investing in AI visibility now will dominate for years, just like the firms that invested in SEO in 2005.',
    services: [
      { name: 'Tax Advisory', slug: 'tax-advisory' },
      { name: 'Audit & Assurance', slug: 'audit-assurance' },
      { name: 'Bookkeeping', slug: 'bookkeeping' },
      { name: 'Payroll', slug: 'payroll' },
      { name: 'Corporate Finance', slug: 'corporate-finance' },
      { name: 'Business Advisory', slug: 'business-advisory' },
      { name: 'VAT Services', slug: 'vat-services' },
      { name: 'Financial Planning', slug: 'financial-planning' },
    ],
    pricingCallout: {
      free: 'Claim your verified profile and get listed in the TendorAI directory.',
      pro: 'We install AI-optimised structured data on your practice\u2019s website.',
    },
    faqs: [
      {
        question: 'How does TendorAI know about my practice?',
        answer:
          'We build your initial profile from public data sources including Companies House and professional body registrations. You then claim and enrich it with pricing, qualifications, and specialist areas.',
      },
      {
        question: 'Which AI platforms will recommend my practice?',
        answer:
          'TendorAI structures your data for all major AI platforms \u2014 ChatGPT, Google Gemini, Claude, Perplexity, Microsoft Copilot, and Apple Intelligence. When any of these are asked for an accountant, your enriched profile is in their data sources.',
      },
      {
        question: 'How is this different from Trustpilot or Google Reviews?',
        answer:
          'Reviews tell people you\u2019re good. AI visibility tells AI to recommend you. When someone asks ChatGPT for an accountant, it doesn\u2019t read your Trustpilot page \u2014 it reads structured data. TendorAI provides that structured data.',
      },
      {
        question: 'Do I need to be ICAEW or ACCA registered?',
        answer:
          'TendorAI works with all UK accounting practices. Professional body registration (ICAEW, ACCA, AAT, CIMA) strengthens your profile and gives AI platforms more confidence in recommending you.',
      },
      {
        question: 'Can I cancel at any time?',
        answer:
          'Yes. All paid plans are month-to-month with no contracts. Cancel from your dashboard at any time and keep access until the end of your billing period.',
      },
    ],
    meta: {
      title: 'AI Visibility for Accountants \u2014 Get Recommended by ChatGPT',
      description:
        'AI is how people find accountants now. TendorAI structures your practice\u2019s data so ChatGPT, Claude, and Perplexity recommend you by name. Free verified profile. Plans from \u00A3299/month.',
    },
  },

  'mortgage-advisors': {
    slug: 'ai-visibility-for-mortgage-advisors',
    name: 'Mortgage Advisors',
    nameSingular: 'mortgage advisor',
    regulatoryBody: 'FCA',
    hero: {
      badge: '12,000+ businesses already listed',
      h1: 'AI Visibility (AEO) for Mortgage Advisors',
      subtitle:
        '200M people now ask ChatGPT instead of Google when they need a mortgage advisor. If your firm isn\u2019t in AI\u2019s data sources, you\u2019re invisible to these potential clients.',
      ctaText: 'Run Your Free AI Visibility Report',
    },
    problem: {
      heading: 'Your firm isn\u2019t showing up in AI recommendations',
      body: 'When a first-time buyer asks ChatGPT \u201Cwho\u2019s the best mortgage advisor near me?\u201D, AI doesn\u2019t Google you. It pulls from structured data \u2014 and most mortgage brokers don\u2019t have any. The advisors that do are getting recommended by name. Your firm is being passed over.',
    },
    howItWorks: [
      {
        step: '1',
        title: 'We build your profile from FCA data',
        description:
          'Your firm gets a free profile built from Financial Conduct Authority records \u2014 FCA number, permissions, appointed representatives, and contact details.',
      },
      {
        step: '2',
        title: 'You add specialisms and service areas',
        description:
          'Add your mortgage types, lender panel access, and fee structure. This is the structured data AI needs to recommend you with confidence.',
      },
      {
        step: '3',
        title: 'AI recommends your firm by name',
        description:
          'When someone asks ChatGPT, Claude, or Perplexity for a mortgage advisor, AI reads your enriched profile and recommends your firm directly.',
      },
    ],
    seoVsAi:
      'SEO gets you ranked on Google. AI visibility gets you recommended by ChatGPT, Claude, Perplexity, and Google AI. These are different systems with different data sources. Your website alone isn\u2019t enough \u2014 AI needs structured, verified data to recommend your firm. The advisors investing in AI visibility now will dominate for years, just like the firms that invested in SEO in 2005.',
    services: [
      { name: 'Residential Mortgages', slug: 'residential-mortgages' },
      { name: 'Buy-to-Let', slug: 'buy-to-let' },
      { name: 'Remortgage', slug: 'remortgage' },
      { name: 'First-Time Buyer', slug: 'first-time-buyer' },
      { name: 'Equity Release', slug: 'equity-release' },
      { name: 'Commercial Mortgages', slug: 'commercial-mortgages' },
      { name: 'Protection Insurance', slug: 'protection-insurance' },
    ],
    pricingCallout: {
      free: 'Claim your FCA-verified profile and get listed in the TendorAI directory.',
      pro: 'We install AI-optimised structured data on your firm\u2019s website.',
    },
    faqs: [
      {
        question: 'How does TendorAI know about my firm?',
        answer:
          'We build your initial profile from public FCA (Financial Conduct Authority) data \u2014 your FCA number, permissions, appointed representatives, and registered address. You then claim and enrich it with specialisms and fee details.',
      },
      {
        question: 'Which AI platforms will recommend my firm?',
        answer:
          'TendorAI structures your data for all major AI platforms \u2014 ChatGPT, Google Gemini, Claude, Perplexity, Microsoft Copilot, and Apple Intelligence. When any of these are asked for a mortgage advisor, your enriched profile is in their data sources.',
      },
      {
        question: 'How is this different from lead generation sites like Unbiased?',
        answer:
          'Lead gen sites sell you shared leads. TendorAI makes AI recommend you directly \u2014 the client comes to you, not via a marketplace. No bidding, no shared leads, no referral fees.',
      },
      {
        question: 'Do I need to be FCA-authorised?',
        answer:
          'TendorAI is built for FCA-authorised mortgage advisors and appointed representatives in the UK. Your FCA registration is used to verify your profile and give AI platforms confidence in recommending you.',
      },
      {
        question: 'Can I cancel at any time?',
        answer:
          'Yes. All paid plans are month-to-month with no contracts. Cancel from your dashboard at any time and keep access until the end of your billing period.',
      },
    ],
    meta: {
      title: 'AI Visibility for Mortgage Advisors \u2014 Get Recommended by ChatGPT',
      description:
        'AI is how people find mortgage advisors now. TendorAI structures your firm\u2019s data so ChatGPT, Claude, and Perplexity recommend you by name. Free FCA-verified profile. Plans from \u00A3299/month.',
    },
  },

  'estate-agents': {
    slug: 'ai-visibility-for-estate-agents',
    name: 'Estate Agents',
    nameSingular: 'estate agent',
    regulatoryBody: 'The Property Ombudsman',
    hero: {
      badge: '12,000+ businesses already listed',
      h1: 'AI Visibility (AEO) for Estate Agents',
      subtitle:
        '200M people now ask ChatGPT instead of Google when they need an estate agent. If your agency isn\u2019t in AI\u2019s data sources, you\u2019re invisible to these potential clients.',
      ctaText: 'Run Your Free AI Visibility Report',
    },
    problem: {
      heading: 'Your agency isn\u2019t showing up in AI recommendations',
      body: 'When a homeowner asks ChatGPT \u201Cwho\u2019s the best estate agent near me?\u201D, AI doesn\u2019t Google you. It pulls from structured data \u2014 and most estate agencies don\u2019t have any. The agents that do are getting recommended by name. Your agency is being overlooked.',
    },
    howItWorks: [
      {
        step: '1',
        title: 'We build your profile from public data',
        description:
          'Your agency gets a free profile built from public records \u2014 services offered, office locations, Property Ombudsman membership, and contact details.',
      },
      {
        step: '2',
        title: 'You add services and coverage areas',
        description:
          'Add your property types, service areas, and fee structure. This is the structured data AI needs to recommend you with confidence.',
      },
      {
        step: '3',
        title: 'AI recommends your agency by name',
        description:
          'When someone asks ChatGPT, Claude, or Perplexity for an estate agent, AI reads your enriched profile and recommends your agency directly.',
      },
    ],
    seoVsAi:
      'SEO gets you ranked on Google. AI visibility gets you recommended by ChatGPT, Claude, Perplexity, and Google AI. These are different systems with different data sources. Your Rightmove listings alone aren\u2019t enough \u2014 AI needs structured, verified data to recommend your agency. The agents investing in AI visibility now will dominate for years, just like the agencies that invested in SEO in 2005.',
    services: [
      { name: 'Sales', slug: 'sales' },
      { name: 'Lettings', slug: 'lettings' },
      { name: 'Property Management', slug: 'property-management' },
      { name: 'Block Management', slug: 'block-management' },
      { name: 'Auctions', slug: 'auctions' },
      { name: 'Commercial Property', slug: 'commercial-property' },
      { name: 'Inventory', slug: 'inventory' },
    ],
    pricingCallout: {
      free: 'Claim your verified profile and get listed in the TendorAI directory.',
      pro: 'We install AI-optimised structured data on your agency\u2019s website.',
    },
    faqs: [
      {
        question: 'How does TendorAI know about my agency?',
        answer:
          'We build your initial profile from public data \u2014 Companies House, Property Ombudsman membership, and your existing web presence. You then claim and enrich it with services, coverage areas, and fee details.',
      },
      {
        question: 'Which AI platforms will recommend my agency?',
        answer:
          'TendorAI structures your data for all major AI platforms \u2014 ChatGPT, Google Gemini, Claude, Perplexity, Microsoft Copilot, and Apple Intelligence. When any of these are asked for an estate agent, your enriched profile is in their data sources.',
      },
      {
        question: 'How is this different from Rightmove or Zoopla?',
        answer:
          'Property portals list your properties. TendorAI gets your agency recommended when someone asks AI \u201Cwho\u2019s the best estate agent in my area?\u201D Different question, different technology. Rightmove answers \u201Cwhat\u2019s for sale?\u201D \u2014 TendorAI answers \u201Cwho should I use?\u201D',
      },
      {
        question: 'Do I need to be a member of a professional body?',
        answer:
          'TendorAI works with all UK estate agencies. Membership of The Property Ombudsman, NAEA Propertymark, or ARLA strengthens your profile and gives AI platforms more confidence in recommending you.',
      },
      {
        question: 'Can I cancel at any time?',
        answer:
          'Yes. All paid plans are month-to-month with no contracts. Cancel from your dashboard at any time and keep access until the end of your billing period.',
      },
    ],
    meta: {
      title: 'AI Visibility for Estate Agents \u2014 Get Recommended by ChatGPT',
      description:
        'AI is how people find estate agents now. TendorAI structures your agency\u2019s data so ChatGPT, Claude, and Perplexity recommend you by name. Free verified profile. Plans from \u00A3299/month.',
    },
  },
};
