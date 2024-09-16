use anchor_lang::prelude::*;

declare_id!("FsKghr9zdSV1EG6MCNVsKhhBfVBk1qUEzTKKxWfj1PMa");

#[program]
pub mod programs {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
