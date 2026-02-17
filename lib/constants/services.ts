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
} as const;

export type ServiceKey = keyof typeof SERVICES;

export const SERVICE_KEYS = Object.keys(SERVICES) as ServiceKey[];

export const VALID_SERVICES = ['CCTV', 'Photocopiers', 'IT', 'Telecoms', 'Security', 'Software', 'Solicitors', 'Accountants'] as const;

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

export function getPracticeAreaFromSlug(slug: string): string | null {
  return SOLICITOR_PRACTICE_AREA_MAP[slug.toLowerCase()] || null;
}

export function getServiceFromSlug(slug: string): ValidService | null {
  // Check solicitor categories first — they map to 'Solicitors' service
  if (isSolicitorCategory(slug)) return 'Solicitors';
  return SERVICE_SLUG_MAP[slug.toLowerCase()] || null;
}

export function getServiceSlug(service: ValidService): string {
  const entry = Object.entries(SERVICE_SLUG_MAP).find(([, val]) => val === service);
  return entry ? entry[0] : service.toLowerCase();
}
