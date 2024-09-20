import { Module } from '@nestjs/common';
import { MemeService } from './meme.service';
import { MemeController } from './meme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meme, Skill, UserMeme } from './meme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meme, UserMeme, Skill])],
  controllers: [MemeController],
  providers: [MemeService],
  exports: [MemeService],
})
export class MemeModule {}
