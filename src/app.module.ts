import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';

@Module({
  providers: [AppService],
  imports: [UserModule],
})
export class AppModule {}
