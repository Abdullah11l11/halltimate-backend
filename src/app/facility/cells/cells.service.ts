import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cell } from './entities/cell.entity';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';

@Injectable()
export class CellsService {
  constructor(
    @InjectRepository(Cell)
    private readonly cellRepository: Repository<Cell>,
  ) {}

  async create(createCellDto: CreateCellDto): Promise<Cell> {
    const existingCell = await this.cellRepository.findOne({
      where: { cellNumber: createCellDto.cellNumber },
    });

    if (existingCell) {
      throw new ConflictException('Cell number already exists');
    }

    const cell = this.cellRepository.create(createCellDto);
    return this.cellRepository.save(cell);
  }

  findAll(): Promise<Cell[]> {
    return this.cellRepository.find({
      relations: ['prisoners', 'assignments'],
      order: { cellNumber: 'ASC' },
    });
  }

  async findOne(cellId: number): Promise<Cell> {
    const cell = await this.cellRepository.findOne({
      where: { cellId },
      relations: ['prisoners', 'assignments'],
    });

    if (!cell) {
      throw new NotFoundException('Cell not found');
    }

    return cell;
  }

  async update(cellId: number, updateCellDto: UpdateCellDto): Promise<Cell> {
    const cell = await this.findOne(cellId);
    Object.assign(cell, updateCellDto);
    return this.cellRepository.save(cell);
  }

  async remove(cellId: number): Promise<void> {
    const cell = await this.findOne(cellId);
    await this.cellRepository.remove(cell);
  }
}
