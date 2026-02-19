// ─── Office Equipment Services ────────────────────────────────────────
export const SERVICES = {
  photocopiers: {
    name: 'Photocopiers',
    value: 'Photocopiers',
    slug: 'photocopiers',
    group: 'office-equipment' as const,
    description: 'Office multifunction printers, copiers, managed print services',
    keywords: ['copier', 'printer', 'MFP', 'print', 'copy', 'scan', 'fax', 'multifunction'],
    icon: '🖨️',
  },
  telecoms: {
    name: 'Telecoms',
    value: 'Telecoms',
    slug: 'telecoms',
    group: 'office-equipment' as const,
    description: 'Business phone systems, VoIP, unified communications',
    keywords: ['phone', 'voip', 'pbx', 'telephone', 'communications', 'calls', 'unified communications'],
    icon: '📞',
  },
  cctv: {
    name: 'CCTV',
    value: 'CCTV',
    slug: 'cctv',
    group: 'office-equipment' as const,
    description: 'Security cameras, video surveillance, monitoring systems',
    keywords: ['camera', 'surveillance', 'security', 'monitoring', 'video', 'recording'],
    icon: '📹',
  },
  it: {
    name: 'IT Services',
    value: 'IT',
    slug: 'it',
    group: 'office-equipment' as const,
    description: 'Managed IT services, support, infrastructure, cloud solutions',
    keywords: ['it', 'support', 'network', 'computer', 'server', 'cloud', 'managed services'],
    icon: '💻',
  },
  security: {
    name: 'Security Systems',
    value: 'Security',
    slug: 'security',
    group: 'office-equipment' as const,
    description: 'Access control, alarms, intruder detection, physical security',
    keywords: ['alarm', 'access', 'intruder', 'security', 'door', 'access control'],
    icon: '🔒',
  },
  software: {
    name: 'Business Software',
    value: 'Software',
    slug: 'software',
    group: 'office-equipment' as const,
    description: 'Enterprise software, document management, workflow automation',
    keywords: ['software', 'application', 'document', 'workflow', 'erp', 'automation'],
    icon: '📊',
  },
  // ─── Solicitor Categories ────────────────────────────────────────────
  conveyancing: {
    name: 'Conveyancing',
    value: 'Conveyancing',
    slug: 'conveyancing',
    group: 'solicitor' as const,
    description: 'Residential property solicitors for buying, selling, and remortgaging',
    keywords: ['conveyancing', 'property', 'house', 'buying', 'selling', 'remortgage'],
    icon: '🏠',
  },
  'family-law': {
    name: 'Family Law',
    value: 'Family Law',
    slug: 'family-law',
    group: 'solicitor' as const,
    description: 'Divorce, child custody, prenuptial agreements, and family disputes',
    keywords: ['divorce', 'custody', 'family', 'matrimonial', 'children', 'prenuptial'],
    icon: '👨‍👩‍👧‍👦',
  },
  'criminal-law': {
    name: 'Criminal Law',
    value: 'Criminal Law',
    slug: 'criminal-law',
    group: 'solicitor' as const,
    description: 'Criminal defence solicitors for arrests, charges, and court representation',
    keywords: ['criminal', 'defence', 'court', 'arrest', 'magistrates', 'crown court'],
    icon: '⚖️',
  },
  'commercial-law': {
    name: 'Commercial Law',
    value: 'Commercial Law',
    slug: 'commercial-law',
    group: 'solicitor' as const,
    description: 'Business law, contracts, mergers, acquisitions, and corporate advice',
    keywords: ['commercial', 'corporate', 'business', 'contracts', 'mergers', 'acquisitions'],
    icon: '🏢',
  },
  'employment-law': {
    name: 'Employment Law',
    value: 'Employment Law',
    slug: 'employment-law',
    group: 'solicitor' as const,
    description: 'Workplace disputes, unfair dismissal, employment tribunals, and HR law',
    keywords: ['employment', 'dismissal', 'tribunal', 'workplace', 'redundancy', 'discrimination'],
    icon: '💼',
  },
  'wills-and-probate': {
    name: 'Wills & Probate',
    value: 'Wills & Probate',
    slug: 'wills-and-probate',
    group: 'solicitor' as const,
    description: 'Will writing, probate administration, estate planning, and trusts',
    keywords: ['wills', 'probate', 'estate', 'trusts', 'inheritance', 'power of attorney'],
    icon: '📜',
  },
  immigration: {
    name: 'Immigration',
    value: 'Immigration',
    slug: 'immigration',
    group: 'solicitor' as const,
    description: 'Visa applications, asylum, citizenship, and immigration appeals',
    keywords: ['immigration', 'visa', 'asylum', 'citizenship', 'right to remain', 'deportation'],
    icon: '🌍',
  },
  'personal-injury': {
    name: 'Personal Injury',
    value: 'Personal Injury',
    slug: 'personal-injury',
    group: 'solicitor' as const,
    description: 'Accident claims, clinical negligence, and compensation solicitors',
    keywords: ['personal injury', 'accident', 'compensation', 'clinical negligence', 'no win no fee'],
    icon: '🩹',
  },
  // ─── Accountant Categories ─────────────────────────────────────────
  'tax-advisory': {
    name: 'Tax Advisory',
    value: 'Tax Advisory',
    slug: 'tax-advisory',
    group: 'accountant' as const,
    description: 'Personal tax, corporation tax, inheritance tax, self-assessment',
    keywords: ['tax', 'corporation tax', 'self-assessment', 'inheritance tax', 'HMRC'],
    icon: '📋',
  },
  'audit-assurance': {
    name: 'Audit & Assurance',
    value: 'Audit & Assurance',
    slug: 'audit-assurance',
    group: 'accountant' as const,
    description: 'Statutory audits, internal audits, assurance services',
    keywords: ['audit', 'statutory audit', 'internal audit', 'assurance'],
    icon: '🔍',
  },
  bookkeeping: {
    name: 'Bookkeeping',
    value: 'Bookkeeping',
    slug: 'bookkeeping',
    group: 'accountant' as const,
    description: 'Bookkeeping, accounts preparation, management accounts',
    keywords: ['bookkeeping', 'accounts', 'management accounts', 'ledger'],
    icon: '📒',
  },
  payroll: {
    name: 'Payroll',
    value: 'Payroll',
    slug: 'payroll',
    group: 'accountant' as const,
    description: 'Payroll processing, RTI submissions, pension auto-enrolment',
    keywords: ['payroll', 'RTI', 'pensions', 'auto-enrolment', 'PAYE'],
    icon: '💷',
  },
  'corporate-finance': {
    name: 'Corporate Finance',
    value: 'Corporate Finance',
    slug: 'corporate-finance',
    group: 'accountant' as const,
    description: 'M&A, due diligence, business valuations, fundraising',
    keywords: ['corporate finance', 'M&A', 'due diligence', 'valuations', 'fundraising'],
    icon: '🏦',
  },
  'business-advisory': {
    name: 'Business Advisory',
    value: 'Business Advisory',
    slug: 'business-advisory',
    group: 'accountant' as const,
    description: 'Consultancy, start-ups, growth planning',
    keywords: ['business advisory', 'consultancy', 'start-up', 'growth planning'],
    icon: '📈',
  },
  'vat-services': {
    name: 'VAT',
    value: 'VAT',
    slug: 'vat-services',
    group: 'accountant' as const,
    description: 'VAT returns, MTD compliance, cross-border VAT',
    keywords: ['VAT', 'MTD', 'making tax digital', 'VAT returns'],
    icon: '🧾',
  },
  'financial-planning': {
    name: 'Financial Planning',
    value: 'Financial Planning',
    slug: 'financial-planning',
    group: 'accountant' as const,
    description: 'Wealth management, retirement planning, estate planning',
    keywords: ['financial planning', 'wealth management', 'retirement', 'estate planning'],
    icon: '💰',
  },
  // ─── Mortgage Advisor Categories ───────────────────────────────────
  'residential-mortgages': {
    name: 'Residential Mortgages',
    value: 'Residential Mortgages',
    slug: 'residential-mortgages',
    group: 'mortgage-advisor' as const,
    description: 'Home purchase mortgages, residential lending, first-time buyer advice',
    keywords: ['mortgage', 'home loan', 'residential', 'house purchase', 'lending'],
    icon: '🏠',
  },
  'buy-to-let': {
    name: 'Buy-to-Let',
    value: 'Buy-to-Let',
    slug: 'buy-to-let',
    group: 'mortgage-advisor' as const,
    description: 'Investment property mortgages, landlord finance, portfolio lending',
    keywords: ['buy to let', 'BTL', 'investment', 'landlord', 'rental property'],
    icon: '🏘️',
  },
  remortgage: {
    name: 'Remortgage',
    value: 'Remortgage',
    slug: 'remortgage',
    group: 'mortgage-advisor' as const,
    description: 'Switching lenders, rate reviews, equity release through remortgage',
    keywords: ['remortgage', 'switch lender', 'rate review', 'refinance'],
    icon: '🔄',
  },
  'first-time-buyer': {
    name: 'First-Time Buyer',
    value: 'First-Time Buyer',
    slug: 'first-time-buyer',
    group: 'mortgage-advisor' as const,
    description: 'First-time buyer mortgages, Help to Buy, shared ownership',
    keywords: ['first time buyer', 'FTB', 'help to buy', 'shared ownership', 'starter home'],
    icon: '🔑',
  },
  'equity-release': {
    name: 'Equity Release',
    value: 'Equity Release',
    slug: 'equity-release',
    group: 'mortgage-advisor' as const,
    description: 'Lifetime mortgages, home reversion plans, later life lending',
    keywords: ['equity release', 'lifetime mortgage', 'home reversion', 'later life'],
    icon: '🏡',
  },
  'commercial-mortgages': {
    name: 'Commercial Mortgages',
    value: 'Commercial Mortgages',
    slug: 'commercial-mortgages',
    group: 'mortgage-advisor' as const,
    description: 'Business premises finance, commercial property loans, development finance',
    keywords: ['commercial mortgage', 'business loan', 'commercial property', 'development finance'],
    icon: '🏗️',
  },
  'protection-insurance': {
    name: 'Protection Insurance',
    value: 'Protection Insurance',
    slug: 'protection-insurance',
    group: 'mortgage-advisor' as const,
    description: 'Life insurance, income protection, critical illness cover',
    keywords: ['life insurance', 'income protection', 'critical illness', 'protection'],
    icon: '🛡️',
  },
  // ─── Estate Agent Categories ────────────────────────────────────────
  sales: {
    name: 'Sales',
    value: 'Sales',
    slug: 'sales',
    group: 'estate-agent' as const,
    description: 'Residential property sales, valuations, marketing',
    keywords: ['property sales', 'selling', 'valuation', 'estate agent', 'house sale'],
    icon: '🏡',
  },
  lettings: {
    name: 'Lettings',
    value: 'Lettings',
    slug: 'lettings',
    group: 'estate-agent' as const,
    description: 'Rental property management, tenant finding, letting services',
    keywords: ['lettings', 'rental', 'tenant', 'landlord', 'letting agent'],
    icon: '🔑',
  },
  'property-management': {
    name: 'Property Management',
    value: 'Property Management',
    slug: 'property-management',
    group: 'estate-agent' as const,
    description: 'Full property management, maintenance, rent collection',
    keywords: ['property management', 'maintenance', 'rent collection', 'managed'],
    icon: '🏢',
  },
  'block-management': {
    name: 'Block Management',
    value: 'Block Management',
    slug: 'block-management',
    group: 'estate-agent' as const,
    description: 'Leasehold block management, service charges, freeholder services',
    keywords: ['block management', 'leasehold', 'service charge', 'freeholder'],
    icon: '🏬',
  },
  auctions: {
    name: 'Auctions',
    value: 'Auctions',
    slug: 'auctions',
    group: 'estate-agent' as const,
    description: 'Property auctions, auction house services, lot management',
    keywords: ['auction', 'property auction', 'bidding', 'lot'],
    icon: '🔨',
  },
  'commercial-property': {
    name: 'Commercial Property',
    value: 'Commercial Property',
    slug: 'commercial-property',
    group: 'estate-agent' as const,
    description: 'Commercial sales and lettings, office space, retail units',
    keywords: ['commercial property', 'office space', 'retail', 'industrial', 'warehouse'],
    icon: '🏭',
  },
  inventory: {
    name: 'Inventory',
    value: 'Inventory',
    slug: 'inventory',
    group: 'estate-agent' as const,
    description: 'Property inventory services, check-in/check-out reports',
    keywords: ['inventory', 'check-in', 'check-out', 'property report', 'condition report'],
    icon: '📋',
  },
} as const;

