import { Token } from '../token/token.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { BattleSessionUserMeme } from '../battle/battle.entity';

@Entity()
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  hp: number;

  @Column()
  attack: number;

  @Column()
  defense: number;

  @Column()
  criticChance: number;

  @Column()
  speed: number;

  @ManyToOne(() => Token, (token) => token.memes)
  token: Token;
  
  @OneToMany(() => UserMeme, (userMeme) => userMeme.meme)
  userMemes: UserMeme[];
}

@Entity('user_memes')
export class UserMeme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userMemes)
  user: User;

  @ManyToOne(() => Meme, (meme) => meme.userMemes)
  meme: Meme;

  @OneToMany(() => BattleSessionUserMeme, (battleSessionUserMeme) => battleSessionUserMeme.userMeme)
  battleSessions: BattleSessionUserMeme[];
}
