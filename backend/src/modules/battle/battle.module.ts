import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleGateway } from './battle.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BattleSession,
  BattleSessionAttacksLog,
  BattleSessionUser,
  BattleSessionUserMeme,
} from './battle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BattleSession,
      BattleSessionUser,
      BattleSessionUserMeme,
      BattleSessionAttacksLog,
    ]),
  ],
  providers: [BattleGateway, BattleService],
})
export class BattleModule {}
