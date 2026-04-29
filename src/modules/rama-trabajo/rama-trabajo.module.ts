import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RamaTrabajoController } from './controllers/rama-trabajo.controller';
import { RamaTrabajo } from './entities/rama-trabajo.entity';
import { RamaTrabajoService } from './services/rama-trabajo.service';

@Module({
  imports: [TypeOrmModule.forFeature([RamaTrabajo])],
  controllers: [RamaTrabajoController],
  providers: [RamaTrabajoService],
  exports: [RamaTrabajoService],
})
export class RamaTrabajoModule {}