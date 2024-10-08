import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BattleLogic } from "../target/types/battle_logic";
import { expect } from "chai";

describe("battle-logic", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const connection = provider.connection;
  anchor.setProvider(provider);

  const program = anchor.workspace.BattleLogic as Program<BattleLogic>;

  let depositor, recipient, unauthorized, escrowAccounts, mintAccounts;

  before(async () => {
    // Initialize accounts and mint tokens
    depositor = anchor.web3.Keypair.generate();
    recipient = anchor.web3.Keypair.generate();
    unauthorized = anchor.web3.Keypair.generate();
    escrowAccounts = [...Array(5)].map(() => anchor.web3.Keypair.generate());
    mintAccounts = [...Array(5)].map(() => anchor.web3.Keypair.generate());

    // Mint tokens to depositor
    const mintAuthority = anchor.web3.Keypair.generate();

    await program.methods
    .mintTo({
      mint: mintAccounts[0].publicKey,
      destination: depositor.publicKey,
      amount: new anchor.BN(1000), // Example amount
    })
    .accounts({
      mintAuthority: mintAuthority.publicKey,
      tokenProgram: anchor.web3.TOKEN_PROGRAM_ID,
    })
    .signers([mintAuthority])
    .rpc();
    });

  it("should deposit tokens successfully", async () => {
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
    // Verify balances and account creation
    const depositorBalance = await program.account.tokenAccount.fetch(depositor.publicKey);
    const escrowBalance1 = await program.account.tokenAccount.fetch(escrowAccounts[0].publicKey);
    const escrowBalance2 = await program.account.tokenAccount.fetch(escrowAccounts[1].publicKey);
    const escrowBalance3 = await program.account.tokenAccount.fetch(escrowAccounts[2].publicKey);

    expect(depositorBalance.amount.toNumber()).to.equal(400); // Example expected balance
    expect(escrowBalance1.amount.toNumber()).to.equal(100);
    expect(escrowBalance2.amount.toNumber()).to.equal(200);
    expect(escrowBalance3.amount.toNumber()).to.equal(300);
  });

  it("should fail to withdraw with unauthorized access", async () => {
    const amounts = [
      [100, 1],
    ];

    try {
      await program.methods
        .withdrawToken(amounts)
        .accounts({
          authority: unauthorized.publicKey,
          escrowTokenAccount1: escrowAccounts[0].publicKey,
          recipient: recipient.publicKey,
          tokenProgram: anchor.web3.TOKEN_PROGRAM_ID,
        })
        .signers([unauthorized])
        .rpc();
      expect.fail("Expected error for unauthorized access");
    } catch (err) {
      expect(err.message).to.include("Unauthorized");
    }
  });

  it("should withdraw tokens successfully with authorized access", async () => {
    const amounts = [
      [100, 1],
      [200, 2],
      [300, 3],
    ];

    await program.methods
      .withdrawToken(amounts)
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
      const recipientBalance = await program.account.tokenAccount.fetch(recipient.publicKey);
      const escrowBalance1 = await program.account.tokenAccount.fetch(escrowAccounts[0].publicKey);
      const escrowBalance2 = await program.account.tokenAccount.fetch(escrowAccounts[1].publicKey);
      const escrowBalance3 = await program.account.tokenAccount.fetch(escrowAccounts[2].publicKey);
  
      expect(recipientBalance.amount.toNumber()).to.equal(600); // Example expected balance after withdrawal
      expect(escrowBalance1.amount.toNumber()).to.equal(0);
      expect(escrowBalance2.amount.toNumber()).to.equal(0);
      expect(escrowBalance3.amount.toNumber()).to.equal(0);
  });
});