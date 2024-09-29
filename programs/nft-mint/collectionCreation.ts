import { 
    createCollection as mplCreateCollection, 
    mplCore 
} from '@metaplex-foundation/mpl-core'
import {
    createGenericFile,
    generateSigner,
    signerIdentity,
    sol,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { base58 } from '@metaplex-foundation/umi/serializers'
import fs from 'fs'
import path from 'path'
  
// Create the wrapper function
const createCollection = async () => {

    // Setting up Umi /////////////////////////////////

    const umi = createUmi('https://api.devnet.solana.com')
    .use(mplCore())
      .use(
      irysUploader({
        // mainnet address: "https://node1.irys.xyz"
        // devnet address: "https://devnet.irys.xyz"
        address: 'https://devnet.irys.xyz',
      })
    )
  
    // Generate a new keypair signer.
    const signer = generateSigner(umi)
  
    // You will need to us fs and navigate the filesystem to
    // load the wallet you wish to use via relative pathing.
    const walletFile = fs.readFileSync('/Users/raigal/my-solana-wallet/mykeypair.json')
    
  
    // Convert your walletFile onto a keypair.
    let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(walletFile));
  
    // Load the keypair into umi.
    umi.use(signerIdentity(signer));

    console.log('Airdropping 1 SOL to identity')
    await umi.rpc.airdrop(umi.identity.publicKey, sol(1))

    //////////////////////////////////////////

    ///// Creating the Metadata for the Collection //////////////

    

    ////////////////////////////////////////////////////////////


}
  
// run the wrapper function
createCollection()