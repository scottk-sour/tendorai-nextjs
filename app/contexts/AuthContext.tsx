'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  AuthState,
  User,
  LoginCredentials,
  VendorSignupData,
  AuthResponse,
  vendorLogin,
  vendorSignup,
  verifyVendorToken,
  setAuthCookie,
  clearAuthCookies,
  getAuthToken,
  setLocalStorage,
  clearLocalStorage,
  getLocalStorage,
} from '@/lib/auth';

interface AuthContextValue {
  auth: AuthState;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loginVendor: (credentials: LoginCredentials) => Promise<AuthResponse>;
  signupVendor: (data: VendorSignupData) => Promise<AuthResponse>;
  hasRole: (role: string) => boolean;
  getCurrentToken: () => string | null;
  isVendor: boolean;
  isUser: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Check for vendor token first (from cookie or localStorage)
      const cookieToken = getAuthToken();
      const localVendorToken = getLocalStorage('vendorToken');
      const role = getLocalStorage('role');
      const vendorId = getLocalStorage('vendorId');
      const userName = getLocalStorage('userName');

      const token = cookieToken || localVendorToken;

      if (token && (role === 'vendor' || localVendorToken)) {
        // Verify vendor token
        const result = await verifyVendorToken(token);

        if (result.valid) {
          setAuth({
            isAuthenticated: true,
            user: {
              userId: vendorId || result.vendor?.vendorId || '',
              name: userName || result.vendor?.name || 'Vendor',
              email: result.vendor?.email || '',
              role: 'vendor',
            },
            token: token,
            isLoading: false,
          });
          return;
        }

        // Invalid token - clear storage
        clearAuthCookies();
        clearLocalStorage();
      }

      setAuth((prev) => ({ ...prev, isLoading: false }));
    };

    initializeAuth();
  }, []);

  // Login function (generic - for setting auth after API call)
  const login = useCallback((token: string, userData: User) => {
    setAuth({
      isAuthenticated: true,
      user: userData,
      token: token,
      isLoading: false,
    });

    // Set both cookie (for middleware) and localStorage (for client-side)
    setAuthCookie(token, userData.role);

    if (userData.role === 'vendor') {
      setLocalStorage('vendorToken', token);
      setLocalStorage('role', 'vendor');
      setLocalStorage('vendorId', userData.userId);
      setLocalStorage('userName', userData.name);
    }
  }, []);

  // Vendor login
  const loginVendor = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const result = await vendorLogin(credentials);

      if (result.success && result.token) {
        login(result.token, {
          userId: result.vendorId || '',
          name: result.name || 'Vendor',
          email: credentials.email,
          role: 'vendor',
        });
      }

      return result;
    },
    [login]
  );

  // Vendor signup
  const signupVendor = useCallback(async (data: VendorSignupData): Promise<AuthResponse> => {
    const result = await vendorSignup(data);
    return result;
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearAuthCookies();
    clearLocalStorage();

    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
    });
  }, []);

  // Check if user has specific role
  const hasRole = useCallback(
    (role: string) => {
      return auth.user?.role === role;
    },
    [auth.user?.role]
  );

  // Get current token
  const getCurrentToken = useCallback(() => {
    return auth.token || getAuthToken() || getLocalStorage('vendorToken');
  }, [auth.token]);

  const contextValue: AuthContextValue = {
    auth,
    login,
    logout,
    loginVendor,
    signupVendor,
    hasRole,
    getCurrentToken,
    isVendor: auth.user?.role === 'vendor',
    isUser: auth.user?.role === 'user',
    isAdmin: auth.user?.role === 'admin',
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
