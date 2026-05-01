import { IsNotEmpty, IsString } from 'class-validator';

export class DecisionSolicitudCambioDto {
  @IsString()
  @IsNotEmpty()
  observaciones: string;
}