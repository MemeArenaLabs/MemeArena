import { ProposeSkillDto } from './dto/battle.dto';
import { WebSocket } from 'ws';

export interface UserMemeState {
  userMemeId: string;
  hp: number;
}

export interface ActiveBattle {
  users: UserInBattle[];
  currentMemes: Map<string, UserMemeState>; // userId => UserMemeState
  proposedSkills: Map<string, ProposeSkillDto>; // userId => ProposeSkillDto
  defeatedMemes: Map<string, Set<string>>; // userId => Set of defeated userMemeIds
  battleSessionId: string;
}

export type UserInBattle = {
  client: WebSocket;
  userId: string;
  userMemes: { userMemeId: string; position?: number }[];
  proposed?: boolean;
};

export type ActiveBattles = Map<string, ActiveBattle>;
