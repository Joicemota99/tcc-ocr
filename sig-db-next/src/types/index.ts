// src/types/index.ts
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'sales' | 'stock' | 'accountant';
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