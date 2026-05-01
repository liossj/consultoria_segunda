import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Material } from '../../materiales/entities/material.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { RamaTrabajo } from '../../rama-trabajo/entities/rama-trabajo.entity';
import { TrabajadorObra } from '../../trabajadores-obra/entities/trabajador-obra.entity';

@Entity('visitas_obra')
export class VisitaObra {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proyecto)
  proyecto: Proyecto;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ length: 50 })
  horaInicio: string;

  @Column({ length: 50 })
  horaFin: string;

  @Column({ length: 100 })
  clima: string;

  @Column({ length: 100, nullable: true })
  temperatura: string;

  @Column({ length: 255, nullable: true })
  ubicacion: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'text', nullable: true })
  incidencias: string;

  @Column({ type: 'text', nullable: true })
  accionesCorrectivas: string;

  @ManyToMany(() => TrabajadorObra)
  @JoinTable()
  trabajadores: TrabajadorObra[];

  @ManyToMany(() => Material)
  @JoinTable()
  materiales: Material[];

  @ManyToMany(() => RamaTrabajo)
  @JoinTable()
  ramasTrabajo: RamaTrabajo[];

  @Column({ default: true })
  estado: boolean;
}