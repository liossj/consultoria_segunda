import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrearAprobacionCambioDto } from '../dto/crear-aprobacion-cambio.dto';
import { AprobacionesCambioService } from '../services/aprobaciones-cambio.service';

@UseGuards(AuthGuard('jwt'))
@Controller('aprobaciones-cambio')
export class AprobacionesCambioController {
  constructor(
    private readonly aprobacionesCambioService: AprobacionesCambioService,
  ) {}

  @Post()
  registrarDecision(@Body() data: CrearAprobacionCambioDto) {
    return this.aprobacionesCambioService.registrarDecision(data);
  }

  @Get()
  obtenerTodos() {
    return this.aprobacionesCambioService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.aprobacionesCambioService.obtenerPorId(id);
  }
}