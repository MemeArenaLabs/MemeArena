// depositTokens.mjs
import { PublicKey, Keypair, Connection, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createTransferInstruction } from '@solana/spl-token';
import { readFileSync } from 'fs';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { SendTransactionError } from '@solana/web3.js'; // Add this import
import { createAccount } from '@solana/spl-token'; // Remove duplicate TOKEN_PROGRAM_ID import



// Load the keypair for the wallet
const payerPrivateKey = Uint8Array.from([57,49,154,35,35,201,219,82,52,36,3,82,89,128,55,182,15,203,250,215,56,2,46,84,75,179,58,206,56,146,208,2,140,41,83,153,21,205,164,237,139,129,74,55,68,29,96,28,156,7,108,59,237,58,98,181,211,56,125,192,42,237,44,174]);
const payerKeypair = Keypair.fromSecretKey(payerPrivateKey);
const ammId = new PublicKey("DDTWGUxUysQtJ2PJJdjYFN7Doedt5oLVE8T3hedES8iM"); // Example AMM ID
const ammKey = [111,211,46,254,166,45,216,118,44,197,18,93,97,226,252,3,70,184,48,233,186,161,3,250,21,85,95,109,98,249,44,65,220,139,208,62,249,225,215,153,246,47,27,202,182,183,244,64,186,142,182,119,95,174,45,48,66,48,222,173,164,12,181,96];
const ammKeyBuffer = Buffer.from(ammKey);
const mintAKeypair = new PublicKey('4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY'); // Example token mint address

// Define the program ID and the pool public key
const poolPublicKey = new PublicKey('4rHBKyXD7YzuLMX8edJ8kYZ9Qf5pMqpg1adRNidMQXu8');

// Define the connection to the Solana cluster
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

const poolAccount = new PublicKey('4rHBKyXD7YzuLMX8edJ8kYZ9Qf5pMqpg1adRNidMQXu8')

async function depositTokens(amountA) {
    try {
        // Correctly derive the poolAuthority

        const poolAuthority = PublicKey.findProgramAddressSync(
            [poolAccount.toBuffer()],
            new PublicKey('FqvM2PgVPQED3GLNJK1GNrFvDodVtH7SRZKPVxafvfTV') // Program ID
        )[0];

        console.log('Pool Authority:', poolAuthority.toString());


        // Create the depositor's associated token account (regular user)
        const depositorAccountA = await getAssociatedTokenAddress(
            mintAKeypair, // Token mint
            payerKeypair.publicKey // Owner
        );

        console.log('Depositor Account A:', depositorAccountA.toString());

        // Check if the depositor's associated token account exists
        const depositorAccountInfo = await connection.getAccountInfo(depositorAccountA);
        if (!depositorAccountInfo) {
            const createAccountIx = createAssociatedTokenAccountInstruction(
                payerKeypair.publicKey,
                depositorAccountA,
                payerKeypair.publicKey,
                mintAKeypair
            );
            const transaction = new Transaction().add(createAccountIx);
            await sendAndConfirmTransaction(connection, transaction, [payerKeypair]);
            console.log('Depositor Account A created:', depositorAccountA.toString());
        }

        // Create a token account for the poolAuthority manually
        let poolTokenAccount;

        try {
            // Check if the pool token account already exists
            poolTokenAccount = await getAssociatedTokenAddress(
                new PublicKey('4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY'), // Token mint
                poolAccount, // Pool authority
                false, // allowOwnerOffCurve (default is false)
                TOKEN_PROGRAM_ID, // programId (default is TOKEN_PROGRAM_ID)
                ASSOCIATED_TOKEN_PROGRAM_ID // associatedTokenProgramId (default is ASSOCIATED_TOKEN_PROGRAM_ID)
            );

            console.log("poolTokenAccount", poolTokenAccount)

            const poolTokenAccountInfo = await connection.getAccountInfo(poolTokenAccount);
            if (poolTokenAccountInfo) {
                console.log('Pool Token Account already exists:', poolTokenAccount.toString());
            } else {
                // Create a token account for the poolAuthority manually
                poolTokenAccount = await createAccount(
                    connection, // Solana connection
                    payerKeypair, // Payer for the transaction
                    new PublicKey('4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY'), // Token mint
                    poolAccount, // Pool authority
                    payerKeypair.publicKey // Fee payer
                );
                console.log('Pool Token Account created:', poolTokenAccount.toString());
            }
        } catch (error) {
            console.error('Error checking or creating pool token account:', error);
            if (error.logs) {
                console.error('Transaction logs:', error.logs);
            }
        }

        // Check if poolTokenAccount is defined before using it
        if (!poolAccount) {
            throw new Error('Failed to create pool token account');
        }
        const depositorBalance = await connection.getTokenAccountBalance(depositorAccountA);
        console.log('Depositor Account A Balance:', depositorBalance.value.uiAmount);


        // Create a transaction
        const transaction = new Transaction().add(
            // Ensure the depositor's associated token account is created
            // createAssociatedTokenAccountInstruction(
            //     payerKeypair.publicKey,
            //     depositorAccountA,
            //     payerKeypair.publicKey,
            //     new PublicKey('4gn22HqJ9ksDULRaekC53A51HzkbAYpGCiLvGB4DhaZY') // Token mint
            // ),
            // Transfer tokens from depositor to the pool's token account
            createTransferInstruction(
                depositorAccountA,
                poolTokenAccount, // Use the pool's token account (manually created)
                payerKeypair.publicKey,
                amountA,
                [],
                TOKEN_PROGRAM_ID
            )
        );

        console.log('About to send the transaction...');

        // Send and confirm the transaction
        const txSignature = await sendAndConfirmTransaction(connection, transaction, [payerKeypair]);

        console.log('Tokens deposited successfully. Transaction signature:', txSignature);
    } catch (error) {
        console.error('Error depositing tokens:', error);
    }
}
  

// Call the function with the desired amount
depositTokens(10000).then(() => {
    console.log('Tokens deposited successfully');
}).catch(async err => {
    console.error('Error depositing tokens:', err);
if (err instanceof SendTransactionError) {
    const logs = await err.getLogs();
    console.error('Transaction logs:', logs);
}
  });