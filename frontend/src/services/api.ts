import axios from 'axios';
import { User, UserCreate, UserUpdate, MatchFilters, MatchResponse, LoginCredentials, RegisterCredentials } from '../types';

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User API calls
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users/');
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: UserCreate): Promise<User> => {
  const response = await api.post('/users/', userData);
  return response.data;
};

export const updateUser = async (id: number, userData: UserUpdate): Promise<User> => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const getMatches = async (userId: number, filters?: MatchFilters): Promise<MatchResponse> => {
  const params = new URLSearchParams();
  
  if (filters) {
    if (filters.min_age) params.append('min_age', filters.min_age.toString());
    if (filters.max_age) params.append('max_age', filters.max_age.toString());
    if (filters.city) params.append('city', filters.city);
    if (filters.interest_match !== undefined) params.append('interest_match', filters.interest_match.toString());
  }
  
  const response = await api.get(`/users/${userId}/matches?${params.toString()}`);
  return response.data;
};

// Authentication API calls (mock for now since backend doesn't have auth endpoints)
export const login = async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
  // In a real app, this would call the backend login endpoint
  // For now, we'll simulate a login by getting a user with matching email
  const users = await getUsers();
  const user = users.find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Generate a mock token
  const token = `mock_token_${user.id}_${Date.now()}`;
  
  return { token, user };
};

export const register = async (userData: RegisterCredentials): Promise<{ token: string; user: User }> => {
  // In a real app, this would call the backend register endpoint
  // For now, we'll simulate registration by creating a new user
  const { password, ...userCreateData } = userData;
  const user = await createUser(userCreateData as UserCreate);
  
  // Generate a mock token
  const token = `mock_token_${user.id}_${Date.now()}`;
  
  return { token, user };
};

export default api; 