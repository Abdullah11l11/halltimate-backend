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
import { UserAccountsService } from './user-accounts.service';
import { CreateUserAccountDto } from './dto/create-user-account.dto';
import { UpdateUserAccountDto } from './dto/update-user-account.dto';
import { AuthRolesGuard } from 'src/app/user/guard/auth-roles.guard';
import { Roles } from 'src/app/user/decorator/user-role.decorator';
import { UserType } from 'src/shared/utils/enum';

@Controller('api/users')
@UseGuards(AuthRolesGuard)
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountsService) {}

  @Post()
  @Roles(UserType.ADMIN)
  create(@Body() createUserAccountDto: CreateUserAccountDto) {
    return this.userAccountsService.create(createUserAccountDto);
  }

  @Get()
  @Roles(UserType.ADMIN)
  findAll() {
    return this.userAccountsService.findAll();
  }

  @Get(':id')
  @Roles(UserType.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userAccountsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserAccountDto: UpdateUserAccountDto,
  ) {
    return this.userAccountsService.update(id, updateUserAccountDto);
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userAccountsService.remove(id);
  }
}
