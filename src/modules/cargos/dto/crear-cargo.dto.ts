import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CrearCargoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}