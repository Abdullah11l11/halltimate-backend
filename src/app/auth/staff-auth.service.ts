import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAccount } from 'src/database/entities/user-account.entity';
import { StaffLoginDto } from './dto/staff-login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadType } from 'src/shared/utils/types';

@Injectable()
export class StaffAuthService {
  constructor(
    @InjectRepository(UserAccount)
    private readonly userAccountRepo: Repository<UserAccount>,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginDto: StaffLoginDto) {
    const { username, password } = loginDto;

    const account = await this.userAccountRepo.findOne({
      where: { username },
      relations: ['staff'],
    });

    if (!account || !account.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, account.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    account.lastLogin = new Date();
    await this.userAccountRepo.save(account);

    const payload: JwtPayloadType = {
      id: account.id.toString(),
      sub: account.staff?.fullName ?? account.username,
      userType: account.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        id: account.id,
        username: account.username,
        role: account.role,
        isActive: account.isActive,
        lastLogin: account.lastLogin,
        staff: account.staff
          ? {
              id: account.staff.id,
              fullName: account.staff.fullName,
              position: account.staff.position,
              status: account.staff.status,
            }
          : null,
      },
    };
  }
}
