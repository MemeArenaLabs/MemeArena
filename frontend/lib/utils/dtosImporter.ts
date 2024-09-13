import {
  ProposeSkillDto,
  FindOpponentDto,
  ProposeTeamDto,
} from "#/backend/src/modules/battle/dto/battle.dto";

export const DTOs = {
  ProposeSkillDto,
  FindOpponentDto,
  ProposeTeamDto,
};

export type DTOsType = {
  ProposeSkillDto: InstanceType<typeof ProposeSkillDto>;
  FindOpponentDto: InstanceType<typeof FindOpponentDto>;
  ProposeTeamDto: InstanceType<typeof ProposeTeamDto>;
};