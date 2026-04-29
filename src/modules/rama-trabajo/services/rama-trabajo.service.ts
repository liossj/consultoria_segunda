import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarRamaTrabajoDto } from '../dto/actualizar-rama-trabajo.dto';
import { CrearRamaTrabajoDto } from '../dto/crear-rama-trabajo.dto';
import { RamaTrabajo } from '../entities/rama-trabajo.entity';

@Injectable()
export class RamaTrabajoService {
  constructor(
    @InjectRepository(RamaTrabajo)
    private readonly ramaTrabajoRepository: Repository<RamaTrabajo>,
  ) {}

  async crear(data: CrearRamaTrabajoDto) {
    const existe = await this.ramaTrabajoRepository.findOne({
      where: { nombre: data.nombre },
    });

    if (existe) {
      throw new ConflictException('La rama de trabajo ya existe');
    }

    const rama = this.ramaTrabajoRepository.create(data);
    return await this.ramaTrabajoRepository.save(rama);
  }

  async obtenerTodos() {
    return await this.ramaTrabajoRepository.find();
  }

  async obtenerPorId(id: number) {
    const rama = await this.ramaTrabajoRepository.findOne({
      where: { id },
    });

    if (!rama) {
      throw new NotFoundException('Rama de trabajo no encontrada');
    }

    return rama;
  }

  async actualizar(id: number, data: ActualizarRamaTrabajoDto) {
    const rama = await this.obtenerPorId(id);

    if (data.nombre && data.nombre !== rama.nombre) {
      const existe = await this.ramaTrabajoRepository.findOne({
        where: { nombre: data.nombre },
      });

      if (existe) {
        throw new ConflictException('La rama de trabajo ya existe');
      }
    }

    Object.assign(rama, data);
    return await this.ramaTrabajoRepository.save(rama);
  }

  async eliminar(id: number) {
    const rama = await this.obtenerPorId(id);
    rama.estado = false;
    return await this.ramaTrabajoRepository.save(rama);
  }
}