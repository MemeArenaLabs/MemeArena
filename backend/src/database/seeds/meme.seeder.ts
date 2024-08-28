import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Meme } from '../../modules/meme/meme.entity';
import { User } from '../../modules/user/user.entity';
import { Token } from '../../modules/token/token.entity';

export default class MemeSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const memeRepository = dataSource.getRepository(Meme);
    const userRepository = dataSource.getRepository(User);
    const tokenRepository = dataSource.getRepository(Token);

    const users = await userRepository.find();
    const tokens = await tokenRepository.find();

    for (const user of users) {
      for (const token of tokens) {
        await memeRepository.insert([
          {
            name: `Meme of ${token.symbol} for ${user.username}`,
            hp: 100,
            attack: 50,
            defense: 30,
            criticChance: 10,
            speed: 40,
            user: user,
            token: token,
          },
          {
            name: `Second Meme of ${token.symbol} for ${user.username}`,
            hp: 120,
            attack: 60,
            defense: 40,
            criticChance: 15,
            speed: 35,
            user: user,
            token: token,
          },
        ]);
      }
    }

    console.log('Memes seeded successfully!');
  }
}
