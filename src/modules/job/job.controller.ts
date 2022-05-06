import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
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
  async create(
    @Body() dto: JobDto,
    @Req() req,

  ): Promise<Job | string> {

    return this.jobService.createJob(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Getting all jobs' })
  @ApiResponse({ status: 200, type: [Job] })
  @Get('/getAll')
  getAll(
    @Query() dto: Pagination,
  ): Promise<[jobInterface[], number ]> {


    return this.jobService.getAllJobs(dto);
  }

  @ApiOperation({ summary: 'Getting a job by id' })
  @ApiResponse({ status: 200, type: Job })
  @Get(':id')
  getOneById(@Param('id', ParseIntPipe) id: number): Promise<jobInterface> {
    return this.jobService.getJobById(id);
  }
}
