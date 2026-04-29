import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialesController } from './controllers/materiales.controller';
import { Material } from './entities/material.entity';
import { MaterialesService } from './services/materiales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Material])],
  controllers: [MaterialesController],
  providers: [MaterialesService],
  exports: [MaterialesService],
})
export class MaterialesModule {}