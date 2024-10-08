// src/seeds/team.seeder.ts

import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import { UserMeme } from '../modules/meme/meme.entity';
import { Team } from '../modules/team/team.entity';

export async function seedTeams(dataSource: DataSource): Promise<void> {
  const teamRepository = dataSource.getRepository(Team);
  const userRepository = dataSource.getRepository(User);
  const userMemeRepository = dataSource.getRepository(UserMeme);

  const users = await userRepository.find();

  for (const user of users) {
    const userMemes = await userMemeRepository.find({
      where: { user: { id: user.id } },
    });

    if (userMemes.length >= 4) {
      const teamSize = Math.floor(userMemes.length / 2);

      const userMemesGroup1 = userMemes.slice(0, teamSize);
      const userMemesGroup2 = userMemes.slice(teamSize, teamSize * 2);

      const team1 = teamRepository.create({
        name: `${user.username}'s Team 1`,
        user,
        userMemes: userMemesGroup1,
      });
      await teamRepository.save(team1);

      const team2 = teamRepository.create({
        name: `${user.username}'s Team 2`,
        user,
        userMemes: userMemesGroup2,
      });
      await teamRepository.save(team2);
    } else if (userMemes.length > 0) {
      const team = teamRepository.create({
        name: `${user.username}'s Team`,
        user,
        userMemes,
      });
      await teamRepository.save(team);
    }
  }

  console.log('Teams seeded successfully!');
}
