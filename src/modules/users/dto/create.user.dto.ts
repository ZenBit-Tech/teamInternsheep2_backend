import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: number;

  @ApiProperty({ example: 'Игор', description: 'Имя' })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  lastName: string;

  @ApiProperty({ example: 'qwert@gmail.com', description: 'email' })
  email: string;

  @ApiProperty({ example: '111111', description: 'password' })
  password: string;

  @ApiProperty({ example: '+380502221435', description: 'Номер телефона' })
  phoneNumber: string;

  @ApiProperty({ example: 'Freelancer', description: 'userRole' })
  userRole: string;
}
