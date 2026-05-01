import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { VisitaObra } from '../../visitas-obra/entities/visita-obra.entity';

@Entity('solicitudes_cambio')
export class SolicitudCambio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  justificacion: string;

  @Column({ length: 50 })
  prioridad: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  impactoEconomico: number;

  @Column({ length: 100, nullable: true })
  impactoTiempo: string;

  @Column({ default: 'En evaluación' })
  estado: string;

  @Column({ type: 'text', nullable: true })
  observacionesRevision: string;

  @Column({ type: 'date', nullable: true })
  fechaDecision: Date;

  @ManyToOne(() => Proyecto)
  proyecto: Proyecto;

  @ManyToOne(() => VisitaObra, { nullable: true })
  visitaObra?: VisitaObra;
}