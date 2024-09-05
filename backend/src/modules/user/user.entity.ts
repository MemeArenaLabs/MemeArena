import { BattleSessionUser } from '../battle/battle.entity';
import { Meme, UserMeme } from '../meme/meme.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  walletAddress: string;

  @OneToMany(() => UserMeme, (UserMeme) => UserMeme.user)
  userMemes: UserMeme[];

  @OneToMany(() => BattleSessionUser, (battleSessionUser) => battleSessionUser.user)
  battleSessions: BattleSessionUser[];
}