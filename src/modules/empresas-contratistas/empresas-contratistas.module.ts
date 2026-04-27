import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasContratistasController } from './controllers/empresas-contratistas.controller';
import { EmpresaContratista } from './entities/empresa-contratista.entity';
import { EmpresasContratistasService } from './services/empresas-contratistas.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaContratista])],
  controllers: [EmpresasContratistasController],
  providers: [EmpresasContratistasService],
  exports: [EmpresasContratistasService],
})
export class EmpresasContratistasModule {}