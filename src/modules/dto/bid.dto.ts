import { ApiProperty } from '@nestjs/swagger';

export class BidDto {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  id: number;

  @ApiProperty({
    example: 'createJob unique design. with adaptive',
    description: 'description',
  })
  description: string;

  @ApiProperty({ example: 'Sponque', description: 'Attachment' })
  attachment: string;

  @ApiProperty({ example: '10$', description: 'Price' })
  price: string;

  @ApiProperty({ example: 'isCheked', description: 'true' })
  isChecked: boolean;

  @ApiProperty({ example: '1', description: 'job id' })
  jobId: number;
}