export type ServiceKey = keyof typeof SERVICES;

export const SERVICE_KEYS = Object.keys(SERVICES) as ServiceKey[];

export const VALID_SERVICES = ['CCTV', 'Photocopiers', 'IT', 'Telecoms', 'Security', 'Software', 'Solicitors', 'Accountants', 'Mortgage Advisors', 'Estate Agents'] as const;

// Accountant slug → practiceAreas value mapping
export const ACCOUNTANT_SERVICE_AREA_MAP: Record<string, string> = {
  'tax-advisory': 'Tax Advisory',
  'audit-assurance': 'Audit & Assurance',
  bookkeeping: 'Bookkeeping',
  payroll: 'Payroll',
  'corporate-finance': 'Corporate Finance',
  'business-advisory': 'Business Advisory',
  'vat-services': 'VAT',
  'financial-planning': 'Financial Planning',
};

export const ACCOUNTANT_SLUGS = Object.keys(ACCOUNTANT_SERVICE_AREA_MAP);

// Mortgage Advisor slug → practiceAreas value mapping
export const MORTGAGE_SERVICE_AREA_MAP: Record<string, string> = {
  'residential-mortgages': 'Residential Mortgages',
  'buy-to-let': 'Buy-to-Let',
  remortgage: 'Remortgage',
  'first-time-buyer': 'First-Time Buyer',
  'equity-release': 'Equity Release',
  'commercial-mortgages': 'Commercial Mortgages',
  'protection-insurance': 'Protection Insurance',
};

