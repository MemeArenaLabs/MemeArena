// src/seeds/meme.seeder.ts

import { DataSource } from 'typeorm';
import { Meme } from '../modules/meme/meme.entity';
import { Token } from '../modules/token/token.entity';
import { ELEMENTS } from '../modules/battle/battle.constants';
import { PROFESSIONS } from '../modules/token/token.constants';

export async function seedMemes(dataSource: DataSource, tokens: Token[]): Promise<Meme[]> {
  const memeRepository = dataSource.getRepository(Meme);

  const elements = Object.values(ELEMENTS);
  const professions = Object.values(PROFESSIONS);

  const memes: Meme[] = [];

  for (const token of tokens) {
    for (const element of elements) {
      for (const profession of professions) {
        const meme = memeRepository.create({
          name: `${token.symbol} ${element} ${profession}`,
          hpBase: 1000,
          attackBase: 100,
          defenseBase: 100,
          speedBase: 100,
          element,
          profession,
          token,
        });
        await memeRepository.save(meme);
        memes.push(meme);
      }
    }
  }

  console.log('Memes seeded successfully!');
  return memes;
}
