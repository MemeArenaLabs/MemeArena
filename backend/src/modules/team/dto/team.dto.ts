import { IsString, IsUUID, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  userMemeIds: string[];
}