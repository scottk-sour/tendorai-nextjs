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
    comingSoon: true,
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
    comingSoon: true,
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
    comingSoon: true,
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
    comingSoon: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'Wills & Probate',
    dbValue: 'Wills & Probate',
    slug: 'wills-probate',
    description: 'Will writing, estate planning, probate administration',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    comingSoon: true,
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
    comingSoon: true,
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
    comingSoon: true,
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
    comingSoon: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

const ServiceCategories = ({ categoryCounts = {} }: ServiceCategoriesProps) => {
  const renderCategory = (category: typeof officeEquipmentCategories[0]) => {
    const count = categoryCounts[category.dbValue] || 0;

    const content = (
      <div className="flex items-start space-x-4">
        <div className={`${category.iconBg} ${category.iconColor} p-3 rounded-lg flex-shrink-0`}>
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              {category.name}
            </h3>
            {category.comingSoon && (
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {category.description}
          </p>
          {!category.comingSoon && (
            <span className="text-sm text-purple-600 font-medium">
              {count} suppliers &rarr;
            </span>
          )}
        </div>
      </div>
    );

    if (category.comingSoon) {
      return (
        <div
          key={category.slug}
          className="bg-white rounded-xl p-5 border border-gray-200 opacity-75 group"
        >
          {content}
        </div>
      );
    }

    return (
      <Link
        key={category.slug}
        href={`/suppliers/${category.slug}`}
        className="bg-white rounded-xl p-5 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
      >
        {content}
      </Link>
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Browse by Service
        </h2>

        {/* Office Equipment */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Office Equipment</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {officeEquipmentCategories.map(renderCategory)}
        </div>

        {/* Legal Services */}
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Legal Services</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {legalCategories.map(renderCategory)}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