export const MORTGAGE_SLUGS = Object.keys(MORTGAGE_SERVICE_AREA_MAP);

// Estate Agent slug → practiceAreas value mapping
export const ESTATE_AGENT_SERVICE_AREA_MAP: Record<string, string> = {
  sales: 'Sales',
  lettings: 'Lettings',
  'property-management': 'Property Management',
  'block-management': 'Block Management',
  auctions: 'Auctions',
  'commercial-property': 'Commercial Property',
  inventory: 'Inventory',
};

export const ESTATE_AGENT_SLUGS = Object.keys(ESTATE_AGENT_SERVICE_AREA_MAP);

export type ValidService = (typeof VALID_SERVICES)[number];

// Solicitor slug → practiceAreas value mapping
export const SOLICITOR_PRACTICE_AREA_MAP: Record<string, string> = {
  conveyancing: 'Conveyancing',
  'family-law': 'Family Law',
  'criminal-law': 'Criminal Law',
  'commercial-law': 'Commercial Law',
  'employment-law': 'Employment Law',
  'wills-and-probate': 'Wills & Probate',
  immigration: 'Immigration',
  'personal-injury': 'Personal Injury',
};

export const SOLICITOR_SLUGS = Object.keys(SOLICITOR_PRACTICE_AREA_MAP);

