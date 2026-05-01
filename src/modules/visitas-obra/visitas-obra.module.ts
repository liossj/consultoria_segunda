import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from '../materiales/entities/material.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { RamaTrabajo } from '../rama-trabajo/entities/rama-trabajo.entity';
import { TrabajadorObra } from '../trabajadores-obra/entities/trabajador-obra.entity';
import { VisitaObra } from './entities/visita-obra.entity';
import { VisitasObraController } from './controllers/visitas-obra.controller';
import { VisitasObraService } from './services/visitas-obra.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VisitaObra,
      Proyecto,
      TrabajadorObra,
      Material,
      RamaTrabajo,
    ]),
  ],
  controllers: [VisitasObraController],
  providers: [VisitasObraService],
  exports: [VisitasObraService],
})
export class VisitasObraModule {}