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
import { TokenModule } from '../token/token.module';
import { MemeModule } from '../meme/meme.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BattleSession,
      BattleSessionUser,
      BattleSessionUserMeme,
      BattleSessionAttacksLog,
    ]),
    MemeModule,
    TokenModule,
    UserModule
  ],
  providers: [BattleGateway, BattleService],
})
export class BattleModule {}
