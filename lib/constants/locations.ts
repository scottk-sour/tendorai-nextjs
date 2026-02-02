// Major UK cities for GEO pages
export const MAJOR_LOCATIONS = [
  // Wales
  'Cardiff',
  'Newport',
  'Swansea',
  'Bridgend',
  'Barry',
  'Neath',
  'Port Talbot',
  'Pontypridd',
  'Cwmbran',
  'Caerphilly',
  'Merthyr Tydfil',
  'Llanelli',
  'Wrexham',
  'Rhondda',
  'Aberdare',

  // South West England
  'Bristol',
  'Bath',
  'Gloucester',
  'Cheltenham',
  'Exeter',
  'Plymouth',
  'Taunton',
  'Swindon',
  'Weston-super-Mare',
  'Torquay',
  'Barnstaple',
  'Truro',
  'Salisbury',
  'Yeovil',
  'Poole',
  'Bournemouth',
] as const;

export type MajorLocation = (typeof MAJOR_LOCATIONS)[number];

// UK regions
export const REGIONS = [
  'Wales',
  'South Wales',
  'North Wales',
  'South West England',
  'West of England',
  'Gloucestershire',
  'Somerset',
  'Devon',
  'Cornwall',
  'Wiltshire',
  'Dorset',
] as const;

export type Region = (typeof REGIONS)[number];

// Postcode area prefixes for Wales and South West
export const POSTCODE_AREAS = {
  // Wales
  CF: { name: 'Cardiff', region: 'South Wales' },
  NP: { name: 'Newport', region: 'South Wales' },
  SA: { name: 'Swansea', region: 'South Wales' },
  LL: { name: 'Llandudno', region: 'North Wales' },
  SY: { name: 'Shrewsbury', region: 'Mid Wales' },
  LD: { name: 'Llandrindod Wells', region: 'Mid Wales' },

  // South West England
  BS: { name: 'Bristol', region: 'West of England' },
  BA: { name: 'Bath', region: 'Somerset' },
  GL: { name: 'Gloucester', region: 'Gloucestershire' },
  EX: { name: 'Exeter', region: 'Devon' },
  PL: { name: 'Plymouth', region: 'Devon' },
  TQ: { name: 'Torquay', region: 'Devon' },
  TA: { name: 'Taunton', region: 'Somerset' },
  SN: { name: 'Swindon', region: 'Wiltshire' },
  SP: { name: 'Salisbury', region: 'Wiltshire' },
  DT: { name: 'Dorchester', region: 'Dorset' },
  BH: { name: 'Bournemouth', region: 'Dorset' },
  TR: { name: 'Truro', region: 'Cornwall' },
} as const;

export type PostcodeArea = keyof typeof POSTCODE_AREAS;

// Location groups for nearby searches
export const NEARBY_LOCATIONS: Record<string, string[]> = {
  cardiff: ['Newport', 'Bridgend', 'Barry', 'Pontypridd', 'Caerphilly'],
  newport: ['Cardiff', 'Bristol', 'Cwmbran', 'Pontypool', 'Abergavenny'],
  bristol: ['Bath', 'Newport', 'Gloucester', 'Weston-super-Mare', 'Clevedon'],
  swansea: ['Neath', 'Port Talbot', 'Llanelli', 'Bridgend', 'Carmarthen'],
  bath: ['Bristol', 'Trowbridge', 'Frome', 'Chippenham', 'Wells'],
  gloucester: ['Cheltenham', 'Bristol', 'Stroud', 'Cirencester', 'Tewkesbury'],
  exeter: ['Taunton', 'Torquay', 'Plymouth', 'Barnstaple', 'Newton Abbot'],
  plymouth: ['Exeter', 'Torquay', 'Truro', 'Bodmin', 'Tavistock'],
};

export function getNearbyLocations(location: string): string[] {
  return NEARBY_LOCATIONS[location.toLowerCase()] || [];
}

export function formatLocationSlug(location: string): string {
  return location.toLowerCase().replace(/\s+/g, '-');
}

export function formatLocationName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function isValidLocation(location: string): boolean {
  const normalised = location.toLowerCase().replace(/-/g, ' ');
  return (
    MAJOR_LOCATIONS.some((loc) => loc.toLowerCase() === normalised) ||
    REGIONS.some((reg) => reg.toLowerCase() === normalised) ||
    Object.values(POSTCODE_AREAS).some((area) => area.name.toLowerCase() === normalised)
  );
}
