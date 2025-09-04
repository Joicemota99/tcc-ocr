// src/users/types/create-user-input.type.ts
export interface CreateUserInput {
  email: string;
  encrypted_password: string; // Já criptografada
  profile: {
    full_name: string;
    phone?: string;
    is_active: boolean;
  };
}
