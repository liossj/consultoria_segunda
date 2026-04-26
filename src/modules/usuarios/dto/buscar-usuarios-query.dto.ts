import { IsOptional, IsString } from 'class-validator';

export class BuscarUsuariosQueryDto {
  @IsOptional()
  @IsString()
  nombre?: string;
}