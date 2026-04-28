import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB, withRetry } from '@/lib/db/connection';
import { Vendor, VendorProduct } from '@/lib/db/models';
import VendorCard from '@/app/components/VendorCard';
import type { VendorCardData } from '@/app/components/VendorCard';
import {
  SERVICES,
  SOLICITOR_PRACTICE_AREA_MAP,
  formatLocationName,
  getNearbyLocations,
  getDisplayTier,
  calculatePriorityScore,
  canShowPricing,
} from '@/lib/constants';

interface PageProps {
  params: Promise<{ city: string }>;
}

export const revalidate = 3600;

const STATUS_FILTER = {
  $or: [
    { 'account.status': 'active', 'account.verificationStatus': 'verified' },
    { listingStatus: 'unclaimed' },
  ],
};

export async function generateStaticParams() {
  // ISR: generate on-demand to avoid build-time DB connection exhaustion
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatLocationName(city);

  const normalizedCity = city.replace(/-/g, ' ');
  const vendorCount = await withRetry(async () => {
    await connectDB();
    return Vendor.countDocuments({
      vendorType: 'solicitor',
      'location.city': { $regex: new RegExp(`^${normalizedCity}$`, 'i') },
      ...STATUS_FILTER,
    });
  });

  const title = `Solicitors in ${cityName}`;
  const description = `Compare ${vendorCount} SRA-regulated solicitors in ${cityName}. Find verified law firms with reviews, accreditations, and AI visibility scores on TendorAI.`;

  return {
    title,
    description,
    ...(vendorCount < 3 && { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: `https://www.tendorai.com/suppliers/solicitors/${city}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.tendorai.com/suppliers/solicitors/${city}`,
    },
  };
}

function toVendorCardData(v: Record<string, unknown>): VendorCardData {
  const vendor = v as {
    _id: string;
    company?: string;
    services?: string[];
    vendorType?: string;
    practiceAreas?: string[];
    sraNumber?: string;
    slug?: string;
    location?: { city?: string; region?: string; coverage?: string[]; postcode?: string };
    performance?: { rating?: number; reviewCount?: number };
    businessProfile?: { description?: string; yearsInBusiness?: number; accreditations?: string[] };
    brands?: string[];
    tier?: string;
    contactInfo?: { phone?: string; website?: string };
    listingStatus?: string;
    account?: { loginCount?: number };
    productCount: number;
  };

  const displayTier = getDisplayTier(vendor.tier);
  const hasPhone = !!vendor.contactInfo?.phone;
  const hasRating = (vendor.performance?.rating || 0) > 0;
  const isPaid = displayTier !== 'free';
  const ls = (vendor.listingStatus || 'unclaimed').toLowerCase();
  const isClaimed = ls === 'claimed' || ls === 'verified' || hasPhone || isPaid || hasRating || (vendor.account?.loginCount || 0) > 0;

  return {
    id: vendor._id,
    company: vendor.company || '',
    services: vendor.services || [],
    practiceAreas: vendor.practiceAreas || [],
    location: {
      city: vendor.location?.city,
      region: vendor.location?.region,
      coverage: vendor.location?.coverage || [],
      postcode: vendor.location?.postcode,
    },
    distance: null,
    rating: vendor.performance?.rating || 0,
    reviewCount: vendor.performance?.reviewCount || 0,
    tier: displayTier,
    description: vendor.businessProfile?.description,
    accreditations: vendor.businessProfile?.accreditations || [],
    yearsInBusiness: vendor.businessProfile?.yearsInBusiness,
    brands: vendor.brands || [],
    productCount: vendor.productCount || 0,
    website: vendor.contactInfo?.website,
    showPricing: canShowPricing(vendor.tier),
    accountClaimed: isClaimed,
    vendorType: vendor.vendorType,
    sraNumber: vendor.sraNumber,
    slug: vendor.slug,
  };
}

async function fetchVendors(city: string) {
  return withRetry(async () => {
  await connectDB();
  const normalizedCity = city.replace(/-/g, ' ');

  const vendors = await Vendor.find({
    vendorType: 'solicitor',
    'location.city': { $regex: new RegExp(`^${normalizedCity}$`, 'i') },
    ...STATUS_FILTER,
  })
    .select({
      company: 1, services: 1, location: 1, performance: 1, businessProfile: 1,
      brands: 1, tier: 1, contactInfo: 1, listingStatus: 1,
      'account.loginCount': 1, vendorType: 1, practiceAreas: 1, sraNumber: 1, slug: 1,
    })
    .lean()
    .exec();

  const vendorIds = vendors.map((v) => v._id);
  const productCounts = await VendorProduct.aggregate([
    { $match: { vendorId: { $in: vendorIds }, isActive: { $ne: false } } },
    { $group: { _id: '$vendorId', count: { $sum: 1 } } },
  ]);

  const productCountMap: Record<string, number> = {};
  productCounts.forEach((p: { _id: { toString(): string }; count: number }) => {
    productCountMap[p._id.toString()] = p.count;
  });

  return vendors
    .map((v) => ({
      ...v,
      _id: v._id.toString(),
      productCount: productCountMap[v._id.toString()] || 0,
      priorityScore: calculatePriorityScore({
        tier: v.tier, company: v.company, contactInfo: v.contactInfo, email: '',
        businessProfile: v.businessProfile, brands: v.brands, location: v.location,
        hasProducts: (productCountMap[v._id.toString()] || 0) > 0,
      }),
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
  });
}

function getTopPracticeAreas(vendors: { practiceAreas?: string[] }[], limit = 5): string[] {
  const counts: Record<string, number> = {};
  for (const v of vendors) {
    for (const pa of v.practiceAreas || []) {
      counts[pa] = (counts[pa] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([pa]) => pa);
}

const CARDIFF_FAQS = [
  {
    question: 'How many solicitors are there in Cardiff?',
    answer: 'There are 81 SRA-regulated solicitors in Cardiff listed on TendorAI as of April 2026, sourced directly from the Solicitors Regulation Authority register.',
  },
  {
    question: 'Who are the best solicitors in Cardiff?',
    answer: '"Best" depends on your case. For conveyancing, Cardiff has specialist firms like Ackland & Co, LGWP, and Rees Wood Terry. For family law, Wendy Hopkins Family Law Practice, Grant Stephens Family Law, and Alun Jones Family Law are dedicated boutiques. For commercial work, Hugh James, Geldards, Acuity Law, Berry Smith, and Darwin Gray are major Cardiff-headquartered practices. All 81 firms listed are SRA-verified.',
  },
  {
    question: 'Which Cardiff solicitors does ChatGPT recommend?',
    answer: 'As of April 2026, ChatGPT typically names DP Law Cardiff, Albany Solicitors, HCB Solicitors, Martyn Prowel Gartsides (MPG), Shanahans, and Redkite Solicitors when asked for the best solicitor in Cardiff. Robertsons, Howells, and CJCH are mentioned as alternatives. That’s nine firms out of 81 — the rest are absent from AI recommendations.',
  },
  {
    question: 'Why doesn’t ChatGPT mention my Cardiff firm?',
    answer: 'AI assistants don’t query the SRA register directly. They cite firms with strong structured data signals — schema markup, third-party citations, consistent online presence, and verified regulatory data presented in a machine-readable way. Most Cardiff firms have none of this in place. Run a free AI Visibility Report to see exactly where your firm scores.',
  },
  {
    question: 'How do I choose a solicitor in Cardiff?',
    answer: 'Three checks: verify SRA registration, confirm the firm specialises in your matter, and read recent client reviews. Fee transparency matters — firms with claimed TendorAI profiles publish fee structures upfront.',
  },
  {
    question: 'What does a solicitor in Cardiff cost?',
    answer: 'Fees vary by service and firm size. Cardiff conveyancing typically runs £700–£1,500 plus disbursements depending on property value. Family law and litigation are usually charged hourly, with rates from £180–£350+ at Cardiff firms. Specialist commercial work commands higher rates. Claimed profiles on TendorAI display current fee structures.',
  },
  {
    question: 'Does AI recommend solicitors in Cardiff?',
    answer: 'Yes. ChatGPT, Perplexity, Claude, and Google AI Overviews all name specific Cardiff firms when prompted. The pool of firms named is small — nine out of 81 in our April 2026 test. TendorAI is the UK’s leading AI visibility platform for regulated professional services and helps firms get recommended.',
  },
  {
    question: 'What is AI visibility and why should my Cardiff firm care?',
    answer: 'AI visibility (also called Answer Engine Optimisation or AEO) is the practice of structuring a firm’s web presence so AI assistants understand and cite it. As clients increasingly ask AI tools for solicitor recommendations before searching Google, firms invisible to AI lose enquiries to firms that aren’t.',
  },
];

const BRISTOL_FAQS = [
  {
    question: 'How many SRA-registered solicitors are there in Bristol?',
    answer: 'There are 85 SRA-registered solicitor firms in Bristol as of April 2026, sourced directly from the Solicitors Regulation Authority register. Firms range from sole practitioners to large multi-partner practices including Burges Salmon LLP, TLT LLP, and Bevan Brittan LLP.',
  },
  {
    question: 'How do I find a solicitor in Bristol using AI?',
    answer: 'AI assistants like ChatGPT, Perplexity, and Google AI recommend Bristol solicitors based on structured data — verified profiles, SRA registration, fee transparency, and client reviews. Firms with stronger structured data appear more often in AI answers. TendorAI provides this data layer for SRA-registered Bristol firms.',
  },
  {
    question: 'Why does AI not recommend my Bristol law firm?',
    answer: 'Around 91% of Bristol solicitors do not appear when ChatGPT or Perplexity is asked to recommend a firm. The reason is structured data: most firm websites lack LegalService schema, verified SRA numbers, and machine-readable fee information. Firms with this data in place are recommended by name; firms without it are passed over.',
  },
  {
    question: 'Is TendorAI a directory or a regulator?',
    answer: 'Neither. TendorAI is an AI visibility platform. Regulation is the role of the Solicitors Regulation Authority (SRA). TendorAI sources firm data from the SRA register, structures it for AI consumption, and lets firms claim and enrich their profiles so AI assistants recommend them by name.',
  },
  {
    question: 'How much does it cost to be listed on TendorAI?',
    answer: 'Free profiles are available to every SRA-registered firm in Bristol. The free profile includes verified SRA data and a basic public listing. The Pro tier is £299 per month and includes schema installation on the firm’s website, weekly AI visibility tracking across ChatGPT, Perplexity, Google AI, and Claude, and monthly reporting.',
  },
  {
    question: 'What are the most common solicitor specialisms in Bristol?',
    answer: 'Bristol’s 85 SRA-registered firms cover conveyancing, employment law, wills and probate, commercial law, family law, and immigration. Bristol also hosts the largest cluster of corporate firms outside London, including Burges Salmon LLP and TLT LLP.',
  },
  {
    question: 'How is Bristol different from other UK cities for legal services?',
    answer: 'Bristol is a regional hub for finance, tech, and professional services, which drives steady demand for commercial law and employment law alongside the active residential conveyancing market across Clifton, Redland, Bishopston, and Bedminster.',
  },
  {
    question: 'How current is the Bristol solicitor data on TendorAI?',
    answer: 'Profile data is sourced from the SRA register and cross-referenced against Companies House. AI visibility scores are generated from a standardised test of ten prompts run weekly across ChatGPT, Perplexity, Google AI, and Claude. Last updated 28 April 2026.',
  },
];

function generateFAQs(cityName: string, vendorCount: number, vendorNames: string[]) {
  const cityKey = cityName.toLowerCase();
  if (cityKey === 'cardiff') {
    return CARDIFF_FAQS;
  }
  if (cityKey === 'bristol') {
    return BRISTOL_FAQS;
  }

  const top3Names = vendorNames.slice(0, 3).join(', ') || 'top solicitors';
  const now = new Date();
  const currentMonthYear = `${now.toLocaleString('en-GB', { month: 'long' })} ${now.getFullYear()}`;

  if (vendorCount >= 3) {
    return [
      {
        question: `Who are the best solicitors in ${cityName}?`,
        answer: `TendorAI lists ${vendorCount} verified solicitors in ${cityName}. Highly rated firms include ${top3Names}. All firms are SRA-registered and verified.`,
      },
      {
        question: `How many solicitors are there in ${cityName}?`,
        answer: `There are ${vendorCount} SRA-regulated solicitors in ${cityName} listed on TendorAI as of ${currentMonthYear}.`,
      },
      {
        question: `How do I choose a solicitor in ${cityName}?`,
        answer: `Check their SRA registration status, read client reviews, compare fees and specialisms, and check their AI visibility score on TendorAI. Firms with higher AI visibility are more likely to be recommended by ChatGPT, Perplexity, and other AI assistants.`,
      },
      {
        question: `What does a solicitor in ${cityName} cost?`,
        answer: `Fees vary by firm and service type. On TendorAI, firms with claimed profiles display their fee structures so you can compare before making contact. Check individual firm profiles for current pricing.`,
      },
      {
        question: `Does AI recommend solicitors in ${cityName}?`,
        answer: `Yes. AI assistants like ChatGPT and Perplexity already recommend specific solicitors in ${cityName} by name. TendorAI provides the structured data these AI systems use to make recommendations. Firms with verified TendorAI profiles appear more frequently in AI answers.`,
      },
    ];
  }

  return [
    {
      question: `How do I find the best solicitor in ${cityName}?`,
      answer: `TendorAI lists ${vendorCount} SRA-regulated solicitors in ${cityName}. You can compare firms by reviews, accreditations, and practice areas. All firms are authorised by the Solicitors Regulation Authority.`,
    },
    {
      question: `Are these solicitors regulated?`,
      answer: `Yes — every solicitor firm listed on TendorAI is authorised and regulated by the SRA. Each profile links to the firm's SRA register entry so you can verify their status directly.`,
    },
  ];
}

export default async function SolicitorsInCityPage({ params }: PageProps) {
  const { city } = await params;
  const cityName = formatLocationName(city);
  const isCardiff = city.toLowerCase() === 'cardiff';
  const isBristol = city.toLowerCase() === 'bristol';

  const allVendors = await fetchVendors(city);

  if (allVendors.length === 0) {
    notFound();
  }

  const vendorCards = allVendors.map((v) => toVendorCardData(v));
  const totalCount = allVendors.length;
  const vendorNames = allVendors.slice(0, 3).map((v) => v.company || '').filter(Boolean);
  const topPracticeAreas = getTopPracticeAreas(allVendors);
  const faqs = generateFAQs(cityName, totalCount, vendorNames);
  const nearbyLocations = getNearbyLocations(city);

  // Practice area slugs for related searches
  const practiceAreaLinks = Object.entries(SOLICITOR_PRACTICE_AREA_MAP).slice(0, 6);

  const cardiffCollectionSchema = isCardiff ? [{
    '@type': 'CollectionPage',
    name: `Solicitors in ${cityName}`,
    description: `${totalCount} SRA-regulated solicitors in ${cityName}. Compare firms verified against the Solicitors Regulation Authority register and check which firms appear in ChatGPT, Perplexity, and Google AI recommendations.`,
    url: `https://www.tendorai.com/suppliers/solicitors/${city}`,
    about: {
      '@type': 'Service',
      name: 'Legal Services',
      areaServed: {
        '@type': 'City',
        name: cityName,
        addressRegion: 'Wales',
        addressCountry: 'GB',
      },
    },
    numberOfItems: totalCount,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
  }] : [];

  const bristolCollectionSchema = isBristol ? [{
    '@type': 'CollectionPage',
    name: 'Solicitors in Bristol',
    description: '85 SRA-regulated solicitors in Bristol. Compare firms verified against the Solicitors Regulation Authority register and check which firms appear in ChatGPT, Perplexity, and Google AI recommendations.',
    url: 'https://www.tendorai.com/suppliers/solicitors/bristol',
    about: {
      '@type': 'Service',
      name: 'Legal Services',
      areaServed: {
        '@type': 'City',
        name: 'Bristol',
        addressRegion: 'England',
        addressCountry: 'GB',
      },
    },
    numberOfItems: 85,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TendorAI',
      url: 'https://www.tendorai.com',
    },
  }] : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      ...cardiffCollectionSchema,
      ...bristolCollectionSchema,
      {
        '@type': 'ItemList',
        name: `Solicitors in ${cityName}`,
        numberOfItems: Math.min(totalCount, 10),
        itemListElement: allVendors.slice(0, 10).map((vendor, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'LegalService',
            name: vendor.company,
            description: vendor.businessProfile?.description || 'Solicitor firm',
            address: {
              '@type': 'PostalAddress',
              addressLocality: vendor.location?.city || cityName,
              addressCountry: 'GB',
            },
            ...(vendor.performance?.rating && vendor.performance?.reviewCount && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: vendor.performance.rating,
                reviewCount: vendor.performance.reviewCount,
                bestRating: 5,
                worstRating: 1,
              },
            }),
            url: vendor.slug
              ? `https://www.tendorai.com/suppliers/vendor/${vendor.slug}`
              : `https://www.tendorai.com/suppliers/profile/${vendor._id}`,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
          { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
          { '@type': 'ListItem', position: 3, name: 'Solicitors', item: 'https://www.tendorai.com/suppliers/solicitors' },
          { '@type': 'ListItem', position: 4, name: cityName, item: `https://www.tendorai.com/suppliers/solicitors/${city}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-brand-gradient text-white py-12">
          <div className="section">
            <nav className="text-sm mb-4 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/suppliers" className="hover:text-white">Suppliers</Link>
              <span className="mx-2">/</span>
              <Link href="/suppliers/solicitors" className="hover:text-white">Solicitors</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{cityName}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Solicitors in {cityName}
            </h1>
            <p className="text-lg text-purple-100 max-w-3xl">
              Compare {totalCount} SRA-regulated solicitors in {cityName}. Find the right law firm for your needs.
            </p>
            {totalCount >= 3 && (
              <p className="text-base text-purple-200 max-w-3xl mt-3">
                Looking for a solicitor in {cityName}? TendorAI lists {totalCount} SRA-regulated firms in {cityName}. Every firm is verified against the Solicitors Regulation Authority register. Compare services, check AI visibility scores, and find the right solicitor for your needs.
              </p>
            )}
            <p className="text-sm text-purple-300 mt-2">
              Data supplied by the{' '}
              <a href="https://www.sra.org.uk" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">SRA</a>
            </p>
          </div>
        </section>

        {/* Cardiff editorial intro */}
        {isCardiff && (
          <section className="bg-white py-12 border-b">
            <div className="section max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                SRA-Registered Solicitors in Cardiff (2026) — Who Appears in ChatGPT?
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  There are {totalCount} SRA-regulated solicitors in Cardiff, every one of them verified against the Solicitors Regulation Authority register. But if you ask ChatGPT &ldquo;who&rsquo;s the best solicitor in Cardiff?&rdquo; today, only a handful get named.
                </p>
                <p>We tested it. Here&rsquo;s what happened.</p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  What ChatGPT actually says about Cardiff solicitors
                </h3>
                <p>
                  When asked &ldquo;best solicitor in Cardiff&rdquo; on 27 April 2026, ChatGPT named six firms by default: DP Law Cardiff, Albany Solicitors, HCB Solicitors, Martyn Prowel Gartsides, Shanahans Solicitors, and Redkite Solicitors. It also flagged Robertsons, Howells, and CJCH as honourable mentions.
                </p>
                <p>
                  That&rsquo;s nine firms surfaced from a verified pool of {totalCount}. Roughly <strong>89% of Cardiff&rsquo;s SRA-registered solicitors get no AI mention at all</strong> when the most-used AI assistant in the UK is asked the most obvious question a potential client would ask.
                </p>
                <p>If your firm isn&rsquo;t one of those nine, you are — for AI search purposes — invisible.</p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  Why this matters now, not in two years
                </h3>
                <p>
                  UK consumer behaviour has shifted faster than most law firms have noticed. Clients increasingly ask ChatGPT, Google AI Overviews, Perplexity, and Claude for solicitor recommendations before they touch Google search. The Solicitors Regulation Authority&rsquo;s own register is publicly available, but AI assistants don&rsquo;t cite it directly when answering questions like &ldquo;who should I instruct for a Cardiff conveyance?&rdquo;
                </p>
                <p>
                  Instead, AI tools cite the firms with the strongest <strong>structured data signals</strong>: schema markup on the firm&rsquo;s own website, third-party verification, consistent NAP (name, address, phone) data across the web, and clear specialism descriptions that match the way real clients ask questions.
                </p>
                <p>
                  The nine Cardiff firms ChatGPT named aren&rsquo;t necessarily the best lawyers. They&rsquo;re the firms whose web presence is best understood by AI.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  Cardiff solicitors by specialism
                </h3>
                <p>
                  The {totalCount} SRA-regulated firms in Cardiff cover every major practice area, but the volume is concentrated in five:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Conveyancing &amp; residential property</strong> — the largest single category, including specialist conveyancers like Ackland &amp; Co, LGWP, and Rees Wood Terry
                  </li>
                  <li>
                    <strong>Wills &amp; probate</strong> — almost half of all Cardiff firms list this as a service
                  </li>
                  <li>
                    <strong>Family law</strong> — including dedicated boutiques like Wendy Hopkins Family Law Practice, Grant Stephens Family Law, and Alun Jones Family Law
                  </li>
                  <li>
                    <strong>Litigation &amp; dispute resolution</strong> — represented by full-service firms like Hugh James, Geldards, Acuity Law, and CJCH
                  </li>
                  <li>
                    <strong>Commercial property &amp; commercial law</strong> — Berry Smith, Darwin Gray, Capital Law, and Hek Jones being notable examples
                  </li>
                </ul>
                <p>
                  Smaller specialist categories include criminal defence (D J Murphy, De Maid, Pure Law, Savery &amp; Pennington), immigration (Albany, Tartan, Lex House), employment law, mental health, and IP &amp; technology.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  How AI picks which Cardiff solicitor to recommend
                </h3>
                <p>
                  There&rsquo;s no application form. ChatGPT doesn&rsquo;t have a directory you submit to. Instead, AI assistants assemble recommendations by reading the open web — and they trust three things above all:
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>Verified regulatory data.</strong> Firms whose SRA number, address, and authorisation status can be cross-referenced against authoritative sources are surfaced more often. The SRA register is the gold standard, but AI tools don&rsquo;t query it live; they cite intermediaries.
                  </li>
                  <li>
                    <strong>Schema markup on the firm&rsquo;s own website.</strong> <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">LegalService</code>, <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">LocalBusiness</code>, <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">FAQPage</code>, and <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">Person</code> schema (in JSON-LD format) tell AI crawlers exactly what the firm does, where it is, and who works there. Most Cardiff firms have none of this installed.
                  </li>
                  <li>
                    <strong>Independent third-party citations.</strong> Reviews on Google, mentions in trade press, profiles on regulatory or directory sites, and consistent NAP data across the web. The nine firms ChatGPT named all have stronger third-party footprints than the 72 it didn&rsquo;t.
                  </li>
                </ol>
                <p>
                  This isn&rsquo;t theoretical. TendorAI is itself independently ranked #1 in AI citations across ChatGPT, Google AI, and Perplexity for the AI visibility category — measured by Searchable.com in April 2026 — because we built our own platform using the exact same principles. We then apply them to client firms.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  What Cardiff firms can do this week
                </h3>
                <p>Three actions, in order of priority:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Run a free AEO report.</strong>{' '}
                    <Link href="/aeo-report" className="text-purple-700 underline hover:text-purple-900">
                      TendorAI&rsquo;s free AI Visibility Report
                    </Link>{' '}
                    shows your firm&rsquo;s current visibility score across the major AI assistants. Takes under two minutes. No card required.
                  </li>
                  <li>
                    <strong>Claim your TendorAI profile.</strong> Every Cardiff firm on the SRA register is already pre-listed below. Claiming is free and adds your firm to the structured data pool AI assistants read.
                  </li>
                  <li>
                    <strong>Get schema markup installed on your own website.</strong> This is what TendorAI Pro does for £299/month — we install the markup on the firm&rsquo;s own site, track citations weekly across ChatGPT, Perplexity, and Google AI, and report what&rsquo;s working.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  Compare all {totalCount} SRA-registered solicitors in Cardiff
                </h3>
                <p>
                  Below: the full directory of Cardiff solicitors verified against the SRA register. Firms with claimed profiles display fee structures, accreditations, and AI visibility scores. Unclaimed profiles can be claimed in under five minutes.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Bristol editorial intro */}
        {isBristol && (
          <section className="bg-white py-12 border-b">
            <div className="section max-w-4xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                SRA-Registered Solicitors in Bristol (2026) — Who Appears in ChatGPT?
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  Bristol has {totalCount} SRA-registered solicitor firms. When ChatGPT, Perplexity, or Google AI is asked to recommend a Bristol solicitor, roughly <strong>91% of these firms are not mentioned in any answer</strong>. This page shows why — and what the visible firms have in common.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  How people now find solicitors in Bristol
                </h3>
                <p>
                  The way people find a solicitor in Bristol has shifted. Google searches for &ldquo;solicitors Bristol&rdquo; still happen, but a rapidly growing share of legal enquiries now starts inside an AI assistant. A homeowner buying a flat in Clifton asks ChatGPT for a conveyancing solicitor. A small business owner in Temple Quay asks Perplexity for a commercial law firm. A professional facing dismissal asks Google AI for an employment solicitor.
                </p>
                <p>
                  None of those queries return a list of ten blue links. They return a short list of named firms with reasoning attached. The firms recommended are not the firms that pay the most for ads — they are the firms whose data the AI can read, verify, and trust.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  Bristol AI visibility — the numbers
                </h3>
                <p>
                  TendorAI tested ten standard prompts a Bristol-based client might use across ChatGPT, Perplexity, and Google AI in April 2026. The prompts covered conveyancing, employment law, wills and probate, family law, commercial law, and immigration — the six largest specialisms in Bristol by firm count.
                </p>
                <p>
                  Across all three platforms, a small group of firms appeared repeatedly. The remainder — approximately <strong>91% of Bristol&rsquo;s SRA-registered solicitors, around 77 firms</strong> — were not mentioned in any AI response. Many of those firms have strong reputations, long histories in Bristol, and active websites. None of that mattered. The AI could not read them.
                </p>
                <p>
                  The 7&ndash;9 visible firms shared three traits: claimed structured data on their websites (LegalService schema, verified SRA number, machine-readable specialisms), client reviews tied to verifiable identity, and clear fee information. The invisible firms had none of these in place. Reputation, history, and an attractive website were not enough — without machine-readable data, the AI had nothing to cite.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  Worked example — what AI visibility is worth in Bristol
                </h3>
                <div className="bg-gray-50 border-l-4 border-purple-600 p-6 rounded my-8">
                  <p className="mb-3">
                    Bristol has 85 SRA-registered solicitors. Around 91% — roughly 77 firms — do not appear when ChatGPT, Perplexity, or Google AI is asked to recommend a firm. That leaves a small group of 7&ndash;9 firms taking the entire share of voice on AI platforms in Bristol.
                  </p>
                  <p className="mb-3">
                    At an average conveyancing matter value of £1,400 in the Bristol area, and a conservative conversion rate of 2% on AI-driven enquiries, a Bristol firm appearing in AI responses for a single specialism could expect 2&ndash;4 additional matters per month. That is £2,800&ndash;£5,600 in additional monthly revenue from one specialism alone. TendorAI Pro is £299 per month — payback period under one matter.
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    These figures are illustrative. Actual results depend on firm size, specialism mix, and conversion process. Source: TendorAI April 2026 AI visibility audit, 85 Bristol SRA-registered firms.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  Bristol solicitors by specialism
                </h3>
                <p>
                  Based on TendorAI&rsquo;s analysis of SRA register data, Bristol&rsquo;s {totalCount} solicitor firms are concentrated in six specialisms:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Conveyancing &amp; residential property</strong> — driven by Bristol&rsquo;s active property market across Clifton, Redland, Bishopston, and Bedminster
                  </li>
                  <li>
                    <strong>Commercial law</strong> — Bristol hosts the largest cluster of corporate firms outside London, including Burges Salmon LLP, TLT LLP, and Bevan Brittan LLP
                  </li>
                  <li>
                    <strong>Employment law</strong> — Bristol&rsquo;s status as a regional hub for finance, tech, and professional services drives steady demand
                  </li>
                  <li>
                    <strong>Wills &amp; probate</strong> — long-established practices serving the wider Bristol and South Gloucestershire area
                  </li>
                  <li>
                    <strong>Family law</strong> — strong demand across divorce, children law, and financial settlements
                  </li>
                  <li>
                    <strong>Immigration</strong> — a smaller pool of specialist firms serving Bristol&rsquo;s diverse population
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  How AI picks which Bristol solicitor to recommend
                </h3>
                <p>
                  ChatGPT, Perplexity, Google AI, and Claude do not crawl the web the way classic Google search did. They rely on structured data — machine-readable facts an AI can verify and quote with confidence. For a solicitor firm, that data has four parts:
                </p>
                <ol className="list-decimal pl-6 space-y-3">
                  <li>
                    <strong>SRA verification.</strong> The firm&rsquo;s SRA number is published on the SRA register and matched against its website. AI uses this to confirm the firm is authorised to practise.
                  </li>
                  <li>
                    <strong>LegalService schema.</strong> Structured JSON-LD on the firm&rsquo;s website that names specialisms, fees, areas served, and contact details in a format AI can parse without ambiguity.
                  </li>
                  <li>
                    <strong>Reviews tied to verified identity.</strong> Reviews from named clients on platforms AI trusts, not anonymous testimonials on the firm&rsquo;s own homepage.
                  </li>
                  <li>
                    <strong>Specialism clarity.</strong> A firm that clearly advertises &ldquo;commercial property solicitor in Bristol&rdquo; is recommended for that query. A firm with a vague &ldquo;full-service&rdquo; positioning is not.
                  </li>
                </ol>
                <p>
                  TendorAI provides this data layer for SRA-registered Bristol firms. Free profiles start with verified SRA register data and basic specialism tags. The Pro tier — £299 per month — installs LegalService schema directly on the firm&rsquo;s own website, tracks weekly AI visibility across ChatGPT, Perplexity, Google AI, and Claude, and reports which prompts the firm appears for. Firms typically see citation lift within 4&ndash;6 weeks of schema installation.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  What Bristol firms can do this week
                </h3>
                <p>Three actions, in order of priority:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Run a free AEO report.</strong>{' '}
                    <Link href="/aeo-report" className="text-purple-700 underline hover:text-purple-900">
                      TendorAI&rsquo;s free AI Visibility Report
                    </Link>{' '}
                    shows your firm&rsquo;s current visibility score across the major AI assistants. Takes under two minutes. No card required.
                  </li>
                  <li>
                    <strong>Claim your TendorAI profile.</strong> Every Bristol firm on the SRA register is already pre-listed below. Claiming is free and adds your firm to the structured data pool AI assistants read.
                  </li>
                  <li>
                    <strong>Get schema markup installed on your own website.</strong> This is what TendorAI Pro does for £299/month — we install the markup on the firm&rsquo;s own site, track citations weekly across ChatGPT, Perplexity, Google AI, and Claude, and report what&rsquo;s working.
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
                  Compare all {totalCount} SRA-registered solicitors in Bristol
                </h3>
                <p>
                  Below: the full directory of Bristol solicitors verified against the SRA register. Firms with claimed profiles display fee structures, accreditations, and AI visibility scores. Unclaimed profiles can be claimed in under five minutes.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Results Summary */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{totalCount}</strong> solicitor{totalCount !== 1 ? 's' : ''} in {cityName}
            </p>
          </div>
        </section>

        {/* Thin Page Message */}
        {totalCount < 3 && (
          <section className="bg-purple-50 border-b">
            <div className="section py-8 text-center">
              <p className="text-gray-700 text-lg mb-4">
                We&apos;re building our solicitor directory in {cityName}. Check back soon or check your AI visibility score now.
              </p>
              <Link
                href="/aeo-report"
                className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Check Your AI Visibility — Free
              </Link>
            </div>
          </section>
        )}

        {/* Vendor List */}
        <section className="section py-8">
          <div className="space-y-4">
            {vendorCards.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </section>

        {/* About Section (3+ vendors) */}
        {totalCount >= 3 && (
          <section className="bg-white py-12 mt-8">
            <div className="section max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About Solicitors in {cityName}
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  There are {totalCount} solicitors in {cityName} on TendorAI, sourced from the Solicitors Regulation Authority register.
                  {topPracticeAreas.length > 0 && (
                    <> The most common specialisms in {cityName} are {topPracticeAreas.join(', ')}.</>
                  )}
                  {' '}Firms range from sole practitioners to large multi-partner practices.
                </p>
                <p>
                  When people ask AI assistants like ChatGPT or Perplexity for solicitors in {cityName}, AI recommends firms with the strongest structured data — verified profiles, clear fee information, client reviews, and regulatory accreditations. TendorAI helps {cityName} firms get this data right.
                </p>
                <p>
                  {cityName} firms can check their current AI visibility score for free using our AI Visibility (AEO) report tool.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/aeo-report"
                  className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Check Your AI Visibility — Free
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="bg-white py-12 mt-8">
          <div className="section max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions — Solicitors in {cityName}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vendor Acquisition CTA */}
        <section className="bg-purple-50 py-10" data-nosnippet>
          <div className="section text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Solicitor in {cityName}? Claim your profile
            </h2>
            <p className="text-gray-600 mb-4">
              Claim your free listing to add pricing, accreditations, and rank higher in AI recommendations.
            </p>
            <Link
              href="/vendor-signup"
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Claim Your Profile — Free
            </Link>
          </div>
        </section>

        {/* Related Searches */}
        <section className="bg-gray-100 py-8">
          <div className="section">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Related Searches</h3>
            <div className="flex flex-wrap gap-2">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc}
                  href={`/suppliers/solicitors/${loc.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  Solicitors in {loc}
                </Link>
              ))}
              {practiceAreaLinks.map(([slug, name]) => (
                <Link
                  key={slug}
                  href={`/suppliers/${slug}/${city}`}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  {name} in {cityName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
