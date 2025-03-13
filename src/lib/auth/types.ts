export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface NewUser {
    name: string;
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    user?: User;
    error?: string;
  }