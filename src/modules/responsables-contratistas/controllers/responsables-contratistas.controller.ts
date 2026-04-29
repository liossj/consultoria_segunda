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
import { ActualizarResponsableContratistaDto } from '../dto/actualizar-responsable-contratista.dto';
import { CrearResponsableContratistaDto } from '../dto/crear-responsable-contratista.dto';
import { ResponsablesContratistasService } from '../services/responsables-contratistas.service';

@UseGuards(AuthGuard('jwt'))
@Controller('responsables-contratistas')
export class ResponsablesContratistasController {
  constructor(
    private readonly responsablesContratistasService: ResponsablesContratistasService,
  ) {}

  @Post()
  crear(@Body() data: CrearResponsableContratistaDto) {
    return this.responsablesContratistasService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.responsablesContratistasService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.responsablesContratistasService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarResponsableContratistaDto,
  ) {
    return this.responsablesContratistasService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.responsablesContratistasService.eliminar(id);
  }
}