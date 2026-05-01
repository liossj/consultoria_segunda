import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CrearVisitaObraDto {
  @IsInt()
  proyectoId: number;

  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @IsString()
  @IsNotEmpty()
  clima: string;

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
}