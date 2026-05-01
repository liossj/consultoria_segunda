import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrearInformeVisitaDto } from '../dto/crear-informe-visita.dto';
import { InformesVisitaService } from '../services/informes-visita.service';

@UseGuards(AuthGuard('jwt'))
@Controller('informes-visita')
export class InformesVisitaController {
  constructor(private readonly informesVisitaService: InformesVisitaService) {}

  @Post('generar')
  generar(@Body() data: CrearInformeVisitaDto) {
    return this.informesVisitaService.generar(data);
  }

  @Get()
  obtenerTodos() {
    return this.informesVisitaService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.informesVisitaService.obtenerPorId(id);
  }

  @Patch(':id/imprimir')
  marcarComoImpreso(@Param('id', ParseIntPipe) id: number) {
    return this.informesVisitaService.marcarComoImpreso(id);
  }
}