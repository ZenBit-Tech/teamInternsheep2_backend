import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Bid } from 'src/entities/bid.entity';
import { BidService } from './bid.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { BidDto } from '../dto/bid.dto';

@ApiTags('Bid')
@Controller('bid')
export class BidController {
  constructor(private bidService: BidService) {}

  @ApiOperation({ summary: 'Getting all bids' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Req() req): Promise<Bid[]> {
    return this.bidService.getAllBids(req.user.id);
  }

  @ApiOperation({ summary: 'Getting all bids with checked false' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Get('/byStatus')
  getAllByStatus(@Req() req): Promise<number> {
    return this.bidService.getBidByStatus(req.user.id);
  }

  @ApiOperation({ summary: 'Create new bid ' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: BidDto, @Req() req): Promise<Bid | string> {
    return this.bidService.createBid(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Delete  bid ' })
  @ApiResponse({ status: 200, type: [Bid] })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delBid(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.bidService.deleteBid(id);
  }
}
