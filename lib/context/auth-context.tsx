'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { User, AuthResponse, LoginRequest, SignupRequest } from '../types/auth';

// What our auth context can do
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  signup: (data: SignupRequest) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This helps us use auth in other components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// The provider that wraps our app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      // TODO: Replace with your actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Login failed',
        user: null,
        token: '',
      };
    }
  };

  // Signup function
  const signup = async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      // TODO: Replace with your actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: 'Signup failed',
        user: null,
        token: '',
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // The value we'll share with our components
  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}