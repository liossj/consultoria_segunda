import { IsDateString, IsInt } from 'class-validator';

export class CrearInformeVisitaDto {
  @IsInt()
  proyectoId: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;
}