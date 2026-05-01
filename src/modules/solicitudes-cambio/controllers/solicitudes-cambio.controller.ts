import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActualizarSolicitudCambioDto } from '../dto/actualizar-solicitud-cambio.dto';
import { CrearSolicitudCambioDto } from '../dto/crear-solicitud-cambio.dto';
import { DecisionSolicitudCambioDto } from '../dto/decision-solicitud-cambio.dto';
import { SolicitudesCambioService } from '../services/solicitudes-cambio.service';

@UseGuards(AuthGuard('jwt'))
@Controller('solicitudes-cambio')
export class SolicitudesCambioController {
  constructor(
    private readonly solicitudesCambioService: SolicitudesCambioService,
  ) {}

  @Post()
  crear(@Body() data: CrearSolicitudCambioDto) {
    return this.solicitudesCambioService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.solicitudesCambioService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudesCambioService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarSolicitudCambioDto,
  ) {
    return this.solicitudesCambioService.actualizar(id, data);
  }

  @Patch(':id/aprobar')
  aprobar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: DecisionSolicitudCambioDto,
  ) {
    return this.solicitudesCambioService.aprobar(id, data);
  }

  @Patch(':id/rechazar')
  rechazar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: DecisionSolicitudCambioDto,
  ) {
    return this.solicitudesCambioService.rechazar(id, data);
  }

  @Patch(':id/solicitar-modificacion')
  solicitarModificacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: DecisionSolicitudCambioDto,
  ) {
    return this.solicitudesCambioService.solicitarModificacion(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.solicitudesCambioService.eliminar(id);
  }
}