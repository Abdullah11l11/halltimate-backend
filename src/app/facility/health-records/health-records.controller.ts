import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HealthRecordsService } from './health-records.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { UpdateHealthRecordDto } from './dto/update-health-record.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { UserType } from 'src/shared/utils/enum';

@Controller('api/health-records')
@UseGuards(AuthRolesGuard)
export class HealthRecordsController {
  constructor(private readonly healthRecordsService: HealthRecordsService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.MEDICAL)
  create(@Body() createHealthRecordDto: CreateHealthRecordDto) {
    return this.healthRecordsService.create(createHealthRecordDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.MEDICAL)
  findAll() {
    return this.healthRecordsService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.MEDICAL)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.healthRecordsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.MEDICAL)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHealthRecordDto: UpdateHealthRecordDto,
  ) {
    return this.healthRecordsService.update(id, updateHealthRecordDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.healthRecordsService.remove(id);
  }
}
