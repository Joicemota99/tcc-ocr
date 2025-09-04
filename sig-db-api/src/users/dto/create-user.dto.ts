// src/users/dto/create-user.dto.ts
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
