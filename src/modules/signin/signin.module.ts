import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SigninController } from './signin.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';

@Module({
  providers: [SigninService],
  controllers: [SigninController],
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
export class SigninModule {}
