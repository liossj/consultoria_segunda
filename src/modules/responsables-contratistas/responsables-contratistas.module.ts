import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaContratista } from '../empresas-contratistas/entities/empresa-contratista.entity';
import { ResponsablesContratistasController } from './controllers/responsables-contratistas.controller';
import { ResponsableContratista } from './entities/responsable-contratista.entity';
import { ResponsablesContratistasService } from './services/responsables-contratistas.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResponsableContratista, EmpresaContratista])],
  controllers: [ResponsablesContratistasController],
  providers: [ResponsablesContratistasService],
  exports: [ResponsablesContratistasService],
})
export class ResponsablesContratistasModule {}