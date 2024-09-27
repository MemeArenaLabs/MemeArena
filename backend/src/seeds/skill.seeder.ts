// src/seeds/skill.seeder.ts

import { DataSource } from 'typeorm';
import { Meme, Skill, SkillType } from '../modules/meme/meme.entity';

export async function seedSkills(dataSource: DataSource, memes: Meme[]): Promise<void> {
  const skillRepository = dataSource.getRepository(Skill);

  for (const meme of memes) {
    for (let i = 1; i <= 4; i++) {
      const skill = skillRepository.create({
        name: `${meme.name} Skill ${i}`,
        damage: 50 + i * 10,
        speed: 1,
        skillType: SkillType.DAMAGE,
        meme,
      });
      await skillRepository.save(skill);
    }
    const skill = skillRepository.create({
      name: `Switch meme`,
      damage: 0,
      speed: 1,
      skillType: SkillType.SWITCH,
      meme,
    });
    await skillRepository.save(skill);
  }

  console.log('Skills seeded successfully!');
}
