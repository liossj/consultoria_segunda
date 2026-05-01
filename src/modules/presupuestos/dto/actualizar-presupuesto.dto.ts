import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ActualizarPartidaPresupuestariaDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  montoEstimado?: number;
}

export class ActualizarPresupuestoDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  montoTotalEstimado?: number;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActualizarPartidaPresupuestariaDto)
  partidas?: ActualizarPartidaPresupuestariaDto[];
}