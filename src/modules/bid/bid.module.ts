import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Bid } from 'src/entities/bid.entity';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { User } from 'src/entities/users.entity';

@Module({
  controllers: [BidController],
  providers: [BidService],
  imports: [TypeOrmModule.forFeature([Bid, User]), AuthModule],
})
export class BidModule {}
