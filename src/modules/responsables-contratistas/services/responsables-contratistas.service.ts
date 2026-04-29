import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpresaContratista } from '../../empresas-contratistas/entities/empresa-contratista.entity';
import { ActualizarResponsableContratistaDto } from '../dto/actualizar-responsable-contratista.dto';
import { CrearResponsableContratistaDto } from '../dto/crear-responsable-contratista.dto';
import { ResponsableContratista } from '../entities/responsable-contratista.entity';

@Injectable()
export class ResponsablesContratistasService {
  constructor(
    @InjectRepository(ResponsableContratista)
    private readonly responsablesRepository: Repository<ResponsableContratista>,

    @InjectRepository(EmpresaContratista)
    private readonly empresasRepository: Repository<EmpresaContratista>,
  ) {}

  async crear(data: CrearResponsableContratistaDto) {
    const empresa = await this.empresasRepository.findOne({
      where: { id: data.empresaId, estado: true },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa contratista no encontrada o inactiva');
    }

    const existeCorreo = await this.responsablesRepository.findOne({
      where: { correo: data.correo },
    });

    if (existeCorreo) {
      throw new ConflictException('El correo ya está registrado');
    }

    const responsable = this.responsablesRepository.create({
      nombre: data.nombre,
      telefono: data.telefono,
      correo: data.correo,
      especialidad: data.especialidad,
      empresa,
    });

    return await this.responsablesRepository.save(responsable);
  }

  async obtenerTodos() {
    return await this.responsablesRepository.find({
      relations: ['empresa'],
    });
  }

  async obtenerPorId(id: number) {
    const responsable = await this.responsablesRepository.findOne({
      where: { id },
      relations: ['empresa'],
    });

    if (!responsable) {
      throw new NotFoundException('Responsable contratista no encontrado');
    }

    return responsable;
  }

  async actualizar(id: number, data: ActualizarResponsableContratistaDto) {
    const responsable = await this.obtenerPorId(id);

    if (data.correo && data.correo !== responsable.correo) {
      const existeCorreo = await this.responsablesRepository.findOne({
        where: { correo: data.correo },
      });

      if (existeCorreo) {
        throw new ConflictException('El correo ya está registrado');
      }
    }

    if (data.empresaId) {
      const empresa = await this.empresasRepository.findOne({
        where: { id: data.empresaId, estado: true },
      });

      if (!empresa) {
        throw new NotFoundException('Empresa contratista no encontrada o inactiva');
      }

      responsable.empresa = empresa;
    }

    Object.assign(responsable, {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.telefono && { telefono: data.telefono }),
      ...(data.correo && { correo: data.correo }),
      ...(data.especialidad && { especialidad: data.especialidad }),
      ...(data.estado !== undefined && { estado: data.estado }),
    });

    return await this.responsablesRepository.save(responsable);
  }

  async eliminar(id: number) {
    const responsable = await this.obtenerPorId(id);
    responsable.estado = false;
    return await this.responsablesRepository.save(responsable);
  }
}