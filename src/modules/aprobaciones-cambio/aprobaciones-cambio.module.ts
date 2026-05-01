import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudCambio } from '../solicitudes-cambio/entities/solicitud-cambio.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { AprobacionesCambioController } from './controllers/aprobaciones-cambio.controller';
import { AprobacionCambio } from './entities/aprobacion-cambio.entity';
import { AprobacionesCambioService } from './services/aprobaciones-cambio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AprobacionCambio, SolicitudCambio, Usuario]),
  ],
  controllers: [AprobacionesCambioController],
  providers: [AprobacionesCambioService],
  exports: [AprobacionesCambioService],
})
export class AprobacionesCambioModule {}