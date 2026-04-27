import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 20, unique: true })
  telefono: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 100 })
  ocupacion: string;

  @Column({ default: true })
  estado: boolean;
}