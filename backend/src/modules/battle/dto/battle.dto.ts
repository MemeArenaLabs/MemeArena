export class ProposeSkillDto {
  battleSessionId: string;
  userId: string;
  userMemeId: string;
  skillId: string;
}

export class FindOpponentDto {
  userId: string;
  userMemeIds: string[];
}

export class ProposeTeamDto {
  userId: string;
  battleSessionId: string;
  team: { userMemeId: string; position: number }[];
}
