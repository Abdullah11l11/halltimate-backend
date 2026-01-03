import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CellAssignment } from './entities/cell-assignment.entity';
import { CreateCellAssignmentDto } from './dto/create-cell-assignment.dto';
import { UpdateCellAssignmentDto } from './dto/update-cell-assignment.dto';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { Cell } from '../cells/entities/cell.entity';

@Injectable()
export class CellAssignmentsService {
  constructor(
    @InjectRepository(CellAssignment)
    private readonly assignmentRepository: Repository<CellAssignment>,
    @InjectRepository(Prisoner)
    private readonly prisonerRepository: Repository<Prisoner>,
    @InjectRepository(Cell)
    private readonly cellRepository: Repository<Cell>,
  ) {}

  async create(
    createCellAssignmentDto: CreateCellAssignmentDto,
  ): Promise<CellAssignment> {
    const { prisonerId, cellId, ...rest } = createCellAssignmentDto;
    const prisoner = await this.loadPrisoner(prisonerId);
    const cell = await this.loadCell(cellId);

    const assignment = this.assignmentRepository.create({
      ...rest,
      prisoner,
      cell,
    });
    return this.assignmentRepository.save(assignment);
  }

  findAll(): Promise<CellAssignment[]> {
    return this.assignmentRepository.find({
      relations: ['prisoner', 'cell'],
      order: { startDate: 'DESC' },
    });
  }

  async findOne(assignmentId: number): Promise<CellAssignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { assignmentId },
      relations: ['prisoner', 'cell'],
    });
    if (!assignment) {
      throw new NotFoundException('Cell assignment not found');
    }
    return assignment;
  }

  async update(
    assignmentId: number,
    updateCellAssignmentDto: UpdateCellAssignmentDto,
  ): Promise<CellAssignment> {
    const assignment = await this.findOne(assignmentId);
    const { prisonerId, cellId, ...rest } = updateCellAssignmentDto;

    if (prisonerId) {
      assignment.prisoner = await this.loadPrisoner(prisonerId);
    }

    if (cellId) {
      assignment.cell = await this.loadCell(cellId);
    }

    Object.assign(assignment, rest);
    return this.assignmentRepository.save(assignment);
  }

  async remove(assignmentId: number): Promise<void> {
    const assignment = await this.findOne(assignmentId);
    await this.assignmentRepository.remove(assignment);
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

  private async loadCell(cellId: number): Promise<Cell> {
    const cell = await this.cellRepository.findOne({ where: { cellId } });
    if (!cell) {
      throw new NotFoundException('Cell not found');
    }
    return cell;
  }
}
