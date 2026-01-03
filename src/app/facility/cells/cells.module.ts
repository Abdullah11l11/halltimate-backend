import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CellsService } from './cells.service';
import { CellsController } from './cells.controller';
import { Cell } from './entities/cell.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cell])],
  controllers: [CellsController],
  providers: [CellsService],
  exports: [CellsService],
})
export class CellsModule {}
