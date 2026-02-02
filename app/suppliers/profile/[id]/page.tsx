import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/db/connection';
import { Vendor, VendorProduct } from '@/lib/db/models';
import {
  getDisplayTier,
  canShowPricing,
  canReceiveQuotes,
  TIER_CONFIG,
} from '@/lib/constants';
import QuoteRequestForm from './QuoteRequestForm';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ quote?: string }>;
}

export const revalidate = 3600;

// Fetch vendor data
async function getVendor(id: string) {
  await connectDB();

  try {
    const vendor = await Vendor.findById(id)
      .select({
        company: 1,
        name: 1,
        services: 1,
        location: 1,
        performance: 1,
        businessProfile: 1,
        brands: 1,
        tier: 1,
        contactInfo: 1,
        showPricing: 1,
        postcodeAreas: 1,
        'account.status': 1,
        'account.verificationStatus': 1,
      })
      .lean()
      .exec();

    if (!vendor) return null;

    // Check if vendor is active and verified
    if (
      vendor.account?.status !== 'active' ||
      vendor.account?.verificationStatus !== 'verified'
    ) {
      return null;
    }

    return {
      ...vendor,
      _id: vendor._id.toString(),
    };
  } catch {
    return null;
  }
}

// Fetch vendor products
async function getProducts(vendorId: string) {
  await connectDB();

  try {
    const products = await VendorProduct.find({
      vendorId,
      isActive: { $ne: false },
      status: 'active',
    })
      .select({
        manufacturer: 1,
        productModel: 1,
        description: 1,
        category: 1,
        speed: 1,
        features: 1,
        costs: 1,
        volumeRange: 1,
        paperSizes: 1,
        availability: 1,
      })
      .sort({ 'costs.totalMachineCost': 1 })
      .lean()
      .exec();

    return products.map((p) => ({
      ...p,
      _id: p._id.toString(),
      vendorId: p.vendorId.toString(),
    }));
  } catch {
    return [];
  }
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vendor = await getVendor(id);

  if (!vendor) {
    return { title: 'Supplier Not Found' };
  }

  const title = `${vendor.company} | Office Equipment Supplier`;
  const description =
    vendor.businessProfile?.description ||
    `${vendor.company} provides ${vendor.services?.join(', ') || 'office equipment services'} in ${vendor.location?.city || 'the UK'}.`;

  return {
    title,
    description: description.slice(0, 160),
    openGraph: {
      title,
      description: description.slice(0, 160),
      url: `https://www.tendorai.com/suppliers/profile/${id}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.tendorai.com/suppliers/profile/${id}`,
    },
  };
}

