import * as anchor from '@coral-xyz/anchor';
import type { Program } from '@coral-xyz/anchor';
import { expect } from 'chai';
import type { TokenVault } from '../target/types/token_vault.ts';
import { type TestValues, createValues, mintingTokens } from './utils';

describe('Deposit liquidity', () => {
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
  });

  it('Deposit equal amounts', async () => {
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

    const depositTokenAccountLiquditiy = await connection.getTokenAccountBalance(values.liquidityAccount);
    expect(depositTokenAccountLiquditiy.value.amount).to.equal(values.depositAmountA.sub(values.minimumLiquidity).toString());
    const depositTokenAccountA = await connection.getTokenAccountBalance(values.holderAccountA);
    expect(depositTokenAccountA.value.amount).to.equal(values.defaultSupply.sub(values.depositAmountA).toString());
  });
});