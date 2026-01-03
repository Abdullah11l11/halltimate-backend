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
import { CellsService } from './cells.service';
import { CreateCellDto } from './dto/create-cell.dto';
import { UpdateCellDto } from './dto/update-cell.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { STAFF_ROLES, UserType } from 'src/shared/utils/enum';

@Controller('api/cells')
@UseGuards(AuthRolesGuard)
export class CellsController {
  constructor(private readonly cellsService: CellsService) {}

  @Post()
  @Roles(UserType.ADMIN, UserType.WARDEN)
  create(@Body() createCellDto: CreateCellDto) {
    return this.cellsService.create(createCellDto);
  }

  @Get()
  @Roles(...STAFF_ROLES)
  findAll() {
    return this.cellsService.findAll();
  }

  @Get(':id')
  @Roles(...STAFF_ROLES)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cellsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN, UserType.WARDEN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCellDto: UpdateCellDto,
  ) {
    return this.cellsService.update(id, updateCellDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cellsService.remove(id);
  }
}
