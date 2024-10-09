import { Connection, PublicKey, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createInitializeMintInstruction } from '@solana/spl-token';
import fs from 'fs';

// Replace with your actual payer keypair
const payerPrivateKey = Uint8Array.from([57,49,154,35,35,201,219,82,52,36,3,82,89,128,55,182,15,203,250,215,56,2,46,84,75,179,58,206,56,146,208,2,140,41,83,153,21,205,164,237,139,129,74,55,68,29,96,28,156,7,108,59,237,58,98,181,211,56,125,192,42,237,44,174]);
const payerKeypair = Keypair.fromSecretKey(payerPrivateKey);

// Connection to the Solana devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Token data from data.txt
const tokens = [
  { address: "4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY", account: "3kL2DgRZmcbb4PXE42FivG73uWNHF829CzsnwcJdNSo7" },
  { address: "B1Yhn1aypY8sDLbdamcrFvZsVRGXPzvo5nDgyeaSmhzU", account: "H2mWpW3sKybLV12EZ9UwJSkbwUWaZsgs1fW7PmpM88tf" },
  { address: "7iiZfGagYpn1c2C9KXKeSRFRVHFBBQeQsqAnVHGoJ3s5", account: "5Z4RqNkMHjWiEBDyUMibJHCwYGbj1kz4cDBDTfw23iw9" },
  { address: "HzZGhbJQ9T6VZrffMtEVtGt51sNhKSAEHEY4T8xEud9Q", account: "6dMhpNfZZgM7aEjm5JdDeBLjtAxpSaGioWxmNWriGivm" },
  { address: "2HHGkN3PEKiDT2ZiE65VuW6BvjdUQsxySmdZ2JF4RAf3", account: "GTbYi1jVDcnpXKnXCNcDrLfPKjAYh4XBBpk6ZD8DqTKx" },
];

async function createPools() {
    for (const token of tokens) {
        const transaction = new Transaction();
  
      // Create pool account
      const poolAccount = Keypair.generate();
      console.log(`Pool Account: ${poolAccount.publicKey.toBase58()}`); // Log pool account
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: payerKeypair.publicKey, // Use the payer's public key
          newAccountPubkey: poolAccount.publicKey,
          lamports: await connection.getMinimumBalanceForRentExemption(165), // Adjust size as needed
          space: 165, // Adjust size as needed
          programId: new PublicKey('FqvM2PgVPQED3GLNJK1GNrFvDodVtH7SRZKPVxafvfTV'), // Replace with your program ID
        })
      );

      // Create associated token account for the pool using the synchronous method
      const [poolTokenAccount, _] = PublicKey.findProgramAddressSync(
          [poolAccount.publicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), new PublicKey(token.address).toBuffer()],
          ASSOCIATED_TOKEN_PROGRAM_ID
      );

      console.log(`Pool Token Account: ${poolTokenAccount.toBase58()}`);

      transaction.add(
          createAssociatedTokenAccountInstruction(
          payerKeypair.publicKey, // Corrected from payer to payerKeypair
          poolTokenAccount,
          poolAccount.publicKey,
          new PublicKey(token.address)
          )
      );

      // Create LP token mint account
      const lpTokenMint = Keypair.generate();

      console.log(`LP Token Mint Account: ${lpTokenMint.publicKey.toBase58()}`); // Log LP token mint account
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: payerKeypair.publicKey,
          newAccountPubkey: lpTokenMint.publicKey,
          lamports: await connection.getMinimumBalanceForRentExemption(82), // Adjust size as needed
          space: 82, 
          programId: TOKEN_PROGRAM_ID,
        })
      );

      transaction.add(
        createInitializeMintInstruction(
          lpTokenMint.publicKey,
          9, // Decimals
          poolAccount.publicKey, // Mint authority
          null, // Freeze authority
          TOKEN_PROGRAM_ID
        )
      );

      console.log(`LP Token Mint: ${lpTokenMint.publicKey.toBase58()}`);


      // Create associated token account for the LP tokens
        const [lpTokenAccount] = PublicKey.findProgramAddressSync(
            [payerKeypair.publicKey.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), lpTokenMint.publicKey.toBuffer()],
            ASSOCIATED_TOKEN_PROGRAM_ID
        );

        console.log(`LP Token Account: ${lpTokenAccount.toBase58()}`);

        transaction.add(
            createAssociatedTokenAccountInstruction(
                payerKeypair.publicKey, // Payer
                lpTokenAccount,         // Associated token account
                payerKeypair.publicKey, // Owner of the account
                lpTokenMint.publicKey   // Mint
            )
        );

      // Send transaction
      const signature = await sendAndConfirmTransaction(connection, transaction, [payerKeypair, poolAccount, lpTokenMint], { skipPreflight: false });
        
      console.log(`Pool created for token: ${token.address} with signature: ${signature}`);
    }
}

createPools().catch((err) => {
  console.error(err);
  process.exit(1);
});