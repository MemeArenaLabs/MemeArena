// seed.ts

import { DataSource } from 'typeorm';
import { typeOrmConfig } from './src/config/ormconfig';
import { seedDatabase } from './src/seeds/seeder';

async function main() {
  const dataSource = new DataSource(typeOrmConfig);

  try {
    await dataSource.initialize();
    await seedDatabase(dataSource);
    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

main();
