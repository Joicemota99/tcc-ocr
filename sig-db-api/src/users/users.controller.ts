// src/users/users.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.create(createUserDto);
      const { encrypted_password, ...result } = user;
      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: result,
      });
    } catch (error) {
      // ⚠️ IMPORTANTE: Tratar o erro!
      return res.status(error.status || 500).json({
        message: error.message || 'Erro interno do servidor',
      });
    }
  }
}
