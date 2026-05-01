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
import { ActualizarPresupuestoDto } from '../dto/actualizar-presupuesto.dto';
import { CrearPresupuestoDto } from '../dto/crear-presupuesto.dto';
import { PresupuestosService } from '../services/presupuestos.service';

@UseGuards(AuthGuard('jwt'))
@Controller('presupuestos')
export class PresupuestosController {
  constructor(private readonly presupuestosService: PresupuestosService) {}

  @Post()
  crear(@Body() data: CrearPresupuestoDto) {
    return this.presupuestosService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.presupuestosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestosService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarPresupuestoDto,
  ) {
    return this.presupuestosService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.presupuestosService.eliminar(id);
  }
}