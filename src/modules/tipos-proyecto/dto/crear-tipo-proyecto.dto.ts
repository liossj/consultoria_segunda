import { IsNotEmpty, IsString } from 'class-validator';

export class CrearTipoProyectoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}