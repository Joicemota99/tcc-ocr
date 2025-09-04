import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Define que usaremos 'email' no lugar de 'username'
    });
  }

  // Este método é chamado automaticamente pelo Passport
  async validate(email: string, password: string): Promise<any> {
    // Delega a validação para o AuthService
    const user = await this.authService.validateUser(email, password);

    // Se o usuário não for encontrado ou a senha estiver errada
    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos.');
    }

    // Se estiver correto, retorna o usuário. O Passport anexa isso ao request.
    return user;
  }
}
