import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarEmpresaContratistaDto } from '../dto/actualizar-empresa-contratista.dto';
import { CrearEmpresaContratistaDto } from '../dto/crear-empresa-contratista.dto';
import { EmpresaContratista } from '../entities/empresa-contratista.entity';

@Injectable()
export class EmpresasContratistasService {
  constructor(
    @InjectRepository(EmpresaContratista)
    private readonly empresasRepository: Repository<EmpresaContratista>,
  ) {}

  async crear(data: CrearEmpresaContratistaDto) {
    const existeNombre = await this.empresasRepository.findOne({
      where: { nombre: data.nombre },
    });

    if (existeNombre) {
      throw new ConflictException('La empresa contratista ya existe');
    }

    const existeCorreo = await this.empresasRepository.findOne({
      where: { correo: data.correo },
    });

    if (existeCorreo) {
      throw new ConflictException('El correo ya está registrado');
    }

    const empresa = this.empresasRepository.create(data);
    return await this.empresasRepository.save(empresa);
  }

  async obtenerTodos() {
    return await this.empresasRepository.find();
  }

  async obtenerPorId(id: number) {
    const empresa = await this.empresasRepository.findOne({
      where: { id },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa contratista no encontrada');
    }

    return empresa;
  }

  async actualizar(id: number, data: ActualizarEmpresaContratistaDto) {
    const empresa = await this.obtenerPorId(id);

    if (data.nombre && data.nombre !== empresa.nombre) {
      const existeNombre = await this.empresasRepository.findOne({
        where: { nombre: data.nombre },
      });

      if (existeNombre) {
        throw new ConflictException('La empresa contratista ya existe');
      }
    }

    if (data.correo && data.correo !== empresa.correo) {
      const existeCorreo = await this.empresasRepository.findOne({
        where: { correo: data.correo },
      });

      if (existeCorreo) {
        throw new ConflictException('El correo ya está registrado');
      }
    }

    Object.assign(empresa, data);
    return await this.empresasRepository.save(empresa);
  }

  async eliminar(id: number) {
    const empresa = await this.obtenerPorId(id);
    empresa.estado = false;
    return await this.empresasRepository.save(empresa);
  }
}