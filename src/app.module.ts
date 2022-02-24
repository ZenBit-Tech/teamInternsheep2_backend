import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { GoogleStrategy } from "./modules/google/google.strategy";
import { MailModule } from './modules/mail/mail.module';;

@Module({
  providers: [AppService],
  imports: [
    UsersModule,
    MailModule,
    GoogleStrategy
  ],
})
export class AppModule {}
