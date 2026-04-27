import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CrearClienteDto {
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
  ocupacion: string;
}