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
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { UserType } from 'src/shared/utils/enum';

@Controller('api/cases')
@UseGuards(AuthRolesGuard)
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER)
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.casesService.create(createCaseDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER, UserType.WARDEN)
  findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER, UserType.WARDEN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.casesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCaseDto: UpdateCaseDto,
  ) {
    return this.casesService.update(id, updateCaseDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.CASE_MANAGER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.casesService.remove(id);
  }
}
