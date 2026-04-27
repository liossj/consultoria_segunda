import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarClienteDto } from '../dto/actualizar-cliente.dto';
import { CrearClienteDto } from '../dto/crear-cliente.dto';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
  ) {}

  async crear(data: CrearClienteDto) {
    const existeCorreo = await this.clientesRepository.findOne({
      where: { correo: data.correo },
    });

    if (existeCorreo) {
      throw new ConflictException('El correo ya está registrado');
    }

    const existeTelefono = await this.clientesRepository.findOne({
      where: { telefono: data.telefono },
    });

    if (existeTelefono) {
      throw new ConflictException('El teléfono ya está registrado');
    }

    const cliente = this.clientesRepository.create(data);
    return await this.clientesRepository.save(cliente);
  }

  async obtenerTodos() {
    return await this.clientesRepository.find();
  }

  async obtenerPorId(id: number) {
    const cliente = await this.clientesRepository.findOne({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return cliente;
  }

  async actualizar(id: number, data: ActualizarClienteDto) {
    const cliente = await this.obtenerPorId(id);

    if (data.correo && data.correo !== cliente.correo) {
      const existeCorreo = await this.clientesRepository.findOne({
        where: { correo: data.correo },
      });

      if (existeCorreo) {
        throw new ConflictException('El correo ya está registrado');
      }
    }

    if (data.telefono && data.telefono !== cliente.telefono) {
      const existeTelefono = await this.clientesRepository.findOne({
        where: { telefono: data.telefono },
      });

      if (existeTelefono) {
        throw new ConflictException('El teléfono ya está registrado');
      }
    }

    Object.assign(cliente, data);
    return await this.clientesRepository.save(cliente);
  }

  async eliminar(id: number) {
    const cliente = await this.obtenerPorId(id);

    cliente.estado = false;

    return await this.clientesRepository.save(cliente);
  }
}