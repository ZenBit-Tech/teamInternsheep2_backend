import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { GoogleStrategy } from "./modules/google/google.strategy";
import { BaseMailModule } from './modules/Base-Mail-Module/base.mail.module';;

@Module({
  providers: [AppService],
  imports: [UserModule, GoogleStrategy, BaseMailModule],
})
export class AppModule {}
