import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../entities/users.entity';
import { findOne } from '../dto/findOne.user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Getting all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Getting a user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getOne(@Param() params: findOne): Promise<User> {
    return this.usersService.getOneUser(params);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 200, type: User })
  @Delete('?')
  del(@Query('id') id: findOne): Promise<string> {
    return this.usersService.removeUser(id);
  }
}
