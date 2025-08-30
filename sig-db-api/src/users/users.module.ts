// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // Importe a Entity
import { UsersService } from './users.service'; // Já deve estar aqui
import { UsersController } from './users.controller';

@Module({
  // Importe o TypeOrmModule e forneça a lista de entities deste módulo
  imports: [TypeOrmModule.forFeature([User])],
  // Torne o UsersService disponível para outros módulos que importarem este
  providers: [UsersService],
  // Exporte o TypeOrmModule (com a entity User) e o UsersService
  // para que possam ser usados por outros módulos (ex: o módulo de Auth)
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
