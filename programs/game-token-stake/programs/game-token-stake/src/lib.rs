use anchor_lang::prelude::*;

declare_id!("FU3grTvP5yB6L8Cz68Hyn9tdiexVV5LUBhvLyMcwR1gN");

#[program]
pub mod game_token_stake {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
