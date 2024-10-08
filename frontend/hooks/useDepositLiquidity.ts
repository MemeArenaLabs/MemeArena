import { useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import BN from 'bn.js';


export const useDepositLiquidity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const depositLiquidity = async (amount: number, wallet: any) => {
    setLoading(true);
    setError(null);

    try {
      const connection = new Connection('https://api.devnet.solana.com'); // Use the appropriate network
      const transaction = new Transaction();

      // Replace these with actual values
      const values = {
        poolKey: new PublicKey('...'),
        poolAuthority: new PublicKey('...'),
        mintLiquidity: new PublicKey('...'),
        mintA: new PublicKey('...'),
        depositorAccountA: new PublicKey('...'),
        depositorAccountLiquidity: new PublicKey('...'),
        tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), 
        associatedTokenProgram: new PublicKey('ATokenGPvR93p2Fb2a85kecGGn8k2tHm5uLrS8Z7pRz5'), 
        systemProgram: SystemProgram.programId,
        admin: wallet.publicKey,
      };

      // Create the instruction to call your on-chain program
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: values.poolKey, isSigner: false, isWritable: true },
          { pubkey: values.poolAuthority, isSigner: false, isWritable: false },
          { pubkey: values.mintLiquidity, isSigner: false, isWritable: true },
          { pubkey: values.mintA, isSigner: false, isWritable: false },
          { pubkey: values.depositorAccountA, isSigner: false, isWritable: true },
          { pubkey: values.depositorAccountLiquidity, isSigner: false, isWritable: true },
          { pubkey: values.tokenProgram, isSigner: false, isWritable: false },
          { pubkey: values.associatedTokenProgram, isSigner: false, isWritable: false },
          { pubkey: values.systemProgram, isSigner: false, isWritable: false },
          { pubkey: values.admin, isSigner: true, isWritable: false },
        ],
        programId: new PublicKey('FqvM2PgVPQED3GLNJK1GNrFvDodVtH7SRZKPVxafvfTV'), 
        data: Buffer.from(Uint8Array.of(0, ...new BN(amount).toArray("le", 8))), // Replace with actual instruction data
      });

      // Add the instruction to the transaction
      transaction.add(instruction);

      // Sign and send the transaction
      const signature = await wallet.sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { depositLiquidity, loading, error };
};