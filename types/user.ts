export type UserRole = 'user' | 'admin' | 'vendor';

export interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export interface DashboardSettings {
  theme: 'light' | 'dark';
  language: string;
  timezone: string;
  defaultView: 'dashboard' | 'quotes' | 'vendors';
}

export interface BusinessInfo {
  industry?: string;
  companySize?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  annualVolume?: number;
  preferredVendors?: string[];
}

export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  company?: string;
  phone?: string;
  address: UserAddress;
  preferences: UserPreferences;
  isActive: boolean;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin: Date;
  loginCount: number;
  profilePicture?: string;
  dashboardSettings: DashboardSettings;
  businessInfo: BusinessInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface SafeUser {
  _id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  company?: string;
  phone?: string;
  address: UserAddress;
  preferences: UserPreferences;
  isActive: boolean;
  isVerified: boolean;
  lastLogin: Date;
  profilePicture?: string;
  dashboardSettings: DashboardSettings;
  businessInfo: BusinessInfo;
  createdAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
