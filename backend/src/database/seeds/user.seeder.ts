import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        username: 'user1',
        walletAddress: '0x1234567890123456789012345678901234567890',
      },
      {
        username: 'user2',
        walletAddress: '0x0987654321098765432109876543210987654321',
      },
    ]);
  }
}