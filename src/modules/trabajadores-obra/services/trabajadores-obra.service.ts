import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RamaTrabajo } from '../../rama-trabajo/entities/rama-trabajo.entity';
import { ActualizarTrabajadorObraDto } from '../dto/actualizar-trabajador-obra.dto';
import { CrearTrabajadorObraDto } from '../dto/crear-trabajador-obra.dto';
import { TrabajadorObra } from '../entities/trabajador-obra.entity';

@Injectable()
export class TrabajadoresObraService {
  constructor(
    @InjectRepository(TrabajadorObra)
    private readonly trabajadoresRepository: Repository<TrabajadorObra>,

    @InjectRepository(RamaTrabajo)
    private readonly ramasRepository: Repository<RamaTrabajo>,
  ) {}

  async crear(data: CrearTrabajadorObraDto) {
    const ramaTrabajo = await this.ramasRepository.findOne({
      where: { id: data.ramaTrabajoId, estado: true },
    });

    if (!ramaTrabajo) {
      throw new NotFoundException('Rama de trabajo no encontrada o inactiva');
    }

    const trabajador = this.trabajadoresRepository.create({
      nombre: data.nombre,
      telefono: data.telefono,
      especialidad: data.especialidad,
      ramaTrabajo,
    });

    return await this.trabajadoresRepository.save(trabajador);
  }

  async obtenerTodos() {
    return await this.trabajadoresRepository.find({
      relations: ['ramaTrabajo'],
    });
  }

  async obtenerPorId(id: number) {
    const trabajador = await this.trabajadoresRepository.findOne({
      where: { id },
      relations: ['ramaTrabajo'],
    });

    if (!trabajador) {
      throw new NotFoundException('Trabajador de obra no encontrado');
    }

    return trabajador;
  }

  async actualizar(id: number, data: ActualizarTrabajadorObraDto) {
    const trabajador = await this.obtenerPorId(id);

    if (data.ramaTrabajoId) {
      const ramaTrabajo = await this.ramasRepository.findOne({
        where: { id: data.ramaTrabajoId, estado: true },
      });

      if (!ramaTrabajo) {
        throw new NotFoundException('Rama de trabajo no encontrada o inactiva');
      }

      trabajador.ramaTrabajo = ramaTrabajo;
    }

    Object.assign(trabajador, {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.telefono && { telefono: data.telefono }),
      ...(data.especialidad && { especialidad: data.especialidad }),
      ...(data.estado !== undefined && { estado: data.estado }),
    });

    return await this.trabajadoresRepository.save(trabajador);
  }

  async eliminar(id: number) {
    const trabajador = await this.obtenerPorId(id);
    trabajador.estado = false;
    return await this.trabajadoresRepository.save(trabajador);
  }
}