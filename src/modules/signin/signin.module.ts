import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SigninController } from './signin.controller';

@Module({
  providers: [SigninService],
  controllers: [SigninController]
})
export class SigninModule {}
