import { config } from 'dotenv';

config();

export const typeOrmConfig: any = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'default_username',
  password: process.env.DB_PASSWORD || 'default_password',
  database: process.env.DB_NAME || 'default_db_name',
  synchronize: true,
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
