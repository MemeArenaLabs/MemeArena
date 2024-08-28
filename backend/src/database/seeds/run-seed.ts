import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../../config/ormconfig';
import UserSeeder from './user.seeder';
import MemeSeeder from './meme.seeder';

export default class InitialDatabaseSeed implements Seeder {
  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, MemeSeeder],
    });
  }
}

async function main() {
  const initialDataSource = new DataSource(typeOrmConfig);
  try {
    await initialDataSource.initialize();
    await runSeeders(initialDataSource);
    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding', error);
    process.exit(1);
  }
}

main();