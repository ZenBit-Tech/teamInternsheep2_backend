import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { User } from '../users/users.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Регистрация')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @ApiOperation({ summary: 'Создание пользователя' }) // описывает для чего данный запрос
  @ApiResponse({ status: 200, type: User }) // ожидаемый ответ от сервера
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.registerService.createUser(userDto);
  }
}
