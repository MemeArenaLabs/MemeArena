import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { MemeService } from './meme.service';
import { UserMeme } from './meme.entity';

@Controller('memes')
export class MemeController {
  constructor(private readonly memeService: MemeService) {}

  @Get('wallet/:walletAddress')
  async getUserMemesByWalletAddress(@Param('walletAddress') walletAddress: string): Promise<UserMeme[]> {
    return this.memeService.findUserMemesByWalletAddress(walletAddress);
  }
}
