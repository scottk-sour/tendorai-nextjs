import { PublicVendor } from './vendor';
import { PublicProduct } from './product';

// Generic API response
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

// Vendor list response
export interface VendorListResponse {
  vendors: PublicVendor[];
  pagination: Pagination;
  filters: {
    category?: string;
    location?: string;
    brand?: string;
  };
  search?: {
    postcode: string;
    maxDistance: number;
    maxDistanceKm: number;
    region?: string;
  };
}

// Quote request
export interface QuoteRequestInput {
  vendorId: string;
  service: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  postcode?: string;
  message?: string;
  timeline?: 'urgent' | 'soon' | 'planning' | 'future';
  budgetRange?: string;
  monthlyVolume?: number;
  requirements?: string[];
  referralSource?: string;
}

export interface QuoteRequestResponse {
  quoteId: string;
  message: string;
  supplierName: string;
  expectedResponse: string;
}

// AI supplier search
export interface AISupplierSearchInput {
  service?: string;
  location?: string;
  features?: string[];
  limit?: number;
  monthlyVolume?: number;
  monoRatio?: number;
  referralSource?: string;
}

export interface AISupplierPricing {
  estimatedMonthly: string;
  estimatedQuarterly: string;
  breakdown: {
    lease: string;
    cpc: string;
    service: string;
  };
  cpcRates: {
    mono: string;
    colour: string;
  };
  basedOn: string;
  disclaimer: string;
}

export interface AISupplier {
  id: string;
  name: string;
  services: string[];
  description: string;
  coverage: string[];
  location: string;
  postcode?: string;
  rating?: number;
  reviewCount: number;
  brands: string[];
  accreditations: string[];
  certifications: string[];
  tier: string;
  canReceiveQuotes: boolean;
  pricing?: AISupplierPricing;
  productCount: number;
  profileUrl: string;
  quoteUrl: string;
}

export interface AISupplierSearchResponse {
  success: boolean;
  count: number;
  suppliers: AISupplier[];
  summary: string;
  metadata: {
    service: string;
    location: string;
    monthlyVolume: number;
    monoPages: number;
    colourPages: number;
    source: string;
    timestamp: string;
  };
}

// Categories and locations
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  keywords: string[];
}

export interface Location {
  name: string;
  type: 'city' | 'region' | 'postcode';
  count?: number;
  slug?: string;
}
