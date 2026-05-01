import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CrearPartidaPresupuestariaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  montoEstimado: number;
}

export class CrearPresupuestoDto {
  @IsInt()
  proyectoId: number;

  @IsNumber()
  @Min(0)
  montoTotalEstimado: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CrearPartidaPresupuestariaDto)
  partidas: CrearPartidaPresupuestariaDto[];
}