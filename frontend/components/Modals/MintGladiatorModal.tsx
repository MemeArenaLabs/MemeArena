import React, { useState, useEffect } from "react";
import Image from "next/image";
import SvgIcon, { IconName } from "@/utils/SvgIcon";
import { Modal } from "../Modal";
import { CoinInput } from "../CoinInput";
import { GenericFileTag } from "@metaplex-foundation/umi";
import { useGenerateMetadata, Metadata } from "../../hooks/useGenerateMetadata";
import path from "path";
import { useUserData } from "@/context/UserDataProvider";
import axios from "axios";
import { createUserMeme } from "@/utils/api-service";
import StatDisplay from "../StatDisplay";

interface MintGladiatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HARDCODED_GLADIATOR_STATS = [
  { icon: "broken-heart" as IconName, label: "HP", value: 1200 },
  { icon: "battered-axe" as IconName, label: "ATTACK", value: 130 },
  { icon: "shield-impact" as IconName, label: "DEFENSE", value: 150 },
  { icon: "speedometer" as IconName, label: "SPEED", value: 200 },
];

const MintGladiatorModal: React.FC<MintGladiatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mintAmount, setMintAmount] = useState<string>("0.1");
  const [isMinted, setIsMinted] = useState(false);
  const [selectedMetadata, setSelectedMetadata] = useState<Metadata>(
    {} as Metadata
  );
  const { id } = useUserData();

  useEffect(() => {
    if (!isOpen) {
      setIsMinted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const metadataList = useGenerateMetadata();
    const randomIndex = Math.floor(Math.random() * metadataList.length);
    const metadata = metadataList[randomIndex] || ({} as Metadata); // Use null if metadata is undefined
    setSelectedMetadata(metadata);
  }, []);

  const handleMintGladiator = async () => {
    try {
      const gladiatorName = selectedMetadata?.image;
      console.log({ gladiatorName });
      const [name, profession, element] = selectedMetadata?.name.split(" ");

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
      };
      const userMemeResponse = await createUserMeme(body);
      console.log(userMemeResponse);
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

  const handleMaxAmount = () => {
    console.log("max amount...");
  };

  const extractGladiatorInfo = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 3) {
      return {
        name: parts.slice(0, -2).join(" "),
        profession: parts[parts.length - 2],
        element: parts[parts.length - 1],
      };
    }
    return { name, profession: "", element: "" };
  };
  console.log(error);
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
              {selectedMetadata && (
                <>
                  {(() => {
                    const { name, profession, element } = extractGladiatorInfo(
                      selectedMetadata.name
                    );
                    return (
                      <>
                        <div className="grid gap-4 py-4">
                          <p className="text-white text-[40px] font-bold">
                            {name}
                          </p>
                          <p className="text-[20px] font-bold text-yellow uppercase">
                            {profession} / {element}
                          </p>
                        </div>
                        <div className="mt-2 flex flex-col gap-[6px]">
                          {HARDCODED_GLADIATOR_STATS.map(
                            ({ label, icon, value }) => (
                              <StatDisplay
                                key={label}
                                label={label}
                                icon={icon}
                                value={value}
                              />
                            )
                          )}
                        </div>
                      </>
                    );
                  })()}
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
                disabled={loading}
              >
                {loading ? (
                  "Minting..."
                ) : (
                  <>
                    <SvgIcon name="barbute" className="text-black h-4 w-4" />
                    MINT GLADIATOR
                  </>
                )}
              </button>
              {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MintGladiatorModal;
