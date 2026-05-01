import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { PartidaPresupuestaria } from '../presupuestos/entities/partida-presupuestaria.entity';
import { GastosController } from './controllers/gastos.controller';
import { Gasto } from './entities/gasto.entity';
import { GastosService } from './services/gastos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto, Proyecto, PartidaPresupuestaria])],
  controllers: [GastosController],
  providers: [GastosService],
  exports: [GastosService],
})
export class GastosModule {}