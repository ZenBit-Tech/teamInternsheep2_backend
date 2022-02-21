import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
// import {UsersService} from './users.service';
// import {CreateUserDto} from '../../dto/create.user.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
// import {User} from "./users.entity";
// import {oneUser} from '../../dto/findOne.user.dto'


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    // constructor(
    //     private usersService: UsersService
    // ) {}

    // @ApiOperation({summary: 'Создание пользователя'}) //описывает для чего данный запрос
    // @ApiResponse({status: 200, type: User}) // ожидаемый ответ от сервера
    // @Post()
    // create(@Body() userDto: CreateUserDto):Promise<User> {
    //     return this.usersService.createUser(userDto);
    // }

    // @ApiOperation({summary: 'Получение всех пользователей'})
    // @ApiResponse({status: 200, type: [User]})
    // @Get()
    // getAll():Promise<User[]> {
    //     return this.usersService.getAllUsers();
    // }

    // @ApiOperation({summary: 'Получение пользывателя по id'})
    // @ApiResponse({status: 200, type: User})
    // @Get(':id')
    // getOne(@Param() params: oneUser):Promise<User> {
    //     return this.usersService.getOneUser(params);
    // }

    // @ApiOperation({summary: 'Удалить пользывателя по id'})
    // @ApiResponse({status: 200, type: User})
    // @Delete('?')
    // del(@Query('id') id: oneUser):Promise<string> {
    //     return this.usersService.removeUser(id);
    // }
}
