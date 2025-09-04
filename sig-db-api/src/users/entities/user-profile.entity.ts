import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles') // nome da tabela no bd
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Coluna para a chave estrangeira
  @Column({ type: 'uuid' })
  user_id: string;

  // RELAÇÃO One-to-One com User
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' }) // Define que user_id é a FK
  user: User; // Esta propriedade É USADA para acessar o usuário

  //coluna para criar e armazenar o nome completo
  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  //coluna para armazenar o telefone, o valor pode ser nulo (não obrigaório)
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  //coluna para armazenar o status do usuario
  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
