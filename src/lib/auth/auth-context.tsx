// @ts-nocheck
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getCurrentUser, signIn, signOut, signUp, updateUserProfile } from './client';
import { User, NewUser, AuthResponse } from './types';
import { useCart } from '@/components/cart/CartProvider';

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
  
  // We can't directly use useCart here due to the component hierarchy
  // We'll create a function to clear the cart through localStorage instead
  const clearCartStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

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

  // We'll keep this for safety, but it shouldn't be needed anymore
  useEffect(() => {
    // Handle post-login redirection logic here
    // ... existing code ...
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
    console.log("Login function called with redirectPath:", redirectPath);
    
    try {
      const response = await signIn(email, password);
      console.log("Login API response:", response);
      
      if (response.success && response.user) {
        setUser(response.user);
        console.log("Setting user state:", response.user);
        
        // Explicitly redirect after successful login
        if (redirectPath) {
          console.log("Redirecting to:", redirectPath);
          if (redirectPath.includes('plan=')) {
            // Extract and store plan details for redirection
            const url = new URL(`http://dummy.com${redirectPath}`);
            const plan = url.searchParams.get('plan');
            const kilos = url.searchParams.get('kilos');
            
            if (plan) localStorage.setItem('selectedPlan', plan);
            if (kilos) localStorage.setItem('defaultKilos', kilos);
            
            // Direct redirection based on plan
            console.log(`Redirecting to checkout with plan=${plan}, kilos=${kilos}`);
            router.push(`/dashboard/checkout?plan=${plan}${kilos ? `&kilos=${kilos}` : ''}`);
          }
          else if (redirectPath.includes('product=')) {
            // Extract product details for redirection
            const url = new URL(`http://dummy.com${redirectPath}`);
            const product = url.searchParams.get('product');
            
            if (product) {
              // If redirectPath contains /dashboard/cart, go there directly
              if (redirectPath.includes('/dashboard/cart')) {
                console.log(`Redirecting to cart with product=${product}`);
                router.push(`/dashboard/cart?product=${product}`);
              } else {
                console.log(`Redirecting to checkout with product=${product}`);
                router.push(`/dashboard/checkout?product=${product}`);
              }
            }
          } else {
            // For other redirect paths
            console.log(`Redirecting to ${redirectPath}`);
            router.push(redirectPath);
          }
        } else {
          // Default redirect to dashboard
          console.log("No redirect path specified, going to dashboard");
          router.push('/dashboard');
        }
      } else {
        setError(response.error || 'Login failed');
        console.error("Login failed:", response.error);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error("Login error:", errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: NewUser, redirectPath?: string): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    console.log("Register function called with redirectPath:", redirectPath);
    
    try {
      const response = await signUp(userData);
      console.log("Register API response:", response);
      
      if (response.success && response.user) {
        setUser(response.user);
        console.log("Setting user state after registration:", response.user);
        
        // Explicitly redirect after successful registration
        if (redirectPath) {
          console.log("Redirecting to:", redirectPath);
          if (redirectPath.includes('plan=')) {
            // Extract and store plan details for redirection
            const url = new URL(`http://dummy.com${redirectPath}`);
            const plan = url.searchParams.get('plan');
            const kilos = url.searchParams.get('kilos');
            
            if (plan) localStorage.setItem('selectedPlan', plan);
            if (kilos) localStorage.setItem('defaultKilos', kilos);
            
            // Direct redirection based on plan
            console.log(`Redirecting to checkout with plan=${plan}, kilos=${kilos}`);
            router.push(`/dashboard/checkout?plan=${plan}${kilos ? `&kilos=${kilos}` : ''}`);
          } else if (redirectPath.includes('product=')) {
            // Extract product details for redirection
            const url = new URL(`http://dummy.com${redirectPath}`);
            const product = url.searchParams.get('product');
            
            if (product) {
              // If redirectPath contains /dashboard/cart, go there directly
              if (redirectPath.includes('/dashboard/cart')) {
                console.log(`Redirecting to cart with product=${product}`);
                router.push(`/dashboard/cart?product=${product}`);
              } else {
                console.log(`Redirecting to checkout with product=${product}`);
                router.push(`/dashboard/checkout?product=${product}`);
              }
            }
          } else {
            // For other redirect paths
            console.log(`Redirecting to ${redirectPath}`);
            router.push(redirectPath);
          }
        } else {
          // Default redirect to dashboard
          console.log("No redirect path specified, going to dashboard");
          router.push('/dashboard');
        }
      } else {
        setError(response.error || 'Registration failed');
        console.error("Registration failed:", response.error);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error("Registration error:", errorMessage);
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
      
      // Clear the cart when logging out
      clearCartStorage();
      
      // Redirect to login page after logout
      router.push('/auth/login');
      
      // Force a page reload to reset all states
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
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