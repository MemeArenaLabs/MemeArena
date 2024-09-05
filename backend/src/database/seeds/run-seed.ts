import { runSeeders, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../../config/ormconfig';
import UserSeeder from './user.seeder';
import MemeSeeder from './meme.seeder';
import TokenSeeder from './token.seeder';

export default class InitialDatabaseSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [TokenSeeder, UserSeeder, MemeSeeder],
    });
  }
}

async function main() {
  const initialDataSource = new DataSource(typeOrmConfig);
  try {
    await initialDataSource.initialize();
    const seeder = new InitialDatabaseSeed();
    await seeder.run(initialDataSource)
    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding', error);
    process.exit(1);
  }
}

main();
