import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Job } from '../../entities/job.entity';
import { JobDto } from '../dto/job.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @ApiOperation({ summary: 'Create new job post' })
  @ApiResponse({ status: 200, type: [Job] })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: JobDto): Promise<Job | string> {
    return this.jobService.createJob(dto);
  }

  @ApiOperation({ summary: 'Getting all jobs' })
  @ApiResponse({ status: 200, type: [Job] })
  @Get()
  getAll(): Promise<Job[]> {
    return this.jobService.getAllJobs();
  }

  @ApiOperation({ summary: 'Getting a job by title' })
  @ApiResponse({ status: 200, type: Job })
  @Get('/title')
  getOne(@Body() title: string): Promise<Job> {
    return this.jobService.getJobByTitle(title);
  }
}
