import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cargo } from '../../cargos/entities/cargo.entity';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50, unique: true })
  carnet: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ type: 'date' })
  fechaIngreso: Date;

  @ManyToOne(() => Cargo)
  cargo: Cargo;

  @Column({ default: true })
  estado: boolean;
}