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
import { ActualizarTrabajadorObraDto } from '../dto/actualizar-trabajador-obra.dto';
import { CrearTrabajadorObraDto } from '../dto/crear-trabajador-obra.dto';
import { TrabajadoresObraService } from '../services/trabajadores-obra.service';

@UseGuards(AuthGuard('jwt'))
@Controller('trabajadores-obra')
export class TrabajadoresObraController {
  constructor(
    private readonly trabajadoresObraService: TrabajadoresObraService,
  ) {}

  @Post()
  crear(@Body() data: CrearTrabajadorObraDto) {
    return this.trabajadoresObraService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.trabajadoresObraService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.trabajadoresObraService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarTrabajadorObraDto,
  ) {
    return this.trabajadoresObraService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.trabajadoresObraService.eliminar(id);
  }
}