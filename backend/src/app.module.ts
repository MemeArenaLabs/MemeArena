import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import { BattleModule } from './modules/battle/battle.module';
import { MemeModule } from './modules/meme/meme.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    TokenModule,
    BattleModule,
    MemeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
