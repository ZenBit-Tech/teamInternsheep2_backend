import { ApiProperty } from '@nestjs/swagger';

export class JobDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: number;

  @ApiProperty({ example: 'Bob', description: 'First name' })
  title: string;

  @ApiProperty({ example: 'Bob', description: 'First name' })
  description: string;

  @ApiProperty({ example: 'Sponque', description: 'Last name' })
  hourlyRate: string;

  @ApiProperty({ example: 'qwert@gmail.com', description: 'email' })
  duration: string;

  @ApiProperty({ example: '111111', description: 'password' })
  englishLvl: string;

  @ApiProperty({ example: '+380502221435', description: 'Phone number' })
  userId: string;
}
