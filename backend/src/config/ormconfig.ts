export const typeOrmConfig: any = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'magaiba',
  password: 'magaiba',
  database: 'meme-arena',
  synchronize: true,
  autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};