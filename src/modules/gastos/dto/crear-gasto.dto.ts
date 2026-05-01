import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CrearGastoDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsNumber()
  @Min(0)
  monto: number;

  @IsInt()
  proyectoId: number;

  @IsInt()
  partidaId: number;
}