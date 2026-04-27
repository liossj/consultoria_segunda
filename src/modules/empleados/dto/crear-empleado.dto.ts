import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CrearEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  carnet: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  correo: string;

  @IsDateString()
  fechaIngreso: string;

  @IsInt()
  cargoId: number;
}