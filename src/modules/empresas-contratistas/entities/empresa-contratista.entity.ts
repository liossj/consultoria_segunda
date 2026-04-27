import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('empresas_contratistas')
export class EmpresaContratista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ length: 150 })
  direccion: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 20 })
  telefono: string;

  @Column({ default: true })
  estado: boolean;
}