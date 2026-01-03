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
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { UserType } from 'src/shared/utils/enum';

@Controller('api/visits')
@UseGuards(AuthRolesGuard)
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  create(@Body() createVisitDto: CreateVisitDto) {
    return this.visitsService.create(createVisitDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  findAll() {
    return this.visitsService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.visitsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitDto: UpdateVisitDto,
  ) {
    return this.visitsService.update(id, updateVisitDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitsService.remove(id);
  }
}
