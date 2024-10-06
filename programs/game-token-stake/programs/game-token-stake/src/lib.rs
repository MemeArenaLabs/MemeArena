#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

mod instructions;
mod constants;
mod errors;
mod state;

declare_id!("FU3grTvP5yB6L8Cz68Hyn9tdiexVV5LUBhvLyMcwR1gN");

#[program]
pub mod game_token_stake {
    use crate::instructions::*; 

    pub fn deposit_token(ctx: Context<instructions::DepositToken>, amounts: [(u64, usize); 3]) -> Result<()> {
        instructions::deposit_token(ctx, amounts)
    }

    pub fn withdrawal_token(ctx: Context<instructions::WithdrawalToken>, amounts: [(u64, usize); 3]) -> Result<()> {
        instructions::withdrawal_token(ctx, amounts)
    }
}