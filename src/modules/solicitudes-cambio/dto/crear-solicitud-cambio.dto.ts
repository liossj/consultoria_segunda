import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CrearSolicitudCambioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  justificacion: string;

  @IsString()
  @IsNotEmpty()
  prioridad: string;

  @IsNumber()
  @Min(0)
  impactoEconomico: number;

  @IsOptional()
  @IsString()
  impactoTiempo?: string;

  @IsInt()
  proyectoId: number;

  @IsOptional()
  @IsInt()
  visitaObraId?: number;
}