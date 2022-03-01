import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { GoogleStrategy } from "./modules/google/google.strategy";
import { MailModule } from './modules/mail/mail.module';;
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  providers: [AppService],
  imports: [
    UsersModule,
    MailModule,
    GoogleStrategy,
    SettingsModule
  ],
})
export class AppModule {}
