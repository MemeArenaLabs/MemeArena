import * as anchor from '@coral-xyz/anchor';
import type { Program } from '@coral-xyz/anchor';
import { expect } from 'chai';
import type { TokenVault } from '../target/types/token_vault';
import { type TestValues, createValues, mintingTokens } from './utils';

describe('Withdraw liquidity', () => {
  const provider = anchor.AnchorProvider.env();
  const connection = provider.connection;
  anchor.setProvider(provider);

  const program = anchor.workspace.TokenVault as Program<TokenVault>;

  let values: TestValues;

  beforeEach(async () => {
    values = createValues();

    await program.methods.createAmm(values.id, values.fee).accounts({ amm: values.ammKey, admin: values.admin.publicKey }).rpc();

    await mintingTokens({
      connection,
      creator: values.admin,
      mintAKeypair: values.mintAKeypair,
    });

    await program.methods
      .createPool()
      .accounts({
        amm: values.ammKey,
        pool: values.poolKey,
        poolAuthority: values.poolAuthority,
        mintLiquidity: values.mintLiquidity,
        mintA: values.mintAKeypair.publicKey,
        poolAccountA: values.poolAccountA,
      })
      .rpc();

    await program.methods
      .depositLiquidity(values.depositAmountA)
      .accounts({
        pool: values.poolKey,
        poolAuthority: values.poolAuthority,
        depositor: values.admin.publicKey,
        mintLiquidity: values.mintLiquidity,
        mintA: values.mintAKeypair.publicKey,
        poolAccountA: values.poolAccountA,
        depositorAccountLiquidity: values.liquidityAccount,
        depositorAccountA: values.holderAccountA,
      })
      .signers([values.admin])
      .rpc({ skipPreflight: true });
  });

  it('Withdraw everything', async () => {
    await program.methods
      .withdrawLiquidity(values.depositAmountA.sub(values.minimumLiquidity))
      .accounts({
        amm: values.ammKey,
        pool: values.poolKey,
        poolAuthority: values.poolAuthority,
        depositor: values.admin.publicKey,
        mintLiquidity: values.mintLiquidity,
        mintA: values.mintAKeypair.publicKey,
        poolAccountA: values.poolAccountA,
        depositorAccountLiquidity: values.liquidityAccount,
        depositorAccountA: values.holderAccountA,
      })
      .signers([values.admin])
      .rpc({ skipPreflight: true });

    const liquidityTokenAccount = await connection.getTokenAccountBalance(values.liquidityAccount);
    const depositTokenAccountA = await connection.getTokenAccountBalance(values.holderAccountA);
    expect(liquidityTokenAccount.value.amount).to.equal('0');
    expect(Number(depositTokenAccountA.value.amount)).to.be.lessThan(values.defaultSupply.toNumber());
    expect(Number(depositTokenAccountA.value.amount)).to.be.greaterThan(values.defaultSupply.sub(values.depositAmountA).toNumber());
  });
});