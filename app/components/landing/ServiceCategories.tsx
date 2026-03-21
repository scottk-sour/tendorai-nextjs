import Link from 'next/link';

interface ServiceCategoriesProps {
  categoryCounts?: Record<string, number>;
}

const officeEquipmentCategories = [
  {
    name: 'Photocopiers',
    dbValue: 'Photocopiers',
    slug: 'photocopiers',
    description: 'Office multifunction printers, copiers, managed print services',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
  },
  {
    name: 'Telecoms',
    dbValue: 'Telecoms',
    slug: 'telecoms',
    description: 'Business phone systems, VoIP, unified communications',
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    name: 'CCTV',
    dbValue: 'CCTV',
    slug: 'cctv',
    description: 'Security cameras, video surveillance, monitoring systems',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'IT Services',
    dbValue: 'IT',
    slug: 'it',
    description: 'Managed IT services, support, infrastructure, cloud solutions',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const legalCategories = [
  {
    name: 'Conveyancing',
    dbValue: 'Conveyancing',
    slug: 'conveyancing',
    description: 'Residential and commercial property conveyancing solicitors',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Family Law',
    dbValue: 'Family Law',
    slug: 'family-law',
    description: 'Divorce, child custody, prenuptial agreements, family disputes',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Criminal Law',
    dbValue: 'Criminal Law',
    slug: 'criminal-law',
    description: 'Criminal defence, magistrates and crown court representation',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    name: 'Commercial Law',
    dbValue: 'Commercial Law',
    slug: 'commercial-law',
    description: 'Business contracts, commercial disputes, corporate law',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Wills & Probate',
    dbValue: 'Wills & Probate',
    slug: 'wills-and-probate',
    description: 'Will writing, estate planning, probate administration',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: 'Employment Law',
    dbValue: 'Employment Law',
    slug: 'employment-law',
    description: 'Unfair dismissal, tribunal claims, employment contracts',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Immigration',
    dbValue: 'Immigration',
    slug: 'immigration',
    description: 'Visa applications, asylum, immigration appeals, sponsorship',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Personal Injury',
    dbValue: 'Personal Injury',
    slug: 'personal-injury',
    description: 'Accident claims, medical negligence, compensation',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const accountantCategories = [
  {
    name: 'Tax Advisory',
    dbValue: 'Tax Advisory',
    slug: 'tax-advisory',
    description: 'Personal tax, corporation tax, inheritance tax, self-assessment',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
      </svg>
    ),
  },
  {
    name: 'Audit & Assurance',
    dbValue: 'Audit & Assurance',
    slug: 'audit-assurance',
    description: 'Statutory audits, internal audits, assurance services',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'Bookkeeping',
    dbValue: 'Bookkeeping',
    slug: 'bookkeeping',
    description: 'Bookkeeping, accounts preparation, management accounts',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: 'Payroll',
    dbValue: 'Payroll',
    slug: 'payroll',
    description: 'Payroll processing, RTI submissions, pension auto-enrolment',
    iconBg: 'bg-lime-50',
    iconColor: 'text-lime-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Corporate Finance',
    dbValue: 'Corporate Finance',
    slug: 'corporate-finance',
    description: 'M&A, due diligence, business valuations, fundraising',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Business Advisory',
    dbValue: 'Business Advisory',
    slug: 'business-advisory',
    description: 'Consultancy, start-ups, growth planning',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    name: 'VAT',
    dbValue: 'VAT',
    slug: 'vat-services',
    description: 'VAT returns, MTD compliance, cross-border VAT',
    iconBg: 'bg-fuchsia-50',
    iconColor: 'text-fuchsia-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Financial Planning',
    dbValue: 'Financial Planning',
    slug: 'financial-planning',
    description: 'Wealth management, retirement planning, estate planning',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const mortgageCategories = [
  {
    name: 'Residential Mortgages',
    dbValue: 'Residential Mortgages',
    slug: 'residential-mortgages',
    description: 'Home purchase mortgages, residential lending, first-time buyer advice',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Buy-to-Let',
    dbValue: 'Buy-to-Let',
    slug: 'buy-to-let',
    description: 'Investment property mortgages, landlord finance, portfolio lending',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Remortgage',
    dbValue: 'Remortgage',
    slug: 'remortgage',
    description: 'Switching lenders, rate reviews, equity release through remortgage',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    name: 'First-Time Buyer',
    dbValue: 'First-Time Buyer',
    slug: 'first-time-buyer',
    description: 'First-time buyer mortgages, Help to Buy, shared ownership',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    name: 'Equity Release',
    dbValue: 'Equity Release',
    slug: 'equity-release',
    description: 'Lifetime mortgages, home reversion plans, later life lending',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Commercial Mortgages',
    dbValue: 'Commercial Mortgages',
    slug: 'commercial-mortgages',
    description: 'Business premises finance, commercial property loans',
    iconBg: 'bg-slate-50',
    iconColor: 'text-slate-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    name: 'Protection Insurance',
    dbValue: 'Protection Insurance',
    slug: 'protection-insurance',
    description: 'Life insurance, income protection, critical illness cover',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const estateAgentCategories = [
  {
    name: 'Property Sales',
    dbValue: 'Sales',
    slug: 'sales',
    description: 'Residential property sales, valuations, marketing',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Lettings',
    dbValue: 'Lettings',
    slug: 'lettings',
    description: 'Rental property management, tenant finding, letting services',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    name: 'Property Management',
    dbValue: 'Property Management',
    slug: 'property-management',
    description: 'Full property management, maintenance, rent collection',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Block Management',
    dbValue: 'Block Management',
    slug: 'block-management',
    description: 'Leasehold block management, service charges, freeholder services',
    iconBg: 'bg-lime-50',
    iconColor: 'text-lime-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    name: 'Auctions',
    dbValue: 'Auctions',
    slug: 'auctions',
    description: 'Property auctions, auction house services, lot management',
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'Commercial Property',
    dbValue: 'Commercial Property',
    slug: 'commercial-property',
    description: 'Commercial sales and lettings, office space, retail units',
    iconBg: 'bg-stone-50',
    iconColor: 'text-stone-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Inventory',
    dbValue: 'Inventory',
    slug: 'inventory',
    description: 'Property inventory services, check-in/check-out reports',
    iconBg: 'bg-neutral-50',
    iconColor: 'text-neutral-600',
    comingSoon: false,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
];

const plural = (count: number, singular: string, pluralForm: string) =>
  count === 1 ? singular : pluralForm;

const ServiceCategories = ({ categoryCounts = {} }: ServiceCategoriesProps) => {
  const renderCategory = (singular: string, pluralForm: string) => (category: typeof officeEquipmentCategories[0]) => {
    const count = categoryCounts[category.dbValue] || 0;
    const label = plural(count, singular, pluralForm);
    const isActive = count >= 3;
    const isThin = count >= 1 && count <= 2;

    const content = (
      <div className="flex items-start space-x-4">
        <div className={`${category.iconBg} ${category.iconColor} p-3 rounded-lg flex-shrink-0`}>
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold transition-colors ${isActive ? 'text-[var(--text)] group-hover:text-[var(--purple-start)]' : 'text-[var(--text)]'}`}>
              {category.name}
            </h3>
            {count === 0 && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--text2)] mb-3 line-clamp-2">
            {category.description}
          </p>
          {count > 0 && (
            <span className={`text-sm font-medium ${isActive ? 'text-[var(--purple-start)]' : 'text-[var(--text2)]'}`}>
              {count.toLocaleString()} {label} {isActive && <>&rarr;</>}
            </span>
          )}
        </div>
      </div>
    );

    if (isActive) {
      return (
        <Link
          key={category.slug}
          href={`/suppliers/${category.slug}`}
          className="bg-white rounded-xl p-5 border border-[var(--border)] hover:border-[var(--purple-start)] hover:shadow-md transition-all group"
        >
          {content}
        </Link>
      );
    }

    return (
      <div
        key={category.slug}
        className={`bg-white rounded-xl p-5 border border-[var(--border)] group ${isThin ? 'opacity-80' : 'opacity-60'}`}
      >
        {content}
      </div>
    );
  };

  return (
    <section aria-label="services" className="py-20 md:py-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2>Browse by service</h2>
          <p>AI visibility profiles for office equipment, legal, accounting, mortgage and property services across the UK</p>
        </div>

        {/* Office Equipment */}
        <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-4">Office Equipment</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {officeEquipmentCategories.map(renderCategory('supplier', 'suppliers'))}
        </div>

        {/* Legal Services */}
        <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-4">Legal Services</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {legalCategories.map(renderCategory('firm', 'firms'))}
        </div>

        {/* Accounting Services */}
        <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-4">Accounting Services</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {accountantCategories.map(renderCategory('firm', 'firms'))}
        </div>

        {/* Mortgage Advisors */}
        <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-4">Mortgage Advisors</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {mortgageCategories.map(renderCategory('adviser', 'advisers'))}
        </div>

        {/* Estate Agents */}
        <h3 className="font-serif text-lg font-semibold text-[var(--text)] mb-4">Estate Agents</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {estateAgentCategories.map(renderCategory('agent', 'agents'))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
