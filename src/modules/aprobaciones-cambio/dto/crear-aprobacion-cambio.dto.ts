import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CrearAprobacionCambioDto {
  @IsInt()
  solicitudCambioId: number;

  @IsInt()
  usuarioResponsableId: number;

  @IsString()
  @IsNotEmpty()
  decision: string;

  @IsString()
  @IsNotEmpty()
  observaciones: string;
}