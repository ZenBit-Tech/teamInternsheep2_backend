import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobController } from './job.controller';
import { Job } from 'src/entities/job.entity';
import { AuthModule } from '../auth/auth.module';
import { JobService } from './job.service';
import { TagsJob } from '../../entities/tags_job.entity';
import { Tags } from '../../entities/tags.entity';
import { TagsService } from '../tags/tags.service';

@Module({
  controllers: [JobController],
  providers: [JobService, TagsService],
  imports: [TypeOrmModule.forFeature([Job, TagsJob, Tags]), AuthModule],
})
export class JobModule {}
