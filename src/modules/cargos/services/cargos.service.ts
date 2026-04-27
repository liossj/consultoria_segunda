import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarCargoDto } from '../dto/actualizar-cargo.dto';
import { CrearCargoDto } from '../dto/crear-cargo.dto';
import { Cargo } from '../entities/cargo.entity';

@Injectable()
export class CargosService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargosRepository: Repository<Cargo>,
  ) {}

  async crear(data: CrearCargoDto) {
    const existe = await this.cargosRepository.findOne({
      where: { nombre: data.nombre },
    });

    if (existe) {
      throw new ConflictException('El cargo ya existe');
    }

    const cargo = this.cargosRepository.create(data);
    return await this.cargosRepository.save(cargo);
  }

  async obtenerTodos() {
    return await this.cargosRepository.find();
  }

  async obtenerPorId(id: number) {
    const cargo = await this.cargosRepository.findOne({
      where: { id },
    });

    if (!cargo) {
      throw new NotFoundException('Cargo no encontrado');
    }

    return cargo;
  }

  async actualizar(id: number, data: ActualizarCargoDto) {
    const cargo = await this.obtenerPorId(id);

    if (data.nombre && data.nombre !== cargo.nombre) {
      const existe = await this.cargosRepository.findOne({
        where: { nombre: data.nombre },
      });

      if (existe) {
        throw new ConflictException('El cargo ya existe');
      }
    }

    Object.assign(cargo, data);
    return await this.cargosRepository.save(cargo);
  }

  async eliminar(id: number) {
    const cargo = await this.obtenerPorId(id);
    cargo.estado = false;
    return await this.cargosRepository.save(cargo);
  }
}