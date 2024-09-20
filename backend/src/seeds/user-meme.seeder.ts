// src/seeds/userMeme.seeder.ts

import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { Meme, UserMeme } from '../modules/meme/meme.entity';

export async function seedUserMemes(
  dataSource: DataSource,
  users: User[],
  memes: Meme[],
): Promise<void> {
  const userMemeRepository = dataSource.getRepository(UserMeme);

  for (const user of users) {
    for (let i = 0; i < 3; i++) {
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      const userMeme = userMemeRepository.create({
        user,
        meme: randomMeme,
        tokensLocked: 1000,
      });
      await userMemeRepository.save(userMeme);
    }
  }

  console.log('UserMemes seeded successfully!');
}
