import { create, fetchCollectionV1, mplCore } from '@metaplex-foundation/mpl-core'
import {
  createGenericFile,
  generateSigner,
  keypairIdentity,
  publicKey,
  signerIdentity,
  sol,
} from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys'
import { base58 } from '@metaplex-foundation/umi/serializers'
import fs from 'fs'
import path from 'path'


import {
  createCollection,
  fetchCollection,
} from '@metaplex-foundation/mpl-core'

// Create the wrapper function
const createNft = async () => {
  ///
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


  //// Creating the Metadata for the Asset ////

    const imageFile = fs.readFileSync(
        path.join(__dirname, '.', '/public/gladiator-meme-profile.jpg')
    )

    const umiImageFile = createGenericFile(imageFile, 'gladiator-meme-profile.jpeg', {
        tags: [{ name: 'Gladiator-dot-Meme-Profile', value: 'image/jpeg' }],
    })

    const imageUri = await umi.uploader.upload([umiImageFile]).catch((err) => {
        throw new Error(err)
    })

    // fetch the collection
    const collectionAddress = publicKey('ENc8zjHjmipY3ZeccvxAG8Z8wudVmbWcyjLrjNug4NDy');
    const collection = await fetchCollectionV1(umi, collectionAddress);

   // const collection = fetchCollection(umi, collectionPub);

    const metadata = {
        name: 'My NFT',
        description: 'This is an NFT on Solana',
        image: imageUri[0],
        external_url: 'https://example.com',
        attributes: [
          {
            trait_type: 'trait1',
            value: 'value1',
          },
          {
            trait_type: 'trait2',
            value: 'value2',
          },
        ],
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

    /// get URI to attach to our collection

    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
        throw new Error(err)
    })

    //////// Minting the NFT Core Asset //////

    const asset = generateSigner(umi)

    const tx = await create(umi, {
        asset,
        name: 'My NFT',
        uri: metadataUri,
        collection,
    }).sendAndConfirm(umi)

    const signature = base58.deserialize(tx.signature)[0]

    // Log out the signature and the links to the transaction and the NFT.
    console.log('\nNFT Created')
    console.log('View Transaction on Solana Explorer')
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    console.log('\n')
    console.log('View NFT on Metaplex Explorer')
    console.log(`https://core.metaplex.com/explorer/${nftSigner.publicKey}?env=devnet`)


    //////////////////////////////////////////


   //////////////////////////////////////////

  ///
}

// run the wrapper function
createNft()