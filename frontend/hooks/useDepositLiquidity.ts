import { useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, TransactionInstruction, sendAndConfirmTransaction } from '@solana/web3.js';
import { MemeCoin, supportedCoins } from "@/utils/constants";
import { TOKEN_WIF, TOKEN_BONK, TOKEN_MOO, TOKEN_POP, TOKEN_GIGA, POOL_WIF, POOL_BONK, POOL_MOO, POOL_POP, POOL_GIGA } from '@/utils/tokenConstants';
import BN from 'bn.js';
import { useWallet } from '@solana/wallet-adapter-react';



export const useDepositLiquidity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const programId = new PublicKey('FqvM2PgVPQED3GLNJK1GNrFvDodVtH7SRZKPVxafvfTV'); // Your program ID
  const ammId = new PublicKey('DDTWGUxUysQtJ2PJJdjYFN7Doedt5oLVE8T3hedES8iM'); // Example AMM ID
  const mintA = new PublicKey('4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY'); // Example token mint address
  const authoritySeed = Buffer.from('authority'); // Example seed

  const { publicKey, sendTransaction } = useWallet(); // Destructure publicKey and sendTransaction from useWallet




  const depositLiquidity = async (amount: number, meme: { publicKey: PublicKey, selectedCoin: MemeCoin }) => {
    setLoading(true);
    setError(null);

    console.log("depositLiquidity entered")

    try {
        const connection = new Connection('https://api.devnet.solana.com');
        const transaction = new Transaction();
  
        const [poolAuthority, _bump] = PublicKey.findProgramAddressSync(
          [ammId.toBuffer(), mintA.toBuffer(), authoritySeed],
          programId
        );

        console.log("poolAuthority:", poolAuthority)
  
        // Mapping of MemeCoin to their respective pool and token constants
        const coinMapping = {
          WIF: { pool: POOL_WIF, token: TOKEN_WIF },
          BONK: { pool: POOL_BONK, token: TOKEN_BONK },
          MOO: { pool: POOL_MOO, token: TOKEN_MOO },
          POP: { pool: POOL_POP, token: TOKEN_POP },
          GIGA: { pool: POOL_GIGA, token: TOKEN_GIGA },
        };

        console.log("coinMapping",coinMapping)

        const selectedCoin = coinMapping[meme.selectedCoin.tickerSymbol as keyof typeof coinMapping];

        console.log("selectedCoin", selectedCoin)
        const values = {
            poolKey: selectedCoin.pool.ACCOUNT,
            poolAuthority,
            mintLiquidity: selectedCoin.pool.LP_TOKEN_MINT,
            mintA: selectedCoin.token.ADDRESS,
            depositorAccountA: selectedCoin.token.ACCOUNT,
            depositorAccountLiquidity: selectedCoin.pool.TOKEN_ACCOUNT,
            tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
            associatedTokenProgram: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
            systemProgram: SystemProgram.programId,
            admin: meme.publicKey,
        };

        console.log("values", values)

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
        data: Buffer.from(Uint8Array.of(0, ...new BN(amount).toArray("le", 8))),
      });
      console.log("instruction", instruction)

       // Add the instruction to the transaction
       transaction.add(instruction);

       // Ensure the transaction is signed using the wallet's sendTransaction method
       if (!publicKey) {
        console.error('Wallet not connected');
        throw new Error('Wallet not connected');
        }
        console.log('Public Key:', publicKey.toBase58());
        const signature = await sendTransaction(transaction, connection);
        console.log('Transaction:', transaction);


       const latestBlockhash = await connection.getLatestBlockhash();

        await new Promise(resolve => setTimeout(resolve, 100000)); // Wait for 1 second before checking again


    //    const targetBlockHeight = latestBlockhash.lastValidBlockHeight + 5; // Wait for 5 more blocks
       
    //    while (true) {
    //     const currentBlockhash = await connection.getLatestBlockhash();
    //     if (currentBlockhash.lastValidBlockHeight >= targetBlockHeight) {
    //       break;
    //     }
    //     await new Promise(resolve => setTimeout(resolve, 100000)); // Wait for 1 second before checking again
    //   }
       // Confirm the transaction using the new strategy
       await connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
      }, 'processed');


       

    } catch (err) {
        console.error('Transaction Error:', err);
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