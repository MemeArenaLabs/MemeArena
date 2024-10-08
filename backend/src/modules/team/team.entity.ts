// src/modules/teams/entities/team.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { UserMeme } from '../meme/meme.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.teams)
  user: User;

  @OneToMany(() => UserMeme, (userMeme) => userMeme.team)
  userMemes: UserMeme[];
}
