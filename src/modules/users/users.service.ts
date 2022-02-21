import {Injectable, Inject, forwardRef} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './users.entity';
import {getConnection, Repository} from 'typeorm';
import {CreateUserDto} from '../../dto/create.user.dto';
import {oneUser} from "../../dto/findOne.user.dto";
import { UserModule } from './user.module';

@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => UserModule))
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        
    ) {
    }
    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.usersRepository.save(dto);
            return user;
        } catch (e) {
            return e
        }
    }

    async getAllUsers() {
        try {
            const users = await this.usersRepository.find();
            return users;
        } catch (e) {
            return e
        }
    }

    async getOneUser(id: oneUser) {
        try {
            const user = await this.usersRepository.findOne({where: id});
            return user;
        } catch (e) {
            return e
        }
    }

    async removeUser(id: oneUser) {
        try {
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(User)
                .where("id = :id", {id})
                .execute();
            return 'Успішне видалення'
        } catch (e) {
            return e
        }
    }
}
