import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccount } from './entities/user-account.entity';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { Staff } from '../staff/entities/staff.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserAccountsService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createUserAccountDto: CreateUserAccountDto) {
    const { username, staffId, password, ...rest } = createUserAccountDto;

    const existingUser = await this.userAccountRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const staff = await this.staffRepository.findOne({ where: { staffId } });
    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const account = this.userAccountRepository.create({
      ...rest,
      username,
      staff,
      passwordHash,
    });
    return this.userAccountRepository.save(account);
  }

  findAll() {
    return this.userAccountRepository.find({ relations: ['staff'] });
  }

  async findOne(userId: number) {
    const account = await this.userAccountRepository.findOne({
      where: { userId },
      relations: ['staff'],
    });
    if (!account) {
      throw new NotFoundException('User account not found');
    }
    return account;
  }

  async update(userId: number, updateUserAccountDto: UpdateUserAccountDto) {
    const account = await this.findOne(userId);
    const { staffId, password, ...rest } = updateUserAccountDto;

    if (staffId) {
      account.staff = await this.staffRepository.findOne({
        where: { staffId },
      });
      if (!account.staff) {
        throw new NotFoundException('Staff member not found');
      }
    }

    if (password) {
      account.passwordHash = await bcrypt.hash(password, 10);
    }

    Object.assign(account, rest);
    return this.userAccountRepository.save(account);
  }

  async remove(userId: number) {
    const account = await this.findOne(userId);
    await this.userAccountRepository.remove(account);
  }
}
