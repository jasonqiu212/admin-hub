import { Models } from 'appwrite';

// Use Appwrite's User model
export type User = Models.User<Models.Preferences>;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
