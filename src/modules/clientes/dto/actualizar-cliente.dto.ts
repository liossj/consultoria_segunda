import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class ActualizarClienteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  ocupacion?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}