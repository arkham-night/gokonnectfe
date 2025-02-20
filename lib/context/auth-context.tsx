'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { User, AuthResponse, LoginRequest, SignupRequest } from '../types/auth-types';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  signup: (data: SignupRequest) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = {
        success: true,
        message: 'Welcome back!',
        user: MOCK_USER,
        token: 'test-token',
      };

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

  const signup = async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = {
        success: true,
        message: 'Welcome to GoKonnect!',
        user: MOCK_USER,
        token: 'test-token',
      };

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

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

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