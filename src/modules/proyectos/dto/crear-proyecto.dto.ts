import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CrearProyectoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsInt()
  clienteId: number;

  @IsInt()
  contratistaId: number;

  @IsArray()
  @ArrayNotEmpty()
  empleadosIds: number[];

  @IsArray()
  @ArrayNotEmpty()
  tiposProyectoIds: number[];
}