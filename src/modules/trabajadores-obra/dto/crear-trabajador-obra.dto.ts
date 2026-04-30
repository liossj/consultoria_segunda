import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CrearTrabajadorObraDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  especialidad: string;

  @IsInt()
  ramaTrabajoId: number;
}