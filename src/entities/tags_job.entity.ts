import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Job } from './job.entity';
import { Tags } from './tags.entity';

@Entity()
export class TagsJob extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: '2', description: 'tag id' })
  @Column({ type: 'int' })
  tagsId: number;

  @ApiProperty({ example: '1', description: 'job id' })
  @Column({ type: 'int' })
  jobId: number;

  @ManyToOne(() => Job, (job) => job.tagsToJobs)
  job: Job;

  @ManyToOne(() => Tags, (tags) => tags.tagsToJobs)
  tags: Tags;
}
