import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './team.dto';
import { User } from 'src/modules/user/user.entity';
import { UserMeme } from 'src/modules/meme/meme.entity';

export class TeamResponseDto {
  id: string;
  name: string;
  user: User;
  userMemes: UserMeme[];
}

