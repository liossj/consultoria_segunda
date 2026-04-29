import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Empleado } from '../empleados/entities/empleado.entity';
import { EmpresaContratista } from '../empresas-contratistas/entities/empresa-contratista.entity';
import { TipoProyecto } from '../tipos-proyecto/entities/tipos-proyecto.entity';
import { ProyectosController } from './controllers/proyectos.controller';
import { Proyecto } from './entities/proyecto.entity';
import { ProyectosService } from './services/proyectos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Proyecto,
      Cliente,
      EmpresaContratista,
      Empleado,
      TipoProyecto,
    ]),
  ],
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService],
})
export class ProyectosModule {}