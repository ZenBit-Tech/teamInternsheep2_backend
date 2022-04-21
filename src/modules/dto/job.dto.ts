import { ApiProperty } from '@nestjs/swagger';

export class JobDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: number;

  @ApiProperty({ example: 'creating cms', description: 'how this job name' })
  title: string;

  @ApiProperty({ example: 'seo to top', description: 'about task' })
  description: string;

  @ApiProperty({
    example: 'Sponque',
    description: 'how much  money u want get for 1h',
  })
  hourlyRate: string;

  @ApiProperty({
    example: '2 week',
    description: 'how many time u need that do this task',
  })
  duration: string;

  @ApiProperty({
    example: 'Beginer',
    description: 'which english lvl user have',
  })
  englishLvl: string;

  @ApiProperty({ example: '2', description: 'User id' })
  userId: string;
}

export class Pagination {
  @ApiProperty({ example: 'Bob', description: 'First name' })
  page: number;

  @ApiProperty({ example: 'Bob', description: 'First name' })
  limit: number;
}
