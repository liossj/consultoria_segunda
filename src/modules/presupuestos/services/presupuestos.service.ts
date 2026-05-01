import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { ActualizarPresupuestoDto } from '../dto/actualizar-presupuesto.dto';
import { CrearPresupuestoDto } from '../dto/crear-presupuesto.dto';
import { PartidaPresupuestaria } from '../entities/partida-presupuestaria.entity';
import { Presupuesto } from '../entities/presupuesto.entity';

@Injectable()
export class PresupuestosService {
  constructor(
    @InjectRepository(Presupuesto)
    private readonly presupuestosRepository: Repository<Presupuesto>,

    @InjectRepository(PartidaPresupuestaria)
    private readonly partidasRepository: Repository<PartidaPresupuestaria>,

    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
  ) {}

  async crear(data: CrearPresupuestoDto) {
    const proyecto = await this.proyectosRepository.findOne({
      where: { id: data.proyectoId, estado: 'Activo' },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado o inactivo');
    }

    const existePresupuesto = await this.presupuestosRepository.findOne({
      where: { proyecto: { id: data.proyectoId } },
      relations: ['proyecto'],
    });

    if (existePresupuesto) {
      throw new ConflictException('El proyecto ya tiene un presupuesto registrado');
    }

    const partidas = data.partidas.map((partida) =>
      this.partidasRepository.create(partida),
    );

    const presupuesto = this.presupuestosRepository.create({
      montoTotalEstimado: data.montoTotalEstimado,
      proyecto,
      partidas,
    });

    return await this.presupuestosRepository.save(presupuesto);
  }

  async obtenerTodos() {
    return await this.presupuestosRepository.find({
      relations: ['proyecto', 'partidas'],
    });
  }

  async obtenerPorId(id: number) {
    const presupuesto = await this.presupuestosRepository.findOne({
      where: { id },
      relations: ['proyecto', 'partidas'],
    });

    if (!presupuesto) {
      throw new NotFoundException('Presupuesto no encontrado');
    }

    return presupuesto;
  }

  async actualizar(id: number, data: ActualizarPresupuestoDto) {
    const presupuesto = await this.obtenerPorId(id);

    if (data.montoTotalEstimado !== undefined) {
      presupuesto.montoTotalEstimado = data.montoTotalEstimado;
    }

    if (data.estado !== undefined) {
      presupuesto.estado = data.estado;
    }

    if (data.partidas) {
      presupuesto.partidas = data.partidas.map((partida) =>
        this.partidasRepository.create({
          id: partida.id,
          nombre: partida.nombre,
          descripcion: partida.descripcion,
          montoEstimado: partida.montoEstimado,
        }),
      );
    }

    return await this.presupuestosRepository.save(presupuesto);
  }

  async eliminar(id: number) {
    const presupuesto = await this.obtenerPorId(id);
    presupuesto.estado = false;
    return await this.presupuestosRepository.save(presupuesto);
  }
}