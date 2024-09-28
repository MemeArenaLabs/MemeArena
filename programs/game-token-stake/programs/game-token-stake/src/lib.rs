use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("FU3grTvP5yB6L8Cz68Hyn9tdiexVV5LUBhvLyMcwR1gN");

#[program]
pub mod battle {
    use super::*;

    // User deposits tokens into the escrow
    pub fn deposit_tokens(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.player_token_account.to_account_info(),
            to: ctx.accounts.escrow_token_account.to_account_info(),
            authority: ctx.accounts.player.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;

        Ok(())
    }

    // Backend determines the winner and distributes tokens
    pub fn declare_winner(ctx: Context<DeclareWinner>, amounts: [0,0,20,20,20]) -> Result<()> {
        let total_tokens = ctx.accounts.escrow_token_account.amount;

        // Transfer all tokens to the winner's token account
        let cpi_accounts = Transfer {
            from: ctx.accounts.escrow_token_account.to_account_info(),
            to: ctx.accounts.winner_token_account.to_account_info(),
            authority: ctx.accounts.program_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        token::transfer(CpiContext::new(cpi_program, cpi_accounts), total_tokens)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut)]
    pub player_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_sWIF: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_sBONK: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_sETC: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_sB: Account<'info, TokenAccount>,
    #[account(mut)]
    pub escrow_token_account_sC: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct DeclareWinner<'info> {
    /// The backend authority that must sign the transaction
    #[account(
        signer,  // This ensures only the authorized signer can call this function
        mut
    )]
    pub program_authority: AccountInfo<'info>,  // Backend-controlled account

    #[account(mut)]
    pub escrow_token_account_sWIF: Account<'info, TokenAccount>,

    #[account(mut)]
    pub escrow_token_account_sBONK: Account<'info, TokenAccount>,

    #[account(mut)]
    pub escrow_token_account_sETC: Account<'info, TokenAccount>,

    #[account(mut)]
    pub escrow_token_account_sB: Account<'info, TokenAccount>,

    #[account(mut)]
    pub escrow_token_account_sC: Account<'info, TokenAccount>,

    #[account(mut)]
    pub winner_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

