import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ActualizarSolicitudCambioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  justificacion?: string;

  @IsOptional()
  @IsString()
  prioridad?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  impactoEconomico?: number;

  @IsOptional()
  @IsString()
  impactoTiempo?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsInt()
  proyectoId?: number;

  @IsOptional()
  @IsInt()
  visitaObraId?: number;
}