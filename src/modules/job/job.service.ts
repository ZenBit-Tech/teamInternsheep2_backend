import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';
import { JobDto, Pagination } from '../dto/job.dto';
import { TagsJob } from 'src/entities/tags_job.entity';

import { TagsService } from '../tags/tags.service';
import { jobInterface } from './job.interface';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,

    @InjectRepository(TagsJob)
    private jobTagsRepository: Repository<TagsJob>,

    private tagsService: TagsService,
  ) {}

  async createJob(dto: JobDto): Promise<Job | string> {
    try {
      const application = await this.getJobByTitle(dto.title);
      if (application) {
        throw new HttpException(
          'a job with the same title already exists ',
          HttpStatus.BAD_REQUEST,
        );
      }
      const job = await this.jobRepository.save(dto);

      await this.addTagsToJob(dto.tags, job.id);

      return job;
    } catch (e) {
      return e;
    }
  }

  async getAllJobs(
    dto: Pagination,
  ): Promise<{ listJobs: jobInterface[]; totalJobs: number }> {
    try {
      const page: number = dto.page || 1;
      const limit: number = dto.limit || 10;
      const offset: number = page * limit - limit;
      const jobs = await this.jobRepository.findAndCount({
        take: limit,
        skip: offset,
      });

      const result = await this.getJobsWithTags(jobs[0], jobs[1]);

      return result;
    } catch (e) {
      return e;
    }
  }

  async getJobsWithTags(jobs: Job[], count: number) {
    const result = {
      listJobs: [],
      totalJobs: count,
    };
    // @ts-ignore
    for (const item of jobs) {
      const id = item.id;
      const arr: string[] = [];
      // шукаєм в проміжній таблиці ід поста
      const jobTags = await this.jobTagsRepository.find({
        where: { jobId: id },
      });
      // шукаєм по ід імя тега і коли знаходим пушим в масів
      for (const item2 of jobTags) {
        const tags = await this.tagsService.getTagId(item2.tagsId);
        arr.push(tags.name);
      }
      // додаєм до поста теги
      const updateJob = { ...item, tags: arr };
      result.listJobs.push(updateJob);
    }
    return result;
  }

  async getJobByTitle(title: string): Promise<Job> {
    try {
      const job = await this.jobRepository.findOne({ where: { title } });
      return job;
    } catch (e) {
      return e;
    }
  }

  async getJobById(id: number): Promise<jobInterface> {
    try {
      const job = await this.jobRepository.findOne({ where: { id: id } });
      let arr = []

      const jobTags = await this.jobTagsRepository.find({
        where: { jobId: id },
      });

      for (const item of jobTags) {
        const tags = await this.tagsService.getTagId(item.tagsId);
        arr.push(tags.name);
      }

      const result = { ...job, tags: arr };

      return result;
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
