import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class signinEntity {
  @ApiProperty({ example: 'Bob', description: 'First name' })
  @Column({ type: 'varchar', width: 30 })
  firstName: string;

  @ApiProperty({ example: 'Sponque', description: 'Last name' })
  @Column({ type: 'varchar', width: 30 })
  lastName: string;

  @ApiProperty({ example: 'qwerty@gmail.com', description: 'email' })
  @Column({ type: 'varchar', width: 50, unique: true })
  email: string;

  @ApiProperty({ example: '+380509995263', description: 'Phone number' })
  @Column({
    type: 'varchar',
    length: 13,
    unique: true,
    nullable: true,
  })
  phoneNumber: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp6b21iaTFAcmFtYmxuZXJsZS51YSIsInBob25lTnVtYmVyIjoiKzM4MDUwODgzNDgyIiwiaWQiOjcsInVzZXJSb2xlIjoiRW1wbG95ZXIiLCJmaXJzdE5hbWUiOiJhcnRlbSIsImxhc3ROYW1lIjoiemh1cmJleSIsImlhdCI6MTY0ODY0OTcxOCwiZXhwIjoxNjQ4NzM2MTE4fQ.DPlcoLJMO23yQY7u2MYbUE5O-FnP7mIV5MoZvcH3sLo',
    description: 'jwtToken',
  })
  @Column({ type: 'varchar', width: 30 })
  token: any;
}
