export interface VendorLocation {
  address?: string;
  city?: string;
  postcode?: string;
  region?: string;
  coverage?: string[];
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
}

export interface VendorContactInfo {
  phone?: string;
  website?: string;
  linkedIn?: string;
  alternativeContact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

export interface VendorBusinessProfile {
  yearsInBusiness?: number;
  companySize?: string;
  numEmployees?: number;
  specializations?: string[];
  certifications?: string[];
  accreditations?: string[];
  description?: string;
  logoUrl?: string;
}

export interface VendorPerformance {
  rating?: number;
  reviewCount?: number;
  averageResponseTime?: number;
  completionRate?: number;
  customerSatisfaction?: number;
  onTimeDelivery?: number;
}

export interface VendorServiceCapabilities {
  responseTime?: '4hr' | '8hr' | 'Next day' | '48hr' | '3-5 days';
  supportHours?: '9-5' | '8-6' | '24/7' | 'Extended hours';
  installationService?: boolean;
  maintenanceService?: boolean;
  trainingProvided?: boolean;
  remoteSupport?: boolean;
  emergencySupport?: boolean;
}

export interface VendorAccount {
  status?: 'pending' | 'active' | 'inactive' | 'suspended' | 'rejected';
  verificationStatus?: 'unverified' | 'pending' | 'verified' | 'rejected';
  tier?: string;
  lastLogin?: Date;
  loginCount?: number;
}

export type VendorTier = 'free' | 'listed' | 'visible' | 'basic' | 'verified' | 'managed' | 'enterprise';

export interface Vendor {
  _id: string;
  name: string;
  company: string;
  email: string;
  services: string[];
  location: VendorLocation;
  contactInfo: VendorContactInfo;
  businessProfile: VendorBusinessProfile;
  brands?: string[];
  postcodeAreas?: string[];
  performance: VendorPerformance;
  serviceCapabilities: VendorServiceCapabilities;
  account: VendorAccount;
  tier: VendorTier;
  subscriptionStatus?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  listingStatus?: 'unclaimed' | 'claimed' | 'verified' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicVendor {
  id: string;
  company: string;
  name?: string;
  services: string[];
  location: {
    city?: string;
    region?: string;
    coverage?: string[];
    postcode?: string;
  };
  distance?: {
    km: number;
    miles: number;
    formatted: string;
  };
  rating: number;
  reviewCount: number;
  responseTime?: string;
  tier: string;
  description?: string;
  accreditations?: string[];
  yearsInBusiness?: number;
  employeeCount?: number;
  logoUrl?: string;
  brands?: string[];
  productCount: number;
  phone?: string;
  website?: string;
  showPricing: boolean;
}
