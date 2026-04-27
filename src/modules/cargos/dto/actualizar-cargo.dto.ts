import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ActualizarCargoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}