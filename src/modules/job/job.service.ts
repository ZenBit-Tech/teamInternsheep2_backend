import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entities/job.entity';
import { Repository } from 'typeorm';
import {JobDto, Pagination} from '../dto/job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
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
      return job;
    } catch (e) {
      return e;
    }
  }

  async getAllJobs(dto: Pagination): Promise<[Job[], number]> {
    try {
      const page: number = dto.page || 1;
      const limit: number = dto.limit || 10;
      const offset: number = page * limit - limit;
      const jobs = await this.jobRepository.findAndCount({
        take: limit,
        skip: offset,
      });
      return jobs;

    } catch (e) {
      return e;
    }
  }

  async getJobByTitle(title: string): Promise<Job> {
    try {
      const job = await this.jobRepository.findOne({ where: { title } });
      return job;
    } catch (e) {
      return e;
    }
  }
}
