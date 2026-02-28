import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB, withRetry } from '@/lib/db/connection';
import { Vendor, VendorProduct } from '@/lib/db/models';
import VendorCard from '@/app/components/VendorCard';
import type { VendorCardData } from '@/app/components/VendorCard';
import {
  SERVICES,
  formatLocationName,
  getNearbyLocations,
  getDisplayTier,
  calculatePriorityScore,
  canShowPricing,
  isSolicitorCategory,
  isAccountantCategory,
  isMortgageAdvisorCategory,
  isEstateAgentCategory,
  getPracticeAreaFromSlug,
  getAccountantServiceArea,
  getMortgageServiceArea,
  getEstateAgentServiceArea,
  getServiceFromSlug,
} from '@/lib/constants';
import { LocationContent } from '@/lib/db/models/LocationContent';

interface PageProps {
  params: Promise<{ category: string; location: string }>;
}

export const revalidate = 3600;

function getVerticalInfo(category: string) {
  const service = SERVICES[category as keyof typeof SERVICES];
  if (!service) return { regulatoryBody: null, regulatoryAbbr: null, profession: 'supplier' };
  if (service.group === 'solicitor') return { regulatoryBody: 'Solicitors Regulation Authority', regulatoryAbbr: 'SRA', profession: 'solicitor' };
  if (service.group === 'accountant') return { regulatoryBody: 'Institute of Chartered Accountants', regulatoryAbbr: 'ICAEW', profession: 'accountant' };
  if (isMortgageAdvisorCategory(category)) return { regulatoryBody: 'Financial Conduct Authority', regulatoryAbbr: 'FCA', profession: 'mortgage advisor' };
  if (isEstateAgentCategory(category)) return { regulatoryBody: 'Propertymark', regulatoryAbbr: 'Propertymark', profession: 'agent' };
  return { regulatoryBody: null, regulatoryAbbr: null, profession: 'supplier' };
}

