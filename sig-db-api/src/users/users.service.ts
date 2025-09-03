import { Injectable, ConflictException } from '@nestjs/common';
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

  // logica para validar senha
  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  // Lógica para criar um novo usuário
  async create(userData: Partial<User>): Promise<User> {
    // função para verificar se o email existe no bd
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }
    //2.CRIPTOGRAFAR A SENHA
    // O '12' é o "custo" do salt (quanto maior, mais seguro porém mais lento)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(
      userData.encrypted_password,
      saltRounds,
    );

    // 3. CRIAR A NOVA INSTÂNCIA DO USUÁRIO COM A SENHA CRIPTOGRAFADA
    const newUser = this.usersRepository.create({
      ...userData, // Copia todos os dados (email, etc.)
      encrypted_password: hashedPassword, // Substitui a senha plain text pela versão criptografada
    });
    // 4. SALVAR NO BANCO DE DADOS
    return await this.usersRepository.save(newUser);
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
