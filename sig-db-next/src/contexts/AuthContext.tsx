'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginData } from '@/types';
import { authService } from '@/services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        // 1. TENTA BUSCAR DADOS SALVOS
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        // 2. SE ENCONTRAR, ATUALIZA O ESTADO
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser)); 
        }
      } catch (error) {
        // 3. SE ALGO DER ERRADO (ex: JSON inválido)
        console.error('Erro ao inicializar autenticação:', error);
        authService.logout(); // Limpa qualquer dado potencialmente corrompido
      } finally {
        // Limpa qualquer dado potencialmente corrompido
        setIsLoading(false); // Crucial: tira o spinner de carregamento
      }
    };

    initializeAuth(); // Chama a função dentro do efeito
  }, []);

  const login = async (loginData: LoginData) => {
    try {
      // 1. Chama o serviço de autenticação
      const response = await authService.login(loginData);
      // 2. Atualiza o Estado Global (Contexto)
      setToken(response.access_token);
      setUser(response.user);
      
      // Salva no localStorage
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Se "Lembrar-me" estiver marcado, mantém por mais tempo
      if (loginData.rememberMe) {
        // Poderia usar cookies para persistência mais longa
        console.log('Usuário escolheu ser lembrado');
      }
    } catch (error) {
      throw new Error('Falha no login. Verifique suas credenciais.');
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};