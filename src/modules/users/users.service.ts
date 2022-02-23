import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';
import { oneUser } from '../dto/findOne.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.save(dto);
      return user;
    } catch (e) {
      return e;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (e) {
      return e;
    }
  }

  async getOneUser(id: oneUser): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: id });
      return user;
    } catch (e) {
      return e;
    }
  }

  async removeUser(id: oneUser): Promise<string> {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();
      return 'User deletion completed successfully';
    } catch (e) {
      return e;
    }
  }
}
