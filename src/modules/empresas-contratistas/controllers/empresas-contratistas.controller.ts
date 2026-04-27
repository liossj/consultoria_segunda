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
import { ActualizarEmpresaContratistaDto } from '../dto/actualizar-empresa-contratista.dto';
import { CrearEmpresaContratistaDto } from '../dto/crear-empresa-contratista.dto';
import { EmpresasContratistasService } from '../services/empresas-contratistas.service';

@UseGuards(AuthGuard('jwt'))
@Controller('empresas-contratistas')
export class EmpresasContratistasController {
  constructor(
    private readonly empresasContratistasService: EmpresasContratistasService,
  ) {}

  @Post()
  crear(@Body() data: CrearEmpresaContratistaDto) {
    return this.empresasContratistasService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.empresasContratistasService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.empresasContratistasService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarEmpresaContratistaDto,
  ) {
    return this.empresasContratistasService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.empresasContratistasService.eliminar(id);
  }
}