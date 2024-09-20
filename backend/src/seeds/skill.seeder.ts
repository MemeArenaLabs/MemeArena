// src/seeds/skill.seeder.ts

import { DataSource } from 'typeorm';
import { Meme, Skill } from '../modules/meme/meme.entity';

export async function seedSkills(dataSource: DataSource, memes: Meme[]): Promise<void> {
  const skillRepository = dataSource.getRepository(Skill);

  for (const meme of memes) {
    for (let i = 1; i <= 4; i++) {
      const skill = skillRepository.create({
        name: `${meme.name} Skill ${i}`,
        damage: 50 + i * 10,
        speed: 1,
        meme,
      });
      await skillRepository.save(skill);
    }
  }

  console.log('Skills seeded successfully!');
}
