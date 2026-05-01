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
import { ActualizarVisitaObraDto } from '../dto/actualizar-visita-obra.dto';
import { CrearVisitaObraDto } from '../dto/crear-visita-obra.dto';
import { VisitasObraService } from '../services/visitas-obra.service';

@UseGuards(AuthGuard('jwt'))
@Controller('visitas-obra')
export class VisitasObraController {
  constructor(private readonly visitasObraService: VisitasObraService) {}

  @Post()
  crear(@Body() data: CrearVisitaObraDto) {
    return this.visitasObraService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.visitasObraService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.visitasObraService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarVisitaObraDto,
  ) {
    return this.visitasObraService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.visitasObraService.eliminar(id);
  }
}