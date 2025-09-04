import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  // logica para validar senha
  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  // Lógica para criar um novo usuário
  async create(createUserDto: any): Promise<User> {
    // função para verificar se o email existe no bd
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }
    //2.CRIPTOGRAFAR A SENHA
    // O '12' é o "custo" do salt (quanto maior, mais seguro porém mais lento)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    // 4. CRIAR O USER
    const newUser = this.usersRepository.create({
      email: createUserDto.email,
      encrypted_password: hashedPassword,
    });

    //SALVA O USER
    const savedUser = await this.usersRepository.save(newUser);

    // 2. DEPOIS: Criar e salvar o PROFILE com o user_id
    const userProfile = this.userProfileRepository.create({
      user_id: savedUser.id, // ← ID do user JÁ SALVO
      full_name: createUserDto.full_name,
      phone: createUserDto.phone || null,
      is_active: true,
    });
    await this.userProfileRepository.save(userProfile);

    return await this.usersRepository.findOne({
      where: { id: savedUser.id },
      relations: ['profile'],
    });
  }
  // Lógica para achar um e-mail especifico
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
