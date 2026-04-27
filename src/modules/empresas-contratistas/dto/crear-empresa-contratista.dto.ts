import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CrearEmpresaContratistaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;
}