import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/user/user.entity';
import { Meme } from '../../modules/meme/meme.entity';

export default class ClearDatabaseSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const memeRepository = dataSource.getRepository(Meme);
    const userRepository = dataSource.getRepository(User);

    // Elimina los registros de las tablas
    await memeRepository.clear();
    await userRepository.clear();

    console.log('All tables cleared!');
  }
}
