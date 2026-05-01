import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Material } from '../../materiales/entities/material.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { RamaTrabajo } from '../../rama-trabajo/entities/rama-trabajo.entity';
import { TrabajadorObra } from '../../trabajadores-obra/entities/trabajador-obra.entity';
import { ActualizarVisitaObraDto } from '../dto/actualizar-visita-obra.dto';
import { CrearVisitaObraDto } from '../dto/crear-visita-obra.dto';
import { VisitaObra } from '../entities/visita-obra.entity';

@Injectable()
export class VisitasObraService {
  constructor(
    @InjectRepository(VisitaObra)
    private readonly visitasRepository: Repository<VisitaObra>,

    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(TrabajadorObra)
    private readonly trabajadoresRepository: Repository<TrabajadorObra>,

    @InjectRepository(Material)
    private readonly materialesRepository: Repository<Material>,

    @InjectRepository(RamaTrabajo)
    private readonly ramasRepository: Repository<RamaTrabajo>,
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

  private async obtenerTrabajadores(ids?: number[]) {
    if (!ids || ids.length === 0) return [];

    const trabajadores = await this.trabajadoresRepository.find({
      where: { id: In(ids), estado: true },
    });

    if (trabajadores.length !== ids.length) {
      throw new NotFoundException(
        'Uno o más trabajadores no existen o están inactivos',
      );
    }

    return trabajadores;
  }

  private async obtenerMateriales(ids?: number[]) {
    if (!ids || ids.length === 0) return [];

    const materiales = await this.materialesRepository.find({
      where: { id: In(ids), estado: true },
    });

    if (materiales.length !== ids.length) {
      throw new NotFoundException(
        'Uno o más materiales no existen o están inactivos',
      );
    }

    return materiales;
  }

  private async obtenerRamas(ids?: number[]) {
    if (!ids || ids.length === 0) return [];

    const ramas = await this.ramasRepository.find({
      where: { id: In(ids), estado: true },
    });

    if (ramas.length !== ids.length) {
      throw new NotFoundException(
        'Una o más ramas de trabajo no existen o están inactivas',
      );
    }

    return ramas;
  }

  async crear(data: CrearVisitaObraDto) {
    const proyecto = await this.obtenerProyectoActivo(data.proyectoId);
    const trabajadores = await this.obtenerTrabajadores(data.trabajadoresIds);
    const materiales = await this.obtenerMateriales(data.materialesIds);
    const ramasTrabajo = await this.obtenerRamas(data.ramasTrabajoIds);

    const visita = this.visitasRepository.create({
      proyecto,
      fecha: new Date(data.fecha),
      horaInicio: data.horaInicio,
      horaFin: data.horaFin,
      clima: data.clima,
      temperatura: data.temperatura,
      ubicacion: data.ubicacion,
      observaciones: data.observaciones,
      incidencias: data.incidencias,
      accionesCorrectivas: data.accionesCorrectivas,
      trabajadores,
      materiales,
      ramasTrabajo,
    });

    return await this.visitasRepository.save(visita);
  }

  async obtenerTodos() {
    return await this.visitasRepository.find({
      relations: ['proyecto', 'trabajadores', 'materiales', 'ramasTrabajo'],
    });
  }

  async obtenerPorId(id: number) {
    const visita = await this.visitasRepository.findOne({
      where: { id },
      relations: ['proyecto', 'trabajadores', 'materiales', 'ramasTrabajo'],
    });

    if (!visita) {
      throw new NotFoundException('Visita de obra no encontrada');
    }

    return visita;
  }

  async actualizar(id: number, data: ActualizarVisitaObraDto) {
    const visita = await this.obtenerPorId(id);

    if (data.proyectoId) {
      visita.proyecto = await this.obtenerProyectoActivo(data.proyectoId);
    }

    if (data.trabajadoresIds) {
      visita.trabajadores = await this.obtenerTrabajadores(data.trabajadoresIds);
    }

    if (data.materialesIds) {
      visita.materiales = await this.obtenerMateriales(data.materialesIds);
    }

    if (data.ramasTrabajoIds) {
      visita.ramasTrabajo = await this.obtenerRamas(data.ramasTrabajoIds);
    }

    Object.assign(visita, {
      ...(data.fecha && { fecha: new Date(data.fecha) }),
      ...(data.horaInicio && { horaInicio: data.horaInicio }),
      ...(data.horaFin && { horaFin: data.horaFin }),
      ...(data.clima && { clima: data.clima }),
      ...(data.temperatura && { temperatura: data.temperatura }),
      ...(data.ubicacion && { ubicacion: data.ubicacion }),
      ...(data.observaciones && { observaciones: data.observaciones }),
      ...(data.incidencias && { incidencias: data.incidencias }),
      ...(data.accionesCorrectivas && {
        accionesCorrectivas: data.accionesCorrectivas,
      }),
      ...(data.estado !== undefined && { estado: data.estado }),
    });

    return await this.visitasRepository.save(visita);
  }

  async eliminar(id: number) {
    const visita = await this.obtenerPorId(id);
    visita.estado = false;
    return await this.visitasRepository.save(visita);
  }
}