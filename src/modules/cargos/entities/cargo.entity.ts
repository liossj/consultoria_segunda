import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cargos')
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ length: 255, nullable: true })
  descripcion: string;

  @Column({ default: true })
  estado: boolean;
}