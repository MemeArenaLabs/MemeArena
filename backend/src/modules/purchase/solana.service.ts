// solana.service.ts

import { Injectable } from '@nestjs/common';
import { Connection, clusterApiUrl, Keypair, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

@Injectable()
export class SolanaService {
  connection: Connection;
  // private metaplex: Metaplex;
  private sellerKeypair: Keypair; // Clave privada del vendedor (backend)

  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'));
    this.sellerKeypair = Keypair.fromSecretKey(new Uint8Array); // Importa tu clave privada aquí
    // this.metaplex = new Metaplex(this.connection).use(keypairIdentity(this.sellerKeypair));
  }

  async createPaymentTransaction(buyerPublicKey: string, amount: number): Promise<Transaction> {
    const buyer = new PublicKey(buyerPublicKey);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: buyer,
        toPubkey: this.sellerKeypair.publicKey,
        lamports: amount,
      }),
    );
    transaction.feePayer = buyer;
    const { blockhash } = await this.connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    return transaction;
  }

  async mintNFT(buyerPublicKey: string): Promise<string> {
    return 'example';
  //   const { nft } = await this.metaplex.nfts().create({
  //     uri: 'https://example.com/nft-metadata.json', // Metadatos del NFT
  //     name: 'MiColec NFT',
  //     sellerFeeBasisPoints: 500,
  //     updateAuthority: this.sellerKeypair.publicKey,
  //     mintAuthority: this.sellerKeypair.publicKey,
  //     tokenOwner: new PublicKey(buyerPublicKey), // Enviar el NFT al comprador
  //   });
  //   return nft.address.toBase58();
  }
}
