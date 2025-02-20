// Types for users and authentication
export type UserRole = 'user' | 'admin';

// Driver personality type
export type DriverPersonality = 'chatty' | 'quiet';

// Languages a driver can speak
export type Language = {
  code: string;    // Like 'en', 'es'
  name: string;    // Like 'English', 'Spanish'
};

// User's special preferences
export type UserPreferences = {
  preferredDriverPersonality?: DriverPersonality;
  preferredLanguages?: Language[];
};

// What a user looks like in our app
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phoneNumber?: string;
  preferences?: UserPreferences;
}

// What we get back when someone logs in
export type AuthResponse = {
  user: User;
  token: string;
  success: boolean;
  message?: string;
};

// For making login requests
export type LoginRequest = {
  email: string;
  password: string;
};

// For making signup requests
export type SignupRequest = {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
};