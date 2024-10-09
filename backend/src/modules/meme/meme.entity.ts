import { Token } from '../token/token.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { BattleSessionUserMeme } from '../battle/battle.entity';
import { Team } from '../team/team.entity';


export enum SkillType {
  DAMAGE = 'DAMAGE',
  SWITCH = 'SWITCH',
  STUN = 'STUN',
  BUFF = 'BUFF',
  DEBUFF = 'DEBUFF',
}

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

  @Column({ default: 0 })
  tokensLocked: number; 

  @OneToMany(() => BattleSessionUserMeme, (battleSessionUserMeme) => battleSessionUserMeme.userMeme)
  battleSessions: BattleSessionUserMeme[];

  @ManyToMany(() => Team, (team) => team.userMemes)
  teams: Team[];
}

@Entity('skills')
export class Skill{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable:true})
  title: string;

  @Column({nullable:true})
  quote: string;

  @Column({nullable:true})
  description: string;

  @Column()
  damage: number;

  @Column()
  speed: number;

  @Column()
  skillType: SkillType;

  @ManyToOne(() => Meme, (meme) => meme.skills, { eager: true })
  meme: Meme;
}
