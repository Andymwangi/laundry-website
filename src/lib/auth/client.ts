import { User, NewUser, AuthResponse } from './types';

export async function signUp(userData: NewUser): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { 
        success: false, 
        error: data.error || 'Registration failed' 
      };
    }
    
    return { success: true, user: data.user };
  } catch (error) {
    return { 
      success: false, 
      error: 'An unexpected error occurred' 
    };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { 
        success: false, 
        error: data.error || 'Login failed' 
      };
    }
    
    return { success: true, user: data.user };
  } catch (error) {
    return { 
      success: false, 
      error: 'An unexpected error occurred' 
    };
  }
}

export async function signOut(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/me');
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}
