import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { VisitaObra } from '../../visitas-obra/entities/visita-obra.entity';
import { CrearInformeVisitaDto } from '../dto/crear-informe-visita.dto';
import { InformeVisita } from '../entities/informe-visita.entity';

@Injectable()
export class InformesVisitaService {
  constructor(
    @InjectRepository(InformeVisita)
    private readonly informesRepository: Repository<InformeVisita>,

    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(VisitaObra)
    private readonly visitasRepository: Repository<VisitaObra>,
  ) {}

  private generarContenido(visitas: VisitaObra[]) {
    return visitas
      .map((visita) => {
        return `
Fecha: ${visita.fecha}
Hora: ${visita.horaInicio} - ${visita.horaFin}
Clima: ${visita.clima}
Temperatura: ${visita.temperatura ?? 'No registrada'}
Ubicación: ${visita.ubicacion ?? 'No registrada'}
Observaciones: ${visita.observaciones ?? 'Sin observaciones'}
Incidencias: ${visita.incidencias ?? 'Sin incidencias'}
Acciones correctivas: ${visita.accionesCorrectivas ?? 'Sin acciones correctivas'}
`;
      })
      .join('\n-----------------------------\n');
  }

  async generar(data: CrearInformeVisitaDto) {
    const fechaInicio = new Date(data.fechaInicio);
    const fechaFin = new Date(data.fechaFin);

    if (fechaFin < fechaInicio) {
      throw new BadRequestException(
        'La fecha fin debe ser mayor o igual a la fecha inicio',
      );
    }

    const proyecto = await this.proyectosRepository.findOne({
      where: { id: data.proyectoId },
    });

    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const visitas = await this.visitasRepository.find({
      where: {
        proyecto: { id: data.proyectoId },
        fecha: Between(fechaInicio, fechaFin),
        estado: true,
      },
      relations: ['proyecto'],
    });

    if (visitas.length === 0) {
      throw new NotFoundException(
        'No existen visitas de obra para ese proyecto en el rango indicado',
      );
    }

    const contenido = this.generarContenido(visitas);

    const informe = this.informesRepository.create({
      proyecto,
      fechaInicio,
      fechaFin,
      visitas,
      contenido,
      estado: 'Generado',
    });

    return await this.informesRepository.save(informe);
  }

  async obtenerTodos() {
    return await this.informesRepository.find({
      relations: ['proyecto', 'visitas'],
    });
  }

  async obtenerPorId(id: number) {
    const informe = await this.informesRepository.findOne({
      where: { id },
      relations: ['proyecto', 'visitas'],
    });

    if (!informe) {
      throw new NotFoundException('Informe de visita no encontrado');
    }

    return informe;
  }

  async marcarComoImpreso(id: number) {
    const informe = await this.obtenerPorId(id);
    informe.estado = 'Impreso';
    return await this.informesRepository.save(informe);
  }
}