// purchase.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { SolanaService } from './solana.service';
import { Transaction } from '@solana/web3.js';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly solanaService: SolanaService) {}

  @Post()
  async purchaseNFT(@Body() body: { buyerPublicKey: string; signedTransaction: string }) {
    const { buyerPublicKey, signedTransaction } = body;

    // Verificar y enviar la transacción de pago
    const transaction = Transaction.from(Buffer.from(signedTransaction, 'base64'));
    const txId = await this.solanaService.connection.sendRawTransaction(transaction.serialize());

    // Esperar a que la transacción sea confirmada
    await this.solanaService.connection.confirmTransaction(txId);

    // Mintear el NFT y enviarlo al comprador
    const nftAddress = await this.solanaService.mintNFT(buyerPublicKey);

    return { success: true, nftAddress };
  }
}
