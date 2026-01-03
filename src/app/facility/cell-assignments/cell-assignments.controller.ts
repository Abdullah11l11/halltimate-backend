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
import { CellAssignmentsService } from './cell-assignments.service';
import { CreateCellAssignmentDto } from './dto/create-cell-assignment.dto';
import { UpdateCellAssignmentDto } from './dto/update-cell-assignment.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { UserType } from 'src/shared/utils/enum';

@Controller('api/cell-assignments')
@UseGuards(AuthRolesGuard)
export class CellAssignmentsController {
  constructor(
    private readonly cellAssignmentsService: CellAssignmentsService,
  ) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.WARDEN, UserType.GUARD)
  create(@Body() createCellAssignmentDto: CreateCellAssignmentDto) {
    return this.cellAssignmentsService.create(createCellAssignmentDto);
  }

  @Get()
  @Roles(UserType.ADMIN, UserType.WARDEN, UserType.GUARD)
  findAll() {
    return this.cellAssignmentsService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN, UserType.WARDEN, UserType.GUARD)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cellAssignmentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.WARDEN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCellAssignmentDto: UpdateCellAssignmentDto,
  ) {
    return this.cellAssignmentsService.update(id, updateCellAssignmentDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN, UserType.WARDEN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cellAssignmentsService.remove(id);
  }
}
