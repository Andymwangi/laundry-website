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
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error:', errorData);
      return { 
        success: false, 
        error: errorData.error || 'Failed to login. Please check your credentials.' 
      };
    }

    const data = await response.json();
    console.log('Login success response:', data);
    
    return {
      success: true,
      user: data.user
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
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
// Make sure there are no syntax errors in the export statement
export async function updateUserProfile(userData: Partial<User>): Promise<AuthResponse> {
  try {
    // Implementation depends on your API
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to update profile' };
    }
    
    return { success: true, user: data.user };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}
