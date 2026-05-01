import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { PartidaPresupuestaria } from '../../presupuestos/entities/partida-presupuestaria.entity';

@Entity('gastos')
export class Gasto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ length: 255 })
  descripcion: string;

  @Column('decimal', { precision: 12, scale: 2 })
  monto: number;

  @ManyToOne(() => Proyecto)
  proyecto: Proyecto;

  @ManyToOne(() => PartidaPresupuestaria)
  partida: PartidaPresupuestaria;

  @Column({ default: true })
  estado: boolean;
}