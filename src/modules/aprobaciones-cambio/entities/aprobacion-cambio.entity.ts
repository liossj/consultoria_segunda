import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SolicitudCambio } from '../../solicitudes-cambio/entities/solicitud-cambio.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('aprobaciones_cambio')
export class AprobacionCambio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SolicitudCambio)
  solicitudCambio: SolicitudCambio;

  @ManyToOne(() => Usuario)
  usuarioResponsable: Usuario;

  @Column({ length: 50 })
  decision: string;

  @Column({ type: 'text' })
  observaciones: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaDecision: Date;
}