use anchor_lang::prelude::*;

declare_id!("38ac8ExKeCa2VKCumwkmp8GMirj8WPvBh5sVihyPQGmj");

#[program]
pub mod nft_mint {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
