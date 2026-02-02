export const SERVICES = {
  photocopiers: {
    name: 'Photocopiers',
    slug: 'photocopiers',
    description: 'Office multifunction printers, copiers, managed print services',
    keywords: ['copier', 'printer', 'MFP', 'print', 'copy', 'scan', 'fax', 'multifunction'],
    icon: '🖨️',
  },
  telecoms: {
    name: 'Telecoms',
    slug: 'telecoms',
    description: 'Business phone systems, VoIP, unified communications',
    keywords: ['phone', 'voip', 'pbx', 'telephone', 'communications', 'calls', 'unified communications'],
    icon: '📞',
  },
  cctv: {
    name: 'CCTV',
    slug: 'cctv',
    description: 'Security cameras, video surveillance, monitoring systems',
    keywords: ['camera', 'surveillance', 'security', 'monitoring', 'video', 'recording'],
    icon: '📹',
  },
  it: {
    name: 'IT Services',
    slug: 'it',
    description: 'Managed IT services, support, infrastructure, cloud solutions',
    keywords: ['it', 'support', 'network', 'computer', 'server', 'cloud', 'managed services'],
    icon: '💻',
  },
  security: {
    name: 'Security Systems',
    slug: 'security',
    description: 'Access control, alarms, intruder detection, physical security',
    keywords: ['alarm', 'access', 'intruder', 'security', 'door', 'access control'],
    icon: '🔒',
  },
  software: {
    name: 'Business Software',
    slug: 'software',
    description: 'Enterprise software, document management, workflow automation',
    keywords: ['software', 'application', 'document', 'workflow', 'erp', 'automation'],
    icon: '📊',
  },
} as const;

export type ServiceKey = keyof typeof SERVICES;

export const SERVICE_KEYS = Object.keys(SERVICES) as ServiceKey[];

export const VALID_SERVICES = ['CCTV', 'Photocopiers', 'IT', 'Telecoms', 'Security', 'Software'] as const;

export type ValidService = (typeof VALID_SERVICES)[number];

// Map URL slugs to database values
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

export function getServiceFromSlug(slug: string): ValidService | null {
  return SERVICE_SLUG_MAP[slug.toLowerCase()] || null;
}

export function getServiceSlug(service: ValidService): string {
  const entry = Object.entries(SERVICE_SLUG_MAP).find(([, val]) => val === service);
  return entry ? entry[0] : service.toLowerCase();
}
