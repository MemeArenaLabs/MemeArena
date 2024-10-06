// src/modules/teams/teams.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserMeme } from '../meme/meme.entity';
import { Team } from './team.entity';
import { TeamsController } from './team.controller';
import { TeamsService } from './team.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, UserMeme])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamModule {}
