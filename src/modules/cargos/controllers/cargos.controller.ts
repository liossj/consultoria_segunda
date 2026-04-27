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
import { ActualizarCargoDto } from '../dto/actualizar-cargo.dto';
import { CrearCargoDto } from '../dto/crear-cargo.dto';
import { CargosService } from '../services/cargos.service';

@UseGuards(AuthGuard('jwt'))
@Controller('cargos')
export class CargosController {
  constructor(private readonly cargosService: CargosService) {}

  @Post()
  crear(@Body() data: CrearCargoDto) {
    return this.cargosService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.cargosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.cargosService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarCargoDto,
  ) {
    return this.cargosService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.cargosService.eliminar(id);
  }
}