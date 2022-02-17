import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './users.entity';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create.user.dto';
import {oneUser} from "./dto/findOne.user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.usersRepository.save(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.usersRepository.find();
        return users;
    }

    async getOneUser(id: oneUser) {
        const user = await this.usersRepository.findOne({where: id});
        return user;
    }

    async removeUser(id: oneUser) {
            const user = await this.usersRepository.delete(id)
        return 'Успішне видалення користувача'
    }
}
