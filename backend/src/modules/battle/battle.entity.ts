import { PrimaryGeneratedColumn } from "typeorm";

export class BattleSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
