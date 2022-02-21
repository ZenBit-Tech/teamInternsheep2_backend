import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { GoogleStrategy } from "./modules/google/google.strategy";

@Module({
  providers: [AppService],
  imports: [UserModule, GoogleStrategy],
})
export class AppModule {}
