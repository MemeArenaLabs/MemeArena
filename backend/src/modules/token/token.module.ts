import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './token.entity';
import { MemeModule } from '../meme/meme.module';
import { Meme } from '../meme/meme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token, Meme]), MemeModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule {}
