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
import { ActualizarClienteDto } from '../dto/actualizar-cliente.dto';
import { CrearClienteDto } from '../dto/crear-cliente.dto';
import { ClientesService } from '../services/clientes.service';

@UseGuards(AuthGuard('jwt'))
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  crear(@Body() data: CrearClienteDto) {
    return this.clientesService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.clientesService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarClienteDto,
  ) {
    return this.clientesService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.eliminar(id);
  }
}