import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Gasto } from '../../gastos/entities/gasto.entity';
import { Presupuesto } from '../../presupuestos/entities/presupuesto.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { SolicitudCambio } from '../../solicitudes-cambio/entities/solicitud-cambio.entity';
import { VisitaObra } from '../../visitas-obra/entities/visita-obra.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,

    @InjectRepository(Gasto)
    private readonly gastosRepository: Repository<Gasto>,

    @InjectRepository(Presupuesto)
    private readonly presupuestosRepository: Repository<Presupuesto>,

    @InjectRepository(SolicitudCambio)
    private readonly solicitudesRepository: Repository<SolicitudCambio>,

    @InjectRepository(VisitaObra)
    private readonly visitasRepository: Repository<VisitaObra>,
  ) {}

  async resumenGeneral() {
    const totalClientes = await this.clientesRepository.count();
    const totalProyectos = await this.proyectosRepository.count();
    const proyectosActivos = await this.proyectosRepository.count({
      where: { estado: 'Activo' },
    });
    const totalVisitas = await this.visitasRepository.count();
    const solicitudesPendientes = await this.solicitudesRepository.count({
      where: { estado: 'En evaluación' },
    });

    const gastos = await this.gastosRepository.find({
      where: { estado: true },
    });

    const totalGastos = gastos.reduce(
      (total, gasto) => total + Number(gasto.monto),
      0,
    );

    return {
      totalClientes,
      totalProyectos,
      proyectosActivos,
      totalVisitas,
      solicitudesPendientes,
      totalGastos,
    };
  }

  async reporteFinancieroProyecto(proyectoId: number) {
    const presupuesto = await this.presupuestosRepository.findOne({
      where: {
        proyecto: { id: proyectoId },
      },
      relations: ['proyecto', 'partidas'],
    });

    const gastos = await this.gastosRepository.find({
      where: {
        proyecto: { id: proyectoId },
        estado: true,
      },
      relations: ['partida'],
    });

    const totalPresupuesto = presupuesto
      ? Number(presupuesto.montoTotalEstimado)
      : 0;

    const totalGastado = gastos.reduce(
      (total, gasto) => total + Number(gasto.monto),
      0,
    );

    return {
      proyectoId,
      totalPresupuesto,
      totalGastado,
      saldoDisponible: totalPresupuesto - totalGastado,
      cantidadGastos: gastos.length,
      partidas: presupuesto?.partidas ?? [],
      gastos,
    };
  }

  async reporteSolicitudesCambio() {
    const solicitudes = await this.solicitudesRepository.find({
      relations: ['proyecto'],
    });

    const total = solicitudes.length;
    const aprobadas = solicitudes.filter((s) => s.estado === 'Aprobada').length;
    const rechazadas = solicitudes.filter((s) => s.estado === 'Rechazada').length;
    const enEvaluacion = solicitudes.filter(
      (s) => s.estado === 'En evaluación',
    ).length;
    const enRevision = solicitudes.filter((s) => s.estado === 'En revisión')
      .length;

    return {
      total,
      aprobadas,
      rechazadas,
      enEvaluacion,
      enRevision,
      solicitudes,
    };
  }

  async reporteProyecto(proyectoId: number) {
    const proyecto = await this.proyectosRepository.findOne({
      where: { id: proyectoId },
      relations: ['cliente', 'contratista', 'empleados', 'tiposProyecto'],
    });

    const visitas = await this.visitasRepository.find({
      where: {
        proyecto: { id: proyectoId },
      },
    });

    const solicitudesCambio = await this.solicitudesRepository.find({
      where: {
        proyecto: { id: proyectoId },
      },
    });

    const gastos = await this.gastosRepository.find({
      where: {
        proyecto: { id: proyectoId },
        estado: true,
      },
    });

    const totalGastos = gastos.reduce(
      (total, gasto) => total + Number(gasto.monto),
      0,
    );

    return {
      proyecto,
      totalVisitas: visitas.length,
      totalSolicitudesCambio: solicitudesCambio.length,
      totalGastos,
      visitas,
      solicitudesCambio,
      gastos,
    };
  }
}