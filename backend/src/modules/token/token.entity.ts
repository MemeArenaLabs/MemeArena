import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  symbol: string;

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  totalSupply: number;

  @Column({ nullable: true })
  contractAddress: string;
}