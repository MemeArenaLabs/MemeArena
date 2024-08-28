import { PartialType } from '@nestjs/mapped-types';
import { CreateMemeDto } from './create-meme.dto';

export class UpdateMemeDto extends PartialType(CreateMemeDto) {}
