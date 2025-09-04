// src/config/database.config.ts
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { UserProfile } from 'src/users/entities/user-profile.entity';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, UserProfile], // Padrão para encontrar todas as entities
    synchronize: true, // Sincroniza apenas em dev
    logging: true, // Descomente para ver as queries SQL no console (útil para debug)
  }),
);
