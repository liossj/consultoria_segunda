import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportesService } from '../services/reportes.service';

@UseGuards(AuthGuard('jwt'))
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Get('resumen-general')
  resumenGeneral() {
    return this.reportesService.resumenGeneral();
  }

  @Get('financiero/proyecto/:id')
  reporteFinancieroProyecto(@Param('id', ParseIntPipe) id: number) {
    return this.reportesService.reporteFinancieroProyecto(id);
  }

  @Get('solicitudes-cambio')
  reporteSolicitudesCambio() {
    return this.reportesService.reporteSolicitudesCambio();
  }

  @Get('proyecto/:id')
  reporteProyecto(@Param('id', ParseIntPipe) id: number) {
    return this.reportesService.reporteProyecto(id);
  }
}