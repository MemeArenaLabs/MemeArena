import { PartialType } from '@nestjs/mapped-types';
import { CreateSolanaDto } from './create-solana.dto';

export class UpdateSolanaDto extends PartialType(CreateSolanaDto) {}
