#!/bin/bash


# Install Solana CLI
#sh -c "$(curl -sSfL https://release.solana.com/v1.10.32/install)"

# Install spl-token CLI
#cargo install spl-token-cli

# Set variables
TOKEN_NAME="Giga Chad"
TOKEN_SYMBOL="GIGA"
TOKEN_DECIMALS=9
METADATA_URI="https://example.com/metadata.json" # URL to your metadata JSON file

# Create a new SPL token
TOKEN_ADDRESS=$(spl-token create-token --decimals $TOKEN_DECIMALS | grep 'Creating token' | awk '{print $3}')

# Create a new token account
TOKEN_ACCOUNT=$(spl-token create-account $TOKEN_ADDRESS | grep 'Creating account' | awk '{print $3}')

# Mint some tokens to the token account
spl-token mint $TOKEN_ADDRESS 1000000000 $TOKEN_ACCOUNT

# RECIPIENT_ADDRESS_RAQUEL="ETqMTjGZUj2a3Jhp41X7PtNUMFDVJfnmdXRihy6rTxtG"
# spl-token transfer $TOKEN_ADDRESS 1000 $RECIPIENT_ADDRESS_RAQUEL --from $TOKEN_ACCOUNT --fund-recipient


# Create metadata for the token
solana program deploy /path/to/metaplex-token-metadata.so

# Create metadata JSON file
cat <<EOF > metadata.json
{
  "name": "$TOKEN_NAME",
  "symbol": "$TOKEN_SYMBOL",
  "uri": "$METADATA_URI",
  "seller_fee_basis_points": 500,
  "creators": null
}
EOF

# Upload metadata to Arweave or IPFS and get the URI
# This step is manual and depends on your preferred method of hosting metadata

# Associate metadata with the token
# Replace <METADATA_PROGRAM_ID> with the actual program ID of the deployed metadata program
solana program invoke <METADATA_PROGRAM_ID> --data-file metadata.json --account $TOKEN_ADDRESS

echo "Token created with address: $TOKEN_ADDRESS"
echo "Token account created with address: $TOKEN_ACCOUNT"