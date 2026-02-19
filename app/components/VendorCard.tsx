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
  // Multi-vertical fields
  vendorType?: string;
  sraNumber?: string;
  icaewFirmNumber?: string;
  fcaNumber?: string;
  propertymarkNumber?: string;
  practiceAreas?: string[];
  slug?: string;
}

// ─── Practice area tag colours ─────────────────────────────────────
const PRACTICE_AREA_COLORS: Record<string, string> = {
  // Solicitor practice areas
  Conveyancing: 'bg-blue-50 text-blue-700',
  'Family Law': 'bg-amber-50 text-amber-700',
  'Criminal Law': 'bg-red-50 text-red-700',
  'Commercial Law': 'bg-slate-100 text-slate-700',
  'Employment Law': 'bg-teal-50 text-teal-700',
  'Wills & Probate': 'bg-purple-50 text-purple-700',
  Immigration: 'bg-emerald-50 text-emerald-700',
  'Personal Injury': 'bg-orange-50 text-orange-700',
  // Accountant practice areas
  'Tax Advisory': 'bg-green-50 text-green-700',
  'Audit & Assurance': 'bg-sky-50 text-sky-700',
  Bookkeeping: 'bg-violet-50 text-violet-700',
  Payroll: 'bg-lime-50 text-lime-700',
  'Corporate Finance': 'bg-blue-50 text-blue-700',
  'Business Advisory': 'bg-amber-50 text-amber-700',
  VAT: 'bg-fuchsia-50 text-fuchsia-700',
  'Financial Planning': 'bg-emerald-50 text-emerald-700',
  // Mortgage advisor practice areas
  'Residential Mortgages': 'bg-blue-100 text-blue-800',
  'Buy-to-Let': 'bg-teal-100 text-teal-800',
  Remortgage: 'bg-cyan-100 text-cyan-800',
  'First-Time Buyer': 'bg-sky-100 text-sky-800',
  'Equity Release': 'bg-indigo-100 text-indigo-800',
  'Commercial Mortgages': 'bg-slate-100 text-slate-800',
  'Protection Insurance': 'bg-violet-100 text-violet-800',
  // Estate agent practice areas
  Sales: 'bg-orange-100 text-orange-800',
  Lettings: 'bg-amber-100 text-amber-800',
  'Property Management': 'bg-yellow-100 text-yellow-800',
  'Block Management': 'bg-lime-100 text-lime-800',
  Auctions: 'bg-red-100 text-red-800',
  'Commercial Property': 'bg-stone-100 text-stone-800',
  Inventory: 'bg-neutral-100 text-neutral-800',
};

type CardVariant = 'premium' | 'active' | 'unclaimed';

function getVariant(vendor: VendorCardData): CardVariant {
  const t = (vendor.tier || 'free').toLowerCase();
  if (t === 'verified' || t === 'visible') return 'premium';
  if (vendor.accountClaimed) return 'active';
  return 'unclaimed';
}

/** Get the profile URL — use slug if available, otherwise MongoDB ID */
function getProfileUrl(vendor: VendorCardData): string {
  if (vendor.slug) return `/suppliers/vendor/${vendor.slug}`;
  return `/suppliers/profile/${vendor.id}`;
}

/** Claim URL with relevant params */
function getClaimUrl(vendor: VendorCardData): string {
  if (vendor.vendorType === 'solicitor' && vendor.sraNumber) {
    return `/vendor-signup?sra=${vendor.sraNumber}&company=${encodeURIComponent(vendor.company)}`;
  }
  if (vendor.vendorType === 'accountant' && vendor.icaewFirmNumber) {
    return `/vendor-signup?icaew=${vendor.icaewFirmNumber}&company=${encodeURIComponent(vendor.company)}`;
  }
  if (vendor.vendorType === 'mortgage-advisor' && vendor.fcaNumber) {
    return `/vendor-signup?fca=${vendor.fcaNumber}&company=${encodeURIComponent(vendor.company)}`;
  }
  if (vendor.vendorType === 'estate-agent' && vendor.propertymarkNumber) {
    return `/vendor-signup?propertymark=${vendor.propertymarkNumber}&company=${encodeURIComponent(vendor.company)}`;
  }
  return `/vendor-signup?claim=${encodeURIComponent(vendor.company)}`;
}

export default function VendorCard({ vendor }: { vendor: VendorCardData }) {
  const variant = getVariant(vendor);

  if (variant === 'unclaimed') return <UnclaimedCard vendor={vendor} />;
  if (variant === 'premium') return <PremiumCard vendor={vendor} />;
  return <ActiveCard vendor={vendor} />;
}

