export type ProductCategory = 'A4 Printers' | 'A4 MFP' | 'A3 MFP' | 'SRA3 MFP';
export type VolumeRange = '0-6k' | '6k-13k' | '13k-20k' | '20k-30k' | '30k-40k' | '40k-50k' | '50k+';
export type PaperSize = 'A4' | 'A3' | 'SRA3' | 'A5' | 'Letter' | 'Legal';
export type ServiceLevel = 'Basic' | 'Standard' | 'Premium';
export type ResponseTime = '4hr' | '8hr' | 'Next day';
export type ProductStatus = 'active' | 'inactive' | 'draft';

export interface ProductCosts {
  machineCost: number;
  installation: number;
  profitMargin: number;
  totalMachineCost: number;
  cpcRates: {
    A4Mono: number;
    A4Colour: number;
    A3Mono?: number;
    A3Colour?: number;
    SRA3Mono?: number;
    SRA3Colour?: number;
  };
}

export interface ProductLeaseRates {
  term36?: number;
  term48?: number;
  term60?: number;
  term72?: number;
}

export interface ProductService {
  level?: ServiceLevel;
  responseTime?: ResponseTime;
  quarterlyService?: number;
}

export interface ProductAvailability {
  inStock: boolean;
  leadTime: number;
}

export interface VendorProduct {
  _id: string;
  vendorId: string;
  manufacturer: string;
  model: string;
  description?: string;
  category: ProductCategory;
  speed: number;
  isA3: boolean;
  features: string[];
  minVolume: number;
  maxVolume: number;
  volumeRange: VolumeRange;
  paperSizes: {
    primary: PaperSize;
    supported: PaperSize[];
  };
  costs: ProductCosts;
  service: ProductService;
  availability: ProductAvailability;
  leaseRates: ProductLeaseRates;
  minimumQuarterlyCharge: number;
  status: ProductStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicProduct {
  id: string;
  productName?: string;
  manufacturer: string;
  model: string;
  category: string;
  type?: string;
  colour?: string;
  speed?: number;
  isA3: boolean;
  features: string[];
  description?: string;
  minVolume?: number;
  maxVolume?: number;
  inStock: boolean;
  leadTime?: number;
  image?: string;
  specifications?: Record<string, unknown>;
}
