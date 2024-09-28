import {
  ProposeSkillDto,
  FindOpponentDto,
  ProposeTeamDto,
} from "#/backend/src/modules/battle/dto/battle.dto";

import { UserResponseDto } from "#/backend/src/modules/user/dto/user.response.dto";
import {
  BattleLogDto,
  JoinedResponseDto,
  ResolvedSkillsResponseDto,
  TeamProposedResponseDto,
  UserDataDto,
  UserMemeDto,
} from "#/backend/src/modules/battle/dto/battle.response.dto";
import { MemeBattleStatus } from "#/backend/src/modules/battle/battle.type";
import { SkillDetails } from "#/backend/src/modules/meme/meme.types";

export type {
  ProposeSkillDto,
  FindOpponentDto,
  ProposeTeamDto,
  SkillDetails,
  TeamProposedResponseDto,
  JoinedResponseDto,
  ResolvedSkillsResponseDto,
  BattleLogDto,
  UserDataDto,
  MemeBattleStatus,
  UserMemeDto,
  UserResponseDto,
};
