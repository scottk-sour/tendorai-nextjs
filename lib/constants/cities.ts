export interface CityConfig {
  slug: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
}

export const CITIES: CityConfig[] = [
  { slug: 'cardiff', name: 'Cardiff', region: 'Wales', lat: 51.4816, lng: -3.1791 },
  { slug: 'bristol', name: 'Bristol', region: 'South West', lat: 51.4545, lng: -2.5879 },
  { slug: 'swansea', name: 'Swansea', region: 'Wales', lat: 51.6214, lng: -3.9436 },
  { slug: 'newport', name: 'Newport', region: 'Wales', lat: 51.5842, lng: -2.9977 },
  { slug: 'london', name: 'London', region: 'London', lat: 51.5074, lng: -0.1278 },
  { slug: 'manchester', name: 'Manchester', region: 'North West', lat: 53.4808, lng: -2.2426 },
  { slug: 'birmingham', name: 'Birmingham', region: 'West Midlands', lat: 52.4862, lng: -1.8904 },
  { slug: 'leeds', name: 'Leeds', region: 'Yorkshire', lat: 53.8008, lng: -1.5491 },
  { slug: 'liverpool', name: 'Liverpool', region: 'North West', lat: 53.4084, lng: -2.9916 },
  { slug: 'sheffield', name: 'Sheffield', region: 'Yorkshire', lat: 53.3811, lng: -1.4701 },
  { slug: 'newcastle', name: 'Newcastle', region: 'North East', lat: 54.9783, lng: -1.6178 },
  { slug: 'nottingham', name: 'Nottingham', region: 'East Midlands', lat: 52.9548, lng: -1.1581 },
  { slug: 'leicester', name: 'Leicester', region: 'East Midlands', lat: 52.6369, lng: -1.1398 },
  { slug: 'edinburgh', name: 'Edinburgh', region: 'Scotland', lat: 55.9533, lng: -3.1883 },
  { slug: 'glasgow', name: 'Glasgow', region: 'Scotland', lat: 55.8642, lng: -4.2518 },
  { slug: 'brighton', name: 'Brighton', region: 'South East', lat: 50.8225, lng: -0.1372 },
  { slug: 'oxford', name: 'Oxford', region: 'South East', lat: 51.7520, lng: -1.2577 },
  { slug: 'cambridge', name: 'Cambridge', region: 'East', lat: 52.2053, lng: 0.1218 },
  { slug: 'reading', name: 'Reading', region: 'South East', lat: 51.4543, lng: -0.9781 },
  { slug: 'southampton', name: 'Southampton', region: 'South East', lat: 50.9097, lng: -1.4044 },
  { slug: 'plymouth', name: 'Plymouth', region: 'South West', lat: 50.3755, lng: -4.1427 },
  { slug: 'exeter', name: 'Exeter', region: 'South West', lat: 50.7184, lng: -3.5339 },
  { slug: 'bath', name: 'Bath', region: 'South West', lat: 51.3811, lng: -2.3590 },
  { slug: 'york', name: 'York', region: 'Yorkshire', lat: 53.9600, lng: -1.0873 },
  { slug: 'chester', name: 'Chester', region: 'North West', lat: 53.1930, lng: -2.8931 },
  { slug: 'cheltenham', name: 'Cheltenham', region: 'South West', lat: 51.8994, lng: -2.0783 },
  { slug: 'gloucester', name: 'Gloucester', region: 'South West', lat: 51.8642, lng: -2.2382 },
];

export const CITY_MAP = Object.fromEntries(CITIES.map((c) => [c.slug, c]));
