import { api } from './api';
import { User, CreateUserData, UpdateUserData } from '@/types';

export const userService = {
    // Buscar todos os usuários
    getAll: async (): Promise<User[]> => {
        const response = await api.get('/users');
        return response.data
    },

    // Criar novo Usuário
    create: async(userData: CreateUserData): Promise<User> => {
        
    }
}