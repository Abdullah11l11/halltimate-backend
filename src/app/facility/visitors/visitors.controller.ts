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
import { VisitorsService } from './visitors.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { UserType } from 'src/shared/utils/enum';

@Controller('api/visitors')
@UseGuards(AuthRolesGuard)
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  create(@Body() createVisitorDto: CreateVisitorDto) {
    return this.visitorsService.create(createVisitorDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  findAll() {
    return this.visitorsService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.visitorsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitorDto: UpdateVisitorDto,
  ) {
    return this.visitorsService.update(id, updateVisitorDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.VISITOR_OFFICER)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitorsService.remove(id);
  }
}
