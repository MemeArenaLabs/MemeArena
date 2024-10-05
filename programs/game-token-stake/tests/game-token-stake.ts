import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { expect } from 'chai';
import { GameTokenStake } from '../target/types/game_token_stake';

describe('Game Token Stake', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.GameTokenStake as Program<GameTokenStake>;

  let depositor, recipient, escrowAccounts, mintAccounts;

  before(async () => {
    // Initialize accounts and mint tokens
    depositor = anchor.web3.Keypair.generate();
    recipient = anchor.web3.Keypair.generate();
    escrowAccounts = [...Array(5)].map(() => anchor.web3.Keypair.generate());
    mintAccounts = [...Array(5)].map(() => anchor.web3.Keypair.generate());

    // Mint tokens to depositor
    // ... (minting logic)
  });

  it('should deposit tokens successfully', async () => {
    const amounts = [
      [100, 1],
      [200, 2],
      [300, 3],
    ];

    await program.methods
      .depositToken(amounts)
      .accounts({
        depositor: depositor.publicKey,
        escrowTokenAccount1: escrowAccounts[0].publicKey,
        escrowTokenAccount2: escrowAccounts[1].publicKey,
        escrowTokenAccount3: escrowAccounts[2].publicKey,
        tokenProgram: anchor.web3.TOKEN_PROGRAM_ID,
      })
      .signers([depositor])
      .rpc();

    // Verify balances
    // ... (balance verification logic)
  });

  it('should fail to deposit with invalid index', async () => {
    const amounts = [
      [100, 6], // Invalid index
    ];

    try {
      await program.methods
        .depositToken(amounts)
        .accounts({
          depositor: depositor.publicKey,
          escrowTokenAccount1: escrowAccounts[0].publicKey,
          tokenProgram: anchor.web3.TOKEN_PROGRAM_ID,
        })
        .signers([depositor])
        .rpc();
      expect.fail('Expected error for invalid index');
    } catch (err) {
      expect(err.message).to.include('InvalidIndex');
    }
  });

  it('should withdraw tokens successfully', async () => {
    const amounts = [
      [100, 1],
      [200, 2],
      [300, 3],
    ];

    await program.methods
      .withdrawalToken(amounts)
      .accounts({
        authority: depositor.publicKey,
        escrowTokenAccount1: escrowAccounts[0].publicKey,
        escrowTokenAccount2: escrowAccounts[1].publicKey,
        escrowTokenAccount3: escrowAccounts[2].publicKey,
        recipient: recipient.publicKey,
        tokenProgram: anchor.web3.TOKEN_PROGRAM_ID,
      })
      .signers([depositor])
      .rpc();

    // Verify balances
    // ... (balance verification logic)
  });

  it('should fail to withdraw with unauthorized access', async () => {
    const amounts = [
      [100, 1],
    ];

    try {
      await program.methods
        .withdrawalToken(amounts)
        .accounts({
          authority: recipient.publicKey, // Unauthorized
          escrowTokenAccount1: escrowAccounts[0].publicKey,
          recipient: recipient.publicKey,
          tokenProgram: anchor.web3.TOKEN_PROGRAM_ID,
        })
        .signers([recipient])
        .rpc();
      expect.fail('Expected error for unauthorized access');
    } catch (err) {
      expect(err.message).to.include('Unauthorized');
    }
  });
});