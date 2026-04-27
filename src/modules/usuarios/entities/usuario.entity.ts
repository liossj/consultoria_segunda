import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  estado: boolean;

  @Column({ default: 'usuario' })
  rol: string;
}