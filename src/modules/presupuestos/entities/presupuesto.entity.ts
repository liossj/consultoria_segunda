import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { PartidaPresupuestaria } from './partida-presupuestaria.entity';

@Entity('presupuestos')
export class Presupuesto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 12, scale: 2 })
  montoTotalEstimado: number;

  @Column({ default: true })
  estado: boolean;

  @ManyToOne(() => Proyecto)
  proyecto: Proyecto;

  @OneToMany(() => PartidaPresupuestaria, (partida) => partida.presupuesto, {
    cascade: true,
  })
  partidas: PartidaPresupuestaria[];
}