import { SkillType } from './meme.entity';

export interface TokenDetails {
  id: string;
  symbol: string;
  totalSupply: number;
  contractAddress: string;
}

export interface SkillDetails {
  skillId: string;
  name: string;
  damage: number;
  speed: number;
  type: SkillType;
  title: string;
  quote: string;
  description: string;
}

export type UserMemeDetails = {
  userMemeId: string;
  tokensLocked: number;
  memeId: string;
  name: string;
  hpBase: number;
  attackBase: number;
  defenseBase: number;
  speedBase: number;
  element: string;
  profession: string;
  token: TokenDetails;
  skills: SkillDetails[];
};
