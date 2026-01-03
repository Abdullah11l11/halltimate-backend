import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrimeRecord } from './entities/crime-record.entity';
import { CreateCrimeRecordDto } from './dto/create-crime-record.dto';
import { UpdateCrimeRecordDto } from './dto/update-crime-record.dto';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { CaseEntity } from '../cases/entities/case.entity';

@Injectable()
export class CrimeRecordsService {
  constructor(
    @InjectRepository(CrimeRecord)
    private readonly crimeRecordRepository: Repository<CrimeRecord>,
    @InjectRepository(Prisoner)
    private readonly prisonerRepository: Repository<Prisoner>,
    @InjectRepository(CaseEntity)
    private readonly caseRepository: Repository<CaseEntity>,
  ) {}

  async create(
    createCrimeRecordDto: CreateCrimeRecordDto,
  ): Promise<CrimeRecord> {
    const { prisonerId, caseId, ...rest } = createCrimeRecordDto;
    const prisoner = await this.loadPrisoner(prisonerId);
    const legalCase = await this.loadCase(caseId);

    const crimeRecord = this.crimeRecordRepository.create({
      ...rest,
      prisoner,
      case: legalCase,
    });
    return this.crimeRecordRepository.save(crimeRecord);
  }

  findAll(): Promise<CrimeRecord[]> {
    return this.crimeRecordRepository.find({
      relations: ['prisoner', 'case'],
      order: { sentenceStart: 'DESC' },
    });
  }

  async findOne(crimeId: number): Promise<CrimeRecord> {
    const crimeRecord = await this.crimeRecordRepository.findOne({
      where: { crimeId },
      relations: ['prisoner', 'case'],
    });

    if (!crimeRecord) {
      throw new NotFoundException('Crime record not found');
    }

    return crimeRecord;
  }

  async update(
    crimeId: number,
    updateCrimeRecordDto: UpdateCrimeRecordDto,
  ): Promise<CrimeRecord> {
    const crimeRecord = await this.findOne(crimeId);
    const { prisonerId, caseId, ...rest } = updateCrimeRecordDto;

    if (prisonerId) {
      crimeRecord.prisoner = await this.loadPrisoner(prisonerId);
    }

    if (caseId) {
      crimeRecord.case = await this.loadCase(caseId);
    }

    Object.assign(crimeRecord, rest);
    return this.crimeRecordRepository.save(crimeRecord);
  }

  async remove(crimeId: number): Promise<void> {
    const crimeRecord = await this.findOne(crimeId);
    await this.crimeRecordRepository.remove(crimeRecord);
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

  private async loadCase(caseId: number): Promise<CaseEntity> {
    const caseEntity = await this.caseRepository.findOne({ where: { caseId } });
    if (!caseEntity) {
      throw new NotFoundException('Case not found');
    }
    return caseEntity;
  }
}
