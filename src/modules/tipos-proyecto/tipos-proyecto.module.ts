import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposProyectoController } from './controllers/tipos-proyecto.controller';
import { TipoProyecto } from './entities/tipos-proyecto.entity';
import { TiposProyectoService } from './services/tipos-proyecto.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProyecto])],
  controllers: [TiposProyectoController],
  providers: [TiposProyectoService],
  exports: [TiposProyectoService],
})
export class TiposProyectoModule {}