// components/PlayerInfo.tsx
import React from 'react';
import Image from 'next/image';
import { usePlayerInfo } from '../../hooks/usePlayerInfo';

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

  const avatarElement = (
    <div>
      <Image 
        src={`/assets/battle-layout/user-avatars/${isOpponent ? 'Frame 17.png' : 'image.png'}`} 
        width={50} 
        height={50} 
        alt={`Avatar jugador ${playerId}`} 
      />
    </div>
  );

  const infoElement = (
    <div className={isOpponent ? "text-right" : ""}>
      <div className="font-bold text-[16px]">{name}</div>
      <div className="font-bold text-[12px]">
        HP: {'█'.repeat(hp / 10)}<span className="text-red-500">{'█'.repeat(10 - hp / 10)}</span>
      </div>
    </div>
  );

  const marketElement = (
    <div className={`grid content-between ${isOpponent ? "text-left" : "text-right"}`}>
      <div className="font-bold text-sm">Market:</div>
      <div>{market}</div>
    </div>
  );

  return (
    <div className="text-white bg-black bg-opacity-75 p-2 min-w-[336px] justify-between rounded flex">
      {isOpponent ? (
        <>
          {marketElement}
          <div className="flex gap-2">
            {infoElement}
            {avatarElement}
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-2">
            {avatarElement}
            {infoElement}
          </div>
          {marketElement}
        </>
      )}
    </div>
  );
};

export default PlayerInfo;