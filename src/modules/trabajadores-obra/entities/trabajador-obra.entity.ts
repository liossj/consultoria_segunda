import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RamaTrabajo } from '../../rama-trabajo/entities/rama-trabajo.entity';

@Entity('trabajadores_obra')
export class TrabajadorObra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 100 })
  especialidad: string;

  @ManyToOne(() => RamaTrabajo)
  ramaTrabajo: RamaTrabajo;

  @Column({ default: true })
  estado: boolean;
}