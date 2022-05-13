import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { TagsJob } from './tags_job.entity';
import { Bid } from './bid.entity';
import { User } from './users.entity';

@Entity()
export class Job extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'connect your site to cms', description: 'title' })
  @Column({ type: 'varchar', width: 255, unique: true })
  title: string;

  @ApiProperty({ example: 'createJob api for bot', description: 'description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ example: '15$', description: 'Hourly rate' })
  @Column({ type: 'varchar', width: 50 })
  hourlyRate: string;

  @ApiProperty({
    example: '3 day',
    description: 'time need that u finish order',
  })
  @Column({ type: 'varchar', width: 50 })
  duration: string;

  @ApiProperty({ example: 'advanced', description: 'lvl of english' })
  @Column({
    type: 'enum',
    enum: ['Advanced', 'Intermediate', 'Elementary'],
  })
  englishLevel: string;

  @Column({
    type: 'int',
  })
  userId: number;

  @OneToMany(() => TagsJob, (tagsToJob) => tagsToJob.job)
  tagsToJobs!: TagsJob[];

  @OneToMany(() => Bid, (bid) => bid.job)
  bids: Bid[];

  @ManyToOne(() => User, (user) => user.jobs)
  user: User;
}
