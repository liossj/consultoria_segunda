import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipos_proyecto')
export class TipoProyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ default: true })
  estado: boolean;
}