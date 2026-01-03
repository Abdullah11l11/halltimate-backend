import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { StaffAuthService } from './staff-auth.service';
import { StaffLoginDto } from './dto/staff-login.dto';

@Controller('api/auth')
export class StaffAuthController {
  constructor(private readonly staffAuthService: StaffAuthService) {}

  @Post('staff/login')
  @HttpCode(HttpStatus.OK)
  public staffLogin(@Body() loginDto: StaffLoginDto) {
    return this.staffAuthService.login(loginDto);
  }
}
