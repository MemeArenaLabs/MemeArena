// pages/api/mintGladiator.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { create, fetchCollectionV1, mplCore } from '@metaplex-foundation/mpl-core';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { publicKey, generateSigner, keypairIdentity, createGenericFile } from '@metaplex-foundation/umi';
import path from 'path';
import { promises as fs } from 'fs';
import { Metadata } from '../../hooks/useGenerateMetadata';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageName } = req.body;
  if (!imageName) {
    return res.status(400).json({ error: 'Image name is required' });
  }

  try {
    const umi = createUmi('https://api.devnet.solana.com')
      .use(mplCore())
      .use(irysUploader({ address: 'https://devnet.irys.xyz' }));

    // Aquí debes usar una clave privada segura. No incluyas claves privadas en el código.
    // Por motivos de seguridad, es recomendable utilizar variables de entorno para almacenar claves privadas.

    // const secretKey = process.env.PRIVATE_KEY;
    // if (!secretKey) {
    //   throw new Error('Private key not set in environment variables');
    // }

    // const secretKeyArray = Uint8Array.from(JSON.parse(secretKey));
    // const keypair = umi.eddsa.createKeypairFromSecretKey(secretKeyArray);

    const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([57,49,154,35,35,201,219,82,52,36,3,82,89,128,55,182,15,203,250,215,56,2,46,84,75,179,58,206,56,146,208,2,140,41,83,153,21,205,164,237,139,129,74,55,68,29,96,28,156,7,108,59,237,58,98,181,211,56,125,192,42,237,44,174]));

    umi.use(keypairIdentity(keypair));

    const collectionAddress = publicKey('ENc8zjHjmipY3ZeccvxAG8Z8wudVmbWcyjLrjNug4NDy');
    const collection = await fetchCollectionV1(umi, collectionAddress);

    // Obtener la metadata correspondiente al gladiador
    console.log({imageName})
    const metadata = generateMetadataForImage(imageName);
    console.log({metadata})
    if (!metadata) {
      return res.status(404).json({ error: 'Metadata not found for the given image name' });
    }

    // Leer el archivo de imagen desde el sistema de archivos del servidor
    const imagePath = path.join(process.cwd(), 'public', metadata.image);
    const imageData = await fs.readFile(imagePath);

    const umiImageFile = createGenericFile(imageData, path.basename(metadata.image));

    // Subir la imagen
    const imageUriArray = await umi.uploader.upload([umiImageFile]);
    const imageUri = imageUriArray[0];

    // Actualizar la metadata con la URI de la imagen
    metadata.image = imageUri || 'uploadError';
    if (metadata.properties?.files?.[0]) {
      metadata.properties.files[0].uri = imageUri|| 'uploadError';
    }

    // Subir la metadata
    const metadataUri = await umi.uploader.uploadJson(metadata);

    // Crear el NFT
    const asset = generateSigner(umi);
    const tx = await create(umi, {
      asset,
      name: `role ${metadata.name} type ${metadata.attributes.find(attr => attr.trait_type === 'Element')?.value}`,
      uri: metadataUri,
      collection,
    }).sendAndConfirm(umi);
    const [name, profession, element] = metadata.name.split(' ');
    const signature = base58.deserialize(tx.signature)[0];
    console.log('NFT Created:', signature);

    // Devolver la firma o cualquier información relevante
    return res.status(200).json({ success: true, signature, name, profession, element });
  } catch (error) {
    console.error('Error in minting:', error);
    return res.status(500).json({ error });
  }
}

// Función para obtener la metadata correspondiente al nombre de la imagen
function generateMetadataForImage(imageName: string): Metadata | null {
  const gladiators = [
    { name: 'Wifrix', image: '/assets/mint/wifrix.png' },
    { name: 'Popcator', image: '/assets/mint/popcator.png' },
    { name: 'Bongo', image: '/assets/mint/bongo.png' },
    { name: 'Chadius', image: '/assets/mint/chadius.png' },
    { name: 'Moodenkuro', image: '/assets/mint/moodenkuro.png' },
  ];

  const attributes = {
    role: ['Tank', 'Rogue', 'Fighter'],
    element: ['Fire', 'Water', 'Plant'],
  };

  // Encontrar el gladiador por nombre de imagen
  const gladiator = gladiators.find(g => g.image.toLowerCase() === imageName.toLowerCase());
  if (!gladiator) {
    return null;
  }
  console.log({gladiator})

  // Generar metadata (puedes ajustar esto según tus necesidades)
  const role = attributes.role[Math.floor(Math.random() * attributes.role.length)];
  const element = attributes.element[Math.floor(Math.random() * attributes.element.length)];

  const metadata: Metadata = {
    name: `${gladiator.name} ${role} ${element}`,
    description: `This is a ${role} ${gladiator.name} type ${element}.`,
    image: gladiator.image,
    external_url: 'https://example.com',
    attributes: [
      { trait_type: 'Role', value: role! },
      { trait_type: 'Element', value: element! },
    ],
    properties: {
      files: [
        {
          uri: gladiator.image,
          type: 'image/jpeg',
        },
      ],
      category: 'image',
    },
  };

  return metadata;
}
