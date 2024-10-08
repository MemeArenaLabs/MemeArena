import React from "react";
import Image from "next/image";
import { TeamResponseDto } from "@/types/serverDTOs";
import { getGladiatorImgUri } from "@/utils/getGladiatorAssets";

const positionClasses = [
  "absolute top-1 right-[-15%]",
  "absolute top-1 left-1/2 -translate-x-1/2 z-20",
  "absolute top-1 left-[-15%]",
] as const;

type PositionClass = typeof positionClasses[number];

const getPositionClass = (index: number): PositionClass => {
  return positionClasses[index % positionClasses.length] as PositionClass;
};

const TeamDisplay = ({ team }: { team: TeamResponseDto }) => {
  return (
    <div>
      <div>
        <h2 className="relative mt-[-8px]">{team.name}</h2>
      </div>
      <div className="flex w-[600px] justify-center pt-2">
        <div className="w-full">
          <div className="grid mx-auto w-full justify-center h-40">
            <div className="flex max-w-[498px]">
              {team.userMemes.map((userMeme, index) => (
                <CharacterImage
                  key={`team1_${userMeme.meme.name}`}
                  name={userMeme.meme.name}
                  imageUrl={getGladiatorImgUri(userMeme.meme.token.name)}
                  positionClass={getPositionClass(index)}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Image
                className="mt-[-50px] ml-8 animate-pulse z-0"
                src="/assets/team-selection/bg/big-shadow.png"
                width={471}
                height={72}
                alt="Player shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CharacterImage = ({
  imageUrl,
  name,
  positionClass,
}: {
  imageUrl: string;
  name: string;
  positionClass: PositionClass;
}) => (
  <div className="mr-[-50px]">
    <Image
      className={`relative z-10 ${positionClass}`}
      src={imageUrl}
      alt={`${name} skill`}
      width={226}
      height={226}
    />
  </div>
);

export default TeamDisplay;