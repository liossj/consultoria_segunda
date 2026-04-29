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
import { ActualizarRamaTrabajoDto } from '../dto/actualizar-rama-trabajo.dto';
import { CrearRamaTrabajoDto } from '../dto/crear-rama-trabajo.dto';
import { RamaTrabajoService } from '../services/rama-trabajo.service';

@UseGuards(AuthGuard('jwt'))
@Controller('rama-trabajo')
export class RamaTrabajoController {
  constructor(private readonly ramaTrabajoService: RamaTrabajoService) {}

  @Post()
  crear(@Body() data: CrearRamaTrabajoDto) {
    return this.ramaTrabajoService.crear(data);
  }

  @Get()
  obtenerTodos() {
    return this.ramaTrabajoService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return this.ramaTrabajoService.obtenerPorId(id);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ActualizarRamaTrabajoDto,
  ) {
    return this.ramaTrabajoService.actualizar(id, data);
  }

  @Patch(':id/eliminar')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.ramaTrabajoService.eliminar(id);
  }
}