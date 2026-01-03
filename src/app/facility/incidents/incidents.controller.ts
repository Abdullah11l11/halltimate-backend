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
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { UserType } from 'src/shared/utils/enum';

@Controller('api/incidents')
@UseGuards(AuthRolesGuard)
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.WARDEN, UserType.GUARD)
  create(@Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentsService.create(createIncidentDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.WARDEN, UserType.GUARD)
  findAll() {
    return this.incidentsService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.WARDEN, UserType.GUARD)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.incidentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.WARDEN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentsService.update(id, updateIncidentDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.incidentsService.remove(id);
  }
}
