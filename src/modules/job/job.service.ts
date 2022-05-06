import {Injectable, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';
import { JobDto, Pagination } from '../dto/job.dto';
import { TagsJob } from 'src/entities/tags_job.entity';

import { TagsService } from '../tags/tags.service';
import { jobInterface } from './job.interface';
import { Tags } from 'src/entities/tags.entity';
import {JwtAuthGuard} from "../auth/jwt.auth.guard";

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,

    @InjectRepository(TagsJob)
    private jobTagsRepository: Repository<TagsJob>,

    private tagsService: TagsService,
  ) {}

  async createJob(dto: JobDto, userId: number): Promise<Job | string> {
    try {
      const application = await this.jobRepository.findOne({
        where: { title: dto.title },
      });
      if (application) {
        throw new HttpException(
          'a job with the same title already exists ',
          HttpStatus.BAD_REQUEST,
        );
      }
      const job = await this.jobRepository.save({ ...dto, userId: userId });
      await this.addTagsToJob(dto.tags, job.id);

      return job;
    } catch (e) {
      return e;
    }
  }

  async getAllJobs(
    dto: Pagination,
  ): Promise<[jobInterface[], number ]> {
    try {
      const page: number = dto.page || 1;
      const limit: number = dto.limit || 10;
      const offset: number = page * limit - limit;

      const jobsWithTags = await this.jobRepository
          .createQueryBuilder('job')
          .leftJoinAndSelect('job.tagsToJobs', 'TagsJob' , 'job.id = TagsJob.jobId')
          .leftJoinAndSelect('TagsJob.tags', 'Tags', 'Tags.id = TagsJob.tagsId')
          .select(['job', 'TagsJob', 'Tags.name'])
          .take(limit)
          .skip(offset)
          .getManyAndCount();

      return jobsWithTags;
    } catch (e) {
      return e;
    }
  }

  async getJobById(id: number): Promise<jobInterface> {
    try {
      const jobWithTags = await this.jobRepository
          .createQueryBuilder('job')
          .where('job.id = :id', {id: id})
          .leftJoinAndSelect('job.tagsToJobs', 'TagsJob' , 'job.id = TagsJob.jobId')
          .leftJoinAndSelect('TagsJob.tags', 'Tags', 'Tags.id = TagsJob.tagsId')
          .select(['job', 'TagsJob', 'Tags.name'])
          .getOne();

      return jobWithTags;
    } catch (e) {
      return e;
    }
  }

// закидує дані в проміжну таблицю
  async addTagsToJob(tags: string[], jobId: number): Promise<string> {
    try {
      for (const element of tags) {
        const findTag = await this.tagsService.getTagByName(element);
        const jobTags = await this.jobTagsRepository.save({
          tagsId: findTag.id,
          jobId: jobId,
        });
      }
      return 'success';
    } catch (e) {
      return e;
    }
  }
}
