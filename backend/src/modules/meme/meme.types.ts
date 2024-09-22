interface TokenDetails {
  id: string;
  symbol: string;
  totalSupply: number;
  contractAddress: string;
}

interface SkillDetails {
  skillId: string;
  name: string;
  damage: number;
  speed: number;
}

interface UserMemeDetails {
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
}
