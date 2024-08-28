import { Meme } from '../meme/meme.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  walletAddress: string;

  @OneToMany(() => Meme, meme => meme.user)
  memes: Meme[];
}