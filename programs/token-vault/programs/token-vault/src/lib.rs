use anchor_lang::prelude::*;

declare_id!("91zLvqJCwF6gQjSJzkj1rXxHsRuu1ZD1gzMzp8VAdL5n");

#[program]
pub mod token_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
