import { Module } from '@nestjs/common';
import { RegisterModule } from '../register/register.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SigninModule } from '../signin/signin.module';
import { User } from './users.entity';

const entities = [User];

//Database connection
@Module({
  controllers:[UsersController],
  providers:[UsersService],
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type:"mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: false,
    }),
  SigninModule, RegisterModule],
})
export class UsersModule {}