// ─── Premium Card (Pro / Starter tier) ────────────────────────
function PremiumCard({ vendor }: { vendor: VendorCardData }) {
  const isVerified = vendor.tier === 'verified';
  const isSolicitor = vendor.vendorType === 'solicitor';
  const isAccountant = vendor.vendorType === 'accountant';
  const isMortgageAdvisor = vendor.vendorType === 'mortgage-advisor';
  const isEstateAgent = vendor.vendorType === 'estate-agent';
  const isProfessional = isSolicitor || isAccountant || isMortgageAdvisor || isEstateAgent;

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
              <Link href={getProfileUrl(vendor)} className="hover:text-purple-600">
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
            {isSolicitor && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 flex-shrink-0">
                SRA Regulated
              </span>
            )}
            {isAccountant && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 flex-shrink-0">
                ICAEW Regulated
              </span>
            )}
            {isMortgageAdvisor && vendor.fcaNumber && (
              <a
                href={`https://register.fca.org.uk/s/firm?id=${vendor.fcaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 flex-shrink-0 hover:bg-blue-100"
              >
                FCA Authorised
              </a>
            )}
            {isEstateAgent && vendor.propertymarkNumber && (
              <a
                href="https://www.propertymark.co.uk/find-an-agent/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 flex-shrink-0 hover:bg-orange-100"
              >
                Propertymark Member
              </a>
            )}
          </div>

          {vendor.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vendor.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
            <LocationBadge vendor={vendor} />
            <RatingBadge rating={vendor.rating} reviewCount={vendor.reviewCount} />
            {vendor.yearsInBusiness ? <span>{vendor.yearsInBusiness}+ years</span> : null}
            {!isProfessional && vendor.productCount > 0 && <span>{vendor.productCount} products</span>}
          </div>

          {/* Professional: practice area tags */}
          {isProfessional && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
            <PracticeAreaTags areas={vendor.practiceAreas} />
          )}

          {/* Professional: accreditations */}
          {isProfessional && vendor.accreditations && vendor.accreditations.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {vendor.accreditations.map((acc) => (
                <span key={acc} className="text-xs px-2 py-0.5 rounded bg-green-50 text-green-700 font-medium">
                  {acc}
                </span>
              ))}
            </div>
          )}

          {/* Office equipment: brand tags */}
          {!isProfessional && <BrandTags brands={vendor.brands} />}
        </div>

        <div className="flex flex-col gap-2 md:items-end flex-shrink-0">
          <Link
            href={`${getProfileUrl(vendor)}?quote=true`}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            {isProfessional ? `Contact ${vendor.company}` : `Get Quote from ${vendor.company}`}
          </Link>
          <Link
            href={getProfileUrl(vendor)}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Active Card (Free tier, claimed) ──────────────────────────────
function ActiveCard({ vendor }: { vendor: VendorCardData }) {
  const isSolicitor = vendor.vendorType === 'solicitor';
  const isAccountant = vendor.vendorType === 'accountant';
  const isMortgageAdvisor = vendor.vendorType === 'mortgage-advisor';
  const isEstateAgent = vendor.vendorType === 'estate-agent';
  const isProfessional = isSolicitor || isAccountant || isMortgageAdvisor || isEstateAgent;

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900 truncate">
              <Link href={getProfileUrl(vendor)} className="hover:text-purple-600">
                {vendor.company}
              </Link>
            </h3>
            {isSolicitor && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 flex-shrink-0">
                SRA Regulated
              </span>
            )}
            {isAccountant && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 flex-shrink-0">
                ICAEW Regulated
              </span>
            )}
            {isMortgageAdvisor && vendor.fcaNumber && (
              <a
                href={`https://register.fca.org.uk/s/firm?id=${vendor.fcaNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 flex-shrink-0 hover:bg-blue-100"
              >
                FCA Authorised
              </a>
            )}
            {isEstateAgent && vendor.propertymarkNumber && (
              <a
                href="https://www.propertymark.co.uk/find-an-agent/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 flex-shrink-0 hover:bg-orange-100"
              >
                Propertymark Member
              </a>
            )}
          </div>

          {vendor.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{vendor.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
            <LocationBadge vendor={vendor} />
            <RatingBadge rating={vendor.rating} reviewCount={vendor.reviewCount} />
            {vendor.yearsInBusiness ? <span>{vendor.yearsInBusiness}+ years</span> : null}
            {!isProfessional && vendor.productCount > 0 && <span>{vendor.productCount} products</span>}
          </div>

          {isProfessional && vendor.practiceAreas && vendor.practiceAreas.length > 0 && (
            <PracticeAreaTags areas={vendor.practiceAreas} />
          )}

          {isProfessional && vendor.accreditations && vendor.accreditations.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {vendor.accreditations.map((acc) => (
                <span key={acc} className="text-xs px-2 py-0.5 rounded bg-green-50 text-green-700 font-medium">
                  {acc}
                </span>
              ))}
            </div>
          )}

          {!isProfessional && <BrandTags brands={vendor.brands} />}
        </div>

        <div className="flex flex-col gap-2 md:items-end flex-shrink-0">
          <Link
            href={getProfileUrl(vendor)}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Unclaimed Card ────────────────────────────────────────────────
function UnclaimedCard({ vendor }: { vendor: VendorCardData }) {
  const isSolicitor = vendor.vendorType === 'solicitor';
  const isAccountant = vendor.vendorType === 'accountant';
  const isMortgageAdvisor = vendor.vendorType === 'mortgage-advisor';
  const isEstateAgent = vendor.vendorType === 'estate-agent';
  const isProfessional = isSolicitor || isAccountant || isMortgageAdvisor || isEstateAgent;
  const profileUrl = getProfileUrl(vendor);

  return (
    <article className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-700 truncate">
                <Link href={profileUrl} className="hover:text-purple-600">{vendor.company}</Link>
              </h3>
              {isSolicitor && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex-shrink-0">
                  SRA Regulated
                </span>
              )}
              {isAccountant && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 flex-shrink-0">
                  ICAEW Regulated
                </span>
              )}
              {isMortgageAdvisor && vendor.fcaNumber && (
                <a
                  href={`https://register.fca.org.uk/s/firm?id=${vendor.fcaNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 flex-shrink-0 hover:bg-blue-200"
                >
                  FCA Authorised
                </a>
              )}
              {isEstateAgent && vendor.propertymarkNumber && (
                <a
                  href="https://www.propertymark.co.uk/find-an-agent/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 flex-shrink-0 hover:bg-orange-200"
                >
                  Propertymark Member
                </a>
              )}
            </div>

            {/* SRA number */}
            {isSolicitor && vendor.sraNumber && (
              <p className="text-xs text-gray-400 mb-2">SRA No: {vendor.sraNumber}</p>
            )}

            {/* ICAEW firm number */}
            {isAccountant && vendor.icaewFirmNumber && (
              <p className="text-xs text-gray-400 mb-2">ICAEW Firm: {vendor.icaewFirmNumber}</p>
            )}

            {/* FCA number */}
            {isMortgageAdvisor && vendor.fcaNumber && (
              <p className="text-xs text-gray-400 mb-2">FCA No: {vendor.fcaNumber}</p>
            )}

            {/* Propertymark number */}
            {isEstateAgent && vendor.propertymarkNumber && (
              <p className="text-xs text-gray-400 mb-2">Propertymark: {vendor.propertymarkNumber}</p>
            )}

            {/* Location */}
            {vendor.location.city && vendor.location.city.toLowerCase() !== 'uk' && (
              <p className="text-sm text-gray-500 mb-3">
                {vendor.location.city}
                {vendor.location.postcode && `, ${vendor.location.postcode}`}
              </p>
            )}

            {/* Professional: practice area tags with per-area colours */}
            {isProfessional && vendor.practiceAreas && vendor.practiceAreas.length > 0 ? (
              <PracticeAreaTags areas={vendor.practiceAreas} />
            ) : (
              /* Equipment: service tags */
              <div className="flex flex-wrap gap-1.5 mb-1">
                {vendor.services.slice(0, 4).map((service, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-500">
                    {service}
                  </span>
                ))}
              </div>
            )}

            {/* Rating if present */}
            {vendor.rating > 0 && (
              <div className="mt-2">
                <RatingBadge rating={vendor.rating} reviewCount={vendor.reviewCount} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 md:items-end flex-shrink-0 text-right">
            <Link
              href={profileUrl}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View profile &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Claim banner */}
      <div className="bg-amber-50 border-t border-amber-100 px-6 py-3 flex items-center justify-between gap-4">
        <p className="text-xs text-amber-700">
          Unclaimed profile &middot; Claim to add pricing &amp; rank higher
        </p>
        <Link
          href={getClaimUrl(vendor)}
          className="text-xs font-semibold text-purple-600 hover:text-purple-700 whitespace-nowrap"
        >
          Claim Profile &rarr;
        </Link>
      </div>
    </article>
  );
}

// ─── Shared sub-components ─────────────────────────────────────────

function PracticeAreaTags({ areas }: { areas: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {areas.slice(0, 5).map((area) => (
        <span
          key={area}
          className={`text-xs px-2 py-1 rounded font-medium ${
            PRACTICE_AREA_COLORS[area] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {area}
        </span>
      ))}
      {areas.length > 5 && (
        <span className="text-xs text-gray-400 self-center">+{areas.length - 5} more</span>
      )}
    </div>
  );
}

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
