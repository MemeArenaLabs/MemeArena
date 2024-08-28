import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user/user.entity';
import { Meme } from '../../modules/meme/meme.entity';
import { typeOrmConfig } from '../../config/ormconfig';

export default class ClearDatabaseSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      // Elimina y vuelve a crear el esquema
      await queryRunner.query('DROP SCHEMA public CASCADE');
      await queryRunner.query('CREATE SCHEMA public');

      await queryRunner.commitTransaction();
      
      console.log('Database schema has been dropped and recreated successfully!');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error while dropping and recreating the schema: ', error);
    } finally {
      await queryRunner.release();
    }
  }
}


async function main() {
  const initialDataSource = new DataSource(typeOrmConfig);
  try {
    await initialDataSource.initialize();

    const seeder = new ClearDatabaseSeeder();
    await seeder.run(initialDataSource);

    console.log('Database cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding', error);
    process.exit(1);
  }
}

main();
