import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [SettingsService],
  controllers: [SettingsController],
  imports: [AuthModule],
})
export class SettingsModule {}
