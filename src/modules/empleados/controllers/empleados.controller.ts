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
import { ActualizarEmpleadoDto } from '../dto/actualizar-empleado.dto';
import { CrearEmpleadoDto } from '../dto/crear-empleado.dto';
import { EmpleadosService } from '../services/empleados.service';

@UseGuards(AuthGuard('jwt'))
@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  crear(@Body() data: CrearEmpleadoDto) {
    return this.empleadosService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.empleadosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.empleadosService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarEmpleadoDto,
  ) {
    return this.empleadosService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.empleadosService.eliminar(id);
  }
}