import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB, withRetry } from '@/lib/db/connection';
import { Vendor, VendorProduct } from '@/lib/db/models';
import VendorCard from '@/app/components/VendorCard';
import type { VendorCardData } from '@/app/components/VendorCard';
import {
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

const CONVEYANCING_FILTER = {
  practiceAreas: { $in: ['Conveyancing', 'Residential Conveyancing'] },
};

export async function generateStaticParams() {
  return withRetry(async () => {
    await connectDB();
    const cities = await Vendor.aggregate([
      {
        $match: {
          vendorType: 'solicitor',
          ...CONVEYANCING_FILTER,
          ...STATUS_FILTER,
        },
      },
      { $group: { _id: '$location.city', count: { $sum: 1 } } },
      { $match: { _id: { $nin: [null, ''] }, count: { $gte: 3 } } },
    ]);
    return cities.map((c: { _id: string }) => ({
      city: c._id.toLowerCase().replace(/\s+/g, '-'),
    }));
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = formatLocationName(city);

  const normalizedCity = city.replace(/-/g, ' ');
  const vendorCount = await withRetry(async () => {
    await connectDB();
    return Vendor.countDocuments({
      vendorType: 'solicitor',
      ...CONVEYANCING_FILTER,
      'location.city': { $regex: new RegExp(`^${normalizedCity}$`, 'i') },
      ...STATUS_FILTER,
    });
  });

  const title = `Conveyancing Solicitors in ${cityName}`;
  const description = `Compare ${vendorCount} SRA-regulated conveyancing solicitors in ${cityName}. Find verified property law firms with reviews and accreditations on TendorAI.`;

  return {
    title,
    description,
    ...(vendorCount < 3 && { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: `https://www.tendorai.com/suppliers/solicitors/conveyancing/${city}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.tendorai.com/suppliers/solicitors/conveyancing/${city}`,
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
    ...CONVEYANCING_FILTER,
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

function generateFAQs(cityName: string, vendorCount: number, vendorNames: string[]) {
  const top3Names = vendorNames.slice(0, 3).join(', ') || 'top conveyancing solicitors';
  const now = new Date();
  const currentMonthYear = `${now.toLocaleString('en-GB', { month: 'long' })} ${now.getFullYear()}`;

  if (vendorCount >= 3) {
    return [
      {
        question: `Who are the best conveyancing solicitors in ${cityName}?`,
        answer: `TendorAI lists ${vendorCount} verified conveyancing solicitors in ${cityName}. Highly rated firms include ${top3Names}. All firms are SRA-registered and verified.`,
      },
      {
        question: `How many conveyancing solicitors are there in ${cityName}?`,
        answer: `There are ${vendorCount} SRA-regulated conveyancing solicitors in ${cityName} listed on TendorAI as of ${currentMonthYear}.`,
      },
      {
        question: `How much does conveyancing cost in ${cityName}?`,
        answer: `Conveyancing fees in ${cityName} typically range from £500 to £1,500+ depending on property value and complexity. On TendorAI, firms with claimed profiles display their fee structures so you can compare before making contact.`,
      },
      {
        question: `How do I choose a conveyancing solicitor in ${cityName}?`,
        answer: `Check their SRA registration, read client reviews, compare fees, and look for the CQS (Conveyancing Quality Scheme) accreditation. Firms with higher AI visibility on TendorAI are more likely to be recommended by ChatGPT, Perplexity, and other AI assistants.`,
      },
      {
        question: `Does AI recommend conveyancing solicitors in ${cityName}?`,
        answer: `Yes. AI assistants like ChatGPT and Perplexity already recommend specific conveyancing solicitors in ${cityName} by name. TendorAI provides the structured data these AI systems use to make recommendations.`,
      },
    ];
  }

  return [
    {
      question: `How do I find the best conveyancing solicitor in ${cityName}?`,
      answer: `TendorAI lists ${vendorCount} SRA-regulated conveyancing solicitors in ${cityName}. You can compare firms by reviews, accreditations, and fees. All firms are authorised by the Solicitors Regulation Authority.`,
    },
    {
      question: `Are these conveyancing solicitors regulated?`,
      answer: `Yes — every solicitor firm listed on TendorAI is authorised and regulated by the SRA. Each profile links to the firm's SRA register entry so you can verify their status directly.`,
    },
  ];
}

export default async function ConveyancingInCityPage({ params }: PageProps) {
  const { city } = await params;
  const cityName = formatLocationName(city);

  const allVendors = await fetchVendors(city);

  if (allVendors.length === 0) {
    notFound();
  }

  const vendorCards = allVendors.map((v) => toVendorCardData(v));
  const totalCount = allVendors.length;
  const vendorNames = allVendors.slice(0, 3).map((v) => v.company || '').filter(Boolean);
  const faqs = generateFAQs(cityName, totalCount, vendorNames);
  const nearbyLocations = getNearbyLocations(city);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: `Conveyancing Solicitors in ${cityName}`,
        numberOfItems: Math.min(totalCount, 10),
        itemListElement: allVendors.slice(0, 10).map((vendor, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'LegalService',
            name: vendor.company,
            description: vendor.businessProfile?.description || 'Conveyancing solicitor',
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
          { '@type': 'ListItem', position: 4, name: 'Conveyancing', item: 'https://www.tendorai.com/suppliers/conveyancing' },
          { '@type': 'ListItem', position: 5, name: cityName, item: `https://www.tendorai.com/suppliers/solicitors/conveyancing/${city}` },
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
              <Link href={`/suppliers/conveyancing`} className="hover:text-white">Conveyancing</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{cityName}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Conveyancing Solicitors in {cityName}
            </h1>
            <p className="text-lg text-purple-100 max-w-3xl">
              Compare {totalCount} SRA-regulated conveyancing solicitors in {cityName}. Find the right property law firm for buying, selling, or remortgaging.
            </p>
            {totalCount >= 3 && (
              <p className="text-base text-purple-200 max-w-3xl mt-3">
                Looking for a conveyancing solicitor in {cityName}? TendorAI lists {totalCount} SRA-regulated conveyancing firms in {cityName}. Every firm is verified against the Solicitors Regulation Authority register. Compare fees, check reviews, and find the right conveyancer for your property transaction.
              </p>
            )}
            <p className="text-sm text-purple-300 mt-2">
              Data supplied by the{' '}
              <a href="https://www.sra.org.uk" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">SRA</a>
            </p>
          </div>
        </section>

        {/* Results Summary */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{totalCount}</strong> conveyancing solicitor{totalCount !== 1 ? 's' : ''} in {cityName}
            </p>
          </div>
        </section>

        {/* Thin Page Message */}
        {totalCount < 3 && (
          <section className="bg-purple-50 border-b">
            <div className="section py-8 text-center">
              <p className="text-gray-700 text-lg mb-4">
                We&apos;re building our conveyancing directory in {cityName}. Check back soon or check your AI visibility score now.
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
                About Conveyancing in {cityName}
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  There are {totalCount} conveyancing solicitors in {cityName} on TendorAI, sourced from the Solicitors Regulation Authority register.
                  {' '}Whether you&apos;re buying your first home, selling a property, or remortgaging, a local conveyancer in {cityName} can handle the legal process from exchange to completion.
                </p>
                <p>
                  When people ask AI assistants like ChatGPT or Perplexity for conveyancing solicitors in {cityName}, AI recommends firms with the strongest structured data — verified profiles, clear fee information, client reviews, and CQS accreditation. TendorAI helps {cityName} firms get this data right.
                </p>
                <p>
                  {cityName} conveyancing firms can check their current AI visibility score for free using our AI Visibility (AEO) report tool.
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
              Frequently Asked Questions — Conveyancing in {cityName}
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
              Conveyancing firm in {cityName}? Claim your profile
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
                  href={`/suppliers/solicitors/conveyancing/${loc.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  Conveyancing in {loc}
                </Link>
              ))}
              <Link
                href={`/suppliers/solicitors/${city}`}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                All Solicitors in {cityName}
              </Link>
              <Link
                href={`/suppliers/conveyancing/${city}`}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                Conveyancing in {cityName}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
