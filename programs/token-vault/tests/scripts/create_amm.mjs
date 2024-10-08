import { Keypair, Connection, clusterApiUrl, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import fs from 'fs';

// Configure the client to use the Devnet cluster.
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

async function main() {
  // Load the program ID from a file or environment variable
  const programId = new PublicKey('FqvM2PgVPQED3GLNJK1GNrFvDodVtH7SRZKPVxafvfTV');

  // Generate a new keypair for the AMM
  const ammAccount = Keypair.generate();

  // Define the fee and AMM ID
  const fee = 0; // Example fee

  // Generate a new keypair
  const ammKeypair = Keypair.generate();
  const ammId = ammKeypair.publicKey.toString();

  console.log('Generated AMM ID:', ammId);

// Replace with your actual payer keypair
const payerPrivateKey = Uint8Array.from([57,49,154,35,35,201,219,82,52,36,3,82,89,128,55,182,15,203,250,215,56,2,46,84,75,179,58,206,56,146,208,2,140,41,83,153,21,205,164,237,139,129,74,55,68,29,96,28,156,7,108,59,237,58,98,181,211,56,125,192,42,237,44,174]);
const payerKeypair = Keypair.fromSecretKey(payerPrivateKey);

 // Generate a new keypair for the mint_a account
 const mintAAccount = Keypair.generate();
 const mintAAddress = mintAAccount.publicKey.toString();

 console.log('Generated Mint A Address:', mintAAddress);


  // Create a transaction to create the AMM
  try {
    // Create a transaction to create the AMM
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: payerKeypair.publicKey, // Use the payer's public key
        newAccountPubkey: ammAccount.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(8 + 32 + 32 + 8), // Adjust space as needed
        space: 8 + 32 + 32 + 8, // 8 bytes for discriminator, 32 bytes for each public key, 8 bytes for uint64
        programId: programId,
      })
    );

    // Send and confirm the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [payerKeypair, ammAccount]);

    console.log('AMM created with public key:', ammAccount.publicKey.toString());
    console.log('Transaction signature:', signature);


  } catch (err) {
    console.error('Error:', err);
  }

}

main().catch(err => {
  console.error(err);
});