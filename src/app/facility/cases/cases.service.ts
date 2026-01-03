import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CaseEntity } from './entities/case.entity';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(CaseEntity)
    private readonly caseRepository: Repository<CaseEntity>,
  ) {}

  async create(createCaseDto: CreateCaseDto): Promise<CaseEntity> {
    const existing = await this.caseRepository.findOne({
      where: { caseNumber: createCaseDto.caseNumber },
    });

    if (existing) {
      throw new ConflictException('Case number already exists');
    }

    const legalCase = this.caseRepository.create(createCaseDto);
    return this.caseRepository.save(legalCase);
  }

  findAll(): Promise<CaseEntity[]> {
    return this.caseRepository.find({
      relations: ['crimes', 'documents'],
      order: { openDate: 'DESC' },
    });
  }

  async findOne(caseId: number): Promise<CaseEntity> {
    const legalCase = await this.caseRepository.findOne({
      where: { caseId },
      relations: ['crimes', 'documents'],
    });

    if (!legalCase) {
      throw new NotFoundException('Case not found');
    }

    return legalCase;
  }

  async update(caseId: number, updateCaseDto: UpdateCaseDto) {
    const legalCase = await this.findOne(caseId);

    if (
      updateCaseDto.caseNumber &&
      updateCaseDto.caseNumber !== legalCase.caseNumber
    ) {
      const existing = await this.caseRepository.findOne({
        where: { caseNumber: updateCaseDto.caseNumber },
      });
      if (existing) {
        throw new ConflictException('Case number already exists');
      }
    }

    Object.assign(legalCase, updateCaseDto);
    return this.caseRepository.save(legalCase);
  }

  async remove(caseId: number): Promise<void> {
    const legalCase = await this.findOne(caseId);
    await this.caseRepository.remove(legalCase);
  }
}
