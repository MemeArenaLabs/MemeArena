// src/solana/solana.module.ts

import { Module } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { PurchaseController } from './purchase.controller';

@Module({
  providers: [SolanaService],
  controllers: [PurchaseController],
  exports: [SolanaService],
})
export class SolanaModule {}
