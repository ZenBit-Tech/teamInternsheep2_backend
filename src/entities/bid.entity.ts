import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './users.entity';
import { Job } from './job.entity';

@Entity()
export class Bid extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    example: 'createJob unique design. with adaptive',
    description: 'description',
  })
  @Column({ type: 'varchar' })
  description: string;

  @ApiProperty({ example: 'Sponque', description: 'Attachment' })
  @Column({ type: 'varchar', width: 30 })
  attachment: string;

  @ApiProperty({ example: '10$', description: 'Price' })
  @Column({ type: 'varchar', width: 10 })
  price: string;

  @ApiProperty({ example: 'isCheked', description: 'true' })
  @Column({ type: 'varchar', width: 50, default: false })
  isChecked: boolean;

  @ApiProperty({ example: '1', description: 'job id' })
  @Column({ type: 'int' })
  userId: number;

  @ApiProperty({ example: '2', description: 'user id' })
  @Column({ type: 'int' })
  jobId: number;

  @ManyToOne(() => User, (user) => user.bids)
  user!: User;

  @ManyToOne(() => Job, (job) => job.bids)
  job!: Job;
}
