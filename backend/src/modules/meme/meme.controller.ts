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

}
