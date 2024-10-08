// src/seeds/seeder.ts

import { DataSource } from 'typeorm';
import { seedTokens } from './token.seeder';
import { seedMemes } from './meme.seeder';
import { seedSkills } from './skill.seeder';
import { seedUsers } from './user.seeder';
import { seedUserMemes } from './user-meme.seeder';

import { User } from '../modules/user/user.entity';
import { Meme, UserMeme, Skill } from '../modules/meme/meme.entity';
import { Token } from '../modules/token/token.entity';
import { BattleSessionUserMeme } from '../modules/battle/battle.entity';
import { Team } from '../modules/team/team.entity';
import { seedTeams } from './team.seeder';

export async function seedDatabase(dataSource: DataSource) {
  console.log('start')
  try{
    await dataSource.manager.delete(BattleSessionUserMeme, {});
    await dataSource.manager.delete(UserMeme, {});
    await dataSource.manager.delete(Skill, {});
    await dataSource.manager.delete(Meme, {});
    await dataSource.manager.delete(Token, {});
    await dataSource.manager.delete(Team, {});
    await dataSource.manager.delete(User, {});
    await dataSource.manager.delete(Team, {});
  
    const tokens = await seedTokens(dataSource);
    const memes = await seedMemes(dataSource, tokens);
    await seedSkills(dataSource, memes);
    const users = await seedUsers(dataSource);
    await seedUserMemes(dataSource, users, memes);
    await seedTeams(dataSource);
  }
  catch(error){
    console.log({error})
  }
}
