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
import { PrisonersService } from './prisoners.service';
import { CreatePrisonerDto } from './dto/create-prisoner.dto';
import { UpdatePrisonerDto } from './dto/update-prisoner.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { STAFF_ROLES, UserType } from 'src/shared/utils/enum';

@Controller('api/prisoners')
@UseGuards(AuthRolesGuard)
export class PrisonersController {
  constructor(private readonly prisonersService: PrisonersService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.WARDEN, UserType.CASE_MANAGER)
  create(@Body() createPrisonerDto: CreatePrisonerDto) {
    return this.prisonersService.create(createPrisonerDto);
  }

  @Get()
  @Roles(...STAFF_ROLES)
  findAll() {
    return this.prisonersService.findAll();
  }

  @Get(':id')
  @Roles(...STAFF_ROLES)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prisonersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.WARDEN, UserType.CASE_MANAGER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrisonerDto: UpdatePrisonerDto,
  ) {
    return this.prisonersService.update(id, updatePrisonerDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.WARDEN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prisonersService.remove(id);
  }
}
