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
import { ActualizarProyectoDto } from '../dto/actualizar-proyecto.dto';
import { CrearProyectoDto } from '../dto/crear-proyecto.dto';
import { ProyectosService } from '../services/proyectos.service';

@UseGuards(AuthGuard('jwt'))
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post()
  crear(@Body() data: CrearProyectoDto) {
    return this.proyectosService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.proyectosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarProyectoDto,
  ) {
    return this.proyectosService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.eliminar(id);
  }
}