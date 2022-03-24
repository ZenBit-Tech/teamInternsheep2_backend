import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SESSION_SECRET || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class RegisterModule {}
