#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

mod constants;
mod errors;
mod instructions;
mod state;


declare_id!("FqvM2PgVPQED3GLNJK1GNrFvDodVtH7SRZKPVxafvfTV");


#[program]
pub mod token_vault {
    pub use super::instructions::*;
    use super::*;

    pub fn create_amm(ctx: Context<CreateAmm>, id: Pubkey, fee: u16) -> Result<()> {
        instructions::create_amm(ctx, id, fee)
    }

    pub fn create_pool(ctx: Context<CreatePool>) -> Result<()> {
        instructions::create_pool(ctx)
    }

    pub fn deposit_liquidity(
        ctx: Context<DepositLiquidity>,
        amount_a: u64,
        //amount_b: u64,
    ) -> Result<()> {
        //instructions::deposit_liquidity(ctx, amount_a, amount_b)
        instructions::deposit_liquidity(ctx, amount_a)
    }

    pub fn withdraw_liquidity(ctx: Context<WithdrawLiquidity>, amount: u64) -> Result<()> {
        instructions::withdraw_liquidity(ctx, amount)
    }
}

// #[derive(Accounts)]
// pub struct Initialize {}
