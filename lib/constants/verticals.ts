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
      h1: 'AI Visibility for Solicitors',
      subtitle:
        '200M people now ask ChatGPT instead of Google when they need a solicitor. If your firm isn\u2019t in AI\u2019s data sources, you\u2019re invisible to these potential clients.',
      ctaText: 'Run Your Free AI Visibility Report',
    },
    problem: {
      heading: 'Your firm isn\u2019t showing up in AI recommendations',
      body: 'When someone asks ChatGPT \u201Cwho\u2019s the best conveyancing solicitor near me?\u201D or \u201Cfind me a family lawyer in [city]\u201D, AI doesn\u2019t Google you. It pulls from structured data \u2014 and most solicitor websites have none. The firms that do are getting recommended by name. Yours is being passed over.',
    },
    howItWorks: [
      {
        step: '1',
        title: 'We build your profile from SRA data',
        description:
          'Your firm gets a free profile built from Solicitors Regulation Authority records \u2014 SRA number, regulated individuals, practice areas, and contact details.',
      },
      {
        step: '2',
        title: 'You add specialisms and service areas',
        description:
          'Add your practice areas, fee arrangements, and the locations you serve. This is the structured data AI needs to recommend you with confidence.',
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
      { name: 'Residential Conveyancing', slug: 'conveyancing' },
      { name: 'Commercial Property', slug: 'commercial-property' },
      { name: 'Family Law', slug: 'family-law' },
      { name: 'Employment Law', slug: 'employment-law' },
      { name: 'Personal Injury', slug: 'personal-injury' },
      { name: 'Wills and Probate', slug: 'wills-and-probate' },
      { name: 'Immigration', slug: 'immigration' },
      { name: 'Criminal Defence', slug: 'criminal-law' },
      { name: 'Dispute Resolution', slug: 'dispute-resolution' },
      { name: 'Corporate and Commercial', slug: 'commercial-law' },
    ],
    pricingCallout: {
      free: 'Claim your SRA-verified profile and get listed in the TendorAI directory.',
      pro: 'We install AI-optimised structured data on your firm\u2019s website.',
    },
    faqs: [
      {
        question: 'How does TendorAI know about my firm?',
        answer:
          'We build your initial profile from public SRA (Solicitors Regulation Authority) data \u2014 your SRA number, regulated individuals, practice areas, and registered office. You then claim and enrich it with specialisms and fee details.',
      },
      {
        question: 'Do I need to be SRA-regulated?',
        answer:
          'TendorAI is built for SRA-regulated solicitor firms in England and Wales. Your SRA registration is used to verify your profile and give AI platforms confidence in recommending you.',
      },
      {
        question: 'Which AI platforms will recommend my firm?',
        answer:
          'TendorAI structures your data for ChatGPT, Google Gemini, Claude, Perplexity, Microsoft Copilot, and Apple Intelligence.',
      },
      {
        question: 'How is this different from Legal 500 or Chambers listings?',
        answer:
          'Legal directories build reputation rankings. TendorAI makes AI recommend you directly when someone asks for a solicitor \u2014 not when a researcher is compiling a directory. Different mechanism, different outcome.',
      },
      {
        question: 'Is there a minimum term?',
        answer:
          'The managed programme runs on an initial three-month term. After that it continues until you tell us to stop.',
      },
    ],
    meta: {
      title: 'AI Visibility for Solicitors \u2014 Get Recommended by ChatGPT',
      description:
        'AI is how people find solicitors now. TendorAI structures your firm\u2019s data so ChatGPT, Claude, and Perplexity recommend you by name. Free SRA-verified profile. The managed programme is \u00A31,499 per month.',
    },
  },

  accountants: {
    slug: 'ai-visibility-for-accountants',
    name: 'Accountants',
    nameSingular: 'accountant',
    regulatoryBody: 'ICAEW/ACCA',
    hero: {
      badge: '12,000+ businesses already listed',
      h1: 'AI Visibility for Accountants',
      subtitle:
        '200M people now ask ChatGPT instead of Google when they need an accountant. If your practice isn\u2019t in AI\u2019s data sources, you\u2019re invisible to these potential clients.',
      ctaText: 'Run Your Free AI Visibility Report',
    },
    problem: {
      heading: 'Your practice isn\u2019t showing up in AI recommendations',
      body: 'When a business owner asks ChatGPT \u201Cwho\u2019s the best accountant for a small business near me?\u201D or \u201Cfind me a chartered accountant in [city]\u201D, AI doesn\u2019t Google you. It pulls from structured data \u2014 and most accountancy practices have none. The practices that do are getting recommended by name. Yours is being passed over.',
    },
    howItWorks: [
      {
        step: '1',
        title: 'We build your profile from ICAEW or ACCA data',
        description:
          'Your practice gets a free profile built from official register records \u2014 membership number, practice certificate status, regulated activities, and contact details.',
      },
      {
        step: '2',
        title: 'You add specialisms and service areas',
        description:
          'Add your areas of expertise, fee structure, and the client types you serve. This is the structured data AI needs to recommend you with confidence.',
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
      { name: 'Self Assessment and Personal Tax', slug: 'tax-advisory' },
      { name: 'Management Accounts', slug: 'management-accounts' },
      { name: 'VAT Returns', slug: 'vat-services' },
      { name: 'Payroll', slug: 'payroll' },
      { name: 'R&D Tax Credits', slug: 'rd-tax-credits' },
      { name: 'Corporate Tax', slug: 'corporate-tax' },
      { name: 'Business Advisory', slug: 'business-advisory' },
      { name: 'Bookkeeping', slug: 'bookkeeping' },
      { name: 'Audit and Assurance', slug: 'audit-assurance' },
      { name: 'Forensic Accounting', slug: 'forensic-accounting' },
    ],
    pricingCallout: {
      free: 'Claim your verified profile and get listed in the TendorAI directory.',
      pro: 'We install AI-optimised structured data on your practice\u2019s website.',
    },
    faqs: [
      {
        question: 'How does TendorAI know about my practice?',
        answer:
          'We build your initial profile from ICAEW, ACCA, or CIMA register data \u2014 your membership number, practice certificate, and regulated activities. You then claim and enrich it with specialisms and client type details.',
      },
      {
        question: 'Do I need to be ICAEW or ACCA qualified?',
        answer:
          'TendorAI works for practices with ICAEW, ACCA, CIMA, or AAT membership. Your professional registration is used to verify your profile. Unqualified bookkeepers can also create a profile but won\u2019t have the verified badge.',
      },
      {
        question: 'Which AI platforms will recommend my practice?',
        answer:
          'TendorAI structures your data for ChatGPT, Google Gemini, Claude, Perplexity, Microsoft Copilot, and Apple Intelligence.',
      },
      {
        question: 'How is this different from listing on accounting directories?',
        answer:
          'Directories list you. TendorAI makes AI recommend you directly when a business owner asks for an accountant \u2014 with your specific specialisms matched to their specific query. Different mechanism, more precise outcome.',
      },
      {
        question: 'Is there a minimum term?',
        answer:
          'The managed programme runs on an initial three-month term, then continues until you tell us to stop.',
      },
    ],
    meta: {
      title: 'AI Visibility for Accountants \u2014 Get Recommended by ChatGPT',
      description:
        'AI is how people find accountants now. TendorAI structures your practice\u2019s data so ChatGPT, Claude, and Perplexity recommend you by name. Free verified profile. The managed programme is \u00A31,499 per month.',
    },
  },

  'mortgage-advisors': {
    slug: 'ai-visibility-for-mortgage-advisors',
    name: 'Mortgage Advisors',
    nameSingular: 'mortgage advisor',
    regulatoryBody: 'FCA',
    hero: {
      badge: '12,000+ businesses already listed',
      h1: 'AI Visibility for Mortgage Advisors',
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
        question: 'Is there a minimum term?',
        answer:
          'The managed programme runs on an initial three-month term. After that it continues until you tell us to stop.',
      },
    ],
    meta: {
      title: 'AI Visibility for Mortgage Advisors \u2014 Get Recommended by ChatGPT',
      description:
        'AI is how people find mortgage advisors now. TendorAI structures your firm\u2019s data so ChatGPT, Claude, and Perplexity recommend you by name. Free FCA-verified profile. The managed programme is \u00A31,499 per month.',
    },
  },

  'estate-agents': {
    slug: 'ai-visibility-for-estate-agents',
    name: 'Estate Agents',
    nameSingular: 'estate agent',
    regulatoryBody: 'NAEA Propertymark',
    hero: {
      badge: '12,000+ businesses already listed',
      h1: 'AI Visibility for Estate Agents',
      subtitle:
        '200M people now ask ChatGPT instead of Google when they need an estate agent. If your agency isn\u2019t in AI\u2019s data sources, you\u2019re invisible to these potential clients.',
      ctaText: 'Run Your Free AI Visibility Report',
    },
    problem: {
      heading: 'Your agency isn\u2019t showing up in AI recommendations',
      body: 'When a buyer or vendor asks ChatGPT \u201Cwho\u2019s the best estate agent in [area]?\u201D or \u201Cfind me an estate agent specialising in period properties near me\u201D, AI doesn\u2019t Google you. It pulls from structured data \u2014 and most estate agency websites have none. The agencies that do are getting recommended by name. Yours is being passed over.',
    },
    howItWorks: [
      {
        step: '1',
        title: 'We build your profile from your business data',
        description:
          'Your agency gets a free profile covering your trading name, registered address, coverage areas, and services. Unlike regulated professions, estate agents don\u2019t have a central register \u2014 so we build your profile directly from the details you provide and verify against Companies House.',
      },
      {
        step: '2',
        title: 'You add your coverage areas and specialisms',
        description:
          'Add the areas you cover, property types you specialise in, and your fee structure. This is the structured data AI needs to recommend you for the right queries.',
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
      { name: 'Residential Sales', slug: 'residential-sales' },
      { name: 'Lettings and Property Management', slug: 'lettings' },
      { name: 'Buy-to-Let', slug: 'buy-to-let' },
      { name: 'New Build Sales', slug: 'new-build-sales' },
      { name: 'Commercial Property', slug: 'commercial-property' },
      { name: 'Land and Development', slug: 'land-development' },
      { name: 'Auctions', slug: 'auctions' },
      { name: 'Valuations', slug: 'valuations' },
      { name: 'Help to Buy', slug: 'help-to-buy' },
      { name: 'Overseas Property', slug: 'overseas-property' },
    ],
    pricingCallout: {
      free: 'Claim your verified profile and get listed in the TendorAI directory.',
      pro: 'We install AI-optimised structured data on your agency\u2019s website.',
    },
    faqs: [
      {
        question: 'How does TendorAI know about my agency?',
        answer:
          'Unlike regulated professions, estate agents don\u2019t have a mandatory central register. We build your profile from the details you provide and verify your business against Companies House. You control your profile data entirely.',
      },
      {
        question: 'Do I need to be NAEA or ARLA registered?',
        answer:
          'No. TendorAI works for all UK estate agents regardless of professional membership. If you are NAEA Propertymark or ARLA registered, we include that as an additional trust signal in your profile.',
      },
      {
        question: 'Which AI platforms will recommend my agency?',
        answer:
          'TendorAI structures your data for ChatGPT, Google Gemini, Claude, Perplexity, Microsoft Copilot, and Apple Intelligence.',
      },
      {
        question: 'How is this different from Rightmove or Zoopla?',
        answer:
          'Rightmove and Zoopla list your properties. TendorAI makes AI recommend your agency directly when someone asks for an estate agent \u2014 before they\u2019ve even started browsing listings. Different stage of the buyer journey, different outcome.',
      },
      {
        question: 'Is there a minimum term?',
        answer:
          'The managed programme runs on an initial three-month term, then continues until you tell us to stop.',
      },
    ],
    meta: {
      title: 'AI Visibility for Estate Agents \u2014 Get Recommended by ChatGPT',
      description:
        'AI is how people find estate agents now. TendorAI structures your agency\u2019s data so ChatGPT, Claude, and Perplexity recommend you by name. Free verified profile. The managed programme is \u00A31,499 per month.',
    },
  },
};
