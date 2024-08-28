import { User } from '../user/user.entity';
import { Token } from '../token/token.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

  @ManyToOne(() => User, user => user.memes)
  user: User;

  @ManyToOne(() => Token, token => token.memes)
  token: Token; 
}
