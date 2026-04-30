import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RamaTrabajo } from '../rama-trabajo/entities/rama-trabajo.entity';
import { TrabajadoresObraController } from './controllers/trabajadores-obra.controller';
import { TrabajadorObra } from './entities/trabajador-obra.entity';
import { TrabajadoresObraService } from './services/trabajadores-obra.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrabajadorObra, RamaTrabajo])],
  controllers: [TrabajadoresObraController],
  providers: [TrabajadoresObraService],
  exports: [TrabajadoresObraService],
})
export class TrabajadoresObraModule {}