import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { TagsJob } from './tags_job.entity';

@Entity()
export class Tags extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'create unique design', description: 'Name' })
  @Column({ type: 'varchar', width: 30 })
  name: string;

  @OneToMany(() => TagsJob, (tagsToJob) => tagsToJob.tags)
  tagsToJobs!: TagsJob[];
}
