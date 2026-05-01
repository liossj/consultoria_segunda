import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { PresupuestosController } from './controllers/presupuestos.controller';
import { PartidaPresupuestaria } from './entities/partida-presupuestaria.entity';
import { Presupuesto } from './entities/presupuesto.entity';
import { PresupuestosService } from './services/presupuestos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Presupuesto, PartidaPresupuestaria, Proyecto]),
  ],
  controllers: [PresupuestosController],
  providers: [PresupuestosService],
  exports: [PresupuestosService],
})
export class PresupuestosModule {}