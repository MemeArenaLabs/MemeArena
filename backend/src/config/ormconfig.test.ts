// src/config/ormconfig.test.ts

import { DataSourceOptions } from 'typeorm';
import { Meme, UserMeme, Skill } from '../modules/meme/meme.entity';
import { User } from '../modules/user/user.entity';
import { Token } from '../modules/token/token.entity';
import {
  BattleSession,
  BattleSessionAttacksLog,
  BattleSessionUser,
  BattleSessionUserMeme,
} from '../modules/battle/battle.entity';

export const typeOrmTestConfig: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [
    Meme,
    User,
    Token,
    Skill,
    UserMeme,
    BattleSession,
    BattleSessionAttacksLog,
    BattleSessionUser,
    BattleSessionUserMeme,
  ],
  synchronize: true,
  logging: false,
};
