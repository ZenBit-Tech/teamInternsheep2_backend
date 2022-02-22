import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class RegisterModule {}
