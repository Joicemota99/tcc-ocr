// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Método para validar o usuário durante o login
  async validateUser(email: string, password: string): Promise<any> {
    // 1. Encontrar o usuário pelo email
    const user = await this.usersService.findByEmail(email);

    // 2. Se o usuário existir, verificar a senha
    if (
      user &&
      (await this.usersService.validatePassword(
        password,
        user.encrypted_password,
      ))
    ) {
      // 3. Retorna os dados do usuário (sem a senha)
      const { encrypted_password, ...result } = user; // Remove a senha do resultado
      return result;
    }

    // 4. Se não passar na validação, retorna null
    return null;
  }

  // Método para fazer login e gerar o token JWT
  async login(user: any) {
    // Gera o token JWT com o payload { sub: user_id }
    const payload = {
      email: user.email,
      sub: user.id, // 'sub' é uma convenção do JWT para subject (identificador único)
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        // Retorna algumas informações básicas do usuário
        id: user.id,
        email: user.email,
      },
    };
  }
}
