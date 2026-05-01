import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudCambio } from '../../solicitudes-cambio/entities/solicitud-cambio.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { CrearAprobacionCambioDto } from '../dto/crear-aprobacion-cambio.dto';
import { AprobacionCambio } from '../entities/aprobacion-cambio.entity';

@Injectable()
export class AprobacionesCambioService {
  constructor(
    @InjectRepository(AprobacionCambio)
    private readonly aprobacionesRepository: Repository<AprobacionCambio>,

    @InjectRepository(SolicitudCambio)
    private readonly solicitudesRepository: Repository<SolicitudCambio>,

    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async registrarDecision(data: CrearAprobacionCambioDto) {
    const solicitud = await this.solicitudesRepository.findOne({
      where: { id: data.solicitudCambioId },
    });

    if (!solicitud) {
      throw new NotFoundException('Solicitud de cambio no encontrada');
    }

    if (solicitud.estado !== 'En evaluación') {
      throw new BadRequestException(
        'Solo se pueden decidir solicitudes en evaluación',
      );
    }

    const usuario = await this.usuariosRepository.findOne({
      where: { id: data.usuarioResponsableId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario responsable no encontrado');
    }

    const decisionesValidas = ['Aprobada', 'Rechazada', 'En revisión'];

    if (!decisionesValidas.includes(data.decision)) {
      throw new BadRequestException(
        'La decisión debe ser: Aprobada, Rechazada o En revisión',
      );
    }

    solicitud.estado = data.decision;
    solicitud.observacionesRevision = data.observaciones;
    solicitud.fechaDecision = new Date();

    await this.solicitudesRepository.save(solicitud);

    const aprobacion = this.aprobacionesRepository.create({
      solicitudCambio: solicitud,
      usuarioResponsable: usuario,
      decision: data.decision,
      observaciones: data.observaciones,
    });

    return await this.aprobacionesRepository.save(aprobacion);
  }

  async obtenerTodos() {
    return await this.aprobacionesRepository.find({
      relations: ['solicitudCambio', 'usuarioResponsable'],
    });
  }

  async obtenerPorId(id: number) {
    const aprobacion = await this.aprobacionesRepository.findOne({
      where: { id },
      relations: ['solicitudCambio', 'usuarioResponsable'],
    });

    if (!aprobacion) {
      throw new NotFoundException('Aprobación de cambio no encontrada');
    }

    return aprobacion;
  }
}