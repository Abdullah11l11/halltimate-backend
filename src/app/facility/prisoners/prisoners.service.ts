import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prisoner } from './entities/prisoner.entity';
import { CreatePrisonerDto } from './dto/create-prisoner.dto';
import { UpdatePrisonerDto } from './dto/update-prisoner.dto';
import { Cell } from '../cells/entities/cell.entity';

@Injectable()
export class PrisonersService {
  constructor(
    @InjectRepository(Prisoner)
    private readonly prisonerRepository: Repository<Prisoner>,
    @InjectRepository(Cell)
    private readonly cellRepository: Repository<Cell>,
  ) {}

  async create(createPrisonerDto: CreatePrisonerDto): Promise<Prisoner> {
    const { currentCellId, ...rest } = createPrisonerDto;

    let currentCell: Cell | null = null;
    if (currentCellId) {
      currentCell = await this.loadCell(currentCellId);
    }

    const prisoner = this.prisonerRepository.create({
      ...rest,
      currentCell: currentCell ?? undefined,
    });

    return this.prisonerRepository.save(prisoner);
  }

  findAll(): Promise<Prisoner[]> {
    return this.prisonerRepository.find({
      relations: {
        currentCell: true,
        assignments: true,
        crimeRecords: true,
        visits: true,
        incidents: true,
        healthRecords: true,
        documents: true,
      },
      order: { admissionDate: 'DESC' },
    });
  }

  async findOne(prisonerId: number): Promise<Prisoner> {
    const prisoner = await this.prisonerRepository.findOne({
      where: { prisonerId },
      relations: {
        currentCell: true,
        assignments: true,
        crimeRecords: true,
        visits: true,
        incidents: true,
        healthRecords: true,
        documents: true,
      },
    });

    if (!prisoner) {
      throw new NotFoundException('Prisoner not found');
    }

    return prisoner;
  }

  async update(
    prisonerId: number,
    updatePrisonerDto: UpdatePrisonerDto,
  ): Promise<Prisoner> {
    const prisoner = await this.findOne(prisonerId);
    const { currentCellId, ...rest } = updatePrisonerDto;

    Object.assign(prisoner, rest);

    if (currentCellId !== undefined) {
      prisoner.currentCell = await this.loadCell(currentCellId);
    }

    return this.prisonerRepository.save(prisoner);
  }

  async remove(prisonerId: number): Promise<void> {
    const prisoner = await this.findOne(prisonerId);
    await this.prisonerRepository.remove(prisoner);
  }

  private async loadCell(cellId: number): Promise<Cell> {
    const cell = await this.cellRepository.findOne({ where: { cellId } });
    if (!cell) {
      throw new BadRequestException('Assigned cell not found');
    }
    return cell;
  }
}
