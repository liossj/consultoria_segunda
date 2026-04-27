import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { ActualizarUsuarioDto } from '../dto/actualizar-usuario.dto';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async crear(data: CrearUsuarioDto) {
    const existeUsuario = await this.usuariosRepository.findOne({
      where: { correo: data.correo },
    });

    if (existeUsuario) {
      throw new ConflictException('El correo ya está registrado');
    }

    const passwordEncriptada = await bcrypt.hash(data.password, 10);

    const nuevoUsuario = this.usuariosRepository.create({
      ...data,
      password: passwordEncriptada,
    });

    return await this.usuariosRepository.save(nuevoUsuario);
  }

  async obtenerTodos() {
    return await this.usuariosRepository.find();
  }

  async obtenerPorId(id: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return usuario;
  }

  async actualizar(id: number, data: ActualizarUsuarioDto) {
    const usuario = await this.obtenerPorId(id);

    if (data.correo && data.correo !== usuario.correo) {
      const existeCorreo = await this.usuariosRepository.findOne({
        where: { correo: data.correo },
      });

      if (existeCorreo) {
        throw new ConflictException('El correo ya está registrado');
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    Object.assign(usuario, data);

    return await this.usuariosRepository.save(usuario);
  }

  async obtenerPorCorreo(correo: string) {
    return await this.usuariosRepository.findOne({
      where: { correo },
    });
  }
  async eliminar(id: number) {
    const usuario = await this.obtenerPorId(id);

    return await this.usuariosRepository.remove(usuario);
  }
}