export default async function VendorProfilePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { quote } = await searchParams;
  const vendor = await getVendor(id);

  if (!vendor) {
    notFound();
  }

  const products = await getProducts(id);
  const displayTier = getDisplayTier(vendor.tier);
  const showPricing = canShowPricing(vendor.tier) || vendor.showPricing === true;
  const acceptsQuotes = canReceiveQuotes(vendor.tier) || vendor.showPricing;
  const showQuoteForm = quote === 'true' && acceptsQuotes;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://www.tendorai.com/suppliers/profile/${id}`,
    name: vendor.company,
    description:
      vendor.businessProfile?.description ||
      `${vendor.company} - Office equipment supplier`,
    url: `https://www.tendorai.com/suppliers/profile/${id}`,
    ...(vendor.contactInfo?.website && { sameAs: [vendor.contactInfo.website] }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: vendor.location?.city,
      addressRegion: vendor.location?.region,
      addressCountry: 'GB',
    },
    areaServed: vendor.location?.coverage?.map((area: string) => ({
      '@type': 'City',
      name: area,
    })),
    ...(vendor.performance?.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: vendor.performance.rating,
        reviewCount: vendor.performance.reviewCount || 1,
        bestRating: 5,
        worstRating: 1,
      },
    }),
    ...(vendor.businessProfile?.yearsInBusiness && {
      foundingDate: new Date().getFullYear() - vendor.businessProfile.yearsInBusiness,
    }),
    makesOffer: products.slice(0, 10).map((product) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: `${product.manufacturer} ${product.productModel}`,
        description: product.description || `${product.category} - ${product.speed}ppm`,
        category: product.category,
      },
      ...(showPricing && product.costs?.totalMachineCost && {
        price: product.costs.totalMachineCost,
        priceCurrency: 'GBP',
      }),
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tendorai.com' },
      { '@type': 'ListItem', position: 2, name: 'Suppliers', item: 'https://www.tendorai.com/suppliers' },
      { '@type': 'ListItem', position: 3, name: vendor.company },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-brand-gradient text-white py-8">
          <div className="section">
            <nav className="text-sm mb-4 text-purple-200">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/suppliers" className="hover:text-white">Suppliers</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{vendor.company}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {vendor.company}
                  </h1>
                  {displayTier !== 'free' && (
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-full ${
                        displayTier === 'verified'
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {TIER_CONFIG[displayTier].badge}
                    </span>
                  )}
                </div>

                {vendor.location?.city && (
                  <p className="text-purple-100 text-lg">
                    {vendor.location.city}
                    {vendor.location.region && `, ${vendor.location.region}`}
                  </p>
                )}

                {vendor.performance?.rating && vendor.performance.rating > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-yellow-300 text-lg">
                      {'★'.repeat(Math.round(vendor.performance.rating))}
                      {'☆'.repeat(5 - Math.round(vendor.performance.rating))}
                    </span>
                    <span className="text-purple-200">
                      {vendor.performance.rating.toFixed(1)} ({vendor.performance.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}
              </div>

              {acceptsQuotes && !showQuoteForm && (
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/suppliers/profile/${id}?quote=true`}
                    className="btn bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 text-center"
                  >
                    Request Quote
                  </Link>
                  {vendor.contactInfo?.phone && showPricing && (
                    <a
                      href={`tel:${vendor.contactInfo.phone}`}
                      className="btn-outline border-white text-white hover:bg-white/10 px-6 py-3 text-center"
                    >
                      {vendor.contactInfo.phone}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="section py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quote Form */}
              {showQuoteForm && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Request a Quote from {vendor.company}</h2>
                  <QuoteRequestForm vendorId={id} vendorName={vendor.company} />
                </div>
              )}

              {/* About */}
              {vendor.businessProfile?.description && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">About {vendor.company}</h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {vendor.businessProfile.description}
                  </p>
                </div>
              )}

              {/* Services */}
              {vendor.services && vendor.services.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Services</h2>
                  <div className="flex flex-wrap gap-2">
                    {vendor.services.map((service: string) => (
                      <span
                        key={service}
                        className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {products.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Products ({products.length})
                  </h2>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        showPricing={showPricing}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Brands */}
              {vendor.brands && vendor.brands.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Brands We Work With</h2>
                  <div className="flex flex-wrap gap-3">
                    {vendor.brands.map((brand: string) => (
                      <span
                        key={brand}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Details</h3>

                {showPricing ? (
                  <div className="space-y-4">
                    {vendor.contactInfo?.phone && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <a
                          href={`tel:${vendor.contactInfo.phone}`}
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          {vendor.contactInfo.phone}
                        </a>
                      </div>
                    )}

                    {vendor.contactInfo?.website && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Website</p>
                        <a
                          href={vendor.contactInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 font-medium break-all"
                        >
                          {vendor.contactInfo.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}

                    {vendor.location?.city && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="text-gray-700">
                          {vendor.location.city}
                          {vendor.location.region && `, ${vendor.location.region}`}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm mb-4">
                      Contact details available for verified suppliers
                    </p>
                    <Link href="/suppliers" className="link text-sm">
                      Browse verified suppliers
                    </Link>
                  </div>
                )}
              </div>

              {/* Coverage Area */}
              {vendor.location?.coverage && vendor.location.coverage.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Service Coverage</h3>
                  <div className="flex flex-wrap gap-2">
                    {vendor.location.coverage.map((area: string) => (
                      <span
                        key={area}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Accreditations */}
              {vendor.businessProfile?.accreditations &&
                vendor.businessProfile.accreditations.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Accreditations</h3>
                    <ul className="space-y-2">
                      {vendor.businessProfile.accreditations.map((acc: string) => (
                        <li key={acc} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-green-500">✓</span>
                          {acc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Business Info */}
              {vendor.businessProfile?.yearsInBusiness && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Business Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Years in Business</span>
                      <span className="text-gray-700 font-medium">
                        {vendor.businessProfile.yearsInBusiness}+
                      </span>
                    </div>
                    {products.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Products Listed</span>
                        <span className="text-gray-700 font-medium">{products.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTA */}
              {acceptsQuotes && !showQuoteForm && (
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <p className="text-purple-800 font-medium mb-3">
                    Interested in working with {vendor.company}?
                  </p>
                  <Link
                    href={`/suppliers/profile/${id}?quote=true`}
                    className="btn-primary w-full"
                  >
                    Request a Quote
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Product Card Component
interface ProductCardProps {
  product: {
    _id: string;
    manufacturer: string;
    productModel: string;
    description?: string;
    category: string;
    speed: number;
    features?: string[];
    costs?: {
      totalMachineCost?: number;
      cpcRates?: {
        A4Mono?: number;
        A4Colour?: number;
      };
    };
    volumeRange?: string;
    paperSizes?: {
      primary?: string;
    };
    availability?: {
      inStock?: boolean;
    };
  };
  showPricing: boolean;
}

function ProductCard({ product, showPricing }: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {product.manufacturer} {product.productModel}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {product.category} • {product.speed}ppm
            {product.paperSizes?.primary && ` • ${product.paperSizes.primary}`}
          </p>

          {product.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          )}

          {product.features && product.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.features.slice(0, 4).map((feature) => (
                <span
                  key={feature}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 4 && (
                <span className="text-xs text-gray-400">+{product.features.length - 4} more</span>
              )}
            </div>
          )}
        </div>

        <div className="text-right">
          {showPricing && product.costs?.totalMachineCost ? (
            <>
              <p className="text-lg font-bold text-gray-900">
                £{product.costs.totalMachineCost.toLocaleString()}
              </p>
              {product.costs.cpcRates && (
                <p className="text-xs text-gray-500 mt-1">
                  {product.costs.cpcRates.A4Mono}p mono
                  {product.costs.cpcRates.A4Colour && ` / ${product.costs.cpcRates.A4Colour}p colour`}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">Price on request</p>
          )}

          {product.availability && product.availability.inStock !== undefined && (
            <p
              className={`text-xs mt-2 ${
                product.availability.inStock === true ? 'text-green-600' : 'text-amber-600'
              }`}
            >
              {product.availability.inStock === true ? 'In Stock' : 'Made to Order'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
