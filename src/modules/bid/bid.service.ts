import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

import { Bid } from 'src/entities/bid.entity';
import { User } from 'src/entities/users.entity';
import { BidDto } from '../dto/bid.dto';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidRepository: Repository<Bid>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      const bids = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :userId', {
          userId: userId,
        })
        .leftJoinAndSelect('user.jobs', 'Job')
        .leftJoinAndSelect('Job.bids', 'Bid')
        .getMany();

      let count = 0;
      bids[0].jobs.forEach((e) => {
        e.bids.forEach((item) => {
          if (item.isChecked == false)
            // eslint-disable-next-line no-plusplus
            count++;
        });
      });

      return count;
    } catch (e) {
      return e;
    }
  }

  // юзер бере свої роботи і через роботи витаскує bid
  async getAllBids(userId: number): Promise<Bid[]> {
    try {
      const bids = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :userId', {
          userId: userId,
        })
        .leftJoinAndSelect('user.jobs', 'Job')
        .leftJoinAndSelect('Job.bids', 'Bid')
        .getMany();

      const result = [];
      bids[0].jobs.forEach((e) => {
        e.bids.forEach((item) => {
          result.push(item);
        });
      });

      return result;
    } catch (e) {
      return e;
    }
  }
}
