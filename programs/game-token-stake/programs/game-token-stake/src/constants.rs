use anchor_lang::prelude::*;

#[constant]
pub const AUTHORIZED_ADDRESSES: &[Pubkey] = &[
    //Pubkey::new_from_array([0; 32]), // Replace with actual authorized addresses
    Pubkey::from_str("AS8dNZvz12LH8vzGeyAtwPdRiAwj1epGas3C9BpnGGj7").unwrap(),

    // Add more addresses as needed
];