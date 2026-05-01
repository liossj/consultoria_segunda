import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { VisitaObra } from '../../visitas-obra/entities/visita-obra.entity';
import { ActualizarSolicitudCambioDto } from '../dto/actualizar-solicitud-cambio.dto';
import { CrearSolicitudCambioDto } from '../dto/crear-solicitud-cambio.dto';
import { DecisionSolicitudCambioDto } from '../dto/decision-solicitud-cambio.dto';
import { SolicitudCambio } from '../entities/solicitud-cambio.entity';

@Injectable()
export class SolicitudesCambioService {
  constructor(
    @InjectRepository(SolicitudCambio)
    private readonly solicitudesRepository: Repository<SolicitudCambio>,

    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(VisitaObra)
    private readonly visitasRepository: Repository<VisitaObra>,
  ) {}

  private async obtenerProyectoActivo(id: number) {
    const proyecto = await this.proyectosRepository.findOne({
      where: { id, estado: 'Activo' },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado o inactivo');
    }

    return proyecto;
  }

  private async obtenerVisita(id?: number) {
    if (!id) return undefined;

    const visita = await this.visitasRepository.findOne({
      where: { id, estado: true },
    });

    if (!visita) {
      throw new NotFoundException('Visita de obra no encontrada o inactiva');
    }

    return visita;
  }

  async crear(data: CrearSolicitudCambioDto) {
    const proyecto = await this.obtenerProyectoActivo(data.proyectoId);
    const visitaObra = data.visitaObraId
      ? await this.obtenerVisita(data.visitaObraId)
      : undefined;

    const solicitud = this.solicitudesRepository.create({
      nombre: data.nombre,
      justificacion: data.justificacion,
      prioridad: data.prioridad,
      impactoEconomico: data.impactoEconomico,
      impactoTiempo: data.impactoTiempo,
      estado: 'En evaluación',
      proyecto,
      visitaObra,
    });

    return await this.solicitudesRepository.save(solicitud);
  }

  async obtenerTodos() {
    return await this.solicitudesRepository.find({
      relations: ['proyecto', 'visitaObra'],
    });
  }

  async obtenerPorId(id: number) {
    const solicitud = await this.solicitudesRepository.findOne({
      where: { id },
      relations: ['proyecto', 'visitaObra'],
    });

    if (!solicitud) {
      throw new NotFoundException('Solicitud de cambio no encontrada');
    }

    return solicitud;
  }

  async actualizar(id: number, data: ActualizarSolicitudCambioDto) {
    const solicitud = await this.obtenerPorId(id);

    if (solicitud.estado !== 'En evaluación') {
      throw new BadRequestException(
        'Solo se pueden modificar solicitudes en evaluación',
      );
    }

    if (data.proyectoId) {
      solicitud.proyecto = await this.obtenerProyectoActivo(data.proyectoId);
    }

    if (data.visitaObraId) {
      solicitud.visitaObra = await this.obtenerVisita(data.visitaObraId);
    }

    Object.assign(solicitud, {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.justificacion && { justificacion: data.justificacion }),
      ...(data.prioridad && { prioridad: data.prioridad }),
      ...(data.impactoEconomico !== undefined && {
        impactoEconomico: data.impactoEconomico,
      }),
      ...(data.impactoTiempo && { impactoTiempo: data.impactoTiempo }),
      ...(data.estado && { estado: data.estado }),
    });

    return await this.solicitudesRepository.save(solicitud);
  }

  async aprobar(id: number, data: DecisionSolicitudCambioDto) {
    const solicitud = await this.obtenerPorId(id);

    solicitud.estado = 'Aprobada';
    solicitud.observacionesRevision = data.observaciones;
    solicitud.fechaDecision = new Date();

    return await this.solicitudesRepository.save(solicitud);
  }

  async rechazar(id: number, data: DecisionSolicitudCambioDto) {
    const solicitud = await this.obtenerPorId(id);

    solicitud.estado = 'Rechazada';
    solicitud.observacionesRevision = data.observaciones;
    solicitud.fechaDecision = new Date();

    return await this.solicitudesRepository.save(solicitud);
  }

  async solicitarModificacion(id: number, data: DecisionSolicitudCambioDto) {
    const solicitud = await this.obtenerPorId(id);

    solicitud.estado = 'En revisión';
    solicitud.observacionesRevision = data.observaciones;
    solicitud.fechaDecision = new Date();

    return await this.solicitudesRepository.save(solicitud);
  }

  async eliminar(id: number) {
    const solicitud = await this.obtenerPorId(id);

    if (solicitud.estado !== 'En evaluación') {
      throw new BadRequestException(
        'Solo se pueden eliminar solicitudes que aún están en evaluación',
      );
    }

    return await this.solicitudesRepository.remove(solicitud);
  }
}