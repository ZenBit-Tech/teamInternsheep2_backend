import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { GoogleStrategy } from "./modules/google/google.strategy";
import { MailModule } from './modules/mail/mail.module';;

@Module({
  imports: [UserModule, GoogleStrategy, MailModule],
})
export class AppModule {}
