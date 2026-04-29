import { IsBoolean, IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class ActualizarResponsableContratistaDto {
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
  especialidad?: string;

  @IsOptional()
  @IsInt()
  empresaId?: number;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}