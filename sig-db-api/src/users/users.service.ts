import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // Lógica para criar um novo usuário 
  async create(userData: Partial<User>): Promise<User> {
    // função para verificar se o email existe no bd
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }
  }
  // Lógica para achar um e-mail especifico
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
  // Lógica para achar usuário pelo ID
  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
  
}
