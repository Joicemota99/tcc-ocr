import { Controller, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth') // Todas as rotas começarão com /auth
export class AuthController {
  // Injetar o AuthService no controller
  constructor(private authService: AuthService) {}

  // Rota: POST /auth/login
  @UseGuards(AuthGuard('local')) // Usa a estratégia local de autenticação
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    try {
      const result = await this.authService.login(req.user);

      // FORÇA o status 200 explicitamente
      return res.status(200).json(result);
    } catch (error) {
      // Em caso de erro, também retorna status controlado
      console.error('Erro no login:', error);
      return res.status(401).json({
        message: 'Erro durante o login',
        error: error.message,
      });
    }
  }
}
