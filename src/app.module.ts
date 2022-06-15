import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { GoogleStrategy } from './modules/google/google.strategy';
import { MailModule } from './modules/mail/mail.module';
import { SettingsModule } from './modules/settings/settings.module';
import { JobModule } from './modules/job/job.module';
import { TagsModule } from './modules/tags/tags.module';
import { BidModule } from './modules/bid/bid.module';

@Module({
  providers: [AppService],
  imports: [
    UsersModule,
    MailModule,
    GoogleStrategy,
    SettingsModule,
    JobModule,
    TagsModule,
    BidModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
