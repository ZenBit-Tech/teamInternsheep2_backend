import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.user.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.save(dto);
      return user;
    } catch (e) {
      throw new ConflictException(e.sqlMessage);
    }
  }
}
