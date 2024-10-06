// src/seeds/team.seeder.ts

import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { Team } from '../modules/team/team.entity';
import { UserMeme } from '../modules/meme/meme.entity';

export async function seedTeams(dataSource: DataSource): Promise<void> {
  const teamRepository = dataSource.getRepository(Team);
  const userRepository = dataSource.getRepository(User);
  const userMemeRepository = dataSource.getRepository(UserMeme);

  const users = await userRepository.find();

  for (const user of users) {
    const userMemes = await userMemeRepository.find({
      where: { user: { id: user.id } },
      take: 3,
    });

    if (userMemes.length > 0) {
      const team = teamRepository.create({
        name: `${user.username}'s Team`,
        user,
        userMemes,
      });

      await teamRepository.save(team);

      for (const userMeme of userMemes) {
        userMeme.team = team;
        await userMemeRepository.save(userMeme);
      }
    }
  }

  console.log('Teams seeded successfully!');
}
