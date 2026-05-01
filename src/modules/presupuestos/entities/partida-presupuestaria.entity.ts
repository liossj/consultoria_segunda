import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Presupuesto } from './presupuesto.entity';

@Entity('partidas_presupuestarias')
export class PartidaPresupuestaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255, nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 12, scale: 2 })
  montoEstimado: number;

  @ManyToOne(() => Presupuesto, (presupuesto) => presupuesto.partidas)
  presupuesto: Presupuesto;
}