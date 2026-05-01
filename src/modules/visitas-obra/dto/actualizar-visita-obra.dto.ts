import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class ActualizarVisitaObraDto {
  @IsOptional()
  @IsInt()
  proyectoId?: number;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsString()
  horaInicio?: string;

  @IsOptional()
  @IsString()
  horaFin?: string;

  @IsOptional()
  @IsString()
  clima?: string;

  @IsOptional()
  @IsString()
  temperatura?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsString()
  incidencias?: string;

  @IsOptional()
  @IsString()
  accionesCorrectivas?: string;

  @IsOptional()
  @IsArray()
  trabajadoresIds?: number[];

  @IsOptional()
  @IsArray()
  materialesIds?: number[];

  @IsOptional()
  @IsArray()
  ramasTrabajoIds?: number[];

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}