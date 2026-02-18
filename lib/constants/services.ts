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
} as const;

export type ServiceKey = keyof typeof SERVICES;

export const SERVICE_KEYS = Object.keys(SERVICES) as ServiceKey[];

export const VALID_SERVICES = ['CCTV', 'Photocopiers', 'IT', 'Telecoms', 'Security', 'Software', 'Solicitors', 'Accountants'] as const;

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

export function getPracticeAreaFromSlug(slug: string): string | null {
  return SOLICITOR_PRACTICE_AREA_MAP[slug.toLowerCase()] || null;
}

export function getAccountantServiceArea(slug: string): string | null {
  return ACCOUNTANT_SERVICE_AREA_MAP[slug.toLowerCase()] || null;
}

export function getServiceFromSlug(slug: string): ValidService | null {
  // Check solicitor categories first — they map to 'Solicitors' service
  if (isSolicitorCategory(slug)) return 'Solicitors';
  // Check accountant categories — they map to 'Accountants' service
  if (isAccountantCategory(slug)) return 'Accountants';
  return SERVICE_SLUG_MAP[slug.toLowerCase()] || null;
}

export function getServiceSlug(service: ValidService): string {
  const entry = Object.entries(SERVICE_SLUG_MAP).find(([, val]) => val === service);
  return entry ? entry[0] : service.toLowerCase();
}
