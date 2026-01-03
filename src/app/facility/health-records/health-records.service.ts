import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthRecord } from './entities/health-record.entity';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { Staff } from '../staff/entities/staff.entity';

@Injectable()
export class HealthRecordsService {
  constructor(
    @InjectRepository(HealthRecord)
    private readonly healthRecordRepository: Repository<HealthRecord>,
    @InjectRepository(Prisoner)
    private readonly prisonerRepository: Repository<Prisoner>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(
    createHealthRecordDto: CreateHealthRecordDto,
  ): Promise<HealthRecord> {
    const { prisonerId, doctorId, ...rest } = createHealthRecordDto;
    const prisoner = await this.loadPrisoner(prisonerId);
    const doctor = doctorId ? await this.loadStaff(doctorId) : undefined;

    const healthRecord = this.healthRecordRepository.create({
      ...rest,
      prisoner,
      doctor,
    });
    return this.healthRecordRepository.save(healthRecord);
  }

  findAll(): Promise<HealthRecord[]> {
    return this.healthRecordRepository.find({
      relations: ['prisoner', 'doctor'],
      order: { recordDate: 'DESC' },
    });
  }

  async findOne(healthRecordId: number): Promise<HealthRecord> {
    const record = await this.healthRecordRepository.findOne({
      where: { healthRecordId },
      relations: ['prisoner', 'doctor'],
    });

    if (!record) {
      throw new NotFoundException('Health record not found');
    }

    return record;
  }

  async update(
    healthRecordId: number,
    updateHealthRecordDto: UpdateHealthRecordDto,
  ): Promise<HealthRecord> {
    const record = await this.findOne(healthRecordId);
    const { prisonerId, doctorId, ...rest } = updateHealthRecordDto;

    if (prisonerId) {
      record.prisoner = await this.loadPrisoner(prisonerId);
    }

    if (doctorId !== undefined) {
      record.doctor = doctorId ? await this.loadStaff(doctorId) : undefined;
    }

    Object.assign(record, rest);
    return this.healthRecordRepository.save(record);
  }

  async remove(healthRecordId: number): Promise<void> {
    const record = await this.findOne(healthRecordId);
    await this.healthRecordRepository.remove(record);
  }

  private async loadPrisoner(prisonerId: number): Promise<Prisoner> {
    const prisoner = await this.prisonerRepository.findOne({
      where: { prisonerId },
    });
    if (!prisoner) {
      throw new NotFoundException('Prisoner not found');
    }
    return prisoner;
  }

  private async loadStaff(staffId: number): Promise<Staff> {
    const staff = await this.staffRepository.findOne({ where: { staffId } });
    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }
    return staff;
  }
}
