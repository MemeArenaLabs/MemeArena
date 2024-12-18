import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserMeme } from '../meme/meme.entity';
import { User } from '../user/user.entity';

@Entity('battle_sessions')
export class BattleSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  battleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @OneToMany(
    () => BattleSessionUser,
    (battleSessionUser) => battleSessionUser.battleSession,
  )
  users: BattleSessionUser[];
}

@Entity('battle_session_users')
export class BattleSessionUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.battleSessions)
  user: User;

  @ManyToOne(() => BattleSession, (battleSession) => battleSession.users)
  battleSession: BattleSession;

  @OneToMany(
    () => BattleSessionUserMeme,
    (battleSessionUserMeme) => battleSessionUserMeme.battleSessionUser,
  )
  memes: BattleSessionUserMeme[];
}

@Entity('battle_session_user_memes')
export class BattleSessionUserMeme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => BattleSessionUser,
    (battleSessionUser) => battleSessionUser.memes,
  )
  battleSessionUser: BattleSessionUser;

  @ManyToOne(() => UserMeme, (userMeme) => userMeme.battleSessions)
  userMeme: UserMeme;

  @Column({ type: 'int' })
  position: number;
}

@Entity('battle_session_attacks_log')
export class BattleSessionAttacksLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  attackerId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  receiverId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  skillId: string;

  @Column({ type: 'varchar', length: 50 })
  actionType: string; // 'attack', 'switch', 'meme_died', etc.

  @Column({ type: 'int', nullable: true })
  damage: number;

  @Column({ type: 'varchar', length: 50 })
  battleSessionId: string;
}
