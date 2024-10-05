use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::errors::CustomError;
use crate::constants::AUTHORIZED_ADDRESSES;

#[derive(Accounts)]
pub struct WithdrawalToken<'info> {
    #[account(signer)]
    pub authority: AccountInfo<'info>,
    #[account(mut)]
    pub escrow_token_account_1: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_2: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_3: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_4: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_5: Account<'info, TokenAccount>,
    #[account(mut)]
    pub recipient: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

pub fn withdrawal_token(ctx: Context<WithdrawalToken>, amounts: [(u64, usize); 3]) -> Result<()> {
    if !AUTHORIZED_ADDRESSES.contains(&ctx.accounts.authority.key()) {
        return Err(CustomError::Unauthorized.into());
    }

    let cpi_program = ctx.accounts.token_program.to_account_info();

    for (amount, index) in amounts.iter() {
        let escrow_account = match index {
            1 => &ctx.accounts.escrow_token_account_1,
            2 => &ctx.accounts.escrow_token_account_2,
            3 => &ctx.accounts.escrow_token_account_3,
            4 => &ctx.accounts.escrow_token_account_4,
            5 => &ctx.accounts.escrow_token_account_5,
            _ => return Err(CustomError::Unauthorized.into()), // Or a more appropriate error
        };

        let cpi_accounts = Transfer {
            from: escrow_account.to_account_info(),
            to: ctx.accounts.recipient.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        token::transfer(CpiContext::new(cpi_program.clone(), cpi_accounts), *amount)?;
    }

    Ok(())
}