import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example:'Игор', description:'Имя'})
  firstName: string;

  @ApiProperty({example:'Иванов', description:'Фамилия'})
  lastName: string;

  @ApiProperty({example:'+380502221435', description:'Номер телефона'})
  phoneNumber: string;
}
