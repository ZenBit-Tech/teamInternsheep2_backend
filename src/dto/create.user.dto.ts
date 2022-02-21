import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    userRole: string;
  }