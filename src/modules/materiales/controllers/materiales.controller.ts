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
import { ActualizarMaterialDto } from '../dto/actualizar-material.dto';
import { CrearMaterialDto } from '../dto/crear-material.dto';
import { MaterialesService } from '../services/materiales.service';

@UseGuards(AuthGuard('jwt'))
@Controller('materiales')
export class MaterialesController {
  constructor(private readonly materialesService: MaterialesService) {}

  @Post()
  crear(@Body() data: CrearMaterialDto) {
    return this.materialesService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.materialesService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.materialesService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarMaterialDto,
  ) {
    return this.materialesService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.materialesService.eliminar(id);
  }
}