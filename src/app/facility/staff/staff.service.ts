import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    const existing = await this.staffRepository.findOne({
      where: { nationalId: createStaffDto.nationalId },
    });
    if (existing) {
      throw new ConflictException('Staff with this national ID already exists');
    }
    const staff = this.staffRepository.create(createStaffDto);
    return this.staffRepository.save(staff);
  }

  findAll() {
    return this.staffRepository.find({
      relations: ['userAccount', 'incidents', 'healthRecords', 'documents'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(staffId: number) {
    const staff = await this.staffRepository.findOne({
      where: { staffId },
      relations: ['userAccount', 'incidents', 'healthRecords', 'documents'],
    });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  async update(staffId: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.findOne(staffId);
    Object.assign(staff, updateStaffDto);
    return this.staffRepository.save(staff);
  }

  async remove(staffId: number) {
    const staff = await this.findOne(staffId);
    await this.staffRepository.remove(staff);
  }
}
