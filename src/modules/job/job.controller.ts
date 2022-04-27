import {Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards} from '@nestjs/common';
import { JobService } from './job.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Job } from '../../entities/job.entity';
import { JobDto, Pagination } from '../dto/job.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { jobInterface } from './job.interface';

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
  @Get('/getAll')
  getAll(
    @Query() dto: Pagination,
  ): Promise<{ listJobs: jobInterface[]; totalJobs: number }> {
    return this.jobService.getAllJobs(dto);
  }

  @ApiOperation({ summary: 'Getting a job by title' })
  @ApiResponse({ status: 200, type: Job })
  @Get('/title')
  getOneByTitle(@Body() title: string): Promise<Job> {
    return this.jobService.getJobByTitle(title);
  }

  @ApiOperation({ summary: 'Getting a job by id' })
  @ApiResponse({ status: 200, type: Job })
  @Get(':id')
  getOneById(@Param('id', ParseIntPipe) id: number): Promise<jobInterface> {
    return this.jobService.getJobById(id);
  }
}
