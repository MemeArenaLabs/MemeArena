import { Token } from '../token/token.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { BattleSessionUserMeme } from '../battle/battle.entity';

@Entity()
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  hpBase: number;

  @Column()
  attackBase: number;

  @Column()
  defenseBase: number;

  @Column()
  speedBase: number;

  @Column()
  element: string;

  @Column()
  profession: string; 

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => Token, (token) => token.memes, { eager: true })
  token: Token;

  @OneToMany(() => UserMeme, (userMeme) => userMeme.meme)
  userMemes: UserMeme[];

  @OneToMany(() => Skill, (skill) => skill.meme)
  skills: Skill[];
}

@Entity('user_memes')
export class UserMeme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.userMemes)
  user: User;

  @ManyToOne(() => Meme, (meme) => meme.userMemes)
  meme: Meme;

  @Column()
  tokensLocked: number; 

  @OneToMany(
    () => BattleSessionUserMeme,
    (battleSessionUserMeme) => battleSessionUserMeme.userMeme,
  )
  battleSessions: BattleSessionUserMeme[];
}

@Entity('skills')
export class Skill{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  damage: number;

  @Column()
  speed: number;

  @ManyToOne(() => Meme, (meme) => meme.skills, { eager: true })
  meme: Meme;
}
