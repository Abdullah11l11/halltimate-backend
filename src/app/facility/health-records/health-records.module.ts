import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthRecordsService } from './health-records.service';
import { HealthRecordsController } from './health-records.controller';
import { HealthRecord } from './entities/health-record.entity';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { Staff } from '../staff/entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HealthRecord, Prisoner, Staff])],
  controllers: [HealthRecordsController],
  providers: [HealthRecordsService],
  exports: [HealthRecordsService],
})
export class HealthRecordsModule {}
