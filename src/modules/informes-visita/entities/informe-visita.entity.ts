import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { VisitaObra } from '../../visitas-obra/entities/visita-obra.entity';

@Entity('informes_visita')
export class InformeVisita {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proyecto)
  proyecto: Proyecto;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @Column({ type: 'text' })
  contenido: string;

  @ManyToMany(() => VisitaObra)
  @JoinTable()
  visitas: VisitaObra[];

  @Column({ default: 'Generado' })
  estado: string;
}