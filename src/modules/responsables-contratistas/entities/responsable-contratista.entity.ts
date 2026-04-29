import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmpresaContratista } from '../../empresas-contratistas/entities/empresa-contratista.entity';

@Entity('responsables_contratistas')
export class ResponsableContratista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ length: 100 })
  correo: string;

  @Column({ length: 100 })
  especialidad: string;

  @ManyToOne(() => EmpresaContratista)
  empresa: EmpresaContratista;

  @Column({ default: true })
  estado: boolean;
}