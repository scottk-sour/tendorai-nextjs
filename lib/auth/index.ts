// Auth Types
export interface User {
  userId: string;
  name: string;
  email: string;
  role: 'user' | 'vendor' | 'admin';
}

export interface Vendor {
  vendorId: string;
  name: string;
  email: string;
  company: string;
  tier: 'listed' | 'visible' | 'verified';
  services: string[];
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface VendorSignupData {
  name: string;
  company: string;
  email: string;
  password: string;
  services: string[];
  phone?: string;
  address?: string;
  location?: string;
  price?: number;
  serviceLevel?: string;
  responseTime?: number;
  yearsInBusiness?: number;
  support?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  vendorId?: string;
  name?: string;
  message?: string;
  status?: string;
}

// API Base URL
const API_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL ||
                process.env.EXPRESS_BACKEND_URL ||
                'https://ai-procurement-backend-q35u.onrender.com';

// Cookie management
export function setAuthCookie(token: string, role: 'user' | 'vendor' | 'admin'): void {
  if (typeof document === 'undefined') return;

  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // 7 days

  document.cookie = `auth-token=${token}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; Secure`;
  document.cookie = `auth-role=${role}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; Secure`;
}

export function clearAuthCookies(): void {
  if (typeof document === 'undefined') return;

  document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'auth-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

export function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/auth-token=([^;]+)/);
  return match ? match[1] : null;
}

export function getAuthRole(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/auth-role=([^;]+)/);
  return match ? match[1] : null;
}

// LocalStorage helpers (for backwards compatibility during migration)
export function setLocalStorage(key: string, value: string): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value);
  }
}

export function getLocalStorage(key: string): string | null {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export function clearLocalStorage(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('vendorToken');
    localStorage.removeItem('vendorId');
    localStorage.removeItem('vendorName');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
  }
}

// Vendor API calls
export async function vendorLogin(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/vendors/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: data.message || (response.status === 401 ? 'Invalid email or password.' : 'Login failed.'),
      status: data.status,
      vendorId: data.vendorId,
    };
  }

  return {
    success: true,
    token: data.token,
    vendorId: data.vendorId,
    name: data.name,
  };
}

export async function vendorSignup(data: VendorSignupData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/vendors/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      phone: data.phone || '',
      address: data.address || '',
      location: data.location || '',
      price: data.price || 0,
      serviceLevel: data.serviceLevel || '',
      responseTime: data.responseTime || 0,
      yearsInBusiness: data.yearsInBusiness || 0,
      support: data.support || '',
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: responseData.message || 'Error signing up. Please try again.',
    };
  }

  return {
    success: true,
    token: responseData.token,
    vendorId: responseData.vendorId,
    name: responseData.name || data.name,
  };
}

export async function verifyVendorToken(token: string): Promise<{ valid: boolean; vendor?: Vendor }> {
  try {
    const response = await fetch(`${API_URL}/api/vendors/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { valid: false };
    }

    const data = await response.json();
    return {
      valid: true,
      vendor: data.vendor,
    };
  } catch {
    return { valid: false };
  }
}

export async function fetchVendorProfile(token: string): Promise<Vendor | null> {
  try {
    const response = await fetch(`${API_URL}/api/vendors/profile`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.vendor || null;
  } catch {
    return null;
  }
}

// Validation helpers
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return !phone || /^\+?\d{10,15}$/.test(phone);
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.' };
  }
  return { valid: true };
}
