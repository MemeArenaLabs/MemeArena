import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user/user.entity';
import { Meme } from '../../modules/meme/meme.entity';

export default class MemeSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const memeRepository = dataSource.getRepository(Meme);

    const users = await userRepository.find();

    for (const user of users) {
      await memeRepository.insert([
        {
          name: `Meme 1 for ${user.username}`,
          tokenId: `token1_${user.id}`,
          hp: 100,
          attack: 50,
          defense: 30,
          criticChance: 10,
          speed: 40,
          user: user,
        },
        {
          name: `Meme 2 for ${user.username}`,
          tokenId: `token2_${user.id}`,
          hp: 120,
          attack: 60,
          defense: 40,
          criticChance: 15,
          speed: 35,
          user: user,
        },
      ]);
    }
  }
}