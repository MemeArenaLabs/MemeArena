import React from "react";
import Image from "next/image";
import { TeamResponseDto } from "@/types/serverDTOs";

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
              {/* {team.userMemes.map(({meme}) => (
                <CharacterImage
                  key={`team1_${meme.name}`}
                  name={meme.name}
                  imageUrl={meme.imageUrl}
                />
              ))} */}
            </div>
            <div className="flex justify-center">
              <Image
                className="mt-[-50px] animate-pulse z-0"
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

export default TeamDisplay;

const CharacterImage = ({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) => (
  <div className="mr-[-50px]">
    <Image
      className="relative z-10"
      src={imageUrl}
      alt={`${name} skill`}
      width={226}
      height={226}
    />
  </div>
);
