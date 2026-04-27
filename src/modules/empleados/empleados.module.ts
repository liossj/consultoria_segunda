import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from '../cargos/entities/cargo.entity';
import { EmpleadosController } from './controllers/empleados.controller';
import { Empleado } from './entities/empleado.entity';
import { EmpleadosService } from './services/empleados.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Cargo])],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
  exports: [EmpleadosService],
})
export class EmpleadosModule {}