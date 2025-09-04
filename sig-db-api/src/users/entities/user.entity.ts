// src/users/entities/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity('users') // Nome da tabela no banco de dados
export class User {
  @PrimaryGeneratedColumn('uuid') // ID único do tipo UUID
  id: string;

  @Column({ type: 'varchar', unique: true }) // Email único
  email: string;

  @Column({ type: 'varchar' }) // Senha criptografada
  encrypted_password: string;

  // RELAÇÃO One-to-One inversa
  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile; // Esta propriedade É USADA

  @CreateDateColumn({ name: 'created_at' }) // Data de criação
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Data de atualização
  updatedAt: Date;
}
