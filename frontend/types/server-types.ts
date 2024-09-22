import {
  ProposeSkillDto,
  FindOpponentDto,
  ProposeTeamDto,
} from "#/backend/src/modules/battle/dto/battle.dto";
import {
  UserMemeDetails,
  SkillDetails,
  TokenDetails,
} from "#/backend/src/modules/meme/meme.types";

import { UserDetails } from "#/backend/src/modules/user/user.types";

import { CreateMemeDto } from "#/backend/src/modules/meme/dto/create-meme.dto";

import { CreateTokenDto } from "#/backend/src/modules/token/dto/create-token.dto";

import { CreateUserDto } from "#/backend/src/modules/user/dto/create-user.dto";

export type { ProposeSkillDto, FindOpponentDto, ProposeTeamDto };

export type { UserMemeDetails, SkillDetails, TokenDetails, UserDetails };
