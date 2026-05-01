import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { VisitaObra } from '../visitas-obra/entities/visita-obra.entity';
import { SolicitudesCambioController } from './controllers/solicitudes-cambio.controller';
import { SolicitudCambio } from './entities/solicitud-cambio.entity';
import { SolicitudesCambioService } from './services/solicitudes-cambio.service';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudCambio, Proyecto, VisitaObra])],
  controllers: [SolicitudesCambioController],
  providers: [SolicitudesCambioService],
  exports: [SolicitudesCambioService],
})
export class SolicitudesCambioModule {}