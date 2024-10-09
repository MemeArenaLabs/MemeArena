import { ELEMENTS, PROFESSIONS, TokenDetails } from "./serverDTOs";

export type UserData = {
  id: string;
  walletAddress: string;
  username: string;
};

export type UserMeme = {
  userMemeId: string;
  name: string;
  currentHp: number;
  maxHp: number;
  attack: number;
  defense: number;
  token: TokenDetails;
  speed: number;
  element?: ELEMENTS;
  profession?: PROFESSIONS;
  status: MemeStatus;
  skills: SkillDetails[];
};

export type MemeStatus = "ACTIVE" | "BENCH" | "DEFEATED";

export type SkillDetails = {
  skillId: string;
  name: string;
  damage: number;
  speed: number;
  type: SkillType;
  title: string;
  quote: string;
  description: string;
};

export type SkillType = "DAMAGE" | "SWITCH";

export type BattleLog = {
  id: string;
  timestamp: string;
  actionType: string;
  attackerId: string;
  receiverId: string;
  skillId: string;
  damage: number;
};
