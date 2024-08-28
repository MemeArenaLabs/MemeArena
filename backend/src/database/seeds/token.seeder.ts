import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Token } from '../../modules/token/token.entity';

export default class TokenSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const tokenRepository = dataSource.getRepository(Token);

    await tokenRepository.insert([
      {
        symbol: 'WIF',
        totalSupply: 1000000,
        contractAddress: '0xWifTokenContractAddress',
      },
      {
        symbol: 'BONK',
        totalSupply: 500000,
        contractAddress: '0xBonkTokenContractAddress',
      },
    ]);

    console.log('Tokens seeded successfully!');
  }
}
