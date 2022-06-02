import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

import { Bid } from 'src/entities/bid.entity';
import { BidDto } from '../dto/bid.dto';
import { Job } from '../../entities/job.entity';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async createBid(dto: BidDto, userId: number): Promise<Bid | string> {
    try {
      const futureBid = { ...dto, userId: userId };
      const bid = await this.bidRepository.save(futureBid);
      return bid;
    } catch (e) {
      return e;
    }
  }

  async getBidId(id: number): Promise<Bid> {
    try {
      const bid = await this.bidRepository.findOne({ where: { id } });
      return bid;
    } catch (e) {
      return e;
    }
  }

  async deleteBid(id: number): Promise<string> {
    try {
      const bid = await this.getBidId(id);
      if (!bid) {
        throw new HttpException('error, try again', HttpStatus.BAD_REQUEST);
      }
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Bid)
        .where('id = :id', { id })
        .execute();
      return 'Success';
    } catch (e) {
      return e;
    }
  }

  async getBidByStatus(userId: number): Promise<number> {
    try {
      const bids = await this.jobRepository
        .createQueryBuilder('job')
        .where('job.userId = :userId', {
          userId: userId,
        })
        .leftJoinAndSelect('job.bids', 'Bid')
        .select('COUNT(Bid.id) AS count')
        .andWhere('Bid.id')
        .getRawMany();

      return bids[0].count;
    } catch (e) {
      return e;
    }
  }

  // берем роботи з ід юзера і  витаскує bid
  async getAllBids(userId: number): Promise<Bid[]> {
    try {
      const bids = await this.jobRepository
        .createQueryBuilder('job')
        .where('job.userId = :userId', {
          userId: userId,
        })
        .leftJoinAndSelect('job.bids', 'Bid')
        .select('Bid')
        .andWhere('Bid.id')
        .getRawMany();

      return bids;
    } catch (e) {
      return e;
    }
  }
}
