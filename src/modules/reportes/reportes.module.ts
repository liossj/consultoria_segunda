import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Gasto } from '../gastos/entities/gasto.entity';
import { Presupuesto } from '../presupuestos/entities/presupuesto.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { SolicitudCambio } from '../solicitudes-cambio/entities/solicitud-cambio.entity';
import { VisitaObra } from '../visitas-obra/entities/visita-obra.entity';
import { ReportesController } from './controllers/reportes.controller';
import { ReportesService } from './services/reportes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Proyecto,
      Cliente,
      Gasto,
      Presupuesto,
      SolicitudCambio,
      VisitaObra,
    ]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}