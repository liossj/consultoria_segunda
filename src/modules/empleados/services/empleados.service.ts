import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from '../../cargos/entities/cargo.entity';
import { ActualizarEmpleadoDto } from '../dto/actualizar-empleado.dto';
import { CrearEmpleadoDto } from '../dto/crear-empleado.dto';
import { Empleado } from '../entities/empleado.entity';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadosRepository: Repository<Empleado>,

    @InjectRepository(Cargo)
    private readonly cargosRepository: Repository<Cargo>,
  ) {}

  async crear(data: CrearEmpleadoDto) {
    const existeCarnet = await this.empleadosRepository.findOne({
      where: { carnet: data.carnet },
    });

    if (existeCarnet) {
      throw new ConflictException('El carnet ya está registrado');
    }

    const existeCorreo = await this.empleadosRepository.findOne({
      where: { correo: data.correo },
    });

    if (existeCorreo) {
      throw new ConflictException('El correo ya está registrado');
    }

    const cargo = await this.cargosRepository.findOne({
      where: { id: data.cargoId, estado: true },
    });

    if (!cargo) {
      throw new NotFoundException('Cargo no encontrado o inactivo');
    }

    const empleado = this.empleadosRepository.create({
      nombre: data.nombre,
      carnet: data.carnet,
      fechaNacimiento: new Date(data.fechaNacimiento),
      telefono: data.telefono,
      correo: data.correo,
      fechaIngreso: new Date(data.fechaIngreso),
      cargo,
    });

    return await this.empleadosRepository.save(empleado);
  }

  async obtenerTodos() {
    return await this.empleadosRepository.find({
      relations: ['cargo'],
    });
  }

  async obtenerPorId(id: number) {
    const empleado = await this.empleadosRepository.findOne({
      where: { id },
      relations: ['cargo'],
    });

    if (!empleado) {
      throw new NotFoundException('Empleado no encontrado');
    }

    return empleado;
  }

  async actualizar(id: number, data: ActualizarEmpleadoDto) {
    const empleado = await this.obtenerPorId(id);

    if (data.carnet && data.carnet !== empleado.carnet) {
      const existeCarnet = await this.empleadosRepository.findOne({
        where: { carnet: data.carnet },
      });

      if (existeCarnet) {
        throw new ConflictException('El carnet ya está registrado');
      }
    }

    if (data.correo && data.correo !== empleado.correo) {
      const existeCorreo = await this.empleadosRepository.findOne({
        where: { correo: data.correo },
      });

      if (existeCorreo) {
        throw new ConflictException('El correo ya está registrado');
      }
    }

    if (data.cargoId) {
      const cargo = await this.cargosRepository.findOne({
        where: { id: data.cargoId, estado: true },
      });

      if (!cargo) {
        throw new NotFoundException('Cargo no encontrado o inactivo');
      }

      empleado.cargo = cargo;
    }

    Object.assign(empleado, {
      ...(data.nombre && { nombre: data.nombre }),
      ...(data.carnet && { carnet: data.carnet }),
      ...(data.fechaNacimiento && {
        fechaNacimiento: new Date(data.fechaNacimiento),
      }),
      ...(data.telefono && { telefono: data.telefono }),
      ...(data.correo && { correo: data.correo }),
      ...(data.fechaIngreso && { fechaIngreso: new Date(data.fechaIngreso) }),
      ...(data.estado !== undefined && { estado: data.estado }),
    });

    return await this.empleadosRepository.save(empleado);
  }

  async eliminar(id: number) {
    const empleado = await this.obtenerPorId(id);
    empleado.estado = false;
    return await this.empleadosRepository.save(empleado);
  }
}