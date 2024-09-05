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
        username: 'cryptonahue',
        walletAddress: '6xzWtYzuE9fNf4n6VbFKHjNZS9Gmr8pDfAGc8ngSEeSY',
      },
      {
        username: 'jane_doe',
        walletAddress: '0xJaneDoeWalletAddress',
      },
    ]);

    console.log('Users seeded successfully!');
  }
}
