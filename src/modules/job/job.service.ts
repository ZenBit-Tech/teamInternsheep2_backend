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
import { JobDto } from '../dto/job.dto';

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

  async getAllJobs(): Promise<Job[]> {
    try {
      const jobs = await this.jobRepository.find();
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
