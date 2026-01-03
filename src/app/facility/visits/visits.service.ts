import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './entities/visit.entity';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { Visitor } from '../visitors/entities/visitor.entity';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    @InjectRepository(Prisoner)
    private readonly prisonerRepository: Repository<Prisoner>,
    @InjectRepository(Visitor)
    private readonly visitorRepository: Repository<Visitor>,
  ) {}

  async create(createVisitDto: CreateVisitDto): Promise<Visit> {
    const { prisonerId, visitorId, ...rest } = createVisitDto;
    const prisoner = await this.loadPrisoner(prisonerId);
    const visitor = await this.loadVisitor(visitorId);

    const visit = this.visitRepository.create({
      ...rest,
      prisoner,
      visitor,
    });
    return this.visitRepository.save(visit);
  }

  findAll(): Promise<Visit[]> {
    return this.visitRepository.find({
      relations: ['prisoner', 'visitor'],
      order: { visitDate: 'DESC' },
    });
  }

  async findOne(visitId: number): Promise<Visit> {
    const visit = await this.visitRepository.findOne({
      where: { visitId },
      relations: ['prisoner', 'visitor'],
    });
    if (!visit) {
      throw new NotFoundException('Visit not found');
    }
    return visit;
  }

  async update(visitId: number, updateVisitDto: UpdateVisitDto): Promise<Visit> {
    const visit = await this.findOne(visitId);
    const { prisonerId, visitorId, ...rest } = updateVisitDto;

    if (prisonerId) {
      visit.prisoner = await this.loadPrisoner(prisonerId);
    }

    if (visitorId) {
      visit.visitor = await this.loadVisitor(visitorId);
    }

    Object.assign(visit, rest);
    return this.visitRepository.save(visit);
  }

  async remove(visitId: number): Promise<void> {
    const visit = await this.findOne(visitId);
    await this.visitRepository.remove(visit);
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

  private async loadVisitor(visitorId: number): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({
      where: { visitorId },
    });
    if (!visitor) {
      throw new NotFoundException('Visitor not found');
    }
    return visitor;
  }
}
