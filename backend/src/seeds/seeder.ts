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

export async function seedDatabase(dataSource: DataSource) {
  console.log('start')
  try{
    console.log('1')
    await dataSource.manager.clear(UserMeme);
    console.log('2')

    await dataSource.manager.clear(User);
    console.log('3')

    await dataSource.manager.clear(Skill);
    console.log('4')

    await dataSource.manager.clear(Meme);
    console.log('5')

    await dataSource.manager.clear(Token);
    console.log('6')
  
    const tokens = await seedTokens(dataSource);
    console.log('7')

    const memes = await seedMemes(dataSource, tokens);
    console.log('8')

    await seedSkills(dataSource, memes);
    console.log('9')

    const users = await seedUsers(dataSource);
    console.log('10')

    await seedUserMemes(dataSource, users, memes);
  }
  catch(error){
    console.log({error})
  }
}
