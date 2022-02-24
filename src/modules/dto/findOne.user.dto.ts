import { IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class findOne {
  @ApiProperty({ example: '1', description: 'Id' })
  @IsNumberString()
  id: number;
}
