import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { Prisoner } from '../prisoners/entities/prisoner.entity';
import { Staff } from '../staff/entities/staff.entity';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    @InjectRepository(Prisoner)
    private readonly prisonerRepository: Repository<Prisoner>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    const { prisonerId, reportedByStaffId, ...rest } = createIncidentDto;

    const incident = this.incidentRepository.create(rest);

    if (prisonerId) {
      incident.prisoner = await this.loadPrisoner(prisonerId);
    }

    if (reportedByStaffId) {
      incident.reportedBy = await this.loadStaff(reportedByStaffId);
    }

    return this.incidentRepository.save(incident);
  }

  findAll(): Promise<Incident[]> {
    return this.incidentRepository.find({
      relations: ['prisoner', 'reportedBy'],
      order: { incidentDate: 'DESC' },
    });
  }

  async findOne(incidentId: number): Promise<Incident> {
    const incident = await this.incidentRepository.findOne({
      where: { incidentId },
      relations: ['prisoner', 'reportedBy'],
    });

    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    return incident;
  }

  async update(
    incidentId: number,
    updateIncidentDto: UpdateIncidentDto,
  ): Promise<Incident> {
    const incident = await this.findOne(incidentId);
    const { prisonerId, reportedByStaffId, ...rest } = updateIncidentDto;

    if (prisonerId !== undefined) {
      incident.prisoner = prisonerId
        ? await this.loadPrisoner(prisonerId)
        : undefined;
    }

    if (reportedByStaffId !== undefined) {
      incident.reportedBy = reportedByStaffId
        ? await this.loadStaff(reportedByStaffId)
        : undefined;
    }

    Object.assign(incident, rest);
    return this.incidentRepository.save(incident);
  }

  async remove(incidentId: number): Promise<void> {
    const incident = await this.findOne(incidentId);
    await this.incidentRepository.remove(incident);
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
