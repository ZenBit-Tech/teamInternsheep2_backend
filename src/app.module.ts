import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/users.entity';
import { UsersModule } from './modules/users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MySql_HOST,
      port: Number(process.env.MySql_PORT),
      username: process.env.MySql_USER,
      password: process.env.MySql_PASSWORD,
      database: process.env.MySql_DB,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
