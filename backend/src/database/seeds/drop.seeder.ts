import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

export default class DropDatabaseSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const queryRunner = dataSource.createQueryRunner();
    
    try {
      await queryRunner.startTransaction();
      await queryRunner.clearDatabase();
      await queryRunner.commitTransaction();
      console.log('All tables have been dropped successfully!');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error while dropping tables: ', error);
    } finally {
      await queryRunner.release();
    }
  }
}
