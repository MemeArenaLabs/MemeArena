import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    await userRepository.insert([
      {
        username: 'john_doe',
        walletAddress: '0xJohnDoeWalletAddress',
      },
      {
        username: 'jane_doe',
        walletAddress: '0xJaneDoeWalletAddress',
      },
    ]);

    console.log('Users seeded successfully!');
  }
}
