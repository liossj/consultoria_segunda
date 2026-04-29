import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearRamaTrabajoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}