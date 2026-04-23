export type VendorType =
  | 'solicitor'
  | 'accountant'
  | 'mortgage-advisor'
  | 'estate-agent';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SolicitorData {
  practiceAreas?: string[];
  sraNumber?: string;
  accreditations?: string[];
  pricingModel?: string;
  pricing?: string;
  legalAidAvailable?: boolean;
}

export interface AccountantData {
  specialisms?: string[];
  icaewAccaNumber?: string;
  softwarePartnerStatus?: string[];
  mtdCompliant?: boolean;
  pricingModel?: string;
  pricing?: string;
}

export interface MortgageData {
  feeType?: string;
  feeAmountGBP?: number;
  feePercentage?: number;
  wholeOfMarket?: boolean;
  lenderCount?: number;
  fcaNumber?: string;
}

export interface EstateData {
  serviceTypes?: string[];
  redressScheme?: string;
  clientMoneyProtection?: string;
  coveragePostcodes?: string[];
  pricingModel?: string;
  pricing?: string;
}

export interface VendorService {
  _id?: string;
  vendorId?: string;
  vendorType?: VendorType;

  // Common
  name: string;
  description?: string;
  serviceType?: string;
  areaServed?: string;
  faqs?: FaqItem[];
  active?: boolean;

  // Vertical-specific
  solicitorData?: SolicitorData;
  accountantData?: AccountantData;
  mortgageData?: MortgageData;
  estateData?: EstateData;

  // Server-generated
  completenessScore?: number;
  aeoSignals?: Record<string, unknown> | null;
  schemaJsonLd?: Record<string, unknown> | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface ApiErrorBody {
  field?: string;
  message?: string;
  code?: string;
  [k: string]: unknown;
}
