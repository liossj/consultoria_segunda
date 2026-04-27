import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class ActualizarEmpresaContratistaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}