import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobController } from './job.controller';
import { Job } from 'src/entities/job.entity';
import { AuthModule } from '../auth/auth.module';
import { JobService } from './job.service';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [TypeOrmModule.forFeature([Job]), AuthModule],
})
export class JobModule {}