function getTopPracticeAreas(vendors: { practiceAreas?: string[] }[], limit = 3): string[] {
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, location } = await params;
  const service = SERVICES[category as keyof typeof SERVICES];
  const locationName = formatLocationName(location);

  if (!service) {
    return { title: 'Not Found' };
  }

  const isSolicitor = service.group === 'solicitor';
  const isAccountant = service.group === 'accountant';
  const isMortgageAdvisor = isMortgageAdvisorCategory(category);
  const isEstateAgent = isEstateAgentCategory(category);
  const suffix = isSolicitor ? 'Solicitors' : isAccountant ? 'Accountants' : isMortgageAdvisor ? 'Mortgage Advisors' : isEstateAgent ? 'Estate Agents' : 'Suppliers';
  const title = `${service.name} ${suffix} in ${locationName} | TendorAI`;
  const description = isSolicitor
    ? `Compare verified ${service.name.toLowerCase()} solicitors in ${locationName}. SRA-regulated firms with reviews and accreditations on TendorAI.`
    : isAccountant
      ? `Compare verified ${service.name.toLowerCase()} accountants in ${locationName}. ICAEW-regulated firms with reviews and accreditations on TendorAI.`
      : isMortgageAdvisor
        ? `Find FCA-authorised ${service.name.toLowerCase()} mortgage advisors in ${locationName}. Compare fees, lender panels and reviews on TendorAI.`
        : isEstateAgent
          ? `Find Propertymark-registered ${service.name.toLowerCase()} estate agents in ${locationName}. Compare fees, coverage and reviews on TendorAI.`
          : `Find trusted ${service.name.toLowerCase()} suppliers in ${locationName}. Compare vendors, read reviews, and get instant quotes. Free service for UK businesses.`;

  // Noindex thin pages with fewer than 3 results
  const vendorCount = await withRetry(async () => {
    await connectDB();
    const normalizedLoc = location.replace(/-/g, ' ');
    const isProfessional = isSolicitor || isAccountant || isMortgageAdvisor || isEstateAgent;

    let categoryFilter;
    if (isSolicitor) {
      const practiceArea = getPracticeAreaFromSlug(category);
      categoryFilter = practiceArea ? { vendorType: 'solicitor', practiceAreas: practiceArea } : {};
    } else if (isAccountant) {
      categoryFilter = { vendorType: 'accountant' };
    } else if (isMortgageAdvisor) {
      const serviceArea = getMortgageServiceArea(category);
      categoryFilter = { vendorType: 'mortgage-advisor', ...(serviceArea && { practiceAreas: serviceArea }) };
    } else if (isEstateAgent) {
      const serviceArea = getEstateAgentServiceArea(category);
      categoryFilter = { vendorType: 'estate-agent', ...(serviceArea && { practiceAreas: serviceArea }) };
    } else {
      const serviceName = getServiceFromSlug(category);
      categoryFilter = serviceName ? { services: serviceName } : {};
    }

    const locationFilter = isProfessional
      ? { 'location.city': { $regex: new RegExp(`^${normalizedLoc}$`, 'i') } }
      : {
          $or: [
            { 'location.coverage': { $regex: new RegExp(normalizedLoc, 'i') } },
            { 'location.city': { $regex: new RegExp(normalizedLoc, 'i') } },
            { 'location.region': { $regex: new RegExp(normalizedLoc, 'i') } },
            { postcodeAreas: { $regex: new RegExp(normalizedLoc.substring(0, 2), 'i') } },
          ],
        };

    return await Vendor.countDocuments({
      $and: [
        { $or: [{ 'account.status': 'active', 'account.verificationStatus': 'verified' }, { listingStatus: 'unclaimed' }] },
        categoryFilter,
        locationFilter,
      ],
    });
  });

  return {
    title,
    description,
    ...(vendorCount < 3 && { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: `https://www.tendorai.com/suppliers/${category}/${location}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.tendorai.com/suppliers/${category}/${location}`,
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
    icaewFirmNumber?: string;
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
  const hasPhone = !!(vendor.contactInfo?.phone);
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
    icaewFirmNumber: vendor.icaewFirmNumber,
    slug: vendor.slug,
  };
}

async function fetchVendors(category: string, location: string) {
  return withRetry(async () => {
    await connectDB();

    const isSolicitor = isSolicitorCategory(category);
    const isAccountant = isAccountantCategory(category);
    const isMortgageAdvisor = isMortgageAdvisorCategory(category);
    const isEstateAgent = isEstateAgentCategory(category);
    const normalizedLocation = location.replace(/-/g, ' ');

    let categoryFilter;
    if (isSolicitor) {
      const practiceArea = getPracticeAreaFromSlug(category);
      if (!practiceArea) return [];
      categoryFilter = { vendorType: 'solicitor', practiceAreas: practiceArea };
    } else if (isAccountant) {
      // practiceAreas not populated yet for accountants — show all accountant vendors
      categoryFilter = { vendorType: 'accountant' };
    } else if (isMortgageAdvisor) {
      const serviceArea = getMortgageServiceArea(category);
      categoryFilter = { vendorType: 'mortgage-advisor', ...(serviceArea && { practiceAreas: serviceArea }) };
    } else if (isEstateAgent) {
      const serviceArea = getEstateAgentServiceArea(category);
      categoryFilter = { vendorType: 'estate-agent', ...(serviceArea && { practiceAreas: serviceArea }) };
    } else {
      const serviceName = getServiceFromSlug(category);
      if (!serviceName) return [];
      categoryFilter = { services: serviceName };
    }

    const isProfessional = isSolicitor || isAccountant || isMortgageAdvisor || isEstateAgent;
    const locationFilter = isProfessional
      ? { 'location.city': { $regex: new RegExp(`^${normalizedLocation}$`, 'i') } }
      : {
          $or: [
            { 'location.coverage': { $regex: new RegExp(normalizedLocation, 'i') } },
            { 'location.city': { $regex: new RegExp(normalizedLocation, 'i') } },
            { 'location.region': { $regex: new RegExp(normalizedLocation, 'i') } },
            { postcodeAreas: { $regex: new RegExp(normalizedLocation.substring(0, 2), 'i') } },
          ],
        };

    const query = {
      $and: [
        {
          $or: [
            { 'account.status': 'active', 'account.verificationStatus': 'verified' },
            { listingStatus: 'unclaimed' },
          ],
        },
        categoryFilter,
        locationFilter,
      ],
    };

    const vendors = await Vendor.find(query)
      .select({
        company: 1, services: 1, location: 1, performance: 1, businessProfile: 1,
        brands: 1, tier: 1, contactInfo: 1, showPricing: 1, listingStatus: 1,
        'account.loginCount': 1, vendorType: 1, practiceAreas: 1, sraNumber: 1, icaewFirmNumber: 1, slug: 1,
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

export default async function CategoryLocationPage({ params }: PageProps) {
  const { category, location } = await params;
  const service = SERVICES[category as keyof typeof SERVICES];
  const locationName = formatLocationName(location);

  if (!service) {
    notFound();
  }

  const isSolicitor = service.group === 'solicitor';
  const isAccountant = service.group === 'accountant';
  const isMortgageAdvisor = isMortgageAdvisorCategory(category);
  const isEstateAgent = isEstateAgentCategory(category);
  const isProfessional = isSolicitor || isAccountant || isMortgageAdvisor || isEstateAgent;
  const suffix = isSolicitor ? 'Solicitors' : isAccountant ? 'Accountants' : isMortgageAdvisor ? 'Mortgage Advisors' : isEstateAgent ? 'Estate Agents' : 'Suppliers';

  const [allVendors, locationContent] = await Promise.all([
    fetchVendors(category, location),
    LocationContent.findOne({ category, location: locationName }).select('content').lean().catch(() => null) as Promise<{ content: string } | null>,
  ]);

  const localVendors = allVendors.filter((v) => {
    const city = (v.location?.city || '').toLowerCase().trim();
    return city !== 'uk' && city !== 'united kingdom' && city !== 'nationwide' && city !== '';
  });
  const nationalVendors = allVendors.filter((v) => {
    const city = (v.location?.city || '').toLowerCase().trim();
    return city === 'uk' || city === 'united kingdom' || city === 'nationwide' || city === '';
  });

  const localCards = localVendors.map((v) => toVendorCardData(v));
  const nationalCards = nationalVendors.map((v) => toVendorCardData(v));
  const totalCount = localVendors.length + nationalVendors.length;

  const vendorNames = allVendors.slice(0, 3).map((v) => v.company || '').filter(Boolean);
  const vertical = getVerticalInfo(category);
  const topPracticeAreas = getTopPracticeAreas(allVendors);
  const faqs = generateFAQs(service.name, locationName, totalCount, category, isSolicitor, isAccountant, isMortgageAdvisor, isEstateAgent, vendorNames);

  const schemaType = isSolicitor ? 'LegalService' : isAccountant ? 'AccountingService' : isMortgageAdvisor ? 'FinancialService' : isEstateAgent ? 'RealEstateAgent' : 'Service';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: `${service.name} ${suffix} in ${locationName}`,
        numberOfItems: Math.min(totalCount, 10),
        itemListElement: allVendors.slice(0, 10).map((vendor, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': isSolicitor ? 'LegalService' : isAccountant ? 'AccountingService' : isMortgageAdvisor ? 'FinancialService' : isEstateAgent ? 'RealEstateAgent' : 'LocalBusiness',
            name: vendor.company,
            description: vendor.businessProfile?.description || `${service.name} ${suffix.toLowerCase()}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: vendor.location?.city || locationName,
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
          { '@type': 'ListItem', position: 3, name: `${service.name} ${suffix}`, item: `https://www.tendorai.com/suppliers/${category}` },
          { '@type': 'ListItem', position: 4, name: locationName, item: `https://www.tendorai.com/suppliers/${category}/${location}` },
        ],
      },
      {
        '@type': schemaType,
        name: `${service.name} ${suffix} in ${locationName}`,
        areaServed: {
          '@type': 'City',
          name: locationName,
          containedInPlace: { '@type': 'Country', name: 'United Kingdom' },
        },
        url: `https://www.tendorai.com/suppliers/${category}/${location}`,
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

  const nearbyLocations = getNearbyLocations(location);
  const relatedCategories = Object.values(SERVICES)
    .filter((s) => s.slug !== category && s.group === service.group)
    .slice(0, 3);

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
              <Link href={`/suppliers/${category}`} className="hover:text-white">{service.name}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{locationName}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {service.name} {suffix} in {locationName}
            </h1>
            <p className="text-lg text-purple-100 max-w-3xl">
              {isSolicitor
                ? `Compare ${totalCount} SRA-regulated ${service.name.toLowerCase()} solicitors in ${locationName}.`
                : isAccountant
                  ? `Compare ${totalCount} ICAEW-regulated ${service.name.toLowerCase()} accountants in ${locationName}.`
                  : isMortgageAdvisor
                    ? `Compare ${totalCount} FCA-authorised ${service.name.toLowerCase()} mortgage advisors in ${locationName}.`
                    : isEstateAgent
                      ? `Compare ${totalCount} ${service.name.toLowerCase()} estate agents in ${locationName}.`
                      : `Compare ${totalCount} ${service.name.toLowerCase()} suppliers serving ${locationName}. Get instant quotes from local businesses.`}
            </p>
            {totalCount >= 3 && (
              <p className="text-base text-purple-200 max-w-3xl mt-3">
                {vertical.regulatoryAbbr
                  ? `Looking for ${service.name.toLowerCase()} in ${locationName}? TendorAI lists ${totalCount} ${vertical.regulatoryAbbr}-regulated firms in ${locationName}. Every firm is verified against the ${vertical.regulatoryBody} register. Compare services, check AI visibility scores, and find the right ${vertical.profession} for your needs.`
                  : `Looking for ${service.name.toLowerCase()} in ${locationName}? TendorAI lists ${totalCount} verified suppliers in ${locationName}. Compare services, check AI visibility scores, and find the right ${vertical.profession} for your needs.`}
              </p>
            )}
            {isSolicitor && (
              <p className="text-sm text-purple-300 mt-2">
                Data supplied by the{' '}
                <a href="https://www.sra.org.uk" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">SRA</a>
              </p>
            )}
            {isAccountant && (
              <p className="text-sm text-purple-300 mt-2">
                Data supplied by the{' '}
                <a href="https://www.icaew.com" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">ICAEW</a>
              </p>
            )}
            {isMortgageAdvisor && (
              <p className="text-sm text-purple-300 mt-2">
                Data supplied by the{' '}
                <a href="https://www.fca.org.uk" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">FCA</a>
              </p>
            )}
            {isEstateAgent && (
              <p className="text-sm text-purple-300 mt-2">
                Data supplied by{' '}
                <a href="https://www.propertymark.co.uk" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">Propertymark</a>
              </p>
            )}
          </div>
        </section>

        {/* Results Summary */}
        <section className="bg-white border-b">
          <div className="section py-4">
            <p className="text-gray-600">
              <strong className="text-gray-900">{localVendors.length}</strong> local {suffix.toLowerCase()}
              {nationalVendors.length > 0 && (
                <span> and <strong className="text-gray-900">{nationalVendors.length}</strong> national</span>
              )}
            </p>
          </div>
        </section>

        {/* Thin Page Message */}
        {totalCount < 3 && (
          <section className="bg-purple-50 border-b">
            <div className="section py-8 text-center">
              <p className="text-gray-700 text-lg mb-4">
                We&apos;re building our {service.name.toLowerCase()} directory in {locationName}. Check back soon or check your AI visibility score now.
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

        {/* Location Guide Content */}
        {locationContent?.content && (
          <section className="bg-white border-b">
            <div className="section py-8 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {service.name} in {locationName} — Buyer&apos;s Guide
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                {(locationContent.content as string).split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Vendor List */}
        <section className="section py-8">
          {totalCount > 0 ? (
            <>
              {localCards.length > 0 && (
                <div className="mb-8">
                  {nationalCards.length > 0 && (
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Local {suffix}</h2>
                  )}
                  <div className="space-y-4">
                    {localCards.map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                  </div>
                </div>
              )}

              {nationalCards.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">National {suffix}</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    These {suffix.toLowerCase()} operate nationwide and may serve {locationName}.
                  </p>
                  <div className="space-y-4">
                    {nationalCards.map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState service={service.name} location={locationName} category={category} isSolicitor={isSolicitor} isAccountant={isAccountant} isMortgageAdvisor={isMortgageAdvisor} isEstateAgent={isEstateAgent} />
          )}
        </section>

        {/* About Section (3+ vendors) */}
        {totalCount >= 3 && (
          <section className="bg-white py-12 mt-8">
            <div className="section max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About {service.name} in {locationName}
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  There are {totalCount} {service.name.toLowerCase()} {suffix.toLowerCase()} in {locationName} on TendorAI
                  {vertical.regulatoryAbbr ? `, sourced from the ${vertical.regulatoryBody} register` : ''}.
                  {topPracticeAreas.length > 0 && (
                    <> The most common specialisms in {locationName} are {topPracticeAreas.join(', ')}.</>
                  )}
                  {' '}Firms range from sole practitioners to large multi-partner practices.
                </p>
                <p>
                  When people ask AI assistants like ChatGPT or Perplexity for {service.name.toLowerCase()} {suffix.toLowerCase()} in {locationName}, AI recommends firms with the strongest structured data — verified profiles, clear fee information, client reviews, and regulatory accreditations. TendorAI helps {locationName} firms get this data right.
                </p>
                <p>
                  {locationName} firms can check their current AI visibility score for free using our AI Visibility (AEO) report tool.
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
              Frequently Asked Questions — {service.name} in {locationName}
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
              {isProfessional ? `${service.name} firm in ${locationName}? Claim your profile` : `${service.name} Supplier in ${locationName}? Get Listed`}
            </h2>
            <p className="text-gray-600 mb-4">
              {isProfessional
                ? `Claim your free listing to add pricing, accreditations, and rank higher in AI recommendations.`
                : `Join ${totalCount > 0 ? `${totalCount}+ ` : ''}other ${service.name.toLowerCase()} suppliers on TendorAI.`}
            </p>
            <Link
              href={isProfessional ? '/vendor-signup' : '/for-vendors'}
              className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isProfessional ? 'Claim Your Profile — Free' : 'List Your Business — Free'}
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
                  href={`/suppliers/${category}/${loc.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  {service.name} in {loc}
                </Link>
              ))}
              {relatedCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/suppliers/${cat.slug}/${location}`}
                  className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  {cat.name} in {locationName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function generateFAQs(
  serviceName: string,
  locationName: string,
  vendorCount: number,
  categorySlug: string,
  isSolicitor: boolean,
  isAccountant: boolean = false,
  isMortgageAdvisor: boolean = false,
  isEstateAgent: boolean = false,
  vendorNames: string[] = [],
) {
  const vertical = getVerticalInfo(categorySlug);
  const { regulatoryAbbr, profession } = vertical;
  const suffix = isSolicitor ? 'solicitors' : isAccountant ? 'accountants' : isMortgageAdvisor ? 'mortgage advisors' : isEstateAgent ? 'estate agents' : 'suppliers';
  const categoryLabel = `${serviceName.toLowerCase()} ${suffix}`;
  const top3Names = vendorNames.slice(0, 3).join(', ') || `top ${suffix}`;
  const now = new Date();
  const currentMonthYear = `${now.toLocaleString('en-GB', { month: 'long' })} ${now.getFullYear()}`;

  // Enhanced 5 FAQs for pages with 3+ vendors
  if (vendorCount >= 3) {
    const regText = regulatoryAbbr ? `${regulatoryAbbr}-registered and verified` : 'verified';
    const regRegulated = regulatoryAbbr ? `${regulatoryAbbr}-regulated` : 'verified';

    return [
      {
        question: `Who are the best ${categoryLabel} in ${locationName}?`,
        answer: `TendorAI lists ${vendorCount} verified ${categoryLabel} in ${locationName}. Highly rated firms include ${top3Names}. All firms are ${regText}.`,
      },
      {
        question: `How many ${categoryLabel} are there in ${locationName}?`,
        answer: `There are ${vendorCount} ${regRegulated} ${categoryLabel} in ${locationName} listed on TendorAI as of ${currentMonthYear}.`,
      },
      {
        question: `How do I choose a ${profession} in ${locationName}?`,
        answer: regulatoryAbbr
          ? `Check their ${regulatoryAbbr} registration status, read client reviews, compare fees and specialisms, and check their AI visibility score on TendorAI. Firms with higher AI visibility are more likely to be recommended by ChatGPT, Perplexity, and other AI assistants.`
          : `Read client reviews, compare services and accreditations, and check their AI visibility score on TendorAI. Suppliers with higher AI visibility are more likely to be recommended by ChatGPT, Perplexity, and other AI assistants.`,
      },
      {
        question: `What does a ${profession} in ${locationName} cost?`,
        answer: `Fees vary by firm and service type. On TendorAI, firms with claimed profiles display their fee structures so you can compare before making contact. Check individual firm profiles for current pricing.`,
      },
      {
        question: `Does AI recommend ${categoryLabel} in ${locationName}?`,
        answer: `Yes. AI assistants like ChatGPT and Perplexity already recommend specific ${categoryLabel} in ${locationName} by name. TendorAI provides the structured data these AI systems use to make recommendations. Firms with verified TendorAI profiles appear more frequently in AI answers.`,
      },
    ];
  }

  // Fallback FAQs for thin pages (< 3 vendors)
  if (isSolicitor) {
    return [
      {
        question: `How do I find the best ${serviceName.toLowerCase()} solicitor in ${locationName}?`,
        answer: `TendorAI lists ${vendorCount} SRA-regulated ${serviceName.toLowerCase()} solicitors in ${locationName}. You can compare firms by reviews, accreditations, and practice areas. All firms are authorised by the Solicitors Regulation Authority.`,
      },
      {
        question: `Are these solicitors regulated?`,
        answer: `Yes — every solicitor firm listed on TendorAI is authorised and regulated by the SRA. Each profile links to the firm's SRA register entry so you can verify their status directly.`,
      },
    ];
  }

  if (isAccountant) {
    return [
      {
        question: `How do I find the best ${serviceName.toLowerCase()} accountant in ${locationName}?`,
        answer: `TendorAI lists ${vendorCount} ICAEW-regulated ${serviceName.toLowerCase()} accountants in ${locationName}. You can compare firms by reviews, accreditations, and practice areas.`,
      },
      {
        question: `Are these accountants regulated?`,
        answer: `Yes — every accountancy firm listed on TendorAI is regulated by the ICAEW. Each profile links to the firm's ICAEW directory entry so you can verify their status directly.`,
      },
    ];
  }

  if (isMortgageAdvisor) {
    return [
      {
        question: `How do I find ${serviceName.toLowerCase()} mortgage advisors in ${locationName}?`,
        answer: `TendorAI lists ${vendorCount} FCA-authorised ${serviceName.toLowerCase()} mortgage advisors in ${locationName}. You can compare advisors by reviews, lender panels, and specialisms.`,
      },
      {
        question: `Are these mortgage advisors regulated?`,
        answer: `Yes — all mortgage advisors listed on TendorAI are authorised and regulated by the Financial Conduct Authority (FCA).`,
      },
    ];
  }

  if (isEstateAgent) {
    return [
      {
        question: `How do I find ${serviceName.toLowerCase()} estate agents in ${locationName}?`,
        answer: `TendorAI lists ${vendorCount} ${serviceName.toLowerCase()} estate agents in ${locationName}. You can compare agents by reviews, fees, and coverage area.`,
      },
      {
        question: `Are these estate agents accredited?`,
        answer: `TendorAI lists estate agents including those registered with Propertymark (NAEA/ARLA). Each profile shows the agent's accreditations.`,
      },
    ];
  }

  return [
    {
      question: `How do I find ${serviceName.toLowerCase()} suppliers in ${locationName}?`,
      answer: `TendorAI makes it easy to compare ${serviceName.toLowerCase()} suppliers serving ${locationName}. You can compare services, check accreditations, and request quotes.`,
    },
    {
      question: `How many ${serviceName.toLowerCase()} companies operate in ${locationName}?`,
      answer: `TendorAI currently lists ${vendorCount} ${serviceName.toLowerCase()} supplier${vendorCount !== 1 ? 's' : ''} serving the ${locationName} area.`,
    },
  ];
}

function EmptyState({ service, location, category, isSolicitor, isAccountant, isMortgageAdvisor, isEstateAgent }: { service: string; location: string; category: string; isSolicitor: boolean; isAccountant: boolean; isMortgageAdvisor: boolean; isEstateAgent: boolean }) {
  const nearbyLocations = getNearbyLocations(location.toLowerCase().replace(/\s+/g, '-'));
  const suffix = isSolicitor ? 'solicitors' : isAccountant ? 'accountants' : isMortgageAdvisor ? 'mortgage advisors' : isEstateAgent ? 'estate agents' : 'suppliers';

  return (
    <div className="text-center py-12 bg-white rounded-lg">
      <div className="text-gray-400 text-5xl mb-4">&#128269;</div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No {service} {suffix} found in {location}
      </h2>
      <p className="text-gray-600 mb-6">
        We&apos;re expanding our network. Check nearby areas or browse all {suffix}.
      </p>
      {nearbyLocations.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">Try nearby locations:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {nearbyLocations.slice(0, 4).map((loc) => (
              <Link
                key={loc}
                href={`/suppliers/${category}/${loc.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                {loc}
              </Link>
            ))}
          </div>
        </div>
      )}
      <Link href="/suppliers" className="btn-primary">Browse All Suppliers</Link>
    </div>
  );
}
