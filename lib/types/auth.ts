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

// Our test friend! 🎮
const MOCK_USER: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
  phoneNumber: '123-456-7890',
  preferences: {
    preferredDriverPersonality: 'chatty',
    preferredLanguages: [{ code: 'en', name: 'English' }],
  },
};

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

  // Login function - super simple!
  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      // Wait 1 second to pretend we're checking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always let them in with our test friend!
      const result = {
        success: true,
        message: 'Welcome back!',
        user: MOCK_USER,
        token: 'test-token',
      };

      // Save their login info
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);

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

  // Signup function - also super simple!
  const signup = async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      // Wait 1 second to pretend we're signing up
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always succeed with our test friend!
      const result = {
        success: true,
        message: 'Welcome to GoKonnect!',
        user: MOCK_USER,
        token: 'test-token',
      };

      // Save their info
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);

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