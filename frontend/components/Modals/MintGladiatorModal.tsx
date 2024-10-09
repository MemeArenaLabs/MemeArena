import React, { useState, useEffect } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "../Modal";
import { CoinInput } from "../CoinInput";
import {

  GenericFileTag,
} from "@metaplex-foundation/umi";
import { useGenerateMetadata, Metadata } from "../../hooks/useGenerateMetadata";
import path from "path";
import { useUserData } from "@/context/UserDataProvider";
import axios from "axios";
import { createUserMeme } from "@/utils/api-service";

interface MintGladiatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintGladiatorModal: React.FC<MintGladiatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mintAmount, setMintAmount] = useState<string>("0.1");
  const [isMinted, setIsMinted] = useState(false);
  const [selectedMetadata, setSelectedMetadata] = useState<Metadata>({} as Metadata);
  const { id } = useUserData();


  useEffect(() => {
    if (!isOpen) {
      setIsMinted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const metadataList = useGenerateMetadata();
    const randomIndex = Math.floor(Math.random() * metadataList.length);
    const metadata = metadataList[randomIndex] || {} as Metadata; // Use null if metadata is undefined
    setSelectedMetadata(metadata);
  }, []);


  const handleMintGladiator = async () => {

    try {
      const gladiatorName = selectedMetadata?.image;
      console.log({ gladiatorName });
      const [name, profession, element] = selectedMetadata?.name.split(' ');
    
      // const { data } = await axios.post("/api/mintGladiator", 
      //   { imageName: gladiatorName }, 
      //   { 
      //     headers: { "Content-Type": "application/json" }, 
      //     timeout: 8000
      //   }
      // );
    
      // console.log({data})

      const body = {
        userId: id,
        name,
        element: element,
        profession: profession,
      }
      const userMemeResponse = await createUserMeme(body);
    
      const userMemeData = await userMemeResponse.json();
      console.log({userMemeData})
      if (!userMemeResponse.ok) {
        throw new Error(userMemeData.error || "Error creating UserMeme");
      }
    
      console.log("UserMeme created successfully:", userMemeData);
    
      console.log("Minting successful:", userMemeData);
    
      // Actualiza el estado según sea necesario
      setIsMinted(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
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
            src={
              isMinted && selectedMetadata
                ? selectedMetadata.image
                : "/assets/mint/gladiators-mint.gif"
            }
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
                The more SOL you invest in the gladiator, the higher your
                chances of getting a rare gladiator.
              </p>
              <p className="text-white my-2">ENTER AMOUNT</p>
              <CoinInput
                handleStakeAmountChange={(e) => setMintAmount(e.target.value)}
                handleMaxClick={handleMaxAmount}
                coinValue={undefined}
                userCoinBalance={1}
                userCoinUsdRate={0}
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

function handleImageUpload(
  imageFile: Blob | null,
  selectedMetadata: Metadata | null
) {
  throw new Error("Function not implemented.");
}
