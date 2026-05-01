import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { PartidaPresupuestaria } from '../../presupuestos/entities/partida-presupuestaria.entity';
import { ActualizarGastoDto } from '../dto/actualizar-gasto.dto';
import { CrearGastoDto } from '../dto/crear-gasto.dto';
import { Gasto } from '../entities/gasto.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private readonly gastosRepository: Repository<Gasto>,

    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(PartidaPresupuestaria)
    private readonly partidasRepository: Repository<PartidaPresupuestaria>,
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

  private async obtenerPartida(id: number) {
    const partida = await this.partidasRepository.findOne({
      where: { id },
    });

    if (!partida) {
      throw new NotFoundException('Partida presupuestaria no encontrada');
    }

    return partida;
  }

  async crear(data: CrearGastoDto) {
    const proyecto = await this.obtenerProyectoActivo(data.proyectoId);
    const partida = await this.obtenerPartida(data.partidaId);

    const gasto = this.gastosRepository.create({
      fecha: new Date(data.fecha),
      descripcion: data.descripcion,
      monto: data.monto,
      proyecto,
      partida,
    });

    return await this.gastosRepository.save(gasto);
  }

  async obtenerTodos() {
    return await this.gastosRepository.find({
      relations: ['proyecto', 'partida'],
    });
  }

  async obtenerPorId(id: number) {
    const gasto = await this.gastosRepository.findOne({
      where: { id },
      relations: ['proyecto', 'partida'],
    });

    if (!gasto) {
      throw new NotFoundException('Gasto no encontrado');
    }

    return gasto;
  }

  async actualizar(id: number, data: ActualizarGastoDto) {
    const gasto = await this.obtenerPorId(id);

    if (data.proyectoId) {
      gasto.proyecto = await this.obtenerProyectoActivo(data.proyectoId);
    }

    if (data.partidaId) {
      gasto.partida = await this.obtenerPartida(data.partidaId);
    }

    Object.assign(gasto, {
      ...(data.fecha && { fecha: new Date(data.fecha) }),
      ...(data.descripcion && { descripcion: data.descripcion }),
      ...(data.monto !== undefined && { monto: data.monto }),
      ...(data.estado !== undefined && { estado: data.estado }),
    });

    return await this.gastosRepository.save(gasto);
  }

  async eliminar(id: number) {
    const gasto = await this.obtenerPorId(id);
    gasto.estado = false;
    return await this.gastosRepository.save(gasto);
  }
}