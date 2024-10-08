import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { TokenVault } from '../token-vault/target/types/token_vault';

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.TokenVault as Program<TokenVault>;

async function createAmm() {
  const admin = anchor.web3.Keypair.generate();
  const id = admin.publicKey;
  const fee = 0; 

  await program.methods.createAmm(id, fee).accounts({
    amm: admin.publicKey,
    admin: admin.publicKey,
    payer: provider.wallet.publicKey,
    systemProgram: anchor.web3.SystemProgram.programId,
  }).signers([admin]).rpc();

  console.log('AMM created with ID:', id.toBase58());
}

createAmm().catch(err => {
  console.error(err);
});