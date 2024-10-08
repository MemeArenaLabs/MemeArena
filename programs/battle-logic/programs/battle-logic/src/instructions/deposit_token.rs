use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{self, Mint, Token, TokenAccount, Transfer},
};

use crate::state::EscrowAccount;
use crate::errors::CustomError;


pub fn deposit_token(ctx: Context<DepositToken>, amounts: [(u64, usize); 3]) -> Result<()> {
    let cpi_program = ctx.accounts.token_program.to_account_info();

    for (amount, index) in amounts.iter() {
        let (escrow_token_account, escrow_account) = match index {
            1 => (&ctx.accounts.escrow_token_account_1, &mut ctx.accounts.escrow_account_1),
            2 => (&ctx.accounts.escrow_token_account_2, &mut ctx.accounts.escrow_account_2),
            3 => (&ctx.accounts.escrow_token_account_3, &mut ctx.accounts.escrow_account_3),
            4 => (&ctx.accounts.escrow_token_account_4, &mut ctx.accounts.escrow_account_4),
            5 => (&ctx.accounts.escrow_token_account_5, &mut ctx.accounts.escrow_account_5),
            _ => return Err(CustomError::InvalidIndex.into()),
        };

        let cpi_accounts = Transfer {
            from: ctx.accounts.depositor.to_account_info(),
            to: escrow_token_account.to_account_info(),
            authority: ctx.accounts.depositor.to_account_info(),
        };
        token::transfer(CpiContext::new(cpi_program.clone(), cpi_accounts), *amount)?;

        escrow_account.amount += amount;
    }

    Ok(())
}

#[derive(Accounts)]
pub struct DepositToken<'info> {
    #[account(mut)]
    pub depositor: Signer<'info>,
    #[account(
        init_if_needed,
        payer = depositor,
        associated_token::mint = mint_1,
        associated_token::authority = backend_wallet, // Change authority to backend wallet
    )]
    pub escrow_token_account_1: Account<'info, TokenAccount>, // Change to TokenAccount
    #[account(
        init_if_needed,
        payer = depositor,
        associated_token::mint = mint_2,
        associated_token::authority = backend_wallet, // Change authority to backend wallet
    )]
    pub escrow_token_account_2: Account<'info, TokenAccount>, // Change to TokenAccount
    #[account(
        init_if_needed,
        payer = depositor,
        associated_token::mint = mint_3,
        associated_token::authority = backend_wallet, // Change authority to backend wallet
    )]
    pub escrow_token_account_3: Account<'info, TokenAccount>, // Change to TokenAccount
    #[account(
        init_if_needed,
        payer = depositor,
        associated_token::mint = mint_4,
        associated_token::authority = backend_wallet, // Change authority to backend wallet
    )]
    pub escrow_token_account_4: Account<'info, TokenAccount>, // Change to TokenAccount
    #[account(
        init_if_needed,
        payer = depositor,
        associated_token::mint = mint_5,
        associated_token::authority = backend_wallet, // Change authority to backend wallet
    )]
    pub escrow_token_account_5: Account<'info, TokenAccount>, // Change to TokenAccount
    pub mint_1: Account<'info, Mint>,
    pub mint_2: Account<'info, Mint>,
    pub mint_3: Account<'info, Mint>,
    pub mint_4: Account<'info, Mint>,
    pub mint_5: Account<'info, Mint>,
    /// CHECK: This account is safe because it is only used as an authority for token accounts.
    pub backend_wallet: AccountInfo<'info>, // Add backend wallet account
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,

    // Add these fields to track the escrow amounts
    pub escrow_account_1: Account<'info, EscrowAccount>,
    pub escrow_account_2: Account<'info, EscrowAccount>,
    pub escrow_account_3: Account<'info, EscrowAccount>,
    pub escrow_account_4: Account<'info, EscrowAccount>,
    pub escrow_account_5: Account<'info, EscrowAccount>
}

