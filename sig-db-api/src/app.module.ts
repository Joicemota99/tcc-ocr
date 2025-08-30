import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import databaseConfig from './database/config/database.config';

@Module({
  imports: [
    // ConfigModule para carregar o .env
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis disponíveis globalmente
      load: [databaseConfig], // Carrega nossa configuração do banco
    }),
    // TypeOrmModule usando a configuração nomeada que criamos
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...databaseConfig(), // Espalha todas as propriedades da configuração
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
