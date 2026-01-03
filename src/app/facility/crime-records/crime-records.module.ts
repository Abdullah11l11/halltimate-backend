import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrimeRecordsService } from './crime-records.service';
import { CrimeRecordsController } from './crime-records.controller';
import { CrimeRecord } from './entities/crime-record.entity';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { CaseEntity } from '../cases/entities/case.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrimeRecord, Prisoner, CaseEntity])],
  controllers: [CrimeRecordsController],
  providers: [CrimeRecordsService],
  exports: [CrimeRecordsService],
})
export class CrimeRecordsModule {}
