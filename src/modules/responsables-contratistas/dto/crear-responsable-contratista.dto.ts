import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CrearResponsableContratistaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  especialidad: string;

  @IsInt()
  empresaId: number;
}