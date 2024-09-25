// components/PlayerInfo.tsx
import React from "react";
import Image from "next/image";
import { usePlayerInfo } from "../../hooks/usePlayerInfo";

interface PlayerInfoProps {
  playerId: 1 | 2;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ playerId }) => {
  const { playerInfo, loading, error } = usePlayerInfo(playerId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!playerInfo) return null;

  const { name, hp, market } = playerInfo;
  const isOpponent = playerId === 2;

  return (
    <div className="text-white min-w-[336px] flex">
      {isOpponent ? (
        <>
          <div className="bg-dark-blue-80 clip-path-polygon-right-market p-2 text-left w-[92px] mr-[-14px]">
            <div className="text-[12px]">Market</div>
            <div className="text-[16px] text-[#07F81F] font-medium flex justify-start items-center gap-1">
              <div>
                <Image
                  src="/icons/market-up.svg"
                  width={13}
                  height={10.5}
                  alt="Market Up"
                />
              </div>
              <div>{market}%</div>
            </div>
          </div>
          <div className="flex gap-2 bg-dark-blue-80 min-w-[226px] w-full items-center clip-path-polygon-right-gui-info-player p-2">
            <div className={`${isOpponent ? "text-right" : ""} w-full`}>
              <div className="font-bold text-[16px]">{name}</div>
              <div
                className={`${isOpponent ? "flex-row-reverse" : ""} font-bold text-[12px] flex  items-center gap-2`}
              >
                <span>HP</span>
                <div className="w-[143px] h-3 bg-white  overflow-hidden">
                  <div
                    className="h-full bg-red-500 "
                    style={{ width: `${hp}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={`/assets/battle-layout/user-avatars/${isOpponent ? "Frame 17.png" : "image.png"}`}
                width={42}
                height={42}
                alt={`Avatar jugador ${playerId}`}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2 bg-dark-blue-80 min-w-[226px] items-center w-full clip-path-polygon-left-gui-info-player p-2">
            <div>
              <Image
                src={`/assets/battle-layout/user-avatars/${isOpponent ? "Frame 17.png" : "image.png"}`}
                width={42}
                height={42}
                alt={`Avatar jugador ${playerId}`}
              />
            </div>
            <div className={`${isOpponent ? "text-right" : ""} w-full`}>
              <div className="font-bold text-[16px]">{name}</div>
              <div
                className={`${isOpponent ? "flex-row-reverse" : ""} font-bold text-[12px] flex  items-center gap-2`}
              >
                <span>HP</span>
                <div className="w-[143px] h-3 bg-white  overflow-hidden">
                  <div
                    className="h-full bg-red-500 "
                    style={{ width: `${hp}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-dark-blue-80 clip-path-polygon-left-market p-2 text-right w-[92px] ml-[-14px]">
            <div className="text-[12px]">Market</div>
            <div className="text-[16px] text-[#FF3E3E] font-medium flex justify-end items-center gap-1">
              <div>
                <Image
                  src="/icons/market-down.svg"
                  width={13}
                  height={10.5}
                  alt="Market Down"
                />
              </div>
              <div>{market}%</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerInfo;
