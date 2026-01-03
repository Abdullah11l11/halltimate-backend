import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitor } from './entities/visitor.entity';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(Visitor)
    private readonly visitorRepository: Repository<Visitor>,
  ) {}

  create(createVisitorDto: CreateVisitorDto): Promise<Visitor> {
    const visitor = this.visitorRepository.create(createVisitorDto);
    return this.visitorRepository.save(visitor);
  }

  findAll(): Promise<Visitor[]> {
    return this.visitorRepository.find({ relations: ['visits'] });
  }

  async findOne(visitorId: number): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({
      where: { visitorId },
      relations: ['visits'],
    });

    if (!visitor) {
      throw new NotFoundException('Visitor not found');
    }

    return visitor;
  }

  async update(
    visitorId: number,
    updateVisitorDto: UpdateVisitorDto,
  ): Promise<Visitor> {
    const visitor = await this.findOne(visitorId);
    Object.assign(visitor, updateVisitorDto);
    return this.visitorRepository.save(visitor);
  }

  async remove(visitorId: number): Promise<void> {
    const visitor = await this.findOne(visitorId);
    await this.visitorRepository.remove(visitor);
  }
}
