import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ActualizarTipoProyectoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}