import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { EmpresaContratista } from '../../empresas-contratistas/entities/empresa-contratista.entity';
import { TipoProyecto } from '../../tipos-proyecto/entities/tipos-proyecto.entity';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @Column({ default: 'Activo' })
  estado: string;

  @ManyToOne(() => Cliente)
  cliente: Cliente;

  @ManyToOne(() => EmpresaContratista)
  contratista: EmpresaContratista;

  @ManyToMany(() => Empleado)
  @JoinTable()
  empleados: Empleado[];

  @ManyToMany(() => TipoProyecto)
  @JoinTable()
  tiposProyecto: TipoProyecto[];
}