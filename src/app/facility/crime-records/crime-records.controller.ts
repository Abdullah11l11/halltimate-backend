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
import { CrimeRecordsService } from './crime-records.service';
import { CreateCrimeRecordDto } from './dto/create-crime-record.dto';
import { UpdateCrimeRecordDto } from './dto/update-crime-record.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { UserType } from 'src/shared/utils/enum';

@Controller('api/crime-records')
@UseGuards(AuthRolesGuard)
export class CrimeRecordsController {
  constructor(private readonly crimeRecordsService: CrimeRecordsService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER)
  create(@Body() createCrimeRecordDto: CreateCrimeRecordDto) {
    return this.crimeRecordsService.create(createCrimeRecordDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER, UserType.WARDEN)
  findAll() {
    return this.crimeRecordsService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER, UserType.WARDEN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.crimeRecordsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCrimeRecordDto: UpdateCrimeRecordDto,
  ) {
    return this.crimeRecordsService.update(id, updateCrimeRecordDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.crimeRecordsService.remove(id);
  }
}
