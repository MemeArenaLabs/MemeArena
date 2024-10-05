use anchor_lang::prelude::*;

#[account]
pub struct EscrowAccount {
    pub amount: u64,
}

impl EscrowAccount {
    pub const LEN: usize = 8 + 8; // Adjust size as needed
}