import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users.entity';
import { getConnection, Repository } from 'typeorm';
import { findOne } from '../dto/findOne.user.dto';
import { UsersModule } from './users.module';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => UsersModule))
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (e) {
      return e;
    }
  }

  async getOneUser(id: findOne): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ where: id });
      return user;
    } catch (e) {
      return e;
    }
  }

  async removeUser(id: findOne): Promise<string> {
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
