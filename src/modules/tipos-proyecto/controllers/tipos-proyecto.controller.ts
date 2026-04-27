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
import { CrearTipoProyectoDto } from '../dto/crear-tipo-proyecto.dto';
import { ActualizarTipoProyectoDto } from '../dto/actualizar-tipo-proyecto.dto';
import { TiposProyectoService } from '../services/tipos-proyecto.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tipos-proyecto')
export class TiposProyectoController {
  constructor(private readonly service: TiposProyectoService) {}

  @Post()
  crear(@Body() data: CrearTipoProyectoDto) {
    return this.service.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.service.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.service.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarTipoProyectoDto,
  ) {
    return this.service.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }
}