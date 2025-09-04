// src/users/users.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users') // Define que as rotas deste controller terão o prefixo '/users'
export class UsersController {
  // Injeta o UsersService no controller através do construtor
  constructor(private readonly usersService: UsersService) {}

  // Define um endpoint POST para a rota '/users'
  @Post()
  // O decorator @Body() extrai os dados JSON do corpo da requisição
  async create(
    @Body() createUserData: { email: string; password: string },
  ): Promise<User> {
    // Chama o método 'create' do service, passando os dados recebidos
    return this.usersService.create({
      email: createUserData.email,
      encrypted_password: createUserData.password, // Em breve vamos criptografar!
    });
  }
}
