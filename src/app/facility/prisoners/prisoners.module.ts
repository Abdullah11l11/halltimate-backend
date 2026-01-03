import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrisonersService } from './prisoners.service';
import { PrisonersController } from './prisoners.controller';
import { Prisoner } from './entities/prisoner.entity';
import { Cell } from '../cells/entities/cell.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prisoner, Cell])],
  controllers: [PrisonersController],
  providers: [PrisonersService],
  exports: [PrisonersService],
})
export class PrisonersModule {}