// Map URL slugs to database service values (office equipment only)
export const SERVICE_SLUG_MAP: Record<string, ValidService> = {
  photocopiers: 'Photocopiers',
  copiers: 'Photocopiers',
  printers: 'Photocopiers',
  telecoms: 'Telecoms',
  phones: 'Telecoms',
  voip: 'Telecoms',
  cctv: 'CCTV',
  'security-cameras': 'CCTV',
  it: 'IT',
  'it-services': 'IT',
  security: 'Security',
  'security-systems': 'Security',
  software: 'Software',
};

export function isSolicitorCategory(slug: string): boolean {
  return slug in SOLICITOR_PRACTICE_AREA_MAP;
}

export function isAccountantCategory(slug: string): boolean {
  return slug in ACCOUNTANT_SERVICE_AREA_MAP;
}

export function isMortgageAdvisorCategory(slug: string): boolean {
  return slug in MORTGAGE_SERVICE_AREA_MAP;
}

export function isEstateAgentCategory(slug: string): boolean {
  return slug in ESTATE_AGENT_SERVICE_AREA_MAP;
}

export function getPracticeAreaFromSlug(slug: string): string | null {
  return SOLICITOR_PRACTICE_AREA_MAP[slug.toLowerCase()] || null;
}

export function getAccountantServiceArea(slug: string): string | null {
  return ACCOUNTANT_SERVICE_AREA_MAP[slug.toLowerCase()] || null;
}

export function getMortgageServiceArea(slug: string): string | null {
  return MORTGAGE_SERVICE_AREA_MAP[slug.toLowerCase()] || null;
}

export function getEstateAgentServiceArea(slug: string): string | null {
  return ESTATE_AGENT_SERVICE_AREA_MAP[slug.toLowerCase()] || null;
}

export function getServiceFromSlug(slug: string): ValidService | null {
  if (isSolicitorCategory(slug)) return 'Solicitors';
  if (isAccountantCategory(slug)) return 'Accountants';
  if (isMortgageAdvisorCategory(slug)) return 'Mortgage Advisors';
  if (isEstateAgentCategory(slug)) return 'Estate Agents';
  return SERVICE_SLUG_MAP[slug.toLowerCase()] || null;
}

export function getServiceSlug(service: ValidService): string {
  const entry = Object.entries(SERVICE_SLUG_MAP).find(([, val]) => val === service);
  return entry ? entry[0] : service.toLowerCase();
}
