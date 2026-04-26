import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ActualizarUsuarioDto } from '../dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { UsuariosService } from '../services/usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() data: CrearUsuarioDto) {
    return this.usuariosService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarUsuarioDto,
  ) {
    return this.usuariosService.actualizar(id, data);
  }
}