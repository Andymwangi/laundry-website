// @ts-nocheck
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCurrentUser, signIn, signOut, signUp, updateUserProfile } from './client';
import { User, NewUser, AuthResponse } from './types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, redirectPath?: string) => Promise<AuthResponse>;
  register: (userData: NewUser, redirectPath?: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<AuthResponse>;
  updateProfile: (profileData: Partial<User>) => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle post-login redirection
  useEffect(() => {
    if (user && !loading) {
      // Check URL parameters for redirect instructions
      const returnUrl = searchParams?.get('returnUrl');
      const plan = searchParams?.get('plan');
      const product = searchParams?.get('product');
      
      // Check if there's stored plan info from pricing page
      const storedPlan = localStorage.getItem('selectedPlan');
      const storedKilos = localStorage.getItem('defaultKilos');
      
      // Check if there's stored product from products page
      const storedProduct = localStorage.getItem('cartProduct');
      
      if (product || storedProduct) {
        // Clear stored product if it exists
        if (storedProduct) {
          localStorage.removeItem('cartProduct');
        }
        
        // Redirect to checkout with product info
        router.push(`/dashboard/checkout${product ? `?product=${product}` : ''}`);
      }
      else if (plan || storedPlan) {
        // Clear stored plan info if it exists
        if (storedPlan) {
          localStorage.removeItem('selectedPlan');
          localStorage.removeItem('defaultKilos');
        }
        
        // Use URL parameters first, fall back to stored values
        const planToUse = plan || storedPlan;
        const kilosToUse = searchParams?.get('kilos') || storedKilos || '1';
        
        // Redirect to checkout page with plan info
        router.push(`/dashboard/checkout?plan=${planToUse}${planToUse !== 'subscription' ? `&kilos=${kilosToUse}` : ''}`);
      } else if (returnUrl) {
        // If there's a return URL but no plan or product, redirect there
        router.push(returnUrl);
      } else if (pathname?.startsWith('/auth/')) {
        // If on auth page with no specific redirect, go to dashboard
        router.push('/dashboard');
      }
    }
  }, [user, loading, pathname, router, searchParams]);

  // Define updateUser function
  const handleUpdateUser = async (userData: Partial<User>): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await updateUserProfile(userData);
      
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setError(response.error || 'Update failed');
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Define updateProfile function
  const handleUpdateProfile = async (profileData: Partial<User>): Promise<AuthResponse> => {
    return handleUpdateUser(profileData);
  };

  const login = async (email: string, password: string, redirectPath?: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await signIn(email, password);
      
      if (response.success && response.user) {
        setUser(response.user);
        
        // If a specific redirect path is provided, store it for the useEffect to handle
        if (redirectPath) {
          if (redirectPath.includes('plan=')) {
            // Extract and store plan details for redirection
            const url = new URL(`http://dummy.com${redirectPath}`);
            const plan = url.searchParams.get('plan');
            const kilos = url.searchParams.get('kilos');
            
            if (plan) localStorage.setItem('selectedPlan', plan);
            if (kilos) localStorage.setItem('defaultKilos', kilos);
          }
          else if (redirectPath.includes('product=')) {
            // Extract and store product details for redirection
            const url = new URL(`http://dummy.com${redirectPath}`);
            const product = url.searchParams.get('product');
            
            if (product) {
              router.push(`/dashboard/checkout?product=${product}`);
            }
          }
        }
      } else {
        setError(response.error || 'Login failed');
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: NewUser, redirectPath?: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await signUp(userData);
      
      if (response.success && response.user) {
        setUser(response.user);
        
        // If a specific redirect path is provided, store it for the useEffect to handle
        if (redirectPath) {
          if (redirectPath.includes('plan=')) {
            // Extract and store plan details for redirection
            const url = new URL(`http://dummy.com${redirectPath}`);
            const plan = url.searchParams.get('plan');
            const kilos = url.searchParams.get('kilos');
            
            if (plan) localStorage.setItem('selectedPlan', plan);
            if (kilos) localStorage.setItem('defaultKilos', kilos);
          }
        }
      } else {
        setError(response.error || 'Registration failed');
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      await signOut();
      setUser(null);
      // Redirect to login page after logout
      router.push('/auth/login');
    } catch (err) {
      setError('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser: handleUpdateUser,
        updateProfile: handleUpdateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}