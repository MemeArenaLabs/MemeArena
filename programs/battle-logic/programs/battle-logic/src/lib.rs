#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

mod constants;
mod errors;
mod instructions;
mod state;

declare_id!("5UH3xKPhmw1jCU11Wsqz7aabTVpBiQoUadK1snpqoevC");

#[program]
pub mod battle_logic {
    pub use super::instructions::*;
    use super::*;

    pub fn deposit_token(ctx: Context<DepositToken>, amounts: [(u64, usize); 3]) -> Result<()> {
        instructions::deposit_token(ctx, amounts)
    }

    pub fn withdraw_token(ctx: Context<WithdrawToken>, amounts: [(u64, usize); 3]) -> Result<()> {
        instructions::withdraw_token(ctx, amounts)
    }
}
