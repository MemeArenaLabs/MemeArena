import React, { useState , useEffect} from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "../Modal";
import { CoinInput } from "../CoinInput";
import { GladiatorInfo } from "@/mockedData/mockedData";

//Mint logic imports
import { create, fetchCollectionV1, mplCore } from '@metaplex-foundation/mpl-core';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { publicKey, generateSigner, keypairIdentity, createGenericFile } from '@metaplex-foundation/umi';
import { useGenerateMetadata, Metadata } from "../../hooks/useGenerateMetadata";
import path from 'path';
import { useWallet } from "@solana/wallet-adapter-react";


interface MintGladiatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintGladiatorModal: React.FC<MintGladiatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mintAmount, setMintAmount] = useState<string>("0.1");
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState<string | null>(null);
  const [isMinted, setIsMinted] = useState(false);
  const [selectedMetadata, setSelectedMetadata] = useState<Metadata | null>(null);
  const [imageFile, setImageFile] = useState<string | Uint8Array>("/assets/mint/wifrix.png");
  
  let imageUri: string[] | undefined; // Declare the variable outside the try block


  useEffect(() => {
    if (!isOpen) {
      setIsMinted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedMetadata) {
      console.log(selectedMetadata)
      const imagePath = selectedMetadata.image.startsWith('/')
        ? selectedMetadata.image
        : `/${selectedMetadata.image}`;
      const imageUrl = imagePath; // Since the public folder is served at the root
  
      fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer())
      .then((arrayBuffer) => setImageFile(new Uint8Array(arrayBuffer)))
      .catch((error) => console.error('Error fetching image file:', error));
    }
  }, [selectedMetadata]);

  async function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
    const reader = new FileReader();
  
    const arrayBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
      reader.onloadend = function() {
        if (reader.result) {
          resolve(reader.result as ArrayBuffer);
        } else {
          reject(new Error("Error reading the Blob"));
        }
      };
  
      reader.onerror = function() {
        reject(new Error("Error reading the Blob"));
      };
  
      reader.readAsArrayBuffer(blob);
    });
  
    return new Uint8Array(arrayBuffer);
  }

  const handleMintGladiator = async () => {
    setLoading(true);
    setError(null);

    try {
      const umi = createUmi('https://api.devnet.solana.com')
        .use(mplCore())
        .use(irysUploader({ address: 'https://devnet.irys.xyz' }));

      //const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([/* your secret key array */]));
      const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array([57,49,154,35,35,201,219,82,52,36,3,82,89,128,55,182,15,203,250,215,56,2,46,84,75,179,58,206,56,146,208,2,140,41,83,153,21,205,164,237,139,129,74,55,68,29,96,28,156,7,108,59,237,58,98,181,211,56,125,192,42,237,44,174]));

      umi.use(keypairIdentity(keypair));

      const collectionAddress = publicKey('ENc8zjHjmipY3ZeccvxAG8Z8wudVmbWcyjLrjNug4NDy');
      const collection = await fetchCollectionV1(umi, collectionAddress);

      const metadataList = useGenerateMetadata();
      const randomIndex = Math.floor(Math.random() * metadataList.length);
      const metadata = metadataList[randomIndex] ?? null; // Use null if metadata is undefined
      setSelectedMetadata(metadata); // Store the selected metadata

      if (!selectedMetadata) {
        console.error("Selected metadata is not set");
        return;
      }
      if (!imageFile || typeof imageFile === 'string' && imageFile === "/assets/mint/wifrix.png") {
        console.error("Image file is not set or is a placeholder");
        return;
      }


      //const imageFile = fs.readFileSync(path.join(__dirname, '.', metadata.image));
      const umiImageFile = createGenericFile(imageFile, path.basename(selectedMetadata.image));
      console.log("umiImageFile done", umiImageFile);
     
      
      // const umiImageFile = createGenericFile(imageFile, path.basename(metadata.image), {
      //   tags: [{ name: 'Gladiator-dot-Meme-Profile', value: 'image/jpeg' }],
      // });

      if (!umiImageFile) {
        console.error("umiImageFile is null or undefined");
        return;
      }

      console.log("Starting image upload...", umiImageFile);
      

      // try {
      //   const imageUri = await umi.uploader.upload([umiImageFile]);
      //   console.log("imageUri", imageUri);
      // } catch (error) {
      //   console.error("Error during image upload:", error);
      // }
      
      try {
        const imageUri = await umi.uploader.upload([umiImageFile]);
        console.log("imageUri", imageUri);
      } catch (error) {
        console.error("Upload failed:", error);
      }

      console.log("Before metadata check:", metadata);

      if (metadata) {
        const imageUriFirst = imageUri?.[0] ?? ''; // Use optional chaining and default empty string
        metadata.image = imageUriFirst;
        if (metadata.properties?.files?.[0]) {
          metadata.properties.files[0].uri = imageUriFirst;
        }
      }

      const metadataUri = await umi.uploader.uploadJson(metadata);

      console.log("metadataUri done")

      const asset = generateSigner(umi);
      const tx = await create(umi, {
        asset,
        name: `${metadata?.attributes.find(attr => attr.trait_type === 'Role')?.value} ${metadata?.name} type ${metadata?.attributes.find(attr => attr.trait_type === 'Element')?.value}`,
        uri: metadataUri,
        collection,
      }).sendAndConfirm(umi);

      const signature = base58.deserialize(tx.signature)[0];
      console.log('NFT Created:', signature);
      setIsMinted(true); // Set the state to true when minting is successful
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

    // handle mint logic
    // const mockGladiatorInfo: GladiatorInfo = {

    //   name: "MAGAIBA",
    //   type: "TANK / PLANT",
    //   stats: [
    //     { value: 420, icon: "broken-heart", label: "HP" },
    //     { value: 36, icon: "battered-axe", label: "ATTACK" },
    //     { value: 12, icon: "crossed-swords", label: "CRITICAL CHANCE" },
    //     { value: 45, icon: "shield-impact", label: "DEFENSE" },
    //     { value: 69, icon: "speedometer", label: "SPEED" },
    //   ],
    // };

  const handleMaxAmount = () => {
    //handle max input amount
    console.log("max amount...");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mint Gladiator">
      <div className="flex w-[600px] gap-4">
        <div className="min-w-[226px]">
          <Image
            src={isMinted && selectedMetadata ? selectedMetadata.image : "/assets/mint/gladiators-mint.gif"}
            width={226}
            height={226}
            alt={isMinted && selectedMetadata ? selectedMetadata.name : "MOG"}
            />
        </div>
        <div className="w-full max-w-[347px]" id="enter-amount">
        {isMinted ? (
          <>
            <p className="text-white text-[14px] font-medium">
              Congratulations! Your NFT has been minted successfully.
            </p>
            {selectedMetadata && (
              <>
                <p className="text-white text-[14px] font-medium">
                  Name: {selectedMetadata.name}
                </p>
                <Image
                  src={selectedMetadata.image}
                  width={100}
                  height={100}
                  alt={selectedMetadata.name}
                />
              </>
            )}
          </>
          ) : (
          <>
            <p className="text-white text-[14px] font-medium">
              The more SOL you invest in the gladiator, the higher your chances of
              getting a rare gladiator.
            </p>
            <p className="text-white my-2">ENTER AMOUNT</p>
            <CoinInput
              coinSymbol={"SOL"}
              coinValue={mintAmount}
              handleStakeAmountChange={(e) => setMintAmount(e.target.value)}
              handleMaxClick={handleMaxAmount}
              userCoinBalance={"123"}
            />
            <p className="pb-2 pt-1 font-medium text-[12px]">
              Min amount: {mintAmount} SOL
            </p>
            <button
              onClick={handleMintGladiator}
              className="flex gap-2 items-center bg-yellow text-black text-[14px] font-bold py-2 px-4 min-w-[171px] h-[28px]"
            >
              <SvgIcon name="barbute" className="text-black h-4 w-4" />
              MINT GLADIATOR
            </button>
          </>
        )}
        </div>
      </div>
    </Modal>
  );
};

export default MintGladiatorModal;

// function useEffect(arg0: () => void, arg1: any[]) {
//   throw new Error("Function not implemented.");
// }

function handleImageUpload(imageFile: Blob | null, selectedMetadata: Metadata | null) {
  throw new Error("Function not implemented.");
}

