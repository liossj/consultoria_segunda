import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('materiales')
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ length: 100 })
  tipo: string;

  @Column({ length: 50 })
  unidadMedida: string;

  @Column('decimal', { precision: 10, scale: 2 })
  costoUnitario: number;

  @Column({ default: 0 })
  stockActual: number;

  @Column({ length: 255, nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  foto: string;

  @Column({ default: true })
  estado: boolean;
}