import { Module } from '@nestjs/common';
import { MemeService } from './meme.service';
import { MemeController } from './meme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meme } from './meme.entity';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meme])],
  controllers: [MemeController],
  providers: [MemeService],
  exports: [MemeService],
})
export class MemeModule {}
