import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { EmpresaContratista } from '../../empresas-contratistas/entities/empresa-contratista.entity';
import { TipoProyecto } from '../../tipos-proyecto/entities/tipos-proyecto.entity';
import { ActualizarProyectoDto } from '../dto/actualizar-proyecto.dto';
import { CrearProyectoDto } from '../dto/crear-proyecto.dto';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,

    @InjectRepository(EmpresaContratista)
    private readonly contratistasRepository: Repository<EmpresaContratista>,

    @InjectRepository(Empleado)
    private readonly empleadosRepository: Repository<Empleado>,

    @InjectRepository(TipoProyecto)
    private readonly tiposProyectoRepository: Repository<TipoProyecto>,
  ) {}

  private validarFechas(fechaInicio: string, fechaFin: string) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      throw new BadRequestException(
        'La fecha fin debe ser mayor a la fecha inicio',
      );
    }
  }

  async crear(data: CrearProyectoDto) {
    this.validarFechas(data.fechaInicio, data.fechaFin);

    const existeProyecto = await this.proyectosRepository.findOne({
      where: { nombre: data.nombre },
    });

    if (existeProyecto) {
      throw new ConflictException('El nombre del proyecto ya existe');
    }

    const cliente = await this.clientesRepository.findOne({
      where: { id: data.clienteId, estado: true },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado o inactivo');
    }

    const contratista = await this.contratistasRepository.findOne({
      where: { id: data.contratistaId, estado: true },
    });

    if (!contratista) {
      throw new NotFoundException('Contratista no encontrado o inactivo');
    }

    const empleados = await this.empleadosRepository.find({
      where: {
        id: In(data.empleadosIds),
        estado: true,
      },
    });

    if (empleados.length !== data.empleadosIds.length) {
      throw new NotFoundException(
        'Uno o más empleados no existen o están inactivos',
      );
    }

    const tiposProyecto = await this.tiposProyectoRepository.find({
      where: {
        id: In(data.tiposProyectoIds),
        estado: true,
      },
    });

    if (tiposProyecto.length !== data.tiposProyectoIds.length) {
      throw new NotFoundException(
        'Uno o más tipos de proyecto no existen o están inactivos',
      );
    }

    const proyecto = this.proyectosRepository.create({
      nombre: data.nombre,
      fechaInicio: new Date(data.fechaInicio),
      fechaFin: new Date(data.fechaFin),
      estado: data.estado,
      cliente,
      contratista,
      empleados,
      tiposProyecto,
    });

    return await this.proyectosRepository.save(proyecto);
  }

  async obtenerTodos() {
    return await this.proyectosRepository.find({
      relations: ['cliente', 'contratista', 'empleados', 'tiposProyecto'],
    });
  }

  async obtenerPorId(id: number) {
    const proyecto = await this.proyectosRepository.findOne({
      where: { id },
      relations: ['cliente', 'contratista', 'empleados', 'tiposProyecto'],
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    return proyecto;
  }

  async actualizar(id: number, data: ActualizarProyectoDto) {
    const proyecto = await this.obtenerPorId(id);

    if (data.fechaInicio || data.fechaFin) {
      const fechaInicio = data.fechaInicio ?? proyecto.fechaInicio.toISOString();
      const fechaFin = data.fechaFin ?? proyecto.fechaFin.toISOString();
      this.validarFechas(fechaInicio, fechaFin);
    }

    if (data.nombre && data.nombre !== proyecto.nombre) {
      const existeProyecto = await this.proyectosRepository.findOne({
        where: { nombre: data.nombre },
      });

      if (existeProyecto) {
        throw new ConflictException('El nombre del proyecto ya existe');
      }

      proyecto.nombre = data.nombre;
    }

    if (data.clienteId) {
      const cliente = await this.clientesRepository.findOne({
        where: { id: data.clienteId, estado: true },
      });

      if (!cliente) {
        throw new NotFoundException('Cliente no encontrado o inactivo');
      }

      proyecto.cliente = cliente;
    }

    if (data.contratistaId) {
      const contratista = await this.contratistasRepository.findOne({
        where: { id: data.contratistaId, estado: true },
      });

      if (!contratista) {
        throw new NotFoundException('Contratista no encontrado o inactivo');
      }

      proyecto.contratista = contratista;
    }

    if (data.empleadosIds) {
      const empleados = await this.empleadosRepository.find({
        where: {
          id: In(data.empleadosIds),
          estado: true,
        },
      });

      if (empleados.length !== data.empleadosIds.length) {
        throw new NotFoundException(
          'Uno o más empleados no existen o están inactivos',
        );
      }

      proyecto.empleados = empleados;
    }

    if (data.tiposProyectoIds) {
      const tiposProyecto = await this.tiposProyectoRepository.find({
        where: {
          id: In(data.tiposProyectoIds),
          estado: true,
        },
      });

      if (tiposProyecto.length !== data.tiposProyectoIds.length) {
        throw new NotFoundException(
          'Uno o más tipos de proyecto no existen o están inactivos',
        );
      }

      proyecto.tiposProyecto = tiposProyecto;
    }

    if (data.fechaInicio) {
      proyecto.fechaInicio = new Date(data.fechaInicio);
    }

    if (data.fechaFin) {
      proyecto.fechaFin = new Date(data.fechaFin);
    }

    if (data.estado) {
      proyecto.estado = data.estado;
    }

    return await this.proyectosRepository.save(proyecto);
  }

  async eliminar(id: number) {
    const proyecto = await this.obtenerPorId(id);
    proyecto.estado = 'Inactivo';
    return await this.proyectosRepository.save(proyecto);
  }
}