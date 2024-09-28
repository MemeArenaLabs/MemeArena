import {
  ProposeSkillDto,
  FindOpponentDto,
  ProposeTeamDto,
} from "#/backend/src/modules/battle/dto/battle.dto";

import { UserResponseDto } from "#/backend/src/modules/user/dto/user.response.dto";
import {
  JoinedResponseDto,
  UserDataDto,
  UserMemeDto,
} from "#/backend/src/modules/battle/dto/battle.response.dto";
import { MemeBattleStatus } from "#/backend/src/modules/battle/battle.type";

export type {
  ProposeSkillDto,
  FindOpponentDto,
  ProposeTeamDto,
  JoinedResponseDto,
  UserDataDto,
  MemeBattleStatus,
  UserMemeDto,
  UserResponseDto,
};
