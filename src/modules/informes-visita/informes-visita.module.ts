import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { VisitaObra } from '../visitas-obra/entities/visita-obra.entity';
import { InformeVisita } from './entities/informe-visita.entity';
import { InformesVisitaController } from './controllers/informes-visita.controller';
import { InformesVisitaService } from './services/informes-visita.service';

@Module({
  imports: [TypeOrmModule.forFeature([InformeVisita, Proyecto, VisitaObra])],
  controllers: [InformesVisitaController],
  providers: [InformesVisitaService],
  exports: [InformesVisitaService],
})
export class InformesVisitaModule {}