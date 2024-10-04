import { 
    createCollection, 
    mplCore 
} from '@metaplex-foundation/mpl-core'
import {
    createGenericFile,
    generateSigner,
    keypairIdentity,
    signerIdentity,
    sol,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { base58 } from '@metaplex-foundation/umi/serializers'
import { Keypair } from '@solana/web3.js'; // Corrected import statement
import fs from 'fs'
import path from 'path'
  
// Create the wrapper function
const collectionCreation = async () => {

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
    //const walletFile = fs.readFileSync('/raigal/my-solana-wallet/mykeypair.json')
    
  
    // Convert your walletFile onto a keypair.
    // const secretKeyJSON = process.env.secretKey!;
    // if (!secretKeyJSON) {
    //     throw new Error("Secret key JSON is not defined in environment variables.");
    // }
    let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([57,49,154,35,35,201,219,82,52,36,3,82,89,128,55,182,15,203,250,215,56,2,46,84,75,179,58,206,56,146,208,2,140,41,83,153,21,205,164,237,139,129,74,55,68,29,96,28,156,7,108,59,237,58,98,181,211,56,125,192,42,237,44,174]));
  
    // Load the keypair into umi.
    umi.use(keypairIdentity(keypair));

    //console.log('Airdropping 1 SOL to identity')
    //await umi.rpc.airdrop(umi.identity.publicKey, sol(1))

    //////////////////////////////////////////

    ///// Creating the Metadata for the Collection //////////////
    const imageFile = fs.readFileSync(
        path.join(__dirname, '.', '/public/gladiator-meme-profile.jpg')
      )
    
    const umiImageFile = createGenericFile(imageFile, 'gladiator-meme-profile.jpeg', {
        tags: [{ name: 'Gladiator-dot-Meme-Profile', value: 'image/jpeg' }],
    })
    
    const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
        throw new Error(err)
    })
    
    console.log('imageUri: ' + imageUri[0])

    

    const metadata = {
        name: 'Gladiators.meme Geneis Collection',
        description: "This is the genesis Gladiator's collection",
        image: imageUri[0],
        external_url: 'https://x.com/Gladiatorsmeme',
        properties: {
          files: [
            {
              uri: imageUri[0],
              type: 'image/jpeg',
            },
          ],
          category: 'image',
        },
    }
    // Call upon Umi's `uploadJson()` function to upload our metadata to Arweave via Irys.
    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
        throw new Error(err)
    })

    const collection = generateSigner(umi) 

    // for royalties
    //const creator1 = generateSigner(umi);
    //const creator2 = generateSigner(umi);

    const tx = await createCollection(umi, {
        collection,
        name: 'My Collection',
        uri: metadataUri,
        // plugins: [     //Lo he deployado sin royalty, pero sería posible
        //     {
        //       type: 'Royalties',
        //         basisPoints: 500,
        //         creators: [
        //           {
        //             address: creator1.publicKey,
        //             percentage: 20,
        //           },
        //           {
        //             address: creator2.publicKey,
        //             percentage: 80,
        //           },
        //         ],
        //         ruleSet: ruleSet('None'), // Compatibility rule set
        
        //     },
        // ],
    }).sendAndConfirm(umi)

    const signature = base58.deserialize(tx.signature)[0]

    // Log out the signature and the links to the transaction and the NFT.
    console.log('\n Collection Created')
    console.log('View Transaction on Solana Explorer')
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    console.log('\n')
    console.log('View Collection on Metaplex Explorer')
    console.log(`https://core.metaplex.com/explorer/${collection.publicKey}?env=devnet`)

    ////////////////////////////////////////////////////////////
}
  
// run the wrapper function
collectionCreation()