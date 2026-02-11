'use client';

import Link from 'next/link';

export interface VendorCardData {
  id: string;
  company: string;
  services: string[];
  location: {
    city?: string;
    region?: string;
    coverage?: string[];
    postcode?: string;
  };
  distance?: {
    km: number;
    miles: number;
    formatted: string;
  } | null;
  rating: number;
  reviewCount: number;
  tier: string;
  description?: string;
  accreditations?: string[];
  yearsInBusiness?: number;
  brands?: string[];
  productCount: number;
  website?: string;
  showPricing?: boolean;
  accountClaimed?: boolean;
}

type CardVariant = 'premium' | 'active' | 'unclaimed';

function getVariant(vendor: VendorCardData): CardVariant {
  const t = (vendor.tier || 'free').toLowerCase();
  if (t === 'verified' || t === 'visible') return 'premium';
  if (vendor.accountClaimed) return 'active';
  return 'unclaimed';
}

/** Build a descriptive label for the vendor's primary service and location */
function getVendorLabel(vendor: VendorCardData): string {
  const service = vendor.services[0] || 'Office Equipment';
  const city = vendor.location.city && vendor.location.city.toLowerCase() !== 'uk'
    ? vendor.location.city
    : null;
  if (city) return `${service} Supplier in ${city}`;
  return `${service} Supplier`;
}

export default function VendorCard({ vendor }: { vendor: VendorCardData }) {
  const variant = getVariant(vendor);

  if (variant === 'unclaimed') return <UnclaimedCard vendor={vendor} />;
  if (variant === 'premium') return <PremiumCard vendor={vendor} />;
  return <ActiveCard vendor={vendor} />;
}

// --- Premium Card (Verified / Visible tier) ---
function PremiumCard({ vendor }: { vendor: VendorCardData }) {
  const isVerified = vendor.tier === 'verified';
  const label = getVendorLabel(vendor);

  return (
    <article
      className={`bg-white rounded-xl shadow-md border-l-4 p-6 hover:shadow-lg transition-shadow ${
        isVerified ? 'border-l-green-500' : 'border-l-blue-500'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 truncate">
              <Link href={`/suppliers/profile/${vendor.id}`} className="hover:text-purple-600">
                {vendor.company}
              </Link>
            </h3>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                isVerified
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {isVerified ? 'Verified' : 'Visible'}
            </span>
          </div>

          {vendor.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vendor.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
            <LocationBadge vendor={vendor} />
            <RatingBadge rating={vendor.rating} reviewCount={vendor.reviewCount} />
            {vendor.yearsInBusiness ? <span>{vendor.yearsInBusiness}+ years</span> : null}
            {vendor.productCount > 0 && <span>{vendor.productCount} products</span>}
          </div>

          <BrandTags brands={vendor.brands} />
        </div>

        <div className="flex flex-col gap-2 md:items-end flex-shrink-0">
          <Link
            href={`/suppliers/profile/${vendor.id}?quote=true`}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            Get Quote from {vendor.company}
          </Link>
          <Link
            href={`/suppliers/profile/${vendor.id}`}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            {vendor.company} — {label}
          </Link>
        </div>
      </div>
    </article>
  );
}

// --- Active Card (Free tier, claimed) ---
function ActiveCard({ vendor }: { vendor: VendorCardData }) {
  const label = getVendorLabel(vendor);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
            <Link href={`/suppliers/profile/${vendor.id}`} className="hover:text-purple-600">
              {vendor.company}
            </Link>
          </h3>

          {vendor.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vendor.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
            <LocationBadge vendor={vendor} />
            <RatingBadge rating={vendor.rating} reviewCount={vendor.reviewCount} />
            {vendor.yearsInBusiness ? <span>{vendor.yearsInBusiness}+ years</span> : null}
            {vendor.productCount > 0 && <span>{vendor.productCount} products</span>}
          </div>

          <BrandTags brands={vendor.brands} />
        </div>

        <div className="flex flex-col gap-2 md:items-end flex-shrink-0">
          <Link
            href={`/suppliers/profile/${vendor.id}`}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            {vendor.company} — {label}
          </Link>
        </div>
      </div>
    </article>
  );
}

// --- Unclaimed Card (Seeded vendor, never signed up) ---
function UnclaimedCard({ vendor }: { vendor: VendorCardData }) {
  return (
    <article className="bg-gray-50 rounded-xl border border-gray-200 p-6 relative">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 truncate">
            {vendor.company}
          </h3>

          {vendor.description && (
            <p className="text-gray-400 text-sm mb-3 line-clamp-2 blur-sm select-none" aria-hidden>
              {vendor.description}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mb-3">
            {vendor.services.slice(0, 3).map((service, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
                {service}
              </span>
            ))}
          </div>

          {vendor.location.city && vendor.location.city.toLowerCase() !== 'uk' && (
            <span className="text-sm text-gray-400">{vendor.location.city}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 md:items-end flex-shrink-0 text-right">
          <p className="text-xs text-gray-400 italic">
            This supplier hasn&apos;t joined TendorAI yet
          </p>
          <Link
            href={`/vendor-signup?claim=${encodeURIComponent(vendor.company)}`}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Claim {vendor.company} on TendorAI &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}

// --- Shared sub-components ---
function LocationBadge({ vendor }: { vendor: VendorCardData }) {
  const city = vendor.location.city;
  const region = vendor.location.region;
  const distance = vendor.distance;

  if (!city && !distance) return null;

  return (
    <span className="flex items-center gap-1">
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      {city && city.toLowerCase() !== 'uk' && <span>{city}</span>}
      {city && region && city.toLowerCase() !== 'uk' && <span>, {region}</span>}
      {distance && <span className="text-purple-600 font-medium ml-1">({distance.formatted})</span>}
    </span>
  );
}

function RatingBadge({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  if (!rating || rating <= 0) return null;
  return (
    <span className="flex items-center gap-1">
      <span className="text-yellow-500">&#9733;</span>
      <span className="font-medium">{rating.toFixed(1)}</span>
      <span className="text-gray-400">({reviewCount})</span>
    </span>
  );
}

function BrandTags({ brands }: { brands?: string[] }) {
  if (!brands || brands.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {brands.slice(0, 4).map((brand) => (
        <span key={brand} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
          {brand}
        </span>
      ))}
      {brands.length > 4 && (
        <span className="text-xs text-gray-400">+{brands.length - 4} more</span>
      )}
    </div>
  );
}
