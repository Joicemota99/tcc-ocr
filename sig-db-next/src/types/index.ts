// src/types/index.ts
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'sales' | 'stock' | 'accountant';
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'sales' | 'stock' | 'accountant';
  status: 'active' | 'inactive';
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  role?: 'admin' | 'sales' | 'stock' | 'accountant';
  status?: 'active' | 'inactive';
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}