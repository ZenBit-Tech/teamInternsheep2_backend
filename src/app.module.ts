import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { GoogleStrategy } from "./modules/google/google.strategy";
import { MailModule } from './modules/mail/mail.module';;

@Module({
  providers: [AppService],
  imports: [UserModule, GoogleStrategy, MailModule],
})
export class AppModule {}
