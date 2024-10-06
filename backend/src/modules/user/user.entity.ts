import { BattleSessionUser } from '../battle/battle.entity';
import { Meme, UserMeme } from '../meme/meme.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Team } from '../team/team.entity';
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

  @OneToMany(
    () => BattleSessionUser,
    (battleSessionUser) => battleSessionUser.user,
  )
  battleSessions: BattleSessionUser[];

  @OneToMany(() => Team, (team) => team.user)
  teams: Team[];
}
