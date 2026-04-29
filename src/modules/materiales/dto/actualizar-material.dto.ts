import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ActualizarMaterialDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  unidadMedida?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  costoUnitario?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stockActual?: number;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}