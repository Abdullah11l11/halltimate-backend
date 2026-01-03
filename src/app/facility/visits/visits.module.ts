import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { Visit } from './entities/visit.entity';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { Visitor } from '../visitors/entities/visitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit, Prisoner, Visitor])],
  controllers: [VisitsController],
  providers: [VisitsService],
  exports: [VisitsService],
})
export class VisitsModule {}
