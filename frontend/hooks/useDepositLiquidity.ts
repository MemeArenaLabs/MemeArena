import { useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, TransactionInstruction, sendAndConfirmTransaction, Signer, Keypair } from '@solana/web3.js';
import { MemeCoin, supportedCoins } from "@/utils/constants";
import { TOKEN_WIF, TOKEN_BONK, TOKEN_MOO, TOKEN_POP, TOKEN_GIGA, POOL_WIF, POOL_BONK, POOL_MOO, POOL_POP, POOL_GIGA } from '@/utils/tokenConstants';
import BN from 'bn.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { WalletSendTransactionError } from '@solana/wallet-adapter-base';



export const useDepositLiquidity = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const programId = new PublicKey('FqvM2PgVPQED3GLNJK1GNrFvDodVtH7SRZKPVxafvfTV'); // Your program ID
  const ammId = new PublicKey('DDTWGUxUysQtJ2PJJdjYFN7Doedt5oLVE8T3hedES8iM'); // Example AMM ID
  //const mintA = new PublicKey('4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY'); // Example token mint address
  const authoritySeed = Buffer.from('authority'); // Example seed

  const { publicKey, sendTransaction } = useWallet(); // Destructure publicKey and sendTransaction from useWallet

    // Ensure the associated token account exists
    const ensureTokenAccount = async (connection: Connection, payer: Signer, mint: PublicKey, owner: PublicKey) => {
        try {
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            owner
        );
        return tokenAccount;
        } catch (error) {
        console.error("Failed to get or create token account:", error);
        throw error;
        }
    };


  const depositLiquidity = async (amount: number, meme: { publicKey: PublicKey, selectedCoin: MemeCoin }) => {
    setLoading(true);
    setError(null);

    console.log("depositLiquidity entered")

    try {
        const connection = new Connection('https://api.devnet.solana.com');
        const transaction = new Transaction();


  
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

        const [poolAuthority, _bump] = PublicKey.findProgramAddressSync(
            [ammId.toBuffer(), selectedCoin.token.ADDRESS.toBuffer(), authoritySeed],
            programId
        );
        console.log("poolAuthority:", poolAuthority)

        
        const payerPrivateKey = Uint8Array.from([57,49,154,35,35,201,219,82,52,36,3,82,89,128,55,182,15,203,250,215,56,2,46,84,75,179,58,206,56,146,208,2,140,41,83,153,21,205,164,237,139,129,74,55,68,29,96,28,156,7,108,59,237,58,98,181,211,56,125,192,42,237,44,174]);
        const payerKeypair = Keypair.fromSecretKey(payerPrivateKey);

        const tokenAccount = await ensureTokenAccount(
            connection,
            payerKeypair, // payer
            selectedCoin.token.ADDRESS, // mint
            payerKeypair.publicKey // owner
          );

        console.log("selectedCoin", selectedCoin)

        // Ensure the user's associated token account for the deposit token exists
        const depositorAccountA = await getOrCreateAssociatedTokenAccount(
            connection,
            payerKeypair, // payer
            selectedCoin.token.ADDRESS, // mint
            payerKeypair.publicKey // owner
        );

        // Ensure the user's associated token account for the LP token exists
        const depositorAccountLiquidity = await getOrCreateAssociatedTokenAccount(
            connection,
            payerKeypair, // payer
            selectedCoin.pool.LP_TOKEN_MINT, // LP token mint
            payerKeypair.publicKey // owner
        );
    

        
        const values = {
            poolKey: selectedCoin.pool.ACCOUNT,
            poolAuthority,
            mintLiquidity: selectedCoin.pool.LP_TOKEN_MINT,
            mintA: selectedCoin.token.ADDRESS,
            depositorAccountA: selectedCoin.token.ACCOUNT,
            depositorAccountLiquidity: selectedCoin.pool.TOKEN_ACCOUNT,
            tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
            associatedTokenProgram: new PublicKey('ATokenGPvR93CXYgD5RZkUoqDkLx5n7GVe44mL8BPpRY'),
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
          { pubkey: publicKey, isSigner: true, isWritable: false }, // Use the connected wallet as a signer
          { pubkey: payerKeypair.publicKey, isSigner: true, isWritable: false }, // Add payerKeypair as a signer
        ],
        programId: new PublicKey('FqvM2PgVPQED3GLNJK1GNrFvDodVtH7SRZKPVxafvfTV'),
        data: Buffer.from(Uint8Array.of(0, ...new BN(100).toArray("le", 8))),
      });
      console.log("instruction", instruction)

       // Add the instruction to the transaction
       transaction.add(instruction);

       const latestBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;

        if (publicKey) {
            transaction.feePayer = publicKey;
            console.log("Fee payer set to:", transaction.feePayer.toString());
        } else {
            console.error("Public key is null. Cannot proceed with the transaction.");
            // Optionally, throw an error or return early
            return;
        }

        console.log("Transaction details:", {
            feePayer: transaction.feePayer.toString(),
            recentBlockhash: transaction.recentBlockhash,
            instructions: transaction.instructions,
            signatures: transaction.signatures,
        });



        //transaction.feePayer = publicKey;

       console.log('Transaction:', transaction);

       // Ensure the transaction is signed using the wallet's sendTransaction method
       if (!publicKey) {
        console.error('Wallet not connected');
        throw new Error('Wallet not connected');
        }

        console.log('Public Key:', publicKey.toBase58());
        const signature = await sendTransaction(transaction, connection);
        console.log('Transaction:', transaction);


        


        //await new Promise(resolve => setTimeout(resolve, 100000)); // Wait for 1 second before checking again


        //const targetBlockHeight = latestBlockhash.lastValidBlockHeight + 5; // Wait for 5 more blocks
       
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


       

    } catch (error) {
        console.error("Transaction Error:", error);
        if (error instanceof WalletSendTransactionError) {
        // Handle specific wallet send transaction errors
        console.error("WalletSendTransactionError details:", error.message);
        } else {
        // Handle other types of errors
        console.error("Unexpected error:", error);
        }

    } finally {
      setLoading(false);
    }
  };

  return { depositLiquidity, loading, error };
};