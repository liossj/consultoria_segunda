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
import { ActualizarGastoDto } from '../dto/actualizar-gasto.dto';
import { CrearGastoDto } from '../dto/crear-gasto.dto';
import { GastosService } from '../services/gastos.service';

@UseGuards(AuthGuard('jwt'))
@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post()
  crear(@Body() data: CrearGastoDto) {
    return this.gastosService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.gastosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.gastosService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarGastoDto,
  ) {
    return this.gastosService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.gastosService.eliminar(id);
  }
}