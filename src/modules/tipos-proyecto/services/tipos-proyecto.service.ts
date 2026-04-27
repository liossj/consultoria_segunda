import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearTipoProyectoDto } from '../dto/crear-tipo-proyecto.dto';
import { ActualizarTipoProyectoDto } from '../dto/actualizar-tipo-proyecto.dto';
import { TipoProyecto } from '../entities/tipos-proyecto.entity';

@Injectable()
export class TiposProyectoService {
  constructor(
    @InjectRepository(TipoProyecto)
    private readonly repo: Repository<TipoProyecto>,
  ) {}

  async crear(data: CrearTipoProyectoDto) {
    const existe = await this.repo.findOne({
      where: { nombre: data.nombre },
    });

    if (existe) {
      throw new ConflictException('El tipo de proyecto ya existe');
    }

    const tipo = this.repo.create(data);
    return await this.repo.save(tipo);
  }

  async obtenerTodos() {
    return await this.repo.find();
  }

  async obtenerPorId(id: number) {
    const tipo = await this.repo.findOne({ where: { id } });

    if (!tipo) {
      throw new NotFoundException('Tipo de proyecto no encontrado');
    }

    return tipo;
  }

  async actualizar(id: number, data: ActualizarTipoProyectoDto) {
    const tipo = await this.obtenerPorId(id);

    Object.assign(tipo, data);
    return await this.repo.save(tipo);
  }

  async eliminar(id: number) {
    const tipo = await this.obtenerPorId(id);
    tipo.estado = false;
    return await this.repo.save(tipo);
  }
}