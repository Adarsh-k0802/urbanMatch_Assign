// User types
export interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  city: string;
  interests: Interest[];
}

export interface Interest {
  id: number;
  name: string;
}

export interface UserCreate {
  name: string;
  age: number;
  gender: string;
  email: string;
  city: string;
  interests: string[];
}

export interface UserUpdate {
  name?: string;
  age?: number;
  gender?: string;
  email?: string;
  city?: string;
  interests?: string[];
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  age: number;
  gender: string;
  city: string;
  interests: string[];
}

// Match types
export interface MatchResponse {
  matches: User[];
  match_count: number;
}

export interface MatchFilters {
  min_age?: number;
  max_age?: number;
  city?: string;
  interest_match?: boolean;
} 