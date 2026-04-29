import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarMaterialDto } from '../dto/actualizar-material.dto';
import { CrearMaterialDto } from '../dto/crear-material.dto';
import { Material } from '../entities/material.entity';

@Injectable()
export class MaterialesService {
  constructor(
    @InjectRepository(Material)
    private readonly materialesRepository: Repository<Material>,
  ) {}

  async crear(data: CrearMaterialDto) {
    const existe = await this.materialesRepository.findOne({
      where: { nombre: data.nombre },
    });

    if (existe) {
      throw new ConflictException('El material ya existe');
    }

    const material = this.materialesRepository.create(data);
    return await this.materialesRepository.save(material);
  }

  async obtenerTodos() {
    return await this.materialesRepository.find();
  }

  async obtenerPorId(id: number) {
    const material = await this.materialesRepository.findOne({
      where: { id },
    });

    if (!material) {
      throw new NotFoundException('Material no encontrado');
    }

    return material;
  }

  async actualizar(id: number, data: ActualizarMaterialDto) {
    const material = await this.obtenerPorId(id);

    if (data.nombre && data.nombre !== material.nombre) {
      const existe = await this.materialesRepository.findOne({
        where: { nombre: data.nombre },
      });

      if (existe) {
        throw new ConflictException('El material ya existe');
      }
    }

    Object.assign(material, data);
    return await this.materialesRepository.save(material);
  }

  async eliminar(id: number) {
    const material = await this.obtenerPorId(id);
    material.estado = false;
    return await this.materialesRepository.save(material);
  }
}