import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class ActualizarTrabajadorObraDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsInt()
  ramaTrabajoId?: number;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}