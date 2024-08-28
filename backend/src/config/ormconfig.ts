import { Token } from '../modules/token/token.entity';
import { Meme } from '../modules/meme/meme.entity';
import { User } from '../modules/user/user.entity';

export const typeOrmConfig: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'magaiba',
  password: 'magaiba',
  database: 'nestdb',
  entities: [User, Meme, Token],
  synchronize: true,
  autoLoadEntities: true,
};