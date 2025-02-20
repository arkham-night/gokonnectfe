export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  phoneNumber?: string;
  preferences?: {
    preferredDriverPersonality?: DriverPersonality;
    preferredLanguages?: Language[];
  };
}

export type DriverPersonality = 'chatty' | 'quiet';

export interface Language {
  code: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User | null;
  token: string;
}